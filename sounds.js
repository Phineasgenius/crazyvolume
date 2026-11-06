// sounds.js — Web Audio API Sound Engine for Emotional Damage Calculator
// All sounds are synthesized — no external files needed

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx = null;

function getCtx() {
  if (!ctx) ctx = new AudioCtx();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function playTone(freq, type, duration, vol, startTime, ctx) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(vol, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

// EMOTIONAL DAMAGE — dramatic orchestral stab + pitched descending synth
function playEmotionalDamage() {
  const c = getCtx();
  const now = c.currentTime;

  // Deep bass hit
  playTone(55, 'sine', 1.2, 0.9, now, c);
  playTone(55, 'sawtooth', 0.3, 0.4, now, c);

  // Mid stab
  playTone(220, 'sawtooth', 0.5, 0.6, now, c);
  playTone(277, 'sawtooth', 0.5, 0.5, now + 0.05, c);

  // High screech descending (voice-like "emotional damage" approximation)
  const osc = c.createOscillator();
  const gain = c.createGain();
  const dist = c.createWaveShaper();
  dist.curve = makeDistortionCurve(300);
  osc.connect(dist);
  dist.connect(gain);
  gain.connect(c.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(600, now + 0.3);
  osc.frequency.exponentialRampToValueAtTime(80, now + 1.4);
  gain.gain.setValueAtTime(0.5, now + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
  osc.start(now + 0.3);
  osc.stop(now + 1.5);

  // Reverb-ish repeats
  [0.1, 0.2, 0.35].forEach((delay, i) => {
    playTone(110 - i * 10, 'sine', 0.4, 0.3 - i * 0.08, now + delay, c);
  });
}

// VINE BOOM — deep sub bass explosion
function playVineBoom() {
  const c = getCtx();
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(20, now + 0.8);
  gain.gain.setValueAtTime(1.0, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
  osc.start(now);
  osc.stop(now + 0.9);

  // Add crunch layer
  const buf = c.createBuffer(1, c.sampleRate * 0.1, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.02));
  const src = c.createBufferSource();
  src.buffer = buf;
  const g2 = c.createGain();
  g2.gain.value = 0.6;
  src.connect(g2);
  g2.connect(c.destination);
  src.start(now);
}

// BRAINROT / SKIBIDI — chaotic synth riff
function playBrainrot() {
  const c = getCtx();
  const now = c.currentTime;
  const notes = [523, 659, 784, 659, 523, 440, 523, 659];
  notes.forEach((freq, i) => {
    playTone(freq, 'square', 0.12, 0.3, now + i * 0.1, c);
    playTone(freq * 0.5, 'sine', 0.12, 0.2, now + i * 0.1, c);
  });
}

// FAILURE — sad trombone / game over
function playFailure() {
  const c = getCtx();
  const now = c.currentTime;
  const notes = [466, 440, 415, 392];
  notes.forEach((freq, i) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now + i * 0.3);
    osc.frequency.setValueAtTime(freq * 0.98, now + i * 0.3 + 0.1);
    gain.gain.setValueAtTime(0.4, now + i * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.3 + 0.28);
    osc.start(now + i * 0.3);
    osc.stop(now + i * 0.3 + 0.3);
  });
}

// CALCULATOR SHAME — dramatic buzzer + shame chord
function playCalculatorShame() {
  const c = getCtx();
  const now = c.currentTime;

  // Harsh buzzer
  for (let i = 0; i < 3; i++) {
    playTone(80, 'square', 0.15, 0.7, now + i * 0.2, c);
  }

  // Shame descending chord
  [220, 185, 155, 130].forEach((freq, i) => {
    playTone(freq, 'sawtooth', 0.5, 0.4, now + 0.7 + i * 0.15, c);
  });
}

// CELEBRATION — tiny jingle (very rare)
function playCelebration() {
  const c = getCtx();
  const now = c.currentTime;
  const melody = [523, 659, 784, 1047];
  melody.forEach((freq, i) => {
    playTone(freq, 'sine', 0.15, 0.5, now + i * 0.12, c);
    playTone(freq * 1.5, 'sine', 0.08, 0.3, now + i * 0.12, c);
  });
}

// NPC SOUND — robotic beeps
function playNPC() {
  const c = getCtx();
  const now = c.currentTime;
  [800, 900, 850].forEach((freq, i) => {
    playTone(freq, 'square', 0.07, 0.3, now + i * 0.09, c);
  });
}

// RIZZ CHECK — smooth descending lick
function playRizzCheck() {
  const c = getCtx();
  const now = c.currentTime;
  [659, 587, 523, 494, 440].forEach((freq, i) => {
    playTone(freq, 'triangle', 0.2, 0.3, now + i * 0.1, c);
  });
}

// OH NO — ascending panic
function playOhNo() {
  const c = getCtx();
  const now = c.currentTime;
  [300, 400, 550, 750, 1000].forEach((freq, i) => {
    playTone(freq, 'sine', 0.1, 0.4, now + i * 0.07, c);
  });
}

// DISTORTION curve helper
function makeDistortionCurve(amount) {
  const n = 256, curve = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

// Resume audio context on first user interaction
document.addEventListener('click', () => { if (ctx && ctx.state === 'suspended') ctx.resume(); }, { once: false });
