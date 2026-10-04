(() => {
  const C=()=>window.AcademyComponents;
  const t=(k,f='')=>window.AcademyI18n?.t(k,f)||f||k;
  const esc=v=>window.AcademyDOM?.esc(v)||String(v??'');

  if(!document.getElementById('academy-home-screen-style')){
    const s=document.createElement('style');s.id='academy-home-screen-style';s.textContent=`
      .academy-home{padding:0 16px 34px!important}
      .academy-home-hero{min-height:322px;margin:0 -16px 0;padding:42px 18px 24px;display:flex;align-items:flex-end;border-bottom:1px solid var(--academy-line-strong)}
      .academy-home-hero .academy-hero-content{max-width:430px}
      .academy-home-hero .academy-title{font-size:12px;max-width:360px}
      .academy-home-hero .academy-copy{color:var(--academy-silver-3);font-size:12px;letter-spacing:.02em}
      .academy-home-hero .academy-primary{margin-top:18px}
      .academy-home-section{padding:20px 0 0}
      .academy-continue{padding:16px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-lg);background:var(--academy-surface)}
      .academy-continue-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.academy-continue h3{margin:4px 0 5px;font-size:12px;line-height:1.05;color:var(--academy-ivory)}
      .academy-continue p{margin:0;color:var(--academy-muted);font-size:12px;line-height:1.45}.academy-continue .academy-secondary{margin-top:14px;width:100%}
      .academy-stage-grid{display:grid;grid-template-columns:1fr;gap:8px}
      .academy-stage-card{min-height:88px;padding:14px 16px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface);color:var(--academy-ivory);display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto auto auto;column-gap:12px;row-gap:8px;align-items:center;text-align:left;cursor:pointer}
      .academy-stage-step{grid-column:1;grid-row:1;font-size:12px;color:var(--academy-silver);letter-spacing:.08em;white-space:nowrap;justify-self:start;text-align:left}
      .academy-stage-pct{grid-column:2;grid-row:1;margin:0;color:var(--academy-ivory);font-size:12px;font-weight:600;text-align:right;justify-self:end}
      .academy-stage-name{grid-column:1 / -1;grid-row:2;margin:0;font-size:12px;line-height:1.2;letter-spacing:0;white-space:nowrap;color:var(--academy-ivory);justify-self:start;text-align:left}
      .academy-stage-progress{grid-column:1 / -1;grid-row:3;width:100%;height:7px;align-self:center;border-radius:999px;background:var(--academy-graphite);overflow:hidden}
      .academy-stage-progress>i{display:block;height:100%;width:0;border-radius:inherit;background:var(--academy-silver-2);transition:width var(--academy-motion) ease}
      .academy-evolution{border-top:1px solid var(--academy-line);border-bottom:1px solid var(--academy-line);padding:4px 0}.academy-review-entry{margin-top:14px}.academy-review-entry button{width:100%;min-height:44px}.academy-review-entry small{display:block;margin-top:6px;color:var(--academy-muted);font-size:12px;line-height:1.35}.academy-evolution-extra{margin-top:14px;border-top:1px solid var(--academy-line)}.academy-evolution-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--academy-line);border:1px solid var(--academy-line);margin-top:14px}.academy-evolution-strip>div{background:var(--academy-bg-2);padding:12px 8px;text-align:center}.academy-evolution-strip b,.academy-evolution-strip span{display:block}.academy-evolution-strip span{margin-top:3px;color:var(--academy-muted);text-transform:uppercase}.academy-evolution-duel{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--academy-line);border:1px solid var(--academy-line);margin-top:14px}.academy-evolution-duel>div{background:var(--academy-bg-2);padding:12px;text-align:center}.academy-evolution-duel b,.academy-evolution-duel span{display:block}.academy-evolution-duel span{margin-top:3px;color:var(--academy-muted);text-transform:uppercase}.academy-podium{margin-top:14px;border-top:1px solid var(--academy-line)}.academy-podium-row{display:grid;grid-template-columns:28px 1fr auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid var(--academy-line)}.academy-podium-row span{color:var(--academy-muted)}
      .academy-evolution-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--academy-line);border:1px solid var(--academy-line);margin-bottom:14px}
      .academy-evolution-summary>div{background:var(--academy-bg-2);padding:12px 8px;text-align:center}.academy-evolution-summary b{display:block;font-size:12px;color:var(--academy-ivory)}.academy-evolution-summary span{display:block;margin-top:3px;font-size:12px;line-height:1.15;color:var(--academy-muted);text-transform:uppercase}
      .academy-shortcuts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.academy-shortcut{min-height:74px;border:1px solid var(--academy-line);border-radius:var(--academy-radius-md);background:transparent;color:var(--academy-ivory);font-size:12px;font-weight:600;text-transform:uppercase;padding:8px}
      @media(max-width:340px){.academy-home{padding-inline:12px!important}.academy-home-hero{margin-inline:-12px;padding-inline:14px}.academy-stage-grid{gap:6px}.academy-stage-card{padding:12px;column-gap:12px}.academy-stage-progress{height:6px}.academy-shortcuts{gap:5px}.academy-shortcut{font-size:12px}}
    `;document.head.appendChild(s);
  }

  const stageInfo=(key)=>{
    const map={fundamentos:{label:t('base','BASE'),num:'01'},modalidades:{label:t('modalities','MODALIDADES'),num:'02'},pratica:{label:t('practice','PRÁTICA'),num:'03'}};
    return map[key];
  };
  const lastLabel=route=>{
    if(route?.type==='lesson'){
      const lesson=window.ContentService?.getLesson(route.stage,route.index);return lesson?.[0]||stageInfo(route.stage)?.label||t('base','BASE');
    }
    return stageInfo(route?.stage)?.label||t('base','BASE');
  };
  const continueRoute=()=>{
    const S=window.ProgressService?.snapshot?.()||{sections:{}};
    const fundamentals=S.sections?.fundamentals?.pct||0;
    const modalities=S.sections?.modalities?.pct||0;
    const activeStage=fundamentals<100?'fundamentos':modalities<100?'modalidades':'pratica';
    const last=window.ProgressService?.getLastRoute?.();
    if(last?.stage===activeStage){
      if(last.type==='lesson')return last;
      return{type:'stage',stage:activeStage};
    }
    return{type:'stage',stage:activeStage};
  };
  const goContinue=()=>{
    const r=continueRoute();
    if(r.type==='lesson'){
      if(window.PlanAccessService?.isLocked?.(r.stage,r.index)){window.AcademyScreens?.lockedPreview?.(r.stage,r.index);return}
      window.lesson?.(r.stage,r.index,1);return;
    }
    window.stage?.(r.stage,1);
  };

  function renderHome(){
    const root=document.getElementById('root');if(!root)return;
    document.getElementById('navtools')?.classList.remove('show');
    const S=window.ProgressService?.snapshot?.()||{answered:0,correct:0,errors:0,pct:0,accuracy:0,weekly:{completed:0,goal:25,pct:0},sections:{}};
    const route=continueRoute(),hasProgress=S.answered>0,CC=C(),R=window.AcademyStudyService?.reviewSummary?.()||{due:0};
    const E=window.EvolutionService?.snapshot?.()||{selfBattle:{villainPct:0,heroPct:0},podium:{previous:null,next:null}};
    const evolutionMeta={
      firstAttempt:t('firstAttempt','1ª TENTATIVA'),
      currentPerformance:t('currentPerformance','ATUAL'),
      villainMe:t('villainMe','EU VILÃO'),
      villainPct:E.selfBattle?.villainPct||0,
      heroPct:E.selfBattle?.heroPct||0,
      podium:{previous:E.podium?.previous?.name||'',next:E.podium?.next?.name||''}
    };
    const stageCards=['fundamentos','modalidades','pratica'].map(key=>{
      const inf=stageInfo(key),progressKey=key==='fundamentos'?'fundamentals':key,section=S.sections?.[progressKey]||{pct:0},pct=Math.max(0,Math.min(100,Math.round(section.pct||0)));return `<button type="button" class="academy-stage-card" data-home-stage="${key}"><span class="academy-stage-step">ETAPA ${inf.num}</span><span class="academy-stage-pct">${pct}%</span><strong class="academy-stage-name">${esc(inf.label)}</strong><span class="academy-stage-progress" aria-hidden="true"><i style="width:${pct}%"></i></span></button>`;
    }).join('');

    const heroContent=CC.EditorialHero({
      kicker:"STACKUP HOLD'EM · ACADEMY",
      title:t('learn3','APRENDA A JOGAR POKER EM 3 ETAPAS'),
      subtitle:t('heroSub','Aprenda. Pratique. Evolua.'),
      action:CC.PrimaryButton(hasProgress?t('continue','CONTINUAR APRENDENDO'):t('start','COMEÇAR'),'data-home-continue')
    });
    root.innerHTML=`<section class="screen academy-home">
      ${CC.AcademyBackground({src:window.academyTheme?.backgrounds?.home,className:'academy-home-hero',content:heroContent,alt:''})}
      <section class="academy-home-section">${CC.CourseSection({title:t('threeSteps','3 ETAPAS PRINCIPAIS'),content:`<div class="academy-stage-grid">${stageCards}</div>`})}</section>
      <section class="academy-home-section">
        ${CC.CourseSection({title:t('continueLearning','CONTINUAR APRENDENDO'),content:`<div class="academy-continue"><div class="academy-continue-top"><div><div class="academy-kicker">${t('nextStep','PRÓXIMA ETAPA')}</div><h3>${esc(lastLabel(route))}</h3><p>${Math.round(S.pct)}% · ${S.answered} ${t('answered','QUESTÕES RESPONDIDAS').toLowerCase()}</p></div><b>${Math.round(S.pct)}%</b></div>${CC.LearningProgress(S.pct)}${CC.SecondaryButton(hasProgress?t('continue','CONTINUAR APRENDENDO'):t('start','COMEÇAR'),'data-home-continue')}</div>`})}
      </section>
      <section class="academy-home-section">
        ${CC.CourseSection({title:t('myEvolution','MINHA EVOLUÇÃO'),content:`<div class="academy-evolution-summary" data-evolution-context="${esc(JSON.stringify(evolutionMeta))}"><div><b>${S.answered}</b><span>${t('answered','QUESTÕES RESPONDIDAS')}</span></div><div><b>${S.correct}</b><span>${t('correct','ACERTOS')}</span></div><div><b>${S.accuracy}%</b><span>${t('accuracy','APROVEITAMENTO')}</span></div></div><div style="margin-top:14px">${CC.WeeklyGoal(S.weekly)}</div>${R.due?`<div class="academy-review-entry">${CC.SecondaryButton(t('todayReviewPending','REVISÃO DO DIA · {n} PENDENTES').replace('{n}',R.due),'data-home-review')}</div>`:''}`})}
      </section>
    </section>`;
    window.AnalyticsService?.screen?.('home');
  }

  window.home=renderHome;
  document.addEventListener('click',e=>{
    const review=e.target.closest('[data-home-review]');if(review){e.preventDefault();if(window.PlanAccessService?.featureLocked?.('smartReview')){window.AcademyScreens?.profile?.('plans');return}window.AcademyScreens?.studyTool?.('smartReview');return}
    const g=e.target.closest('[data-weekly-goal]');if(g){e.preventDefault();if(window.ProgressService?.setWeeklyGoal?.(Number(g.dataset.weeklyGoal)))renderHome();return}
    if(e.target.closest('[data-home-continue]')){e.preventDefault();goContinue();return}
    const s=e.target.closest('[data-home-stage]');if(s){e.preventDefault();window.stage?.(s.dataset.homeStage,1);return}
  });
  window.addEventListener('academy:studyready',()=>{if(document.querySelector('#root .academy-home'))renderHome()});
  if((window.AcademyEntry?.hasSession?.()??true)&&(history.state?.type==='home'||!history.state))requestAnimationFrame(renderHome);
})();