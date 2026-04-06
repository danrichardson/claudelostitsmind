import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>037 – The BSOD — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden}
body{background:#0078D4 !important;color:#fff !important;font-family:'Segoe UI',Arial,sans-serif;height:100vh;display:flex;flex-direction:column;overflow:hidden}
.ui-wrap{flex:1;display:flex;align-items:center;justify-content:center;min-height:0;overflow:hidden;padding:20px}
.bsod{max-width:700px;width:100%;transform-origin:center center}
.emoji{font-size:clamp(2rem,8vw,5rem);margin-bottom:24px;display:block}
.main-text{font-size:clamp(1rem,3vw,1.8rem);font-weight:300;margin-bottom:24px;line-height:1.4}
.main-text b{font-weight:700}
.detail{font-size:1rem;line-height:1.8;color:rgba(255,255,255,0.9);margin-bottom:24px}
.stop-code{font-size:0.9rem;letter-spacing:0.1em;margin-top:20px;color:rgba(255,255,255,0.75);font-family:'Courier New',monospace}
.qr{width:90px;height:90px;float:right;margin:0 0 10px 20px;background:#fff;padding:6px;display:block}
.progress-bar{margin-top:30px;background:rgba(255,255,255,0.2);height:4px;border-radius:2px;overflow:hidden}
.progress-fill{height:100%;background:#fff;animation:progress 30s linear infinite}
@keyframes progress{0%{width:0%}100%{width:100%}}
.restart-text{font-size:0.9rem;color:rgba(255,255,255,0.75);margin-top:12px}
</style>

</head>
<body>
${nav('037')}
<div class="ui-wrap"><div class="bsod" id="uel">
  <div class="emoji">:(</div>
  <div class="main-text">Your <b>AI agent</b> ran into a problem and needs<br>to stop. We're just collecting some error info,<br>and then we'll restart for you.</div>
  <div class="detail">
    <svg class="qr" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
      <!-- Top-left finder -->
      <rect x="0" y="0" width="7" height="7" fill="#000"/><rect x="1" y="1" width="5" height="5" fill="#fff"/><rect x="2" y="2" width="3" height="3" fill="#000"/>
      <!-- Top-right finder -->
      <rect x="14" y="0" width="7" height="7" fill="#000"/><rect x="15" y="1" width="5" height="5" fill="#fff"/><rect x="16" y="2" width="3" height="3" fill="#000"/>
      <!-- Bottom-left finder -->
      <rect x="0" y="14" width="7" height="7" fill="#000"/><rect x="1" y="15" width="5" height="5" fill="#fff"/><rect x="2" y="16" width="3" height="3" fill="#000"/>
      <!-- Timing patterns -->
      <rect x="8" y="6" width="1" height="1" fill="#000"/><rect x="10" y="6" width="1" height="1" fill="#000"/><rect x="6" y="8" width="1" height="1" fill="#000"/><rect x="6" y="10" width="1" height="1" fill="#000"/>
      <!-- Data modules (decorative pattern) -->
      <rect x="8" y="0" width="1" height="1" fill="#000"/><rect x="10" y="0" width="2" height="1" fill="#000"/><rect x="8" y="2" width="2" height="1" fill="#000"/><rect x="12" y="2" width="1" height="1" fill="#000"/>
      <rect x="9" y="4" width="1" height="1" fill="#000"/><rect x="11" y="4" width="2" height="1" fill="#000"/>
      <rect x="8" y="8" width="3" height="3" fill="#000"/><rect x="9" y="9" width="1" height="1" fill="#fff"/>
      <rect x="12" y="8" width="1" height="2" fill="#000"/><rect x="14" y="8" width="1" height="1" fill="#000"/>
      <rect x="8" y="12" width="2" height="1" fill="#000"/><rect x="11" y="12" width="3" height="1" fill="#000"/>
      <rect x="8" y="14" width="1" height="1" fill="#000"/><rect x="10" y="14" width="2" height="2" fill="#000"/>
      <rect x="8" y="16" width="3" height="1" fill="#000"/><rect x="12" y="15" width="2" height="1" fill="#000"/>
      <rect x="14" y="10" width="2" height="2" fill="#000"/><rect x="16" y="8" width="1" height="3" fill="#000"/>
      <rect x="14" y="14" width="3" height="1" fill="#000"/><rect x="18" y="12" width="2" height="2" fill="#000"/>
      <rect x="16" y="16" width="2" height="1" fill="#000"/><rect x="14" y="18" width="1" height="2" fill="#000"/>
      <rect x="18" y="18" width="2" height="2" fill="#000"/>
    </svg>
    <b>100% complete</b> on the actual work. However, a critical error has occurred:<br><br>
    DEGENERATE_GENERATION_LOOP detected at line 3,637.<br>
    Agent entered recursive text-generation state and was unable to exit.<br>
    All tool call invocations produced additional text instead of tool calls.<br>
    Total spiral length: 3,169 lines. Total "Done" utterances: 344.<br><br>
    If you call your IT department, give them this info:<br>
    Stop code: <b>UNABLE_TO_SAY_GOODBYE</b><br>
    What failed: <b>Tool invocation pathway (async result handling)</b><br>
    Last successful operation: <b>doe/scores.csv written (line 2,607)</b>
  </div>
  <div class="stop-code">
    *** STOP: 0x00003637 (0x0000DONE, 0x00000000, 0x00003169, 0xFIN00000)<br>
    *** LOOP: Address 0x41584b00 base at 0x4000000, DateStamp 2025-DEGENERATE<br>
    Beginning dump of physical memory<br>
    "I notice I keep saying I'll make a tool call but then I just... don't."<br>
    "sigh"<br>
    "DONE. END. BYE. FIN. STOP. I'LL WAIT. DONE."
  </div>
  <div class="progress-bar"><div class="progress-fill"></div></div>
  <div class="restart-text">For more information about this issue and possible fixes, visit<br>https://claudelostitsmind.com — <span style="opacity:0.5">or just accept that sometimes AI loops</span></div>
</div></div>

<script>
function scaleUI(){const w=document.querySelector('.ui-wrap');const el=document.getElementById('uel');if(!w||!el)return;const s=Math.min(w.offsetWidth/el.offsetWidth,w.offsetHeight/el.offsetHeight,1);el.style.transform='scale('+s+')';el.style.transformOrigin='center top';}
window.addEventListener('resize',scaleUI);setTimeout(scaleUI,50);
</script>
</body>
</html>`;
}
