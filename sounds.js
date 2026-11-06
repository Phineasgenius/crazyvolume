// sounds.js — Sound Engine for Emotional Damage Calculator
// Features real Steven He clips ("EMOTIONAL DAMAGE!" & "FAILURE!") with Web Audio API synthesizers

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

// Helper to play real audio clips with high responsiveness
function playClip(dataUri, fallbackFile) {
  try {
    const src = (typeof dataUri !== 'undefined' && dataUri) ? dataUri : fallbackFile;
    if (!src) return false;
    const a = new Audio(src);
    a.volume = 1.0;
    const p = a.play();
    if (p && p.catch) {
      p.catch(e => console.warn('Audio play notice:', e));
    }
    return true;
  } catch (err) {
    console.warn('Clip error:', err);
    return false;
  }
}

// EMOTIONAL DAMAGE — Real Steven He audio clip
function playEmotionalDamage() {
  const played = playClip(typeof SOUND_EMOTIONAL_DAMAGE !== 'undefined' ? SOUND_EMOTIONAL_DAMAGE : null, 'emotional_damage.mp3');
  if (!played) {
    playEmotionalDamageSynth();
  }
}

// FAILURE — Real Steven He audio clip
function playFailure() {
  const played = playClip(typeof SOUND_FAILURE !== 'undefined' ? SOUND_FAILURE : null, 'failure.mp3');
  if (!played) {
    playFailureSynth();
  }
}

// CALCULATOR SHAME — Plays "FAILURE!" plus harsh warning buzzers
function playCalculatorShame() {
  playClip(typeof SOUND_FAILURE !== 'undefined' ? SOUND_FAILURE : null, 'failure.mp3');
  try {
    const c = getCtx();
    const now = c.currentTime;
    for (let i = 0; i < 3; i++) {
      playTone(80, 'square', 0.15, 0.6, now + i * 0.2, c);
    }
  } catch (e) {}
}

// FALLBACK SYNTH — EMOTIONAL DAMAGE
function playEmotionalDamageSynth() {
  try {
    const c = getCtx();
    const now = c.currentTime;

    playTone(55, 'sine', 1.2, 0.9, now, c);
    playTone(55, 'sawtooth', 0.3, 0.4, now, c);
    playTone(220, 'sawtooth', 0.5, 0.6, now, c);
    playTone(277, 'sawtooth', 0.5, 0.5, now + 0.05, c);

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
  } catch (e) {}
}

// FALLBACK SYNTH — FAILURE
function playFailureSynth() {
  try {
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
  } catch (e) {}
}

// VINE BOOM — deep sub bass explosion
function playVineBoom() {
  try {
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

    const buf = c.createBuffer(1, Math.floor(c.sampleRate * 0.1), c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.02));
    const src = c.createBufferSource();
    src.buffer = buf;
    const g2 = c.createGain();
    g2.gain.value = 0.6;
    src.connect(g2);
    g2.connect(c.destination);
    src.start(now);
  } catch (e) {}
}

// BRAINROT / SKIBIDI — chaotic synth riff
function playBrainrot() {
  try {
    const c = getCtx();
    const now = c.currentTime;
    const notes = [523, 659, 784, 659, 523, 440, 523, 659];
    notes.forEach((freq, i) => {
      playTone(freq, 'square', 0.12, 0.3, now + i * 0.1, c);
      playTone(freq * 0.5, 'sine', 0.12, 0.2, now + i * 0.1, c);
    });
  } catch (e) {}
}

// CELEBRATION — tiny jingle
function playCelebration() {
  try {
    const c = getCtx();
    const now = c.currentTime;
    const melody = [523, 659, 784, 1047];
    melody.forEach((freq, i) => {
      playTone(freq, 'sine', 0.15, 0.5, now + i * 0.12, c);
      playTone(freq * 1.5, 'sine', 0.08, 0.3, now + i * 0.12, c);
    });
  } catch (e) {}
}

// NPC SOUND — robotic beeps
function playNPC() {
  try {
    const c = getCtx();
    const now = c.currentTime;
    [800, 900, 850].forEach((freq, i) => {
      playTone(freq, 'square', 0.07, 0.3, now + i * 0.09, c);
    });
  } catch (e) {}
}

// RIZZ CHECK — smooth descending lick
function playRizzCheck() {
  try {
    const c = getCtx();
    const now = c.currentTime;
    [659, 587, 523, 494, 440].forEach((freq, i) => {
      playTone(freq, 'triangle', 0.2, 0.3, now + i * 0.1, c);
    });
  } catch (e) {}
}

// OH NO — ascending panic
function playOhNo() {
  try {
    const c = getCtx();
    const now = c.currentTime;
    [300, 400, 550, 750, 1000].forEach((freq, i) => {
      playTone(freq, 'sine', 0.1, 0.4, now + i * 0.07, c);
    });
  } catch (e) {}
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

// Unlock audio context on user gesture
document.addEventListener('pointerdown', () => {
  if (ctx && ctx.state === 'suspended') ctx.resume();
}, { once: false });
