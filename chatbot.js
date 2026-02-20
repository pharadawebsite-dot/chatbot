// Pharada Modern Chatbot (Demo) - EQTech Jordan
(function(){
  // Load Font Awesome (for professional icons)
  if(!document.getElementById("fa-kit")){
    const fa = document.createElement("script");
    fa.src = "https://kit.fontawesome.com/yourkitid.js"; // ضع هنا Kit ID الخاص بك من Font Awesome
    fa.crossOrigin = "anonymous";
    fa.id = "fa-kit";
    document.head.appendChild(fa);
  }

  // --- Create Chat Button ---
  const chatButton = document.createElement("button");
  chatButton.id = "chatButton";
  chatButton.innerHTML = '<i class="fas fa-comment-alt"></i>'; // FontAwesome chat icon
  document.body.appendChild(chatButton);

  // --- Create Chat Box ---
  const chatBox = document.createElement("div");
  chatBox.id = "chatBox";
  chatBox.innerHTML = `
    <div id="chatHeader">Pharada Support (Demo)</div>
    <div id="chatMessages"></div>
    <div id="chatFooter">🚨 Demo only - working on backend (EQTech Jordan)</div>
  `;
  document.body.appendChild(chatBox);

  // --- Add CSS ---
  const style = document.createElement("style");
  style.innerHTML = `
    #chatButton {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #7e53a0, #3f86cf);
      color: white;
      border: none;
      padding: 18px 22px;
      border-radius: 50px;
      font-size: 28px;
      cursor: pointer;
      box-shadow: 0 6px 15px rgba(0,0,0,0.3);
      z-index: 9999;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    #chatButton:hover {
      transform: scale(1.15);
      box-shadow: 0 8px 20px rgba(0,0,0,0.4);
    }
    #chatBox {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 350px;
      height: 450px;
      background: white;
      border-radius: 15px;
      display: none;
      flex-direction: column;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      font-family: 'Arial', sans-serif;
      z-index: 9998;
      overflow: hidden;
      animation: fadeIn 0.4s ease-in-out;
    }
    @keyframes fadeIn { from {opacity:0; transform: translateY(20px);} to {opacity:1; transform: translateY(0);} }
    #chatHeader {
      background: linear-gradient(135deg,#7e53a0,#3f86cf);
      color:white;
      padding:16px;
      text-align:center;
      font-weight:bold;
      font-size:17px;
      box-shadow:0 2px 6px rgba(0,0,0,0.2);
    }
    #chatMessages {
      flex:1;
      padding:12px;
      overflow-y:auto;
      display:flex;
      flex-direction:column;
      gap:10px;
      font-size:14px;
    }
    .bot-msg, .user-msg {
      padding:10px 14px;
      border-radius:12px;
      max-width:80%;
      line-height:1.4;
      word-wrap:break-word;
      animation: slideIn 0.3s ease-out;
    }
    .bot-msg { background:#f0e6fa; align-self:flex-start; color:#333; }
    .user-msg { background:#7e53a0; color:white; align-self:flex-end; }
    @keyframes slideIn { from {opacity:0; transform: translateY(10px);} to {opacity:1; transform: translateY(0);} }
    .option-btn {
      padding:8px 14px;
      background:#3f86cf;
      color:white;
      border:none;
      border-radius:10px;
      cursor:pointer;
      margin-top:4px;
      transition: background 0.3s, transform 0.2s;
      font-size:13px;
      text-align:left;
    }
    .option-btn:hover {
      background:#7e53a0;
      transform:scale(1.05);
    }
    #chatFooter {
      padding:8px;
      text-align:center;
      font-size:12px;
      color:red;
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
    addMessage("<strong>Hi there! I'm Pharada Bot 🤖</strong><br>Select one of the options below:", "bot");
    const options=[
      {label:'<i class="fas fa-briefcase"></i> Services', reply:'Our demo services include Consulting, Web Development, Marketing.'},
      {label:'<i class="fas fa-dollar-sign"></i> Pricing', reply:'Demo pricing info: check our Pricing page for details.'},
      {label:'<i class="fas fa-phone-alt"></i> Contact Us', reply:'Reach us at contact@pharada.com or +123456789.'},
      {label:'<i class="fas fa-question-circle"></i> FAQ', reply:'Check our FAQ section or ask here for more info.'}
    ];
    options.forEach(opt=>{
      const btn=document.createElement("button");
      btn.className="option-btn";
      btn.innerHTML=opt.label;
      btn.addEventListener("click", ()=>{
        addMessage(opt.label,"user");
        setTimeout(()=>addMessage(opt.reply,"bot"),500);
      });
      chatMessages.appendChild(btn);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

})();
