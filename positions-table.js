(() => {
  const STYLE_ID='stackup-positions-table-style';
  const EN='en-US';

  function isEnglish(){
    try{return localStorage.getItem('stackup-language-v1')===EN;}catch(_){return false;}
  }

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .card.lesson.positions-lesson-active{overflow-x:hidden}
      .card.lesson.positions-lesson-active>.blocks{width:auto;min-width:0;margin:0;padding:0}
      .positions-lesson-visual{
        width:auto;
        max-width:none;
        min-width:0;
        margin:8px 0 0;
        padding:0;
        box-sizing:border-box;
        display:flex;
        flex-direction:column;
        align-items:center;
        align-self:stretch;
        justify-self:stretch;
      }
      .positions-lesson-visual .positions-lesson-board{
        position:relative;
        width:auto!important;
        max-width:none!important;
        min-width:0;
        margin:0!important;
        align-self:stretch;
        box-sizing:border-box;
        aspect-ratio:9/14.2;
        min-height:520px;
        border-radius:24px;
        overflow:hidden;
        background:radial-gradient(circle at 50% 38%,var(--academy-surface-2) 0,var(--academy-bg-3) 48%,var(--academy-bg-2) 100%);
        border:1px solid var(--academy-silver-2);
        box-shadow:inset 0 0 45px var(--academy-shadow-heavy),0 12px 28px var(--academy-shadow-soft)
      }
      .positions-board:before{content:'♠';position:absolute;left:50%;top:3.5%;transform:translateX(-50%);color:var(--academy-ivory);font:26px Arial,sans-serif;text-shadow:0 0 12px var(--academy-ivory)88}
      .positions-table{position:absolute;left:15%;right:15%;top:11%;bottom:8%;border-radius:46%/19%;background:linear-gradient(90deg,var(--academy-surface-2) 0,var(--academy-graphite) 12%,var(--academy-surface-3) 24%,var(--academy-graphite-2) 50%,var(--academy-surface-3) 76%,var(--academy-graphite) 88%,var(--academy-surface) 100%);box-shadow:0 0 0 5px var(--academy-surface-2),0 0 0 8px var(--academy-muted-2),0 0 22px var(--academy-graphite-2)66,inset 0 0 20px var(--academy-silver-2)66}
      .positions-table:before{content:'';position:absolute;inset:7%;border-radius:46%/19%;background:radial-gradient(ellipse at center,var(--academy-surface-3) 0,var(--academy-surface-2) 58%,var(--academy-surface) 100%);border:2px solid var(--academy-graphite);box-shadow:inset 0 0 30px var(--academy-bg-2),inset 0 0 0 16px var(--academy-surface-2)}
      .positions-table:after{content:'♠';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:82px;height:82px;border:2px solid var(--academy-graphite);border-radius:50%;display:grid;place-items:center;color:var(--academy-silver)99;font:42px Arial,sans-serif}
      .seat{position:absolute;z-index:3;transform:translate(-50%,-50%)}
      .seat-label{display:block;min-width:62px;padding:7px 10px;border-radius:12px;background:linear-gradient(180deg,var(--academy-surface-2),var(--academy-bg-3));border:1.5px solid var(--academy-ivory);color:var(--academy-ivory);text-align:center;font-size:16px;line-height:1;box-shadow:0 4px 10px var(--academy-shadow-heavy),0 0 8px var(--academy-graphite-2)55;text-transform:uppercase;white-space:nowrap}
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
      .positions-lesson-key{
        width:auto!important;
        max-width:none!important;
        min-width:0;
        align-self:stretch;
        box-sizing:border-box;
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:10px;
        margin:14px auto 0;
        padding:0;
        justify-items:stretch;
      }
      .positions-lesson-key .block{
        width:100%;
        max-width:100%;
        box-sizing:border-box;
        margin:0 auto;
      }
      .positions-lesson-key .block h3{font-size:17px}
      .positions-lesson-key .block p{font-size:14px}
      .positions-lesson-key .dealer-info{grid-column:1/-1;background:var(--academy-ivory);border-color:var(--academy-silver-2)}
      @media(max-width:390px){
        .positions-lesson-visual .positions-lesson-board{min-height:470px}
        .seat-label{min-width:54px;padding:6px 7px;font-size:14px}
        .dealer-button{width:27px;height:27px;font-size:12px}
        .positions-lesson-key{grid-template-columns:1fr}
        .positions-lesson-key .dealer-info{grid-column:auto}
      }
    `;
    document.head.appendChild(style);
  }

  function copy(){
    if(isEnglish()){
      return {
        boardLabel:'Poker table with 10 player positions distributed evenly: UTG1, UTG2, MP1, MP2, LJ, HJ, CO, BTN, SB, and BB. The dealer button is marked next to BTN.',
        dealerLabel:'Dealer button next to BTN',
        blocks:`
          <div class="block"><h3>BLINDS</h3><p><strong>SB — SMALL BLIND</strong> and <strong>BB — BIG BLIND</strong> are the forced-bet positions.</p></div>
          <div class="block"><h3>EARLY POSITIONS</h3><p><strong>UTG1 — UNDER THE GUN 1</strong> and <strong>UTG2 — UNDER THE GUN 2</strong> act early and have less information.</p></div>
          <div class="block"><h3>MIDDLE POSITIONS</h3><p><strong>MP1 — MIDDLE POSITION 1</strong>, <strong>MP2 — MIDDLE POSITION 2</strong>, and <strong>LJ — LOJACK</strong> form the middle-position area of the table.</p></div>
          <div class="block"><h3>LATE POSITIONS</h3><p><strong>HJ — HIJACK</strong>, <strong>CO — CUTOFF</strong>, and <strong>BTN — BUTTON</strong> act later and usually have more information.</p></div>
          <div class="block dealer-info"><h3>DEALER</h3><p>The <strong>DEALER</strong> handles the physical dealing of the cards. The <strong>BTN — BUTTON</strong> marks the nominal dealer position among the players and serves as the reference point for the action order.</p></div>`
      };
    }
    return {
      boardLabel:'Mesa de poker com 10 posições de jogador distribuídas uniformemente: UTG1, UTG2, MP1, MP2, LJ, HJ, CO, BTN, SB e BB. O botão do dealer está marcado junto ao BTN.',
      dealerLabel:'Botão do dealer junto ao BTN',
      blocks:`
          <div class="block"><h3>BLINDS</h3><p><strong>SB — SMALL BLIND</strong> e <strong>BB — BIG BLIND</strong> são as posições das apostas obrigatórias.</p></div>
          <div class="block"><h3>POSIÇÕES INICIAIS</h3><p><strong>UTG1 — UNDER THE GUN 1</strong> e <strong>UTG2 — UNDER THE GUN 2</strong> agem cedo e têm menos informação.</p></div>
          <div class="block"><h3>POSIÇÕES MÉDIAS</h3><p><strong>MP1 — MIDDLE POSITION 1</strong>, <strong>MP2 — MIDDLE POSITION 2</strong> e <strong>LJ — LOJACK</strong> formam a região intermediária da mesa.</p></div>
          <div class="block"><h3>POSIÇÕES FINAIS</h3><p><strong>HJ — HIJACK</strong>, <strong>CO — CUTOFF</strong> e <strong>BTN — BUTTON</strong> agem mais tarde e normalmente têm mais informação.</p></div>
          <div class="block dealer-info"><h3>DEALER</h3><p><strong>DEALER — CRUPIÊ</strong> conduz a distribuição física das cartas. O <strong>BTN — BUTTON</strong> marca a posição nominal do dealer entre os jogadores e serve de referência para a ordem de ação.</p></div>`
    };
  }

  function renderPositionsLesson(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    if(!lesson || !title) return;
    const normalized=title.textContent.trim().toUpperCase();
    if(normalized!=='POSIÇÕES NA MESA' && normalized!=='TABLE POSITIONS') return;
    if(lesson.querySelector('.positions-lesson-visual')) return;
    lesson.classList.add('positions-lesson-active');
    addStyles();
    const blocks=lesson.querySelector('.blocks');
    if(!blocks) return;
    const text=copy();
    blocks.innerHTML=`
      <div class="positions-visual positions-lesson-visual">
        <div class="positions-board positions-lesson-board" role="img" aria-label="${text.boardLabel}">
          <div class="positions-table"></div>
          <div class="seat s-utg1"><span class="seat-label">UTG1</span></div>
          <div class="seat s-utg2"><span class="seat-label">UTG2</span></div>
          <div class="seat s-mp1"><span class="seat-label">MP1</span></div>
          <div class="seat s-mp2"><span class="seat-label">MP2</span></div>
          <div class="seat s-lj"><span class="seat-label">LJ</span></div>
          <div class="seat s-hj"><span class="seat-label">HJ</span></div>
          <div class="seat s-co"><span class="seat-label">CO</span></div>
          <div class="seat s-btn"><span class="seat-label">BTN</span></div>
          <div class="dealer-button" aria-label="${text.dealerLabel}">D</div>
          <div class="seat s-sb"><span class="seat-label">SB</span></div>
          <div class="seat s-bb"><span class="seat-label">BB</span></div>
        </div>
        <div class="position-key positions-lesson-key">${text.blocks}</div>
      </div>`;
  }

  const observer=new MutationObserver(renderPositionsLesson);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  renderPositionsLesson();
})();