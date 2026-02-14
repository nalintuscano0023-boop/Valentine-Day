

const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);


const themeBtn = $("#themeBtn");
const musicBtn = $("#musicBtn");
const shareBtn = $("#shareBtn");

const nameInput = $("#nameInput");
const saveNameBtn = $("#saveNameBtn");
const crushName = $("#crushName");

const yesBtn = $("#yesBtn");
const noBtn = $("#noBtn");

const modal = $("#modal");
const modalText = $("#modalText");
const modalTitle = $("#modalTitle");
const closeModalBtn = $("#closeModalBtn");

const bgMusic = $("#bgMusic");
const yesSfx = $("#yesSfx");
const noSfx = $("#noSfx");

const noDodgesEl = $("#noDodges");
const yesClicksEl = $("#yesClicks");

const yourName = $("#yourName");
const partnerName = $("#partnerName");
const letterStyle = $("#letterStyle");
const specialWord = $("#specialWord");
const generateBtn = $("#generateBtn");
const copyBtn = $("#copyBtn");
const downloadBtn = $("#downloadBtn");
const saveLetterBtn = $("#saveLetterBtn");
const clearBtn = $("#clearBtn");

const letterOutput = $("#letterOutput");
const savedLetter = $("#savedLetter");
const clearSavedBtn = $("#clearSavedBtn");

const imgModal = $("#imgModal");
const modalImg = $("#modalImg");
const closeImgModal = $("#closeImgModal");
const galleryGrid = $("#galleryGrid");


const compName1 = $("#compName1");
const compName2 = $("#compName2");
const checkLoveBtn = $("#checkLoveBtn");
const resetLoveBtn = $("#resetLoveBtn");

const lovePercent = $("#lovePercent");
const loveFill = $("#loveFill");
const loveMsg = $("#loveMsg");

const savedLoveResult = $("#savedLoveResult");
const clearLoveSavedBtn = $("#clearLoveSavedBtn");


const scratchCanvas = $("#scratchCanvas");
const resetScratchBtn = $("#resetScratchBtn");
const scratchPercentEl = $("#scratchPercent");
const scratchFill = $("#scratchFill");
const scratchMsg = $("#scratchMsg");
const scratchFinalText = $("#scratchFinalText");
const scratchMessage = $("#scratchMessage");


const STORAGE_KEY = "valentineNalin_final";

let state = {
  theme: "dark",
  crush: "My Love",
  musicOn: false,
  yesClicks: 0,
  noDodges: 0,
  savedLetter: ""
};

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    state = { ...state, ...JSON.parse(raw) };
  } catch {}
}


const tabs = $$(".tab");
const panels = $$(".panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    $("#" + target).classList.add("active");

    if (target === "scratch") {
      setTimeout(() => initScratchCard(), 150);
    }
  });
});


function applyTheme() {
  if (state.theme === "light") {
    document.body.classList.add("light");
    themeBtn.innerText = "☀️";
  } else {
    document.body.classList.remove("light");
    themeBtn.innerText = "🌙";
  }
}

themeBtn.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  applyTheme();
  saveState();
});


async function toggleMusic() {
  try {
    if (!state.musicOn) {
      await bgMusic.play();
      state.musicOn = true;
      musicBtn.innerText = "🔊";
    } else {
      bgMusic.pause();
      state.musicOn = false;
      musicBtn.innerText = "🎵";
    }
    saveState();
  } catch {
    alert("⚠️ Click again to allow music (browser autoplay restriction).");
  }
}
musicBtn.addEventListener("click", toggleMusic);


function showModal(title, msg) {
  modalTitle.innerText = title;
  modalText.innerText = msg;
  modal.classList.remove("hidden");
}
closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));


function setCrushName(name) {
  state.crush = name;
  crushName.innerText = name;
  saveState();
}

saveNameBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (!name) return alert("Please enter a name 💌");
  setCrushName(name);
  showModal("💖 Name Saved!", `Hey ${name} 😍\nNow answer the question honestly 😆`);
});


yesBtn.addEventListener("click", () => {
  state.yesClicks++;
  yesClicksEl.innerText = state.yesClicks;
  saveState();

  try { yesSfx.currentTime = 0; yesSfx.play(); } catch {}

  showModal("💝 YAYYYYY!", `${state.crush} 💖\nYou are officially my Valentine 😍🌹`);
  confettiBlast();
});


function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function dodgeNoButton() {
  state.noDodges++;
  noDodgesEl.innerText = state.noDodges;
  saveState();

  try { noSfx.currentTime = 0; noSfx.play(); } catch {}

  const rect = noBtn.getBoundingClientRect();
  const padding = 16;

  const maxX = window.innerWidth - rect.width - padding;
  const maxY = window.innerHeight - rect.height - padding;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.position = "fixed";
  noBtn.style.left = clamp(randomX, padding, maxX) + "px";
  noBtn.style.top = clamp(randomY, padding + 70, maxY) + "px";
}

noBtn.addEventListener("mouseenter", dodgeNoButton);
noBtn.addEventListener("click", dodgeNoButton);



let typingTimer = null;

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildTemplates(y, p, s) {
  return {
    romantic: [
      `Dear ${p} 💖,\n\nYou make my heart feel calm and excited at the same time.\nI choose you today, tomorrow, and ${s}. 🌹\n\nForever yours,\n${y} 💌`,
      `Hey ${p} 💘,\n\nEvery moment with you feels like a beautiful dream.\nStay with me, ${s}. 💖\n\nLove,\n${y}`,
      `My ${p} 💕,\n\nYour smile is my favorite notification.\nI want you in my life always, ${s}. 😍\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nYou are my peace and my excitement.\nYou are my forever, ${s}. 💖\n\nWith love,\n${y}`,
      `Hi ${p} 💖,\n\nIf love had a name, it would be you.\nI promise to keep you happy, ${s}. 🍫\n\nYours,\n${y}`,
      `Dear ${p} 💝,\n\nI don’t need a perfect day, I just need you.\nBe mine ${s}. 😍\n\nLove,\n${y}`,
      `Hey ${p} 💘,\n\nYou make ordinary moments feel magical.\nI want you, ${s}. 💖\n\n— ${y}`,
      `My love ${p} 💖,\n\nYou are my favorite chapter.\nLet’s write forever together, ${s}. 🌙\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nYour presence is my happiness.\nStay with me ${s}. 💕\n\nWith all my heart,\n${y}`,
      `Hey ${p} 💖,\n\nYou’re the reason my heart smiles.\nI’ll love you ${s}. 💌\n\n— ${y}`,

      `Dear ${p} 💕,\n\nYou are my sweetest habit and my best decision.\nStay with me ${s}. 💖\n\n— ${y}`,
      `Hey ${p} 🌹,\n\nEvery heartbeat whispers your name.\nForever ${s}. 💘\n\n— ${y}`,
      `My ${p} 💖,\n\nYou make my world softer and brighter.\nAlways ${s}. ✨\n\n— ${y}`,
      `Dear ${p} 💝,\n\nYour love feels like home.\nStay mine ${s}. 💕\n\n— ${y}`,
      `Hey ${p} 💘,\n\nI want to hold your hand through everything.\nAlways ${s}. 💖\n\n— ${y}`,
      `Dear ${p} 🌙,\n\nEven silence feels beautiful with you.\nForever ${s}. 💌\n\n— ${y}`,
      `Hey ${p} 💕,\n\nYou are my peace, my love, my favorite.\nAlways ${s}. 💖\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nI love you more every day.\nForever ${s}. 💘\n\n— ${y}`,
      `Hey ${p} 💖,\n\nYou are the best part of my life.\nStay ${s}. 💌\n\n— ${y}`,
      `Dear ${p} 💝,\n\nYou are my forever kind of love.\nAlways ${s}. 💖\n\n— ${y}`,

      `Hey ${p} 💘,\n\nIf I had one wish, it would be you.\nForever ${s}. 🌹\n\n— ${y}`,
      `Dear ${p} 💖,\n\nYou make love feel easy.\nStay with me ${s}. 💕\n\n— ${y}`,
      `Hey ${p} 🌙,\n\nYour smile is my favorite place.\nAlways ${s}. 💖\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nYou are my favorite miracle.\nForever ${s}. ✨\n\n— ${y}`,
      `Hey ${p} 💝,\n\nYou are my safe place.\nAlways ${s}. 💖\n\n— ${y}`,
      `Dear ${p} 💘,\n\nYour love is my best blessing.\nForever ${s}. 💌\n\n— ${y}`,
      `Hey ${p} 💖,\n\nI want you in every lifetime.\nAlways ${s}. 🌙\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nYou make my heart feel alive.\nForever ${s}. 💕\n\n— ${y}`,
      `Hey ${p} 💝,\n\nI’ll choose you again and again.\nAlways ${s}. 💖\n\n— ${y}`,
      `Dear ${p} 💘,\n\nYou are my favorite feeling.\nForever ${s}. 💌\n\n— ${y}`,

      `Hey ${p} 💖,\n\nYou are my sweetest “yes”.\nAlways ${s}. 🌹\n\n— ${y}`,
      `Dear ${p} 🌙,\n\nYou are the love I prayed for.\nForever ${s}. 💖\n\n— ${y}`,
      `Hey ${p} 💕,\n\nYou are my heart’s favorite person.\nAlways ${s}. 💌\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nI want to love you gently and forever.\nAlways ${s}. 💖\n\n— ${y}`,
      `Hey ${p} 💘,\n\nI’m happiest when I’m with you.\nForever ${s}. ✨\n\n— ${y}`,
      `Dear ${p} 💝,\n\nYou are my favorite dream.\nAlways ${s}. 💖\n\n— ${y}`,
      `Hey ${p} 🌙,\n\nI love the way you exist.\nForever ${s}. 💌\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nMy heart belongs to you.\nAlways ${s}. 💕\n\n— ${y}`,
      `Hey ${p} 💖,\n\nYou make everything feel right.\nForever ${s}. 💘\n\n— ${y}`,
      `Dear ${p} 💝,\n\nI want you, only you.\nAlways ${s}. 💌\n\n— ${y}`,

      `Hey ${p} 💘,\n\nYou’re my forever favorite.\nAlways ${s}. 🌹\n\n— ${y}`,
      `Dear ${p} 💖,\n\nYou are my best reason to smile.\nForever ${s}. 💕\n\n— ${y}`,
      `Hey ${p} 🌙,\n\nYou’re my peace and my passion.\nAlways ${s}. 💌\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nYou are the love I never want to lose.\nForever ${s}. 💖\n\n— ${y}`,
      `Hey ${p} 💝,\n\nI’m grateful for you.\nAlways ${s}. 💘\n\n— ${y}`,
      `Dear ${p} 💖,\n\nYou are my forever home.\nAlways ${s}. 💌\n\n— ${y}`,
      `Hey ${p} 💕,\n\nYou’re the best thing I found.\nForever ${s}. 🌹\n\n— ${y}`,
      `Dear ${p} 💘,\n\nI love you endlessly.\nAlways ${s}. 💖\n\n— ${y}`,
      `Hey ${p} 🌙,\n\nYou are my forever choice.\nAlways ${s}. 💌\n\n— ${y}`,
      `Dear ${p} 💝,\n\nYou are my Valentine forever.\nAlways ${s}. 💖\n\n— ${y}`
    ],

    funny: [
      `Hey ${p} 😆💘,\n\nI tried to be serious...\nBut then I remembered I'm too cute 😌😂\nBe my Valentine ${s}!\n\n— ${y}`,
      `Dear ${p} 🍫,\n\nYou stole my heart.\nReturn it or marry me 😭💍\n\nYours,\n${y}`,
      `Hey ${p} 😍,\n\nIf you say NO, my NO button will also run away 😆\nSay YES ${s}!\n\n— ${y}`,
      `Hi ${p} 💖,\n\nYou + Me = 100% love.\nMath never lies 😌📌\n\n— ${y}`,
      `Dear ${p} 😂💌,\n\nI love you more than WiFi.\nAnd that’s serious love.\n\n— ${y}`,
      `Hey ${p} 😆,\n\nBe mine ${s} or I’ll keep sending you memes forever 😭💖\n\n— ${y}`,
      `Hi ${p} 🍫💘,\n\nYou are my favorite addiction.\nNo rehab needed 😌😂\n\n— ${y}`,
      `Dear ${p} 😍,\n\nIf loving you is a crime,\nI’m guilty ${s} 🔥\n\n— ${y}`,
      `Hey ${p} 😆💝,\n\nI’m not a photographer,\nBut I can picture us together 😭📸\n\n— ${y}`,
      `Hi ${p} 💖,\n\nYour smile = my weakness.\nStop being so cute ${s} 😭😍\n\n— ${y}`,

      `Hey ${p} 😂,\n\nI love you more than pizza.\nAnd that’s dangerous love 🍕💖\n\n— ${y}`,
      `Dear ${p} 😆,\n\nYou’re my favorite distraction.\nStay ${s} 😌💘\n\n— ${y}`,
      `Hi ${p} 💘,\n\nIf you were a bug,\nI’d still love you 😭😂\n\n— ${y}`,
      `Hey ${p} 😍,\n\nYou are my type.\nEven without CSS 😆💖\n\n— ${y}`,
      `Dear ${p} 😂,\n\nI’m falling for you like slow internet.\nStill falling 😭💘\n\n— ${y}`,
      `Hey ${p} 😆,\n\nBe my Valentine or I’ll spam hearts 💖💖💖\n\n— ${y}`,
      `Hi ${p} 💝,\n\nYou make me smile like an idiot 😭😍\n\n— ${y}`,
      `Dear ${p} 😌,\n\nI’m yours.\nNo return policy.\n${s} 💘\n\n— ${y}`,
      `Hey ${p} 😂💖,\n\nI love you more than my phone battery 🔋💘\n\n— ${y}`,
      `Hi ${p} 😆,\n\nYou’re my favorite human.\nDon’t tell others 😭💖\n\n— ${y}`,

      `Dear ${p} 🍫,\n\nI want you more than chocolate.\nOk maybe equal 😌😂\n\n— ${y}`,
      `Hey ${p} 😍,\n\nIf you’re the problem,\nI don’t want the solution 😭💖\n\n— ${y}`,
      `Hi ${p} 😂,\n\nYou’re my heart’s password 🔐💘\n\n— ${y}`,
      `Dear ${p} 😆,\n\nI love you like weekends.\nForever ${s} 😍\n\n— ${y}`,
      `Hey ${p} 💖,\n\nYou’re my favorite notification.\nPing me ${s} 😆\n\n— ${y}`,
      `Hi ${p} 😍,\n\nBe mine or I’ll keep being cute 😌💘\n\n— ${y}`,
      `Dear ${p} 😂💝,\n\nI’m addicted to you.\nNo cure needed 😭💖\n\n— ${y}`,
      `Hey ${p} 😆,\n\nIf love is dumb,\nI’m dumb for you 😭💘\n\n— ${y}`,
      `Hi ${p} 💘,\n\nYou are my favorite vibe.\nStay ${s} 😍\n\n— ${y}`,
      `Dear ${p} 😆,\n\nI love you more than my sleep 😭💖\n\n— ${y}`,

      `Hey ${p} 😂,\n\nYou’re my daily dose of happiness.\nNo doctor needed 😭💖\n\n— ${y}`,
      `Dear ${p} 😍,\n\nIf kisses were currency,\nI’d be a billionaire 😭💘\n\n— ${y}`,
      `Hi ${p} 😆,\n\nI like you more than my gaming time.\nThat’s huge 😭🎮💖\n\n— ${y}`,
      `Hey ${p} 💘,\n\nYou are my favorite bug in my code.\nNever fix it 😭😂\n\n— ${y}`,
      `Dear ${p} 😆,\n\nMy heart is yours.\nNo OTP required 😭💖\n\n— ${y}`,
      `Hi ${p} 😂,\n\nI’m yours like a playlist on repeat.\nForever ${s} 🎶💘\n\n— ${y}`,
      `Hey ${p} 😍,\n\nYou’re my favorite “problem”\nI never want to solve 😭💖\n\n— ${y}`,
      `Dear ${p} 😆,\n\nYou’re my reason to check my phone 😭💖\n\n— ${y}`,
      `Hi ${p} 😂💘,\n\nIf you smile once,\nI’ll fall twice 😭😍\n\n— ${y}`,
      `Hey ${p} 💖,\n\nYou’re my favorite kind of trouble 😆\n\n— ${y}`,

      `Dear ${p} 😍,\n\nIf you were coffee,\nI’d be addicted forever ☕💖\n\n— ${y}`,
      `Hey ${p} 😂,\n\nI love you more than “skip ad” button 😭💘\n\n— ${y}`,
      `Hi ${p} 😆,\n\nBe mine ${s} or I’ll steal your fries 🍟💖\n\n— ${y}`,
      `Dear ${p} 💘,\n\nYou’re my favorite app.\nNo uninstall allowed 😭😂\n\n— ${y}`,
      `Hey ${p} 😍,\n\nIf love was a game,\nI’d choose you every round 🎮💖\n\n— ${y}`,
      `Hi ${p} 😂,\n\nYou’re my crush, my snack, my everything 🍫💘\n\n— ${y}`,
      `Dear ${p} 😆,\n\nI love you more than my OTP messages 😭💖\n\n— ${y}`,
      `Hey ${p} 💖,\n\nIf you say yes,\nI’ll do your homework too 😭😂\n\n— ${y}`,
      `Hi ${p} 😍,\n\nYou’re my favorite reason to be online 😭💘\n\n— ${y}`,
      `Dear ${p} 😆,\n\nYou’re my “happily ever after”\nwith extra memes 💖😂\n\n— ${y}`
    ],

    short: [
      `Hi ${p} 💕\n\nYou’re my favorite person.\nStay with me ${s}. 💖\n\n— ${y}`,
      `Hey ${p} 🍫\n\nI like you a lot.\nLike... a LOT.\n${s} 💘\n\n— ${y}`,
      `Dear ${p} 💖\n\nYou make me happy.\nThat’s it.\n${s} 😍\n\n— ${y}`,
      `Hi ${p} 🌹\n\nBe mine ${s}.\nAlways.\n\n— ${y}`,
      `Hey ${p} 💌\n\nYou’re my peace.\nMy love.\n${s} 💖\n\n— ${y}`,
      `Dear ${p} 💝\n\nMy heart says you.\n${s} 😍\n\n— ${y}`,
      `Hi ${p} 💕\n\nYou + Me = Perfect.\n${s} 💘\n\n— ${y}`,
      `Hey ${p} 😍\n\nYou’re my favorite feeling.\n${s} 💖\n\n— ${y}`,
      `Dear ${p} 🌙\n\nStay close.\nStay mine.\n${s} 💌\n\n— ${y}`,
      `Hi ${p} 💖\n\nI choose you.\n${s} 🌹\n\n— ${y}`,

      `Hey ${p} 💘\n\nJust you.\nJust me.\n${s} 💖\n\n— ${y}`,
      `Dear ${p} 💕\n\nYou are my home.\n${s} 💌\n\n— ${y}`,
      `Hi ${p} 🌹\n\nI want you.\nAlways.\n${s} 💖\n\n— ${y}`,
      `Hey ${p} 💖\n\nMy favorite.\nMy love.\n${s} 💘\n\n— ${y}`,
      `Dear ${p} 💝\n\nForever starts now.\n${s} 😍\n\n— ${y}`,
      `Hi ${p} 💕\n\nStay mine.\nAlways.\n${s} 💖\n\n— ${y}`,
      `Hey ${p} 💌\n\nYou are enough.\n${s} 💘\n\n— ${y}`,
      `Dear ${p} 🌙\n\nYou are my calm.\n${s} 💖\n\n— ${y}`,
      `Hi ${p} 💖\n\nMy heart = you.\n${s} 💕\n\n— ${y}`,
      `Hey ${p} 🌹\n\nI’m yours.\n${s} 💌\n\n— ${y}`,

      `Dear ${p} 💘\n\nJust love.\nJust us.\n${s} 💖\n\n— ${y}`,
      `Hi ${p} 💝\n\nYou’re my favorite.\n${s} 😍\n\n— ${y}`,
      `Hey ${p} 💕\n\nBe mine.\n${s} 💖\n\n— ${y}`,
      `Dear ${p} 🌹\n\nMy forever.\n${s} 💌\n\n— ${y}`,
      `Hi ${p} 💖\n\nAlways you.\n${s} 💘\n\n— ${y}`,
      `Hey ${p} 💕\n\nMy smile = you.\n${s} 💖\n\n— ${y}`,
      `Dear ${p} 💌\n\nStay close.\n${s} 💘\n\n— ${y}`,
      `Hi ${p} 🌙\n\nMy favorite feeling.\n${s} 💖\n\n— ${y}`,
      `Hey ${p} 💝\n\nYou are my love.\n${s} 💕\n\n— ${y}`,
      `Dear ${p} 💖\n\nForever yours.\n${s} 💌\n\n— ${y}`,

      `Hey ${p} 💘\n\nYou’re my best choice.\n${s} 💖\n\n— ${y}`,
      `Dear ${p} 💕\n\nMy heart says yes.\n${s} 😍\n\n— ${y}`,
      `Hi ${p} 🌹\n\nBe my Valentine.\n${s} 💌\n\n— ${y}`,
      `Hey ${p} 💖\n\nOnly you.\n${s} 💘\n\n— ${y}`,
      `Dear ${p} 🌙\n\nMy favorite person.\n${s} 💖\n\n— ${y}`,
      `Hi ${p} 💝\n\nAlways mine.\n${s} 💌\n\n— ${y}`,
      `Hey ${p} 💕\n\nJust forever.\n${s} 💖\n\n— ${y}`,
      `Dear ${p} 💘\n\nStay with me.\n${s} 😍\n\n— ${y}`,
      `Hi ${p} 🌹\n\nI love you.\n${s} 💖\n\n— ${y}`,
      `Hey ${p} 💖\n\nYou’re my forever.\n${s} 💌\n\n— ${y}`,

      `Dear ${p} 💝\n\nYou are my peace.\n${s} 💖\n\n— ${y}`,
      `Hey ${p} 💘\n\nMy heart is yours.\n${s} 💌\n\n— ${y}`,
      `Hi ${p} 🌙\n\nJust us.\n${s} 💖\n\n— ${y}`,
      `Dear ${p} 🌹\n\nYou’re my favorite.\n${s} 💕\n\n— ${y}`,
      `Hey ${p} 💖\n\nBe mine.\n${s} 💘\n\n— ${y}`,
      `Hi ${p} 💝\n\nForever.\n${s} 💌\n\n— ${y}`,
      `Dear ${p} 💕\n\nMy love.\n${s} 💖\n\n— ${y}`,
      `Hey ${p} 🌹\n\nAlways you.\n${s} 💘\n\n— ${y}`,
      `Hi ${p} 💌\n\nStay with me.\n${s} 💖\n\n— ${y}`,
      `Dear ${p} 💘\n\nMy forever Valentine.\n${s} 💕\n\n— ${y}`
    ],

    poetic: [
      `Oh ${p} 🌙💖,\n\nYour name is poetry inside my heartbeat.\nStay with me ${s}.\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nIn every quiet moment,\nI find you in my thoughts.\n${s} 💌\n\n— ${y}`,
      `My ${p} 💕,\n\nYou are the moonlight to my night,\nThe warmth to my winter.\n${s} 🌙\n\n— ${y}`,
      `Dear ${p} 💖,\n\nLove feels like roses\nand your smile is the fragrance.\n${s} 🌹\n\n— ${y}`,
      `Oh ${p} 💝,\n\nIf my heart had a home,\nit would be you.\n${s} 💌\n\n— ${y}`,
      `Dear ${p} 🌙,\n\nYou are the calm in my chaos,\nthe song in my silence.\n${s} 💖\n\n— ${y}`,
      `My love ${p} 💘,\n\nYou are my favorite sunrise.\nMy forever sunset.\n${s} 🌅\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nEven the stars feel jealous\nwhen you smile.\n${s} ✨\n\n— ${y}`,
      `Oh ${p} 💕,\n\nYour presence is a soft melody,\nplaying in my soul.\n${s} 🎶\n\n— ${y}`,
      `Dear ${p} 💖,\n\nIn the garden of my heart,\nyou bloom the brightest.\n${s} 🌸\n\n— ${y}`,

      `Oh ${p} 🌙,\n\nYou are the wish my heart makes\nwhen the world goes silent.\n${s} 💌\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nYou are the color in my grey days,\nthe warmth in my cold nights.\n${s} 💖\n\n— ${y}`,
      `My ${p} 💕,\n\nYou are the rhythm of my heart,\nsoft and endless.\n${s} 🌙\n\n— ${y}`,
      `Dear ${p} ✨,\n\nEven the moon would trade its light\njust to see you smile.\n${s} 💖\n\n— ${y}`,
      `Oh ${p} 🌹,\n\nYou are my sweetest prayer,\nmy calm miracle.\n${s} 💌\n\n— ${y}`,
      `Dear ${p} 💖,\n\nYour love is like rain,\nsoft, healing, beautiful.\n${s} 🌧️\n\n— ${y}`,
      `My love ${p} 🌙,\n\nYou are my midnight peace,\nmy sunrise hope.\n${s} 💕\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nYou are the story my soul loves to read.\n${s} 💌\n\n— ${y}`,
      `Oh ${p} 💝,\n\nYou are my forever season,\nmy sweetest moment.\n${s} 🌸\n\n— ${y}`,
      `Dear ${p} 💖,\n\nIf love was a sky,\nyou would be my brightest star.\n${s} ✨\n\n— ${y}`,

      `Oh ${p} 🌙,\n\nYou are my softest thought,\nmy deepest feeling.\n${s} 💌\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nYou are my heart’s favorite poem.\n${s} 💖\n\n— ${y}`,
      `My ${p} 💕,\n\nYour love feels like music,\nquiet and eternal.\n${s} 🎶\n\n— ${y}`,
      `Dear ${p} ✨,\n\nYou are the magic in my ordinary life.\n${s} 💌\n\n— ${y}`,
      `Oh ${p} 🌹,\n\nYou are my calm ocean,\nmy wild storm.\n${s} 💖\n\n— ${y}`,
      `Dear ${p} 🌙,\n\nYou are my dream that never ends.\n${s} 💕\n\n— ${y}`,
      `My love ${p} 💖,\n\nYou are the light that guides my heart.\n${s} ✨\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nIn your smile, I find my peace.\n${s} 💌\n\n— ${y}`,
      `Oh ${p} 💝,\n\nYou are my forever wonder.\n${s} 💖\n\n— ${y}`,
      `Dear ${p} 🌙,\n\nYou are my love written in stars.\n${s} ✨\n\n— ${y}`,

      `Oh ${p} 🌹,\n\nYour love is the sunrise in my soul.\n${s} 💌\n\n— ${y}`,
      `Dear ${p} 💖,\n\nYou are the heartbeat of my poems.\n${s} 🌙\n\n— ${y}`,
      `My ${p} 💕,\n\nEven time slows down when I think of you.\n${s} ✨\n\n— ${y}`,
      `Dear ${p} 🌙,\n\nYou are my soft forever.\n${s} 💖\n\n— ${y}`,
      `Oh ${p} 💝,\n\nYou are the reason my heart believes.\n${s} 💌\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nIn the sky of my heart,\nyou are the brightest star.\n${s} ✨\n\n— ${y}`,
      `My love ${p} 💖,\n\nYou are the calm after every storm.\n${s} 🌙\n\n— ${y}`,
      `Dear ${p} 🌸,\n\nYour love blooms inside me.\n${s} 💌\n\n— ${y}`,
      `Oh ${p} 💕,\n\nYou are my favorite kind of forever.\n${s} 🌹\n\n— ${y}`,
      `Dear ${p} ✨,\n\nYou are my love, written gently in the stars.\n${s} 💖\n\n— ${y}`,

      `Oh ${p} 🌙,\n\nYou are the moonlight my heart waits for.\n${s} 💌\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nYour smile is a sunrise in my soul.\n${s} 💖\n\n— ${y}`,
      `My ${p} 💕,\n\nYou are my quiet miracle.\n${s} 🌙\n\n— ${y}`,
      `Dear ${p} ✨,\n\nEven the stars write your name in my sky.\n${s} 💌\n\n— ${y}`,
      `Oh ${p} 💖,\n\nYour love is the softest magic.\n${s} 🌹\n\n— ${y}`,
      `Dear ${p} 🌙,\n\nYou are my forever lullaby.\n${s} 💕\n\n— ${y}`,
      `My love ${p} 🌹,\n\nYou are the sweetest chapter of my life.\n${s} 💌\n\n— ${y}`,
      `Dear ${p} 💝,\n\nYour love is my gentle universe.\n${s} ✨\n\n— ${y}`,
      `Oh ${p} 💖,\n\nYou are the love my heart recognizes.\n${s} 🌙\n\n— ${y}`,
      `Dear ${p} 🌹,\n\nIn every breath, I find you.\n${s} 💌\n\n— ${y}`
    ]
  };
}


function typeWriter(text, speed = 12) {
  if (typingTimer) clearInterval(typingTimer);
  let i = 0;
  letterOutput.textContent = "";

  typingTimer = setInterval(() => {
    letterOutput.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typingTimer);
  }, speed);
}

generateBtn.addEventListener("click", () => {
  const y = yourName.value.trim() || "Someone";
  const p = partnerName.value.trim() || state.crush || "My Love";
  const s = specialWord.value.trim() || pickRandom(["forever", "always", "my love", "endlessly", "till infinity", "for life"]);

  const style = letterStyle.value;

  const templates = buildTemplates(y, p, s);
  const letter = pickRandom(templates[style]);

  typeWriter(letter, 12);

  state.lastLetter = letter;
  saveState();
});


copyBtn.addEventListener("click", async () => {
  const text = letterOutput.textContent.trim();
  if (!text || text.includes("will appear here")) return alert("Generate a letter first 💌");

  try {
    await navigator.clipboard.writeText(text);
    showModal("📋 Copied!", "Your love letter is copied 💖");
  } catch {
    alert("Copy failed. Please copy manually.");
  }
});


downloadBtn.addEventListener("click", () => {
  const text = letterOutput.textContent.trim();
  if (!text || text.includes("will appear here")) return alert("Generate a letter first 💌");

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "valentine-love-letter-by-nalin-tuscano.txt";
  a.click();

  URL.revokeObjectURL(url);
});


saveLetterBtn.addEventListener("click", () => {
  const text = letterOutput.textContent.trim();
  if (!text || text.includes("will appear here")) return alert("Generate a letter first 💌");

  state.savedLetter = text;
  savedLetter.textContent = text;
  saveState();

  showModal("💾 Saved!", "Your love letter is saved successfully 💖");
});


clearSavedBtn.addEventListener("click", () => {
  state.savedLetter = "";
  savedLetter.textContent = "No saved letter yet 💌";
  saveState();
});


clearBtn.addEventListener("click", () => {
  yourName.value = "";
  partnerName.value = "";
  specialWord.value = "";
  letterOutput.textContent = "Your love letter will appear here 💕";
});


galleryGrid.addEventListener("click", (e) => {
  const item = e.target.closest(".g-item");
  if (!item) return;
  const full = item.dataset.full;
  modalImg.src = full;
  imgModal.classList.remove("hidden");
});
closeImgModal.addEventListener("click", () => imgModal.classList.add("hidden"));


shareBtn.addEventListener("click", async () => {
  const shareData = {
    title: "Valentine Surprise 💖",
    text: "I made a Valentine Surprise website 😍🌹",
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      showModal("📤 Link Copied!", "Share the link with your Valentine 💖");
    }
  } catch {}
});


function confettiBlast() {
  const duration = 1200;
  const end = Date.now() + duration;

  const colors = ["#ff4d8d", "#9b5cff", "#3dd5ff", "#2effb8", "#ffd166"];

  (function frame() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = 140;
    const confetti = [];

    for (let i = 0; i < pieces; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * 40 + 10,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((c) => {
        ctx.beginPath();
        ctx.fillStyle = c.color;
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function update() {
      confetti.forEach((c) => {
        c.y += (Math.cos(c.d) + 3 + c.r / 2);
        c.x += Math.sin(c.d);
      });
    }

    function animate() {
      draw();
      update();
      if (Date.now() < end) requestAnimationFrame(animate);
      else canvas.remove();
    }

    animate();
  })();
}


function randomLovePercent(name1, name2) {
  const str = (name1 + name2).toLowerCase().replace(/\s/g, "");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % 101);
}

function loveMessage(p) {
  if (p >= 90) return "💍 Perfect match! Wedding vibes 😍💖";
  if (p >= 75) return "💘 Strong love! You both are made for each other 🌹";
  if (p >= 55) return "💕 Cute bond! Keep it strong 🍫";
  if (p >= 35) return "💌 Good start! Try more effort 😄";
  return "😆 Low love % but still possible with chocolate & care 🍫💖";
}

function animatePercent(target) {
  let current = 0;
  loveFill.style.width = "0%";
  lovePercent.innerText = "0%";

  const interval = setInterval(() => {
    current++;
    lovePercent.innerText = current + "%";
    loveFill.style.width = current + "%";

    if (current >= target) {
      clearInterval(interval);
      loveMsg.innerText = loveMessage(target);

      const resultText =
        `Name 1: ${compName1.value}\n` +
        `Name 2: ${compName2.value}\n` +
        `Love: ${target}%\n` +
        `Status: ${loveMessage(target)}`;

      localStorage.setItem("nalinLoveResult", resultText);
      savedLoveResult.innerText = resultText;
    }
  }, 15);
}

checkLoveBtn.addEventListener("click", () => {
  const n1 = compName1.value.trim();
  const n2 = compName2.value.trim();

  if (!n1 || !n2) {
    alert("Please enter both names 💞");
    return;
  }

  const percent = randomLovePercent(n1, n2);
  animatePercent(percent);
});

resetLoveBtn.addEventListener("click", () => {
  compName1.value = "";
  compName2.value = "";
  lovePercent.innerText = "0%";
  loveFill.style.width = "0%";
  loveMsg.innerText = "Enter names to check 💌";
});

clearLoveSavedBtn.addEventListener("click", () => {
  localStorage.removeItem("nalinLoveResult");
  savedLoveResult.innerText = "No saved result yet 💞";
});


let scratchCtx = null;
let isScratching = false;
let scratchedDone = false;

const scratchMessages = [
  "💌 Surprise: You are my favorite person 💖🌹",
  "😍 Surprise: You are my happiest feeling 💕",
  "🍫 Surprise: You’re sweeter than chocolate 😌",
  "💘 Surprise: I choose you every time 💖",
  "🌙 Surprise: You are my calm and my chaos ✨",
  "💝 Surprise: You make my heart smile 😭💖",
  "🌹 Surprise: My love for you is endless 💌",
  "🔥 Surprise: You are my forever crush 😍",
  "✨ Surprise: You are my lucky charm 💕",
  "💍 Surprise: One day… you’ll be mine forever 😌💖"
];

function resizeScratchCanvas() {
  const rect = scratchCanvas.getBoundingClientRect();
  scratchCanvas.width = Math.floor(rect.width);
  scratchCanvas.height = Math.floor(rect.height);
}

function drawScratchLayer() {
  if (!scratchCtx) return;

  scratchCtx.globalCompositeOperation = "source-over";
  scratchCtx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);

  scratchCtx.fillStyle = "rgba(120,120,120,0.95)";
  scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);

  scratchCtx.fillStyle = "rgba(255,255,255,0.95)";
  scratchCtx.font = "bold 20px Arial";
  scratchCtx.textAlign = "center";
  scratchCtx.textBaseline = "middle";
  scratchCtx.fillText("Scratch Here 🎁", scratchCanvas.width / 2, scratchCanvas.height / 2);
}

function scratchAt(x, y) {
  if (!scratchCtx) return;

  scratchCtx.globalCompositeOperation = "destination-out";
  scratchCtx.beginPath();
  scratchCtx.arc(x, y, 22, 0, Math.PI * 2);
  scratchCtx.fill();

  
  if (!scratchedDone) {
    scratchMessage.innerText = pickRandom(scratchMessages);
  }
}

function getScratchPercent() {
  const imgData = scratchCtx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
  let transparent = 0;

  for (let i = 3; i < imgData.data.length; i += 4) {
    if (imgData.data[i] === 0) transparent++;
  }

  const total = scratchCanvas.width * scratchCanvas.height;
  return Math.min(100, Math.floor((transparent / total) * 100));
}

function updateScratchUI() {
  const percent = getScratchPercent();
  scratchPercentEl.innerText = percent + "%";
  scratchFill.style.width = percent + "%";

  if (percent >= 55 && !scratchedDone) {
    scratchedDone = true;
    scratchMsg.innerText = "🎉 Surprise Revealed!";
    scratchFinalText.innerText = scratchMessage.innerText.trim();
    showModal("🎁 Surprise!", "You revealed the hidden message 💖✨");
  } else if (!scratchedDone) {
    scratchMsg.innerText = "Keep scratching... 💌";
  }
}

function initScratchCard() {
  if (!scratchCanvas) return;

  resizeScratchCanvas();
  scratchCtx = scratchCanvas.getContext("2d");
  scratchedDone = false;

  scratchPercentEl.innerText = "0%";
  scratchFill.style.width = "0%";
  scratchMsg.innerText = "Start scratching 🎁";
  scratchFinalText.innerText = "Not revealed yet 💌";

  scratchMessage.innerText = pickRandom(scratchMessages);

  drawScratchLayer();
}

function getPointerPos(e) {
  const rect = scratchCanvas.getBoundingClientRect();
  let clientX, clientY;

  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

scratchCanvas.addEventListener("mousedown", (e) => {
  isScratching = true;
  const pos = getPointerPos(e);
  scratchAt(pos.x, pos.y);
  updateScratchUI();
});

scratchCanvas.addEventListener("mousemove", (e) => {
  if (!isScratching) return;
  const pos = getPointerPos(e);
  scratchAt(pos.x, pos.y);
  updateScratchUI();
});

window.addEventListener("mouseup", () => {
  isScratching = false;
});

scratchCanvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  isScratching = true;
  const pos = getPointerPos(e);
  scratchAt(pos.x, pos.y);
  updateScratchUI();
}, { passive: false });

scratchCanvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!isScratching) return;
  const pos = getPointerPos(e);
  scratchAt(pos.x, pos.y);
  updateScratchUI();
}, { passive: false });

scratchCanvas.addEventListener("touchend", () => {
  isScratching = false;
});

resetScratchBtn.addEventListener("click", () => {
  initScratchCard();
});


const heartsCanvas = $("#heartsCanvas");
const ctx = heartsCanvas.getContext("2d");

let W, H;
function resizeCanvas() {
  W = heartsCanvas.width = window.innerWidth;
  H = heartsCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const heartSymbols = ["💖", "💘", "💕", "💝", "🌹", "🍫"];
const particles = [];

function spawnHeart() {
  particles.push({
    x: Math.random() * W,
    y: H + 20,
    size: Math.random() * 14 + 14,
    speed: Math.random() * 0.8 + 0.6,
    drift: Math.random() * 0.8 - 0.4,
    symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
    alpha: 1
  });
}

function animateHearts() {
  ctx.clearRect(0, 0, W, H);

  if (particles.length < 40 && Math.random() < 0.5) spawnHeart();

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.y -= p.speed * 2.2;
    p.x += p.drift;
    p.alpha -= 0.003;

    ctx.globalAlpha = Math.max(p.alpha, 0);
    ctx.font = `${p.size}px Arial`;
    ctx.fillText(p.symbol, p.x, p.y);

    if (p.y < -50 || p.alpha <= 0) particles.splice(i, 1);
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(animateHearts);
}
animateHearts();


loadState();

function applyInit() {
  if (state.theme === "light") {
    document.body.classList.add("light");
    themeBtn.innerText = "☀️";
  } else {
    document.body.classList.remove("light");
    themeBtn.innerText = "🌙";
  }

  crushName.innerText = state.crush || "My Love";
  noDodgesEl.innerText = state.noDodges;
  yesClicksEl.innerText = state.yesClicks;

  if (state.savedLetter) savedLetter.textContent = state.savedLetter;

  const oldLove = localStorage.getItem("nalinLoveResult");
  if (oldLove) savedLoveResult.innerText = oldLove;

  initScratchCard();
}
applyInit();
