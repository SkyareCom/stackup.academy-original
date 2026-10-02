(() => {
  const t=(k,f='')=>window.AcademyI18n?.t(k,f)||f||k;
  const C=()=>window.AcademyComponents;
  const esc=v=>window.AcademyDOM?.esc(v)||String(v??'');

  if(!document.getElementById('academy-stage-screen-style')){
    const s=document.createElement('style');s.id='academy-stage-screen-style';s.textContent=`
      .academy-stage-screen{padding-top:18px!important}.academy-stage-intro{padding:12px 2px 20px;border-bottom:1px solid var(--academy-line-strong);margin-bottom:8px}
      .academy-stage-intro.photo{min-height:190px;margin:-18px -17px 14px;padding:28px 18px 20px;display:flex;align-items:flex-end;border:0}
      .academy-stage-intro .academy-title{font-size:clamp(25px,8vw,34px)}.academy-stage-intro .academy-copy{max-width:430px}
      .academy-group{margin-top:21px}.academy-group-title{margin:0 0 2px;font-size:10px;letter-spacing:.16em;color:var(--academy-silver-2);text-transform:uppercase}
      .academy-group-list{border-bottom:1px solid var(--academy-line)}.academy-training-label{display:inline-flex;margin-top:8px;padding:5px 8px;border:1px solid var(--academy-line-strong);border-radius:999px;color:var(--academy-silver-3);font-size:9px;letter-spacing:.12em;text-transform:uppercase}
    `;document.head.appendChild(s);
  }

  const groupsFor=(key,items)=>{
    if(key!=='fundamentos')return[{title:key==='pratica'?t('trainingLab','TRAINING LAB'):t('modalities','MODALIDADES'),indexes:items.map((_,i)=>i)}];
    return[
      {title:'MÃOS',indexes:[0]},
      {title:'ESTRUTURA DO JOGO',indexes:[1,2,3,4,5,6,7]},
      {title:'TERMINOLOGIA E PERFIS',indexes:[8,9]},
      {title:'FORMATOS',indexes:[10,11]},
      {title:'REGRAS E CONDUTA',indexes:[12,13]}
    ];
  };
  const labelFor=key=>key==='fundamentos'?t('base','BASE'):key==='modalidades'?t('modalities','MODALIDADES'):t('practice','PRÁTICA');

  function renderStage(key,pushState=false){
    const root=document.getElementById('root'),s=window.ContentService?.getStage?.(key);if(!root||!s)return;
    document.getElementById('navtools')?.classList.add('show');
    window.ProgressService?.setLastRoute?.({type:'stage',stage:key});
    const CC=C(),photo=key==='modalidades'?window.academyTheme?.backgrounds?.modalities:key==='pratica'?window.academyTheme?.backgrounds?.practice:'';
    const intro=CC.EditorialHero({kicker:s.e||'',title:labelFor(key),subtitle:s.d||'',action:key==='pratica'?'<span class="academy-training-label">FOCO · DECISÃO · REPETIÇÃO</span>':''});
    const header=photo?CC.AcademyBackground({src:photo,className:'academy-stage-intro photo',content:intro,alt:''}):`<div class="academy-stage-intro">${intro}</div>`;
    const groups=groupsFor(key,s.i||[]).map(g=>{
      const rows=g.indexes.filter(i=>s.i[i]).map(i=>{
        const item=s.i[i];return CC.LessonRow({num:String(i+1).padStart(2,'0'),title:item[0],note:item[1],attrs:`data-academy-lesson="${i}" data-stage="${key}"`});
      }).join('');
      return `<section class="academy-group"><h2 class="academy-group-title">${esc(g.title)}</h2><div class="academy-group-list">${rows}</div></section>`;
    }).join('');
    root.innerHTML=`<section class="screen academy-stage-screen"><div class="eyebrow" style="display:none">${esc(s.e||'')}</div>${header}${groups}</section>`;
    if(pushState)history.pushState({type:'stage',stage:key},'','#stage-'+key);
    window.AnalyticsService?.screen?.(key);
    if(key==='modalidades'){
      const count=(s.i||[]).length;
      setTimeout(()=>{const now=window.ContentService?.getStage?.(key);if(history.state?.stage===key&&now?.i?.length!==count)renderStage(key,false)},900);
    }
  }

  window.stage=(key,p=0)=>renderStage(key,!!p);
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-academy-lesson]');if(!b)return;e.preventDefault();
    const stage=b.dataset.stage,index=Number(b.dataset.academyLesson);
    window.ProgressService?.setLastRoute?.({type:'lesson',stage,index});
    window.lesson?.(stage,index,1);
  });
})();