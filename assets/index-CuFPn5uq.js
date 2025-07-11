(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();let y=!1,g="",p="menu";const h="https://admin-site-ze7d.onrender.com",E="df860f2526805007d06289b53d901e26",x="https://api.the-odds-api.com/v4";function B(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("loginForm").onsubmit=async t=>{t.preventDefault();const o=document.getElementById("loginUsername").value,r=document.getElementById("loginPassword").value;document.getElementById("loginLoading").style.display="block",document.getElementById("loginError").innerText="";try{const d=await fetch(`${h}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:o,password:r})});if(d.ok)y=!0,g=o,p="menu",b();else{const e=await d.json();document.getElementById("loginError").innerText=e.message||"Login failed"}}catch{document.getElementById("loginError").innerText="Connection failed. Please try again."}finally{document.getElementById("loginLoading").style.display="none"}}}function b(){document.querySelector("#app").innerHTML=`
    <div class="menu-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, ${g}!</p>
      <div class="menu-buttons">
        <button id="addFundsBtn" class="menu-button">Add Funds</button>
        <button id="sportsBetsBtn" class="menu-button">Take Sports Bets</button>
      </div>
      <button id="logoutBtn" class="logout-button">Logout</button>
    </div>
  `,document.getElementById("addFundsBtn").onclick=()=>{p="addFunds",w()},document.getElementById("sportsBetsBtn").onclick=()=>{p="sportsBets",T()},document.getElementById("logoutBtn").onclick=()=>{y=!1,g="",p="menu",B()}}function T(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{p="menu",b()},S(),document.getElementById("sportSelect").addEventListener("change",function(){const t=this.value;t?k(t):document.getElementById("oddsContainer").innerHTML="<p>Select a sport to view available odds</p>"})}function w(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("exampleBtn").onclick=()=>{document.getElementById("exampleModal").style.display="flex"},document.getElementById("closeExampleModal").onclick=()=>{document.getElementById("exampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{p="menu",b()};const t=document.getElementById("proofImage");document.getElementById("playerForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const r=o.clipboardData.files[0];if(r.type.startsWith("image/")){const d=new DataTransfer;d.items.add(r),t.files=d.files}}}),document.getElementById("playerForm").onsubmit=async o=>{o.preventDefault();const r=document.getElementById("playerUsername").value,d=document.getElementById("amountToAdd").value,e=document.getElementById("proofImage").files[0];if(!e){document.getElementById("formError").innerText="Image required.";return}const n="321fcbefd94f6d6936d225a7c1004060",i=await new Promise((l,u)=>{const f=new FileReader;f.onload=()=>l(f.result.split(",")[1]),f.onerror=u,f.readAsDataURL(e)});let c="";try{const u=await(await fetch(`https://api.imgbb.com/1/upload?key=${n}`,{method:"POST",body:new URLSearchParams({image:i})})).json();if(u.success)c=u.data.url;else{document.getElementById("formError").innerText="Image upload failed.";return}}catch{document.getElementById("formError").innerText="Image upload failed.";return}const a={playerUsername:r,amountToAdd:d,proofImageUrl:c,adminUsername:g},s=await fetch(`${h}/api/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(s.ok)document.getElementById("formSuccess").innerText="Submitted successfully!",document.getElementById("formError").innerText="",document.getElementById("playerForm").reset();else{const l=await s.json();document.getElementById("formError").innerText=l.message||"Submission failed.",document.getElementById("formSuccess").innerText=""}}}async function S(){try{const t=await fetch(`${x}/sports?apiKey=${E}`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const o=await t.json(),r=document.getElementById("sportSelect");r.innerHTML='<option value="">Select a sport...</option>',o.filter(e=>e.active).sort((e,n)=>e.group===n.group?e.title.localeCompare(n.title):e.group.localeCompare(n.group)).forEach(e=>{const n=document.createElement("option");n.value=e.key,n.textContent=`${e.group} - ${e.title}`,r.appendChild(n)})}catch(t){console.error("Error loading sports:",t),document.getElementById("sportSelect").innerHTML='<option value="">Error loading sports</option>'}}async function k(t){const o=document.getElementById("oddsContainer");o.innerHTML="<p>Loading odds...</p>";try{const r=await fetch(`${x}/sports/${t}/odds?regions=us&oddsFormat=decimal&markets=h2h,spreads,totals&apiKey=${E}`);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const d=await r.json(),e={title:L(t),events:d};M(e)}catch(r){console.error("Error loading odds:",r),o.innerHTML="<p>Error loading odds. Please try again.</p>"}}function L(t){return{americanfootball_nfl:"NFL",americanfootball_ncaaf:"NCAAF",basketball_nba:"NBA",basketball_wnba:"WNBA",baseball_mlb:"MLB",icehockey_nhl:"NHL",soccer_epl:"EPL",soccer_usa_mls:"MLS",mma_mixed_martial_arts:"MMA"}[t]||t}function M(t){const o=document.getElementById("oddsContainer");if(!t.events||t.events.length===0){o.innerHTML="<p>No events available for this sport at the moment.</p>";return}let r=`<h3>${t.title} - Upcoming Games</h3>`;t.events.forEach((e,n)=>{const i=new Date(e.commence_time).toLocaleString();r+=`
      <div class="event-card" id="event-card-${n}">
        <div class="event-header">
          <h4>${e.away_team} @ ${e.home_team}</h4>
          <p class="event-time">${i}</p>
        </div>
        <div class="event-content" id="event-content-${n}">
          <div class="odds-tables">
    `,e.bookmakers.forEach(c=>{r+=`
        <div class="bookmaker-section">
          <h5>${c.title}</h5>
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
      `,c.markets.forEach(a=>{a.outcomes.forEach(s=>{const l=s.price,u=C(l);r+=`
            <tr>
              <td>${v(a.key)}</td>
              <td class="betting-cell" data-event="${e.away_team} @ ${e.home_team}" data-event-time="${e.commence_time}" data-bet-type="${v(a.key)}" data-selection="${s.name}" data-odds="${u.toFixed(2)}" data-line="${s.point?s.point:"-"}">${s.name}</td>
              <td>${l.toFixed(2)}</td>
              <td class="adjusted-odds">${u.toFixed(2)}</td>
              <td>${s.point?s.point:"-"}</td>
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
  `,t.events.forEach((e,n)=>{const i=document.getElementById(`event-card-${n}`),c=document.getElementById(`event-content-${n}`);i&&c&&(c.style.display="none",i.classList.add("collapsed"),i.addEventListener("click",function(a){a.target.closest(".event-content")||(c.style.display==="none"?(c.style.display="block",i.classList.remove("collapsed")):(c.style.display="none",i.classList.add("collapsed")))}))}),document.querySelectorAll(".betting-cell").forEach(e=>{e.addEventListener("click",function(n){n.stopPropagation(),P(this)})}),document.getElementById("closeBettingModal").addEventListener("click",I),document.getElementById("closeBettingExampleModal").addEventListener("click",$),document.getElementById("bettingExampleBtn").addEventListener("click",()=>{document.getElementById("bettingExampleModal").style.display="flex"});const d=document.getElementById("bettingProofImage");document.getElementById("bettingForm").addEventListener("paste",e=>{if(e.clipboardData&&e.clipboardData.files&&e.clipboardData.files.length>0){const n=e.clipboardData.files[0];if(n.type.startsWith("image/")){const i=new DataTransfer;i.items.add(n),d.files=i.files}}}),document.getElementById("bettingForm").addEventListener("submit",F)}function C(t){const o=t*.8;return Math.max(o,1.01)}function v(t){return{h2h:"Moneyline",spreads:"Spread",totals:"Total"}[t]||t}let m=null;function P(t){const o=t.dataset.event,r=t.dataset.eventTime,d=t.dataset.betType,e=t.dataset.selection,n=t.dataset.odds,i=t.dataset.line;m={event:o,eventTime:r,betType:d,selection:e,odds:n,line:i},document.getElementById("modalEventTitle").textContent=`${o} - ${d}`;const c=document.getElementById("teamSelection");if(c.innerHTML="",d==="Moneyline")o.split(" @ ").forEach(s=>{const l=document.createElement("button");l.type="button",l.textContent=s,l.style.cssText="padding:0.5rem 1rem; background:#333; color:#fff; border:1px solid #444; border-radius:5px; cursor:pointer; flex:1;",l.addEventListener("click",function(){c.querySelectorAll("button").forEach(u=>{u.style.background="#333",u.style.borderColor="#444"}),this.style.background="#646cff",this.style.borderColor="#646cff",m.selectedTeam=this.textContent}),c.appendChild(l)});else{const a=document.createElement("button");a.type="button",a.textContent=e,a.style.cssText="padding:0.5rem 1rem; background:#646cff; color:#fff; border:1px solid #646cff; border-radius:5px; cursor:pointer; width:100%;",m.selectedTeam=e,c.appendChild(a)}document.getElementById("bettingForm").reset(),document.getElementById("bettingError").textContent="",document.getElementById("bettingSuccess").textContent="",document.getElementById("bettingModal").style.display="flex"}function I(){document.getElementById("bettingModal").style.display="none",m=null}function $(){document.getElementById("bettingExampleModal").style.display="none"}async function F(t){if(t.preventDefault(),!m||!m.selectedTeam){document.getElementById("bettingError").textContent="Please select a team.";return}const o=document.getElementById("bettingUsername").value,r=document.getElementById("bettingAmount").value,d=document.getElementById("bettingProofImage").files[0];if(!d){document.getElementById("bettingError").textContent="Image required.";return}document.getElementById("bettingSuccess").textContent="Processing... Please wait.",document.getElementById("bettingError").textContent="";const e="321fcbefd94f6d6936d225a7c1004060",n=await new Promise((a,s)=>{const l=new FileReader;l.onload=()=>a(l.result.split(",")[1]),l.onerror=s,l.readAsDataURL(d)});let i="";try{const s=await(await fetch(`https://api.imgbb.com/1/upload?key=${e}`,{method:"POST",body:new URLSearchParams({image:n})})).json();if(s.success)i=s.data.url;else{document.getElementById("bettingError").textContent="Image upload failed.",document.getElementById("bettingSuccess").textContent="";return}}catch{document.getElementById("bettingError").textContent="Image upload failed.",document.getElementById("bettingSuccess").textContent="";return}const c={username:o,amountBet:r,eventName:m.event,eventTime:m.eventTime,betType:m.betType,selectedTeam:m.selectedTeam,odds:m.odds,line:m.line,proofImageUrl:i,adminUsername:g};try{const a=await fetch(`${h}/api/submit-sports-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});if(a.ok)document.getElementById("bettingSuccess").textContent="✅ Bet submitted successfully! Data saved to Google Sheets.",document.getElementById("bettingError").textContent="",document.getElementById("bettingForm").reset(),setTimeout(()=>{I()},3e3);else{const s=await a.json();document.getElementById("bettingError").textContent=s.message||"Failed to place bet.",document.getElementById("bettingSuccess").textContent=""}}catch{document.getElementById("bettingError").textContent="Connection failed. Please try again.",document.getElementById("bettingSuccess").textContent=""}}window.toggleEventCard=function(t){console.log("Toggle called for index:",t);const o=document.getElementById(`event-content-${t}`),r=o.closest(".event-card");console.log("Content element:",o),console.log("Current display style:",o.style.display),o.style.display==="none"?(o.style.display="block",r.classList.remove("collapsed"),console.log("Expanding card")):(o.style.display="none",r.classList.add("collapsed"),console.log("Collapsing card"))};y?b():B();
