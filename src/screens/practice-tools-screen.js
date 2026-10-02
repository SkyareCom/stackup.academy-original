(() => {
  const t=(k,f='')=>window.AcademyI18n?.t(k,f)||f||k;
  const C=()=>window.AcademyComponents;
  const render=(kind)=>{
    const root=document.getElementById('root');if(!root)return;document.getElementById('navtools')?.classList.add('show');
    const S=window.ProgressService?.snapshot?.(),p=S?.sections?.practice||{answered:0,correct:0,pct:0};
    let title='',body='';
    if(kind==='ranking'){
      title=t('personalRanking','RANKING PESSOAL');
      body=`<div class="academy-evolution">${C().EvolutionMetric({label:t('answered','QUESTÕES RESPONDIDAS'),value:String(p.answered)})}${C().EvolutionMetric({label:t('correct','ACERTOS'),value:String(p.correct)})}${C().EvolutionMetric({label:t('accuracy','APROVEITAMENTO'),value:`${p.answered?Math.round(p.correct/p.answered*100):0}%`,pct:p.answered?Math.round(p.correct/p.answered*100):0})}</div>`;
    }else if(kind==='history'){
      title=t('history','HISTÓRICO');
      body=`<div class="academy-evolution">${C().EvolutionMetric({label:t('overallProgress','PROGRESSO GERAL'),value:`${Math.round(S?.pct||0)}%`,pct:S?.pct||0})}${C().EvolutionMetric({label:t('answered','QUESTÕES RESPONDIDAS'),value:String(S?.answered||0)})}${C().EvolutionMetric({label:t('errors','ERROS'),value:String(S?.errors||0)})}</div>`;
    }else{
      title=t('exercises','EXERCÍCIOS');
      body=`<div class="academy-group-list">${C().LessonRow({num:'01',title:'SIMULADOR',note:'Treine decisões e regras das modalidades existentes.',attrs:'data-tool-lesson="0"'})}${C().LessonRow({num:'02',title:'QUIZ',note:'Revise conceitos e retenção.',attrs:'data-tool-lesson="1"'})}${C().LessonRow({num:'03',title:'MATH OF POKER',note:'Treine os cálculos já disponíveis.',attrs:'data-tool-lesson="2"'})}</div>`;
    }
    root.innerHTML=`<section class="screen academy-stage-screen"><header class="academy-stage-intro"><div class="academy-kicker">${t('trainingLab','TRAINING LAB')}</div><h1 class="academy-title">${title}</h1><p class="academy-copy">${kind==='ranking'?t('selfRankingCopy',''):kind==='history'?t('historyCopy',''):t('exercisesCopy','')}</p></header><section class="academy-group">${body}</section></section>`;
    history.pushState({type:'academy-practice-tool',kind},'','#practice-'+kind);
  };
  window.AcademyScreens=window.AcademyScreens||{};window.AcademyScreens.practiceTool=render;
  document.addEventListener('click',e=>{const b=e.target.closest('[data-tool-lesson]');if(!b)return;e.preventDefault();window.lesson?.('pratica',Number(b.dataset.toolLesson),1)});
  const old=window.onpopstate;window.onpopstate=e=>{if(e.state?.type==='academy-practice-tool'){render(e.state.kind);return}old?.(e)};
})();