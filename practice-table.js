(() => {
  const STYLE_ID='stackup-practice-table-style';

  function ensureTableStyles(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .positions-visual{margin-top:8px}
      .positions-board{position:relative;width:100%;aspect-ratio:9/14.2;min-height:520px;border-radius:24px;overflow:hidden;background:radial-gradient(circle at 50% 38%,var(--academy-surface-2) 0,var(--academy-bg-3) 48%,var(--academy-bg-2) 100%);border:1px solid var(--academy-silver-2);box-shadow:inset 0 0 45px var(--academy-shadow-heavy),0 12px 28px var(--academy-shadow-soft)}
      .positions-board:before{content:'♠';position:absolute;left:50%;top:3.5%;transform:translateX(-50%);color:var(--academy-ivory);font:26px Arial,sans-serif;text-shadow:0 0 12px var(--academy-ivory)88}
      .positions-table{position:absolute;left:15%;right:15%;top:11%;bottom:8%;border-radius:46%/19%;background:linear-gradient(90deg,var(--academy-surface-2) 0,var(--academy-graphite) 12%,var(--academy-surface-3) 24%,var(--academy-graphite-2) 50%,var(--academy-surface-3) 76%,var(--academy-graphite) 88%,var(--academy-surface) 100%);box-shadow:0 0 0 5px var(--academy-surface-2),0 0 0 8px var(--academy-muted-2),0 0 22px var(--academy-graphite-2)66,inset 0 0 20px var(--academy-silver-2)66}
      .positions-table:before{content:'';position:absolute;inset:7%;border-radius:46%/19%;background:radial-gradient(ellipse at center,var(--academy-surface-3) 0,var(--academy-surface-2) 58%,var(--academy-surface) 100%);border:2px solid var(--academy-graphite);box-shadow:inset 0 0 30px var(--academy-bg-2),inset 0 0 0 16px var(--academy-surface-2)}
      .positions-table:after{content:'♠';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:82px;height:82px;border:2px solid var(--academy-graphite);border-radius:50%;display:grid;place-items:center;color:var(--academy-silver)99;font:42px Arial,sans-serif}
      .seat{position:absolute;z-index:3;transform:translate(-50%,-50%)}
      .seat-label{display:block;min-width:62px;padding:7px 10px;border-radius:12px;background:linear-gradient(180deg,var(--academy-surface-2),var(--academy-bg-3));border:1.5px solid var(--academy-ivory);color:var(--academy-ivory);text-align:center;font-size:14px;line-height:1;box-shadow:0 4px 10px var(--academy-shadow-heavy),0 0 8px var(--academy-graphite-2)55;text-transform:uppercase;white-space:nowrap}
      .s-utg1{left:50%;top:10%}
      .s-utg2{left:70.5%;top:17.6%}
      .s-mp1{left:83.3%;top:37.6%}
      .s-mp2{left:83.3%;top:62.4%}
      .s-lj{left:70.5%;top:82.4%}
      .s-hj{left:50%;top:90%}
      .s-co{left:29.5%;top:82.4%}
      .s-btn{left:16.7%;top:62.4%}
      .s-sb{left:16.7%;top:37.6%}
      .s-bb{left:29.5%;top:17.6%}
      .dealer-button{position:absolute;z-index:4;left:30%;top:68.5%;width:30px;height:30px;transform:translate(-50%,-50%);border-radius:50%;display:grid;place-items:center;background:linear-gradient(180deg,var(--academy-ivory),var(--academy-ivory));border:2px solid var(--academy-ivory);color:var(--academy-surface);box-shadow:0 4px 10px var(--academy-shadow-heavy),0 0 10px var(--academy-ivory)70;font:700 14px Arial,sans-serif}
      .position-key{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
      .position-key .block{margin:0}
      .position-key .block h3{font-size:14px}
      .position-key .block p{font-size:14px}
      .position-key .dealer-info{grid-column:1/-1;background:var(--academy-ivory);border-color:var(--academy-silver-2)}
      @media(max-width:390px){.positions-board{min-height:470px}.seat-label{min-width:54px;padding:6px 7px;font-size:14px}.dealer-button{width:27px;height:27px;font-size:12px}.position-key{grid-template-columns:1fr}.position-key .dealer-info{grid-column:auto}}
    `;
    document.head.appendChild(style);
  }

  function tableMarkup(){
    return `<div class="p3-simulator-table positions-visual">
      <div class="positions-board" role="img" aria-label="Mesa de poker com 10 posições de jogador: UTG1, UTG2, MP1, MP2, LJ, HJ, CO, BTN, SB e BB. O botão do dealer está junto ao BTN.">
        <div class="positions-table"></div>
        <div class="seat s-utg1"><span class="seat-label">UTG1</span></div>
        <div class="seat s-utg2"><span class="seat-label">UTG2</span></div>
        <div class="seat s-mp1"><span class="seat-label">MP1</span></div>
        <div class="seat s-mp2"><span class="seat-label">MP2</span></div>
        <div class="seat s-lj"><span class="seat-label">LJ</span></div>
        <div class="seat s-hj"><span class="seat-label">HJ</span></div>
        <div class="seat s-co"><span class="seat-label">CO</span></div>
        <div class="seat s-btn"><span class="seat-label">BTN</span></div>
        <div class="dealer-button" aria-label="Botão do dealer junto ao BTN">D</div>
        <div class="seat s-sb"><span class="seat-label">SB</span></div>
        <div class="seat s-bb"><span class="seat-label">BB</span></div>
      </div>
    </div>`;
  }

  function apply(){
    const lesson=document.querySelector('#root .card.lesson');
    const title=lesson?.querySelector('h2')?.textContent?.trim().toUpperCase();
    if(!lesson||title!=='SIMULADOR')return;
    const shell=lesson.querySelector('.p3-shell');
    if(!shell||shell.querySelector('.p3-simulator-table'))return;
    ensureTableStyles();
    const progress=shell.querySelector('.p3-progress');
    if(progress)progress.insertAdjacentHTML('afterend',tableMarkup());
    else shell.insertAdjacentHTML('afterbegin',tableMarkup());
  }

  const root=document.getElementById('root');
  if(root)new MutationObserver(()=>requestAnimationFrame(apply)).observe(root,{childList:true,subtree:true});
  apply();
})();