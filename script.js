/* ─────────────────────────────────────────
   PORTFOLIO LAIN — main.js
   ───────────────────────────────────────── */

// ── CURSOR ──────────────────────────────────
const cur = document.getElementById('cur');

document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX - 9 + 'px';
  cur.style.top  = e.clientY - 9 + 'px';
});

// Scale up cursor on interactive elements
document.querySelectorAll(
  'a, button, .proj-card, .stat-item, .skill-panel, .lang-card, .exp-item, .form-item'
).forEach(el => {
  el.addEventListener('mouseenter', () => cur.style.transform = 'scale(1.8)');
  el.addEventListener('mouseleave', () => cur.style.transform = 'scale(1)');
});


// ── NOISE CANVAS ────────────────────────────
const canvas = document.getElementById('noise');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawNoise() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data      = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const v    = Math.random() * 255 | 0;
    data[i]    = v;
    data[i+1]  = v;
    data[i+2]  = v;
    data[i+3]  = 255;
  }

  ctx.putImageData(imageData, 0, 0);
  requestAnimationFrame(drawNoise);
}
drawNoise();


// ── WIRED BACKGROUND LINES ──────────────────
const wbg = document.getElementById('wbg');

const hLines = [
  { top: '18%', dur: '20s', del: '0s'  },
  { top: '42%', dur: '26s', del: '4s'  },
  { top: '67%', dur: '16s', del: '8s'  },
  { top: '82%', dur: '22s', del: '2s'  },
];

const vLines = [
  { left: '12%', dur: '24s', del: '3s' },
  { left: '38%', dur: '32s', del: '9s' },
  { left: '63%', dur: '18s', del: '5s' },
  { left: '85%', dur: '28s', del: '1s' },
];

hLines.forEach(l => {
  const el = document.createElement('div');
  el.className = 'wl';
  el.style.top             = l.top;
  el.style.animationDuration = l.dur;
  el.style.animationDelay  = l.del;
  wbg.appendChild(el);
});

vLines.forEach(l => {
  const el = document.createElement('div');
  el.className = 'wl v';
  el.style.left            = l.left;
  el.style.animationDuration = l.dur;
  el.style.animationDelay  = l.del;
  wbg.appendChild(el);
});


// ── SCROLL REVEAL ───────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
    }
  });
}, {
  threshold:   0.08,
  rootMargin: '0px 0px -20px 0px',
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ── GLITCH SYSLOG ───────────────────────────
// Randomly corrupts a character in the hero boot log lines
const glitchChars = '!@#$%^&*<>/\\|~░▒▓';

setInterval(() => {
  const logLines = document.querySelectorAll('.sys-log div');
  if (!logLines.length) return;

  const el   = logLines[Math.floor(Math.random() * logLines.length)];
  const orig = el.innerHTML;

  let glitched = '';
  for (const ch of el.textContent) {
    glitched += Math.random() > 0.93
      ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
      : ch;
  }

  el.textContent = glitched;

  // Restore after 90ms
  setTimeout(() => { el.innerHTML = orig; }, 90);
}, 1800);
