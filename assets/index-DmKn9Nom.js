(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();let v=!1,g="",p="menu";const y="https://admin-site-ze7d.onrender.com",B="df860f2526805007d06289b53d901e26",I="https://api.the-odds-api.com/v4";function T(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("loginForm").onsubmit=async t=>{t.preventDefault();const o=document.getElementById("loginUsername").value,r=document.getElementById("loginPassword").value;document.getElementById("loginLoading").style.display="block",document.getElementById("loginError").innerText="";try{const a=await fetch(`${y}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:o,password:r})});if(a.ok)v=!0,g=o,p="menu",b();else{const e=await a.json();document.getElementById("loginError").innerText=e.message||"Login failed"}}catch{document.getElementById("loginError").innerText="Connection failed. Please try again."}finally{document.getElementById("loginLoading").style.display="none"}}}function h(t=8){const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let r="";for(let a=0;a<t;a++)r+=o.charAt(Math.floor(Math.random()*o.length));return r}function $(t){return t.split(".").pop()}function A(){return"PB-"+h(10)}function q(t,o){const r=$(o.name);return`GeneralsGamblingAdmin_${t}.${r}`}async function E(t,o){const r="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7",a=q(o,t),e=new File([t],a,{type:t.type}),n=new FormData;n.append("file",e),n.append("metadata",JSON.stringify({name:a,description:"Proof image uploaded from Generals Gambling Admin."}));const l=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:r},body:n}),i=await l.json();if(l.ok&&i.data&&i.data.url)return{url:i.data.url,filename:a};throw new Error(i?.message||"Image upload failed.")}function b(){document.querySelector("#app").innerHTML=`
    <div class="menu-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, ${g}!</p>
      <div class="menu-buttons">
        <button id="addFundsBtn" class="menu-button">Add Funds</button>
        <button id="sportsBetsBtn" class="menu-button">Take Sports Bets</button>
        <button id="raffleTicketsBtn" class="menu-button">Raffle Tickets</button>
        <button id="propBetsBtn" class="menu-button">Prop Bets</button>
      </div>
      <button id="logoutBtn" class="logout-button">Logout</button>
    </div>
  `,document.getElementById("addFundsBtn").onclick=()=>{p="addFunds",H()},document.getElementById("sportsBetsBtn").onclick=()=>{p="sportsBets",U()},document.getElementById("raffleTicketsBtn").onclick=()=>{p="raffleTickets",N()},document.getElementById("propBetsBtn").onclick=()=>{p="propBets",O()},document.getElementById("logoutBtn").onclick=()=>{v=!1,g="",p="menu",T()}}function U(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{p="menu",b()},j(),document.getElementById("sportSelect").addEventListener("change",function(){const t=this.value;t?z(t):document.getElementById("oddsContainer").innerHTML="<p>Select a sport to view available odds</p>"})}function H(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("exampleBtn").onclick=()=>{document.getElementById("exampleModal").style.display="flex"},document.getElementById("closeExampleModal").onclick=()=>{document.getElementById("exampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{p="menu",b()};const t=document.getElementById("proofImage");document.getElementById("playerForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const r=o.clipboardData.files[0];if(r.type.startsWith("image/")){const a=new DataTransfer;a.items.add(r),t.files=a.files}}}),document.getElementById("playerForm").onsubmit=async o=>{o.preventDefault();const r=document.getElementById("playerUsername").value,a=document.getElementById("amountToAdd").value,e=document.getElementById("proofImage").files[0];if(!e){document.getElementById("formError").innerText="Image required.";return}let n="",l="";try{const d=h(12),{url:c,filename:f}=await E(e,d);n=c,l=f}catch(d){document.getElementById("formError").innerText=d.message;return}const i={playerUsername:r,amountToAdd:a,proofImageUrl:n,proofImageFilename:l,adminUsername:g},s=await fetch(`${y}/api/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(s.ok)document.getElementById("formSuccess").innerText="Submitted successfully!",document.getElementById("formError").innerText="",document.getElementById("playerForm").reset();else{const d=await s.json();document.getElementById("formError").innerText=d.message||"Submission failed.",document.getElementById("formSuccess").innerText=""}}}function N(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("raffleExampleBtn").onclick=()=>{document.getElementById("raffleExampleModal").style.display="flex"},document.getElementById("closeRaffleExampleModal").onclick=()=>{document.getElementById("raffleExampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{p="menu",b()};const t=document.getElementById("raffleProofImage");document.getElementById("raffleForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const r=o.clipboardData.files[0];if(r.type.startsWith("image/")){const a=new DataTransfer;a.items.add(r),t.files=a.files}}}),document.getElementById("raffleForm").onsubmit=async o=>{o.preventDefault();const r=document.getElementById("phoneNumber").value,a=document.getElementById("stateId").value,e=document.getElementById("amountPurchased").value,n=document.getElementById("raffleProofImage").files[0];if(!n){document.getElementById("raffleFormError").innerText="Image required.";return}let l="",i="";try{const d=h(12),{url:c,filename:f}=await E(n,d);l=c,i=f}catch(d){document.getElementById("raffleFormError").innerText=d.message;return}const s={phoneNumber:r,stateId:a,amountPurchased:e,proofImageUrl:l,proofImageFilename:i,adminUsername:g};try{const d=await fetch(`${y}/api/submit-raffle-ticket`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(d.ok)document.getElementById("raffleFormSuccess").innerText="Raffle ticket submitted successfully!",document.getElementById("raffleFormError").innerText="",document.getElementById("raffleForm").reset();else{const c=await d.json();document.getElementById("raffleFormError").innerText=c.message||"Submission failed.",document.getElementById("raffleFormSuccess").innerText=""}}catch{document.getElementById("raffleFormError").innerText="Connection failed. Please try again.",document.getElementById("raffleFormSuccess").innerText=""}}}function O(){document.querySelector("#app").innerHTML=`
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
          <label>Submit Proof of Purchase</label><br />
          <label>Only needed for stateID bets, not usernames as they deduct automatically.</label><br />
          <label>(can submit multiple at once)</label><br />          
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
    </div>
  `,document.getElementById("backToMenuBtn").onclick=()=>{p="menu",b()},document.getElementById("propExampleBtn").onclick=()=>{document.getElementById("propExampleModal").style.display="flex"},document.getElementById("closePropExampleModal").onclick=()=>{document.getElementById("propExampleModal").style.display="none"},document.getElementById("propBetForm").onsubmit=_}async function _(t){t.preventDefault();const o=document.getElementById("propPlayers").value.trim(),r=document.getElementById("propBetName").value.trim(),a=document.getElementById("propHowToWin").value.trim(),e=parseFloat(document.getElementById("propAmount").value),n=document.getElementById("propPasscode").value.trim(),l=Array.from(document.getElementById("propProofImages").files),i=o.split(",").map(m=>m.trim()).filter(Boolean);if(!i.length||!r||!a||!e||!n||!l.length){document.getElementById("propFormError").innerText="All fields are required.";return}document.getElementById("propFormError").innerText="",document.getElementById("propFormSuccess").innerText="Uploading images...";let s=[];const d=A();try{for(let m=0;m<l.length;m++){const M=l[m],L=`${d}_${m+1}`,{url:C,filename:D}=await E(M,L);s.push({url:C,filename:D})}}catch(m){document.getElementById("propFormError").innerText=m.message,document.getElementById("propFormSuccess").innerText="";return}const c=Math.round(e*.1*100)/100,f=Math.round((e*i.length+c)*100)/100,k=new Date().toLocaleString(),S=s.map(m=>m.url),F=s.map(m=>m.filename),P=[d,r,a,e,c,n,i.join(","),k,f,"active",...S,...F];await fetch(`${y}/api/submit-prop-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row:P})}),document.getElementById("propFormSuccess").innerText="Prop bet submitted!",document.getElementById("propFormError").innerText="",document.getElementById("propBetForm").reset()}async function j(){try{const t=await fetch(`${I}/sports?apiKey=${B}`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const o=await t.json(),r=document.getElementById("sportSelect");r.innerHTML='<option value="">Select a sport...</option>',o.filter(e=>e.active).sort((e,n)=>e.group===n.group?e.title.localeCompare(n.title):e.group.localeCompare(n.group)).forEach(e=>{const n=document.createElement("option");n.value=e.key,n.textContent=`${e.group} - ${e.title}`,r.appendChild(n)})}catch(t){console.error("Error loading sports:",t),document.getElementById("sportSelect").innerHTML='<option value="">Error loading sports</option>'}}async function z(t){const o=document.getElementById("oddsContainer");o.innerHTML="<p>Loading odds...</p>";try{const r=await fetch(`${I}/sports/${t}/odds?regions=us&oddsFormat=decimal&markets=h2h,spreads,totals&apiKey=${B}`);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const a=await r.json(),e={title:G(t),events:a};R(e)}catch(r){console.error("Error loading odds:",r),o.innerHTML="<p>Error loading odds. Please try again.</p>"}}function G(t){return{americanfootball_nfl:"NFL",americanfootball_ncaaf:"NCAAF",basketball_nba:"NBA",basketball_wnba:"WNBA",baseball_mlb:"MLB",icehockey_nhl:"NHL",soccer_epl:"EPL",soccer_usa_mls:"MLS",mma_mixed_martial_arts:"MMA"}[t]||t}function R(t){const o=document.getElementById("oddsContainer");if(!t.events||t.events.length===0){o.innerHTML="<p>No events available for this sport at the moment.</p>";return}let r=`<h3>${t.title} - Upcoming Games</h3>`;t.events.forEach((e,n)=>{const l=new Date(e.commence_time).toLocaleString();r+=`
      <div class="event-card" id="event-card-${n}">
        <div class="event-header">
          <h4>${e.away_team} @ ${e.home_team}</h4>
          <p class="event-time">${l}</p>
        </div>
        <div class="event-content" id="event-content-${n}">
          <div class="odds-tables">
    `,e.bookmakers.forEach(i=>{r+=`
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
      `,i.markets.forEach(s=>{s.outcomes.forEach(d=>{const c=d.price;r+=`
            <tr>
              <td>${x(s.key)}</td>
              <td class="betting-cell" data-event="${e.away_team} @ ${e.home_team}" data-event-time="${e.commence_time}" data-bet-type="${x(s.key)}" data-selection="${d.name}" data-odds="${c.toFixed(2)}" data-line="${d.point?d.point:"-"}">${d.name}</td>
              <td>${c.toFixed(2)}</td>
              <td>${d.point?d.point:"-"}</td>
            </tr>
          `})}),r+=`
            </tbody>
          </table>
        </div>
      `}),r+=`
          </div>
        </div>
      </div>
    `}),o.innerHTML=r,o.innerHTML+=`
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
  `,t.events.forEach((e,n)=>{const l=document.getElementById(`event-card-${n}`),i=document.getElementById(`event-content-${n}`);l&&i&&(i.style.display="none",l.classList.add("collapsed"),l.addEventListener("click",function(s){s.target.closest(".event-content")||(i.style.display==="none"?(i.style.display="block",l.classList.remove("collapsed")):(i.style.display="none",l.classList.add("collapsed")))}))}),document.querySelectorAll(".betting-cell").forEach(e=>{e.addEventListener("click",function(n){n.stopPropagation(),W(this)})}),document.getElementById("closeBettingModal").addEventListener("click",w),document.getElementById("closeBettingExampleModal").addEventListener("click",Y),document.getElementById("bettingExampleBtn").addEventListener("click",()=>{document.getElementById("bettingExampleModal").style.display="flex"});const a=document.getElementById("bettingProofImage");document.getElementById("bettingForm").addEventListener("paste",e=>{if(e.clipboardData&&e.clipboardData.files&&e.clipboardData.files.length>0){const n=e.clipboardData.files[0];if(n.type.startsWith("image/")){const l=new DataTransfer;l.items.add(n),a.files=l.files}}}),document.getElementById("bettingForm").addEventListener("submit",J)}function x(t){return{h2h:"Moneyline",spreads:"Spread",totals:"Total"}[t]||t}let u=null;function W(t){const o=t.dataset.event,r=t.dataset.eventTime,a=t.dataset.betType,e=t.dataset.selection,n=t.dataset.odds,l=t.dataset.line;u={event:o,eventTime:r,betType:a,selection:e,odds:n,line:l},document.getElementById("modalEventTitle").textContent=`${o} - ${a}`;const i=document.getElementById("teamSelection");if(i.innerHTML="",a==="Moneyline")o.split(" @ ").forEach(d=>{const c=document.createElement("button");c.type="button",c.textContent=d,c.style.cssText="padding:0.5rem 1rem; background:#333; color:#fff; border:1px solid #444; border-radius:5px; cursor:pointer; flex:1;",c.addEventListener("click",function(){i.querySelectorAll("button").forEach(f=>{f.style.background="#333",f.style.borderColor="#444"}),this.style.background="#646cff",this.style.borderColor="#646cff",u.selectedTeam=this.textContent}),i.appendChild(c)});else{const s=document.createElement("button");s.type="button",s.textContent=e,s.style.cssText="padding:0.5rem 1rem; background:#646cff; color:#fff; border:1px solid #646cff; border-radius:5px; cursor:pointer; width:100%;",u.selectedTeam=e,i.appendChild(s)}document.getElementById("bettingForm").reset(),document.getElementById("bettingError").textContent="",document.getElementById("bettingSuccess").textContent="",document.getElementById("bettingModal").style.display="flex"}function w(){document.getElementById("bettingModal").style.display="none",u=null}function Y(){document.getElementById("bettingExampleModal").style.display="none"}async function J(t){if(t.preventDefault(),!u||!u.selectedTeam){document.getElementById("bettingError").textContent="Please select a team.";return}const o=document.getElementById("bettingUsername").value,r=document.getElementById("bettingAmount").value,a=document.getElementById("bettingProofImage").files[0];if(!a){document.getElementById("bettingError").textContent="Image required.";return}document.getElementById("bettingSuccess").textContent="Processing... Please wait.",document.getElementById("bettingError").textContent="";let e="",n="";try{const i=h(12),{url:s,filename:d}=await E(a,i);e=s,n=d}catch(i){document.getElementById("bettingError").textContent=i.message,document.getElementById("bettingSuccess").textContent="";return}const l={username:o,amountBet:r,eventName:u.event,eventTime:u.eventTime,betType:u.betType,selectedTeam:u.selectedTeam,odds:u.odds,line:u.line,proofImageUrl:e,proofImageFilename:n,adminUsername:g};try{const i=await fetch(`${y}/api/submit-sports-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(i.ok)document.getElementById("bettingSuccess").textContent="✅ Bet submitted successfully! Data saved to database.",document.getElementById("bettingError").textContent="",document.getElementById("bettingForm").reset(),setTimeout(()=>{w()},3e3);else{const s=await i.json();document.getElementById("bettingError").textContent=s.message||"Failed to place bet.",document.getElementById("bettingSuccess").textContent=""}}catch{document.getElementById("bettingError").textContent="Connection failed. Please try again.",document.getElementById("bettingSuccess").textContent=""}}window.toggleEventCard=function(t){console.log("Toggle called for index:",t);const o=document.getElementById(`event-content-${t}`),r=o.closest(".event-card");console.log("Content element:",o),console.log("Current display style:",o.style.display),o.style.display==="none"?(o.style.display="block",r.classList.remove("collapsed"),console.log("Expanding card")):(o.style.display="none",r.classList.add("collapsed"),console.log("Collapsing card"))};v?b():T();
