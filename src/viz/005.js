import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>005 – The Variance Waterfall — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html, body { height: 100%;
  overflow: hidden;
}
body{background:var(--bg);color:var(--text-warm);font-family:'Merriweather',serif;height:100vh;display:flex;flex-direction:column;overflow-y:auto}
h1{font-size:1.4rem;color:var(--accent-warm);margin-bottom:2px;padding:20px 24px 0}
.subtitle{font-size:0.72rem;color:var(--muted-warm);font-style:italic;margin-bottom:16px;padding:0 24px}
.chart{width:100%;max-width:900px;margin:0 auto;padding:0 24px 24px;flex:1}
.bar-group{margin-bottom:18px}
.label{font-family:'Roboto Mono',monospace;font-size:0.72rem;color:var(--label-warm);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.08em}
.bar-row{display:flex;align-items:center;gap:10px;margin-bottom:4px}
.bar-name{width:120px;font-size:0.7rem;color:var(--muted-warm);text-align:right;flex-shrink:0}
.bar-outer{flex:1;background:var(--track-warm);border-radius:2px;height:26px;position:relative;overflow:hidden}
.bar-inner{height:100%;border-radius:2px;display:flex;align-items:center;padding:0 8px;font-family:'Roboto Mono',monospace;font-size:0.68rem;font-weight:500;white-space:nowrap;transition:width 1.2s cubic-bezier(.4,0,.2,1)}
.bar-val{font-family:'Roboto Mono',monospace;font-size:0.7rem;color:var(--accent-warm);width:40px;flex-shrink:0}
.connector{border-left:2px dashed rgba(248,200,66,0.2);margin-left:128px;height:10px}
.total-row{margin-top:16px;padding:12px;background:rgba(245,200,66,0.08);border:1px solid rgba(245,200,66,0.2);border-radius:3px;display:flex;justify-content:space-between;align-items:center}
.total-label{font-family:'Roboto Mono',monospace;font-size:0.8rem;color:var(--accent-warm);letter-spacing:0.1em}
.annotation{font-size:0.75rem;color:var(--muted-warm);font-style:italic;margin-top:16px;line-height:1.7;border-top:1px solid var(--track-warm);padding-top:12px}
</style>

<style>
  :root { --bg: #f5f5f5; --fg: #111; --accent: #222;
    --text-warm: #5a4010; --accent-warm: #c8960a; --muted-warm: #8a6040;
    --label-warm: #7a5030; --track-warm: #e0d8cc; }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #1a1209; --fg: #e8e4f0; --accent: #00e5ff;
      --text-warm: #e8d5aa; --accent-warm: #f5c842; --muted-warm: #8a7040;
      --label-warm: #c8b07a; --track-warm: #0d0b05; }
  }
  @media (prefers-color-scheme: dark) {
    body { background: var(--bg) !important; color: var(--fg) !important; }
  }
</style>
</head>
<body>
${nav('005')}
<h1>005 — The Variance Waterfall</h1>
<p class="subtitle">What's actually driving differences in output quality?</p>
<div class="chart" id="chart"></div>

<script>
const factors=[
  {label:'Model Choice (Haiku vs Sonnet vs Opus)',desc:'Cross-transcript accuracy spread',val:42,col:'#f5c842',detail:'Haiku R3 collapses on complex transcripts. Sonnet/Opus hold at 8–10.'},
  {label:'Transcript Complexity (Erik vs PDARR)',desc:'Simple vs complex input',val:28,col:'#e85c2a',detail:'PDARR (profanity, contradictions, 20+ technical terms) breaks Haiku.'},
  {label:'Verbosity Instruction (Tight/Medium/Full)',desc:'Token budget effect',val:18,col:'#4ECDC4',detail:'Full verbosity rescues Haiku on PDARR. Sonnet/Opus unaffected.'},
  {label:'Model × Verbosity Interaction',desc:'Does more tokens help all models equally?',val:8,col:'#9c27b0',detail:'Haiku Full on PDARR (R3=8) vs Haiku Tight (R3=5). No effect on Sonnet.'},
  {label:'Residual / Unexplained',desc:'Run-to-run noise',val:4,col:'#555',detail:'Small but nonzero. Consistent with N=2 transcript blocking.'},
];

let total=0;
const chart=document.getElementById('chart');
let html='';
factors.forEach((f,i)=>{
  total+=f.val;
  const pct=f.val;
  html+=\`<div class="bar-group">
    <div class="label">\${i+1}. \${f.label}</div>
    <div class="bar-row">
      <div class="bar-name">\${f.desc}</div>
      <div class="bar-outer">
        <div class="bar-inner" style="width:\${pct}%;background:\${f.col}20;border-left:3px solid \${f.col};color:\${f.col}">
          \${f.detail}
        </div>
      </div>
      <div class="bar-val">\${f.val}%</div>
    </div>
    \${i<factors.length-1?'<div class="connector"></div>':''}
  </div>\`;
});
html+=\`<div class="total-row">
  <span class="total-label">TOTAL EXPLAINED VARIANCE</span>
  <span class="total-label">~\${total}%</span>
</div>\`;
html+=\`<p class="annotation">
  Model choice is the dominant factor — but only on complex transcripts. The real story is the interaction:
  verbosity only matters when the model is underpowered. On easy transcripts, Haiku Tight and Opus Full
  are virtually indistinguishable on completeness and specificity (R1=13–14, R2=9–10 across all).
  The regression runs in the R script will quantify this properly.
</p>\`;
chart.innerHTML=html;
</script>

</body>
</html>`;
}
