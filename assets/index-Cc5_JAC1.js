(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();let E=!1,y="",u="menu";const g="https://admin-site-ze7d.onrender.com",w="df860f2526805007d06289b53d901e26",P="https://api.the-odds-api.com/v4";function S(e){let t=e.value.replace(/[^\d]/g,"");if(!t){e.value="";return}t=parseInt(t,10).toString(),e.value=t.replace(/\B(?=(\d{3})+(?!\d))/g,","),e.value!==""&&(e.value="$"+e.value)}function B(e){return e?e.replace(/[^\d.\-]/g,""):""}function N(e){let t=e.value.replace(/[^\d]/g,"");t.length>10&&(t=t.slice(0,10));let o=t;t.length>6?o=t.slice(0,3)+"-"+t.slice(3,6)+"-"+t.slice(6):t.length>3&&(o=t.slice(0,3)+"-"+t.slice(3)),e.value=o}function k(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("loginForm").onsubmit=async e=>{e.preventDefault();const t=document.getElementById("loginUsername").value,o=document.getElementById("loginPassword").value;document.getElementById("loginLoading").style.display="block",document.getElementById("loginError").innerText="";try{const a=await fetch(`${g}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:o})});if(a.ok)E=!0,y=t,u="menu",b();else{const n=await a.json();document.getElementById("loginError").innerText=n.message||"Login failed"}}catch{document.getElementById("loginError").innerText="Connection failed. Please try again."}finally{document.getElementById("loginLoading").style.display="none"}}}function x(e=8){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let o="";for(let a=0;a<e;a++)o+=t.charAt(Math.floor(Math.random()*t.length));return o}function M(e){return e.split(".").pop()}function q(){return"PB-"+x(10)}function U(e){const t=M(e.name);return`GeneralsGamblingAdmin_${x(12)}.${t}`}async function h(e){const t="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7",o=U(e),a=new FormData;a.append("file",e,o),a.append("metadata",JSON.stringify({name:o}));const n=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:t},body:a}),r=await n.json();if(n.ok&&r.data&&r.data.url)return{url:r.data.url,filename:o};throw new Error(r?.message||"Image upload failed.")}async function J(e){const t="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7",o=new FormData,a=M(e.name),n=`GeneralsGamblingAdmin_${x(12)}.${a}`;o.append("file",e,n),o.append("metadata",JSON.stringify({name:n}));const r=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:t},body:o}),d=await r.json();if(r.ok&&d.data&&d.data.url)return d.data.url;throw new Error(d?.message||"Image upload failed.")}function b(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("addFundsBtn").onclick=()=>{u="addFunds",O()},document.getElementById("sportsBetsBtn").onclick=()=>{u="sportsBets",H()},document.getElementById("raffleTicketsBtn").onclick=()=>{u="raffleTickets",j()},document.getElementById("propBetsBtn").onclick=()=>{u="propBets",_()},document.getElementById("logoutBtn").onclick=()=>{E=!1,y="",u="menu",k()}}function H(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{u="menu",b()},Q(),document.getElementById("sportSelect").addEventListener("change",function(){const e=this.value;e?V(e):document.getElementById("oddsContainer").innerHTML="<p>Select a sport to view available odds</p>"})}function O(){document.querySelector("#app").innerHTML=`
    <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
      <button id="backToMenuBtn" style="padding: 0.5rem 1rem; background: #666; color: #fff; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; width: auto;">← Back to Menu</button>
      <div class="form-container">
        <h2>Submit Player Data</h2>
        <form id="playerForm">
        <label>Username of Player</label><br />
        <input type="text" id="playerUsername" required /><br />
        <label>Amount to Add</label><br />
        <input type="text" id="amountToAdd" required /><br />
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
  `,document.getElementById("exampleBtn").onclick=()=>{document.getElementById("exampleModal").style.display="flex"},document.getElementById("closeExampleModal").onclick=()=>{document.getElementById("exampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{u="menu",b()};const e=document.getElementById("proofImage");document.getElementById("playerForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const a=o.clipboardData.files[0];if(a.type.startsWith("image/")){const n=new DataTransfer;n.items.add(a),e.files=n.files}}}),document.getElementById("amountToAdd").addEventListener("input",function(){S(this)}),document.getElementById("playerForm").onsubmit=async o=>{o.preventDefault();const a=document.getElementById("playerUsername").value,n=B(document.getElementById("amountToAdd").value),r=document.getElementById("proofImage").files[0];if(!r){document.getElementById("formError").innerText="Image required.";return}let d="",l="";try{const{url:m,filename:v}=await h(r);d=m,l=v}catch(m){document.getElementById("formError").innerText=m.message;return}const i={playerUsername:a,amountToAdd:n,proofImageUrl:d,proofImageFilename:l,adminUsername:y},c=await fetch(`${g}/api/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),s=await c.json();c.ok?(s.newAccount?(document.getElementById("formError").innerHTML=`Error, account name, (<b>${a}</b>) not found. Please contact the general to fix the error. Their money is still tracked by the name you've mistyped.`,document.getElementById("formError").style.color="red",document.getElementById("formSuccess").innerText=""):(document.getElementById("formSuccess").innerText="Submitted successfully!",document.getElementById("formError").innerText=""),document.getElementById("playerForm").reset()):(document.getElementById("formError").innerText=s.message||"Submission failed.",document.getElementById("formSuccess").innerText="")}}function j(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("raffleExampleBtn").onclick=()=>{document.getElementById("raffleExampleModal").style.display="flex"},document.getElementById("closeRaffleExampleModal").onclick=()=>{document.getElementById("raffleExampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{u="menu",b()};const e=document.getElementById("raffleProofImage");document.getElementById("raffleForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const a=o.clipboardData.files[0];if(a.type.startsWith("image/")){const n=new DataTransfer;n.items.add(a),e.files=n.files}}}),document.getElementById("phoneNumber").addEventListener("input",function(){N(this)}),document.getElementById("raffleForm").onsubmit=async o=>{o.preventDefault();const a=document.getElementById("phoneNumber").value,n=document.getElementById("stateId").value,r=document.getElementById("amountPurchased").value,d=document.getElementById("raffleProofImage").files[0];if(!d){document.getElementById("raffleFormError").innerText="Image required.";return}let l="",i="";try{const{url:s,filename:m}=await h(d);l=s,i=m}catch(s){document.getElementById("raffleFormError").innerText=s.message;return}const c={phoneNumber:a,stateId:n,amountPurchased:r,proofImageUrl:l,proofImageFilename:i,adminUsername:y};try{const s=await fetch(`${g}/api/submit-raffle-ticket`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});if(s.ok)document.getElementById("raffleFormSuccess").innerText="Raffle ticket submitted successfully!",document.getElementById("raffleFormError").innerText="",document.getElementById("raffleForm").reset();else{const m=await s.json();document.getElementById("raffleFormError").innerText=m.message||"Submission failed.",document.getElementById("raffleFormSuccess").innerText=""}}catch{document.getElementById("raffleFormError").innerText="Connection failed. Please try again.",document.getElementById("raffleFormSuccess").innerText=""}}}function _(){document.querySelector("#app").innerHTML=`
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
          <input type="text" id="propAmount" min="1" required /><br />
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{u="menu",b()},document.getElementById("propExampleBtn").onclick=()=>{document.getElementById("propExampleModal").style.display="flex"},document.getElementById("closePropExampleModal").onclick=()=>{document.getElementById("propExampleModal").style.display="none"},document.getElementById("propBetForm").onsubmit=W,I()}async function z(){const e=await fetch(`${g}/api/players`);return e.ok?await e.json():[]}async function G(e,t){await fetch(`${g}/api/deduct-balance`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,amount:t})})}async function W(e){e.preventDefault();const t=document.getElementById("propPlayers").value.trim(),o=document.getElementById("propBetName").value.trim(),a=document.getElementById("propHowToWin").value.trim(),n=parseFloat(B(document.getElementById("propAmount").value)),r=document.getElementById("propPasscode").value.trim(),d=Array.from(document.getElementById("propProofImages").files),l=t.split(",").map(f=>f.trim()).filter(Boolean);if(!l.length||!o||!a||!n||!r||!d.length){document.getElementById("propFormError").innerText="All fields are required.";return}document.getElementById("propFormError").innerText="",document.getElementById("propFormSuccess").innerText="Uploading images...";let i=[];try{for(const f of d){const{url:D,filename:$}=await h(f);i.push({url:D,filename:$})}}catch(f){document.getElementById("propFormError").innerText=f.message,document.getElementById("propFormSuccess").innerText="";return}const c=q(),s=Math.round(n*.1*100)/100,m=Math.round((n*l.length+s)*100)/100,v=new Date().toLocaleString(),A=i.map(f=>f.url),L=i.map(f=>f.filename),C=[c,o,a,n,s,r,l.join(","),v,m,"active",...A,...L];await fetch(`${g}/api/submit-prop-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row:C})}),document.getElementById("propFormSuccess").innerText="Prop bet submitted!",document.getElementById("propFormError").innerText="",document.getElementById("propBetForm").reset(),I()}async function I(){const e=await fetch(`${g}/api/active-prop-bets`),t=e.ok?await e.json():[],o=document.getElementById("propActiveDropdownContainer");o.innerHTML=`
    <label for="propActiveDropdown">Join an Active Prop Bet:</label>
    <input id="propActiveDropdown" list="propActiveList" placeholder="Search by bet name..." style="width:100%; padding:0.5rem;" />
    <datalist id="propActiveList">
      ${t.map(a=>`<option value="${a.betName}">${a.betName} - ${a.howToWin}</option>`).join("")}
    </datalist>
    <button id="propJoinBtn" style="margin-top:10px;">Join</button>
    <div id="propJoinError" style="color:red;"></div>
  `,document.getElementById("propJoinBtn").onclick=()=>R(t)}async function R(e){const t=document.getElementById("propActiveDropdown").value.trim(),o=e.find(a=>a.betName===t);if(!o){document.getElementById("propJoinError").innerText="Bet not found.";return}Y(o)}function Y(e){let t=document.getElementById("propJoinModal");t&&t.remove(),t=document.createElement("div"),t.id="propJoinModal",t.style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:2000;",t.innerHTML=`
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
  `,document.body.appendChild(t),document.getElementById("closePropJoinModal").onclick=()=>t.remove(),document.getElementById("propJoinPassForm").onsubmit=o=>{if(o.preventDefault(),document.getElementById("propJoinPasscode").value!==e.passcode){document.getElementById("propJoinPassError").innerText="Incorrect passcode.";return}document.getElementById("propJoinPassError").innerText="",K(e,t)}}function K(e,t){const o=document.getElementById("propJoinDetails");o.style.display="block",o.innerHTML=`
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
  `,document.getElementById("propAddToBetForm").onsubmit=a=>Z(a,e,t)}async function Z(e,t,o){e.preventDefault();const a=document.getElementById("propAddPlayers").value.trim(),n=Array.from(document.getElementById("propAddProofImages").files),r=a.split(",").map(i=>i.trim()).filter(Boolean);if(!r.length||!n.length){document.getElementById("propAddToBetError").innerText="All fields required.";return}document.getElementById("propAddToBetError").innerText="",document.getElementById("propAddToBetSuccess").innerText="Uploading images...";let d=[];try{for(const i of n){const c=await J(i);d.push(c)}}catch(i){document.getElementById("propAddToBetError").innerText=i.message,document.getElementById("propAddToBetSuccess").innerText="";return}const l=await z();for(const i of r)l.some(s=>s.username===i)&&await G(i,t.amount);await fetch(`${g}/api/join-prop-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({betID:t.betID,addPlayers:r.join(","),addProofUrls:d})}),document.getElementById("propAddToBetSuccess").innerText="Added to bet!",document.getElementById("propAddToBetError").innerText="",document.getElementById("propAddToBetForm").reset(),setTimeout(()=>o.remove(),2e3),I()}async function Q(){try{const e=await fetch(`${P}/sports?apiKey=${w}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json(),o=document.getElementById("sportSelect");o.innerHTML='<option value="">Select a sport...</option>',t.filter(n=>n.active).sort((n,r)=>n.group===r.group?n.title.localeCompare(r.title):n.group.localeCompare(r.group)).forEach(n=>{const r=document.createElement("option");r.value=n.key,r.textContent=`${n.group} - ${n.title}`,o.appendChild(r)})}catch(e){console.error("Error loading sports:",e),document.getElementById("sportSelect").innerHTML='<option value="">Error loading sports</option>'}}async function V(e){const t=document.getElementById("oddsContainer");t.innerHTML="<p>Loading odds...</p>";try{const o=await fetch(`${P}/sports/${e}/odds?regions=us&oddsFormat=decimal&markets=h2h,spreads,totals&apiKey=${w}`);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const a=await o.json(),n={title:X(e),events:a};ee(n)}catch(o){console.error("Error loading odds:",o),t.innerHTML="<p>Error loading odds. Please try again.</p>"}}function X(e){return{americanfootball_nfl:"NFL",americanfootball_ncaaf:"NCAAF",basketball_nba:"NBA",basketball_wnba:"WNBA",baseball_mlb:"MLB",icehockey_nhl:"NHL",soccer_epl:"EPL",soccer_usa_mls:"MLS",mma_mixed_martial_arts:"MMA"}[e]||e}function ee(e){const t=document.getElementById("oddsContainer");if(!e.events||e.events.length===0){t.innerHTML="<p>No events available for this sport at the moment.</p>";return}let o=`<h3>${e.title} - Upcoming Games</h3>`;e.events.forEach((r,d)=>{const l=new Date(r.commence_time).toLocaleString();o+=`
      <div class="event-card" id="event-card-${d}">
        <div class="event-header">
          <h4>${r.away_team} @ ${r.home_team}</h4>
          <p class="event-time">${l}</p>
        </div>
        <div class="event-content" id="event-content-${d}">
          <div class="odds-tables">
    `,r.bookmakers.forEach(i=>{o+=`
        <div class="bookmaker-section">
          <h5>${i.title}</h5>
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
      `,i.markets.forEach(c=>{c.outcomes.forEach(s=>{const m=s.price;o+=`
            <tr>
              <td>${T(c.key)}</td>
              <td class="betting-cell" data-event="${r.away_team} @ ${r.home_team}" data-event-time="${r.commence_time}" data-bet-type="${T(c.key)}" data-selection="${s.name}" data-odds="${m.toFixed(2)}" data-line="${s.point?s.point:"-"}">${s.name}</td>
              <td>${m.toFixed(2)}</td>
              <td>${s.point?s.point:"-"}</td>
            </tr>
          `})}),o+=`
            </tbody>
          </table>
        </div>
      `}),o+=`
          </div>
        </div>
      </div>
    `}),t.innerHTML=o,t.innerHTML+=`
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
            <input type="text" id="bettingAmount" required style="width:100%; padding:0.5rem; border-radius:5px; border:1px solid #444; background:#333; color:#fff;" />
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
  `,e.events.forEach((r,d)=>{const l=document.getElementById(`event-card-${d}`),i=document.getElementById(`event-content-${d}`);l&&i&&(i.style.display="none",l.classList.add("collapsed"),l.addEventListener("click",function(c){c.target.closest(".event-content")||(i.style.display==="none"?(i.style.display="block",l.classList.remove("collapsed")):(i.style.display="none",l.classList.add("collapsed")))}))}),document.querySelectorAll(".betting-cell").forEach(r=>{r.addEventListener("click",function(d){d.stopPropagation(),te(this)})}),document.getElementById("closeBettingModal").addEventListener("click",F),document.getElementById("closeBettingExampleModal").addEventListener("click",oe),document.getElementById("bettingExampleBtn").addEventListener("click",()=>{document.getElementById("bettingExampleModal").style.display="flex"}),document.getElementById("bettingAmount").addEventListener("input",function(){S(this)});const n=document.getElementById("bettingProofImage");document.getElementById("bettingForm").addEventListener("paste",r=>{if(r.clipboardData&&r.clipboardData.files&&r.clipboardData.files.length>0){const d=r.clipboardData.files[0];if(d.type.startsWith("image/")){const l=new DataTransfer;l.items.add(d),n.files=l.files}}}),document.getElementById("bettingForm").addEventListener("submit",ne)}function T(e){return{h2h:"Moneyline",spreads:"Spread",totals:"Total"}[e]||e}let p=null;function te(e){const t=e.dataset.event,o=e.dataset.eventTime,a=e.dataset.betType,n=e.dataset.selection,r=e.dataset.odds,d=e.dataset.line;p={event:t,eventTime:o,betType:a,selection:n,odds:r,line:d},document.getElementById("modalEventTitle").textContent=`${t} - ${a}`;const l=document.getElementById("teamSelection");if(l.innerHTML="",a==="Moneyline")t.split(" @ ").forEach(c=>{const s=document.createElement("button");s.type="button",s.textContent=c,s.style.cssText="padding:0.5rem 1rem; background:#333; color:#fff; border:1px solid #444; border-radius:5px; cursor:pointer; flex:1;",s.addEventListener("click",function(){l.querySelectorAll("button").forEach(m=>{m.style.background="#333",m.style.borderColor="#444"}),this.style.background="#646cff",this.style.borderColor="#646cff",p.selectedTeam=this.textContent}),l.appendChild(s)});else{const i=document.createElement("button");i.type="button",i.textContent=n,i.style.cssText="padding:0.5rem 1rem; background:#646cff; color:#fff; border:1px solid #646cff; border-radius:5px; cursor:pointer; width:100%;",p.selectedTeam=n,l.appendChild(i)}document.getElementById("bettingForm").reset(),document.getElementById("bettingError").textContent="",document.getElementById("bettingSuccess").textContent="",document.getElementById("bettingModal").style.display="flex"}function F(){document.getElementById("bettingModal").style.display="none",p=null}function oe(){document.getElementById("bettingExampleModal").style.display="none"}async function ne(e){if(e.preventDefault(),!p||!p.selectedTeam){document.getElementById("bettingError").textContent="Please select a team.";return}const t=document.getElementById("bettingUsername").value,o=B(document.getElementById("bettingAmount").value),a=document.getElementById("bettingProofImage").files[0];if(!a){document.getElementById("bettingError").textContent="Image required.";return}document.getElementById("bettingSuccess").textContent="Processing... Please wait.",document.getElementById("bettingError").textContent="";let n="",r="";try{const{url:l,filename:i}=await h(a);n=l,r=i}catch(l){document.getElementById("bettingError").textContent=l.message,document.getElementById("bettingSuccess").textContent="";return}const d={username:t,amountBet:o,eventName:p.event,eventTime:p.eventTime,betType:p.betType,selectedTeam:p.selectedTeam,odds:p.odds,line:p.line,proofImageUrl:n,proofImageFilename:r,adminUsername:y};try{const l=await fetch(`${g}/api/submit-sports-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});if(l.ok)document.getElementById("bettingSuccess").textContent="✅ Bet submitted successfully! Data saved to database.",document.getElementById("bettingError").textContent="",document.getElementById("bettingForm").reset(),setTimeout(()=>{F()},3e3);else{const i=await l.json();document.getElementById("bettingError").textContent=i.message||"Failed to place bet.",document.getElementById("bettingSuccess").textContent=""}}catch{document.getElementById("bettingError").textContent="Connection failed. Please try again.",document.getElementById("bettingSuccess").textContent=""}}window.toggleEventCard=function(e){console.log("Toggle called for index:",e);const t=document.getElementById(`event-content-${e}`),o=t.closest(".event-card");console.log("Content element:",t),console.log("Current display style:",t.style.display),t.style.display==="none"?(t.style.display="block",o.classList.remove("collapsed"),console.log("Expanding card")):(t.style.display="none",o.classList.add("collapsed"),console.log("Collapsing card"))};E?b():k();
