// Pharada Premium Chatbot v1.0 - EQTech Jordan (Demo)
(function(){

  // Load Font Awesome for icons
  if(!document.getElementById("fa-kit")){
    const fa = document.createElement("script");
    fa.src = "https://kit.fontawesome.com/yourkitid.js"; // ضع Kit ID من Font Awesome
    fa.crossOrigin = "anonymous";
    fa.id = "fa-kit";
    document.head.appendChild(fa);
  }

  // --- Create Floating Chat Button ---
  const chatButton = document.createElement("button");
  chatButton.id = "chatButton";
  chatButton.innerHTML = '<i class="fas fa-comment-alt"></i>';
  document.body.appendChild(chatButton);

  // --- Create Chat Box ---
  const chatBox = document.createElement("div");
  chatBox.id = "chatBox";
  chatBox.innerHTML = `
    <div id="chatHeader">
      Pharada Support (Demo)
      <span id="chatClose">&times;</span>
    </div>
    <div id="chatMessages"></div>
    <div id="chatFooter">🚨 <strong>DEMO ONLY - WORKING ON BACKEND (EQTech Jordan)</strong></div>
  `;
  document.body.appendChild(chatBox);

  const chatMessages = chatBox.querySelector("#chatMessages");

  // --- Add CSS ---
  const style = document.createElement("style");
  style.innerHTML = `
    /* Floating Button */
    #chatButton {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #7e53a0, #3f86cf);
      color:white;
      border:none;
      padding:14px 18px;
      border-radius:50px;
      font-size:24px;
      cursor:pointer;
      box-shadow:0 6px 20px rgba(0,0,0,0.3);
      z-index:10000;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    #chatButton:hover { transform: scale(1.1); box-shadow:0 8px 25px rgba(0,0,0,0.4); }

    /* Chat Box */
    #chatBox {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 300px; /* عرض أصغر من الجوانب */
      height: 440px;
      background:#fefefe;
      border-radius:15px;
      display:flex;
      flex-direction:column;
      box-shadow:0 12px 30px rgba(0,0,0,0.35);
      font-family:'Arial',sans-serif;
      z-index:9999;
      overflow:hidden;
      animation: fadeIn 0.5s ease-in-out;
      transform: translateY(20px);
    }
    @keyframes fadeIn { from {opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }

    #chatHeader {
      background: linear-gradient(135deg,#7e53a0,#3f86cf);
      color:white;
      padding:12px;
      font-weight:bold;
      font-size:16px;
      text-align:center;
      position:relative;
      box-shadow:0 2px 6px rgba(0,0,0,0.25);
    }
    #chatClose {
      position:absolute;
      top:50%;
      right:10px;
      transform:translateY(-50%);
      font-size:18px;
      cursor:pointer;
    }

    #chatMessages {
      flex:1;
      padding:12px;
      overflow-y:auto;
      display:flex;
      flex-direction:column;
      gap:6px;
      font-size:14px;
    }

    .bot-msg, .user-msg {
      padding:8px 12px;
      border-radius:12px;
      max-width:75%;
      line-height:1.4;
      word-wrap:break-word;
      animation: slideIn 0.3s ease-out;
      box-shadow:0 2px 6px rgba(0,0,0,0.1);
    }
    .bot-msg { background:#f3e9fc; align-self:flex-start; color:#333; }
    .user-msg { background:#7e53a0; color:white; align-self:flex-end; }

    @keyframes slideIn { from {opacity:0; transform: translateY(8px);} to {opacity:1; transform: translateY(0);} }

    .option-btn {
      padding:5px 10px;
      background:#3f86cf;
      color:white;
      border:none;
      border-radius:8px;
      cursor:pointer;
      margin-top:4px;
      transition: background 0.25s, transform 0.2s;
      font-size:12px;
      text-align:left;
      box-shadow:0 2px 4px rgba(0,0,0,0.15);
    }
    .option-btn:hover { background:#7e53a0; transform:scale(1.05); }

    #chatFooter {
      padding:6px;
      text-align:center;
      font-size:12px;
      color:red;
      font-weight:bold;
      border-top:1px solid #ddd;
      background:#fff0f0;
    }
  `;
  document.head.appendChild(style);

  // --- Chat Logic ---
  function addMessage(content, sender="bot"){
    const div=document.createElement("div");
    div.className = sender==="bot"?"bot-msg":"user-msg";
    div.innerHTML=content;
    chatMessages.appendChild(div);
    chatMessages.scrollTop=chatMessages.scrollHeight;
  }

  function showOptions(){
    addMessage("<strong>Hello! I'm Pharada Bot 🤖</strong><br>Select an option below:", "bot");
    const options=[
      {label:'<i class="fas fa-briefcase"></i> Services', reply:'Demo Services: Consulting, Web Development, Marketing.'},
      {label:'<i class="fas fa-dollar-sign"></i> Pricing', reply:'Demo Pricing Info: see Pricing page.'},
      {label:'<i class="fas fa-phone-alt"></i> Contact Us', reply:'Contact: contact@pharada.com / +123456789.'},
      {label:'<i class="fas fa-question-circle"></i> FAQ', reply:'Demo FAQ: Check this section for more info.'}
    ];
    options.forEach(opt=>{
      const btn=document.createElement("button");
      btn.className="option-btn";
      btn.innerHTML=opt.label;
      btn.addEventListener("click", ()=>{
        addMessage(opt.label,"user");
        setTimeout(()=>addMessage(opt.reply,"bot"),400);
      });
      chatMessages.appendChild(btn);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Show chatbot automatically
  chatBox.style.display="flex";
  showOptions();

  // Toggle with floating button
  chatButton.addEventListener("click", ()=>{
    chatBox.style.display = chatBox.style.display==="flex"?"none":"flex";
  });

  // Close button
  chatBox.querySelector("#chatClose").addEventListener("click", ()=>{
    chatBox.style.display="none";
  });

})();
