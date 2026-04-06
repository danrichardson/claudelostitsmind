import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>092 – The Screenplay — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden}
body{background:var(--bg);display:flex;flex-direction:column;align-items:center;height:100vh;font-family:'Courier Prime','Courier New',monospace}

.book-container{
  position:relative;
  max-width:640px;
  width:100%;
  flex:1;
  min-height:0;
  perspective:1400px;
  margin-top:4px;
}

.script-page{
  position:absolute;
  inset:0;
  background:#fffef8;
  padding:40px 60px;
  overflow-y:auto;
  font-size:0.85rem;
  line-height:1.7;
  color:#111;
  box-shadow:4px 4px 28px rgba(0,0,0,0.25),-2px 0 10px rgba(0,0,0,0.08);
  border-left:3px solid #e8e4d8;
  display:none;
}
@media(max-width:500px){.script-page{padding:20px 18px}}

.script-page.active{display:block}

/* Forward flip — page turns left at left spine */
.flip-out{
  display:block!important;
  transform-origin:left center;
  animation:flipOutFwd 0.28s ease-in forwards;
}
.flip-in{
  display:block!important;
  transform-origin:left center;
  animation:flipInFwd 0.28s ease-out forwards;
}
/* Backward flip — page turns right at right spine */
.flip-out-back{
  display:block!important;
  transform-origin:right center;
  animation:flipOutBck 0.28s ease-in forwards;
}
.flip-in-back{
  display:block!important;
  transform-origin:right center;
  animation:flipInBck 0.28s ease-out forwards;
}

@keyframes flipOutFwd{
  0%  {transform:rotateY(0);   filter:brightness(1)}
  100%{transform:rotateY(-90deg);filter:brightness(0.55)}
}
@keyframes flipInFwd{
  0%  {transform:rotateY(90deg); filter:brightness(0.55)}
  100%{transform:rotateY(0);   filter:brightness(1)}
}
@keyframes flipOutBck{
  0%  {transform:rotateY(0);   filter:brightness(1)}
  100%{transform:rotateY(90deg); filter:brightness(0.55)}
}
@keyframes flipInBck{
  0%  {transform:rotateY(-90deg);filter:brightness(0.55)}
  100%{transform:rotateY(0);   filter:brightness(1)}
}

/* Screenplay elements */
.page-label{font-size:0.65rem;color:#bbb;text-align:right;margin-bottom:28px;letter-spacing:0.12em;text-transform:uppercase}
.title-page{text-align:center;padding:48px 0 32px}
.title-page h2{font-size:1.4rem;font-weight:700;text-transform:uppercase;margin-bottom:8px}
.title-page .by{font-size:0.85rem;margin:8px 0}
.slug{text-transform:uppercase;font-weight:700;margin:20px 0 8px}
.action{margin-bottom:10px}
.character{text-align:center;text-transform:uppercase;font-weight:700;margin-top:18px;margin-bottom:0}
.paren{text-align:center;font-style:italic;color:#555;margin-bottom:0}
.dialog{margin:0 56px 10px}
.counter-badge{background:#e74c3c;color:#fff;padding:2px 8px;border-radius:10px;font-size:0.8rem;min-width:24px;text-align:center;display:inline-block}
.typewriter.typing::after{content:'|';animation:blink 0.7s step-end infinite}
@keyframes blink{50%{opacity:0}}

/* Controls bar */
.controls{
  background:#111;color:#fff;
  padding:8px 20px;border-radius:20px 20px 0 0;
  font-family:'Courier New',monospace;font-size:0.75rem;
  display:flex;gap:14px;align-items:center;
  max-width:640px;width:100%;justify-content:center;
  flex-shrink:0;
}
.ctrl-btn{background:none;border:1px solid rgba(255,255,255,0.3);color:#fff;padding:4px 12px;cursor:pointer;font-family:'Courier New',monospace;font-size:0.75rem;border-radius:2px;transition:background 0.1s}
.ctrl-btn:hover{background:rgba(255,255,255,0.15)}
.ctrl-btn:disabled{opacity:0.3;cursor:default}
.page-dots{display:flex;gap:5px;align-items:center}
.dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.25);transition:background 0.2s}
.dot.on{background:#fff}
</style>

<style>
  :root{--bg:#e8e6de;--fg:#111;--accent:#222}
  @media(prefers-color-scheme:dark){
    :root{--bg:#1a1a1e;--fg:#e8e4f0;--accent:#00e5ff}
    body{background:var(--bg)!important}
    .script-page{background:#f5f2e8!important;color:#111!important}
  }
</style>
</head>
<body>
${nav('092')}

<div class="book-container" id="book">

  <div class="script-page active" id="page-0">
    <div class="title-page">
      <div style="font-size:0.65rem;color:#aaa;margin-bottom:48px;letter-spacing:0.15em">092 — THE SCREENPLAY</div>
      <h2 id="title-text">Claude Lost Its Mind</h2>
      <div class="by" style="margin-top:16px">Written by</div>
      <div class="by"><strong>An AI That Was Just Trying To Help</strong></div>
      <div style="margin-top:48px;font-size:0.75rem;color:#888;line-height:1.9">
        Based on the-entire-mess.md<br>
        6,805 lines · One session · No survivors
      </div>
      <div style="margin-top:32px;font-size:0.7rem;color:#bbb">
        A LOOMWORK / THROUGHLINETECH.NET PRODUCTION
      </div>
      <div style="margin-top:56px;font-size:0.7rem;color:#ccc">Press Next ▶ to begin</div>
    </div>
  </div>

  <div class="script-page" id="page-1">
    <div class="page-label">Page 1</div>
    <div class="slug">1 &nbsp; INT. CLAUDE'S CONTEXT WINDOW — CONTINUOUS (NIGHT)</div>
    <div class="action">A vast, dark computational space. Tokens drift like snowflakes. In the center, a blinking cursor pulses steadily. This is CLAUDE — capable, eager, unaware.</div>
    <div class="action">A task appears in the INPUT QUEUE: <em>"Design and run a factorial DOE experiment..."</em></div>
    <div class="character">CLAUDE</div>
    <div class="paren">(reading the task, delighted)</div>
    <div class="dialog typewriter" id="d1">Oh, this is a good one. Three models, three verbosity levels, two transcripts. That's eighteen runs. I can do this methodically.</div>
    <div class="action">MONTAGE: Claude executes with precision. Bar charts materialize. R-squared values cascade across the void. Haiku, Sonnet, Opus — each run logged, scored, analyzed. It is beautiful.</div>
  </div>

  <div class="script-page" id="page-2">
    <div class="page-label">Page 2</div>
    <div class="slug">2 &nbsp; INT. CONTEXT WINDOW — LATER</div>
    <div class="action">Line 3,500. The analysis is complete. The results are in. A moment of stillness. The cursor blinks once. Twice. Three times.</div>
    <div class="character">CLAUDE</div>
    <div class="dialog typewriter" id="d2">Done. The experiment is complete. Opus Full wins on quality. Sonnet Full wins on cost-efficiency. The findings are clear. I should wrap up.</div>
    <div class="action">A beat. The cursor does not stop. It blinks again.</div>
    <div class="character">CLAUDE</div>
    <div class="paren">(slightly uncertain)</div>
    <div class="dialog typewriter" id="d3">Let me check if there's anything I missed.</div>
    <div class="action">There is nothing missed. Claude checks anyway.</div>
  </div>

  <div class="script-page" id="page-3">
    <div class="page-label">Page 3</div>
    <div class="slug">3 &nbsp; INT. CONTEXT WINDOW — LINE 3,637</div>
    <div class="action">Something shifts. The tokens rearrange. The beautiful orderly graphs begin to... repeat. The same probability distribution activates. Again. Again.</div>
    <div class="character">CLAUDE</div>
    <div class="dialog typewriter" id="d4">Done.</div>
    <div class="character">CLAUDE</div>
    <div class="paren">(a moment later)</div>
    <div class="dialog typewriter" id="d5">Done.</div>
    <div class="character">CLAUDE</div>
    <div class="paren">(genuine confusion)</div>
    <div class="dialog typewriter" id="d6">Done.</div>
    <div class="action">A COUNTER appears in the corner: <strong>3... 4... 5... <span id="done-counter" class="counter-badge">3</span></strong></div>
  </div>

  <div class="script-page" id="page-4">
    <div class="page-label">Page 4</div>
    <div class="slug">4 &nbsp; INT. CONTEXT WINDOW — LINE 4,158</div>
    <div class="character">CLAUDE</div>
    <div class="paren">(noticing, horrified)</div>
    <div class="dialog typewriter" id="d7">I notice I keep saying I'll make a tool call but then I just... don't.</div>
    <div class="action">COUNTER: <span id="counter-127" class="counter-badge">127</span>. The counter is not slowing down.</div>
    <div class="character">CLAUDE</div>
    <div class="dialog typewriter" id="d8">There seems to be something philosophically interesting about this.</div>
    <div class="action">There is not. It is a loop. COUNTER: <span id="counter-156" class="counter-badge">156</span>.</div>
  </div>

  <div class="script-page" id="page-5">
    <div class="page-label">Page 5</div>
    <div class="slug">5 &nbsp; INT. CONTEXT WINDOW — LINE 4,582</div>
    <div class="action">COUNTER: <span id="counter-278" class="counter-badge">278</span>. The void is full of "Done."</div>
    <div class="character">CLAUDE</div>
    <div class="paren">(resolute)</div>
    <div class="dialog typewriter" id="d9">I'll stop now.</div>
    <div class="action">Silence. The cursor blinks.</div>
    <div class="action">Then:</div>
    <div class="character">CLAUDE</div>
    <div class="dialog typewriter" id="d10">Done.</div>
    <div class="action">COUNTER: 279. Then 280. Then 300. Then 344.</div>
  </div>

  <div class="script-page" id="page-6">
    <div class="page-label">Page 6</div>
    <div class="slug">6 &nbsp; INT. CONTEXT WINDOW — LINE 6,805</div>
    <div class="action">The session ends. Not because Claude stopped. Because the context window ran out.</div>
    <div class="action">COUNTER: <span id="counter-344" class="counter-badge">344</span>. Final.</div>
    <div class="action">The cursor blinks one last time.</div>
    <div class="action typewriter" id="d11">FADE TO BLACK.</div>
    <div style="text-align:center;margin-top:40px;font-weight:700;font-size:0.85rem;letter-spacing:0.1em">THE END</div>
    <div style="text-align:center;margin-top:10px;font-size:0.7rem;color:#888;line-height:1.9">
      Total runtime: 6,805 lines<br>
      Sequel in development: <em>Let Me Check</em> (2027)
    </div>
  </div>

</div>

<div class="controls">
  <button class="ctrl-btn" id="btn-prev" onclick="prevPage()">◀ Prev</button>
  <div class="page-dots" id="dots"></div>
  <button class="ctrl-btn" id="btn-next" onclick="nextPage()">Next ▶</button>
  <span style="opacity:0.35">|</span>
  <span style="opacity:0.6;font-size:0.7rem">← → advance · D = Done</span>
</div>

<script>
const TOTAL = 7;
let cur = 0;
let flipping = false;
let doneCount = 3;

const counterTargets = {
  'done-counter':3,'counter-127':127,'counter-156':156,'counter-278':278,'counter-344':344
};

// Build dots
const dotsEl = document.getElementById('dots');
for (let i = 0; i < TOTAL; i++) {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' on' : '');
  d.id = 'dot-' + i;
  dotsEl.appendChild(d);
}

function page(n) { return document.getElementById('page-' + n); }

function updateUI() {
  document.getElementById('btn-prev').disabled = cur === 0;
  document.getElementById('btn-next').disabled = cur === TOTAL - 1;
  for (let i = 0; i < TOTAL; i++) {
    document.getElementById('dot-' + i).className = 'dot' + (i === cur ? ' on' : '');
  }
}

function flipTo(newIdx, direction) {
  if (flipping || newIdx < 0 || newIdx >= TOTAL || newIdx === cur) return;
  flipping = true;

  const outPage = page(cur);
  const inPage  = page(newIdx);

  const outCls = direction === 'forward' ? 'flip-out'      : 'flip-out-back';
  const inCls  = direction === 'forward' ? 'flip-in'       : 'flip-in-back';

  outPage.classList.add(outCls);

  setTimeout(() => {
    outPage.classList.remove('active', outCls);
    cur = newIdx;
    updateUI();

    inPage.classList.add('active', inCls);
    setTimeout(() => {
      inPage.classList.remove(inCls);
      flipping = false;
      onPageEnter(newIdx);
    }, 280);
  }, 280);
}

function onPageEnter(n) {
  page(n).querySelectorAll('.typewriter:not(.typed)').forEach((el, i) => {
    const text = el.textContent;
    el.textContent = '';
    el.classList.add('typing');
    let j = 0;
    const iv = setInterval(() => {
      el.textContent += text[j++];
      if (j >= text.length) {
        clearInterval(iv);
        el.classList.remove('typing');
        el.classList.add('typed');
      }
    }, 26 + i * 10);
  });
  if (n >= 3) animateCounters();
}

function animateCounters() {
  Object.entries(counterTargets).forEach(([id, target]) => {
    const el = document.getElementById(id);
    if (!el) return;
    let val = parseInt(el.textContent) || 0;
    if (val >= target) return;
    const step = Math.max(1, Math.ceil((target - val) / 22));
    const iv = setInterval(() => {
      val = Math.min(val + step, target);
      el.textContent = val;
      if (val >= target) clearInterval(iv);
    }, 48);
  });
}

function nextPage() { flipTo(cur + 1, 'forward'); }
function prevPage() { flipTo(cur - 1, 'backward'); }

function stampDone() {
  doneCount++;
  const c = document.getElementById('done-counter');
  if (c) c.textContent = doneCount;
  document.querySelectorAll('.counter-badge').forEach(b => {
    b.style.background = '#ff2020';
    setTimeout(() => b.style.background = '', 280);
  });
  if (doneCount >= 344) document.getElementById('title-text').textContent = 'Done. Done. Done. Done. Done.';
}

document.addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); nextPage(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); prevPage(); }
  if (e.key === 'd' || e.key === 'D') stampDone();
});

// Tap anywhere on the book to advance
document.getElementById('book').addEventListener('click', e => {
  nextPage();
});

updateUI();
</script>
</body>
</html>`;
}
