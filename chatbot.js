// Pharada Modern Chatbot - Enhanced Design (Demo) - EQTech Jordan
(function(){
  // Load Font Awesome for professional icons
  if(!document.getElementById("fa-kit")){
    const fa = document.createElement("script");
    fa.src = "https://kit.fontawesome.com/yourkitid.js"; // ضع هنا Kit ID من Font Awesome
    fa.crossOrigin = "anonymous";
    fa.id = "fa-kit";
    document.head.appendChild(fa);
  }

  // --- Create Chat Button ---
  const chatButton = document.createElement("button");
  chatButton.id = "chatButton";
  chatButton.innerHTML = '<i class="fas fa-comment-alt"></i>'; 
  document.body.appendChild(chatButton);

  // --- Create Chat Box ---
  const chatBox = document.createElement("div");
  chatBox.id = "chatBox";
  chatBox.innerHTML = `
    <div id="chatHeader">Pharada Support (Demo)</div>
    <div id="chatMessages"></div>
    <div id="chatFooter">🚨 <strong>DEMO ONLY - WORKING ON BACKEND (EQTech Jordan)</strong></div>
  `;
  document.body.appendChild(chatBox);

  // --- Add CSS ---
  const style = document.createElement("style");
  style.innerHTML = `
    /* Chat Button */
    #chatButton {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #7e53a0, #3f86cf);
      color: white;
      border: none;
      padding: 16px 20px;
      border-radius: 50px;
      font-size: 26px;
      cursor: pointer;
      box-shadow: 0 6px 18px rgba(0,0,0,0.25);
      z-index: 9999;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    #chatButton:hover {
      transform: scale(1.12);
      box-shadow: 0 8px 22px rgba(0,0,0,0.35);
    }

    /* Chat Box */
    #chatBox {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 340px;
      height: 420px;
      background: #fefefe;
      border-radius: 15px;
      display: none;
      flex-direction: column;
      box-shadow: 0 12px 28px rgba(0,0,0,0.3);
      font-family: 'Arial', sans-serif;
      z-index: 9998;
      overflow: hidden;
      animation: fadeIn 0.4s ease-in-out;
    }

    @keyframes fadeIn {
      from {opacity:0; transform: translateY(20px);}
      to {opacity:1; transform: translateY(0);}
    }

    #chatHeader {
      background: linear-gradient(135deg,#7e53a0,#3f86cf);
      color:white;
      padding:14px;
      text-align:center;
      font-weight:bold;
      font-size:16px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    #chatMessages {
      flex:1;
      padding:10px;
      overflow-y:auto;
      display:flex;
      flex-direction:column;
      gap:8px;
      font-size:14px;
    }

    .bot-msg, .user-msg {
      padding:8px 12px;
      border-radius:12px;
      max-width:75%;
      line-height:1.4;
      word-wrap:break-word;
      animation: slideIn 0.3s ease-out;
    }

    .bot-msg {
      background:#f3e9fc;
      align-self:flex-start;
      color:#333;
    }

    .user-msg {
      background:#7e53a0;
      color:white;
      align-self:flex-end;
    }

    @keyframes slideIn {
      from {opacity:0; transform: translateY(8px);}
      to {opacity:1; transform: translateY(0);}
    }

    /* Options Buttons */
    .option-btn {
      padding:6px 12px;
      background:#3f86cf;
      color:white;
      border:none;
      border-radius:8px;
      cursor:pointer;
      margin-top:4px;
      transition: background 0.25s, transform 0.2s;
      font-size:13px;
      text-align:left;
    }
    .option-btn:hover {
      background:#7e53a0;
      transform:scale(1.05);
    }

    /* Footer Demo Alert */
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
  chatButton.addEventListener("click", ()=>{
    chatBox.style.display = chatBox.style.display==="flex" ? "none" : "flex";
    if(chatMessages.innerHTML.trim()==="") showOptions();
  });

  function addMessage(content,sender="bot"){
    const div=document.createElement("div");
    div.className = sender==="bot"?"bot-msg":"user-msg";
    div.innerHTML = content;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showOptions(){
    addMessage("<strong>Hello! I'm Pharada Bot 🤖</strong><br>Select an option:", "bot");

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

})();
