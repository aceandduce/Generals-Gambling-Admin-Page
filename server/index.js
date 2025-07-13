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

// Configure CORS to allow requests from GitHub Pages
app.use(cors({
  origin: [
    'https://aceandduce.github.io',
    'http://localhost:5173', // For local development
    'http://localhost:3000'  // For local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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
      const adminBonus = adminCurrent + (parseFloat(amountToAdd) * 0.01);
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

// Sports betting submission endpoint
app.post('/api/submit-sports-bet', async (req, res) => {
  const { 
    username, 
    amountBet, 
    eventName, 
    eventTime, 
    betType, 
    selectedTeam, 
    odds, 
    line, 
    proofImageUrl,
    adminUsername
  } = req.body;

  if (!username || !amountBet || !eventName || !eventTime || !betType || !selectedTeam || !odds || !proofImageUrl || !adminUsername) {
    return res.status(400).json({ success: false, message: 'All fields required.' });
  }

  try {
    const sheets = getSheetsClient();
    const sportsBetsSheetName = 'Sports Bets';
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', { hour12: false });

    // Get all usernames from column A to find admin row
    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A2:B`,
    });
    const rows = readRes.data.values || [];
    let adminRow = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === adminUsername) adminRow = i;
    }

    // Add 1% to admin if admin is in the sheet
    if (adminRow !== -1) {
      const adminCurrent = parseFloat(rows[adminRow][1] || '0');
      const adminBonus = adminCurrent + (parseFloat(amountBet) * 0.01);
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!B${adminRow + 2}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[adminBonus]] },
      });
    }

    // Append bet data to Sports Bets sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${sportsBetsSheetName}!A:K`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          formattedTime,    // Time
          username,         // Username
          amountBet,        // Amount Bet
          selectedTeam,     // Selected Team
          eventName,        // Event Name
          eventTime,        // Event Time
          betType,          // Bet Type (Moneyline, Spread, Total)
          odds,             // Odds
          line || '',       // Line (for spreads/totals)
          adminUsername,    // Admin who processed the bet
          `=IMAGE("${proofImageUrl}")` // Proof Image
        ]]
      }
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('Error in /api/submit-sports-bet:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Raffle ticket submission endpoint
app.post('/api/submit-raffle-ticket', async (req, res) => {
  const { 
    phoneNumber, 
    stateId, 
    amountPurchased, 
    proofImageUrl,
    adminUsername
  } = req.body;

  if (!phoneNumber || !stateId || !amountPurchased || !proofImageUrl || !adminUsername) {
    return res.status(400).json({ success: false, message: 'All fields required.' });
  }

  try {
    const sheets = getSheetsClient();
    const raffleSheetName = 'Raffle';
    const adminRaffleSheetName = 'Admin Raffle';
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', { hour12: false });

    // First, check if the state ID exists in the Raffle sheet
    const raffleReadRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${raffleSheetName}!A:C`,
    });
    
    const raffleRows = raffleReadRes.data.values || [];
    let existingRow = -1;
    let currentTotal = 0;
    
    // Find the row with matching state ID (column B)
    for (let i = 0; i < raffleRows.length; i++) {
      if (raffleRows[i][1] === stateId) { // Column B is index 1
        existingRow = i;
        currentTotal = parseFloat(raffleRows[i][2] || '0'); // Column C is index 2
        break;
      }
    }

    const newAmount = parseInt(amountPurchased);
    const totalAfterPurchase = currentTotal + newAmount;

    // Check if the total would exceed 10
    if (totalAfterPurchase > 10) {
      return res.status(400).json({ 
        success: false, 
        message: `Cannot purchase ${newAmount} tickets. Current total: ${currentTotal}, would exceed maximum of 10 tickets.` 
      });
    }

    // Update or add to Raffle sheet
    if (existingRow !== -1) {
      // Update existing row
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${raffleSheetName}!C${existingRow + 1}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[totalAfterPurchase]] },
      });
    } else {
      // Add new row to Raffle sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `${raffleSheetName}!A:C`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            phoneNumber,    // Column A: Phone Number
            stateId,        // Column B: State ID
            newAmount       // Column C: Amount Purchased
          ]]
        }
      });
    }

    // Add to Admin Raffle sheet for tracking individual purchases
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${adminRaffleSheetName}!A:E`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          stateId,         // Column A: State ID
          phoneNumber,     // Column B: Phone Number
          newAmount,       // Column C: Amount Purchased
          `=IMAGE("${proofImageUrl}")`, // Column D: Proof Image
          adminUsername    // Column E: Admin Name
        ]]
      }
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('Error in /api/submit-raffle-ticket:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
