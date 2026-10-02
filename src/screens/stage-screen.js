(() => {
  const t=(k,f='')=>window.AcademyI18n?.t(k,f)||f||k;
  const C=()=>window.AcademyComponents;
  const esc=v=>window.AcademyDOM?.esc(v)||String(v??'');

  if(!document.getElementById('academy-stage-screen-style')){
    const s=document.createElement('style');s.id='academy-stage-screen-style';s.textContent=`
      .academy-stage-screen{padding:16px 16px calc(32px + env(safe-area-inset-bottom))!important}
      .academy-stage-intro{height:176px;min-height:176px;max-height:176px;padding:20px 0;display:block;overflow:hidden;box-sizing:border-box;border-bottom:1px solid var(--academy-line-strong);margin:0 0 16px}
      .academy-stage-intro.photo{height:176px;min-height:176px;max-height:176px;margin:0 -16px 16px;padding:20px 16px;display:block;overflow:hidden;box-sizing:border-box;border-bottom:1px solid var(--academy-line-strong)}
      .academy-stage-hero-grid{height:135px;display:grid;grid-template-rows:18px 18px 54px;row-gap:6px;align-content:end;width:100%}
      .academy-stage-hero-grid .academy-kicker{margin:0;align-self:end}
      .academy-stage-hero-grid .academy-title{margin:0;align-self:end}
      .academy-stage-hero-grid .academy-copy{margin:0;align-self:start;max-width:430px;line-height:1.5;max-height:54px;overflow:hidden}
      .academy-stage-intro .academy-title{font-size:12px}.academy-stage-intro .academy-copy{max-width:430px}
      .academy-group{margin-top:20px}.academy-group-title{margin:0 0 12px;font-size:12px;letter-spacing:.16em;color:var(--academy-silver-2);text-transform:uppercase}
      .academy-group-list{border-bottom:1px solid var(--academy-line)}
      .academy-practice-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
      .academy-practice-card{min-height:152px;padding:16px 10px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-lg);background:var(--academy-surface);color:var(--academy-ivory);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;cursor:pointer}
      .academy-practice-icon{width:34px;height:34px;display:grid;place-items:center;color:var(--academy-ivory)}
      .academy-practice-icon svg{width:28px;height:28px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
      .academy-practice-card strong{display:block;font-size:12px;font-weight:600;text-transform:uppercase;line-height:1.2}
      .academy-practice-card span:last-child{display:block;font-size:12px;font-weight:400;color:var(--academy-muted);line-height:1.35}
      .academy-training-label{display:inline-flex;margin-top:8px;padding:5px 8px;border:1px solid var(--academy-line-strong);border-radius:999px;color:var(--academy-silver-3);font-size:12px;letter-spacing:.12em;text-transform:uppercase}
    `;document.head.appendChild(s);
  }

  const groupsFor=(key,items)=>window.AcademyCourseMap?.getGroups?.(key,items)||[{labelKey:key==='pratica'?'trainingLab':'modalities',indexes:items.map((_,i)=>i)}];
  const labelFor=key=>key==='fundamentos'?t('base','BASE'):key==='modalidades'?t('modalities','MODALIDADES'):t('practice','PRÁTICA');

  function renderStage(key,pushState=false){
    const root=document.getElementById('root'),s=window.ContentService?.getStage?.(key);if(!root||!s)return;
    document.getElementById('navtools')?.classList.add('show');
    window.ProgressService?.setLastRoute?.({type:'stage',stage:key});
    const CC=C(),photo=key==='fundamentos'?window.academyTheme?.backgrounds?.base:key==='modalidades'?window.academyTheme?.backgrounds?.modalities:key==='pratica'?window.academyTheme?.backgrounds?.practice:'';
    const intro=`<div class="academy-hero-content academy-stage-hero-grid"><div class="academy-kicker">${esc(s.e||'')}</div><h1 class="academy-title">${esc(labelFor(key))}</h1><p class="academy-copy">${esc(s.d||'')}</p></div>`;
    const header=photo?CC.AcademyBackground({src:photo,className:'academy-stage-intro academy-section-intro photo',content:intro,alt:''}):`<div class="academy-stage-intro academy-section-intro">${intro}</div>`;
    const groups=key==='pratica'?'':groupsFor(key,s.i||[]).map(g=>{
      const rows=g.indexes.filter(i=>s.i[i]).map(i=>{
        const item=s.i[i];return CC.LessonRow({num:String(i+1).padStart(2,'0'),title:item[0],note:item[1],attrs:`data-academy-lesson="${i}" data-stage="${key}"`});
      }).join('');
      return `<section class="academy-group"><h2 class="academy-group-title">${esc(t(g.labelKey,g.labelKey))}</h2><div class="academy-group-list">${rows}</div></section>`;
    }).join('');
    const icon=(kind)=>({sim:'<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="5.5"/><rect x="7" y="10" width="4" height="5" rx="1"/><rect x="13" y="10" width="4" height="5" rx="1"/></svg>',quiz:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 1 1 3.6 2.4c-.8.4-1.1.9-1.1 1.7v.5"/><path d="M12 17.2h.01"/></svg>',math:'<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h4M8 15h2M12 15h4M8 18h8"/></svg>',history:'<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5M12 7v5l3 2"/></svg>'}[kind]||'');
    const practiceTools=key==='pratica'?`<section class="academy-group"><h2 class="academy-group-title">${t('trainingLab','LABORATÓRIO DE TREINO')}</h2><div class="academy-practice-grid">
      <button class="academy-practice-card" type="button" data-academy-lesson="0" data-stage="pratica"><span class="academy-practice-icon">${icon('sim')}</span><strong>${t('simulator','SIMULADOR')}</strong><span>${t('simulatorCopy','Treine decisões e regras das modalidades existentes.')}</span></button>
      <button class="academy-practice-card" type="button" data-academy-lesson="1" data-stage="pratica"><span class="academy-practice-icon">${icon('quiz')}</span><strong>${t('quiz','QUIZ')}</strong><span>${t('quizCopy','Revise conceitos e retenção.')}</span></button>
      <button class="academy-practice-card" type="button" data-academy-lesson="2" data-stage="pratica"><span class="academy-practice-icon">${icon('math')}</span><strong>${t('mathPoker','MATEMÁTICA DO POKER')}</strong><span>${t('mathPokerCopy','Treine os cálculos já disponíveis.')}</span></button>
      <button class="academy-practice-card" type="button" data-practice-tool="history"><span class="academy-practice-icon">${icon('history')}</span><strong>${t('history','HISTÓRICO')}</strong><span>${t('historyCopy','Treinos salvos por seção e sessão.')}</span></button>
    </div></section>`:'';
    root.innerHTML=`<section class="screen academy-stage-screen"><div class="eyebrow" style="display:none">${esc(s.e||'')}</div>${header}${groups}${practiceTools}</section>`;
    if(pushState)history.pushState({type:'stage',stage:key},'','#stage-'+key);
    window.AnalyticsService?.screen?.(key);
    if(key==='modalidades'){
      const count=(s.i||[]).length;
      setTimeout(()=>{const now=window.ContentService?.getStage?.(key);if(history.state?.stage===key&&now?.i?.length!==count)renderStage(key,false)},900);
    }
  }

  window.stage=(key,p=0)=>renderStage(key,!!p);
  document.addEventListener('click',e=>{
    const tool=e.target.closest('[data-practice-tool]');if(tool){e.preventDefault();window.AcademyScreens?.practiceTool?.(tool.dataset.practiceTool);return}
    const b=e.target.closest('[data-academy-lesson]');if(!b)return;e.preventDefault();
    const stage=b.dataset.stage,index=Number(b.dataset.academyLesson);
    window.ProgressService?.setLastRoute?.({type:'lesson',stage,index});
    window.lesson?.(stage,index,1);
  });
})();