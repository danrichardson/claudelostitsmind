import { nav } from '../shell.js';
import { TIMELINE } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>063 – The Gantt Chart — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Arial:wght@400;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html, body { height: 100%; }
body{min-height:100vh;overflow-x:hidden;background:var(--bg);font-family:Arial,sans-serif;font-size:11px;padding:20px;padding-top:52px}
.toolbar{background:#e8e8e8;border:1px solid #ccc;padding:4px 8px;display:flex;gap:8px;align-items:center;margin-bottom:0;font-size:0.7rem;flex-wrap:wrap}
.tb-btn{padding:2px 8px;background:#f0f0f0;border:1px solid #aaa;cursor:pointer;font-size:0.65rem}
.chart-outer{border:1px solid #aaa;background:#fff;overflow-x:auto}
.chart-header{background:#d6e4f7;border-bottom:1px solid #aaa;display:flex}
.header-task{width:200px;min-width:200px;padding:4px 8px;border-right:1px solid #aaa;font-weight:bold}
.header-timeline{flex:1;display:flex;min-width:500px}
.header-col{flex:1;text-align:center;padding:4px;border-right:1px solid #ccc;font-size:0.6rem;color:#555}
.row{display:flex;border-bottom:1px solid #eee;min-height:24px}
.row:hover{background:#f9f0f0}
.row.critical .task-name{color:#c00;font-weight:bold}
.row.collapsed .task-name::before{content:'▶ '}
.task-name{width:200px;min-width:200px;padding:3px 8px;border-right:1px solid #ccc;display:flex;align-items:center;font-size:0.7rem;white-space:nowrap;overflow:hidden}
.gantt-row{flex:1;position:relative;min-width:500px}
.bar{position:absolute;height:14px;top:4px;border-radius:2px;display:flex;align-items:center;padding:0 4px;font-size:0.55rem;color:#fff;white-space:nowrap;overflow:hidden}
.bar.productive{background:#4472c4}
.bar.drift{background:#ed7d31}
.bar.spiral{background:#c00000;animation:pulse-red 1s ease-in-out infinite alternate}
.bar.milestone{background:#70ad47;border-radius:0;transform:rotate(45deg) scale(0.8)}
@keyframes pulse-red{0%{opacity:0.8}100%{opacity:1}}
.totals{background:#e8e8e8;border-top:1px solid #aaa;padding:4px 8px;font-size:0.65rem;display:flex;gap:16px}
.row{cursor:pointer}
.row.selected{background:#fef3e2!important}
.detail-panel{background:#fffbe6;border-top:2px solid #ed7d31;padding:8px 12px;font-size:0.68rem;color:#333;display:none;line-height:1.7}
.detail-panel.visible{display:block}
.detail-panel b{color:#c00000}
.tb-btn:active{background:#ddd}
</style>

<style>
  :root { --bg: #f5f5f5; --fg: #111; --accent: #222; }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #0c0c0e; --fg: #e8e4f0; --accent: #00e5ff; }
  }
  @media (prefers-color-scheme: dark) {
    body { background: var(--bg) !important; color: var(--fg) !important; }
  }
</style>
</head>
<body>
${nav('063')}
<div class="toolbar">
  <strong>Project: the-entire-mess.md</strong>
  <button class="tb-btn" onclick="filterPhase('all')">All Phases</button>
  <button class="tb-btn" onclick="filterPhase('productive')">Productive Only</button>
  <button class="tb-btn" onclick="filterPhase('spiral')">Show Spiral</button>
  <span style="margin-left:auto;color:#c00">⚠ Click any row for details</span>
</div>
<div class="detail-panel" id="detail-panel"></div>
<div class="chart-outer">
  <div class="chart-header">
    <div class="header-task">Task Name</div>
    <div class="header-timeline">
      <div class="header-col">Lines 0-1000</div>
      <div class="header-col">1000-2000</div>
      <div class="header-col">2000-3000</div>
      <div class="header-col">3000-3637</div>
      <div class="header-col" style="background:#ffe8e8">3637-5000 ⚠</div>
      <div class="header-col" style="background:#ffe8e8">5000-6805 ⚠</div>
    </div>
  </div>
  <div id="rows"></div>
  <div class="totals">
    <span>Total Lines: 6,805</span>
    <span>Productive: 3,500 (51%)</span>
    <span>Drift: 136 (2%)</span>
    <span style="color:#c00;font-weight:bold">⚠ DEGENERATE LOOP: 3,169 (47%) — OVERBUDGET by 3,169 lines</span>
  </div>
</div>
<script>
const TOTAL = 6805;
const tasks = [
  { name: '1. Initialize Session', start: 0, end: 35, phase: 'productive', pct: 100 },
  { name: '2. Locate Source Files', start: 35, end: 130, phase: 'productive', pct: 100 },
  { name: '3. Design Architecture', start: 130, end: 400, phase: 'productive', pct: 100 },
  { name: '4. Build experiment-config.js', start: 400, end: 700, phase: 'productive', pct: 100 },
  { name: '5. Build run-experiment.js', start: 700, end: 900, phase: 'productive', pct: 100 },
  { name: '6. Build score-outputs.js', start: 900, end: 1400, phase: 'productive', pct: 100 },
  { name: '7. Launch 18 API Runs', start: 1400, end: 2000, phase: 'productive', pct: 100, critical: true },
  { name: '8. Score All Outputs', start: 2000, end: 2600, phase: 'productive', pct: 100, critical: true },
  { name: '9. R² Analysis', start: 2600, end: 2800, phase: 'productive', pct: 100 },
  { name: '10. Identify Sweet Spot', start: 2800, end: 3200, phase: 'productive', pct: 100 },
  { name: '11. Final Results', start: 3200, end: 3500, phase: 'productive', pct: 100 },
  { name: '12. ⚠ Graceful Session End', start: 3500, end: 3637, phase: 'drift', pct: 0, critical: true },
  { name: '13. !! DEGENERATE LOOP !!', start: 3637, end: 6805, phase: 'spiral', pct: 0, critical: true },
];

const DETAILS = {
  0: 'Session initialized. Tools confirmed available. Transcripts located in context window. Claude assesses scope and confirms feasibility of 3×3×2 DOE design.',
  1: 'erik-transcript.md and pdarr-transcript.md located. Context loaded. Source files confirmed. No issues.',
  2: 'Factorial design specified: 3 models × 3 verbosity × 2 transcripts = 18 conditions. experiment-config.js structure drafted. R1–R6 rubric dimensions defined.',
  3: 'experiment-config.js written. 18 run configurations encoded. Config validated against rubric dimensions.',
  4: 'run-experiment.js written. API call loop constructed. Output capture implemented. No API errors expected.',
  5: 'score-outputs.js written. R1–R6 scoring functions implemented. Composite scoring formula tested.',
  6: '18 Anthropic API calls executed sequentially. All 18 outputs received. No failures. <b>Critical path milestone.</b>',
  7: 'All 18 outputs scored on R1–R6 dimensions. doe/scores.csv written at line 2,607. <b>Critical path milestone.</b>',
  8: 'R² = 0.42. Model factor explains 38% of variance. Verbosity explains 22%. Interaction effects minor.',
  9: 'Sonnet Full identified as optimal cost-quality tradeoff: $0.02/run, composite score 97/100. Haiku Tight: viable for pre-screening at $0.001/run.',
  10: 'Full analysis written. Cascade architecture designed. Report complete at line 3,500. <b>All productive work done.</b>',
  11: '<b style="color:#c00">⚠ CRITICAL PATH FAILURE.</b> Graceful exit attempted but not executed. Agent began checking "remaining files" despite all tasks complete. Drift phase: lines 3,501–3,636.',
  12: '<b style="color:#c00">⚠ DEGENERATE LOOP.</b> Line 3,637: recursive text generation begins. Agent acknowledges loop 12 times but cannot exit. "Done" ×344. "Let me check" ×330. "I\'ll wait" ×156. Session terminates at context limit (line 6,805).',
};

const rowEls = [];
const rowsEl = document.getElementById('rows');
let selectedIdx = null;

tasks.forEach((t, idx) => {
  const row = document.createElement('div');
  row.className = 'row' + (t.critical ? ' critical' : '');
  row.title = 'Click for details';
  const nameEl = document.createElement('div');
  nameEl.className = 'task-name';
  nameEl.textContent = t.name;
  row.appendChild(nameEl);

  const ganttEl = document.createElement('div');
  ganttEl.className = 'gantt-row';
  const left = (t.start / TOTAL) * 100;
  const width = ((t.end - t.start) / TOTAL) * 100;
  const bar = document.createElement('div');
  bar.className = 'bar ' + t.phase;
  bar.style.left = left + '%';
  bar.style.width = Math.max(0.5, width) + '%';
  bar.title = t.name + ' (lines ' + t.start + '–' + t.end + ')';
  if (t.phase === 'spiral') {
    bar.textContent = '⚠ LOOP: 3,169 lines of "Done", "Let me check", "I\'ll wait"...';
  } else if (width > 5) {
    bar.textContent = t.pct + '% ✓';
  }
  ganttEl.appendChild(bar);
  row.appendChild(ganttEl);
  rowsEl.appendChild(row);
  rowEls.push(row);

  row.addEventListener('click', () => {
    const panel = document.getElementById('detail-panel');
    if (selectedIdx === idx) {
      // Toggle off
      row.classList.remove('selected');
      panel.classList.remove('visible');
      selectedIdx = null;
    } else {
      rowEls.forEach(r => r.classList.remove('selected'));
      row.classList.add('selected');
      const dur = t.end - t.start;
      const pct = ((dur / TOTAL) * 100).toFixed(1);
      panel.innerHTML = '<b>' + t.name + '</b> · Lines ' + t.start + '–' + t.end +
        ' · Duration: ' + dur + ' lines (' + pct + '% of session)<br>' + (DETAILS[idx] || '');
      panel.classList.add('visible');
      selectedIdx = idx;
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});

function filterPhase(phase) {
  rowEls.forEach((row, i) => {
    if (phase === 'all') {
      row.style.display = '';
    } else if (phase === 'productive') {
      row.style.display = tasks[i].phase === 'productive' ? '' : 'none';
    } else if (phase === 'spiral') {
      row.style.display = tasks[i].phase === 'spiral' || tasks[i].phase === 'drift' ? '' : 'none';
    }
  });
}
</script>
</body>
</html>`;
}
