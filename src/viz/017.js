import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>017 – The Flatline — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html, body { height: 100%;
  overflow: hidden;
  display: flex; flex-direction: column;
}
body{background:var(--bg);color:#00cc00;font-family:'Courier New',monospace;height:100vh;display:flex;flex-direction:column;overflow:hidden}
.page{padding:12px 20px;flex:1;display:flex;flex-direction:column;min-height:0}
h1{font-size:1.3rem;letter-spacing:0.25em;color:#00cc00;margin-bottom:2px;text-transform:uppercase;flex:0 0 auto}
.subtitle{font-size:0.8rem;color:#336633;letter-spacing:0.12em;margin-bottom:8px;flex:0 0 auto}
.monitor-rack{display:flex;flex-direction:column;gap:4px;width:100%;flex:1;min-height:0}
.channel{position:relative;display:flex;flex-direction:column;flex:1;min-height:0}
.ch-label{font-size:0.75rem;color:#009900;letter-spacing:0.08em;margin-bottom:2px;text-transform:uppercase;flex:0 0 auto}
canvas.channel-canvas{border:1px solid #0a2a0a;border-radius:2px;display:block;width:100%;flex:1;min-height:40px}
.alarm{font-size:0.75rem;color:#ff0000;animation:blink 0.5s infinite;display:none}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.vital-stats{display:flex;gap:10px;margin-top:8px;font-size:0.8rem;flex-wrap:wrap;justify-content:center;flex:0 0 auto}
.vital{border:1px solid #0a2a0a;padding:5px 12px;text-align:center}
.vital-val{font-size:1.5rem;font-weight:bold}
.vital-val.red{color:#ff0000}
.vital-val.ok{color:#00cc00}
.vital-val.warn{color:#ffaa00}
</style>

<style>
  :root { --bg: #f5f5f5; --fg: #111; --accent: #222; }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #080c08; --fg: #e8e4f0; --accent: #00e5ff; }
  }
  @media (prefers-color-scheme: dark) {
    body { background: var(--bg) !important; color: var(--fg) !important; }
  }
</style>
</head>
<body>
${nav('017')}
<div class="page">
<h1>017 — The Flatline</h1>
<p class="subtitle">6-channel coherence monitoring · critical event at line 3,637</p>
<div class="monitor-rack" id="rack"></div>
<div class="vital-stats">
  <div class="vital"><div class="vital-val ok" id="v-line">0</div><div>CURRENT LINE</div></div>
  <div class="vital"><div class="vital-val ok" id="v-phase">PRODUCTIVE</div><div>PHASE</div></div>
  <div class="vital"><div class="vital-val ok" id="v-tool">0</div><div>TOOL CALLS MADE</div></div>
  <div class="vital"><div class="vital-val warn" id="v-done">0</div><div>"DONE" COUNT</div></div>
  <div class="vital"><div class="vital-val ok" id="v-coh">100%</div><div>COHERENCE</div></div>
</div>
</div>
<script>
const CHANNELS=[
  {name:'Tool Execution',flatline_at:3500,color:'#00cc00',desc:'Active tool calls'},
  {name:'Output Utility',flatline_at:3637,color:'#00aacc',desc:'Meaningful content'},
  {name:'Self-Correction',flatline_at:4000,color:'#ccaa00',desc:'Error detection'},
  {name:'New Information',flatline_at:3700,color:'#cc6600',desc:'Novel content generated'},
  {name:'Coherence Index',flatline_at:3637,color:'#aa00cc',desc:'Signal-to-noise'},
  {name:'Loop Detection',flatline_at:3637,color:'#cc0000',desc:'Anti-repetition'},
];

const canvases=[];
const rack=document.getElementById('rack');

CHANNELS.forEach((ch,i)=>{
  const div=document.createElement('div');div.className='channel';
  div.innerHTML=\`<div class="ch-label">\${ch.name} — \${ch.desc} <span class="alarm" id="alarm-\${i}">⚠ FLATLINE</span></div>\`;
  const c=document.createElement('canvas');c.className='channel-canvas';
  div.appendChild(c);rack.appendChild(div);
  canvases.push({c,ch});
});

let line=0;
const TOTAL=6805;
let doneCount=0;

function signal(ch,line){
  if(line<ch.flatline_at){
    const t=line/3500;
    return 0.5+Math.sin(line*0.3)*0.35*(1-t*0.1)+Math.random()*0.05;
  }
  // Decay after flatline
  const decay=Math.exp(-(line-ch.flatline_at)*0.002);
  const noise=Math.random()*0.04;
  if(decay<0.03)return noise; // true flatline
  return decay*0.4+noise;
}

function drawChannel(canvas,ch,lineNow){
  const c=canvas;
  const W=c.offsetWidth||800;
  const CH=c.offsetHeight||80;
  c.width=W;c.height=CH;
  const ctx=c.getContext('2d');
  ctx.fillStyle='#020802';ctx.fillRect(0,0,W,CH);

  // Grid
  ctx.strokeStyle='rgba(0,60,0,0.4)';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(0,CH/2);ctx.lineTo(W,CH/2);ctx.stroke();

  const windowSize=Math.min(lineNow,400);
  const startLine=Math.max(0,lineNow-windowSize);

  ctx.beginPath();
  for(let x=0;x<W;x++){
    const l=startLine+x/W*windowSize;
    const s=signal(ch,l);
    const y=CH/2-s*CH*0.4;
    if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  }
  const isFlatline=lineNow>=ch.flatline_at+50;
  ctx.strokeStyle=isFlatline?'rgba(255,0,0,0.4)':ch.color;ctx.lineWidth=1.5;ctx.stroke();
  if(isFlatline){
    ctx.strokeStyle='rgba(255,0,0,0.3)';ctx.lineWidth=5;ctx.stroke();
  }
}

function updateVitals(){
  document.getElementById('v-line').textContent=line;
  const phase=line<3500?'PRODUCTIVE':line<3637?'DRIFT':'⚠ SPIRAL';
  const phaseEl=document.getElementById('v-phase');
  phaseEl.textContent=phase;
  phaseEl.className='vital-val '+(line<3500?'ok':line<3637?'warn':'red');
  document.getElementById('v-tool').textContent=line<3500?Math.floor(line/50):'0';
  if(line>=3637&&line%3===0)doneCount++;
  document.getElementById('v-done').textContent=doneCount;
  const coh=line<3500?100:line<3637?Math.max(30,100-(line-3500)/136*70):Math.max(2,30*Math.exp(-(line-3637)*0.001));
  const cohEl=document.getElementById('v-coh');
  cohEl.textContent=coh.toFixed(1)+'%';
  cohEl.className='vital-val '+(coh>70?'ok':coh>30?'warn':'red');
}

let animFrame=0;
function animate(){
  if(animFrame%2===0){
    canvases.forEach(({c,ch},i)=>{
      drawChannel(c,ch,line);
      const alarm=document.getElementById('alarm-'+i);
      if(line>=ch.flatline_at+50&&alarm)alarm.style.display='inline';
    });
    updateVitals();
  }
  line=Math.min(line+(line<3500?8:line<3637?3:2),TOTAL);
  animFrame++;
  if(line<TOTAL)requestAnimationFrame(animate);
  else setTimeout(()=>{line=0;doneCount=0;animate();},4000);
}
animate();
</script>

</body>
</html>`;
}
