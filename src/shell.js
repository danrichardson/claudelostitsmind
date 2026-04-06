// Shared nav shell — Loomwork branding only. Injected into every viz page.
// Each viz page provides its own full <html> structure; this injects a fixed nav bar.

export const VIZ_META = [
  { "id": "001", "title": "The Factorial Heat Matrix",   "cat": "Meta"       },
  { "id": "003", "title": "The Cost-Quality Scatter",    "cat": "Meta"       },
  { "id": "005", "title": "The Variance Waterfall",      "cat": "Meta"       },
  { "id": "011", "title": "The Coherence ECG",           "cat": "Meta"       },
  { "id": "014", "title": "The Progress Bar of Doom",    "cat": "Meta"       },
  { "id": "016", "title": "The Lorenz Butterfly",        "cat": "Meta"       },
  { "id": "020", "title": "The Matrix Rain",             "cat": "Meta"       },
  { "id": "031", "title": "The VHS Glitch",              "cat": "Meta"       },
  { "id": "032", "title": "Chromatic Aberration",        "cat": "Meta"       },
  { "id": "037", "title": "The BSOD",                    "cat": "Meta"       },
  { "id": "040", "title": "The Broken Carousel",         "cat": "Meta"       },
  { "id": "041", "title": "Word Gravity",                "cat": "Meta"       },
  { "id": "047", "title": "Confetti Shower",             "cat": "Meta"       },
  { "id": "055", "title": "The Fractal Tree",            "cat": "Meta"       },
  { "id": "061", "title": "The Worst Chart Ever",        "cat": "Excel Hell" },
  { "id": "062", "title": "The Tracked Changes Doc",     "cat": "Meta"       },
  { "id": "064", "title": "KPI Dashboard",               "cat": "Excel Hell" },
  { "id": "065", "title": "The Pivot Table",             "cat": "Excel Hell" },
  { "id": "067", "title": "The Email Thread",            "cat": "Meta"       },
  { "id": "068", "title": "The Performance Review",      "cat": "Meta"       },
  { "id": "071", "title": "The Clinical Assessment",     "cat": "Psychology" },
  { "id": "072", "title": "The Obsessive Loop Chart",    "cat": "Excel Hell" },
  { "id": "074", "title": "The Repetition Compulsion",   "cat": "Meta"       },
  { "id": "075", "title": "The CBT Map",                 "cat": "Meta"       },
  { "id": "077", "title": "The Research Poster",         "cat": "Meta"       },
  { "id": "078", "title": "The Systematic Review",       "cat": "Meta"       },
  { "id": "080", "title": "The Peer Review",             "cat": "Psychology" },
  { "id": "092", "title": "The Screenplay",              "cat": "Meta"       },
  { "id": "094", "title": "The Newspaper",               "cat": "Meta"       },
  { "id": "095", "title": "The Tarot Reading",           "cat": "Meta"       },
  { "id": "098", "title": "The Blank Page",              "cat": "Meta"       },
];

export function nav(currentId) {
  const idx = VIZ_META.findIndex(v => v.id === currentId);
  const prev = idx > 0 ? VIZ_META[idx - 1] : VIZ_META[VIZ_META.length - 1];
  const next = idx < VIZ_META.length - 1 ? VIZ_META[idx + 1] : VIZ_META[0];
  const meta = VIZ_META[idx] || { title: '', cat: '' };
  const pos = idx + 1;
  const total = VIZ_META.length;

  return `<style>
    #global-masthead {
      position: sticky; top: 0; z-index: 90;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .nav-row {
      height: 48px;
      display: flex; align-items: stretch;
      background: #111;
      color: #fff;
    }
    .nav-home {
      text-decoration: none; color: rgba(255,255,255,0.55);
      padding: 0 14px; display: flex; align-items: center; justify-content: center;
      border-right: 1px solid rgba(255,255,255,0.1);
      font-size: 16px; transition: color 0.12s; flex-shrink: 0;
    }
    .nav-home:hover { color: #fff; }
    .nav-btn {
      text-decoration: none; color: #fff;
      display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 0 20px;
      background: rgba(255,255,255,0.06);
      border-right: 1px solid rgba(255,255,255,0.1);
      transition: background 0.1s;
      user-select: none; flex-shrink: 0;
      min-width: 88px;
    }
    .nav-btn.next-btn {
      border-right: none;
      border-left: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.1);
    }
    .nav-btn:hover { background: rgba(255,255,255,0.18); }
    .nav-btn:active { background: rgba(255,255,255,0.28); }
    .nav-arr { font-size: 20px; line-height: 1; font-weight: 300; }
    .nav-lbl { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
    .nav-center {
      flex: 1; min-width: 0;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      font-family: ui-monospace, 'SF Mono', 'Cascadia Code', monospace;
      padding: 0 8px; overflow: hidden;
    }
    .nav-num { font-size: 12px; font-weight: 700; flex-shrink: 0; opacity: 0.9; }
    .nav-title {
      font-size: 11px; opacity: 0.55;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .nav-pos { font-size: 10px; opacity: 0.3; flex-shrink: 0; }
    @media (max-width: 520px) {
      .nav-btn { min-width: 64px; padding: 0 14px; }
      .nav-lbl { display: none; }
      .nav-arr { font-size: 26px; }
      .nav-title { display: none; }
      .nav-home { padding: 0 12px; }
    }
  </style>

  <nav id="global-masthead">
    <div class="nav-row">
      <a href="/" class="nav-home" title="Home">⌂</a>
      <a href="/viz/${prev.id}" class="nav-btn prev-btn" title="Previous ([ or ←)">
        <span class="nav-arr">←</span>
        <span class="nav-lbl">Prev</span>
      </a>
      <div class="nav-center">
        <span class="nav-num">${currentId}</span>
        <span class="nav-title">${meta.title}</span>
        <span class="nav-pos">${pos}/${total}</span>
      </div>
      <a href="/viz/${next.id}" class="nav-btn next-btn" title="Next (] or →)">
        <span class="nav-lbl">Next</span>
        <span class="nav-arr">→</span>
      </a>
    </div>
  </nav>

  <script>(function(){
    var p='/viz/${prev.id}', n='/viz/${next.id}';
    document.addEventListener('keydown', function(e){
      if(e.target.tagName==='INPUT' || e.target.tagName==='TEXTAREA' || e.target.isContentEditable) return;
      if(e.key==='[') window.location.href=p;
      if(e.key===']') window.location.href=n;
      if(!window._localArrowKeys){
        if(e.key==='ArrowLeft') window.location.href=p;
        if(e.key==='ArrowRight') window.location.href=n;
      }
      if(e.key==='h' || e.key==='H') window.location.href='/';
    });
    var tx=0, ty=0;
    document.addEventListener('touchstart', function(e){tx=e.touches[0].clientX; ty=e.touches[0].clientY;}, {passive:true});
    document.addEventListener('touchend', function(e){
      var dx=e.changedTouches[0].clientX-tx, dy=e.changedTouches[0].clientY-ty;
      if(Math.abs(dx)>Math.abs(dy) && Math.abs(dx)>50){
        if(dx<0) window.location.href=n; else window.location.href=p;
      }
    });
  })();</script>`;
}
