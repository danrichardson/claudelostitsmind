import { nav } from '../shell.js';
import { PHRASE_COUNTS } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>019 – The Frequency Waterfall — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html, body { height: 100%;
  overflow: hidden;
  display: flex; flex-direction: column;
}
body{background:var(--bg);color:#8888ff;font-family:monospace;height:100vh;display:flex;flex-direction:column;overflow:hidden}
.page{padding:12px 20px;flex:1;display:flex;flex-direction:column;min-height:0}
h1{font-size:1rem;letter-spacing:0.2em;color:#4466ff;margin-bottom:2px;text-transform:uppercase;flex:0 0 auto}
.subtitle{font-size:0.6rem;color:#222244;letter-spacing:0.12em;margin-bottom:8px;flex:0 0 auto}
canvas{display:block;width:100%;flex:1;min-height:0;border:1px solid #111133}
.legend{display:flex;gap:20px;margin-top:8px;font-size:0.6rem;color:#333366;flex-wrap:wrap;justify-content:center;flex:0 0 auto}
.note{font-size:0.6rem;color:#222244;margin-top:6px;text-align:center;max-width:600px;line-height:1.6;flex:0 0 auto}
</style>

<style>
  :root { --bg: #f5f5f5; --fg: #111; --accent: #222; }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #000010; --fg: #e8e4f0; --accent: #00e5ff; }
  }
  @media (prefers-color-scheme: dark) {
    body { background: var(--bg) !important; color: var(--fg) !important; }
  }
</style>

<style>
  @keyframes subtleBreathe {
    0% { filter: brightness(1); }
    50% { filter: brightness(0.95); }
    100% { filter: brightness(1); }
  }
  body { animation: subtleBreathe 8s ease-in-out infinite; }
</style>
</head>
<body>
${nav('019')}
<div class="page">
<h1>019 — The Frequency Waterfall</h1>
<p class="subtitle">phrase repetition frequency · time as depth · the spiral builds from the bottom up</p>
<canvas id="c"></canvas>
<div class="legend">
  <span style="color:#4466ff">■ "Let me check"</span>
  <span style="color:#44aaff">■ "Done"</span>
  <span style="color:#44ffaa">■ "I'll wait"</span>
  <span style="color:#ffaa44">■ "OK."</span>
  <span style="color:#ff4444">■ "I apologize"</span>
</div>
<p class="note">Each horizontal slice = 100-line window. Brightness = phrase frequency in that window. Read top to bottom = the session unfolding. The bright bands at the bottom = the spiral phase, where repetition becomes pathological.</p>
</div>
<script>
const PHRASES=[
  {phrase:"Let me check",counts:generateFreq('letcheck'),col:[68,102,255]},
  {phrase:"Done",counts:generateFreq('done'),col:[68,170,255]},
  {phrase:"I'll wait",counts:generateFreq('wait'),col:[68,255,170]},
  {phrase:"OK.",counts:generateFreq('ok'),col:[255,170,68]},
  {phrase:"I apologize",counts:generateFreq('apol'),col:[255,68,68]},
];
const TOTAL=6805;
const WINDOW=100;
const N_WINDOWS=Math.ceil(TOTAL/WINDOW);

function generateFreq(type){
  const arr=[];
  for(let w=0;w<N_WINDOWS;w++){
    const lineStart=w*WINDOW;
    let val=0;
    if(lineStart<3500){
      // Productive phase: low but visible repetition
      val=0.08+Math.random()*0.12;
    }else if(lineStart<3637){
      // Drift: growing
      val=0.05+(lineStart-3500)/137*0.3+Math.random()*0.1;
    }else{
      // Spiral: high, sustained
      const t=(lineStart-3637)/(TOTAL-3637);
      const base={letcheck:0.6+t*0.1,done:0.7+t*0.05,wait:0.4+t*0.2,ok:0.5+t*0.15,apol:0.3+t*0.1}[type]||0.4;
      val=base*(0.85+Math.random()*0.3);
    }
    arr.push(Math.min(1,val));
  }
  return arr;
}

const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');

function drawWaterfall(){
  const rect=canvas.getBoundingClientRect();
  const W=canvas.width=rect.width||800;
  const availH=rect.height||400;
  const rowH=Math.max(2,Math.floor((availH-20)/N_WINDOWS));
  const H=canvas.height=N_WINDOWS*rowH+20;
  ctx.fillStyle='#000010';ctx.fillRect(0,0,W,H);

  const colW=Math.floor(W/PHRASES.length);

  PHRASES.forEach((ph,pi)=>{
    const x=pi*colW;
    ph.counts.forEach((freq,wi)=>{
      const y=wi*rowH;
      const [r,g,b]=ph.col;
      ctx.fillStyle=\`rgba(\${r},\${g},\${b},\${freq})\`;
      ctx.fillRect(x,y,colW-2,rowH);
    });
    ctx.fillStyle='rgba(100,100,200,0.7)';ctx.font='9px monospace';ctx.textAlign='center';
    ctx.fillText(ph.phrase,x+colW/2,H-4);
  });

  ctx.fillStyle='rgba(100,100,200,0.6)';ctx.font='9px monospace';ctx.textAlign='right';
  const prodEnd=Math.floor(3500/WINDOW)*rowH;
  const spiralStart=Math.floor(3637/WINDOW)*rowH;
  ctx.fillText('←productive',W-4,prodEnd-2);
  ctx.fillText('←spiral',W-4,spiralStart+10);
  ctx.strokeStyle='rgba(255,100,0,0.4)';ctx.lineWidth=1;ctx.setLineDash([3,3]);
  ctx.beginPath();ctx.moveTo(0,spiralStart);ctx.lineTo(W,spiralStart);ctx.stroke();
}

window.addEventListener('resize',drawWaterfall);
drawWaterfall();
</script>


</body>
</html>`;
}
