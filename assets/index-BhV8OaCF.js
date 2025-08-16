(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();let B=!1,g="",f="menu";const p="https://admin-site-ze7d.onrender.com",S="df860f2526805007d06289b53d901e26",P="https://api.the-odds-api.com/v4";function k(e){let t=e.value.replace(/[^\d]/g,"");if(!t){e.value="";return}t=parseInt(t,10).toString(),e.value=t.replace(/\B(?=(\d{3})+(?!\d))/g,","),e.value!==""&&(e.value="$"+e.value)}function x(e){return e?e.replace(/[^\d.\-]/g,""):""}function N(e){let t=e.value.replace(/[^\d]/g,"");t.length>10&&(t=t.slice(0,10));let o=t;t.length>6?o=t.slice(0,3)+"-"+t.slice(3,6)+"-"+t.slice(6):t.length>3&&(o=t.slice(0,3)+"-"+t.slice(3)),e.value=o}function M(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("loginForm").onsubmit=async e=>{e.preventDefault();const t=document.getElementById("loginUsername").value,o=document.getElementById("loginPassword").value;document.getElementById("loginLoading").style.display="block",document.getElementById("loginError").innerText="";try{const r=await fetch(`${p}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:o})});if(r.ok)B=!0,g=t,f="menu",b();else{const n=await r.json();document.getElementById("loginError").innerText=n.message||"Login failed"}}catch{document.getElementById("loginError").innerText="Connection failed. Please try again."}finally{document.getElementById("loginLoading").style.display="none"}}}function I(e=8){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let o="";for(let r=0;r<e;r++)o+=t.charAt(Math.floor(Math.random()*t.length));return o}function L(e){return e.split(".").pop()}function j(){return"PB-"+I(10)}function U(e){const t=L(e.name);return`GeneralsGamblingAdmin_${I(12)}.${t}`}async function h(e){const t="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7",o=U(e),r=new FormData;r.append("file",e,o),r.append("metadata",JSON.stringify({name:o}));const n=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:t},body:r}),a=await n.json();if(n.ok&&a.data&&a.data.url)return{url:a.data.url,filename:o};throw new Error(a?.message||"Image upload failed.")}async function J(e){const t="tAhG8ZNH6lBSEf0xnJT2aOuDP7Jiu9u7",o=new FormData,r=L(e.name),n=`GeneralsGamblingAdmin_${I(12)}.${r}`;o.append("file",e,n),o.append("metadata",JSON.stringify({name:n}));const a=await fetch("https://fmapi.net/api/v2/image",{method:"POST",headers:{Authorization:t},body:o}),i=await a.json();if(a.ok&&i.data&&i.data.url)return i.data.url;throw new Error(i?.message||"Image upload failed.")}function b(){let e=[];document.querySelector("#app").innerHTML=`
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
        <label for="playerSelectInput" style="display: block; margin-bottom: 0.5rem; color: #fff; font-weight: bold;">Set Active Player:</label>
        <div style="position:relative;">
          <input id="playerSelectInput" type="text" autocomplete="off" placeholder="Type player name..." style="width:100%; padding:0.5rem; border-radius:5px; border:1px solid #444; background:#333; color:#fff;" />
          <ul id="playerSuggestions" style="position:absolute; left:0; right:0; top:100%; background:#222; color:#fff; border:1px solid #444; border-radius:5px; margin:0; padding:0; list-style:none; z-index:10; max-height:150px; overflow-y:auto; display:none;"></ul>
        </div>
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
  `,document.getElementById("addFundsBtn").onclick=()=>{f="addFunds",_()},document.getElementById("sportsBetsBtn").onclick=()=>{f="sportsBets",q()},document.getElementById("raffleTicketsBtn").onclick=()=>{f="raffleTickets",z()},document.getElementById("propBetsBtn").onclick=()=>{f="propBets",W()},document.getElementById("logoutBtn").onclick=()=>{B=!1,g="",f="menu",M()},document.getElementById("swapSheetBtn").onclick=O,fetch(`${p}/api/players`).then(r=>r.json()).then(r=>{e=r.map(n=>n.username)});const t=document.getElementById("playerSelectInput"),o=document.getElementById("playerSuggestions");t.addEventListener("input",function(){const r=t.value.trim().toLowerCase();if(!r){o.style.display="none",o.innerHTML="";return}const n=e.filter(a=>a.toLowerCase().includes(r));if(n.length===0){o.style.display="none",o.innerHTML="";return}o.innerHTML=n.map(a=>`<li style="padding:8px; cursor:pointer;">${a}</li>`).join(""),o.style.display="block"}),o.addEventListener("mousedown",function(r){r.target.tagName==="LI"&&(t.value=r.target.textContent,o.style.display="none",o.innerHTML="")}),t.addEventListener("blur",()=>setTimeout(()=>{o.style.display="none"},100)),document.getElementById("setActivePlayerBtn").onclick=async()=>{const r=t.value.trim(),n=document.getElementById("activePlayerStatus");if(!r){n.innerHTML='<span style="color: orange;">Please select a player first.</span>';return}if(!e.includes(r)){n.innerHTML='<span style="color: orange;">Player not found. Please select from the list.</span>',setTimeout(()=>{n.innerHTML=""},3e3);return}n.innerHTML='<span style="color: blue;">Setting active player...</span>';try{const a=await fetch(`${p}/api/set-active-player`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerName:r,adminUsername:g})}),i=await a.json();a.ok&&i.success?n.innerHTML=`<span style="color: green;">✓ Active player set to ${r}!</span>`:n.innerHTML='<span style="color: red;">✗ Failed to set active player.</span>'}catch{n.innerHTML='<span style="color: red;">✗ Error setting active player.</span>'}setTimeout(()=>{n.innerHTML=""},3e3)}}async function O(){const e=document.getElementById("sheetSelect").value,t=document.getElementById("swapStatus");if(!e){t.innerHTML='<span style="color: orange;">Please select a sheet first.</span>';return}t.innerHTML='<span style="color: blue;">Swapping sheets...</span>';try{const o=await fetch(`${p}/api/swap-sheet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetSheet:e,adminUsername:g})}),r=await o.json();o.ok?r.success?t.innerHTML=`<span style="color: green;">✓ Successfully swapped to ${e} sheet!</span>`:(await E(e),t.innerHTML=`<span style="color: green;">✓ Successfully swapped to ${e} sheet (fallback method)!</span>`):(await E(e),t.innerHTML=`<span style="color: green;">✓ Successfully swapped to ${e} sheet (fallback method)!</span>`)}catch(o){console.error("Sheet swap error:",o);try{await E(e),t.innerHTML=`<span style="color: green;">✓ Successfully swapped to ${e} sheet (fallback method)!</span>`}catch{t.innerHTML='<span style="color: red;">✗ Failed to swap sheets. Please try again.</span>'}}setTimeout(()=>{t.innerHTML=""},3e3)}async function E(e){const t=await fetch(`${p}/api/swap-sheet-fallback`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetSheet:e,adminUsername:g})});if(!t.ok)throw new Error("Fallback sheet swap failed");return await t.json()}function q(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("exampleBtn").onclick=()=>{document.getElementById("exampleModal").style.display="flex"},document.getElementById("closeExampleModal").onclick=()=>{document.getElementById("exampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{f="menu",b()};const e=document.getElementById("proofImage");document.getElementById("playerForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const r=o.clipboardData.files[0];if(r.type.startsWith("image/")){const n=new DataTransfer;n.items.add(r),e.files=n.files}}}),document.getElementById("amountToAdd").addEventListener("input",function(){k(this)}),document.getElementById("playerForm").onsubmit=async o=>{o.preventDefault();const r=document.getElementById("playerUsername").value,n=x(document.getElementById("amountToAdd").value),a=document.getElementById("proofImage").files[0];if(!a){document.getElementById("formError").innerText="Image required.";return}let i="",d="";try{const{url:m,filename:v}=await h(a);i=m,d=v}catch(m){document.getElementById("formError").innerText=m.message;return}const l={playerUsername:r,amountToAdd:n,proofImageUrl:i,proofImageFilename:d,adminUsername:g},c=await fetch(`${p}/api/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)}),s=await c.json();c.ok?(s.newAccount?(document.getElementById("formError").innerHTML=`Error, account name, (<b>${r}</b>) not found. <br /> Please contact the general to fix the error. <br /> Their money is still tracked to (<b>${r}</b>) for now.`,document.getElementById("formError").style.color="red",document.getElementById("formSuccess").innerText=""):(document.getElementById("formSuccess").innerHTML=`Submitted successfully to <b>${r}</b>!`,document.getElementById("formError").innerText=""),document.getElementById("playerForm").reset()):(document.getElementById("formError").innerText=s.message||"Submission failed.",document.getElementById("formSuccess").innerText="")}}function z(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("raffleExampleBtn").onclick=()=>{document.getElementById("raffleExampleModal").style.display="flex"},document.getElementById("closeRaffleExampleModal").onclick=()=>{document.getElementById("raffleExampleModal").style.display="none"},document.getElementById("backToMenuBtn").onclick=()=>{f="menu",b()};const e=document.getElementById("raffleProofImage");document.getElementById("raffleForm").addEventListener("paste",o=>{if(o.clipboardData&&o.clipboardData.files&&o.clipboardData.files.length>0){const r=o.clipboardData.files[0];if(r.type.startsWith("image/")){const n=new DataTransfer;n.items.add(r),e.files=n.files}}}),document.getElementById("phoneNumber").addEventListener("input",function(){N(this)}),document.getElementById("raffleForm").onsubmit=async o=>{o.preventDefault();const r=document.getElementById("phoneNumber").value,n=document.getElementById("stateId").value,a=document.getElementById("amountPurchased").value,i=document.getElementById("raffleProofImage").files[0];if(!i){document.getElementById("raffleFormError").innerText="Image required.";return}let d="",l="";try{const{url:s,filename:m}=await h(i);d=s,l=m}catch(s){document.getElementById("raffleFormError").innerText=s.message;return}const c={phoneNumber:r,stateId:n,amountPurchased:a,proofImageUrl:d,proofImageFilename:l,adminUsername:g};try{const s=await fetch(`${p}/api/submit-raffle-ticket`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});if(s.ok)document.getElementById("raffleFormSuccess").innerText="Raffle ticket submitted successfully!",document.getElementById("raffleFormError").innerText="",document.getElementById("raffleForm").reset();else{const m=await s.json();document.getElementById("raffleFormError").innerText=m.message||"Submission failed.",document.getElementById("raffleFormSuccess").innerText=""}}catch{document.getElementById("raffleFormError").innerText="Connection failed. Please try again.",document.getElementById("raffleFormSuccess").innerText=""}}}function W(){document.querySelector("#app").innerHTML=`
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
  `,document.getElementById("backToMenuBtn").onclick=()=>{f="menu",b()},document.getElementById("propExampleBtn").onclick=()=>{document.getElementById("propExampleModal").style.display="flex"},document.getElementById("closePropExampleModal").onclick=()=>{document.getElementById("propExampleModal").style.display="none"},document.getElementById("propBetForm").onsubmit=Y,T()}async function G(){const e=await fetch(`${p}/api/players`);return e.ok?await e.json():[]}async function R(e,t){await fetch(`${p}/api/deduct-balance`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,amount:t})})}async function Y(e){e.preventDefault();const t=document.getElementById("propPlayers").value.trim(),o=document.getElementById("propBetName").value.trim(),r=document.getElementById("propHowToWin").value.trim(),n=parseFloat(x(document.getElementById("propAmount").value)),a=document.getElementById("propPasscode").value.trim(),i=Array.from(document.getElementById("propProofImages").files),d=t.split(",").map(y=>y.trim()).filter(Boolean);if(!d.length||!o||!r||!n||!a||!i.length){document.getElementById("propFormError").innerText="All fields are required.";return}document.getElementById("propFormError").innerText="",document.getElementById("propFormSuccess").innerText="Uploading images...";let l=[];try{for(const y of i){const{url:D,filename:H}=await h(y);l.push({url:D,filename:H})}}catch(y){document.getElementById("propFormError").innerText=y.message,document.getElementById("propFormSuccess").innerText="";return}const c=j(),s=Math.round(n*.1*100)/100,m=Math.round((n*d.length+s)*100)/100,v=new Date().toLocaleString(),A=l.map(y=>y.url),C=l.map(y=>y.filename),$=[c,o,r,n,s,a,d.join(","),v,m,"active",...A,...C];await fetch(`${p}/api/submit-prop-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row:$,adminUsername:g})}),document.getElementById("propFormSuccess").innerText="Prop bet submitted!",document.getElementById("propFormError").innerText="",document.getElementById("propBetForm").reset(),T()}async function T(){const e=await fetch(`${p}/api/active-prop-bets`),t=e.ok?await e.json():[],o=document.getElementById("propActiveDropdownContainer");o.innerHTML=`
    <label for="propActiveDropdown">Join an Active Prop Bet:</label>
    <input id="propActiveDropdown" list="propActiveList" placeholder="Search by bet name..." style="width:100%; padding:0.5rem;" />
    <datalist id="propActiveList">
      ${t.map(r=>`<option value="${r.betName}">${r.betName} - ${r.howToWin}</option>`).join("")}
    </datalist>
    <button id="propJoinBtn" style="margin-top:10px;">Join</button>
    <div id="propJoinError" style="color:red;"></div>
  `,document.getElementById("propJoinBtn").onclick=()=>K(t)}async function K(e){const t=document.getElementById("propActiveDropdown").value.trim(),o=e.find(r=>r.betName===t);if(!o){document.getElementById("propJoinError").innerText="Bet not found.";return}Z(o)}function Z(e){let t=document.getElementById("propJoinModal");t&&t.remove(),t=document.createElement("div"),t.id="propJoinModal",t.style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:2000;",t.innerHTML=`
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
  `,document.getElementById("propAddToBetForm").onsubmit=r=>V(r,e,t)}async function V(e,t,o){e.preventDefault();const r=document.getElementById("propAddPlayers").value.trim(),n=Array.from(document.getElementById("propAddProofImages").files),a=r.split(",").map(l=>l.trim()).filter(Boolean);if(!a.length||!n.length){document.getElementById("propAddToBetError").innerText="All fields required.";return}document.getElementById("propAddToBetError").innerText="",document.getElementById("propAddToBetSuccess").innerText="Uploading images...";let i=[];try{for(const l of n){const c=await J(l);i.push(c)}}catch(l){document.getElementById("propAddToBetError").innerText=l.message,document.getElementById("propAddToBetSuccess").innerText="";return}const d=await G();for(const l of a)d.some(s=>s.username===l)&&await R(l,t.amount);await fetch(`${p}/api/join-prop-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({betID:t.betID,addPlayers:a.join(","),addProofUrls:i})}),document.getElementById("propAddToBetSuccess").innerText="Added to bet!",document.getElementById("propAddToBetError").innerText="",document.getElementById("propAddToBetForm").reset(),setTimeout(()=>o.remove(),2e3),T()}async function X(){try{const e=await fetch(`${P}/sports?apiKey=${S}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json(),o=document.getElementById("sportSelect");o.innerHTML='<option value="">Select a sport...</option>',t.filter(n=>n.active).sort((n,a)=>n.group===a.group?n.title.localeCompare(a.title):n.group.localeCompare(a.group)).forEach(n=>{const a=document.createElement("option");a.value=n.key,a.textContent=`${n.group} - ${n.title}`,o.appendChild(a)})}catch(e){console.error("Error loading sports:",e),document.getElementById("sportSelect").innerHTML='<option value="">Error loading sports</option>'}}async function ee(e){const t=document.getElementById("oddsContainer");t.innerHTML="<p>Loading odds...</p>";try{const o=await fetch(`${P}/sports/${e}/odds?regions=us&oddsFormat=decimal&markets=h2h,spreads,totals&apiKey=${S}`);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const r=await o.json(),n={title:te(e),events:r};oe(n)}catch(o){console.error("Error loading odds:",o),t.innerHTML="<p>Error loading odds. Please try again.</p>"}}function te(e){return{americanfootball_nfl:"NFL",americanfootball_ncaaf:"NCAAF",basketball_nba:"NBA",basketball_wnba:"WNBA",baseball_mlb:"MLB",icehockey_nhl:"NHL",soccer_epl:"EPL",soccer_usa_mls:"MLS",mma_mixed_martial_arts:"MMA"}[e]||e}function oe(e){const t=document.getElementById("oddsContainer");if(!e.events||e.events.length===0){t.innerHTML="<p>No events available for this sport at the moment.</p>";return}let o=`<h3>${e.title} - Upcoming Games</h3>`;e.events.forEach((a,i)=>{const d=new Date(a.commence_time).toLocaleString();o+=`
      <div class="event-card" id="event-card-${i}">
        <div class="event-header">
          <h4>${a.away_team} @ ${a.home_team}</h4>
          <p class="event-time">${d}</p>
        </div>
        <div class="event-content" id="event-content-${i}">
          <div class="odds-tables">
    `,a.bookmakers.forEach(l=>{o+=`
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
      `,l.markets.forEach(c=>{c.outcomes.forEach(s=>{const m=s.price;o+=`
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
  `,e.events.forEach((a,i)=>{const d=document.getElementById(`event-card-${i}`),l=document.getElementById(`event-content-${i}`);d&&l&&(l.style.display="none",d.classList.add("collapsed"),d.addEventListener("click",function(c){c.target.closest(".event-content")||(l.style.display==="none"?(l.style.display="block",d.classList.remove("collapsed")):(l.style.display="none",d.classList.add("collapsed")))}))}),document.querySelectorAll(".betting-cell").forEach(a=>{a.addEventListener("click",function(i){i.stopPropagation(),ne(this)})}),document.getElementById("closeBettingModal").addEventListener("click",F),document.getElementById("closeBettingExampleModal").addEventListener("click",re),document.getElementById("bettingExampleBtn").addEventListener("click",()=>{document.getElementById("bettingExampleModal").style.display="flex"}),document.getElementById("bettingAmount").addEventListener("input",function(){k(this)});const n=document.getElementById("bettingProofImage");document.getElementById("bettingForm").addEventListener("paste",a=>{if(a.clipboardData&&a.clipboardData.files&&a.clipboardData.files.length>0){const i=a.clipboardData.files[0];if(i.type.startsWith("image/")){const d=new DataTransfer;d.items.add(i),n.files=d.files}}}),document.getElementById("bettingForm").addEventListener("submit",ae)}function w(e){return{h2h:"Moneyline",spreads:"Spread",totals:"Total"}[e]||e}let u=null;function ne(e){const t=e.dataset.event,o=e.dataset.eventTime,r=e.dataset.betType,n=e.dataset.selection,a=e.dataset.odds,i=e.dataset.line;u={event:t,eventTime:o,betType:r,selection:n,odds:a,line:i},document.getElementById("modalEventTitle").textContent=`${t} - ${r}`;const d=document.getElementById("teamSelection");if(d.innerHTML="",r==="Moneyline")t.split(" @ ").forEach(c=>{const s=document.createElement("button");s.type="button",s.textContent=c,s.style.cssText="padding:0.5rem 1rem; background:#333; color:#fff; border:1px solid #444; border-radius:5px; cursor:pointer; flex:1;",s.addEventListener("click",function(){d.querySelectorAll("button").forEach(m=>{m.style.background="#333",m.style.borderColor="#444"}),this.style.background="#646cff",this.style.borderColor="#646cff",u.selectedTeam=this.textContent}),d.appendChild(s)});else{const l=document.createElement("button");l.type="button",l.textContent=n,l.style.cssText="padding:0.5rem 1rem; background:#646cff; color:#fff; border:1px solid #646cff; border-radius:5px; cursor:pointer; width:100%;",u.selectedTeam=n,d.appendChild(l)}document.getElementById("bettingForm").reset(),document.getElementById("bettingError").textContent="",document.getElementById("bettingSuccess").textContent="",document.getElementById("bettingModal").style.display="flex"}function F(){document.getElementById("bettingModal").style.display="none",u=null}function re(){document.getElementById("bettingExampleModal").style.display="none"}async function ae(e){if(e.preventDefault(),!u||!u.selectedTeam){document.getElementById("bettingError").textContent="Please select a team.";return}const t=document.getElementById("bettingUsername").value,o=x(document.getElementById("bettingAmount").value),r=document.getElementById("bettingProofImage").files[0];if(!r){document.getElementById("bettingError").textContent="Image required.";return}document.getElementById("bettingSuccess").textContent="Processing... Please wait.",document.getElementById("bettingError").textContent="";let n="",a="";try{const{url:d,filename:l}=await h(r);n=d,a=l}catch(d){document.getElementById("bettingError").textContent=d.message,document.getElementById("bettingSuccess").textContent="";return}const i={username:t,amountBet:o,eventName:u.event,eventTime:u.eventTime,betType:u.betType,selectedTeam:u.selectedTeam,odds:u.odds,line:u.line,proofImageUrl:n,proofImageFilename:a,adminUsername:g};try{const d=await fetch(`${p}/api/submit-sports-bet`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(d.ok)document.getElementById("bettingSuccess").textContent="✅ Bet submitted successfully! Data saved to database.",document.getElementById("bettingError").textContent="",document.getElementById("bettingForm").reset(),setTimeout(()=>{F()},3e3);else{const l=await d.json();document.getElementById("bettingError").textContent=l.message||"Failed to place bet.",document.getElementById("bettingSuccess").textContent=""}}catch{document.getElementById("bettingError").textContent="Connection failed. Please try again.",document.getElementById("bettingSuccess").textContent=""}}window.toggleEventCard=function(e){console.log("Toggle called for index:",e);const t=document.getElementById(`event-content-${e}`),o=t.closest(".event-card");console.log("Content element:",t),console.log("Current display style:",t.style.display),t.style.display==="none"?(t.style.display="block",o.classList.remove("collapsed"),console.log("Expanding card")):(t.style.display="none",o.classList.add("collapsed"),console.log("Collapsing card"))};B?b():M();
