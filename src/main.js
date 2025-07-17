import './style.css'

// Simple state for login
let loggedIn = false;
let loggedInUsername = '';
let currentPage = 'menu'; // 'menu', 'addFunds', 'sportsBets'
const backendUrl = 'https://admin-site-ze7d.onrender.com'; // <-- Set your Render backend URL here

// The Odds API Configuration
const ODDS_API_KEY = 'df860f2526805007d06289b53d901e26'; // <-- Replace with your Odds API key
const ODDS_API_BASE_URL = 'https://api.the-odds-api.com/v4';

function renderLogin() {
  document.querySelector('#app').innerHTML = `
    <div class="login-container">
      <h2>Login</h2>
      <form id="loginForm">
        <input type="text" id="loginUsername" placeholder="Username" required /><br />
        <input type="password" id="loginPassword" placeholder="Password" required /><br />
        <button type="submit">Login</button>
        <div id="loginError" style="color:red;"></div>
        <div id="loginLoading" style="color:red; display:none;">Loading... May take upwards of a minute.</div>
      </form>
    </div>
  `;
  document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // Show loading state
    document.getElementById('loginLoading').style.display = 'block';
    document.getElementById('loginError').innerText = '';
    
    try {
      const res = await fetch(`${backendUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        loggedIn = true;
        loggedInUsername = username;
        currentPage = 'menu';
        renderMainMenu();
      } else {
        const data = await res.json();
        document.getElementById('loginError').innerText = data.message || 'Login failed';
      }
    } catch (error) {
      document.getElementById('loginError').innerText = 'Connection failed. Please try again.';
    } finally {
      document.getElementById('loginLoading').style.display = 'none';
    }
  };
}

// 1. Helper to generate random BetID and random string for filenames
function generateRandomString(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
function getFileExtension(filename) {
  return filename.split('.').pop();
}
function generateBetID() {
  return 'PB-' + generateRandomString(10);
}

// Helper: Generate filename for Fivemanage with imageID
function getFivemanageFilename(imageID, file) {
  const ext = getFileExtension(file.name);
  return `GeneralsGamblingAdminImage_${imageID}.${ext}`;
}

// Universal Fivemanage upload with custom filename
async function uploadToFivemanageWithImageID(file, imageID) {
  const fivemanageApiKey = 'tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7';
  const filename = getFivemanageFilename(imageID, file);
  const formData = new FormData();
  formData.append('file', file, filename);
  formData.append('metadata', JSON.stringify({ name: filename, description: 'Proof image uploaded from Generals Gambling Admin.' }));
  const res = await fetch('https://fmapi.net/api/v2/image', {
    method: 'POST',
    headers: { 'Authorization': fivemanageApiKey },
    body: formData
  });
  const data = await res.json();
  if (res.ok && data.data && data.data.url) {
    return { url: data.data.url, filename };
  } else {
    throw new Error(data?.message || 'Image upload failed.');
  }
}

// 2. Update all Fivemanage uploads to use metadata with prefixed filename
async function uploadToFivemanage(file) {
  const fivemanageApiKey = 'tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7';
  const formData = new FormData();
  const ext = getFileExtension(file.name);
  const randomName = `GeneralsGamblingAdmin_${generateRandomString(12)}.${ext}`;
  formData.append('file', file, randomName);
  formData.append('metadata', JSON.stringify({ name: randomName }));
  const res = await fetch('https://fmapi.net/api/v2/image', {
    method: 'POST',
    headers: { 'Authorization': fivemanageApiKey },
    body: formData
  });
  const data = await res.json();
  if (res.ok && data.data && data.data.url) {
    return data.data.url;
  } else {
    throw new Error(data?.message || 'Image upload failed.');
  }
}

// 3. Add Prop Bets button to main menu
function renderMainMenu() {
  document.querySelector('#app').innerHTML = `
    <div class="menu-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, ${loggedInUsername}!</p>
      <div class="menu-buttons">
        <button id="addFundsBtn" class="menu-button">Add Funds</button>
        <button id="sportsBetsBtn" class="menu-button">Take Sports Bets</button>
        <button id="raffleTicketsBtn" class="menu-button">Raffle Tickets</button>
        <button id="propBetsBtn" class="menu-button">Prop Bets</button>
      </div>
      <button id="logoutBtn" class="logout-button">Logout</button>
    </div>
  `;
  document.getElementById('addFundsBtn').onclick = () => { currentPage = 'addFunds'; renderForm(); };
  document.getElementById('sportsBetsBtn').onclick = () => { currentPage = 'sportsBets'; renderSportsBets(); };
  document.getElementById('raffleTicketsBtn').onclick = () => { currentPage = 'raffleTickets'; renderRaffleTickets(); };
  document.getElementById('propBetsBtn').onclick = () => { currentPage = 'propBets'; renderPropBets(); };
  document.getElementById('logoutBtn').onclick = () => { loggedIn = false; loggedInUsername = ''; currentPage = 'menu'; renderLogin(); };
}

function renderSportsBets() {
  document.querySelector('#app').innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
      <button id="backToMenuBtn" style="padding: 0.5rem 1rem; background: #666; color: #fff; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; width: auto;">← Back to Menu</button>
      <div class="form-container">
        <h2>Sports Betting</h2>
        <div class="sports-betting-container">
          <div class="sport-selector">
            <label for="sportSelect">Select Sport:</label>
            <select id="sportSelect">
              <option value="">Loading sports...</option>
            </select>
          </div>
          <div id="oddsContainer" class="odds-container">
            <p>Select a sport to view available odds</p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('backToMenuBtn').onclick = () => {
    currentPage = 'menu';
    renderMainMenu();
  };

  // Load sports list
  loadSportsList();
  
  // Add event listener for sport selection
  document.getElementById('sportSelect').addEventListener('change', function() {
    const selectedSport = this.value;
    if (selectedSport) {
      loadOddsForSport(selectedSport);
    } else {
      document.getElementById('oddsContainer').innerHTML = '<p>Select a sport to view available odds</p>';
    }
  });
}

function renderForm() {
  document.querySelector('#app').innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
      <button id="backToMenuBtn" style="padding: 0.5rem 1rem; background: #666; color: #fff; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; width: auto;">← Back to Menu</button>
      <div class="form-container">
        <h2>Submit Player Data</h2>
        <form id="playerForm">
        <label>Username of Player</label><br />
        <input type="text" id="playerUsername" required /><br />
        <label>Amount to Add</label><br />
        <input type="number" id="amountToAdd" required /><br />
        <label>Upload Proof of Purchase Here.</label><br />
        <input type="file" id="proofImage" accept="image/*" required /><br />
        <div style="font-size: 0.9em; color: #fff;">You can also paste an image from your clipboard.</div>
        <button type="button" id="exampleBtn" style="margin-top:10px;">Example</button>
        <button type="submit">Submit</button>
        <div id="formError" style="color:red;"></div>
        <div id="formSuccess" style="color:green;"></div>
      </form>
      <div id="exampleModal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.6); align-items:center; justify-content:center; z-index:1000;">
        <div style="background:#fff; padding:24px; border-radius:8px; max-width:90vw; max-height:90vh; text-align:center; position:relative;">
          <div style="margin-bottom:12px; font-weight:bold; color:#111;">Here's an example of the proof of purchase, we need the full details of the charge. You can get it on your phone.</div>
          <img src="https://i.ibb.co/ns7DFSTG/image.png" alt="Example Proof" style="max-width:100%; max-height:60vh; border:1px solid #ccc; border-radius:4px;" />
          <br />
          <button id="closeExampleModal" style="margin-top:16px;">Close</button>
        </div>
      </div>
    </div>
  `;

  // Modal logic
  document.getElementById('exampleBtn').onclick = () => {
    document.getElementById('exampleModal').style.display = 'flex';
  };
  document.getElementById('closeExampleModal').onclick = () => {
    document.getElementById('exampleModal').style.display = 'none';
  };

  // Back to menu button
  document.getElementById('backToMenuBtn').onclick = () => {
    currentPage = 'menu';
    renderMainMenu();
  };

  // Add paste event to allow clipboard image upload
  const proofImageInput = document.getElementById('proofImage');
  document.getElementById('playerForm').addEventListener('paste', (event) => {
    if (event.clipboardData && event.clipboardData.files && event.clipboardData.files.length > 0) {
      const file = event.clipboardData.files[0];
      if (file.type.startsWith('image/')) {
        // Create a DataTransfer to set the file input
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        proofImageInput.files = dataTransfer.files;
        // Optionally, show a preview or feedback
      }
    }
  });

  document.getElementById('playerForm').onsubmit = async (e) => {
    e.preventDefault();
    const playerUsername = document.getElementById('playerUsername').value;
    const amountToAdd = document.getElementById('amountToAdd').value;
    const proofImage = document.getElementById('proofImage').files[0];
    if (!proofImage) {
      document.getElementById('formError').innerText = 'Image required.';
      return;
    }
    let fivemanageUrl = '', fivemanageFilename = '';
    try {
      const imageID = generateRandomString(12);
      const { url, filename } = await uploadToFivemanageWithImageID(proofImage, imageID);
      fivemanageUrl = url;
      fivemanageFilename = filename;
    } catch (err) {
      document.getElementById('formError').innerText = err.message;
      return;
    }
    // Submit form with image URL and filename as JSON
    const payload = {
      playerUsername,
      amountToAdd,
      proofImageUrl: fivemanageUrl,
      proofImageFilename: fivemanageFilename,
      adminUsername: loggedInUsername
    };
    const res = await fetch(`${backendUrl}/api/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      document.getElementById('formSuccess').innerText = 'Submitted successfully!';
      document.getElementById('formError').innerText = '';
      document.getElementById('playerForm').reset();
    } else {
      const data = await res.json();
      document.getElementById('formError').innerText = data.message || 'Submission failed.';
      document.getElementById('formSuccess').innerText = '';
    }
  };
}

function renderRaffleTickets() {
  document.querySelector('#app').innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
      <button id="backToMenuBtn" style="padding: 0.5rem 1rem; background: #666; color: #fff; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; width: auto;">← Back to Menu</button>
      <div class="form-container">
        <h2>Raffle Tickets</h2>
        <form id="raffleForm">
          <label>Phone Number</label><br />
          <input type="tel" id="phoneNumber" required /><br />
          <label>State ID</label><br />
          <input type="text" id="stateId" required /><br />
          <label>Amount Purchased</label><br />
          <input type="number" id="amountPurchased" min="1" max="10" required /><br />
          <label>Upload Proof of Purchase Here.</label><br />
          <input type="file" id="raffleProofImage" accept="image/*" required /><br />
          <div style="font-size: 0.9em; color: #fff;">You can also paste an image from your clipboard.</div>
          <button type="button" id="raffleExampleBtn" style="margin-top:10px;">Example</button>
          <button type="submit">Submit</button>
          <div id="raffleFormError" style="color:red;"></div>
          <div id="raffleFormSuccess" style="color:green;"></div>
        </form>
        <div id="raffleExampleModal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.6); align-items:center; justify-content:center; z-index:1000;">
          <div style="background:#fff; padding:24px; border-radius:8px; max-width:90vw; max-height:90vh; text-align:center; position:relative;">
            <div style="margin-bottom:12px; font-weight:bold; color:#111;">Here's an example of the proof of purchase, we need the full details of the charge. You can get it on your phone.</div>
            <img src="https://i.ibb.co/ns7DFSTG/image.png" alt="Example Proof" style="max-width:100%; max-height:60vh; border:1px solid #ccc; border-radius:4px;" />
            <br />
            <button id="closeRaffleExampleModal" style="margin-top:16px;">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Modal logic
  document.getElementById('raffleExampleBtn').onclick = () => {
    document.getElementById('raffleExampleModal').style.display = 'flex';
  };
  document.getElementById('closeRaffleExampleModal').onclick = () => {
    document.getElementById('raffleExampleModal').style.display = 'none';
  };

  // Back to menu button
  document.getElementById('backToMenuBtn').onclick = () => {
    currentPage = 'menu';
    renderMainMenu();
  };

  // Add paste event to allow clipboard image upload
  const raffleProofImageInput = document.getElementById('raffleProofImage');
  document.getElementById('raffleForm').addEventListener('paste', (event) => {
    if (event.clipboardData && event.clipboardData.files && event.clipboardData.files.length > 0) {
      const file = event.clipboardData.files[0];
      if (file.type.startsWith('image/')) {
        // Create a DataTransfer to set the file input
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        raffleProofImageInput.files = dataTransfer.files;
        // Optionally, show a preview or feedback
      }
    }
  });

  document.getElementById('raffleForm').onsubmit = async (e) => {
    e.preventDefault();
    const phoneNumber = document.getElementById('phoneNumber').value;
    const stateId = document.getElementById('stateId').value;
    const amountPurchased = document.getElementById('amountPurchased').value;
    const proofImage = document.getElementById('raffleProofImage').files[0];
    
    if (!proofImage) {
      document.getElementById('raffleFormError').innerText = 'Image required.';
      return;
    }
    
    let fivemanageUrl = '', fivemanageFilename = '';
    try {
      const imageID = generateRandomString(12);
      const { url, filename } = await uploadToFivemanageWithImageID(proofImage, imageID);
      fivemanageUrl = url;
      fivemanageFilename = filename;
    } catch (err) {
      document.getElementById('raffleFormError').innerText = err.message;
      return;
    }
    
    // Submit form with image URL and filename as JSON
    const payload = {
      phoneNumber,
      stateId,
      amountPurchased,
      proofImageUrl: fivemanageUrl,
      proofImageFilename: fivemanageFilename,
      adminUsername: loggedInUsername
    };
    
    try {
      const res = await fetch(`${backendUrl}/api/submit-raffle-ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        document.getElementById('raffleFormSuccess').innerText = 'Raffle ticket submitted successfully!';
        document.getElementById('raffleFormError').innerText = '';
        document.getElementById('raffleForm').reset();
      } else {
        const data = await res.json();
        document.getElementById('raffleFormError').innerText = data.message || 'Submission failed.';
        document.getElementById('raffleFormSuccess').innerText = '';
      }
    } catch (error) {
      document.getElementById('raffleFormError').innerText = 'Connection failed. Please try again.';
      document.getElementById('raffleFormSuccess').innerText = '';
    }
  };
}

// 4. Prop Bets UI
function renderPropBets() {
  document.querySelector('#app').innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
      <button id="backToMenuBtn" style="padding: 0.5rem 1rem; background: #666; color: #fff; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; width: auto;">← Back to Menu</button>
      <div class="form-container">
        <h2>Prop Bets</h2>
        <form id="propBetForm">
          <label>Usernames/StateIDs of players, comma separated</label><br />
          <textarea id="propPlayers" placeholder="e.g. john_doe, 123456, jane_smith" required style="width:100%; min-height:40px;"></textarea><br />
          <label>Name Bet</label><br />
          <input type="text" id="propBetName" placeholder="Something Memorable" required /><br />
          <label>How to win the bet?</label><br />
          <input type="text" id="propHowToWin" placeholder="e.g. First to score 10 points" required /><br />
          <label>Amount to bet (+10% rake)</label><br />
          <input type="number" id="propAmount" min="1" required /><br />
          <label>Passcode (required to join later)</label><br />
          <input type="password" id="propPasscode" required /><br />
          <label>Submit Proof of Purchase (can submit multiple at once)</label><br />
          <input type="file" id="propProofImages" accept="image/*" multiple required /><br />
          <div style="font-size: 0.9em; color: #fff;">You can also paste images from your clipboard. <button type="button" id="propExampleBtn" style="margin-left:10px;">Example</button></div>
          <button type="submit">Submit Bet</button>
          <div id="propFormError" style="color:red;"></div>
          <div id="propFormSuccess" style="color:green;"></div>
        </form>
        <div id="propExampleModal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.6); align-items:center; justify-content:center; z-index:1000;">
          <div style="background:#fff; padding:24px; border-radius:8px; max-width:90vw; max-height:90vh; text-align:center; position:relative;">
            <div style="margin-bottom:12px; font-weight:bold; color:#111;">Here's an example of the proof of purchase, we need the full details of the charge. You can get it on your phone.</div>
            <img src="https://i.ibb.co/ns7DFSTG/image.png" alt="Example Proof" style="max-width:100%; max-height:60vh; border:1px solid #ccc; border-radius:4px;" />
            <br />
            <button id="closePropExampleModal" style="margin-top:16px;">Close</button>
          </div>
        </div>
      </div>
      <div id="propActiveDropdownContainer" style="margin-top:2rem; width:100%; max-width:500px;"></div>
    </div>
  `;
  document.getElementById('backToMenuBtn').onclick = () => { currentPage = 'menu'; renderMainMenu(); };
  document.getElementById('propExampleBtn').onclick = () => { document.getElementById('propExampleModal').style.display = 'flex'; };
  document.getElementById('closePropExampleModal').onclick = () => { document.getElementById('propExampleModal').style.display = 'none'; };
  document.getElementById('propBetForm').onsubmit = handlePropBetFormSubmit;
  renderPropActiveDropdown();
}

// --- PROP BETS FULL IMPLEMENTATION ---

// Helper: Fetch all players from Players sheet (for balance deduction)
async function fetchPlayers() {
  // Assumes backend endpoint returns [{username: 'john', balance: 100}, ...]
  const res = await fetch(`${backendUrl}/api/players`);
  if (!res.ok) return [];
  return await res.json();
}

// Helper: Get player balance
async function getPlayerBalance(username) {
  const res = await fetch(`${backendUrl}/api/player-balance/${encodeURIComponent(username)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.balance;
}

// Helper: Deduct balance
async function deductPlayerBalance(username, amount) {
  await fetch(`${backendUrl}/api/deduct-balance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, amount })
  });
}

// --- Prop Bets Form Submission (with balance logic) ---
async function handlePropBetFormSubmit(e) {
  e.preventDefault();
  const playersRaw = document.getElementById('propPlayers').value.trim();
  const betName = document.getElementById('propBetName').value.trim();
  const howToWin = document.getElementById('propHowToWin').value.trim();
  const amount = parseFloat(document.getElementById('propAmount').value);
  const passcode = document.getElementById('propPasscode').value.trim();
  const proofFiles = Array.from(document.getElementById('propProofImages').files);
  const players = playersRaw.split(',').map(p => p.trim()).filter(Boolean);
  if (!players.length || !betName || !howToWin || !amount || !passcode || !proofFiles.length) {
    document.getElementById('propFormError').innerText = 'All fields are required.';
    return;
  }
  document.getElementById('propFormError').innerText = '';
  document.getElementById('propFormSuccess').innerText = 'Uploading images...';
  let proofUploads = [];
  const betID = generateBetID();
  try {
    for (let i = 0; i < proofFiles.length; i++) {
      const file = proofFiles[i];
      const imageID = `${betID}_${i+1}`;
      const { url, filename } = await uploadToFivemanageWithImageID(file, imageID);
      proofUploads.push({ url, filename });
    }
  } catch (err) {
    document.getElementById('propFormError').innerText = err.message;
    document.getElementById('propFormSuccess').innerText = '';
    return;
  }
  // Prepare row for Google Sheets: [A-K+], now with filenames
  const rake = Math.round(amount * 0.10 * 100) / 100;
  const totalPayout = Math.round((amount * players.length + rake) * 100) / 100;
  const now = new Date().toLocaleString();
  const proofUrls = proofUploads.map(p => p.url);
  const proofFilenames = proofUploads.map(p => p.filename);
  const row = [
    betID, betName, howToWin, amount, rake, passcode, players.join(','), now, totalPayout, 'active', ...proofUrls, ...proofFilenames
  ];
  // Submit to backend/Google Sheets
  await fetch(`${backendUrl}/api/submit-prop-bet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ row })
  });
  document.getElementById('propFormSuccess').innerText = 'Prop bet submitted!';
  document.getElementById('propFormError').innerText = '';
  document.getElementById('propBetForm').reset();
  renderPropActiveDropdown();
}

// --- Fetch and Render Active Bets Dropdown ---
async function renderPropActiveDropdown() {
  const res = await fetch(`${backendUrl}/api/active-prop-bets`);
  const bets = res.ok ? await res.json() : [];
  const container = document.getElementById('propActiveDropdownContainer');
  container.innerHTML = `
    <label for="propActiveDropdown">Join an Active Prop Bet:</label>
    <input id="propActiveDropdown" list="propActiveList" placeholder="Search by bet name..." style="width:100%; padding:0.5rem;" />
    <datalist id="propActiveList">
      ${bets.map(bet => `<option value="${bet.betName}">${bet.betName} - ${bet.howToWin}</option>`).join('')}
    </datalist>
    <button id="propJoinBtn" style="margin-top:10px;">Join</button>
    <div id="propJoinError" style="color:red;"></div>
  `;
  document.getElementById('propJoinBtn').onclick = () => handlePropJoin(bets);
}

// --- Join Modal Logic ---
async function handlePropJoin(bets) {
  const betName = document.getElementById('propActiveDropdown').value.trim();
  const bet = bets.find(b => b.betName === betName);
  if (!bet) {
    document.getElementById('propJoinError').innerText = 'Bet not found.';
    return;
  }
  // Show passcode modal
  showPropJoinModal(bet);
}

function showPropJoinModal(bet) {
  // Remove any existing modal
  let modal = document.getElementById('propJoinModal');
  if (modal) modal.remove();
  // Modal HTML
  modal = document.createElement('div');
  modal.id = 'propJoinModal';
  modal.style = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:2000;';
  modal.innerHTML = `
    <div style="background:#fff; padding:2rem; border-radius:10px; max-width:500px; width:90vw; max-height:90vh; overflow-y:auto; position:relative;">
      <button id="closePropJoinModal" style="position:absolute; top:10px; right:15px; background:none; border:none; color:#333; font-size:1.5rem; cursor:pointer;">×</button>
      <h3>${bet.betName}</h3>
      <div style="margin-bottom:1rem;">How to win: <b>${bet.howToWin}</b></div>
      <form id="propJoinPassForm">
        <label>Enter Passcode:</label><br />
        <input type="password" id="propJoinPasscode" required style="width:100%; margin-bottom:1rem;" />
        <button type="submit">Check</button>
        <div id="propJoinPassError" style="color:red;"></div>
      </form>
      <div id="propJoinDetails" style="display:none;"></div>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById('closePropJoinModal').onclick = () => modal.remove();
  document.getElementById('propJoinPassForm').onsubmit = (e) => {
    e.preventDefault();
    const pass = document.getElementById('propJoinPasscode').value;
    if (pass !== bet.passcode) {
      document.getElementById('propJoinPassError').innerText = 'Incorrect passcode.';
      return;
    }
    document.getElementById('propJoinPassError').innerText = '';
    showPropJoinDetails(bet, modal);
  };
}

function showPropJoinDetails(bet, modal) {
  const details = document.getElementById('propJoinDetails');
  details.style.display = 'block';
  details.innerHTML = `
    <div style="margin-bottom:1rem;">Current Players: <b>${bet.players}</b></div>
    <div style="margin-bottom:1rem;">Total Payout: <b>${bet.totalPayout}</b></div>
    <form id="propAddToBetForm">
      <label>Usernames/StateIDs (comma separated):</label><br />
      <textarea id="propAddPlayers" placeholder="e.g. john_doe, 123456" required style="width:100%; min-height:40px;"></textarea><br />
      <label>Submit Proof of Purchase (multiple):</label><br />
      <input type="file" id="propAddProofImages" accept="image/*" multiple required /><br />
      <button type="submit">Add to Bet</button>
      <div id="propAddToBetError" style="color:red;"></div>
      <div id="propAddToBetSuccess" style="color:green;"></div>
    </form>
  `;
  document.getElementById('propAddToBetForm').onsubmit = (e) => handleAddToPropBet(e, bet, modal);
}

async function handleAddToPropBet(e, bet, modal) {
  e.preventDefault();
  const addPlayersRaw = document.getElementById('propAddPlayers').value.trim();
  const addProofFiles = Array.from(document.getElementById('propAddProofImages').files);
  const addPlayers = addPlayersRaw.split(',').map(p => p.trim()).filter(Boolean);
  if (!addPlayers.length || !addProofFiles.length) {
    document.getElementById('propAddToBetError').innerText = 'All fields required.';
    return;
  }
  document.getElementById('propAddToBetError').innerText = '';
  document.getElementById('propAddToBetSuccess').innerText = 'Uploading images...';
  let proofUrls = [];
  try {
    for (const file of addProofFiles) {
      const url = await uploadToFivemanage(file);
      proofUrls.push(url);
    }
  } catch (err) {
    document.getElementById('propAddToBetError').innerText = err.message;
    document.getElementById('propAddToBetSuccess').innerText = '';
    return;
  }
  // Deduct balance for usernames in Players sheet
  const allPlayers = await fetchPlayers();
  for (const player of addPlayers) {
    const isUsername = allPlayers.some(p => p.username === player);
    if (isUsername) {
      await deductPlayerBalance(player, bet.amount);
    }
    // If not username (assume stateID), require proof (already enforced by UI: one proof per player)
  }
  // Update backend/Google Sheets: append new players and proof images, update payout
  await fetch(`${backendUrl}/api/join-prop-bet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      betID: bet.betID,
      addPlayers: addPlayers.join(','),
      addProofUrls: proofUrls
    })
  });
  document.getElementById('propAddToBetSuccess').innerText = 'Added to bet!';
  document.getElementById('propAddToBetError').innerText = '';
  document.getElementById('propAddToBetForm').reset();
  setTimeout(() => modal.remove(), 2000);
  renderPropActiveDropdown();
}

// Sports betting functions
async function loadSportsList() {
  try {
    const response = await fetch(`${ODDS_API_BASE_URL}/sports?apiKey=${ODDS_API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const sports = await response.json();
    
    const select = document.getElementById('sportSelect');
    select.innerHTML = '<option value="">Select a sport...</option>';
    
    // Filter for active sports and sort by group
    const activeSports = sports.filter(sport => sport.active).sort((a, b) => {
      if (a.group === b.group) {
        return a.title.localeCompare(b.title);
      }
      return a.group.localeCompare(b.group);
    });
    
    activeSports.forEach(sport => {
      const option = document.createElement('option');
      option.value = sport.key;
      option.textContent = `${sport.group} - ${sport.title}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading sports:', error);
    document.getElementById('sportSelect').innerHTML = '<option value="">Error loading sports</option>';
  }
}

async function loadOddsForSport(sportKey) {
  const oddsContainer = document.getElementById('oddsContainer');
  oddsContainer.innerHTML = '<p>Loading odds...</p>';
  
  try {
    const response = await fetch(`${ODDS_API_BASE_URL}/sports/${sportKey}/odds?regions=us&oddsFormat=decimal&markets=h2h,spreads,totals&apiKey=${ODDS_API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const oddsData = await response.json();
    // Transform the API response to match our display format
    const transformedData = {
      title: getSportTitle(sportKey),
      events: oddsData
    };
    displayOdds(transformedData);
  } catch (error) {
    console.error('Error loading odds:', error);
    oddsContainer.innerHTML = '<p>Error loading odds. Please try again.</p>';
  }
}

function getSportTitle(sportKey) {
  const sportTitles = {
    'americanfootball_nfl': 'NFL',
    'americanfootball_ncaaf': 'NCAAF',
    'basketball_nba': 'NBA',
    'basketball_wnba': 'WNBA',
    'baseball_mlb': 'MLB',
    'icehockey_nhl': 'NHL',
    'soccer_epl': 'EPL',
    'soccer_usa_mls': 'MLS',
    'mma_mixed_martial_arts': 'MMA'
  };
  return sportTitles[sportKey] || sportKey;
}

function displayOdds(sportData) {
  const oddsContainer = document.getElementById('oddsContainer');
  
  if (!sportData.events || sportData.events.length === 0) {
    oddsContainer.innerHTML = '<p>No events available for this sport at the moment.</p>';
    return;
  }
  
  let html = `<h3>${sportData.title} - Upcoming Games</h3>`;
  
  sportData.events.forEach((event, index) => {
    const eventDate = new Date(event.commence_time).toLocaleString();
    
    html += `
      <div class="event-card" id="event-card-${index}">
        <div class="event-header">
          <h4>${event.away_team} @ ${event.home_team}</h4>
          <p class="event-time">${eventDate}</p>
        </div>
        <div class="event-content" id="event-content-${index}">
          <div class="odds-tables">
    `;
    
    event.bookmakers.forEach(bookmaker => {
      html += `
        <div class="bookmaker-section">
          <h5>${bookmaker.title}</h5>
          <table class="odds-table">
            <thead>
              <tr>
                <th>Bet Type</th>
                <th>Selection</th>
                <th>Odds</th>
                <th>Line</th>
              </tr>
            </thead>
            <tbody>
      `;
      
      bookmaker.markets.forEach(market => {
        market.outcomes.forEach(outcome => {
          const originalOdds = outcome.price;
          
          html += `
            <tr>
              <td>${getMarketDisplayName(market.key)}</td>
              <td class="betting-cell" data-event="${event.away_team} @ ${event.home_team}" data-event-time="${event.commence_time}" data-bet-type="${getMarketDisplayName(market.key)}" data-selection="${outcome.name}" data-odds="${originalOdds.toFixed(2)}" data-line="${outcome.point ? outcome.point : '-'}">${outcome.name}</td>
              <td>${originalOdds.toFixed(2)}</td>
              <td>${outcome.point ? outcome.point : '-'}</td>
            </tr>
          `;
        });
      });
      
      html += `
            </tbody>
          </table>
        </div>
      `;
    });
    
    html += `
          </div>
        </div>
      </div>
    `;
  });
  
  oddsContainer.innerHTML = html;

  // Add betting modal HTML
  oddsContainer.innerHTML += `
    <div id="bettingModal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.8); align-items:center; justify-content:center; z-index:1000;">
      <div style="background:#222; padding:2rem; border-radius:10px; max-width:500px; width:90vw; max-height:90vh; overflow-y:auto; position:relative;">
        <button id="closeBettingModal" style="position:absolute; top:10px; right:15px; background:none; border:none; color:#fff; font-size:1.5rem; cursor:pointer;">×</button>
        <h3 id="modalEventTitle" style="color:#646cff; margin-bottom:1.5rem;"></h3>
        <form id="bettingForm">
          <div style="margin-bottom:1rem;">
            <label style="display:block; margin-bottom:0.5rem; color:#fff;">Username/Bank:</label>
            <input type="text" id="bettingUsername" required style="width:100%; padding:0.5rem; border-radius:5px; border:1px solid #444; background:#333; color:#fff;" />
          </div>
          <div style="margin-bottom:1rem;">
            <label style="display:block; margin-bottom:0.5rem; color:#fff;">Amount Bet:</label>
            <input type="number" id="bettingAmount" required style="width:100%; padding:0.5rem; border-radius:5px; border:1px solid #444; background:#333; color:#fff;" />
          </div>
          <div style="margin-bottom:1rem;">
            <label style="display:block; margin-bottom:0.5rem; color:#fff;">Team Selection:</label>
            <div id="teamSelection" style="display:flex; gap:1rem; margin-bottom:1rem;">
              <!-- Team buttons will be added here -->
            </div>
          </div>
          <div style="margin-bottom:1rem;">
            <label style="display:block; margin-bottom:0.5rem; color:#fff;">Upload Proof of Purchase:</label>
            <input type="file" id="bettingProofImage" accept="image/*" required style="width:100%; padding:0.5rem; border-radius:5px; border:1px solid #444; background:#333; color:#fff;" />
            <div style="font-size: 0.9em; color: #ccc; margin-top:0.5rem;">You can also paste an image from your clipboard.</div>
            <button type="button" id="bettingExampleBtn" style="margin-top:10px; padding:0.5rem 1rem; background:#646cff; color:#fff; border:none; border-radius:5px; cursor:pointer;">Example</button>
          </div>
          <button type="submit" style="width:100%; padding:0.7rem; background:#646cff; color:#fff; border:none; border-radius:5px; font-size:1rem; cursor:pointer;">Place Bet</button>
          <div id="bettingError" style="color:red; margin-top:0.5rem;"></div>
          <div id="bettingSuccess" style="color:green; margin-top:0.5rem;"></div>
        </form>
      </div>
    </div>
    <div id="bettingExampleModal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.6); align-items:center; justify-content:center; z-index:1001;">
      <div style="background:#fff; padding:24px; border-radius:8px; max-width:90vw; max-height:90vh; text-align:center; position:relative;">
        <div style="margin-bottom:12px; font-weight:bold; color:#111;">Here's an example of the proof of purchase, we need the full details of the charge. You can get it on your phone.</div>
        <img src="https://i.ibb.co/ns7DFSTG/image.png" alt="Example Proof" style="max-width:100%; max-height:60vh; border:1px solid #ccc; border-radius:4px;" />
        <br />
        <button id="closeBettingExampleModal" style="margin-top:16px; padding:0.5rem 1rem; background:#646cff; color:#fff; border:none; border-radius:5px; cursor:pointer;">Close</button>
      </div>
    </div>
  `;

  // Add event listeners for collapsible cards and set initial collapsed state
  sportData.events.forEach((event, index) => {
    const card = document.getElementById(`event-card-${index}`);
    const content = document.getElementById(`event-content-${index}`);
    
    if (card && content) {
      // Set initial collapsed state
      content.style.display = 'none';
      card.classList.add('collapsed');
      
      card.addEventListener('click', function (e) {
        // Prevent toggling if clicking inside the event-content (e.g., on a table)
        if (e.target.closest('.event-content')) return;
        
        if (content.style.display === 'none') {
          content.style.display = 'block';
          card.classList.remove('collapsed');
        } else {
          content.style.display = 'none';
          card.classList.add('collapsed');
        }
      });
    }
  });

  // Add event listeners for betting cells
  document.querySelectorAll('.betting-cell').forEach(cell => {
    cell.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent card collapse
      openBettingModal(this);
    });
  });

  // Add modal event listeners
  document.getElementById('closeBettingModal').addEventListener('click', closeBettingModal);
  document.getElementById('closeBettingExampleModal').addEventListener('click', closeBettingExampleModal);
  document.getElementById('bettingExampleBtn').addEventListener('click', () => {
    document.getElementById('bettingExampleModal').style.display = 'flex';
  });
  
  // Add paste event for betting form
  const bettingProofImageInput = document.getElementById('bettingProofImage');
  document.getElementById('bettingForm').addEventListener('paste', (event) => {
    if (event.clipboardData && event.clipboardData.files && event.clipboardData.files.length > 0) {
      const file = event.clipboardData.files[0];
      if (file.type.startsWith('image/')) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        bettingProofImageInput.files = dataTransfer.files;
      }
    }
  });

  // Add form submission handler
  document.getElementById('bettingForm').addEventListener('submit', handleBettingFormSubmit);
}



function getMarketDisplayName(marketKey) {
  const marketNames = {
    'h2h': 'Moneyline',
    'spreads': 'Spread',
    'totals': 'Total'
  };
  return marketNames[marketKey] || marketKey;
}

// Betting modal functions
let currentBettingData = null;

function openBettingModal(cell) {
  const event = cell.dataset.event;
  const eventTime = cell.dataset.eventTime;
  const betType = cell.dataset.betType;
  const selection = cell.dataset.selection;
  const odds = cell.dataset.odds;
  const line = cell.dataset.line;
  
  currentBettingData = {
    event,
    eventTime,
    betType,
    selection,
    odds,
    line
  };
  
  // Set modal title
  document.getElementById('modalEventTitle').textContent = `${event} - ${betType}`;
  
  // Create team selection buttons
  const teamSelection = document.getElementById('teamSelection');
  teamSelection.innerHTML = '';
  
  // For moneyline bets, show both teams
  if (betType === 'Moneyline') {
    const teams = event.split(' @ ');
    teams.forEach(team => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = team;
      button.style.cssText = 'padding:0.5rem 1rem; background:#333; color:#fff; border:1px solid #444; border-radius:5px; cursor:pointer; flex:1;';
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        teamSelection.querySelectorAll('button').forEach(btn => {
          btn.style.background = '#333';
          btn.style.borderColor = '#444';
        });
        // Add active class to clicked button
        this.style.background = '#646cff';
        this.style.borderColor = '#646cff';
        currentBettingData.selectedTeam = this.textContent;
      });
      teamSelection.appendChild(button);
    });
  } else {
    // For spread/total bets, show the selection
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = selection;
    button.style.cssText = 'padding:0.5rem 1rem; background:#646cff; color:#fff; border:1px solid #646cff; border-radius:5px; cursor:pointer; width:100%;';
    currentBettingData.selectedTeam = selection;
    teamSelection.appendChild(button);
  }
  
  // Clear form
  document.getElementById('bettingForm').reset();
  document.getElementById('bettingError').textContent = '';
  document.getElementById('bettingSuccess').textContent = '';
  
  // Show modal
  document.getElementById('bettingModal').style.display = 'flex';
}

function closeBettingModal() {
  document.getElementById('bettingModal').style.display = 'none';
  currentBettingData = null;
}

function closeBettingExampleModal() {
  document.getElementById('bettingExampleModal').style.display = 'none';
}

async function handleBettingFormSubmit(e) {
  e.preventDefault();
  
  if (!currentBettingData || !currentBettingData.selectedTeam) {
    document.getElementById('bettingError').textContent = 'Please select a team.';
    return;
  }
  
  const username = document.getElementById('bettingUsername').value;
  const amount = document.getElementById('bettingAmount').value;
  const proofImage = document.getElementById('bettingProofImage').files[0];
  
  if (!proofImage) {
    document.getElementById('bettingError').textContent = 'Image required.';
    return;
  }
  
  // Show loading state
  document.getElementById('bettingSuccess').textContent = 'Processing... Please wait.';
  document.getElementById('bettingError').textContent = '';
  
  let fivemanageUrl = '', fivemanageFilename = '';
  try {
    const imageID = generateRandomString(12);
    const { url, filename } = await uploadToFivemanageWithImageID(proofImage, imageID);
    fivemanageUrl = url;
    fivemanageFilename = filename;
  } catch (err) {
    document.getElementById('bettingError').textContent = err.message;
    document.getElementById('bettingSuccess').textContent = '';
    return;
  }
  
  // Submit to backend
  const payload = {
    username,
    amountBet: amount,
    eventName: currentBettingData.event,
    eventTime: currentBettingData.eventTime,
    betType: currentBettingData.betType,
    selectedTeam: currentBettingData.selectedTeam,
    odds: currentBettingData.odds,
    line: currentBettingData.line,
    proofImageUrl: fivemanageUrl,
    proofImageFilename: fivemanageFilename,
    adminUsername: loggedInUsername
  };
  
  try {
    const res = await fetch(`${backendUrl}/api/submit-sports-bet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (res.ok) {
      document.getElementById('bettingSuccess').textContent = '✅ Bet submitted successfully! Data saved to database.';
      document.getElementById('bettingError').textContent = '';
      document.getElementById('bettingForm').reset();
      setTimeout(() => {
        closeBettingModal();
      }, 3000);
    } else {
      const data = await res.json();
      document.getElementById('bettingError').textContent = data.message || 'Failed to place bet.';
      document.getElementById('bettingSuccess').textContent = '';
    }
  } catch (err) {
    document.getElementById('bettingError').textContent = 'Connection failed. Please try again.';
    document.getElementById('bettingSuccess').textContent = '';
  }
}

// Make toggleEventCard globally accessible
window.toggleEventCard = function(index) {
  console.log('Toggle called for index:', index);
  const content = document.getElementById(`event-content-${index}`);
  const eventCard = content.closest('.event-card');
  
  console.log('Content element:', content);
  console.log('Current display style:', content.style.display);
  
  if (content.style.display === 'none') {
    // Expand
    content.style.display = 'block';
    eventCard.classList.remove('collapsed');
    console.log('Expanding card');
  } else {
    // Collapse
    content.style.display = 'none';
    eventCard.classList.add('collapsed');
    console.log('Collapsing card');
  }
}

if (!loggedIn) {
  renderLogin();
} else {
  renderMainMenu();
}
