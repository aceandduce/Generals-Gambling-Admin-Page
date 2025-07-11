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
      </form>
    </div>
  `;
  document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
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
  };
}

function renderMainMenu() {
  document.querySelector('#app').innerHTML = `
    <div class="menu-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, ${loggedInUsername}!</p>
      <div class="menu-buttons">
        <button id="addFundsBtn" class="menu-button">Add Funds</button>
        <button id="sportsBetsBtn" class="menu-button">Take Sports Bets</button>
      </div>
      <button id="logoutBtn" class="logout-button">Logout</button>
    </div>
  `;

  document.getElementById('addFundsBtn').onclick = () => {
    currentPage = 'addFunds';
    renderForm();
  };

  document.getElementById('sportsBetsBtn').onclick = () => {
    currentPage = 'sportsBets';
    renderSportsBets();
  };

  document.getElementById('logoutBtn').onclick = () => {
    loggedIn = false;
    loggedInUsername = '';
    currentPage = 'menu';
    renderLogin();
  };
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
    // Upload image to ImgBB first
    const imgbbApiKey = '321fcbefd94f6d6936d225a7c1004060'; // <-- Replace with your ImgBB API key
    const imageBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(proofImage);
    });
    let imgbbUrl = '';
    try {
      const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: new URLSearchParams({ image: imageBase64 })
      });
      const imgbbData = await imgbbRes.json();
      if (imgbbData.success) {
        imgbbUrl = imgbbData.data.url;
      } else {
        document.getElementById('formError').innerText = 'Image upload failed.';
        return;
      }
    } catch (err) {
      document.getElementById('formError').innerText = 'Image upload failed.';
      return;
    }
    // Submit form with image URL as JSON
    const payload = {
      playerUsername,
      amountToAdd,
      proofImageUrl: imgbbUrl,
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
                <th>Original Odds</th>
                <th>Your Odds (20% vig)</th>
                <th>Line</th>
              </tr>
            </thead>
            <tbody>
      `;
      
      bookmaker.markets.forEach(market => {
        market.outcomes.forEach(outcome => {
          const originalOdds = outcome.price;
          const adjustedOdds = calculateAdjustedOdds(originalOdds);
          
          html += `
            <tr>
              <td>${getMarketDisplayName(market.key)}</td>
              <td class="betting-cell" data-event="${event.away_team} @ ${event.home_team}" data-event-time="${event.commence_time}" data-bet-type="${getMarketDisplayName(market.key)}" data-selection="${outcome.name}" data-odds="${adjustedOdds.toFixed(2)}" data-line="${outcome.point ? outcome.point : '-'}">${outcome.name}</td>
              <td>${originalOdds.toFixed(2)}</td>
              <td class="adjusted-odds">${adjustedOdds.toFixed(2)}</td>
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

function calculateAdjustedOdds(originalOdds) {
  // Apply 20% vig reduction with minimum of 1.01
  // Formula: adjusted_odds = original_odds * (1 - 0.20)
  const adjustedOdds = originalOdds * 0.8;
  return Math.max(adjustedOdds, 1.01);
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
  
  // Upload image to ImgBB
  const imgbbApiKey = '321fcbefd94f6d6936d225a7c1004060';
  const imageBase64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(proofImage);
  });
  
  let imgbbUrl = '';
  try {
    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: 'POST',
      body: new URLSearchParams({ image: imageBase64 })
    });
    const imgbbData = await imgbbRes.json();
    if (imgbbData.success) {
      imgbbUrl = imgbbData.data.url;
    } else {
      document.getElementById('bettingError').textContent = 'Image upload failed.';
      return;
    }
  } catch (err) {
    document.getElementById('bettingError').textContent = 'Image upload failed.';
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
    proofImageUrl: imgbbUrl,
    adminUsername: loggedInUsername
  };
  
  try {
    const res = await fetch(`${backendUrl}/api/submit-sports-bet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (res.ok) {
      document.getElementById('bettingSuccess').textContent = 'Bet placed successfully!';
      document.getElementById('bettingError').textContent = '';
      document.getElementById('bettingForm').reset();
      setTimeout(() => {
        closeBettingModal();
      }, 2000);
    } else {
      const data = await res.json();
      document.getElementById('bettingError').textContent = data.message || 'Failed to place bet.';
      document.getElementById('bettingSuccess').textContent = '';
    }
  } catch (err) {
    document.getElementById('bettingError').textContent = 'Failed to place bet.';
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
