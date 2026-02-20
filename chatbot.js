// EQTech / Pharada Modern Chatbot
(function() {
  var chatButton = document.createElement("button");
  chatButton.id = "chatButton";
  chatButton.innerHTML = "💬";
  document.body.appendChild(chatButton);

  var chatBox = document.createElement("div");
  chatBox.id = "chatBox";
  chatBox.innerHTML = `
    <div id="chatHeader">دعم Pharada</div>
    <div id="chatMessages">
      <div class="bot-msg">👋 أهلاً! كيف يمكننا مساعدتك اليوم؟</div>
    </div>
    <div id="chatInput">
      <input type="text" id="userMessage" placeholder="اكتب رسالتك هنا..." />
      <button id="sendBtn">إرسال</button>
    </div>
  `;
  document.body.appendChild(chatBox);

  // CSS
  var style = document.createElement("style");
  style.innerHTML = `
    /* كل CSS كما أرسلته لك سابقًا */
  `;
  document.head.appendChild(style);

  // وظائف الشات
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
      var reply = "شكراً لتواصلك معنا! سنرد عليك قريباً.";
      if(msg.includes("سعر")) reply = "للاطلاع على الأسعار، يرجى زيارة صفحة الأسعار لدينا.";
      if(msg.includes("خدمة")) reply = "نحن نقدم مجموعة واسعة من الخدمات، يمكنك الاستفسار عنها هنا.";
      addMessage(reply, "bot");
    }, 800);

    input.value = "";
  });

  document.getElementById("userMessage").addEventListener("keypress", function(e){
    if(e.key === "Enter") document.getElementById("sendBtn").click();
  });

})();
