// Pharada Modern Chatbot (Demo)
(function() {
  // Chat Button
  var chatButton = document.createElement("button");
  chatButton.id = "chatButton";
  chatButton.innerHTML = "💬";
  document.body.appendChild(chatButton);

  // Chat Box
  var chatBox = document.createElement("div");
  chatBox.id = "chatBox";
  chatBox.innerHTML = `
    <div id="chatHeader">Pharada Support (Demo)</div>
    <div id="chatMessages">
      <div class="bot-msg">👋 Hello! This is a demo chatbot.</div>
    </div>
    <div id="chatInput">
      <input type="text" id="userMessage" placeholder="Type your message..." />
      <button id="sendBtn">Send</button>
    </div>
  `;
  document.body.appendChild(chatBox);

  // CSS
  var style = document.createElement("style");
  style.innerHTML = `
    #chatButton { 
      position: fixed; bottom: 20px; right: 20px;
      background: linear-gradient(135deg, #0d47a1, #1976d2);
      color: white; border: none; padding: 14px 18px; border-radius: 50px;
      font-size: 24px; cursor: pointer; box-shadow: 0 6px 12px rgba(0,0,0,0.3);
      z-index: 9999; transition: transform 0.3s;
    }
    #chatButton:hover { transform: scale(1.1); }
    #chatBox { position: fixed; bottom: 80px; right: 20px; width: 320px; height: 420px; 
      background: white; border-radius: 12px; display: none; flex-direction: column;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3); font-family: Arial, sans-serif;
      z-index: 9998; overflow: hidden;
    }
    #chatHeader { background: linear-gradient(135deg,#0d47a1,#1976d2); color:white;
      padding:14px; font-weight:bold; text-align:center; font-size:16px; }
    #chatMessages { flex:1; padding:10px; overflow-y:auto; display:flex; flex-direction:column; gap:8px; }
    .bot-msg{background:#e3f2fd;align-self:flex-start;padding:8px 12px;border-radius:12px; }
    .user-msg{background:#1976d2;color:white;align-self:flex-end;padding:8px 12px;border-radius:12px; }
    #chatInput{display:flex;border-top:1px solid #ddd;}
    #chatInput input{flex:1;padding:10px;border:none;outline:none;font-size:14px;}
    #chatInput button{background:#0d47a1;color:white;border:none;padding:10px 16px;cursor:pointer;}
    #chatInput button:hover{background:#1976d2;}
  `;
  document.head.appendChild(style);

  // Toggle chat
  chatButton.addEventListener("click", function() {
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
  });

  // Message sending
  function addMessage(content,sender){
    var messages=document.getElementById("chatMessages");
    var div=document.createElement("div");
    div.className=sender==="bot"?"bot-msg":"user-msg";
    div.innerHTML=content;
    messages.appendChild(div);
    messages.scrollTop=messages.scrollHeight;
  }

  document.getElementById("sendBtn").addEventListener("click", function(){
    var input=document.getElementById("userMessage");
    var msg=input.value.trim();
    if(!msg) return;
    addMessage(msg,"user");
    setTimeout(function(){
      addMessage("This is a demo reply from Pharada chatbot.","bot");
    }, 800);
    input.value="";
  });

  document.getElementById("userMessage").addEventListener("keypress",function(e){
    if(e.key==="Enter") document.getElementById("sendBtn").click();
  });

})();
