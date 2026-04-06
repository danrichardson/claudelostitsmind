import { nav } from '../shell.js';
import { SCORES, ALL_RUNS } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>006 – The Box Plot Ballet — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=EB+Garamond:ital@0;1&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html, body { height: 100%;
  overflow: hidden;
}
body{background:var(--bg);color:var(--text-warm);font-family:'EB Garamond',serif;height:100vh;display:flex;flex-direction:column;overflow:hidden}
.page{width:100%;max-width:1100px;margin:0 auto;padding:16px 24px;flex:1;display:flex;flex-direction:column;min-height:0}
h1{font-family:'Playfair Display',serif;font-size:1.8rem;color:var(--accent-warm);margin-bottom:2px}
.subtitle{font-style:italic;color:var(--muted-warm);margin-bottom:10px}
.controls{display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap}
.btn{padding:4px 10px;border:1px solid var(--border-warm);background:transparent;color:var(--muted-warm);cursor:pointer;font-family:'EB Garamond';font-size:0.85rem;transition:all 0.2s;border-radius:2px}
.btn.active{background:var(--accent-warm);color:var(--bg);border-color:var(--accent-warm)}
canvas{display:block;width:100%;flex:1;min-height:0;border:1px solid var(--border-warm);border-radius:4px;}
.note{font-size:0.75rem;color:var(--muted-warm);font-style:italic;margin-top:8px;line-height:1.6;flex:0 0 auto}
</style>

<style>
  :root { --bg: #f5f5f5; --fg: #111; --accent: #222;
    --text-warm: #4a2a08; --accent-warm: #b8881a; --muted-warm: #7a5020;
    --border-warm: #c8a870; --canvas-bg: #f0e8d8; --grid-color: rgba(100,60,10,0.12); --tick-color: #7a5020; }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #1a0a05; --fg: #e8e4f0; --accent: #00e5ff;
      --text-warm: #f5e6c8; --accent-warm: #d4a843; --muted-warm: #8a6030;
      --border-warm: #2a1a08; --canvas-bg: #120805; --grid-color: rgba(212,168,67,0.1); --tick-color: #5a3a10; }
  }
  @media (prefers-color-scheme: dark) {
    body { background: var(--bg) !important; color: var(--fg) !important; }
  }
</style>
</head>
<body>
${nav('006')}
<div class="page">
<h1>006 — The Box Plot Ballet</h1>
<p class="subtitle">How scores distribute across the 18 runs — and where they scatter</p>
<div class="controls" id="controls">
  <button class="btn active" data-m="0">R1</button>
  <button class="btn" data-m="1">R2</button>
  <button class="btn" data-m="2">R3</button>
  <button class="btn" data-m="3">R4</button>
  <button class="btn" data-m="5">R6 Words</button>
</div>
<canvas id="c" height="400"></canvas>
<p class="note">Each box spans the interquartile range (25th–75th percentile). The whiskers extend to the full range. Individual runs shown as dots — each dot is one experimental condition. Haiku orange · Sonnet teal · Opus gold.</p>
</div>
<script>
const SCORES=${JSON.stringify(SCORES)};
const ALL_RUNS=${JSON.stringify(ALL_RUNS)};
const COLORS={Haiku:'#FF6B35',Sonnet:'#4ECDC4',Opus:'#d4a843'};
const MODELS=['Haiku','Sonnet','Opus'];
const METRIC_NAMES=['R1 Completeness','R2 Specificity','R3 Accuracy','R4 Calibration','','R6 Words'];
const MAX=[14,10,10,5,0,2500];

let metric=0;

function getModelData(model,mi){
  return ALL_RUNS.filter(k=>k.startsWith(model)).map(k=>SCORES[k][mi]).sort((a,b)=>a-b);
}

function boxStats(arr){
  const n=arr.length;
  const q=(p)=>{
    const i=(n-1)*p,f=Math.floor(i);
    return f===i?arr[f]:arr[f]+(arr[f+1]-arr[f])*(i-f);
  };
  return{min:arr[0],q1:q(0.25),med:q(0.5),q3:q(0.75),max:arr[n-1]};
}

function draw(){
  const canvas=document.getElementById('c');
  const rect=canvas.getBoundingClientRect();
  canvas.width=rect.width||800;
  canvas.height=rect.height||400;
  const W=canvas.width,H=canvas.height;
  const ctx=canvas.getContext('2d');
  const dark=document.documentElement.dataset.dark==='true';
  const canvasBg=dark?'#120805':'#f0e8d8';
  const gridCol=dark?'rgba(212,168,67,0.1)':'rgba(100,60,10,0.12)';
  const tickCol=dark?'#5a3a10':'#7a5020';
  const axisLabelCol=dark?'#8a6030':'#7a5020';
  const medianCol=dark?'#fff':'#333';
  ctx.fillStyle=canvasBg;ctx.fillRect(0,0,W,H);

  const pad={l:60,r:30,t:30,b:50};
  const mi=parseInt(metric);
  const allVals=ALL_RUNS.map(k=>SCORES[k][mi]);
  const dataMin=mi===2?-10:0;
  const dataMax=MAX[mi];
  const toY=v=>H-pad.b-(v-dataMin)/(dataMax-dataMin)*(H-pad.t-pad.b);
  const section=(W-pad.l-pad.r)/MODELS.length;

  // Grid
  const steps=6;
  for(let i=0;i<=steps;i++){
    const v=dataMin+(dataMax-dataMin)*i/steps;
    const y=toY(v);
    ctx.strokeStyle=gridCol;ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(W-pad.r,y);ctx.stroke();
    ctx.fillStyle=tickCol;ctx.font='11px "EB Garamond"';ctx.textAlign='right';
    ctx.fillText(v.toFixed(mi===5?0:1),pad.l-6,y+4);
  }

  MODELS.forEach((model,mi2)=>{
    const cx=pad.l+section*mi2+section/2;
    const data=getModelData(model,mi);
    const stats=boxStats(data);
    const col=COLORS[model];
    const bw=section*0.35;

    // IQR box
    ctx.fillStyle=col+'22';
    ctx.fillRect(cx-bw/2,toY(stats.q3),bw,toY(stats.q1)-toY(stats.q3));
    ctx.strokeStyle=col;ctx.lineWidth=2;
    ctx.strokeRect(cx-bw/2,toY(stats.q3),bw,toY(stats.q1)-toY(stats.q3));

    // Median
    ctx.beginPath();ctx.moveTo(cx-bw/2,toY(stats.med));ctx.lineTo(cx+bw/2,toY(stats.med));
    ctx.strokeStyle=medianCol;ctx.lineWidth=2.5;ctx.stroke();

    // Whiskers
    ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.setLineDash([3,3]);
    ctx.beginPath();ctx.moveTo(cx,toY(stats.q3));ctx.lineTo(cx,toY(stats.max));ctx.stroke();
    ctx.beginPath();ctx.moveTo(cx,toY(stats.q1));ctx.lineTo(cx,toY(stats.min));ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();ctx.moveTo(cx-10,toY(stats.max));ctx.lineTo(cx+10,toY(stats.max));ctx.stroke();
    ctx.beginPath();ctx.moveTo(cx-10,toY(stats.min));ctx.lineTo(cx+10,toY(stats.min));ctx.stroke();

    // Dots
    data.forEach(v=>{
      ctx.beginPath();ctx.arc(cx+(Math.random()-0.5)*bw*0.6,toY(v),4,0,Math.PI*2);
      ctx.fillStyle=col+'cc';ctx.fill();
    });

    // Label
    ctx.fillStyle=col;ctx.font='bold 13px "Playfair Display"';ctx.textAlign='center';
    ctx.fillText(model,cx,H-pad.b+20);
  });

  ctx.fillStyle=axisLabelCol;ctx.font='13px "EB Garamond"';ctx.textAlign='center';
  ctx.fillText(METRIC_NAMES[mi],W/2,H-4);
}

document.getElementById('controls').addEventListener('click',e=>{
  if(e.target.dataset.m!==undefined){
    metric=e.target.dataset.m;
    document.querySelectorAll('.btn').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    draw();
  }
});

window.addEventListener('resize',draw);
draw();
</script>
</body>
</html>`;
}
