(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();let B=!1,g="",f="menu";const p="https://admin-site-ze7d.onrender.com",S="df860f2526805007d06289b53d901e26",P="https://api.the-odds-api.com/v4";function k(e){let t=e.value.replace(/[^\d]/g,"");if(!t){e.value="";return}t=parseInt(t,10).toString(),e.value=t.replace(/\B(?=(\d{3})+(?!\d))/g,","),e.value!==""&&(e.value="$"+e.value)}function x(e){return e?e.replace(/[^\d.\-]/g,""):""}function N(e){let t=e.value.replace(/[^\d]/g,"");t.length>10&&(t=t.slice(0,10));let o=t;t.length>6?o=t.slice(0,3)+"-"+t.slice(3,6)+"-"+t.slice(6):t.length>3&&(o=t.slice(0,3)+"-"+t.slice(3)),e.value=o}function M(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("loginForm").onsubmit=async e=>{e.preventDefault();const t=document.getElementById("loginUsername").value,o=document.getElementById("loginPassword").value;document.getElementById("loginLoading").style.display="block",document.getElementById("loginError").innerText="";try{const n=await fetch(`${p}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:o})});if(n.ok)B=!0,g=t,f="menu",b();else{const r=await n.json();document.getElementById("loginError").innerText=r.message||"Login failed"}}catch{document.getElementById("loginError").innerText="Connection failed. Please try again."}finally{document.getElementById("loginLoading").style.display="none"}}}function I(e=8){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let o="";for(let n=0;n<e;n++)o+=t.charAt(Math.floor(Math.random()*t.length));return o}function L(e){return e.split(".").pop()}function j(){return"PB-"+I(10)}function U(e){const t=L(e.name);return`GeneralsGamblingAdmin_${I(12)}.${t}`}async function h(e){const t="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7",o=U(e),n=new FormData;n.append("file",e,o),n.append("metadata",JSON.stringify({name:o}));const r=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:t},body:n}),a=await r.json();if(r.ok&&a.data&&a.data.url)return{url:a.data.url,filename:o};throw new Error(a?.message||"Image upload failed.")}async function J(e){const t="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7",o=new FormData,n=L(e.name),r=`GeneralsGamblingAdmin_${I(12)}.${n}`;o.append("file",e,r),o.append("metadata",JSON.stringify({name:r}));const a=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:t},body:o}),l=await a.json();if(a.ok&&l.data&&l.data.url)return l.data.url;throw new Error(l?.message||"Image upload failed.")}function b(){let e=[];document.querySelector("#app").innerHTML=`
    <div class="menu-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, ${g}!</p>
      
      <!-- Sheet Swapping Section -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px;">
        <label for="sheetSelect" style="display: block; margin-bottom: 0.5rem; color: #fff; font-weight: bold;">Swap Whiteboard to:</label>
        <select id="sheetSelect" style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border-radius: 5px; border: 1px solid #444; background: #333; color: #fff;">
          <option value="Landing">Landing/Main Page</option>
          <option value="Trivia">Triva</option>
          <option value="ScratchCard">Scratch Cards</option>
          <option value="Plinko">Plinko</option>
          <option value="Money Ladder">Money Ladder</option>
          <option value="Blackjack">Blackjack</option>
          <option value="High/Low">High / Low</option>
          <option value="Mines">Mines</option>
          <option value="Keno">Keno</option>
          <option value="Connect 4">Connect 4</option>
          <option value="Prize Wheel">Prize Wheel</option>
          <option value="Snails">Snail Racing</option>                           
        </select>
        <button id="swapSheetBtn" class="menu-button" style="width: 100%;">Swap</button>
        <div id="swapStatus" style="margin-top: 0.5rem; font-size: 0.9em;"></div>
      </div>

      <!-- Player Selection Section -->
      <div style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(255,255,255,0.07); border-radius: 8px;">
        <label for="playerSelect" style="display: block; margin-bottom: 0.5rem; color: #fff; font-weight: bold;">Set Active Player:</label>
        <select id="playerSelect" style="width:100%; padding:0.5rem; border-radius:5px; border:1px solid #444; background:#333; color:#fff;">
          <option value="">Loading players...</option>
        </select>
        <button id="setActivePlayerBtn" class="menu-button" style="width:100%; margin-top:0.5rem;">Set Active Player</button>
        <div id="activePlayerStatus" style="margin-top:0.5rem; font-size:0.9em;"></div>
      </div>

      <div class="menu-buttons">
        <button id="addFundsBtn" class="menu-button">Add Funds</button>
        <button id="sportsBetsBtn" class="menu-button">Take Sports Bets</button>
        <button id="raffleTicketsBtn" class="menu-button">Raffle Tickets</button>
        <button id="propBetsBtn" class="menu-button">Prop Bets</button>
      </div>
      <button id="logoutBtn" class="logout-button">Logout</button>
    </div>
  `,document.getElementById("addFundsBtn").onclick=()=>{f="addFunds",_()},document.getElementById("sportsBetsBtn").onclick=()=>{f="sportsBets",q()},document.getElementById("raffleTicketsBtn").onclick=()=>{f="raffleTickets",z()},document.getElementById("propBetsBtn").onclick=()=>{f="propBets",W()},document.getElementById("logoutBtn").onclick=()=>{B=!1,g="",f="menu",M()},document.getElementById("swapSheetBtn").onclick=O,fetch(`${p}/api/players`).then(t=>t.json()).then(t=>{e=t.map(n=>n.username);const o=document.getElementById("playerSelect");o.innerHTML='<option value="">Select player...</option>'+e.map(n=>`<option value="${n}">${n}</option>`).join("")}),document.getElementById("setActivePlayerBtn").onclick=async()=>{const o=document.getElementById("playerSelect").value,n=document.getElementById("activePlayerStatus");if(!o){n.innerHTML='<span style="color: orange;">Please select a player first.</span>';return}n.innerHTML='<span style="color: blue;">Setting active player...</span>';try{const r=await fetch(`${p}/api/set-active-player`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerName:o,adminUsername:g})}),a=await r.json();r.ok&&a.success?n.innerHTML=`<span style="color: green;">✓ Active player set to ${o}!</span>`:n.innerHTML='<span style="color: red;">✗ Failed to set active player.</span>'}catch{n.innerHTML='<span style="color: red;">✗ Error setting active player.</span>'}setTimeout(()=>{n.innerHTML=""},3e3)}}async function O(){const e=document.getElementById("sheetSelect").value,t=document.getElementById("swapStatus");if(!e){t.innerHTML='<span style="color: orange;">Please select a sheet first.</span>';return}t.innerHTML='<span style="color: blue;">Swapping sheets...</span>';try{const o=await fetch(`${p}/api/swap-sheet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetSheet:e,adminUsername:g})}),n=await o.json();o.ok?n.success?t.innerHTML=`<span style="color: green;">✓ Successfully swapped to ${e} sheet!</span>`:(await E(e),t.innerHTML=`<span style="color: green;">✓ Successfully swapped to ${e} sheet (fallback method)!</span>`):(await E(e),t.innerHTML=`<span style="color: green;">✓ Successfully swapped to ${e} sheet (fallback method)!</span>`)}catch(o){console.error("Sheet swap error:",o);try{await E(e),t.innerHTML=`<span style="color: green;">✓ Successfully swapped to ${e} sheet (fallback method)!</span>`}catch{t.innerHTML='<span style="color: red;">✗ Failed to swap sheets. Please try again.</span>'}}setTimeout(()=>{t.innerHTML=""},3e3)}async function E(e){const t=await fetch(`${p}/api/swap-sheet-fallback`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetSheet:e,adminUsername:g})});if(!t.ok)throw new Error("Fallback sheet swap failed");return await t.json()}function q(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{f="menu",b()},X(),document.getElementById("sportSelect").addEventListener("change",function(){const e=this.value;e?ee(e):document.getElementById("oddsContainer").innerHTML="<p>Select a sport to view available odds</p>"})}function _(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("exampleBtn").onclick=()=>{document.getElementById("exampleModal").style.display="flex"},document.getElementById("closeExampleModal").onclick=()=>{document.getElementById("exampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{f="menu",b()};const e=document.getElementById("proofImage");document.getElementById("playerForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const n=o.clipboardData.files[0];if(n.type.startsWith("image/")){const r=new DataTransfer;r.items.add(n),e.files=r.files}}}),document.getElementById("amountToAdd").addEventListener("input",function(){k(this)}),document.getElementById("playerForm").onsubmit=async o=>{o.preventDefault();const n=document.getElementById("playerUsername").value,r=x(document.getElementById("amountToAdd").value),a=document.getElementById("proofImage").files[0];if(!a){document.getElementById("formError").innerText="Image required.";return}let l="",d="";try{const{url:m,filename:v}=await h(a);l=m,d=v}catch(m){document.getElementById("formError").innerText=m.message;return}const i={playerUsername:n,amountToAdd:r,proofImageUrl:l,proofImageFilename:d,adminUsername:g},c=await fetch(`${p}/api/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),s=await c.json();c.ok?(s.newAccount?(document.getElementById("formError").innerHTML=`Error, account name, (<b>${n}</b>) not found. <br /> Please contact the general to fix the error. <br /> Their money is still tracked to (<b>${n}</b>) for now.`,document.getElementById("formError").style.color="red",document.getElementById("formSuccess").innerText=""):(document.getElementById("formSuccess").innerHTML=`Submitted successfully to <b>${n}</b>!`,document.getElementById("formError").innerText=""),document.getElementById("playerForm").reset()):(document.getElementById("formError").innerText=s.message||"Submission failed.",document.getElementById("formSuccess").innerText="")}}function z(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("raffleExampleBtn").onclick=()=>{document.getElementById("raffleExampleModal").style.display="flex"},document.getElementById("closeRaffleExampleModal").onclick=()=>{document.getElementById("raffleExampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{f="menu",b()};const e=document.getElementById("raffleProofImage");document.getElementById("raffleForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const n=o.clipboardData.files[0];if(n.type.startsWith("image/")){const r=new DataTransfer;r.items.add(n),e.files=r.files}}}),document.getElementById("phoneNumber").addEventListener("input",function(){N(this)}),document.getElementById("raffleForm").onsubmit=async o=>{o.preventDefault();const n=document.getElementById("phoneNumber").value,r=document.getElementById("stateId").value,a=document.getElementById("amountPurchased").value,l=document.getElementById("raffleProofImage").files[0];if(!l){document.getElementById("raffleFormError").innerText="Image required.";return}let d="",i="";try{const{url:s,filename:m}=await h(l);d=s,i=m}catch(s){document.getElementById("raffleFormError").innerText=s.message;return}const c={phoneNumber:n,stateId:r,amountPurchased:a,proofImageUrl:d,proofImageFilename:i,adminUsername:g};try{const s=await fetch(`${p}/api/submit-raffle-ticket`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});if(s.ok)document.getElementById("raffleFormSuccess").innerText="Raffle ticket submitted successfully!",document.getElementById("raffleFormError").innerText="",document.getElementById("raffleForm").reset();else{const m=await s.json();document.getElementById("raffleFormError").innerText=m.message||"Submission failed.",document.getElementById("raffleFormSuccess").innerText=""}}catch{document.getElementById("raffleFormError").innerText="Connection failed. Please try again.",document.getElementById("raffleFormSuccess").innerText=""}}}function W(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{f="menu",b()},document.getElementById("propExampleBtn").onclick=()=>{document.getElementById("propExampleModal").style.display="flex"},document.getElementById("closePropExampleModal").onclick=()=>{document.getElementById("propExampleModal").style.display="none"},document.getElementById("propBetForm").onsubmit=Y,T()}async function G(){const e=await fetch(`${p}/api/players`);return e.ok?await e.json():[]}async function R(e,t){await fetch(`${p}/api/deduct-balance`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,amount:t})})}async function Y(e){e.preventDefault();const t=document.getElementById("propPlayers").value.trim(),o=document.getElementById("propBetName").value.trim(),n=document.getElementById("propHowToWin").value.trim(),r=parseFloat(x(document.getElementById("propAmount").value)),a=document.getElementById("propPasscode").value.trim(),l=Array.from(document.getElementById("propProofImages").files),d=t.split(",").map(y=>y.trim()).filter(Boolean);if(!d.length||!o||!n||!r||!a||!l.length){document.getElementById("propFormError").innerText="All fields are required.";return}document.getElementById("propFormError").innerText="",document.getElementById("propFormSuccess").innerText="Uploading images...";let i=[];try{for(const y of l){const{url:D,filename:H}=await h(y);i.push({url:D,filename:H})}}catch(y){document.getElementById("propFormError").innerText=y.message,document.getElementById("propFormSuccess").innerText="";return}const c=j(),s=Math.round(r*.1*100)/100,m=Math.round((r*d.length+s)*100)/100,v=new Date().toLocaleString(),A=i.map(y=>y.url),$=i.map(y=>y.filename),C=[c,o,n,r,s,a,d.join(","),v,m,"active",...A,...$];await fetch(`${p}/api/submit-prop-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row:C,adminUsername:g})}),document.getElementById("propFormSuccess").innerText="Prop bet submitted!",document.getElementById("propFormError").innerText="",document.getElementById("propBetForm").reset(),T()}async function T(){const e=await fetch(`${p}/api/active-prop-bets`),t=e.ok?await e.json():[],o=document.getElementById("propActiveDropdownContainer");o.innerHTML=`
    <label for="propActiveDropdown">Join an Active Prop Bet:</label>
    <input id="propActiveDropdown" list="propActiveList" placeholder="Search by bet name..." style="width:100%; padding:0.5rem;" />
    <datalist id="propActiveList">
      ${t.map(n=>`<option value="${n.betName}">${n.betName} - ${n.howToWin}</option>`).join("")}
    </datalist>
    <button id="propJoinBtn" style="margin-top:10px;">Join</button>
    <div id="propJoinError" style="color:red;"></div>
  `,document.getElementById("propJoinBtn").onclick=()=>K(t)}async function K(e){const t=document.getElementById("propActiveDropdown").value.trim(),o=e.find(n=>n.betName===t);if(!o){document.getElementById("propJoinError").innerText="Bet not found.";return}Z(o)}function Z(e){let t=document.getElementById("propJoinModal");t&&t.remove(),t=document.createElement("div"),t.id="propJoinModal",t.style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:2000;",t.innerHTML=`
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
  `,document.body.appendChild(t),document.getElementById("closePropJoinModal").onclick=()=>t.remove(),document.getElementById("propJoinPassForm").onsubmit=o=>{if(o.preventDefault(),document.getElementById("propJoinPasscode").value!==e.passcode){document.getElementById("propJoinPassError").innerText="Incorrect passcode.";return}document.getElementById("propJoinPassError").innerText="",Q(e,t)}}function Q(e,t){const o=document.getElementById("propJoinDetails");o.style.display="block",o.innerHTML=`
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
  `,document.getElementById("propAddToBetForm").onsubmit=n=>V(n,e,t)}async function V(e,t,o){e.preventDefault();const n=document.getElementById("propAddPlayers").value.trim(),r=Array.from(document.getElementById("propAddProofImages").files),a=n.split(",").map(i=>i.trim()).filter(Boolean);if(!a.length||!r.length){document.getElementById("propAddToBetError").innerText="All fields required.";return}document.getElementById("propAddToBetError").innerText="",document.getElementById("propAddToBetSuccess").innerText="Uploading images...";let l=[];try{for(const i of r){const c=await J(i);l.push(c)}}catch(i){document.getElementById("propAddToBetError").innerText=i.message,document.getElementById("propAddToBetSuccess").innerText="";return}const d=await G();for(const i of a)d.some(s=>s.username===i)&&await R(i,t.amount);await fetch(`${p}/api/join-prop-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({betID:t.betID,addPlayers:a.join(","),addProofUrls:l})}),document.getElementById("propAddToBetSuccess").innerText="Added to bet!",document.getElementById("propAddToBetError").innerText="",document.getElementById("propAddToBetForm").reset(),setTimeout(()=>o.remove(),2e3),T()}async function X(){try{const e=await fetch(`${P}/sports?apiKey=${S}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json(),o=document.getElementById("sportSelect");o.innerHTML='<option value="">Select a sport...</option>',t.filter(r=>r.active).sort((r,a)=>r.group===a.group?r.title.localeCompare(a.title):r.group.localeCompare(a.group)).forEach(r=>{const a=document.createElement("option");a.value=r.key,a.textContent=`${r.group} - ${r.title}`,o.appendChild(a)})}catch(e){console.error("Error loading sports:",e),document.getElementById("sportSelect").innerHTML='<option value="">Error loading sports</option>'}}async function ee(e){const t=document.getElementById("oddsContainer");t.innerHTML="<p>Loading odds...</p>";try{const o=await fetch(`${P}/sports/${e}/odds?regions=us&oddsFormat=decimal&markets=h2h,spreads,totals&apiKey=${S}`);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const n=await o.json(),r={title:te(e),events:n};oe(r)}catch(o){console.error("Error loading odds:",o),t.innerHTML="<p>Error loading odds. Please try again.</p>"}}function te(e){return{americanfootball_nfl:"NFL",americanfootball_ncaaf:"NCAAF",basketball_nba:"NBA",basketball_wnba:"WNBA",baseball_mlb:"MLB",icehockey_nhl:"NHL",soccer_epl:"EPL",soccer_usa_mls:"MLS",mma_mixed_martial_arts:"MMA"}[e]||e}function oe(e){const t=document.getElementById("oddsContainer");if(!e.events||e.events.length===0){t.innerHTML="<p>No events available for this sport at the moment.</p>";return}let o=`<h3>${e.title} - Upcoming Games</h3>`;e.events.forEach((a,l)=>{const d=new Date(a.commence_time).toLocaleString();o+=`
      <div class="event-card" id="event-card-${l}">
        <div class="event-header">
          <h4>${a.away_team} @ ${a.home_team}</h4>
          <p class="event-time">${d}</p>
        </div>
        <div class="event-content" id="event-content-${l}">
          <div class="odds-tables">
    `,a.bookmakers.forEach(i=>{o+=`
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
              <td>${w(c.key)}</td>
              <td class="betting-cell" data-event="${a.away_team} @ ${a.home_team}" data-event-time="${a.commence_time}" data-bet-type="${w(c.key)}" data-selection="${s.name}" data-odds="${m.toFixed(2)}" data-line="${s.point?s.point:"-"}">${s.name}</td>
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
  `,e.events.forEach((a,l)=>{const d=document.getElementById(`event-card-${l}`),i=document.getElementById(`event-content-${l}`);d&&i&&(i.style.display="none",d.classList.add("collapsed"),d.addEventListener("click",function(c){c.target.closest(".event-content")||(i.style.display==="none"?(i.style.display="block",d.classList.remove("collapsed")):(i.style.display="none",d.classList.add("collapsed")))}))}),document.querySelectorAll(".betting-cell").forEach(a=>{a.addEventListener("click",function(l){l.stopPropagation(),ne(this)})}),document.getElementById("closeBettingModal").addEventListener("click",F),document.getElementById("closeBettingExampleModal").addEventListener("click",re),document.getElementById("bettingExampleBtn").addEventListener("click",()=>{document.getElementById("bettingExampleModal").style.display="flex"}),document.getElementById("bettingAmount").addEventListener("input",function(){k(this)});const r=document.getElementById("bettingProofImage");document.getElementById("bettingForm").addEventListener("paste",a=>{if(a.clipboardData&&a.clipboardData.files&&a.clipboardData.files.length>0){const l=a.clipboardData.files[0];if(l.type.startsWith("image/")){const d=new DataTransfer;d.items.add(l),r.files=d.files}}}),document.getElementById("bettingForm").addEventListener("submit",ae)}function w(e){return{h2h:"Moneyline",spreads:"Spread",totals:"Total"}[e]||e}let u=null;function ne(e){const t=e.dataset.event,o=e.dataset.eventTime,n=e.dataset.betType,r=e.dataset.selection,a=e.dataset.odds,l=e.dataset.line;u={event:t,eventTime:o,betType:n,selection:r,odds:a,line:l},document.getElementById("modalEventTitle").textContent=`${t} - ${n}`;const d=document.getElementById("teamSelection");if(d.innerHTML="",n==="Moneyline")t.split(" @ ").forEach(c=>{const s=document.createElement("button");s.type="button",s.textContent=c,s.style.cssText="padding:0.5rem 1rem; background:#333; color:#fff; border:1px solid #444; border-radius:5px; cursor:pointer; flex:1;",s.addEventListener("click",function(){d.querySelectorAll("button").forEach(m=>{m.style.background="#333",m.style.borderColor="#444"}),this.style.background="#646cff",this.style.borderColor="#646cff",u.selectedTeam=this.textContent}),d.appendChild(s)});else{const i=document.createElement("button");i.type="button",i.textContent=r,i.style.cssText="padding:0.5rem 1rem; background:#646cff; color:#fff; border:1px solid #646cff; border-radius:5px; cursor:pointer; width:100%;",u.selectedTeam=r,d.appendChild(i)}document.getElementById("bettingForm").reset(),document.getElementById("bettingError").textContent="",document.getElementById("bettingSuccess").textContent="",document.getElementById("bettingModal").style.display="flex"}function F(){document.getElementById("bettingModal").style.display="none",u=null}function re(){document.getElementById("bettingExampleModal").style.display="none"}async function ae(e){if(e.preventDefault(),!u||!u.selectedTeam){document.getElementById("bettingError").textContent="Please select a team.";return}const t=document.getElementById("bettingUsername").value,o=x(document.getElementById("bettingAmount").value),n=document.getElementById("bettingProofImage").files[0];if(!n){document.getElementById("bettingError").textContent="Image required.";return}document.getElementById("bettingSuccess").textContent="Processing... Please wait.",document.getElementById("bettingError").textContent="";let r="",a="";try{const{url:d,filename:i}=await h(n);r=d,a=i}catch(d){document.getElementById("bettingError").textContent=d.message,document.getElementById("bettingSuccess").textContent="";return}const l={username:t,amountBet:o,eventName:u.event,eventTime:u.eventTime,betType:u.betType,selectedTeam:u.selectedTeam,odds:u.odds,line:u.line,proofImageUrl:r,proofImageFilename:a,adminUsername:g};try{const d=await fetch(`${p}/api/submit-sports-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(d.ok)document.getElementById("bettingSuccess").textContent="✅ Bet submitted successfully! Data saved to database.",document.getElementById("bettingError").textContent="",document.getElementById("bettingForm").reset(),setTimeout(()=>{F()},3e3);else{const i=await d.json();document.getElementById("bettingError").textContent=i.message||"Failed to place bet.",document.getElementById("bettingSuccess").textContent=""}}catch{document.getElementById("bettingError").textContent="Connection failed. Please try again.",document.getElementById("bettingSuccess").textContent=""}}window.toggleEventCard=function(e){console.log("Toggle called for index:",e);const t=document.getElementById(`event-content-${e}`),o=t.closest(".event-card");console.log("Content element:",t),console.log("Current display style:",t.style.display),t.style.display==="none"?(t.style.display="block",o.classList.remove("collapsed"),console.log("Expanding card")):(t.style.display="none",o.classList.add("collapsed"),console.log("Collapsing card"))};B?b():M();
