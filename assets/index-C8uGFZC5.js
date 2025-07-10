(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();let g=!1,p="";const y="https://admin-site-ze7d.onrender.com",b="df860f2526805007d06289b53d901e26",h="https://api.the-odds-api.com/v4";function v(){document.querySelector("#app").innerHTML=`
    <div class="login-container">
      <h2>Login</h2>
      <form id="loginForm">
        <input type="text" id="loginUsername" placeholder="Username" required /><br />
        <input type="password" id="loginPassword" placeholder="Password" required /><br />
        <button type="submit">Login</button>
        <div id="loginError" style="color:red;"></div>
      </form>
    </div>
  `,document.getElementById("loginForm").onsubmit=async t=>{t.preventDefault();const o=document.getElementById("loginUsername").value,r=document.getElementById("loginPassword").value,s=await fetch(`${y}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:o,password:r})});if(s.ok)g=!0,p=o,f();else{const e=await s.json();document.getElementById("loginError").innerText=e.message||"Login failed"}}}function f(){document.querySelector("#app").innerHTML=`
    <div class="menu-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, ${p}!</p>
      <div class="menu-buttons">
        <button id="addFundsBtn" class="menu-button">Add Funds</button>
        <button id="sportsBetsBtn" class="menu-button">Take Sports Bets</button>
      </div>
      <button id="logoutBtn" class="logout-button">Logout</button>
    </div>
  `,document.getElementById("addFundsBtn").onclick=()=>{B()},document.getElementById("sportsBetsBtn").onclick=()=>{E()},document.getElementById("logoutBtn").onclick=()=>{g=!1,p="",v()}}function E(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{f()},I(),document.getElementById("sportSelect").addEventListener("change",function(){const t=this.value;t?x(t):document.getElementById("oddsContainer").innerHTML="<p>Select a sport to view available odds</p>"})}function B(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("exampleBtn").onclick=()=>{document.getElementById("exampleModal").style.display="flex"},document.getElementById("closeExampleModal").onclick=()=>{document.getElementById("exampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{f()};const t=document.getElementById("proofImage");document.getElementById("playerForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const r=o.clipboardData.files[0];if(r.type.startsWith("image/")){const s=new DataTransfer;s.items.add(r),t.files=s.files}}}),document.getElementById("playerForm").onsubmit=async o=>{o.preventDefault();const r=document.getElementById("playerUsername").value,s=document.getElementById("amountToAdd").value,e=document.getElementById("proofImage").files[0];if(!e){document.getElementById("formError").innerText="Image required.";return}const n="321fcbefd94f6d6936d225a7c1004060",a=await new Promise((i,m)=>{const u=new FileReader;u.onload=()=>i(u.result.split(",")[1]),u.onerror=m,u.readAsDataURL(e)});let d="";try{const m=await(await fetch(`https://api.imgbb.com/1/upload?key=${n}`,{method:"POST",body:new URLSearchParams({image:a})})).json();if(m.success)d=m.data.url;else{document.getElementById("formError").innerText="Image upload failed.";return}}catch{document.getElementById("formError").innerText="Image upload failed.";return}const l={playerUsername:r,amountToAdd:s,proofImageUrl:d,adminUsername:p},c=await fetch(`${y}/api/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(c.ok)document.getElementById("formSuccess").innerText="Submitted successfully!",document.getElementById("formError").innerText="",document.getElementById("playerForm").reset();else{const i=await c.json();document.getElementById("formError").innerText=i.message||"Submission failed.",document.getElementById("formSuccess").innerText=""}}}async function I(){try{const t=await fetch(`${h}/sports?apiKey=${b}`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const o=await t.json(),r=document.getElementById("sportSelect");r.innerHTML='<option value="">Select a sport...</option>',o.filter(e=>e.active).sort((e,n)=>e.group===n.group?e.title.localeCompare(n.title):e.group.localeCompare(n.group)).forEach(e=>{const n=document.createElement("option");n.value=e.key,n.textContent=`${e.group} - ${e.title}`,r.appendChild(n)})}catch(t){console.error("Error loading sports:",t),document.getElementById("sportSelect").innerHTML='<option value="">Error loading sports</option>'}}async function x(t){const o=document.getElementById("oddsContainer");o.innerHTML="<p>Loading odds...</p>";try{const r=await fetch(`${h}/sports/${t}/odds?regions=us&oddsFormat=decimal&markets=h2h,spreads,totals&apiKey=${b}`);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const s=await r.json(),e={title:S(t),events:s};T(e)}catch(r){console.error("Error loading odds:",r),o.innerHTML="<p>Error loading odds. Please try again.</p>"}}function S(t){return{americanfootball_nfl:"NFL",americanfootball_ncaaf:"NCAAF",basketball_nba:"NBA",basketball_wnba:"WNBA",baseball_mlb:"MLB",icehockey_nhl:"NHL",soccer_epl:"EPL",soccer_usa_mls:"MLS",mma_mixed_martial_arts:"MMA"}[t]||t}function T(t){const o=document.getElementById("oddsContainer");if(!t.events||t.events.length===0){o.innerHTML="<p>No events available for this sport at the moment.</p>";return}let r=`<h3>${t.title} - Upcoming Games</h3>`;t.events.forEach((s,e)=>{const n=new Date(s.commence_time).toLocaleString();r+=`
      <div class="event-card" id="event-card-${e}">
        <div class="event-header">
          <h4>${s.away_team} @ ${s.home_team}</h4>
          <p class="event-time">${n}</p>
        </div>
        <div class="event-content" id="event-content-${e}">
          <div class="odds-tables">
    `,s.bookmakers.forEach(a=>{r+=`
        <div class="bookmaker-section">
          <h5>${a.title}</h5>
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
      `,a.markets.forEach(d=>{d.outcomes.forEach(l=>{const c=l.price,i=L(c);r+=`
            <tr>
              <td>${w(d.key)}</td>
              <td>${l.name}</td>
              <td>${c.toFixed(2)}</td>
              <td class="adjusted-odds">${i.toFixed(2)}</td>
              <td>${l.point?l.point:"-"}</td>
            </tr>
          `})}),r+=`
            </tbody>
          </table>
        </div>
      `}),r+=`
          </div>
        </div>
      </div>
    `}),o.innerHTML=r,t.events.forEach((s,e)=>{const n=document.getElementById(`event-card-${e}`),a=document.getElementById(`event-content-${e}`);n&&a&&(a.style.display="none",n.classList.add("collapsed"),n.addEventListener("click",function(d){d.target.closest(".event-content")||(a.style.display==="none"?(a.style.display="block",n.classList.remove("collapsed")):(a.style.display="none",n.classList.add("collapsed")))}))})}function L(t){const o=t*.8;return Math.max(o,1.01)}function w(t){return{h2h:"Moneyline",spreads:"Spread",totals:"Total"}[t]||t}window.toggleEventCard=function(t){console.log("Toggle called for index:",t);const o=document.getElementById(`event-content-${t}`),r=o.closest(".event-card");console.log("Content element:",o),console.log("Current display style:",o.style.display),o.style.display==="none"?(o.style.display="block",r.classList.remove("collapsed"),console.log("Expanding card")):(o.style.display="none",r.classList.add("collapsed"),console.log("Collapsing card"))};g?f():v();
