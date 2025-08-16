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
      // Username not found: append to Players sheet
      // Ensure amountToAdd is a number
      const parsedAmount = parseFloat((amountToAdd + '').replace(/[^\d.\-]/g, ''));
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A:B`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[playerUsername, parsedAmount]]
        }
      });
      // Track submission in Admin sheet as usual
      const adminSheetName = 'Admin';
      const now = new Date();
      const formattedTime = now.toLocaleString('en-US', { hour12: false });
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `${adminSheetName}!A:E`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            formattedTime, // Time
            `=IMAGE("${proofImageUrl}")`, // Image formula
            parsedAmount,    // Amount
            playerUsername, // Player name
            adminUsername   // Admin name
          ]]
        }
      });
      return res.json({ success: true, newAccount: true });
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
    // Add 1% to admin if admin is in the sheet
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


  // Enforce sports bet maximum from environment variable
  const SPORTS_BET_MAX = parseFloat(process.env.SPORTS_BET_MAX || '1000');
  if (parseFloat(amountBet) > SPORTS_BET_MAX) {
    return res.status(400).json({ success: false, message: `Bet exceeds maximum allowed of $${SPORTS_BET_MAX}.` });
  }

  // Reject long shot odds
  if (parseFloat(odds) > 10) {
    return res.status(400).json({ success: false, message: 'No long shots.' });
  }

  // Update betType for Moneyline
  let betTypeToSave = betType;
  if (typeof betType === 'string' && betType.trim().toLowerCase() === 'moneyline') {
    betTypeToSave = 'Moneyline/h2h';
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
          betTypeToSave,    // Bet Type (Moneyline/h2h, Spread, Total)
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

    // Add 10% commission to admin if admin is in the sheet ($10 per ticket)
    if (adminRow !== -1) {
      const adminCurrent = parseFloat(rows[adminRow][1] || '0');
      const commissionPerTicket = 10; // $10 per ticket
      const totalCommission = parseInt(amountPurchased) * commissionPerTicket;
      const adminBonus = adminCurrent + totalCommission;
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!B${adminRow + 2}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[adminBonus]] },
      });
    }

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

// === PROP BETS ENDPOINTS ===

// POST /api/submit-prop-bet
app.post('/api/submit-prop-bet', async (req, res) => {
  /*
    Expects req.body.row to be an array:
    [betID, betName, howToWin, amount, rake, passcode, playersCSV, now, totalPayout, 'active', ...proofUrls, ...proofFilenames]
    And req.body.adminUsername for tracking the admin
  */
  const row = req.body.row;
  const adminUsername = req.body.adminUsername;
  
  if (!row || row.length < 10) {
    return res.status(400).json({ success: false, message: 'Invalid prop bet data.' });
  }
  
  if (!adminUsername) {
    return res.status(400).json({ success: false, message: 'Admin username required.' });
  }
  
  try {
    const sheets = getSheetsClient();
    const propBetsSheetName = 'Prop Bets';
    const playersSheetName = 'Players';
    
    // --- Fix rake and pot calculation ---
    const amount = parseFloat(row[3]);
    const players = row[6].split(',').map(p => p.trim()).filter(Boolean);
    const totalBet = amount * players.length;
    const rake = Math.round(totalBet * 0.10 * 100) / 100;
    const pot = Math.round((totalBet - rake) * 100) / 100;
    row[4] = rake; // update rake
    row[8] = pot;  // update pot/totalPayout
    
    // --- Add admin username to the row (after status) ---
    const adminColumn = adminUsername;
    row.splice(10, 0, adminColumn); // Insert admin username at position 10 (after status)
    
    // --- Only append image URLs (not filenames) ---
    // Assume proofUrls are from index 12 to 12+N, proofFilenames after that (adjusted for admin column)
    const proofCount = (row.length - 12) / 2;
    const proofUrls = row.slice(12, 12 + proofCount);
    // Compose the row for the sheet: [A-L, ...proofUrls] (L includes admin column)
    const sheetRow = row.slice(0, 12).concat(proofUrls);
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${propBetsSheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [sheetRow] }
    });
    
    // --- Deduct from each username in Players sheet ---
    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${playersSheetName}!A2:B`,
    });
    const playerRows = readRes.data.values || [];
    
    for (const username of players) {
      const idx = playerRows.findIndex(r => r[0] === username);
      if (idx !== -1) {
        const current = parseFloat(playerRows[idx][1] || '0');
        const newAmount = current - amount;
        await sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID,
          range: `${playersSheetName}!B${idx + 2}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[newAmount]] },
        });
      }
    }
    
    // --- Track admin username for later payout distribution ---
    console.log(`Prop bet created by admin ${adminUsername} - rake will be distributed upon settlement`);
    
    return res.json({ success: true });
  } catch (err) {
    console.error('Error in /api/submit-prop-bet:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/active-prop-bets
app.get('/api/active-prop-bets', async (req, res) => {
  try {
    const sheets = getSheetsClient();
    const propBetsSheetName = 'Prop Bets';
    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${propBetsSheetName}!A1:Z`,
    });
    const rows = readRes.data.values || [];
    if (rows.length < 2) return res.json([]); // No data
    const headers = rows[0];
    const bets = rows.slice(1).map(row => {
      const bet = {};
      headers.forEach((h, i) => bet[h] = row[i]);
      // For dropdown, only send betName and howToWin (and any other needed fields)
      return {
        betID: row[0],
        betName: row[1],
        howToWin: row[2],
        amount: row[3],
        rake: row[4],
        passcode: row[5],
        players: row[6],
        now: row[7],
        totalPayout: row[8],
        status: row[9],
        proofUrls: row.slice(10, 10 + (row.length - 10) / 2),
        proofFilenames: row.slice(10 + (row.length - 10) / 2)
      };
    }).filter(bet => bet.status === 'active');
    res.json(bets);
  } catch (err) {
    console.error('Error in /api/active-prop-bets:', err);
    res.status(500).json([]);
  }
});

// === SHEET SWAPPING ENDPOINTS ===

// POST /api/swap-sheet - Try to call Google Apps Script function
app.post('/api/swap-sheet', async (req, res) => {
  const { targetSheet, adminUsername } = req.body;
  
  if (!targetSheet || !adminUsername) {
    return res.status(400).json({ success: false, message: 'Target sheet and admin username required.' });
  }

  try {
    const sheets = getSheetsClient();
    
    // Try to call the Google Apps Script function toggleToSheet
    // This would require the Apps Script to be deployed as a web app
    // For now, we'll return false to trigger the fallback method
    console.log(`Attempting to swap to sheet: ${targetSheet} by admin: ${adminUsername}`);
    
    // Note: In a real implementation, you would call the Apps Script web app here
    // For now, we'll return false to use the fallback method
    return res.json({ success: false, message: 'Google Apps Script not available, using fallback method.' });
    
  } catch (err) {
    console.error('Error in /api/swap-sheet:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST /api/swap-sheet-fallback - Use Google Sheets API to show/hide sheets
app.post('/api/swap-sheet-fallback', async (req, res) => {
  const { targetSheet, adminUsername } = req.body;
  
  if (!targetSheet || !adminUsername) {
    return res.status(400).json({ success: false, message: 'Target sheet and admin username required.' });
  }

  try {
    const sheets = getSheetsClient();
    
    // Get all sheets in the spreadsheet
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
      includeGridData: false
    });
    
    const sheetList = spreadsheet.data.sheets;
    let targetSheetId = null;
    let visibleSheets = [];
    
    // Find the target sheet and identify currently visible sheets
    for (const sheet of sheetList) {
      if (sheet.properties.title === targetSheet) {
        targetSheetId = sheet.properties.sheetId;
      }
      if (!sheet.properties.hidden) {
        visibleSheets.push(sheet.properties.sheetId);
      }
    }
    
    if (!targetSheetId) {
      return res.status(400).json({ success: false, message: `Sheet "${targetSheet}" not found.` });
    }
    
    // Prepare batch update requests
    const requests = [];
    
    // If only one sheet is visible and it's the target sheet, do nothing
    if (visibleSheets.length === 1 && visibleSheets[0] === targetSheetId) {
      return res.json({ success: true, message: `Sheet "${targetSheet}" is already the only visible sheet.` });
    }
    
    // Hide all sheets except the target sheet
    for (const sheet of sheetList) {
      const sheetId = sheet.properties.sheetId;
      if (sheetId !== targetSheetId) {
        requests.push({
          updateSheetProperties: {
            properties: {
              sheetId: sheetId,
              hidden: true
            },
            fields: 'hidden'
          }
        });
      }
    }
    
    // Show the target sheet
    requests.push({
      updateSheetProperties: {
        properties: {
          sheetId: targetSheetId,
          hidden: false
        },
        fields: 'hidden'
      }
    });
    
    // Execute the batch update
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: requests
      }
    });
    
    console.log(`Successfully swapped to sheet: ${targetSheet} by admin: ${adminUsername}`);
    return res.json({ success: true, message: `Successfully swapped to "${targetSheet}" sheet.` });
    
  } catch (err) {
    console.error('Error in /api/swap-sheet-fallback:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Set active player endpoint
app.post('/api/set-active-player', async (req, res) => {
  const { playerName, adminUsername } = req.body;
  try {
    // Get all player usernames from the Players sheet
    const players = await getPlayersFromSheet(); // Implement this helper to read column A
    const usernames = players.map(p => p.username);
    if (!usernames.includes(playerName)) {
      return res.status(400).json({ success: false, message: 'Player not found' });
    }
    // Call Google Apps Script function setActivePlayer(playerName)
    const scriptResponse = await callGoogleAppsScript('setActivePlayer', { playerName, adminUsername });
    if (scriptResponse.success) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Script failed' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Helper to get all players from the Players sheet
async function getPlayersFromSheet() {
  // Use Google Sheets API to read column A of "Players" sheet
  // Example:
  // const sheetId = 'YOUR_SHEET_ID';
  // const range = 'Players!A:A';
  // const response = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range });
  // return response.data.values.map(row => ({ username: row[0] }));
  // For now, mock:
  return [{ username: 'john_doe' }, { username: 'jane_smith' }];
}

// Helper to call Google Apps Script
async function callGoogleAppsScript(functionName, params) {
  // ...existing code for calling Apps Script...
  // Example:
  // const response = await fetch('YOUR_APPS_SCRIPT_URL', { ... });
  // return await response.json();
  // For now, mock success:
  return { success: true };
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
