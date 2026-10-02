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
      .academy-practice-card{min-height:148px;padding:16px 10px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface);color:var(--academy-ivory);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;cursor:pointer}
      .academy-practice-card svg{width:28px;height:28px;fill:none;stroke:currentColor;stroke-width:1.55;stroke-linecap:round;stroke-linejoin:round}
      .academy-practice-card strong{font-size:12px;font-weight:600;text-transform:uppercase;line-height:1.2}
      .academy-practice-card small{font-size:12px;font-weight:400;color:var(--academy-muted);line-height:1.35}
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
    const practiceIcon=kind=>({
      sim:'<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="5.5"/><rect x="7" y="10" width="4" height="5" rx="1"/><rect x="13" y="10" width="4" height="5" rx="1"/></svg>',
      quiz:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 1 1 3.6 2.4c-.8.4-1.1.9-1.1 1.7v.5"/><path d="M12 17.2h.01"/></svg>',
      math:'<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h4M8 15h2M12 15h4M8 18h8"/></svg>',
      history:'<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5M12 7v5l3 2"/></svg>'
    }[kind]||'');
    const practiceTools=key==='pratica'
      ?'<section class="academy-group"><h2 class="academy-group-title">'+t('practiceTools','FERRAMENTAS DE PRÁTICA')+'</h2><div class="academy-practice-grid">'
        +'<button class="academy-practice-card" type="button" data-academy-lesson="0" data-stage="pratica">'+practiceIcon('sim')+'<strong>'+t('simulator','SIMULADOR')+'</strong><small>'+t('simulatorCopy','Treine decisões e regras das modalidades existentes.')+'</small></button>'
        +'<button class="academy-practice-card" type="button" data-academy-lesson="1" data-stage="pratica">'+practiceIcon('quiz')+'<strong>'+t('quiz','QUIZ')+'</strong><small>'+t('quizCopy','Revise conceitos e retenção.')+'</small></button>'
        +'<button class="academy-practice-card" type="button" data-academy-lesson="2" data-stage="pratica">'+practiceIcon('math')+'<strong>'+t('mathPoker','MATEMÁTICA DO POKER')+'</strong><small>'+t('mathPokerCopy','Treine os cálculos já disponíveis.')+'</small></button>'
        +'<button class="academy-practice-card" type="button" data-practice-tool="history">'+practiceIcon('history')+'<strong>'+t('history','HISTÓRICO')+'</strong><small>'+t('historyCopy','Treinos salvos por seção e sessão.')+'</small></button>'
        +'</div></section>'
        +'<section class="academy-group"><h2 class="academy-group-title">'+t('advancedStudy','ESTUDO AVANÇADO')+'</h2><div class="academy-group-list">'
        +CC.LessonRow({num:'01',title:t('smartReview','REVISÃO INTELIGENTE'),note:t('smartReviewCopy','Reforce automaticamente as questões em que houve erro.'),attrs:'data-study-tool="smartReview"'})
        +CC.LessonRow({num:'02',title:t('timedExam','SIMULADO CRONOMETRADO'),note:t('timedExamCopy','20 questões do banco geral em 12 minutos.'),attrs:'data-study-tool="timedExam"'})
        +CC.LessonRow({num:'03',title:t('certificates','CERTIFICADOS'),note:t('certificatesCopy','Acompanhe os critérios de conclusão por etapa.'),attrs:'data-study-tool="certificates"'})
        +CC.LessonRow({num:'04',title:t('skillReport','RELATÓRIO POR COMPETÊNCIA'),note:t('skillReportCopy','Veja as competências mais fortes e as que precisam de reforço.'),attrs:'data-study-tool="skillReport"'})
        +'</div></section>'
        +'<section class="academy-group"><h2 class="academy-group-title">'+t('evolution','EVOLUÇÃO')+'</h2><div class="academy-group-list">'
        +CC.LessonRow({num:'01',title:t('personalRanking','RANKING PESSOAL'),note:t('selfRankingCopy','Seu desempenho pessoal com base nos treinos já realizados.'),attrs:'data-practice-tool="ranking"'})
        +'</div></section>'
      :'';
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
    const study=e.target.closest('[data-study-tool]');if(study){e.preventDefault();window.AcademyScreens?.studyTool?.(study.dataset.studyTool);return}
    const b=e.target.closest('[data-academy-lesson]');if(!b)return;e.preventDefault();
    const stage=b.dataset.stage,index=Number(b.dataset.academyLesson);
    if(window.PlanAccessService?.isLocked?.(stage,index)){window.AcademyScreens?.profile?.('plans');return}
    window.ProgressService?.setLastRoute?.({type:'lesson',stage,index});
    window.lesson?.(stage,index,1);
  });
})();