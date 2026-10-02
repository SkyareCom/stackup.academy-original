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
      .academy-group-list{border-bottom:1px solid var(--academy-line)}.academy-training-label{display:inline-flex;margin-top:8px;padding:5px 8px;border:1px solid var(--academy-line-strong);border-radius:999px;color:var(--academy-silver-3);font-size:12px;letter-spacing:.12em;text-transform:uppercase}
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
    const groups=groupsFor(key,s.i||[]).map(g=>{
      const rows=g.indexes.filter(i=>s.i[i]).map(i=>{
        const item=s.i[i];return CC.LessonRow({num:String(i+1).padStart(2,'0'),title:item[0],note:item[1],attrs:`data-academy-lesson="${i}" data-stage="${key}"`});
      }).join('');
      return `<section class="academy-group"><h2 class="academy-group-title">${esc(t(g.labelKey,g.labelKey))}</h2><div class="academy-group-list">${rows}</div></section>`;
    }).join('');
    const practiceTools=key==='pratica'?`<section class="academy-group"><h2 class="academy-group-title">${t('practiceTools','FERRAMENTAS DE PRÁTICA')}</h2><div class="academy-group-list">${CC.LessonRow({num:'04',title:t('personalRanking','RANKING PESSOAL'),note:t('selfRankingCopy','Seu desempenho pessoal com base nos treinos já realizados.'),attrs:'data-practice-tool="ranking"'})}${CC.LessonRow({num:'05',title:t('history','HISTÓRICO'),note:t('historyCopy','Resumo consolidado do progresso salvo neste dispositivo.'),attrs:'data-practice-tool="history"'})}${CC.LessonRow({num:'06',title:t('exercises','EXERCÍCIOS'),note:t('exercisesCopy','Acesse rapidamente os exercícios existentes sem criar conteúdo paralelo.'),attrs:'data-practice-tool="exercises"'})}</div></section>`:'';
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