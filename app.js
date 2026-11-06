// app.js — Emotional Damage / Aura Loss Calculator Logic

// ── STATE ──
const state = {
  selectedIncidents: new Set(),
  witnesses: 1,
  timeMultiplier: 1,
  recorded: false,
  mathFailures: 0,
  mathPassed: 0,
  calcShameTimes: 0,
  gauntletDone: false,
  currentDamage: 0,
};

// ── INCIDENTS ──
const INCIDENTS = [
  { id: 'tripped_public', icon: '🏃', text: 'Tripped in public', dmg: 25 },
  { id: 'called_mom', icon: '👩‍🏫', text: 'Called teacher "Mom"', dmg: 40 },
  { id: 'wrong_text', icon: '📱', text: 'Sent risky text to wrong person', dmg: 60 },
  { id: 'autocorrect', icon: '💬', text: 'Autocorrect ruined your life', dmg: 20 },
  { id: 'laughed_alone', icon: '😂', text: 'Laughed at your own joke. Alone.', dmg: 30 },
  { id: 'waved_back_wrong', icon: '👋', text: 'Waved back at someone waving at someone else', dmg: 35 },
  { id: 'mispronounced', icon: '🗣️', text: 'Confidently mispronounced a word', dmg: 22 },
  { id: 'forgot_name', icon: '🧠', text: 'Forgot someone\'s name mid-convo', dmg: 28 },
  { id: 'silent_room', icon: '🤫', text: 'Said something weird in a silent room', dmg: 55 },
  { id: 'door_pull_push', icon: '🚪', text: 'Pulled a push door while people watched', dmg: 18 },
  { id: 'mic_still_on', icon: '🎤', text: 'Mic was on the whole meeting', dmg: 70 },
  { id: 'snort_laugh', icon: '🐷', text: 'Snort-laughed in public', dmg: 32 },
  { id: 'tripped_stairs', icon: '🪜', text: 'Tripped going UP the stairs', dmg: 38 },
  { id: 'replied_all', icon: '📧', text: '"Reply All" catastrophe', dmg: 65 },
  { id: 'bathroom_mic', icon: '🚽', text: 'Bathroom noises on a call', dmg: 80 },
  { id: 'wrong_name', icon: '😬', text: 'Called someone by the wrong name twice', dmg: 42 },
  { id: 'food_face', icon: '🍝', text: 'Had food on your face the whole time', dmg: 45 },
  { id: 'silent_fart', icon: '💨', text: 'The silence broke. So did your aura.', dmg: 90 },
  { id: 'answered_question', icon: '📚', text: 'Answered a rhetorical question seriously', dmg: 25 },
  { id: 'overshared', icon: '😳', text: 'Overshared with a near-stranger', dmg: 35 },
  { id: 'missed_highfive', icon: '✋', text: 'Left someone hanging on a high five', dmg: 48 },
  { id: 'umbrella_inside', icon: '☂️', text: 'Opened umbrella inside like a cursed person', dmg: 15 },
  { id: 'sat_wrong_bus', icon: '🚌', text: 'Rode the wrong bus for 40 minutes', dmg: 20 },
  { id: 'talking_to_mannequin', icon: '🪆', text: 'Talked to a mannequin thinking it was a person', dmg: 55 },
];

// ── SARCASTIC REMARKS ──
const REMARKS = [
  "Your ancestors are physically cringing from beyond the grave.",
  "Local scientists have classified your aura as 'negative'. Not even zero. Negative.",
  "The main character energy has officially left the chat.",
  "You have entered what experts call the 'walking L' zone.",
  "A moment of silence for the rizz you once had.",
  "Your sigma grindset has detected critical failure. Please reinstall personality.",
  "Even your imaginary friends are embarrassed.",
  "The government should give you an apology for this experience.",
  "Studies show 97% of people who experienced this never recovered fully.",
  "Statistically speaking, you're down bad. Medically speaking, you're cooked.",
  "Your confidence has been downgraded from 'main character' to 'background NPC'.",
  "In an alternate universe, you handled that well. Unfortunately, you don't live there.",
  "Your aura just texted asking for a restraining order.",
  "Somewhere, a cactus is thriving better than your social life.",
  "The universe personally delivered this L just for you. Congratulations.",
  "Your vibes are on life support. The doctor says 'yikes'.",
  "History books will describe this era as the Great Aura Recession of your lifetime.",
  "Local teen discovers what it feels like to be a background character. More at 11.",
  "Your emotional support water bottle is considering leaving you.",
  "The ghost of social skills past has filed a missing persons report.",
];

// ── RECOVERY ESTIMATES ──
const RECOVERY_TIMES = [
  { max: 20, time: '3-5 business days', therapy: 'Minimal', survival: '99%' },
  { max: 40, time: '2-4 weeks', therapy: 'Recommended', survival: '94%' },
  { max: 60, time: '3-6 months', therapy: 'Strongly advised', survival: '82%' },
  { max: 80, time: '1-3 years', therapy: 'Mandatory', survival: '61%' },
  { max: 95, time: '7-15 years', therapy: 'Emergency session NOW', survival: '34%' },
  { max: 101, time: '47 years minimum', therapy: 'Live-in facility', survival: '12%' },
];

// ── SIGMA TITLES ──
const SIGMA_TITLES = [
  { max: 20, title: 'Slight Fumble', emoji: '😐' },
  { max: 40, title: 'Moderate L Enjoyer', emoji: '😬' },
  { max: 60, title: 'Certified NPC', emoji: '🤖' },
  { max: 75, title: 'Aura Bankrupt', emoji: '📉' },
  { max: 88, title: 'Living W-Risk', emoji: '☠️' },
  { max: 101, title: 'FULLY COOKED', emoji: '🔥' },
];

// ── MATH CHALLENGES ──
function generateMathQuestion() {
  const type = Math.floor(Math.random() * 6);
  let question, answer, hint;

  switch (type) {
    case 0: { // Multiplication
      const a = Math.floor(Math.random() * 90) + 11;
      const b = Math.floor(Math.random() * 90) + 11;
      question = `${a} × ${b} = ?`;
      answer = a * b;
      hint = 'Multiply. No calculator. Good luck.';
      break;
    }
    case 1: { // Square root (perfect square)
      const roots = [1,4,9,16,25,36,49,64,81,100,121,144,169,196,225,256,289,324,361,400,441,484,529,576,625,676,729,784,841,900,961,1024,1089,1156,1225,1296,1369,1444,1521,1600,1681,1764,1849,1936,2025,2116,2209,2304,2401,2500];
      const sq = roots[Math.floor(Math.random() * roots.length)];
      question = `√${sq} = ?`;
      answer = Math.round(Math.sqrt(sq));
      hint = 'What number times itself equals that?';
      break;
    }
    case 2: { // Percentage
      const pct = [7, 11, 13, 17, 19, 23, 37, 43, 67, 73, 83];
      const p = pct[Math.floor(Math.random() * pct.length)];
      const n = Math.floor(Math.random() * 800) + 100;
      question = `${p}% of ${n} = ?`;
      answer = Math.round((p / 100) * n);
      hint = 'Round to nearest whole number.';
      break;
    }
    case 3: { // Division
      const divisors = [7, 8, 9, 11, 13, 14, 17, 19];
      const d = divisors[Math.floor(Math.random() * divisors.length)];
      const result = Math.floor(Math.random() * 80) + 10;
      question = `${d * result} ÷ ${d} = ?`;
      answer = result;
      hint = 'Exact division. Integer answer.';
      break;
    }
    case 4: { // Power
      const bases = [2,3,4,5,6,7,8,9,10,11,12];
      const b = bases[Math.floor(Math.random() * bases.length)];
      const exp = Math.floor(Math.random() * 3) + 2;
      question = `${b}^${exp} = ?`;
      answer = Math.pow(b, exp);
      hint = `${b} to the power of ${exp}`;
      break;
    }
    default: { // Mixed arithmetic
      const a = Math.floor(Math.random() * 500) + 100;
      const b = Math.floor(Math.random() * 500) + 100;
      const c = Math.floor(Math.random() * 100) + 10;
      question = `(${a} + ${b}) × ${c} = ?`;
      answer = (a + b) * c;
      hint = 'Order of operations applies.';
      break;
    }
  }

  return { question, answer: Math.round(answer), hint };
}

// ── GAUNTLET STATE ──
let gauntletTimer = null;
let currentChallenge = null;
let gauntletTimeLeft = 0;
let gauntletRound = 0;
const TOTAL_ROUNDS = 5;
const TIME_PER_ROUND = 5000;

function startGauntlet() {
  if (state.gauntletDone) {
    showToast('⚠️ You already suffered. +0 DMG');
    return;
  }
  gauntletRound = 0;
  state.mathFailures = 0;
  state.mathPassed = 0;
  updateGauntletScore();
  document.getElementById('gauntlet-btn').textContent = 'RUNNING...';
  document.getElementById('gauntlet-btn').disabled = true;
  nextGauntletRound();
}

function nextGauntletRound() {
  if (gauntletRound >= TOTAL_ROUNDS) {
    endGauntlet();
    return;
  }
  gauntletRound++;
  currentChallenge = generateMathQuestion();

  document.getElementById('math-question').textContent = currentChallenge.question;
  document.getElementById('math-hint').textContent = currentChallenge.hint;
  document.getElementById('math-input').value = '';
  document.getElementById('math-input').className = 'math-input';
  document.getElementById('math-result-msg').textContent = '';
  document.getElementById('math-result-msg').className = 'math-result-msg';
  document.getElementById('gauntlet-round-info').textContent = `Round ${gauntletRound} of ${TOTAL_ROUNDS}`;
  document.getElementById('math-challenge-box').classList.add('active');

  gauntletTimeLeft = TIME_PER_ROUND;
  updateTimerBar();

  clearInterval(gauntletTimer);
  gauntletTimer = setInterval(() => {
    gauntletTimeLeft -= 100;
    updateTimerBar();
    if (gauntletTimeLeft <= 0) {
      clearInterval(gauntletTimer);
      onMathTimeout();
    }
  }, 100);

  setTimeout(() => document.getElementById('math-input').focus(), 100);
}

function updateTimerBar() {
  const pct = Math.max(0, (gauntletTimeLeft / TIME_PER_ROUND) * 100);
  document.getElementById('math-timer-fill').style.width = pct + '%';
}

function submitMathAnswer() {
  const input = document.getElementById('math-input');
  const val = parseInt(input.value.trim(), 10);
  if (isNaN(val)) {
    input.classList.add('wrong');
    setTimeout(() => input.classList.remove('wrong'), 500);
    return;
  }

  clearInterval(gauntletTimer);
  updateTimerBar();

  const correct = Math.abs(val - currentChallenge.answer) <= 1; // ±1 tolerance
  const resultMsg = document.getElementById('math-result-msg');

  if (correct) {
    state.mathPassed++;
    input.classList.add('correct');
    resultMsg.textContent = '✓ CORRECT — but we expected you to fail tbh';
    resultMsg.className = 'math-result-msg pass';
    playCelebration();
    updateGauntletScore();
    setTimeout(nextGauntletRound, 1200);
  } else {
    state.mathFailures++;
    input.classList.add('wrong');
    resultMsg.textContent = `✗ WRONG — Answer was ${currentChallenge.answer}. Cooked.`;
    resultMsg.className = 'math-result-msg fail';
    playFailure();
    flashDamage();
    shakeScreen();
    showToast(`💥 MATH FAIL +${15} DMG`);
    updateGauntletScore();
    setTimeout(nextGauntletRound, 1600);
  }
}

function onMathTimeout() {
  state.mathFailures++;
  const input = document.getElementById('math-input');
  input.classList.add('wrong');
  const resultMsg = document.getElementById('math-result-msg');
  resultMsg.textContent = `⏱ TIME'S UP — It was ${currentChallenge.answer}. Too slow.`;
  resultMsg.className = 'math-result-msg fail';
  playEmotionalDamage();
  flashDamage();
  shakeScreen();
  showToast(`⏱ TOO SLOW +${15} DMG`);
  updateGauntletScore();
  setTimeout(nextGauntletRound, 1800);
}

function endGauntlet() {
  clearInterval(gauntletTimer);
  state.gauntletDone = true;
  document.getElementById('math-challenge-box').classList.remove('active');
  document.getElementById('gauntlet-btn').textContent = '✓ GAUNTLET COMPLETE';
  document.getElementById('gauntlet-btn').disabled = false;
  updateGauntletScore();

  if (state.mathFailures >= 4) {
    playVineBoom();
    showToast('🧠 BRAIN DOES NOT COMPUTE — Maximum shame applied');
  } else if (state.mathFailures === 0) {
    playCelebration();
    showToast('🤓 You passed?! Suspicious. Probably cheated.');
  } else {
    playBrainrot();
  }
}

function updateGauntletScore() {
  document.getElementById('gauntlet-fail-count').textContent = state.mathFailures;
  document.getElementById('gauntlet-pass-count').textContent = state.mathPassed;
}

// ── FAKE CALCULATOR ──
let calcDisplay = '0';
let calcHistory = '';
let calcPendingOp = null;
let calcPendingVal = null;
let calcNewInput = true;
let calcShamedThisSession = false;

function calcPress(val) {
  const c = getCtx();
  playNPC();

  if (!calcShamedThisSession) {
    calcShamedThisSession = true;
    state.calcShameTimes++;
    setTimeout(() => triggerCalculatorShame(), 300);
    return;
  }

  if (val === 'C') {
    calcDisplay = '0';
    calcHistory = '';
    calcPendingOp = null;
    calcPendingVal = null;
    calcNewInput = true;
  } else if (val === '±') {
    calcDisplay = String(parseFloat(calcDisplay) * -1);
  } else if (val === '%') {
    calcDisplay = String(parseFloat(calcDisplay) / 100);
  } else if (['+', '-', '×', '÷'].includes(val)) {
    calcPendingVal = parseFloat(calcDisplay);
    calcPendingOp = val;
    calcHistory = calcDisplay + ' ' + val;
    calcNewInput = true;
  } else if (val === '=') {
    if (calcPendingOp && calcPendingVal !== null) {
      const b = parseFloat(calcDisplay);
      let result;
      switch (calcPendingOp) {
        case '+': result = calcPendingVal + b; break;
        case '-': result = calcPendingVal - b; break;
        case '×': result = calcPendingVal * b; break;
        case '÷': result = b === 0 ? 'Error' : calcPendingVal / b; break;
      }
      calcHistory = `${calcPendingVal} ${calcPendingOp} ${b} =`;
      calcDisplay = String(typeof result === 'number' ? parseFloat(result.toFixed(8)) : result);
      calcPendingOp = null;
      calcPendingVal = null;
      calcNewInput = true;
    }
  } else if (val === '.') {
    if (!calcDisplay.includes('.')) calcDisplay += '.';
  } else {
    if (calcNewInput || calcDisplay === '0') {
      calcDisplay = val;
      calcNewInput = false;
    } else {
      if (calcDisplay.length < 12) calcDisplay += val;
    }
  }

  document.getElementById('calc-display-current').textContent = calcDisplay;
  document.getElementById('calc-display-history').textContent = calcHistory;
}

function triggerCalculatorShame() {
  const shameMessages = [
    "Using a calculator? LOL. Your IQ just left the building.",
    "Oh wow. A calculator. For THIS. You're absolutely cooked, bestie.",
    "Bro really needed a calculator. The ancestors are WEEPING.",
    "You just lost 50 Aura Points for calculator dependency. L+bozo.",
    "The speed math gauntlet exists for a REASON and you chose... this.",
    "Calculator users: same energy as asking for the answer on a crossword.",
    "Your sigma grindset has entered a negative dimension.",
    "Even NPCs do mental math faster than you apparently.",
  ];
  document.getElementById('shame-title').textContent = '🧮 CALCULATOR DETECTED';
  document.getElementById('shame-msg').textContent =
    shameMessages[Math.floor(Math.random() * shameMessages.length)] +
    ' +50 Emotional Damage applied automatically.';
  document.getElementById('shame-overlay').classList.add('active');
  playCalculatorShame();
  flashDamage();
  shakeScreen();
}

function dismissShame() {
  document.getElementById('shame-overlay').classList.remove('active');
  calcShamedThisSession = false;
  showToast('🧮 CALCULATOR SHAME +50 DMG');
}

// ── MULTIPLIERS ──
function initMultipliers() {
  const witnessSlider = document.getElementById('witness-slider');
  const witnessDisplay = document.getElementById('witness-display');
  witnessSlider.addEventListener('input', () => {
    const v = parseInt(witnessSlider.value);
    state.witnesses = v;
    witnessDisplay.textContent = v === 0 ? 'Solo (still cringe)' : v === 1 ? '1 person' : v < 10 ? `${v} people` : v < 50 ? `${v} people (oof)` : `${v}+ people (CATASTROPHIC)`;
  });

  const timeSelect = document.getElementById('time-select');
  timeSelect.addEventListener('change', () => {
    const opts = { morning: 0.8, afternoon: 1.0, school: 1.8, work: 1.5, party: 1.6, presentation: 2.0, night: 0.5 };
    state.timeMultiplier = opts[timeSelect.value] || 1.0;
  });

  const recordedToggle = document.getElementById('recorded-toggle');
  recordedToggle.addEventListener('change', () => {
    state.recorded = recordedToggle.checked;
  });
}

// ── INCIDENT BUTTONS ──
function initIncidents() {
  const grid = document.getElementById('incident-grid');
  INCIDENTS.forEach(inc => {
    const btn = document.createElement('button');
    btn.className = 'incident-btn';
    btn.dataset.id = inc.id;
    btn.innerHTML = `
      <span class="icon">${inc.icon}</span>
      <span>${inc.text}</span>
      <span class="damage-badge">-${inc.dmg} aura</span>
    `;
    btn.addEventListener('click', () => toggleIncident(inc, btn));
    grid.appendChild(btn);
  });
}

function toggleIncident(inc, btn) {
  if (state.selectedIncidents.has(inc.id)) {
    state.selectedIncidents.delete(inc.id);
    btn.classList.remove('selected');
  } else {
    state.selectedIncidents.add(inc.id);
    btn.classList.add('selected');
    playOhNo();
    flashDamage();
    showToast(`${inc.icon} -${inc.dmg} aura`);
    shakeScreen();
  }
  updateIncidentSummary();
}

function updateIncidentSummary() {
  const count = state.selectedIncidents.size;
  const totalDmg = Array.from(state.selectedIncidents)
    .reduce((sum, id) => sum + (INCIDENTS.find(i => i.id === id)?.dmg || 0), 0);
  const el = document.getElementById('incident-summary');
  if (count === 0) {
    el.innerHTML = 'No incidents selected. We know you have some.';
  } else {
    el.innerHTML = `<span class="count">${count}</span> incident${count > 1 ? 's' : ''} selected — base damage: <span class="count">${totalDmg}</span> aura pts`;
  }
}

// ── DAMAGE CALCULATION ──
function calculateDamage() {
  if (state.selectedIncidents.size === 0 && state.mathFailures === 0 && state.calcShameTimes === 0) {
    showToast('⚠️ Select at least one incident first!');
    playNPC();
    return;
  }

  // Base damage from incidents
  let baseDmg = Array.from(state.selectedIncidents)
    .reduce((sum, id) => sum + (INCIDENTS.find(i => i.id === id)?.dmg || 0), 0);

  // Witness multiplier
  const witnessMult = 1 + (state.witnesses * 0.05);

  // Time multiplier
  const timeMult = state.timeMultiplier;

  // Recording multiplier
  const recMult = state.recorded ? 2.2 : 1.0;

  // Math failures
  const mathDmg = state.mathFailures * 15;

  // Calculator shame
  const calcDmg = state.calcShameTimes * 50;

  // Raw damage
  let rawDamage = (baseDmg * witnessMult * timeMult * recMult) + mathDmg + calcDmg;

  // Clamp to 0–100
  const emotionalDamage = Math.min(100, Math.round(rawDamage));
  const auraLoss = Math.min(100, Math.round(rawDamage * 0.9 + (state.mathFailures * 8)));
  const rizzRemaining = Math.max(0, 100 - Math.round(rawDamage * 0.75));
  const sigmaScore = Math.max(0, Math.round(100 - rawDamage * 0.85 + state.mathPassed * 5));

  state.currentDamage = emotionalDamage;

  displayDamageReport({ emotionalDamage, auraLoss, rizzRemaining, sigmaScore, rawDamage });
}

function displayDamageReport({ emotionalDamage, auraLoss, rizzRemaining, sigmaScore, rawDamage }) {
  // Play dramatic sound
  if (emotionalDamage >= 60) playEmotionalDamage();
  else if (emotionalDamage >= 30) playFailure();
  else playVineBoom();

  flashDamage();
  shakeScreen();

  // Show report panel
  const report = document.getElementById('damage-report');
  report.classList.add('active');

  // Animate bars after a tick
  setTimeout(() => {
    setBar('ed-bar', emotionalDamage);
    setBar('al-bar', auraLoss);
    setBar('rr-bar', rizzRemaining);
    setBar('ss-bar', sigmaScore);
  }, 100);

  // Values
  document.getElementById('ed-val').textContent = emotionalDamage + '%';
  document.getElementById('al-val').textContent = auraLoss + '%';
  document.getElementById('rr-val').textContent = rizzRemaining + '%';
  document.getElementById('ss-val').textContent = sigmaScore + '%';

  // Score cards
  const sigmaTitle = SIGMA_TITLES.find(s => emotionalDamage <= s.max) || SIGMA_TITLES[SIGMA_TITLES.length - 1];
  document.getElementById('sc-sigma-title').textContent = sigmaTitle.emoji + ' ' + sigmaTitle.title;
  document.getElementById('sc-sigma').textContent = sigmaScore;
  document.getElementById('sc-aura').textContent = '-' + auraLoss;
  document.getElementById('sc-math').textContent = `${state.mathPassed}/${TOTAL_ROUNDS}`;

  // Recovery estimate
  const rec = RECOVERY_TIMES.find(r => emotionalDamage <= r.max) || RECOVERY_TIMES[RECOVERY_TIMES.length - 1];
  document.getElementById('ri-time').textContent = rec.time;
  document.getElementById('ri-therapy').textContent = rec.therapy;
  document.getElementById('ri-survival').textContent = rec.survival;
  document.getElementById('ri-witnesses').textContent = state.witnesses === 0 ? 'Just you (cringe)' : state.witnesses.toString();

  // Report ID
  document.getElementById('report-id').textContent =
    `REPORT #${Date.now().toString(36).toUpperCase()} — ${new Date().toLocaleString()}`;

  // Sarcastic remark
  document.getElementById('sarcastic-remark').textContent =
    REMARKS[Math.floor(Math.random() * REMARKS.length)];

  // Scroll to report
  setTimeout(() => report.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);

  // Trigger extra drama for max damage
  if (emotionalDamage >= 90) {
    setTimeout(() => {
      showToast('💀 MAXIMUM EMOTIONAL DAMAGE ACHIEVED');
      setTimeout(() => playEmotionalDamage(), 500);
    }, 1500);
  }
}

function setBar(id, value) {
  document.getElementById(id).style.width = Math.min(100, value) + '%';
}

// ── EFFECTS ──
function flashDamage() {
  const el = document.getElementById('damage-flash');
  el.classList.remove('flash');
  void el.offsetWidth; // reflow
  el.classList.add('flash');
}

function shakeScreen() {
  document.body.classList.remove('shake');
  void document.body.offsetWidth;
  document.body.classList.add('shake');
  setTimeout(() => document.body.classList.remove('shake'), 500);
}

const toastContainer = document.createElement('div');
toastContainer.className = 'damage-toast';
document.body.appendChild(toastContainer);

function showToast(msg) {
  const el = document.createElement('div');
  el.className = 'toast-item';
  el.textContent = msg;
  toastContainer.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

// ── SHARE ──
function shareReport() {
  const ed = document.getElementById('ed-val').textContent;
  const al = document.getElementById('al-val').textContent;
  const rr = document.getElementById('rr-val').textContent;
  const remark = document.getElementById('sarcastic-remark').textContent;
  const text = `💀 EMOTIONAL DAMAGE REPORT\n📊 Emotional Damage: ${ed}\n👻 Aura Loss: ${al}\n✨ Rizz Remaining: ${rr}\n\n"${remark}"\n\nemotiondmg.vercel.app`;
  navigator.clipboard.writeText(text).then(() => {
    showToast('📋 Report copied to clipboard!');
    playRizzCheck();
  }).catch(() => {
    showToast('⚠️ Copy failed — your phone is as broken as your aura');
  });
}

function resetAll() {
  state.selectedIncidents.clear();
  state.witnesses = 1;
  state.timeMultiplier = 1;
  state.recorded = false;
  state.mathFailures = 0;
  state.mathPassed = 0;
  state.calcShameTimes = 0;
  state.gauntletDone = false;
  calcShamedThisSession = false;
  gauntletRound = 0;
  clearInterval(gauntletTimer);

  document.querySelectorAll('.incident-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('witness-slider').value = 1;
  document.getElementById('witness-display').textContent = '1 person';
  document.getElementById('time-select').value = 'afternoon';
  document.getElementById('recorded-toggle').checked = false;
  document.getElementById('gauntlet-btn').textContent = 'START GAUNTLET';
  document.getElementById('gauntlet-btn').disabled = false;
  document.getElementById('gauntlet-fail-count').textContent = '0';
  document.getElementById('gauntlet-pass-count').textContent = '0';
  document.getElementById('math-challenge-box').classList.remove('active');
  document.getElementById('damage-report').classList.remove('active');
  updateIncidentSummary();
  showToast('🔄 Reset. Unfortunately, the memories remain.');
}

// ── STEVEN HE FLASH OVERLAY & SUBWAY SURFERS CONTROLLER ──
let stevenTimeout = null;

function triggerStevenHeFlash() {
  const overlay = document.getElementById('steven-overlay');
  const video = document.getElementById('steven-video');
  const subwayWidget = document.getElementById('subway-widget');
  const subwayVideo = document.getElementById('subway-video');

  if (!overlay || !video) return;

  // 1. Hide Subway Surfers while Emotional Damage flashes
  if (subwayWidget) {
    subwayWidget.classList.add('damage-hidden');
    if (subwayVideo && !subwayVideo.paused) {
      subwayVideo.pause();
    }
  }

  // 2. Screen shake & red flash
  flashDamage();
  shakeScreen();

  // 3. Open Steven He overlay
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');

  // 4. Play video with sound
  video.currentTime = 0;
  video.muted = false;
  video.volume = 1.0;

  const playPromise = video.play();
  if (playPromise && playPromise.catch) {
    playPromise.catch(err => {
      console.warn('Playback notice:', err);
      video.muted = false;
      video.play().catch(() => {});
    });
  }

  if (stevenTimeout) clearTimeout(stevenTimeout);

  const closeSteven = () => {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    video.pause();

    // Restore Subway Surfers and resume playing
    if (subwayWidget) {
      subwayWidget.classList.remove('damage-hidden');
      if (subwayVideo) {
        subwayVideo.play().catch(() => {});
      }
    }
  };

  video.onended = closeSteven;

  // Fallback in case ended event doesn't fire (clip length ~3.5s)
  stevenTimeout = setTimeout(closeSteven, 4500);

  const skipBtn = document.getElementById('steven-skip-btn');
  if (skipBtn) {
    skipBtn.onclick = (e) => {
      e.stopPropagation();
      closeSteven();
    };
  }

  overlay.onclick = (e) => {
    if (e.target === overlay || e.target.classList.contains('steven-backdrop')) {
      closeSteven();
    }
  };
}

// ── SUBWAY SURFERS WIDGET MANAGER ──
const SUBWAY_TICKERS = [
  "Subway Surfers preventing dopamine bankruptcy...",
  "Attention span maintained: 3.4 seconds 🏃",
  "Keep watching trains to survive the cringe...",
  "Subway Surfers carrying your mental health right now",
  "Subway Surfers sensory overload: ACTIVE",
  "Dopamine drip feed online... Don't blink!",
  "Brainrot level: MAXIMUM OVERDRIVE ⚡",
  "Certified subway surfer sigma grindset 🛹",
];

function initSubwaySurfers() {
  const widget = document.getElementById('subway-widget');
  const video = document.getElementById('subway-video');
  const muteBtn = document.getElementById('subway-audio-toggle');
  const toggleBtn = document.getElementById('subway-toggle-btn');
  const dopamineEl = document.getElementById('subway-dopamine');
  const tickerEl = document.getElementById('subway-ticker-text');

  if (!widget || !video) return;

  // Ensure autoplay starts
  video.play().catch(() => {
    const unlock = () => {
      video.play().catch(() => {});
      window.removeEventListener('pointerdown', unlock);
    };
    window.addEventListener('pointerdown', unlock);
  });

  // Sound toggle
  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      muteBtn.textContent = video.muted ? '🔇' : '🔊';
      muteBtn.title = video.muted ? 'Unmute' : 'Mute';
      showToast(video.muted ? '🔇 Subway Surfers Muted' : '🔊 Subway Surfers Audio Active');
    });
  }

  // Minimize / Expand
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMin = widget.classList.toggle('minimized');
      toggleBtn.textContent = isMin ? '+' : '−';
      toggleBtn.title = isMin ? 'Expand' : 'Minimize';
    });
  }

  // Restore if clicked while minimized
  widget.addEventListener('click', () => {
    if (widget.classList.contains('minimized')) {
      widget.classList.remove('minimized');
      if (toggleBtn) toggleBtn.textContent = '−';
    }
  });

  // Rotating ticker
  let tickerIdx = 0;
  setInterval(() => {
    tickerIdx = (tickerIdx + 1) % SUBWAY_TICKERS.length;
    if (tickerEl) tickerEl.textContent = SUBWAY_TICKERS[tickerIdx];

    if (dopamineEl) {
      const dop = (98.5 + Math.random() * 1.4).toFixed(1);
      dopamineEl.textContent = `DOPAMINE: ${dop}%`;
    }
  }, 3500);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initIncidents();
  initMultipliers();
  initSubwaySurfers();

  document.getElementById('gauntlet-btn').addEventListener('click', startGauntlet);
  document.getElementById('math-submit-btn').addEventListener('click', submitMathAnswer);
  document.getElementById('math-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitMathAnswer();
  });
  document.getElementById('calculate-btn').addEventListener('click', calculateDamage);
  document.getElementById('shame-dismiss').addEventListener('click', dismissShame);
  document.getElementById('share-btn').addEventListener('click', shareReport);
  document.getElementById('reset-btn').addEventListener('click', resetAll);

  // Trigger buttons for Steven He clip
  const testDamageBtn = document.getElementById('test-damage-btn');
  if (testDamageBtn) {
    testDamageBtn.addEventListener('click', () => {
      triggerStevenHeFlash();
      showToast('💥 STEVEN HE: EMOTIONAL DAMAGE!');
    });
  }

  const titleTrigger = document.getElementById('site-title-trigger');
  if (titleTrigger) {
    titleTrigger.addEventListener('click', () => {
      triggerStevenHeFlash();
    });
  }

  updateIncidentSummary();

  // Anti-cheat: DevTools open detection (basic)
  let devtoolsOpen = false;
  const threshold = 160;
  setInterval(() => {
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;
    if ((widthDiff || heightDiff) && !devtoolsOpen) {
      devtoolsOpen = true;
      state.calcShameTimes++;
      document.getElementById('shame-title').textContent = '🔍 DEVTOOLS DETECTED';
      document.getElementById('shame-msg').textContent =
        'You opened DevTools. We see you. We ALWAYS see you. +50 Emotional Damage for the audacity of trying to inspect-element your way to a better score. COOKED.';
      document.getElementById('shame-overlay').classList.add('active');
      playCalculatorShame();
      flashDamage();
    } else if (!widthDiff && !heightDiff) {
      devtoolsOpen = false;
    }
  }, 1000);
});
