// Shared nav shell — Loomwork branding only. Injected into every viz page.
// Each viz page provides its own full <html> structure; this injects a fixed nav bar.

export const VIZ_META = [
  { "id": "001", "title": "The Factorial Heat Matrix",   "cat": "Meta"       },
  { "id": "003", "title": "The Cost-Quality Scatter",    "cat": "Meta"       },
  { "id": "005", "title": "The Variance Waterfall",      "cat": "Meta"       },
  { "id": "011", "title": "The Coherence ECG",           "cat": "Meta"       },
  { "id": "013", "title": "The Entropy Clock",           "cat": "Science"    },
  { "id": "014", "title": "The Progress Bar of Doom",    "cat": "Meta"       },
  { "id": "016", "title": "The Lorenz Butterfly",        "cat": "Meta"       },
  { "id": "020", "title": "The Matrix Rain",             "cat": "Meta"       },
  { "id": "022", "title": "NES Loading Screen",          "cat": "Meta"       },
  { "id": "026", "title": "Game Over Screen",            "cat": "Meta"       },
  { "id": "031", "title": "The VHS Glitch",              "cat": "Meta"       },
  { "id": "032", "title": "Chromatic Aberration",        "cat": "Meta"       },
  { "id": "036", "title": "Signal Interference",         "cat": "Meta"       },
  { "id": "037", "title": "The BSOD",                    "cat": "Meta"       },
  { "id": "040", "title": "The Broken Carousel",         "cat": "Meta"       },
  { "id": "041", "title": "Word Gravity",                "cat": "Meta"       },
  { "id": "047", "title": "Confetti Shower",             "cat": "Meta"       },
  { "id": "050", "title": "Fireworks Show",              "cat": "Meta"       },
  { "id": "055", "title": "The Fractal Tree",            "cat": "Meta"       },
  { "id": "061", "title": "The Worst Chart Ever",        "cat": "Excel Hell" },
  { "id": "062", "title": "The Tracked Changes Doc",     "cat": "Meta"       },
  { "id": "063", "title": "The Gantt Chart",             "cat": "Excel Hell" },
  { "id": "064", "title": "KPI Dashboard",               "cat": "Excel Hell" },
  { "id": "065", "title": "The Pivot Table",             "cat": "Excel Hell" },
  { "id": "067", "title": "The Email Thread",            "cat": "Meta"       },
  { "id": "068", "title": "The Performance Review",      "cat": "Meta"       },
  { "id": "069", "title": "The Infographic",             "cat": "Meta"       },
  { "id": "071", "title": "The Clinical Assessment",     "cat": "Psychology" },
  { "id": "072", "title": "The Obsessive Loop Chart",    "cat": "Excel Hell" },
  { "id": "073", "title": "The Rorschach",               "cat": "Psychology" },
  { "id": "074", "title": "The Repetition Compulsion",   "cat": "Meta"       },
  { "id": "075", "title": "The CBT Map",                 "cat": "Meta"       },
  { "id": "077", "title": "The Research Poster",         "cat": "Meta"       },
  { "id": "078", "title": "The Systematic Review",       "cat": "Meta"       },
  { "id": "080", "title": "The Peer Review",             "cat": "Psychology" },
  { "id": "092", "title": "The Screenplay",              "cat": "Meta"       },
  { "id": "093", "title": "Choose Your Adventure",       "cat": "Meta"       },
  { "id": "094", "title": "The Newspaper",               "cat": "Meta"       },
  { "id": "095", "title": "The Tarot Reading",           "cat": "Meta"       },
  { "id": "097", "title": "The CAPTCHA",                 "cat": "Meta"       },
  { "id": "098", "title": "The Blank Page",              "cat": "Meta"       },
];

export function nav(currentId) {
  const idx = VIZ_META.findIndex(v => v.id === currentId);
  const prev = idx > 0 ? VIZ_META[idx - 1] : VIZ_META[VIZ_META.length - 1];
  const next = idx < VIZ_META.length - 1 ? VIZ_META[idx + 1] : VIZ_META[0];
  const meta = VIZ_META[idx] || { title: '', cat: '' };
  
  return `<style>
    #global-masthead {
      position: sticky; top: 0; z-index: 90;
      background: var(--color-surface);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex; flex-direction: column;
    }
    .tier-2 {
      height: 36px;
      display: flex; align-items: center;
      background: var(--color-bg);
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      padding: 0 16px;
      font-family: ui-monospace, 'SF Mono', 'Cascadia Code', monospace;
      font-size: 11px; color: var(--color-text-muted);
    }
    .t2-ctrl {
      text-decoration: none; color: var(--color-text); opacity: 0.4;
      padding: 0 20px; font-size: 16px; font-weight: 600; transition: opacity 0.15s, background 0.15s;
      height: 100%; display: flex; align-items: center; user-select: none;
    }
    .t2-ctrl:hover { opacity: 1; background: rgba(127,127,127,0.1); }
    .t2-ctrl:active { opacity: 1; }
    .t2-label {
      padding: 0 12px; color: var(--color-text); font-weight: 600; font-size: 12px;
      border-right: 1px solid var(--color-border);
      width: 55px; text-align: center; flex-shrink: 0;
    }
    .t2-title {
      padding: 0 16px; color: var(--color-text);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; 
      width: 320px; flex-shrink: 0; font-weight: 500;
    }
    .t2-cat {
      padding: 0 12px; color: var(--color-text-muted); opacity: 0.6; font-size: 10px;
      border-left: 1px solid var(--color-border); text-transform: uppercase; letter-spacing: 0.05em;
      width: 110px; text-align: center; flex-shrink: 0;
    }
  </style>

  <nav id="global-masthead">
    <div class="tier-2">
      <a href="/" title="Home (H key)" class="t2-ctrl" style="border-right: 1px solid var(--color-border); padding-right: 16px; margin-right: 4px;">⌂</a>
      <a href="/viz/${prev.id}" title="Previous ([ key)" class="t2-ctrl">‹</a>
      <span class="t2-label">${currentId}</span>
      <span class="t2-title">${meta.title}</span>
      <span class="t2-cat">${meta.cat}</span>
      <a href="/viz/${next.id}" title="Next (] key)" class="t2-ctrl">›</a>
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
