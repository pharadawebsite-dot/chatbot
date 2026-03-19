// Pharada Chatbot - Clean Enterprise Version
(function(){

  // Font Awesome
  const fa = document.createElement("link");
  fa.rel = "stylesheet";
  fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
  document.head.appendChild(fa);

  // Button
  const btn = document.createElement("div");
  btn.id = "pharadaBtn";
  btn.innerHTML = `
    <div class="bubble">Ask Pharada</div>
    <button><i class="fas fa-comment"></i></button>
  `;
  document.body.appendChild(btn);

  // Chat
  const box = document.createElement("div");
  box.id = "pharadaBox";
  box.innerHTML = `
    <div id="header">
      Ask Pharada
      <span id="close">&times;</span>
    </div>
    <div id="messages"></div>
    <div id="typing"><span></span><span></span><span></span></div>
    <div id="nav">
<button id="back"><i class="fas fa-arrow-left"></i></button>
      <button id="home">⌂</button>
    </div>
  `;
document.documentElement.appendChild(box);
  const messages = box.querySelector("#messages");
  const typing = box.querySelector("#typing");

// ===== CSS =====
const style = document.createElement("style");
style.innerHTML = `

/* ===== Floating Button ===== */
#pharadaBtn{
  position:fixed;
  bottom:20px;
  right:20px;
  z-index:9999;
}

#pharadaBtn button{
  width:56px;
  height:56px;
  border-radius:50%;
  border:none;
  background:linear-gradient(135deg,#7e53a0,#3b6eb4);
  color:#fff;
  font-size:20px;
  cursor:pointer;
  box-shadow:0 10px 25px rgba(0,0,0,0.25);
  transition:all .3s ease;
}

#pharadaBtn button:hover{
  transform:scale(1.08);
  box-shadow:0 15px 35px rgba(0,0,0,0.35);
}
/* ===== Bubble (Ask Pharada) ===== */
.bubble{
  background: linear-gradient(135deg,#3b6eb4,#7e53a0);
  color:#fff;
  font-size:12px;
  padding:7px 14px;
  border-radius:14px;
  margin-bottom:8px;
  font-weight:500;
  letter-spacing:0.3px;

  /* Shadow */
  box-shadow:0 8px 25px rgba(59,110,180,0.35);

  /* Position feel */
  transform: translateY(10px);
  opacity:0;

  /* Animation on load */
  animation: bubbleEnter 0.6s ease forwards,
             bubblePulse 2.5s ease-in-out infinite 2s;
}

/* ✨ دخول مثل رسالة */
@keyframes bubbleEnter{
  0%{
    opacity:0;
    transform:translateY(20px) scale(0.9);
  }
  60%{
    transform:translateY(-4px) scale(1.03);
  }
  100%{
    opacity:1;
    transform:translateY(0) scale(1);
  }
}

/* 🔥 Pulse خفيف (attention بدون إزعاج) */
@keyframes bubblePulse{
  0%,100%{
    box-shadow:0 8px 25px rgba(59,110,180,0.35);
  }
  50%{
    box-shadow:0 10px 35px rgba(126,83,160,0.45);
  }
}

/* 💬 Hover effect */
.bubble:hover{
  transform: translateY(-2px) scale(1.03);
  box-shadow:0 12px 35px rgba(59,110,180,0.45);
  transition:all .25s ease;
}

/* ===== Chat Box ===== */
#pharadaBox{
  position: fixed !important;
  bottom:85px;
  right:20px;
  width:340px;
  height:480px;
  background:#fff;
  border-radius:16px;
  display:none;
  flex-direction:column;
  box-shadow:0 20px 50px rgba(0,0,0,0.35);
  font-family:system-ui;
  overflow:hidden;
  animation:fadeInUp .3s ease;
  z-index:2147483647 !important; /* 🔥 أعلى قيمة */  
    transform: none !important;
  filter: none !important;
}

/* ===== Header ===== */
#header{
  padding:14px 16px;
  font-weight:600;
  border-bottom:1px solid rgba(0,0,0,0.05);
  text-align:left;
  font-size:14px;
  background:linear-gradient(135deg,#7e53a0,#3b6eb4);
  color:#fff;
}

/* ===== Messages ===== */
#messages{
  flex:1;
  padding:12px;
  display:flex;
  flex-direction:column;
  gap:8px;
  overflow-y:auto;
  scroll-behavior:smooth;
}

/* Scrollbar */
#messages::-webkit-scrollbar{
  width:4px;
}
#messages::-webkit-scrollbar-thumb{
  background:#d1d1d1;
  border-radius:10px;
}

/* ===== Messages ===== */
.bot,.user{
  padding:10px 12px;
  border-radius:12px;
  max-width:80%;
  font-size:13px;
  line-height:1.5;
  animation:fadeInUp .25s ease;
}

.bot{
  background:#f4f2f9;
  color:#333;
  box-shadow:0 2px 6px rgba(0,0,0,0.05);
}

.user{
  background:linear-gradient(135deg,#7e53a0,#3b6eb4);
  color:#fff;
  align-self:flex-end;
}

/* ===== ✨ Title Detection (بدون JS) ===== */
.bot:first-child,
.bot:has(+ .opt){
  font-weight:600;
  font-size:13.5px;
  color:#7e53a0;
  background:transparent;
  padding:0;
  border-left:3px solid #7e53a0;
  padding-left:8px;
  margin-bottom:4px;
}

/* ===== Options ===== */
.opt{
  background:#fff;
  border:1px solid #e5e5e5;
  padding:9px 11px;
  border-radius:9px;
  font-size:13px;
  cursor:pointer;
  text-align:left;
  transition:all .25s ease;
}

.opt:hover{
  border-color:#7e53a0;
  color:#7e53a0;
  transform:translateX(3px);
  background:#faf7fd;
}

/* ===== Links ===== */
.link-btn{
  display:inline-block;
  margin-top:6px;
  font-size:12px;
  color:#3b6eb4;
  text-decoration:none;
  font-weight:500;
}

.link-btn:hover{
  text-decoration:underline;
}

/* ===== Typing ===== */
#typing{
  display:none;
  padding:8px 12px;
}

#typing span{
  display:inline-block;
  width:5px;
  height:5px;
  background:#7e53a0;
  border-radius:50%;
  margin:2px;
  animation:blink 1.4s infinite;
}

/* ===== Navigation ===== */
#nav{
  display:flex;
  justify-content:space-between;
  padding:6px 10px;
  border-top:1px solid rgba(0,0,0,0.05);
  background:#fafafa;
}

#nav button{
  border:none;
  background:none;
  font-size:14px;
  cursor:pointer;
  color:#777;
  transition:.2s;
}

#nav button:hover{
  color:#7e53a0;
  transform:scale(1.15);
}

/* Map */
iframe{
  width:100%;
  height:130px;
  border:none;
  border-radius:10px;
  margin-top:6px;
}

/* ===== Animations ===== */
@keyframes blink{
  0%,80%,100%{opacity:0}
  40%{opacity:1}
}

@keyframes fadeInUp{
  from{opacity:0; transform:translateY(8px)}
  to{opacity:1; transform:translateY(0)}
}

/* ===== Close Button (No Position Change) ===== */
#close{
  /* ❌ ما لمسنا position/top/right */

  width:28px;
  height:28px;

  display:inline-flex;
  align-items:center;
  justify-content:center;

  border-radius:50%;
  cursor:pointer;

  font-size:16px;
  font-weight:500;
  color:#fff;

  background:rgba(255,255,255,0.15);
  backdrop-filter: blur(6px);

  transition: all 0.25s ease;
}

/* Hover */
#close:hover{
  background:rgba(255,255,255,0.3);
  transform: scale(1.15) rotate(90deg);
}

/* Click */
#close:active{
  transform: scale(0.95);
}

/* Optional glow */
#close:hover{
  box-shadow:0 0 10px rgba(255,255,255,0.5);
}

/* ===== Back Button (FINAL PRO) ===== */
#back{
  display:flex;
  align-items:center;
  justify-content:center;

  min-width:34px;
  height:32px;
  padding:0 10px;

  border:none;
  border-radius:10px;

  cursor:pointer;

  /* Clean background */
  background:rgb(127, 83, 160);
  color:#7e53a0;

  font-size:13px;
  font-weight:600;

  transition:all 0.25s ease;
}

/* Hover (Desktop) */
#back:hover{
  background:linear-gradient(135deg,#7e53a0,#3b6eb4);
  color:#fff;

  transform:translateX(-4px);

  box-shadow:0 6px 16px rgba(240, 240, 240, 0.25);
}

/* Click */
#back:active{
  transform:translateX(-2px) scale(0.92);
}

/* Mobile Optimization */
@media (max-width: 480px){
  #back{
    min-width:30px;
    height:30px;
    padding:0 8px;
    font-size:12px;
  }
}

/* ===== Optional Icon Style ===== */
#back i{
  font-size:13px;
  transition:all 0.25s ease;
}

#back:hover i{
  transform:translateX(-2px);
}

/* ===== 📱 MOBILE FULL OPTIMIZATION ===== */
@media (max-width: 768px){

  /* Chat Window Full Width */
  #pharadaBox{
    right:10px;
    left:10px;
    bottom:10px;

    width:auto;
    height:75vh;

    border-radius:14px;
  }

  /* Header spacing */
  #header{
    padding:12px 14px;
    font-size:13.5px;
  }

  /* Messages spacing */
  #messages{
    padding:10px;
    gap:6px;
  }

  /* Messages size */
  .bot,.user{
    font-size:13px;
    max-width:85%;
  }

  /* Options bigger tap area */
  .opt{
    padding:11px 12px;
    font-size:13px;
    border-radius:10px;
  }

  /* Navigation */
  #nav{
    padding:8px;
  }

  #nav button{
    font-size:15px;
  }

  /* Floating button adjust */
  #pharadaBtn{
    bottom:15px;
    right:15px;
  }

  #pharadaBtn button{
    width:54px;
    height:54px;
    font-size:19px;
  }

  /* Bubble smaller */
  .bubble{
    font-size:11px;
    padding:6px 10px;
  }
}

/* ===== 📱 SMALL DEVICES (iPhone SE / small screens) ===== */
@media (max-width: 400px){

  #pharadaBox{
    height:80vh;
    border-radius:12px;
  }

  .bot,.user{
    font-size:12.5px;
  }

  .opt{
    font-size:12.5px;
    padding:10px;
  }
}

/* ===== 📱 KEYBOARD SAFE FIX ===== */
#pharadaBox{
  max-height:calc(100vh - 20px);
}

/* ===== 📱 IOS SAFE AREA (NOTCH) ===== */
@supports(padding: max(0px)){
  #pharadaBox{
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* ===== 📱 SMOOTH SCROLL IMPROVEMENT ===== */
#messages{
  -webkit-overflow-scrolling: touch;
}

/* ===== 📱 PREVENT ZOOM INPUT (future-proof) ===== */
html{
  touch-action: manipulation;
}

`;
document.head.appendChild(style);

// Pharada Chatbot - FINAL FIXED VERSION

  let historyStack = [];
  let currentScreen = null;

  function showTyping(cb){
    typing.style.display="block";

    setTimeout(()=>{
      typing.style.display="none";
      cb();

      setTimeout(() => smartScroll(), 50);
    },500);
  }

  function smartScroll(){
    const bots = messages.querySelectorAll(".bot");
    if(bots.length === 0) return;

    bots[bots.length - 1].scrollIntoView({
      behavior:"smooth",
      block:"start"
    });
  }

  function msg(text,type="bot"){
    const d=document.createElement("div");
    d.className=type;
    d.innerHTML=text;
    messages.appendChild(d);

    if(type==="bot"){
      setTimeout(() => smartScroll(), 50);
    }
  }

  function options(arr){
    arr.forEach(o=>{
      const b=document.createElement("button");
      b.className="opt";
      b.innerHTML=o.label;

      b.onclick=()=>{

        if(currentScreen){
          historyStack.push(currentScreen);
        }

        msg(o.label,"user");

        showTyping(()=>{
          messages.innerHTML="";
          o.action();
        });
      };

      messages.appendChild(b);
    });
  }

  // ===== NAV BUTTONS =====
  box.querySelector("#back").onclick = () => {
    if(historyStack.length > 0){
      messages.innerHTML="";
      const prev = historyStack.pop();
      prev();
    }
  };

  box.querySelector("#home").onclick = () => {
    historyStack = [];
    messages.innerHTML="";
    home();
  };

  // ===== SCREENS =====

function home(){
  currentScreen = home;

  msg("Welcome to Pharada Consulting. Your trusted partner in pharmaceutical excellence. How can we support you?");
  options([
    {label:"Services",action:services},
    {label:"About Us",action:about},
    {label:"Our Partners",action:partners},
    {label:"Training",action:training},
    {label:"Contact Us",action:contact},
    {label:"Book Consultation",action:booking}
  ]);
}

// ===== SERVICES =====
function services(){
  currentScreen = services;

  msg("Explore our core pharmaceutical consulting services:");
  options([

    {label:"Cultural Excellence",action:()=>msg(
      "Build a sustainable quality culture that aligns compliance with performance and leadership.<br><a class='link-btn' href='https://www.pharadaconsult.com/cultural-excellence-consulting' target='_blank'>Learn More</a>"
    )},

    {label:"Strategy Management",action:()=>msg(
      "Transform strategy into execution with measurable KPIs and operational alignment.<br><a class='link-btn' href='https://www.pharadaconsult.com/strategy-management-consulting' target='_blank'>Learn More</a>"
    )},

    {label:"Gap Analysis",action:()=>msg(
      "Comprehensive GMP gap analysis aligned with WHO, PIC/S, and global standards.<br><a class='link-btn' href='https://www.pharadaconsult.com/gmp-gap-analysis' target='_blank'>Learn More</a>"
    )},

    {label:"Technical & Operational Support",action:()=>msg(
      "End-to-end pharma technical support including RLD sourcing, PDE reports, and compliance support.<br><a class='link-btn' href='https://www.pharadaconsult.com/technical-support-services' target='_blank'>Learn More</a>"
    )},

    {label:"Pharmaceutical Machinery",action:()=>msg(
      "Sourcing and integration of pharmaceutical machinery aligned with GMP requirements.<br><a class='link-btn' href='https://www.pharadaconsult.com/pharmaceutical-machinery' target='_blank'>Learn More</a>"
    )},

    {label:"Digital Transformation",action:()=>msg(
      "Pharma 4.0 solutions including data integrity, automation, and digital maturity frameworks.<br><a class='link-btn' href='https://www.pharadaconsult.com/digital-transformation-solutions' target='_blank'>Learn More</a>"
    )},

    {label:"Track & Trace",action:()=>msg(
      "Serialization and traceability solutions ensuring full regulatory compliance.<br><a class='link-btn' href='https://www.pharadaconsult.com/track-and-trace-consulting' target='_blank'>Learn More</a>"
    )}

  ]);
}

// ===== TRAINING =====
function training(){
  currentScreen = training;

  msg("Enhance your team capabilities with our specialized training programs:");
  options([

    {label:"Pharmaceutical Training Programs",action:()=>msg(
      "Comprehensive pharma training covering GMP, validation, and regulatory compliance.<br><a class='link-btn' href='https://www.pharadaconsult.com/pharmaceutical-training-programs' target='_blank'>Learn More</a>"
    )},

    {label:"Training Needs Assessment",action:()=>msg(
      "Identify performance gaps and design tailored training strategies.<br><a class='link-btn' href='https://www.pharadaconsult.com/training-needs-assessment' target='_blank'>Learn More</a>"
    )},

    {label:"Training Packages",action:()=>msg(
      "Flexible training packages designed for long-term capability development.<br><a class='link-btn' href='https://www.pharadaconsult.com/pharmaceutical-training' target='_blank'>Learn More</a>"
    )}

  ]);
}

// ===== PARTNERS =====
function partners(){
  currentScreen = partners;

  msg("Discover our strategic partners and solutions ecosystem:");
  options([

    {label:"F+ Healthcare",action:()=>msg(
      "Innovative healthcare consulting and solutions.<br><a class='link-btn' href='https://www.pharadaconsult.com/healthcare-solutions' target='_blank'>Learn More</a>"
    )},

    {label:"Podtech",action:()=>msg(
      "Advanced technology integration solutions for pharma companies.<br><a class='link-btn' href='https://www.pharadaconsult.com/technology-integration' target='_blank'>Learn More</a>"
    )},

    {label:"Turnkey Laboratories",action:()=>msg(
      "End-to-end laboratory setup and compliance solutions.<br><a class='link-btn' href='https://www.pharadaconsult.com/turnkey-laboratory-solutions' target='_blank'>Learn More</a>"
    )},

    {label:"GMP Compliance",action:()=>msg(
      "Comprehensive GMP compliance solutions and consulting.<br><a class='link-btn' href='https://www.pharadaconsult.com/gmp-compliance' target='_blank'>Learn More</a>"
    )}

  ]);
}

// ===== ABOUT =====
function about(){
  currentScreen = about;

  msg("Pharada Consulting is a leading pharmaceutical consulting firm with over 30 years of experience in quality, compliance, and strategy execution across global markets.");
  msg("<a class='link-btn' href='https://www.pharadaconsult.com/about-pharada' target='_blank'>Learn More</a>");
}

// ===== CONTACT =====
function contact(){
  currentScreen = contact;

  msg("Choose how you would like to reach us:");
  options([

    {label:"<i class='fas fa-phone'></i> Call Us",action:()=>msg(
      "<strong>Phone:</strong> +962 778 50 8502"
    )},

    {label:"<i class='fas fa-envelope'></i> Email Us",action:()=>msg(
      "<strong>Email:</strong> info@pharadaconsult.com"
    )},

    {label:"<i class='fas fa-map-marker-alt'></i> Our Location",action:()=>msg(
      `<iframe src="https://maps.google.com/maps?q=31.95,35.91&z=15&output=embed"></iframe>
       <a class='link-btn' href='https://maps.app.goo.gl/yGuSPwPt2HBuauHb8' target='_blank'>Open in Google Maps</a>`
    )}

  ]);
}

function booking(){
  currentScreen = booking;

  msg("Schedule a consultation with our experts and take your pharmaceutical operations to the next level.");
  msg("<a class='link-btn' href='https://www.pharadaconsult.com/pharmaceutical-consultation' target='_blank'>Book Consultation</a>");
}

// ===== INIT =====
home();

// ===== OPEN / CLOSE =====
btn.onclick = () => {
  box.style.display = box.style.display === "flex" ? "none" : "flex";
};

box.querySelector("#close").onclick = () => {
  box.style.display = "none";
};

})();

