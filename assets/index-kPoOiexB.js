(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();let E=!1,y="",u="menu";const f="https://admin-site-ze7d.onrender.com",I="df860f2526805007d06289b53d901e26",T="https://api.the-odds-api.com/v4";function w(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("loginForm").onsubmit=async e=>{e.preventDefault();const t=document.getElementById("loginUsername").value,n=document.getElementById("loginPassword").value;document.getElementById("loginLoading").style.display="block",document.getElementById("loginError").innerText="";try{const a=await fetch(`${f}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:n})});if(a.ok)E=!0,y=t,u="menu",b();else{const o=await a.json();document.getElementById("loginError").innerText=o.message||"Login failed"}}catch{document.getElementById("loginError").innerText="Connection failed. Please try again."}finally{document.getElementById("loginLoading").style.display="none"}}}function h(e=8){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let n="";for(let a=0;a<e;a++)n+=t.charAt(Math.floor(Math.random()*t.length));return n}function P(e){return e.split(".").pop()}function N(){return"PB-"+h(10)}function q(e,t){const n=P(t.name);return`GeneralsGamblingAdminImage_${e}.${n}`}async function v(e,t){const n="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7",a=q(t,e),o=new FormData;o.append("file",e,a),o.append("metadata",JSON.stringify({name:a,description:"Proof image uploaded from Generals Gambling Admin."}));const r=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:n},body:o}),i=await r.json();if(r.ok&&i.data&&i.data.url)return{url:i.data.url,filename:a};throw new Error(i?.message||"Image upload failed.")}async function U(e){const t="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7",n=new FormData,a=P(e.name),o=`GeneralsGamblingAdmin_${h(12)}.${a}`;n.append("file",e,o),n.append("metadata",JSON.stringify({name:o}));const r=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:t},body:n}),i=await r.json();if(r.ok&&i.data&&i.data.url)return i.data.url;throw new Error(i?.message||"Image upload failed.")}function b(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("addFundsBtn").onclick=()=>{u="addFunds",H()},document.getElementById("sportsBetsBtn").onclick=()=>{u="sportsBets",J()},document.getElementById("raffleTicketsBtn").onclick=()=>{u="raffleTickets",O()},document.getElementById("propBetsBtn").onclick=()=>{u="propBets",j()},document.getElementById("logoutBtn").onclick=()=>{E=!1,y="",u="menu",w()}}function J(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{u="menu",b()},Z(),document.getElementById("sportSelect").addEventListener("change",function(){const e=this.value;e?Q(e):document.getElementById("oddsContainer").innerHTML="<p>Select a sport to view available odds</p>"})}function H(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("exampleBtn").onclick=()=>{document.getElementById("exampleModal").style.display="flex"},document.getElementById("closeExampleModal").onclick=()=>{document.getElementById("exampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{u="menu",b()};const e=document.getElementById("proofImage");document.getElementById("playerForm").addEventListener("paste",t=>{if(t.clipboardData&&t.clipboardData.files&&t.clipboardData.files.length>0){const n=t.clipboardData.files[0];if(n.type.startsWith("image/")){const a=new DataTransfer;a.items.add(n),e.files=a.files}}}),document.getElementById("playerForm").onsubmit=async t=>{t.preventDefault();const n=document.getElementById("playerUsername").value,a=document.getElementById("amountToAdd").value,o=document.getElementById("proofImage").files[0];if(!o){document.getElementById("formError").innerText="Image required.";return}let r="",i="";try{const s=h(12),{url:c,filename:g}=await v(o,s);r=c,i=g}catch(s){document.getElementById("formError").innerText=s.message;return}const l={playerUsername:n,amountToAdd:a,proofImageUrl:r,proofImageFilename:i,adminUsername:y},d=await fetch(`${f}/api/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(d.ok)document.getElementById("formSuccess").innerText="Submitted successfully!",document.getElementById("formError").innerText="",document.getElementById("playerForm").reset();else{const s=await d.json();document.getElementById("formError").innerText=s.message||"Submission failed.",document.getElementById("formSuccess").innerText=""}}}function O(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("raffleExampleBtn").onclick=()=>{document.getElementById("raffleExampleModal").style.display="flex"},document.getElementById("closeRaffleExampleModal").onclick=()=>{document.getElementById("raffleExampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{u="menu",b()};const e=document.getElementById("raffleProofImage");document.getElementById("raffleForm").addEventListener("paste",t=>{if(t.clipboardData&&t.clipboardData.files&&t.clipboardData.files.length>0){const n=t.clipboardData.files[0];if(n.type.startsWith("image/")){const a=new DataTransfer;a.items.add(n),e.files=a.files}}}),document.getElementById("raffleForm").onsubmit=async t=>{t.preventDefault();const n=document.getElementById("phoneNumber").value,a=document.getElementById("stateId").value,o=document.getElementById("amountPurchased").value,r=document.getElementById("raffleProofImage").files[0];if(!r){document.getElementById("raffleFormError").innerText="Image required.";return}let i="",l="";try{const s=h(12),{url:c,filename:g}=await v(r,s);i=c,l=g}catch(s){document.getElementById("raffleFormError").innerText=s.message;return}const d={phoneNumber:n,stateId:a,amountPurchased:o,proofImageUrl:i,proofImageFilename:l,adminUsername:y};try{const s=await fetch(`${f}/api/submit-raffle-ticket`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});if(s.ok)document.getElementById("raffleFormSuccess").innerText="Raffle ticket submitted successfully!",document.getElementById("raffleFormError").innerText="",document.getElementById("raffleForm").reset();else{const c=await s.json();document.getElementById("raffleFormError").innerText=c.message||"Submission failed.",document.getElementById("raffleFormSuccess").innerText=""}}catch{document.getElementById("raffleFormError").innerText="Connection failed. Please try again.",document.getElementById("raffleFormSuccess").innerText=""}}}function j(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{u="menu",b()},document.getElementById("propExampleBtn").onclick=()=>{document.getElementById("propExampleModal").style.display="flex"},document.getElementById("closePropExampleModal").onclick=()=>{document.getElementById("propExampleModal").style.display="none"},document.getElementById("propBetForm").onsubmit=G,B()}async function _(){const e=await fetch(`${f}/api/players`);return e.ok?await e.json():[]}async function z(e,t){await fetch(`${f}/api/deduct-balance`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,amount:t})})}async function G(e){e.preventDefault();const t=document.getElementById("propPlayers").value.trim(),n=document.getElementById("propBetName").value.trim(),a=document.getElementById("propHowToWin").value.trim(),o=parseFloat(document.getElementById("propAmount").value),r=document.getElementById("propPasscode").value.trim(),i=Array.from(document.getElementById("propProofImages").files),l=t.split(",").map(m=>m.trim()).filter(Boolean);if(!l.length||!n||!a||!o||!r||!i.length){document.getElementById("propFormError").innerText="All fields are required.";return}document.getElementById("propFormError").innerText="",document.getElementById("propFormSuccess").innerText="Uploading images...";let d=[];const s=N();try{for(let m=0;m<i.length;m++){const D=i[m],L=`${s}_${m+1}`,{url:C,filename:$}=await v(D,L);d.push({url:C,filename:$})}}catch(m){document.getElementById("propFormError").innerText=m.message,document.getElementById("propFormSuccess").innerText="";return}const c=Math.round(o*.1*100)/100,g=Math.round((o*l.length+c)*100)/100,k=new Date().toLocaleString(),F=d.map(m=>m.url),M=d.map(m=>m.filename),A=[s,n,a,o,c,r,l.join(","),k,g,"active",...F,...M];await fetch(`${f}/api/submit-prop-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row:A})}),document.getElementById("propFormSuccess").innerText="Prop bet submitted!",document.getElementById("propFormError").innerText="",document.getElementById("propBetForm").reset(),B()}async function B(){const e=await fetch(`${f}/api/active-prop-bets`),t=e.ok?await e.json():[],n=document.getElementById("propActiveDropdownContainer");n.innerHTML=`
    <label for="propActiveDropdown">Join an Active Prop Bet:</label>
    <input id="propActiveDropdown" list="propActiveList" placeholder="Search by bet name..." style="width:100%; padding:0.5rem;" />
    <datalist id="propActiveList">
      ${t.map(a=>`<option value="${a.betName}">${a.betName} - ${a.howToWin}</option>`).join("")}
    </datalist>
    <button id="propJoinBtn" style="margin-top:10px;">Join</button>
    <div id="propJoinError" style="color:red;"></div>
  `,document.getElementById("propJoinBtn").onclick=()=>W(t)}async function W(e){const t=document.getElementById("propActiveDropdown").value.trim(),n=e.find(a=>a.betName===t);if(!n){document.getElementById("propJoinError").innerText="Bet not found.";return}R(n)}function R(e){let t=document.getElementById("propJoinModal");t&&t.remove(),t=document.createElement("div"),t.id="propJoinModal",t.style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:2000;",t.innerHTML=`
    <div style="background:#fff; padding:2rem; border-radius:10px; max-width:500px; width:90vw; max-height:90vh; overflow-y:auto; position:relative;">
      <button id="closePropJoinModal" style="position:absolute; top:10px; right:15px; background:none; border:none; color:#333; font-size:1.5rem; cursor:pointer;">×</button>
      <h3>${e.betName}</h3>
      <div style="margin-bottom:1rem;">How to win: <b>${e.howToWin}</b></div>
      <form id="propJoinPassForm">
        <label>Enter Passcode:</label><br />
        <input type="password" id="propJoinPasscode" required style="width:100%; margin-bottom:1rem;" />
        <button type="submit">Check</button>
        <div id="propJoinPassError" style="color:red;"></div>
      </form>
      <div id="propJoinDetails" style="display:none;"></div>
    </div>
  `,document.body.appendChild(t),document.getElementById("closePropJoinModal").onclick=()=>t.remove(),document.getElementById("propJoinPassForm").onsubmit=n=>{if(n.preventDefault(),document.getElementById("propJoinPasscode").value!==e.passcode){document.getElementById("propJoinPassError").innerText="Incorrect passcode.";return}document.getElementById("propJoinPassError").innerText="",Y(e,t)}}function Y(e,t){const n=document.getElementById("propJoinDetails");n.style.display="block",n.innerHTML=`
    <div style="margin-bottom:1rem;">Current Players: <b>${e.players}</b></div>
    <div style="margin-bottom:1rem;">Total Payout: <b>${e.totalPayout}</b></div>
    <form id="propAddToBetForm">
      <label>Usernames/StateIDs (comma separated):</label><br />
      <textarea id="propAddPlayers" placeholder="e.g. john_doe, 123456" required style="width:100%; min-height:40px;"></textarea><br />
      <label>Submit Proof of Purchase (multiple):</label><br />
      <input type="file" id="propAddProofImages" accept="image/*" multiple required /><br />
      <button type="submit">Add to Bet</button>
      <div id="propAddToBetError" style="color:red;"></div>
      <div id="propAddToBetSuccess" style="color:green;"></div>
    </form>
  `,document.getElementById("propAddToBetForm").onsubmit=a=>K(a,e,t)}async function K(e,t,n){e.preventDefault();const a=document.getElementById("propAddPlayers").value.trim(),o=Array.from(document.getElementById("propAddProofImages").files),r=a.split(",").map(d=>d.trim()).filter(Boolean);if(!r.length||!o.length){document.getElementById("propAddToBetError").innerText="All fields required.";return}document.getElementById("propAddToBetError").innerText="",document.getElementById("propAddToBetSuccess").innerText="Uploading images...";let i=[];try{for(const d of o){const s=await U(d);i.push(s)}}catch(d){document.getElementById("propAddToBetError").innerText=d.message,document.getElementById("propAddToBetSuccess").innerText="";return}const l=await _();for(const d of r)l.some(c=>c.username===d)&&await z(d,t.amount);await fetch(`${f}/api/join-prop-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({betID:t.betID,addPlayers:r.join(","),addProofUrls:i})}),document.getElementById("propAddToBetSuccess").innerText="Added to bet!",document.getElementById("propAddToBetError").innerText="",document.getElementById("propAddToBetForm").reset(),setTimeout(()=>n.remove(),2e3),B()}async function Z(){try{const e=await fetch(`${T}/sports?apiKey=${I}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json(),n=document.getElementById("sportSelect");n.innerHTML='<option value="">Select a sport...</option>',t.filter(o=>o.active).sort((o,r)=>o.group===r.group?o.title.localeCompare(r.title):o.group.localeCompare(r.group)).forEach(o=>{const r=document.createElement("option");r.value=o.key,r.textContent=`${o.group} - ${o.title}`,n.appendChild(r)})}catch(e){console.error("Error loading sports:",e),document.getElementById("sportSelect").innerHTML='<option value="">Error loading sports</option>'}}async function Q(e){const t=document.getElementById("oddsContainer");t.innerHTML="<p>Loading odds...</p>";try{const n=await fetch(`${T}/sports/${e}/odds?regions=us&oddsFormat=decimal&markets=h2h,spreads,totals&apiKey=${I}`);if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const a=await n.json(),o={title:V(e),events:a};X(o)}catch(n){console.error("Error loading odds:",n),t.innerHTML="<p>Error loading odds. Please try again.</p>"}}function V(e){return{americanfootball_nfl:"NFL",americanfootball_ncaaf:"NCAAF",basketball_nba:"NBA",basketball_wnba:"WNBA",baseball_mlb:"MLB",icehockey_nhl:"NHL",soccer_epl:"EPL",soccer_usa_mls:"MLS",mma_mixed_martial_arts:"MMA"}[e]||e}function X(e){const t=document.getElementById("oddsContainer");if(!e.events||e.events.length===0){t.innerHTML="<p>No events available for this sport at the moment.</p>";return}let n=`<h3>${e.title} - Upcoming Games</h3>`;e.events.forEach((o,r)=>{const i=new Date(o.commence_time).toLocaleString();n+=`
      <div class="event-card" id="event-card-${r}">
        <div class="event-header">
          <h4>${o.away_team} @ ${o.home_team}</h4>
          <p class="event-time">${i}</p>
        </div>
        <div class="event-content" id="event-content-${r}">
          <div class="odds-tables">
    `,o.bookmakers.forEach(l=>{n+=`
        <div class="bookmaker-section">
          <h5>${l.title}</h5>
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
      `,l.markets.forEach(d=>{d.outcomes.forEach(s=>{const c=s.price;n+=`
            <tr>
              <td>${x(d.key)}</td>
              <td class="betting-cell" data-event="${o.away_team} @ ${o.home_team}" data-event-time="${o.commence_time}" data-bet-type="${x(d.key)}" data-selection="${s.name}" data-odds="${c.toFixed(2)}" data-line="${s.point?s.point:"-"}">${s.name}</td>
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
    `}),t.innerHTML=n,t.innerHTML+=`
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
  `,e.events.forEach((o,r)=>{const i=document.getElementById(`event-card-${r}`),l=document.getElementById(`event-content-${r}`);i&&l&&(l.style.display="none",i.classList.add("collapsed"),i.addEventListener("click",function(d){d.target.closest(".event-content")||(l.style.display==="none"?(l.style.display="block",i.classList.remove("collapsed")):(l.style.display="none",i.classList.add("collapsed")))}))}),document.querySelectorAll(".betting-cell").forEach(o=>{o.addEventListener("click",function(r){r.stopPropagation(),ee(this)})}),document.getElementById("closeBettingModal").addEventListener("click",S),document.getElementById("closeBettingExampleModal").addEventListener("click",te),document.getElementById("bettingExampleBtn").addEventListener("click",()=>{document.getElementById("bettingExampleModal").style.display="flex"});const a=document.getElementById("bettingProofImage");document.getElementById("bettingForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const r=o.clipboardData.files[0];if(r.type.startsWith("image/")){const i=new DataTransfer;i.items.add(r),a.files=i.files}}}),document.getElementById("bettingForm").addEventListener("submit",oe)}function x(e){return{h2h:"Moneyline",spreads:"Spread",totals:"Total"}[e]||e}let p=null;function ee(e){const t=e.dataset.event,n=e.dataset.eventTime,a=e.dataset.betType,o=e.dataset.selection,r=e.dataset.odds,i=e.dataset.line;p={event:t,eventTime:n,betType:a,selection:o,odds:r,line:i},document.getElementById("modalEventTitle").textContent=`${t} - ${a}`;const l=document.getElementById("teamSelection");if(l.innerHTML="",a==="Moneyline")t.split(" @ ").forEach(s=>{const c=document.createElement("button");c.type="button",c.textContent=s,c.style.cssText="padding:0.5rem 1rem; background:#333; color:#fff; border:1px solid #444; border-radius:5px; cursor:pointer; flex:1;",c.addEventListener("click",function(){l.querySelectorAll("button").forEach(g=>{g.style.background="#333",g.style.borderColor="#444"}),this.style.background="#646cff",this.style.borderColor="#646cff",p.selectedTeam=this.textContent}),l.appendChild(c)});else{const d=document.createElement("button");d.type="button",d.textContent=o,d.style.cssText="padding:0.5rem 1rem; background:#646cff; color:#fff; border:1px solid #646cff; border-radius:5px; cursor:pointer; width:100%;",p.selectedTeam=o,l.appendChild(d)}document.getElementById("bettingForm").reset(),document.getElementById("bettingError").textContent="",document.getElementById("bettingSuccess").textContent="",document.getElementById("bettingModal").style.display="flex"}function S(){document.getElementById("bettingModal").style.display="none",p=null}function te(){document.getElementById("bettingExampleModal").style.display="none"}async function oe(e){if(e.preventDefault(),!p||!p.selectedTeam){document.getElementById("bettingError").textContent="Please select a team.";return}const t=document.getElementById("bettingUsername").value,n=document.getElementById("bettingAmount").value,a=document.getElementById("bettingProofImage").files[0];if(!a){document.getElementById("bettingError").textContent="Image required.";return}document.getElementById("bettingSuccess").textContent="Processing... Please wait.",document.getElementById("bettingError").textContent="";let o="",r="";try{const l=h(12),{url:d,filename:s}=await v(a,l);o=d,r=s}catch(l){document.getElementById("bettingError").textContent=l.message,document.getElementById("bettingSuccess").textContent="";return}const i={username:t,amountBet:n,eventName:p.event,eventTime:p.eventTime,betType:p.betType,selectedTeam:p.selectedTeam,odds:p.odds,line:p.line,proofImageUrl:o,proofImageFilename:r,adminUsername:y};try{const l=await fetch(`${f}/api/submit-sports-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(l.ok)document.getElementById("bettingSuccess").textContent="✅ Bet submitted successfully! Data saved to database.",document.getElementById("bettingError").textContent="",document.getElementById("bettingForm").reset(),setTimeout(()=>{S()},3e3);else{const d=await l.json();document.getElementById("bettingError").textContent=d.message||"Failed to place bet.",document.getElementById("bettingSuccess").textContent=""}}catch{document.getElementById("bettingError").textContent="Connection failed. Please try again.",document.getElementById("bettingSuccess").textContent=""}}window.toggleEventCard=function(e){console.log("Toggle called for index:",e);const t=document.getElementById(`event-content-${e}`),n=t.closest(".event-card");console.log("Content element:",t),console.log("Current display style:",t.style.display),t.style.display==="none"?(t.style.display="block",n.classList.remove("collapsed"),console.log("Expanding card")):(t.style.display="none",n.classList.add("collapsed"),console.log("Collapsing card"))};E?b():w();
