(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();let h=!1,y="",u="menu";const f="https://admin-site-ze7d.onrender.com",x="df860f2526805007d06289b53d901e26",I="https://api.the-odds-api.com/v4";function T(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("loginForm").onsubmit=async t=>{t.preventDefault();const e=document.getElementById("loginUsername").value,n=document.getElementById("loginPassword").value;document.getElementById("loginLoading").style.display="block",document.getElementById("loginError").innerText="";try{const a=await fetch(`${f}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:n})});if(a.ok)h=!0,y=e,u="menu",b();else{const o=await a.json();document.getElementById("loginError").innerText=o.message||"Login failed"}}catch{document.getElementById("loginError").innerText="Connection failed. Please try again."}finally{document.getElementById("loginLoading").style.display="none"}}}function w(t=8){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let n="";for(let a=0;a<t;a++)n+=e.charAt(Math.floor(Math.random()*e.length));return n}function C(t){return t.split(".").pop()}function $(){return"PB-"+w(10)}async function P(t){const e="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7",n=new FormData,a=C(t.name),o=`GeneralsGamblingAdmin_${w(12)}.${a}`;n.append("file",t,o),n.append("metadata",JSON.stringify({name:o}));const r=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:e},body:n}),i=await r.json();if(r.ok&&i.data&&i.data.url)return i.data.url;throw new Error(i?.message||"Image upload failed.")}function b(){document.querySelector("#app").innerHTML=`
    <div class="menu-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, ${y}!</p>
      <div class="menu-buttons">
        <button id="addFundsBtn" class="menu-button">Add Funds</button>
        <button id="sportsBetsBtn" class="menu-button">Take Sports Bets</button>
        <button id="raffleTicketsBtn" class="menu-button">Raffle Tickets</button>
        <button id="propBetsBtn" class="menu-button">Prop Bets</button>
      </div>
      <button id="logoutBtn" class="logout-button">Logout</button>
    </div>
  `,document.getElementById("addFundsBtn").onclick=()=>{u="addFunds",J()},document.getElementById("sportsBetsBtn").onclick=()=>{u="sportsBets",N()},document.getElementById("raffleTicketsBtn").onclick=()=>{u="raffleTickets",U()},document.getElementById("propBetsBtn").onclick=()=>{u="propBets",q()},document.getElementById("logoutBtn").onclick=()=>{h=!1,y="",u="menu",T()}}function N(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{u="menu",b()},R(),document.getElementById("sportSelect").addEventListener("change",function(){const t=this.value;t?G(t):document.getElementById("oddsContainer").innerHTML="<p>Select a sport to view available odds</p>"})}function J(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("exampleBtn").onclick=()=>{document.getElementById("exampleModal").style.display="flex"},document.getElementById("closeExampleModal").onclick=()=>{document.getElementById("exampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{u="menu",b()};const t=document.getElementById("proofImage");document.getElementById("playerForm").addEventListener("paste",e=>{if(e.clipboardData&&e.clipboardData.files&&e.clipboardData.files.length>0){const n=e.clipboardData.files[0];if(n.type.startsWith("image/")){const a=new DataTransfer;a.items.add(n),t.files=a.files}}}),document.getElementById("playerForm").onsubmit=async e=>{e.preventDefault();const n=document.getElementById("playerUsername").value,a=document.getElementById("amountToAdd").value,o=document.getElementById("proofImage").files[0];if(!o){document.getElementById("formError").innerText="Image required.";return}const r="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7";let i="";try{const s=new FormData;s.append("file",o);const c=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:r},body:s}),m=await c.json();if(c.ok&&m.data&&m.data.url)i=m.data.url;else{document.getElementById("formError").innerText=m?.message||"Image upload failed.";return}}catch{document.getElementById("formError").innerText="Image upload failed.";return}const d={playerUsername:n,amountToAdd:a,proofImageUrl:i,adminUsername:y},l=await fetch(`${f}/api/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});if(l.ok)document.getElementById("formSuccess").innerText="Submitted successfully!",document.getElementById("formError").innerText="",document.getElementById("playerForm").reset();else{const s=await l.json();document.getElementById("formError").innerText=s.message||"Submission failed.",document.getElementById("formSuccess").innerText=""}}}function U(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("raffleExampleBtn").onclick=()=>{document.getElementById("raffleExampleModal").style.display="flex"},document.getElementById("closeRaffleExampleModal").onclick=()=>{document.getElementById("raffleExampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{u="menu",b()};const t=document.getElementById("raffleProofImage");document.getElementById("raffleForm").addEventListener("paste",e=>{if(e.clipboardData&&e.clipboardData.files&&e.clipboardData.files.length>0){const n=e.clipboardData.files[0];if(n.type.startsWith("image/")){const a=new DataTransfer;a.items.add(n),t.files=a.files}}}),document.getElementById("raffleForm").onsubmit=async e=>{e.preventDefault();const n=document.getElementById("phoneNumber").value,a=document.getElementById("stateId").value,o=document.getElementById("amountPurchased").value,r=document.getElementById("raffleProofImage").files[0];if(!r){document.getElementById("raffleFormError").innerText="Image required.";return}const i="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7";let d="";try{const s=new FormData;s.append("file",r);const c=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:i},body:s}),m=await c.json();if(c.ok&&m.data&&m.data.url)d=m.data.url;else{document.getElementById("raffleFormError").innerText=m?.message||"Image upload failed.";return}}catch{document.getElementById("raffleFormError").innerText="Image upload failed.";return}const l={phoneNumber:n,stateId:a,amountPurchased:o,proofImageUrl:d,adminUsername:y};try{const s=await fetch(`${f}/api/submit-raffle-ticket`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(s.ok)document.getElementById("raffleFormSuccess").innerText="Raffle ticket submitted successfully!",document.getElementById("raffleFormError").innerText="",document.getElementById("raffleForm").reset();else{const c=await s.json();document.getElementById("raffleFormError").innerText=c.message||"Submission failed.",document.getElementById("raffleFormSuccess").innerText=""}}catch{document.getElementById("raffleFormError").innerText="Connection failed. Please try again.",document.getElementById("raffleFormSuccess").innerText=""}}}function q(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{u="menu",b()},document.getElementById("propExampleBtn").onclick=()=>{document.getElementById("propExampleModal").style.display="flex"},document.getElementById("closePropExampleModal").onclick=()=>{document.getElementById("propExampleModal").style.display="none"},document.getElementById("propBetForm").onsubmit=H,v()}async function S(){const t=await fetch(`${f}/api/players`);return t.ok?await t.json():[]}async function k(t,e){await fetch(`${f}/api/deduct-balance`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,amount:e})})}async function H(t){t.preventDefault();const e=document.getElementById("propPlayers").value.trim(),n=document.getElementById("propBetName").value.trim(),a=document.getElementById("propHowToWin").value.trim(),o=parseFloat(document.getElementById("propAmount").value),r=document.getElementById("propPasscode").value.trim(),i=Array.from(document.getElementById("propProofImages").files),d=e.split(",").map(g=>g.trim()).filter(Boolean);if(!d.length||!n||!a||!o||!r||!i.length){document.getElementById("propFormError").innerText="All fields are required.";return}document.getElementById("propFormError").innerText="",document.getElementById("propFormSuccess").innerText="Uploading images...";let l=[];try{for(const g of i){const E=await P(g);l.push(E)}}catch(g){document.getElementById("propFormError").innerText=g.message,document.getElementById("propFormSuccess").innerText="";return}const s=await S();for(const g of d)s.some(L=>L.username===g)&&await k(g,o);const c=$(),m=Math.round(o*.1*100)/100,F=Math.round((o*d.length+m)*100)/100,A=new Date().toLocaleString(),D=[c,n,a,o,m,r,d.join(","),A,F,"active",...l];await fetch(`${f}/api/submit-prop-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row:D})}),document.getElementById("propFormSuccess").innerText="Prop bet submitted!",document.getElementById("propFormError").innerText="",document.getElementById("propBetForm").reset(),v()}async function v(){const t=await fetch(`${f}/api/active-prop-bets`),e=t.ok?await t.json():[],n=document.getElementById("propActiveDropdownContainer");n.innerHTML=`
    <label for="propActiveDropdown">Join an Active Prop Bet:</label>
    <input id="propActiveDropdown" list="propActiveList" placeholder="Search by bet name..." style="width:100%; padding:0.5rem;" />
    <datalist id="propActiveList">
      ${e.map(a=>`<option value="${a.betName}">${a.betName} - ${a.howToWin}</option>`).join("")}
    </datalist>
    <button id="propJoinBtn" style="margin-top:10px;">Join</button>
    <div id="propJoinError" style="color:red;"></div>
  `,document.getElementById("propJoinBtn").onclick=()=>O(e)}async function O(t){const e=document.getElementById("propActiveDropdown").value.trim(),n=t.find(a=>a.betName===e);if(!n){document.getElementById("propJoinError").innerText="Bet not found.";return}j(n)}function j(t){let e=document.getElementById("propJoinModal");e&&e.remove(),e=document.createElement("div"),e.id="propJoinModal",e.style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:2000;",e.innerHTML=`
    <div style="background:#fff; padding:2rem; border-radius:10px; max-width:500px; width:90vw; max-height:90vh; overflow-y:auto; position:relative;">
      <button id="closePropJoinModal" style="position:absolute; top:10px; right:15px; background:none; border:none; color:#333; font-size:1.5rem; cursor:pointer;">×</button>
      <h3>${t.betName}</h3>
      <div style="margin-bottom:1rem;">How to win: <b>${t.howToWin}</b></div>
      <form id="propJoinPassForm">
        <label>Enter Passcode:</label><br />
        <input type="password" id="propJoinPasscode" required style="width:100%; margin-bottom:1rem;" />
        <button type="submit">Check</button>
        <div id="propJoinPassError" style="color:red;"></div>
      </form>
      <div id="propJoinDetails" style="display:none;"></div>
    </div>
  `,document.body.appendChild(e),document.getElementById("closePropJoinModal").onclick=()=>e.remove(),document.getElementById("propJoinPassForm").onsubmit=n=>{if(n.preventDefault(),document.getElementById("propJoinPasscode").value!==t.passcode){document.getElementById("propJoinPassError").innerText="Incorrect passcode.";return}document.getElementById("propJoinPassError").innerText="",_(t,e)}}function _(t,e){const n=document.getElementById("propJoinDetails");n.style.display="block",n.innerHTML=`
    <div style="margin-bottom:1rem;">Current Players: <b>${t.players}</b></div>
    <div style="margin-bottom:1rem;">Total Payout: <b>${t.totalPayout}</b></div>
    <form id="propAddToBetForm">
      <label>Usernames/StateIDs (comma separated):</label><br />
      <textarea id="propAddPlayers" placeholder="e.g. john_doe, 123456" required style="width:100%; min-height:40px;"></textarea><br />
      <label>Submit Proof of Purchase (multiple):</label><br />
      <input type="file" id="propAddProofImages" accept="image/*" multiple required /><br />
      <button type="submit">Add to Bet</button>
      <div id="propAddToBetError" style="color:red;"></div>
      <div id="propAddToBetSuccess" style="color:green;"></div>
    </form>
  `,document.getElementById("propAddToBetForm").onsubmit=a=>z(a,t,e)}async function z(t,e,n){t.preventDefault();const a=document.getElementById("propAddPlayers").value.trim(),o=Array.from(document.getElementById("propAddProofImages").files),r=a.split(",").map(l=>l.trim()).filter(Boolean);if(!r.length||!o.length){document.getElementById("propAddToBetError").innerText="All fields required.";return}document.getElementById("propAddToBetError").innerText="",document.getElementById("propAddToBetSuccess").innerText="Uploading images...";let i=[];try{for(const l of o){const s=await P(l);i.push(s)}}catch(l){document.getElementById("propAddToBetError").innerText=l.message,document.getElementById("propAddToBetSuccess").innerText="";return}const d=await S();for(const l of r)d.some(c=>c.username===l)&&await k(l,e.amount);await fetch(`${f}/api/join-prop-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({betID:e.betID,addPlayers:r.join(","),addProofUrls:i})}),document.getElementById("propAddToBetSuccess").innerText="Added to bet!",document.getElementById("propAddToBetError").innerText="",document.getElementById("propAddToBetForm").reset(),setTimeout(()=>n.remove(),2e3),v()}async function R(){try{const t=await fetch(`${I}/sports?apiKey=${x}`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const e=await t.json(),n=document.getElementById("sportSelect");n.innerHTML='<option value="">Select a sport...</option>',e.filter(o=>o.active).sort((o,r)=>o.group===r.group?o.title.localeCompare(r.title):o.group.localeCompare(r.group)).forEach(o=>{const r=document.createElement("option");r.value=o.key,r.textContent=`${o.group} - ${o.title}`,n.appendChild(r)})}catch(t){console.error("Error loading sports:",t),document.getElementById("sportSelect").innerHTML='<option value="">Error loading sports</option>'}}async function G(t){const e=document.getElementById("oddsContainer");e.innerHTML="<p>Loading odds...</p>";try{const n=await fetch(`${I}/sports/${t}/odds?regions=us&oddsFormat=decimal&markets=h2h,spreads,totals&apiKey=${x}`);if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const a=await n.json(),o={title:W(t),events:a};Y(o)}catch(n){console.error("Error loading odds:",n),e.innerHTML="<p>Error loading odds. Please try again.</p>"}}function W(t){return{americanfootball_nfl:"NFL",americanfootball_ncaaf:"NCAAF",basketball_nba:"NBA",basketball_wnba:"WNBA",baseball_mlb:"MLB",icehockey_nhl:"NHL",soccer_epl:"EPL",soccer_usa_mls:"MLS",mma_mixed_martial_arts:"MMA"}[t]||t}function Y(t){const e=document.getElementById("oddsContainer");if(!t.events||t.events.length===0){e.innerHTML="<p>No events available for this sport at the moment.</p>";return}let n=`<h3>${t.title} - Upcoming Games</h3>`;t.events.forEach((o,r)=>{const i=new Date(o.commence_time).toLocaleString();n+=`
      <div class="event-card" id="event-card-${r}">
        <div class="event-header">
          <h4>${o.away_team} @ ${o.home_team}</h4>
          <p class="event-time">${i}</p>
        </div>
        <div class="event-content" id="event-content-${r}">
          <div class="odds-tables">
    `,o.bookmakers.forEach(d=>{n+=`
        <div class="bookmaker-section">
          <h5>${d.title}</h5>
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
      `,d.markets.forEach(l=>{l.outcomes.forEach(s=>{const c=s.price;n+=`
            <tr>
              <td>${B(l.key)}</td>
              <td class="betting-cell" data-event="${o.away_team} @ ${o.home_team}" data-event-time="${o.commence_time}" data-bet-type="${B(l.key)}" data-selection="${s.name}" data-odds="${c.toFixed(2)}" data-line="${s.point?s.point:"-"}">${s.name}</td>
              <td>${c.toFixed(2)}</td>
              <td>${s.point?s.point:"-"}</td>
            </tr>
          `})}),n+=`
            </tbody>
          </table>
        </div>
      `}),n+=`
          </div>
        </div>
      </div>
    `}),e.innerHTML=n,e.innerHTML+=`
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
  `,t.events.forEach((o,r)=>{const i=document.getElementById(`event-card-${r}`),d=document.getElementById(`event-content-${r}`);i&&d&&(d.style.display="none",i.classList.add("collapsed"),i.addEventListener("click",function(l){l.target.closest(".event-content")||(d.style.display==="none"?(d.style.display="block",i.classList.remove("collapsed")):(d.style.display="none",i.classList.add("collapsed")))}))}),document.querySelectorAll(".betting-cell").forEach(o=>{o.addEventListener("click",function(r){r.stopPropagation(),K(this)})}),document.getElementById("closeBettingModal").addEventListener("click",M),document.getElementById("closeBettingExampleModal").addEventListener("click",Z),document.getElementById("bettingExampleBtn").addEventListener("click",()=>{document.getElementById("bettingExampleModal").style.display="flex"});const a=document.getElementById("bettingProofImage");document.getElementById("bettingForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const r=o.clipboardData.files[0];if(r.type.startsWith("image/")){const i=new DataTransfer;i.items.add(r),a.files=i.files}}}),document.getElementById("bettingForm").addEventListener("submit",Q)}function B(t){return{h2h:"Moneyline",spreads:"Spread",totals:"Total"}[t]||t}let p=null;function K(t){const e=t.dataset.event,n=t.dataset.eventTime,a=t.dataset.betType,o=t.dataset.selection,r=t.dataset.odds,i=t.dataset.line;p={event:e,eventTime:n,betType:a,selection:o,odds:r,line:i},document.getElementById("modalEventTitle").textContent=`${e} - ${a}`;const d=document.getElementById("teamSelection");if(d.innerHTML="",a==="Moneyline")e.split(" @ ").forEach(s=>{const c=document.createElement("button");c.type="button",c.textContent=s,c.style.cssText="padding:0.5rem 1rem; background:#333; color:#fff; border:1px solid #444; border-radius:5px; cursor:pointer; flex:1;",c.addEventListener("click",function(){d.querySelectorAll("button").forEach(m=>{m.style.background="#333",m.style.borderColor="#444"}),this.style.background="#646cff",this.style.borderColor="#646cff",p.selectedTeam=this.textContent}),d.appendChild(c)});else{const l=document.createElement("button");l.type="button",l.textContent=o,l.style.cssText="padding:0.5rem 1rem; background:#646cff; color:#fff; border:1px solid #646cff; border-radius:5px; cursor:pointer; width:100%;",p.selectedTeam=o,d.appendChild(l)}document.getElementById("bettingForm").reset(),document.getElementById("bettingError").textContent="",document.getElementById("bettingSuccess").textContent="",document.getElementById("bettingModal").style.display="flex"}function M(){document.getElementById("bettingModal").style.display="none",p=null}function Z(){document.getElementById("bettingExampleModal").style.display="none"}async function Q(t){if(t.preventDefault(),!p||!p.selectedTeam){document.getElementById("bettingError").textContent="Please select a team.";return}const e=document.getElementById("bettingUsername").value,n=document.getElementById("bettingAmount").value,a=document.getElementById("bettingProofImage").files[0];if(!a){document.getElementById("bettingError").textContent="Image required.";return}document.getElementById("bettingSuccess").textContent="Processing... Please wait.",document.getElementById("bettingError").textContent="";const o="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7";let r="";try{const d=new FormData;d.append("file",a);const l=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:o},body:d}),s=await l.json();if(l.ok&&s.data&&s.data.url)r=s.data.url;else{document.getElementById("bettingError").textContent=s?.message||"Image upload failed.",document.getElementById("bettingSuccess").textContent="";return}}catch{document.getElementById("bettingError").textContent="Image upload failed.",document.getElementById("bettingSuccess").textContent="";return}const i={username:e,amountBet:n,eventName:p.event,eventTime:p.eventTime,betType:p.betType,selectedTeam:p.selectedTeam,odds:p.odds,line:p.line,proofImageUrl:r,adminUsername:y};try{const d=await fetch(`${f}/api/submit-sports-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(d.ok)document.getElementById("bettingSuccess").textContent="✅ Bet submitted successfully! Data saved to database.",document.getElementById("bettingError").textContent="",document.getElementById("bettingForm").reset(),setTimeout(()=>{M()},3e3);else{const l=await d.json();document.getElementById("bettingError").textContent=l.message||"Failed to place bet.",document.getElementById("bettingSuccess").textContent=""}}catch{document.getElementById("bettingError").textContent="Connection failed. Please try again.",document.getElementById("bettingSuccess").textContent=""}}window.toggleEventCard=function(t){console.log("Toggle called for index:",t);const e=document.getElementById(`event-content-${t}`),n=e.closest(".event-card");console.log("Content element:",e),console.log("Current display style:",e.style.display),e.style.display==="none"?(e.style.display="block",n.classList.remove("collapsed"),console.log("Expanding card")):(e.style.display="none",n.classList.add("collapsed"),console.log("Collapsing card"))};h?b():T();
