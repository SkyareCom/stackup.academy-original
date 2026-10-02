(() => {
  const BANK=()=>window.StackupFundamentalsSpotBank||{};
  const STORAGE='stackup-fundamentals-progress-v1';
  const runtimes={};
  const TYPE_LABEL={choice:'ESCOLHA',binary:'CERTO / ERRADO',sequence:'COLOQUE EM ORDEM'};

  function addStyles(){
    if(document.getElementById('stackup-fundamentals-interactive-style'))return;
    const s=document.createElement('style');
    s.id='stackup-fundamentals-interactive-style';
    s.textContent=`
      .fi-shell{margin-top:20px;border:2px solid var(--gold,var(--academy-ivory));border-radius:20px;overflow:hidden;background:var(--b2,var(--academy-bg-3));box-shadow:0 12px 28px var(--academy-shadow-soft);color:var(--w,var(--academy-white))}
      .fi-head{padding:17px 16px 14px;background:linear-gradient(180deg,var(--academy-surface-2),var(--academy-bg));border-bottom:1px solid var(--academy-ivory)50}
      .fi-kicker{display:block;color:var(--gold,var(--academy-ivory));font-size:12px;letter-spacing:.09em;text-transform:uppercase;margin-bottom:3px}
      .fi-head h3{margin:0;color:var(--w,var(--academy-white));font-size:14px;line-height:1.08;text-transform:uppercase}
      .fi-head p{margin:7px 0 0;color:var(--academy-muted);font-size:14px;line-height:1.45}
      .fi-modes{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
      .fi-mode{padding:5px 8px;border:1px solid var(--academy-ivory)66;border-radius:9px;color:var(--academy-silver-3);font-size:12px;letter-spacing:.04em;text-transform:uppercase;background:var(--academy-bg)}
      .fi-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;padding:11px 12px;background:var(--academy-bg);border-bottom:1px solid var(--academy-ivory)40}
      .fi-stat{padding:9px 6px;border-radius:12px;border:1px solid var(--academy-ivory)44;background:var(--academy-bg-3);text-align:center;min-width:0}
      .fi-stat b{display:block;color:var(--gold,var(--academy-ivory));font-size:14px;line-height:1}
      .fi-stat span{display:block;color:var(--academy-silver-3);font-size:10px;letter-spacing:.05em;text-transform:uppercase;margin-top:5px;white-space:nowrap}
      .fi-stat small{display:block;color:var(--academy-muted);font-size:10px;margin-top:2px}
      .fi-body{padding:14px}
      .fi-spot{background:var(--c,var(--academy-ivory));border:1px solid var(--gold2,var(--academy-warning));border-radius:17px;color:var(--ink,var(--academy-bg-3));overflow:hidden}
      .fi-spotbar{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 11px;background:var(--academy-ivory-2);border-bottom:1px solid var(--academy-warning)44}
      .fi-spotbar span{font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--academy-muted-2)}
      .fi-type{padding:5px 7px!important;border-radius:8px;background:var(--academy-bg)!important;color:var(--academy-ivory)!important;border:1px solid var(--academy-ivory)55}
      .fi-question{padding:15px 14px 10px;font-size:14px;line-height:1.42;color:var(--academy-bg-3)}
      .fi-options{display:grid;gap:8px;padding:4px 12px 14px}
      .fi-option{width:100%;min-height:46px;border:1px solid var(--academy-warning)66;border-radius:12px;background:var(--academy-white);color:var(--academy-bg-3);text-align:left;padding:10px 12px;font:inherit;font-size:14px;line-height:1.3;cursor:pointer}
      .fi-option:active{transform:scale(.99)}
      .fi-option[disabled]{cursor:default;opacity:1}
      .fi-option.fi-picked{border:2px solid var(--academy-muted-2);background:var(--academy-ivory-2)}
      .fi-option.fi-correct{border:2px solid var(--academy-success);background:color-mix(in srgb,var(--academy-success) 24%,var(--academy-ivory-2));color:var(--academy-surface-2)}
      .fi-option.fi-wrong{border:2px solid var(--academy-warning);background:var(--academy-ivory-2);color:var(--academy-bg-3)}
      .fi-seqnum{display:inline-grid;place-items:center;width:25px;height:25px;border-radius:8px;background:var(--academy-bg);color:var(--academy-ivory);margin-right:8px;font-size:12px;vertical-align:middle}
      .fi-help{padding:0 14px 11px;color:var(--academy-muted-2);font-size:12px;line-height:1.35}
      .fi-feedback{margin:0 12px 14px;border-radius:13px;border:1px solid var(--academy-warning)60;overflow:hidden;background:var(--academy-ivory)}
      .fi-result{padding:10px 12px;font-size:14px;text-transform:uppercase;letter-spacing:.04em}
      .fi-result.ok{background:var(--academy-success);color:var(--academy-white)}
      .fi-result.no{background:var(--academy-bg);color:var(--academy-ivory)}
      .fi-analysis{padding:11px 12px;color:var(--academy-muted-2);font-size:14px;line-height:1.45}
      .fi-analysis strong{color:var(--academy-bg-3)}
      .fi-comment{margin-top:8px;padding-top:8px;border-top:1px solid var(--academy-warning)44;color:var(--academy-muted-2)}
      .fi-nav{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin-top:11px}
      .fi-btn{min-height:43px;border:1px solid var(--academy-ivory)66;border-radius:12px;background:var(--academy-bg);color:var(--academy-ivory);font:inherit;font-size:12px;text-transform:uppercase;padding:8px;cursor:pointer}
      .fi-btn.primary{background:var(--academy-success);color:var(--academy-white);border-color:var(--academy-ivory)}
      .fi-btn:disabled{opacity:.38;cursor:default}
      .fi-complete{margin-top:10px;padding:10px 12px;border-radius:12px;background:var(--academy-success);color:var(--academy-white);font-size:12px;line-height:1.4;text-align:center}
      @media(max-width:390px){.fi-head h3{font-size:14px}.fi-stat b{font-size:14px}.fi-stat span{font-size:10px}.fi-question{font-size:14px}.fi-btn{font-size:12px;padding:7px 4px}}
    `;
    document.head.appendChild(s);
  }

  function readStore(){try{return JSON.parse(localStorage.getItem(STORAGE)||'{}')||{};}catch(_){return {};}}
  function writeStore(data){try{localStorage.setItem(STORAGE,JSON.stringify(data));}catch(_){}}
  function chapterProgress(chapter){const all=readStore();return all[chapter]||{answers:{}};}
  function saveAnswer(chapter,spot,selected,correct){const all=readStore();const cp=all[chapter]||{answers:{}};const old=cp.answers[spot.id];cp.answers[spot.id]={selected,correct,attempts:(old?.attempts||0)+1,updatedAt:Date.now()};all[chapter]=cp;writeStore(all);}
  function shuffle(a){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}
  function seededShuffle(a,seedText){let seed=0;for(let i=0;i<seedText.length;i++)seed=(seed*31+seedText.charCodeAt(i))>>>0;const x=[...a];for(let i=x.length-1;i>0;i--){seed=(1664525*seed+1013904223)>>>0;const j=seed%(i+1);[x[i],x[j]]=[x[j],x[i]];}return x;}
  function balancedShuffle(spots){const groups={choice:shuffle(spots.filter(s=>s.type==='choice')),binary:shuffle(spots.filter(s=>s.type==='binary')),sequence:shuffle(spots.filter(s=>s.type==='sequence'))};const out=[];let last='';while(groups.choice.length||groups.binary.length||groups.sequence.length){let available=Object.keys(groups).filter(k=>groups[k].length&&k!==last);if(!available.length)available=Object.keys(groups).filter(k=>groups[k].length);const type=available[Math.floor(Math.random()*available.length)];out.push(groups[type].shift());last=type;}return out;}
  function buildQueue(chapter){const spots=BANK()[chapter]||[];const answers=chapterProgress(chapter).answers||{};const unseen=spots.filter(s=>!answers[s.id]);const seen=spots.filter(s=>answers[s.id]);return [...balancedShuffle(unseen),...balancedShuffle(seen)];}
  function runtime(chapter){if(!runtimes[chapter])runtimes[chapter]={chapter,queue:buildQueue(chapter),history:[],cursor:-1,redo:false,seq:[]};return runtimes[chapter];}
  function nextSpot(rt){if(rt.cursor<rt.history.length-1){rt.cursor++;rt.redo=false;rt.seq=[];return;}let spot=rt.queue.shift();if(!spot){rt.queue=balancedShuffle(BANK()[rt.chapter]||[]);spot=rt.queue.shift();}if(spot){rt.history.push(spot.id);rt.cursor=rt.history.length-1;rt.redo=false;rt.seq=[];}}
  function currentSpot(rt){const id=rt.history[rt.cursor];return (BANK()[rt.chapter]||[]).find(s=>s.id===id);}
  function chapterTotal(chapter){return Math.max(1,(BANK()[chapter]||[]).length||50);}
  function statData(chapter){const answers=chapterProgress(chapter).answers||{};const vals=Object.values(answers);const realized=vals.length;const correct=vals.filter(x=>x.correct).length;const total=chapterTotal(chapter);return {correct,realized,total,correctPct:realized?Math.round(correct/realized*100):0,realizedPct:Math.min(100,Math.round(realized/total*100))};}
  const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function sameAnswer(a,b){return Array.isArray(a)&&Array.isArray(b)?a.length===b.length&&a.every((v,i)=>v===b[i]):a===b;}

  function renderShell(shell,chapter){
    const rt=runtime(chapter);if(rt.cursor<0)nextSpot(rt);const spot=currentSpot(rt);if(!spot)return;
    const stats=statData(chapter);const total=stats.total;const progress=chapterProgress(chapter).answers||{};const saved=progress[spot.id];const locked=!!saved&&!rt.redo;const pos=(BANK()[chapter]||[]).findIndex(s=>s.id===spot.id)+1;let optionHtml='';
    if(spot.type==='choice'||spot.type==='binary'){
      const opts=seededShuffle(spot.options,spot.id+'-options');
      optionHtml=opts.map(o=>{let cls='fi-option';if(locked){if(o===spot.answer)cls+=' fi-correct';if(saved.selected===o&&o!==spot.answer)cls+=' fi-wrong';if(saved.selected===o)cls+=' fi-picked';}return `<button class="${cls}" data-answer="${esc(o)}" ${locked?'disabled':''}>${esc(o)}</button>`;}).join('');
    }else{
      const items=seededShuffle(spot.items,spot.id+'-items');const selected=locked?(Array.isArray(saved.selected)?saved.selected:[]):rt.seq;
      optionHtml=items.map(o=>{const idx=selected.indexOf(o);let cls='fi-option';if(idx>=0)cls+=' fi-picked';if(locked&&spot.answer.includes(o))cls+=' fi-correct';return `<button class="${cls}" data-seq="${esc(o)}" ${locked?'disabled':''}>${idx>=0?`<span class="fi-seqnum">${idx+1}</span>`:''}${esc(o)}</button>`;}).join('');
    }
    shell.innerHTML=`<div class="fi-head"><span class="fi-kicker">PRÁTICA INTERATIVA · ${total} SPOTS</span><h3>TREINE ESTE CAPÍTULO</h3><p>Os spots são sorteados entre três formatos e priorizam questões ainda não realizadas. Refazer não aumenta artificialmente o total realizado.</p><div class="fi-modes"><span class="fi-mode">ESCOLHA</span><span class="fi-mode">CERTO / ERRADO</span><span class="fi-mode">ORDEM</span></div></div><div class="fi-stats" data-fi-total="${total}"><div class="fi-stat"><b>${stats.correctPct}%</b><span>CERTOS</span><small>${stats.correct}/${stats.realized||0}</small></div><div class="fi-stat"><b>${stats.realizedPct}%</b><span>REALIZADOS</span><small>${stats.realized}/${total}</small></div><div class="fi-stat"><b>100%</b><span>TOTAL</span><small>${total}/${total}</small></div></div><div class="fi-body"><div class="fi-spot"><div class="fi-spotbar"><span>SPOT ${String(pos).padStart(2,'0')} / ${total}</span><span class="fi-type">${TYPE_LABEL[spot.type]}</span></div><div class="fi-question">${esc(spot.prompt)}</div>${spot.type==='sequence'?'<div class="fi-help">Toque nos itens na ordem correta. Ao selecionar todos, o resultado é conferido automaticamente.</div>':''}<div class="fi-options">${optionHtml}</div>${locked?feedbackHtml(spot,saved):''}</div><div class="fi-nav"><button class="fi-btn" data-fi-prev ${rt.cursor<=0?'disabled':''}>‹ ANTERIOR</button><button class="fi-btn" data-fi-redo ${!saved?'disabled':''}>↻ REFAZER</button><button class="fi-btn primary" data-fi-next>PRÓXIMO ›</button></div>${stats.realized===total?`<div class="fi-complete">CAPÍTULO TREINADO: ${total}/${total} SPOTS REALIZADOS. Você pode continuar usando PRÓXIMO para revisar o banco em nova ordem.</div>`:''}</div>`;
    bind(shell,chapter);
  }

  function feedbackHtml(spot,saved){const selected=Array.isArray(saved.selected)?saved.selected.join(' → '):saved.selected;const answer=Array.isArray(spot.answer)?spot.answer.join(' → '):spot.answer;return `<div class="fi-feedback"><div class="fi-result ${saved.correct?'ok':'no'}">${saved.correct?'✓ RESULTADO: ACERTO':'✕ RESULTADO: REVISAR'}</div><div class="fi-analysis"><strong>SUA RESPOSTA:</strong> ${esc(selected)}<br><strong>RESPOSTA CORRETA:</strong> ${esc(answer)}<br><br><strong>ANÁLISE:</strong> ${esc(spot.analysis)}<div class="fi-comment"><strong>COMENTÁRIO:</strong> ${saved.correct?'Boa decisão. Você aplicou corretamente o conceito deste spot. Use PRÓXIMO para receber outra situação sorteada.':'Este ponto ainda merece revisão. Leia a análise, use REFAZER e tente aplicar a regra sem depender da resposta anterior.'}</div></div></div>`;}
  function grade(shell,chapter,spot,selected){const correct=sameAnswer(selected,spot.answer);saveAnswer(chapter,spot,selected,correct);const rt=runtime(chapter);rt.redo=false;rt.seq=[];renderShell(shell,chapter);}
  function bind(shell,chapter){
    const rt=runtime(chapter);const spot=currentSpot(rt);if(!spot)return;
    shell.querySelectorAll('[data-answer]').forEach(btn=>btn.onclick=()=>grade(shell,chapter,spot,btn.dataset.answer));
    shell.querySelectorAll('[data-seq]').forEach(btn=>btn.onclick=()=>{const v=btn.dataset.seq;const idx=rt.seq.indexOf(v);if(idx>=0)rt.seq.splice(idx,1);else rt.seq.push(v);if(rt.seq.length===spot.answer.length){const selected=[...rt.seq];grade(shell,chapter,spot,selected);}else renderShell(shell,chapter);});
    const prev=shell.querySelector('[data-fi-prev]');if(prev)prev.onclick=()=>{if(rt.cursor>0){rt.cursor--;rt.redo=false;rt.seq=[];renderShell(shell,chapter);}};
    const redo=shell.querySelector('[data-fi-redo]');if(redo)redo.onclick=()=>{rt.redo=true;rt.seq=[];renderShell(shell,chapter);};
    const next=shell.querySelector('[data-fi-next]');if(next)next.onclick=()=>{nextSpot(rt);renderShell(shell,chapter);shell.scrollIntoView({behavior:'smooth',block:'start'});};
  }

  function mount(){
    const lesson=document.querySelector('.card.lesson');const title=lesson?.querySelector('h2');if(!lesson||!title)return;
    const chapter=title.textContent.trim().toUpperCase();if(!BANK()[chapter])return;
    addStyles();
    let shell=lesson.querySelector(':scope > .fi-shell');
    if(shell)return;
    shell=document.createElement('section');shell.className='fi-shell';shell.dataset.chapter=chapter;lesson.appendChild(shell);renderShell(shell,chapter);
  }

  let mountQueued=false;
  const root=document.getElementById('root');
  if(root){
    const observer=new MutationObserver(()=>{if(mountQueued)return;mountQueued=true;queueMicrotask(()=>{mountQueued=false;mount();});});
    observer.observe(root,{childList:true});
  }
  mount();
})();