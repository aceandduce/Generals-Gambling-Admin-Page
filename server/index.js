// Simple Express server for login, form handling, and Google Sheets integration
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Simple in-memory user store (replace with DB for production)
const USERS = JSON.parse(process.env.USERS_JSON || '[{"username":"admin","password":"password123"},{"username":"General Supreme","password":"password"}]');

app.use(cors());
app.use(bodyParser.json());

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username, password });
  const user = USERS.find(u =>
    u.username === username &&
    u.password === password
  );
  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Google Sheets setup (fill in your API key and credentials)
const SHEET_ID = process.env.SHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || 'Players';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

function getSheetsClient() {
  // Place your credentials in GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY
  const auth = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  return google.sheets({ version: 'v4', auth });
}

// Form submission endpoint
app.post('/api/submit', async (req, res) => {
  const { playerUsername, amountToAdd, adminUsername, proofImageUrl } = req.body;

  if (!playerUsername || !amountToAdd || !proofImageUrl || !adminUsername) {
    return res.status(400).json({ success: false, message: 'All fields required.' });
  }

  try {
    const sheets = getSheetsClient();
    // Get all usernames from column A
    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A2:B`,
    });
    const rows = readRes.data.values || [];
    let playerRow = -1;
    let adminRow = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === playerUsername) playerRow = i;
      if (rows[i][0] === adminUsername) adminRow = i;
    }
    if (playerRow === -1) {
      return res.status(404).json({ success: false, message: 'Please remember, usernames are case sensitive.' });
    }
    // Add amount to player
    const currentAmount = parseFloat(rows[playerRow][1] || '0');
    const newAmount = currentAmount + parseFloat(amountToAdd);
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!B${playerRow + 2}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [[newAmount]] },
    });
    // Add 2% to admin if admin is in the sheet
    if (adminRow !== -1) {
      const adminCurrent = parseFloat(rows[adminRow][1] || '0');
      const adminBonus = adminCurrent + (parseFloat(amountToAdd) * 0.02);
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!B${adminRow + 2}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[adminBonus]] },
      });
    }

    // Track submission in Admin sheet
    const adminSheetName = 'Admin';
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', { hour12: false });
    // Use the IMAGE formula for Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${adminSheetName}!A:E`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          formattedTime, // Time
          `=IMAGE("${proofImageUrl}")`, // Image formula
          amountToAdd,    // Amount
          playerUsername, // Player name
          adminUsername   // Admin name
        ]]
      }
    });
    return res.json({ success: true });
  } catch (err) {
    console.error('Error in /api/submit:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
