(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();let b=!1,p="",f="menu";const y="https://admin-site-ze7d.onrender.com",v="df860f2526805007d06289b53d901e26",E="https://api.the-odds-api.com/v4";function x(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("loginForm").onsubmit=async n=>{n.preventDefault();const t=document.getElementById("loginUsername").value,r=document.getElementById("loginPassword").value;document.getElementById("loginLoading").style.display="block",document.getElementById("loginError").innerText="";try{const a=await fetch(`${y}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:r})});if(a.ok)b=!0,p=t,f="menu",g();else{const e=await a.json();document.getElementById("loginError").innerText=e.message||"Login failed"}}catch{document.getElementById("loginError").innerText="Connection failed. Please try again."}finally{document.getElementById("loginLoading").style.display="none"}}}function g(){document.querySelector("#app").innerHTML=`
    <div class="menu-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, ${p}!</p>
      <div class="menu-buttons">
        <button id="addFundsBtn" class="menu-button">Add Funds</button>
        <button id="sportsBetsBtn" class="menu-button">Take Sports Bets</button>
        <button id="raffleTicketsBtn" class="menu-button">Raffle Tickets</button>
      </div>
      <button id="logoutBtn" class="logout-button">Logout</button>
    </div>
  `,document.getElementById("addFundsBtn").onclick=()=>{f="addFunds",T()},document.getElementById("sportsBetsBtn").onclick=()=>{f="sportsBets",I()},document.getElementById("raffleTicketsBtn").onclick=()=>{f="raffleTickets",k()},document.getElementById("logoutBtn").onclick=()=>{b=!1,p="",f="menu",x()}}function I(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{f="menu",g()},w(),document.getElementById("sportSelect").addEventListener("change",function(){const n=this.value;n?S(n):document.getElementById("oddsContainer").innerHTML="<p>Select a sport to view available odds</p>"})}function T(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("exampleBtn").onclick=()=>{document.getElementById("exampleModal").style.display="flex"},document.getElementById("closeExampleModal").onclick=()=>{document.getElementById("exampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{f="menu",g()};const n=document.getElementById("proofImage");document.getElementById("playerForm").addEventListener("paste",t=>{if(t.clipboardData&&t.clipboardData.files&&t.clipboardData.files.length>0){const r=t.clipboardData.files[0];if(r.type.startsWith("image/")){const a=new DataTransfer;a.items.add(r),n.files=a.files}}}),document.getElementById("playerForm").onsubmit=async t=>{t.preventDefault();const r=document.getElementById("playerUsername").value,a=document.getElementById("amountToAdd").value,e=document.getElementById("proofImage").files[0];if(!e){document.getElementById("formError").innerText="Image required.";return}const o="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7";let l="";try{const i=new FormData;i.append("file",e);const c=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:o},body:i}),m=await c.json();if(c.ok&&m.data&&m.data.url)l=m.data.url;else{document.getElementById("formError").innerText=m?.message||"Image upload failed.";return}}catch{document.getElementById("formError").innerText="Image upload failed.";return}const d={playerUsername:r,amountToAdd:a,proofImageUrl:l,adminUsername:p},s=await fetch(`${y}/api/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});if(s.ok)document.getElementById("formSuccess").innerText="Submitted successfully!",document.getElementById("formError").innerText="",document.getElementById("playerForm").reset();else{const i=await s.json();document.getElementById("formError").innerText=i.message||"Submission failed.",document.getElementById("formSuccess").innerText=""}}}function k(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("raffleExampleBtn").onclick=()=>{document.getElementById("raffleExampleModal").style.display="flex"},document.getElementById("closeRaffleExampleModal").onclick=()=>{document.getElementById("raffleExampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{f="menu",g()};const n=document.getElementById("raffleProofImage");document.getElementById("raffleForm").addEventListener("paste",t=>{if(t.clipboardData&&t.clipboardData.files&&t.clipboardData.files.length>0){const r=t.clipboardData.files[0];if(r.type.startsWith("image/")){const a=new DataTransfer;a.items.add(r),n.files=a.files}}}),document.getElementById("raffleForm").onsubmit=async t=>{t.preventDefault();const r=document.getElementById("phoneNumber").value,a=document.getElementById("stateId").value,e=document.getElementById("amountPurchased").value,o=document.getElementById("raffleProofImage").files[0];if(!o){document.getElementById("raffleFormError").innerText="Image required.";return}const l="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7";let d="";try{const i=new FormData;i.append("file",o);const c=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:l},body:i}),m=await c.json();if(c.ok&&m.data&&m.data.url)d=m.data.url;else{document.getElementById("raffleFormError").innerText=m?.message||"Image upload failed.";return}}catch{document.getElementById("raffleFormError").innerText="Image upload failed.";return}const s={phoneNumber:r,stateId:a,amountPurchased:e,proofImageUrl:d,adminUsername:p};try{const i=await fetch(`${y}/api/submit-raffle-ticket`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(i.ok)document.getElementById("raffleFormSuccess").innerText="Raffle ticket submitted successfully!",document.getElementById("raffleFormError").innerText="",document.getElementById("raffleForm").reset();else{const c=await i.json();document.getElementById("raffleFormError").innerText=c.message||"Submission failed.",document.getElementById("raffleFormSuccess").innerText=""}}catch{document.getElementById("raffleFormError").innerText="Connection failed. Please try again.",document.getElementById("raffleFormSuccess").innerText=""}}}async function w(){try{const n=await fetch(`${E}/sports?apiKey=${v}`);if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const t=await n.json(),r=document.getElementById("sportSelect");r.innerHTML='<option value="">Select a sport...</option>',t.filter(e=>e.active).sort((e,o)=>e.group===o.group?e.title.localeCompare(o.title):e.group.localeCompare(o.group)).forEach(e=>{const o=document.createElement("option");o.value=e.key,o.textContent=`${e.group} - ${e.title}`,r.appendChild(o)})}catch(n){console.error("Error loading sports:",n),document.getElementById("sportSelect").innerHTML='<option value="">Error loading sports</option>'}}async function S(n){const t=document.getElementById("oddsContainer");t.innerHTML="<p>Loading odds...</p>";try{const r=await fetch(`${E}/sports/${n}/odds?regions=us&oddsFormat=decimal&markets=h2h,spreads,totals&apiKey=${v}`);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const a=await r.json(),e={title:M(n),events:a};P(e)}catch(r){console.error("Error loading odds:",r),t.innerHTML="<p>Error loading odds. Please try again.</p>"}}function M(n){return{americanfootball_nfl:"NFL",americanfootball_ncaaf:"NCAAF",basketball_nba:"NBA",basketball_wnba:"WNBA",baseball_mlb:"MLB",icehockey_nhl:"NHL",soccer_epl:"EPL",soccer_usa_mls:"MLS",mma_mixed_martial_arts:"MMA"}[n]||n}function P(n){const t=document.getElementById("oddsContainer");if(!n.events||n.events.length===0){t.innerHTML="<p>No events available for this sport at the moment.</p>";return}let r=`<h3>${n.title} - Upcoming Games</h3>`;n.events.forEach((e,o)=>{const l=new Date(e.commence_time).toLocaleString();r+=`
      <div class="event-card" id="event-card-${o}">
        <div class="event-header">
          <h4>${e.away_team} @ ${e.home_team}</h4>
          <p class="event-time">${l}</p>
        </div>
        <div class="event-content" id="event-content-${o}">
          <div class="odds-tables">
    `,e.bookmakers.forEach(d=>{r+=`
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
      `,d.markets.forEach(s=>{s.outcomes.forEach(i=>{const c=i.price;r+=`
            <tr>
              <td>${h(s.key)}</td>
              <td class="betting-cell" data-event="${e.away_team} @ ${e.home_team}" data-event-time="${e.commence_time}" data-bet-type="${h(s.key)}" data-selection="${i.name}" data-odds="${c.toFixed(2)}" data-line="${i.point?i.point:"-"}">${i.name}</td>
              <td>${c.toFixed(2)}</td>
              <td>${i.point?i.point:"-"}</td>
            </tr>
          `})}),r+=`
            </tbody>
          </table>
        </div>
      `}),r+=`
          </div>
        </div>
      </div>
    `}),t.innerHTML=r,t.innerHTML+=`
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
  `,n.events.forEach((e,o)=>{const l=document.getElementById(`event-card-${o}`),d=document.getElementById(`event-content-${o}`);l&&d&&(d.style.display="none",l.classList.add("collapsed"),l.addEventListener("click",function(s){s.target.closest(".event-content")||(d.style.display==="none"?(d.style.display="block",l.classList.remove("collapsed")):(d.style.display="none",l.classList.add("collapsed")))}))}),document.querySelectorAll(".betting-cell").forEach(e=>{e.addEventListener("click",function(o){o.stopPropagation(),L(this)})}),document.getElementById("closeBettingModal").addEventListener("click",B),document.getElementById("closeBettingExampleModal").addEventListener("click",C),document.getElementById("bettingExampleBtn").addEventListener("click",()=>{document.getElementById("bettingExampleModal").style.display="flex"});const a=document.getElementById("bettingProofImage");document.getElementById("bettingForm").addEventListener("paste",e=>{if(e.clipboardData&&e.clipboardData.files&&e.clipboardData.files.length>0){const o=e.clipboardData.files[0];if(o.type.startsWith("image/")){const l=new DataTransfer;l.items.add(o),a.files=l.files}}}),document.getElementById("bettingForm").addEventListener("submit",F)}function h(n){return{h2h:"Moneyline",spreads:"Spread",totals:"Total"}[n]||n}let u=null;function L(n){const t=n.dataset.event,r=n.dataset.eventTime,a=n.dataset.betType,e=n.dataset.selection,o=n.dataset.odds,l=n.dataset.line;u={event:t,eventTime:r,betType:a,selection:e,odds:o,line:l},document.getElementById("modalEventTitle").textContent=`${t} - ${a}`;const d=document.getElementById("teamSelection");if(d.innerHTML="",a==="Moneyline")t.split(" @ ").forEach(i=>{const c=document.createElement("button");c.type="button",c.textContent=i,c.style.cssText="padding:0.5rem 1rem; background:#333; color:#fff; border:1px solid #444; border-radius:5px; cursor:pointer; flex:1;",c.addEventListener("click",function(){d.querySelectorAll("button").forEach(m=>{m.style.background="#333",m.style.borderColor="#444"}),this.style.background="#646cff",this.style.borderColor="#646cff",u.selectedTeam=this.textContent}),d.appendChild(c)});else{const s=document.createElement("button");s.type="button",s.textContent=e,s.style.cssText="padding:0.5rem 1rem; background:#646cff; color:#fff; border:1px solid #646cff; border-radius:5px; cursor:pointer; width:100%;",u.selectedTeam=e,d.appendChild(s)}document.getElementById("bettingForm").reset(),document.getElementById("bettingError").textContent="",document.getElementById("bettingSuccess").textContent="",document.getElementById("bettingModal").style.display="flex"}function B(){document.getElementById("bettingModal").style.display="none",u=null}function C(){document.getElementById("bettingExampleModal").style.display="none"}async function F(n){if(n.preventDefault(),!u||!u.selectedTeam){document.getElementById("bettingError").textContent="Please select a team.";return}const t=document.getElementById("bettingUsername").value,r=document.getElementById("bettingAmount").value,a=document.getElementById("bettingProofImage").files[0];if(!a){document.getElementById("bettingError").textContent="Image required.";return}document.getElementById("bettingSuccess").textContent="Processing... Please wait.",document.getElementById("bettingError").textContent="";const e="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7";let o="";try{const d=new FormData;d.append("file",a);const s=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:e},body:d}),i=await s.json();if(s.ok&&i.data&&i.data.url)o=i.data.url;else{document.getElementById("bettingError").textContent=i?.message||"Image upload failed.",document.getElementById("bettingSuccess").textContent="";return}}catch{document.getElementById("bettingError").textContent="Image upload failed.",document.getElementById("bettingSuccess").textContent="";return}const l={username:t,amountBet:r,eventName:u.event,eventTime:u.eventTime,betType:u.betType,selectedTeam:u.selectedTeam,odds:u.odds,line:u.line,proofImageUrl:o,adminUsername:p};try{const d=await fetch(`${y}/api/submit-sports-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(d.ok)document.getElementById("bettingSuccess").textContent="✅ Bet submitted successfully! Data saved to database.",document.getElementById("bettingError").textContent="",document.getElementById("bettingForm").reset(),setTimeout(()=>{B()},3e3);else{const s=await d.json();document.getElementById("bettingError").textContent=s.message||"Failed to place bet.",document.getElementById("bettingSuccess").textContent=""}}catch{document.getElementById("bettingError").textContent="Connection failed. Please try again.",document.getElementById("bettingSuccess").textContent=""}}window.toggleEventCard=function(n){console.log("Toggle called for index:",n);const t=document.getElementById(`event-content-${n}`),r=t.closest(".event-card");console.log("Content element:",t),console.log("Current display style:",t.style.display),t.style.display==="none"?(t.style.display="block",r.classList.remove("collapsed"),console.log("Expanding card")):(t.style.display="none",r.classList.add("collapsed"),console.log("Collapsing card"))};b?g():x();
