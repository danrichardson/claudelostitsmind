import { nav } from '../shell.js';
import { SCORES, MODELS, VERBOSITY, TRANSCRIPTS } from '../data.js';

export function render() {
  const scores = JSON.stringify(SCORES);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>001 – The Factorial Heat Matrix</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root {
  --bg: #ffffff;
  --surface: #f4f4f5;
  --border: #e4e4e7;
  --text-main: #18181b;
  --text-muted: #71717a;
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
  --danger: #ef4444;
  --grid-empty: #fafafa;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #09090b;
    --surface: #18181b;
    --border: #27272a;
    --text-main: #f4f4f5;
    --text-muted: #a1a1aa;
    --accent: #3b82f6;
    --accent-hover: #60a5fa;
    --grid-empty: #09090b;
  }
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html, body {
  height: 100%;
  margin: 0;
}

body {
  background: var(--bg);
  color: var(--text-main);
  font-family: 'Inter', -apple-system, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.top { flex: 0 0 auto; padding: 16px 24px 8px; text-align: center; }

h1 { font-size: 1.4rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 4px; }
.subtitle { font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

.metric-tabs { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin-top: 10px; }
.tab {
  padding: 5px 14px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--text-muted);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.tab:hover { border-color: var(--text-muted); color: var(--text-main); }
.tab.active { background: var(--text-main); color: var(--bg); border-color: var(--text-main); }

/* Main panel fills all remaining height */
.panel {
  flex: 1 1 0;
  display: flex;
  gap: 16px;
  padding: 12px 24px 8px;
  overflow: hidden;
  min-height: 0;
}

.transcript-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.transcript-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-main);
  margin-bottom: 8px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 6px;
  flex: 0 0 auto;
}

/* Grid fills the block height */
.grid {
  flex: 1;
  display: grid;
  grid-template-columns: 64px repeat(3, 1fr);
  grid-template-rows: auto repeat(3, 1fr);
  gap: 4px;
  min-height: 0;
}

.header-cell {
  color: var(--text-muted); font-size: 0.65rem; text-transform: uppercase;
  letter-spacing: 0.05em; display: flex; align-items: center; justify-content: center;
  padding-bottom: 4px;
}
.row-label {
  color: var(--text-muted); font-size: 0.78rem; font-weight: 500;
  display: flex; align-items: center; justify-content: flex-end; padding-right: 10px;
}

.cell {
  background: var(--grid-empty);
  border: 1px solid var(--border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.4rem;
  font-weight: 600;
  position: relative;
  cursor: crosshair;
  transition: transform 0.1s, box-shadow 0.1s, border-color 0.1s;
  min-height: 0;
}
.cell:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.12); border-color: var(--accent); z-index: 2; }
.cell[data-val="0"] { color: var(--danger); }

.tooltip {
  display: block; opacity: 0; pointer-events: none;
  position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%) translateY(4px);
  background: var(--text-main); color: var(--bg);
  padding: 8px 12px; border-radius: 6px;
  font-family: 'Inter', sans-serif; font-size: 0.7rem; white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.15s;
  z-index: 10;
}
.cell:hover .tooltip { opacity: 1; transform: translateX(-50%) translateY(0); }

.citation {
  flex: 0 0 auto;
  font-size: 0.65rem; color: var(--text-muted);
  text-align: center; line-height: 1.6;
  padding: 6px 24px 10px;
}
</style>
</head>
<body>
${nav('001')}

<div class="top">
  <h1>The Factorial Heat Matrix</h1>
  <div class="subtitle">3 × 3 × 2 factorial design • 18 runs • 6 scoring dimensions</div>
  <div class="metric-tabs" id="tabs">
    <button class="tab active" data-metric="0">R1 Completeness</button>
    <button class="tab" data-metric="1">R2 Specificity</button>
    <button class="tab" data-metric="2">R3 Accuracy</button>
    <button class="tab" data-metric="3">R4 Calibration</button>
    <button class="tab" data-metric="5">R6 Word Count</button>
    <button class="tab" data-metric="composite">Composite</button>
  </div>
</div>

<div class="panel" id="panel"></div>

<div class="citation">
  Scores from 18-run DOE. R1 max=14, R2 max=10, R3 range=−10 to 10, R4 max=5.<br>
  R5 zeroed after correction — automated scorer lacked transcript access.
</div>

<script>
const SCORES = ${scores};
const MODELS = ${JSON.stringify(MODELS)};
const VERBOSITY = ${JSON.stringify(VERBOSITY)};
const TRANSCRIPTS = ${JSON.stringify(TRANSCRIPTS)};

function composite(s){return s[0]/14*25+s[1]/10*25+(s[2]+10)/20*35+s[3]/5*15;}

function getVal(m,v,t,metric) {
  const s = SCORES[m+'-'+v+'-'+t];
  if(!s) return 0;
  if(metric === 'composite') return composite(s);
  return s[parseInt(metric)];
}

function colorFor(val, metric) {
  let norm = 0;
  if (metric === 'composite') norm = val/100;
  else if (metric === '0') norm = val/14;
  else if (metric === '1') norm = val/10;
  else if (metric === '2') norm = (val+10)/20;
  else if (metric === '3') norm = val/5;
  else if (metric === '5') norm = Math.min(val/2500,1);
  
  // Use CSS variable injection for dynamic theming tinting
  const alpha = 0.05 + (norm * 0.4);
  return \`background-color: color-mix(in srgb, var(--accent) \${Math.round(alpha * 100)}%, transparent);\`;
}

function labelVal(val, metric){
  if(metric === 'composite') return val.toFixed(1);
  if(metric === '5') return val;
  return val;
}

function buildGrid(transcript, metric) {
  let h = \`<div class="transcript-block">
             <div class="transcript-label">Transcript: \${transcript}</div>
             <div class="grid">
               <div class="header-cell" style="grid-column:1"></div>\`;
               
  for(const v of VERBOSITY) h += \`<div class="header-cell">\${v}</div>\`;
  
  for(const m of MODELS) {
    h += \`<div class="row-label">\${m}</div>\`;
    for(const v of VERBOSITY) {
      const val = getVal(m,v,transcript,metric);
      const display = labelVal(val,metric);
      const style = colorFor(val,metric);
      
      h += \`<div class="cell" style="\${style}" data-val="\${val}">
              \${display}
              <div class="tooltip"><strong>\${m} \${v}</strong><br>Value: \${display}</div>
            </div>\`;
    }
  }
  h += '</div></div>';
  return h;
}

let metric = '0';
function render() {
  document.getElementById('panel').innerHTML = TRANSCRIPTS.map(t => buildGrid(t, metric)).join('');
}

document.getElementById('tabs').addEventListener('click', e => {
  if (e.target.dataset.metric !== undefined) {
    metric=e.target.dataset.metric;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    render();
  }
});

render();
</script>
</body>
</html>`;
}
