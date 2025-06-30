import './style.css'

// Simple state for login
let loggedIn = false;
let loggedInUsername = '';
const backendUrl = 'https://admin-site-ze7d.onrender.com'; // <-- Set your Render backend URL here

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
      renderForm();
    } else {
      const data = await res.json();
      document.getElementById('loginError').innerText = data.message || 'Login failed';
    }
  };
}

function renderForm() {
  document.querySelector('#app').innerHTML = `
    <div class="form-container">
      <h2>Submit Player Data</h2>
      <form id="playerForm">
        <label>Username of Player</label><br />
        <input type="text" id="playerUsername" required /><br />
        <label>Amount to Add</label><br />
        <input type="number" id="amountToAdd" required /><br />
        <label>Upload Proof of Purchase Here.</label><br />
        <input type="file" id="proofImage" accept="image/*" required /><br />
        <div style="font-size: 0.9em; color: #555;">You can also paste an image from your clipboard.</div>
        <button type="submit">Submit</button>
        <div id="formError" style="color:red;"></div>
        <div id="formSuccess" style="color:green;"></div>
      </form>
    </div>
  `;

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
    const formData = new FormData();
    formData.append('playerUsername', playerUsername);
    formData.append('amountToAdd', amountToAdd);
    formData.append('proofImage', proofImage);
    formData.append('adminUsername', loggedInUsername);
    const res = await fetch(`${backendUrl}/api/submit`, {
      method: 'POST',
      body: formData
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

if (!loggedIn) {
  renderLogin();
} else {
  renderForm();
}
