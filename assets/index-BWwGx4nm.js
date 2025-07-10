(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();let f=!1,p="";const y="https://admin-site-ze7d.onrender.com",b="df860f2526805007d06289b53d901e26",h="https://api.the-odds-api.com/v4";function v(){document.querySelector("#app").innerHTML=`
    <div class="login-container">
      <h2>Login</h2>
      <form id="loginForm">
        <input type="text" id="loginUsername" placeholder="Username" required /><br />
        <input type="password" id="loginPassword" placeholder="Password" required /><br />
        <button type="submit">Login</button>
        <div id="loginError" style="color:red;"></div>
      </form>
    </div>
  `,document.getElementById("loginForm").onsubmit=async t=>{t.preventDefault();const o=document.getElementById("loginUsername").value,n=document.getElementById("loginPassword").value,a=await fetch(`${y}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:o,password:n})});if(a.ok)f=!0,p=o,g();else{const e=await a.json();document.getElementById("loginError").innerText=e.message||"Login failed"}}}function g(){document.querySelector("#app").innerHTML=`
    <div class="menu-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, ${p}!</p>
      <div class="menu-buttons">
        <button id="addFundsBtn" class="menu-button">Add Funds</button>
        <button id="sportsBetsBtn" class="menu-button">Take Sports Bets</button>
      </div>
      <button id="logoutBtn" class="logout-button">Logout</button>
    </div>
  `,document.getElementById("addFundsBtn").onclick=()=>{B()},document.getElementById("sportsBetsBtn").onclick=()=>{E()},document.getElementById("logoutBtn").onclick=()=>{f=!1,p="",v()}}function E(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{g()},I(),document.getElementById("sportSelect").addEventListener("change",function(){const t=this.value;t?x(t):document.getElementById("oddsContainer").innerHTML="<p>Select a sport to view available odds</p>"})}function B(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("exampleBtn").onclick=()=>{document.getElementById("exampleModal").style.display="flex"},document.getElementById("closeExampleModal").onclick=()=>{document.getElementById("exampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{g()};const t=document.getElementById("proofImage");document.getElementById("playerForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const n=o.clipboardData.files[0];if(n.type.startsWith("image/")){const a=new DataTransfer;a.items.add(n),t.files=a.files}}}),document.getElementById("playerForm").onsubmit=async o=>{o.preventDefault();const n=document.getElementById("playerUsername").value,a=document.getElementById("amountToAdd").value,e=document.getElementById("proofImage").files[0];if(!e){document.getElementById("formError").innerText="Image required.";return}const r="321fcbefd94f6d6936d225a7c1004060",s=await new Promise((d,m)=>{const u=new FileReader;u.onload=()=>d(u.result.split(",")[1]),u.onerror=m,u.readAsDataURL(e)});let l="";try{const m=await(await fetch(`https://api.imgbb.com/1/upload?key=${r}`,{method:"POST",body:new URLSearchParams({image:s})})).json();if(m.success)l=m.data.url;else{document.getElementById("formError").innerText="Image upload failed.";return}}catch{document.getElementById("formError").innerText="Image upload failed.";return}const i={playerUsername:n,amountToAdd:a,proofImageUrl:l,adminUsername:p},c=await fetch(`${y}/api/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(c.ok)document.getElementById("formSuccess").innerText="Submitted successfully!",document.getElementById("formError").innerText="",document.getElementById("playerForm").reset();else{const d=await c.json();document.getElementById("formError").innerText=d.message||"Submission failed.",document.getElementById("formSuccess").innerText=""}}}async function I(){try{const t=await fetch(`${h}/sports?apiKey=${b}`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const o=await t.json(),n=document.getElementById("sportSelect");n.innerHTML='<option value="">Select a sport...</option>',o.filter(e=>e.active).sort((e,r)=>e.group===r.group?e.title.localeCompare(r.title):e.group.localeCompare(r.group)).forEach(e=>{const r=document.createElement("option");r.value=e.key,r.textContent=`${e.group} - ${e.title}`,n.appendChild(r)})}catch(t){console.error("Error loading sports:",t),document.getElementById("sportSelect").innerHTML='<option value="">Error loading sports</option>'}}async function x(t){const o=document.getElementById("oddsContainer");o.innerHTML="<p>Loading odds...</p>";try{const n=await fetch(`${h}/sports/${t}/odds?regions=us&oddsFormat=decimal&markets=h2h,spreads,totals&apiKey=${b}`);if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const a=await n.json(),e={title:S(t),events:a};T(e)}catch(n){console.error("Error loading odds:",n),o.innerHTML="<p>Error loading odds. Please try again.</p>"}}function S(t){return{americanfootball_nfl:"NFL",americanfootball_ncaaf:"NCAAF",basketball_nba:"NBA",basketball_wnba:"WNBA",baseball_mlb:"MLB",icehockey_nhl:"NHL",soccer_epl:"EPL",soccer_usa_mls:"MLS",mma_mixed_martial_arts:"MMA"}[t]||t}function T(t){const o=document.getElementById("oddsContainer");if(!t.events||t.events.length===0){o.innerHTML="<p>No events available for this sport at the moment.</p>";return}let n=`<h3>${t.title} - Upcoming Games</h3>`;t.events.forEach((a,e)=>{const r=new Date(a.commence_time).toLocaleString();n+=`
      <div class="event-card" onclick="toggleEventCard(${e})">
        <div class="event-header">
          <h4>${a.away_team} @ ${a.home_team}</h4>
          <p class="event-time">${r}</p>
        </div>
        <div class="event-content" id="event-content-${e}">
          <div class="odds-tables">
    `,a.bookmakers.forEach(s=>{n+=`
        <div class="bookmaker-section">
          <h5>${s.title}</h5>
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
      `,s.markets.forEach(l=>{l.outcomes.forEach(i=>{const c=i.price,d=w(c);n+=`
            <tr>
              <td>${L(l.key)}</td>
              <td>${i.name}</td>
              <td>${c.toFixed(2)}</td>
              <td class="adjusted-odds">${d.toFixed(2)}</td>
              <td>${i.point?i.point:"-"}</td>
            </tr>
          `})}),n+=`
            </tbody>
          </table>
        </div>
      `}),n+=`
          </div>
        </div>
      </div>
    `}),o.innerHTML=n}function w(t){const o=t*.8;return Math.max(o,1.01)}function L(t){return{h2h:"Moneyline",spreads:"Spread",totals:"Total"}[t]||t}window.toggleEventCard=function(t){console.log("Toggle called for index:",t);const o=document.getElementById(`event-content-${t}`),n=o.closest(".event-card");console.log("Content element:",o),console.log("Current display style:",o.style.display),o.style.display==="none"?(o.style.display="block",n.classList.remove("collapsed"),console.log("Expanding card")):(o.style.display="none",n.classList.add("collapsed"),console.log("Collapsing card"))};f?g():v();
