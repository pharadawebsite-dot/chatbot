// Pharada Modern Chatbot (Demo / Testing Only)
(function() {

  // --- Create Chat Button ---
  var chatButton = document.createElement("button");
  chatButton.id = "chatButton";
  chatButton.innerHTML = "💬";
  document.body.appendChild(chatButton);

  // --- Create Chat Box ---
  var chatBox = document.createElement("div");
  chatBox.id = "chatBox";
  chatBox.innerHTML = `
    <div id="chatHeader">Pharada Support (Demo)</div>
    <div id="chatMessages">
      <div class="bot-msg">👋 Hello! This is a demo chatbot. Messages here are for testing only.</div>
    </div>
    <div id="chatInput">
      <input type="text" id="userMessage" placeholder="Type your message..." />
      <button id="sendBtn">Send</button>
    </div>
  `;
  document.body.appendChild(chatBox);

  // --- Chat CSS ---
  var style = document.createElement("style");
  style.innerHTML = `
    #chatButton {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #0d47a1, #1976d2);
      color: white;
      border: none;
      padding: 14px 18px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 24px;
      box-shadow: 0 6px 12px rgba(0,0,0,0.3);
      z-index: 9999;
      transition: transform 0.3s;
    }
    #chatButton:hover { transform: scale(1.1); }

    #chatBox {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 320px;
      height: 420px;
      background: white;
      border-radius: 12px;
      display: none;
      flex-direction: column;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      font-family: Arial, sans-serif;
      z-index: 9998;
      overflow: hidden;
      animation: fadeIn 0.4s ease-in-out;
    }
    @keyframes fadeIn { from {opacity:0; transform: translateY(20px);} to {opacity:1; transform: translateY(0);} }

    #chatHeader {
      background: linear-gradient(135deg, #0d47a1, #1976d2);
      color: white;
      padding: 14px;
      font-weight: bold;
      text-align: center;
      font-size: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    #chatMessages {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .bot-msg, .user-msg {
      padding: 8px 12px;
      border-radius: 12px;
      max-width: 80%;
      line-height: 1.4;
      word-wrap: break-word;
      animation: slideIn 0.3s ease-out;
    }
    .bot-msg { background: #e3f2fd; align-self: flex-start; }
    .user-msg { background: #1976d2; color: white; align-self: flex-end; }

    @keyframes slideIn { from {opacity:0; transform: translateY(10px);} to {opacity:1; transform: translateY(0);} }

    #chatInput { display: flex; border-top: 1px solid #ddd; }
    #chatInput input { flex: 1; padding: 10px; border: none; outline: none; font-size: 14px; }
    #chatInput button { background: #0d47a1; color: white; border: none; padding: 10px 16px; cursor: pointer; transition: background 0.3s; }
    #chatInput button:hover { background: #1976d2; }
  `;
  document.head.appendChild(style);

  // --- Chat Functions ---
  chatButton.addEventListener("click", function() {
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
  });

  function addMessage(content, sender) {
    var messages = document.getElementById("chatMessages");
    var div = document.createElement("div");
    div.className = sender === "bot" ? "bot-msg" : "user-msg";
    div.innerHTML = content;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  document.getElementById("sendBtn").addEventListener("click", function() {
    var input = document.getElementById("userMessage");
    var msg = input.value.trim();
    if(!msg) return;
    addMessage(msg, "user");

    setTimeout(function() {
      var reply = "Thank you for contacting Pharada! This is a demo response.";
      if(msg.toLowerCase().includes("price")) reply = "For prices, please visit our pricing page (demo).";
      if(msg.toLowerCase().includes("service")) reply = "We offer a wide range of services (demo info).";
      addMessage(reply, "bot");
    }, 800);

    input.value = "";
  });

  document.getElementById("userMessage").addEventListener("keypress", function(e){
    if(e.key === "Enter") document.getElementById("sendBtn").click();
  });

})();
