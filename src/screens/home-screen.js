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
      .academy-stage-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
      .academy-stage-card{min-height:120px;padding:14px 5px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface);color:var(--academy-ivory);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;cursor:pointer}
      .academy-stage-card span{font-size:12px;color:var(--academy-silver);letter-spacing:.08em}.academy-stage-card strong{margin-top:7px;font-size:12px;line-height:1.05;letter-spacing:0;white-space:nowrap}.academy-stage-card small{margin-top:8px;color:var(--academy-muted);font-size:12px}
      .academy-evolution{border-top:1px solid var(--academy-line);border-bottom:1px solid var(--academy-line);padding:4px 0}.academy-review-entry{margin-top:14px}.academy-review-entry button{width:100%;min-height:44px}.academy-review-entry small{display:block;margin-top:6px;color:var(--academy-muted);font-size:12px;line-height:1.35}.academy-evolution-extra{margin-top:14px;border-top:1px solid var(--academy-line)}.academy-evolution-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--academy-line);border:1px solid var(--academy-line);margin-top:14px}.academy-evolution-strip>div{background:var(--academy-bg-2);padding:12px 8px;text-align:center}.academy-evolution-strip b,.academy-evolution-strip span{display:block}.academy-evolution-strip span{margin-top:3px;color:var(--academy-muted);text-transform:uppercase}.academy-evolution-duel{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--academy-line);border:1px solid var(--academy-line);margin-top:14px}.academy-evolution-duel>div{background:var(--academy-bg-2);padding:12px;text-align:center}.academy-evolution-duel b,.academy-evolution-duel span{display:block}.academy-evolution-duel span{margin-top:3px;color:var(--academy-muted);text-transform:uppercase}.academy-podium{margin-top:14px;border-top:1px solid var(--academy-line)}.academy-podium-row{display:grid;grid-template-columns:28px 1fr auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid var(--academy-line)}.academy-podium-row span{color:var(--academy-muted)}
      .academy-evolution-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--academy-line);border:1px solid var(--academy-line);margin-bottom:14px}
      .academy-evolution-summary>div{background:var(--academy-bg-2);padding:12px 8px;text-align:center}.academy-evolution-summary b{display:block;font-size:12px;color:var(--academy-ivory)}.academy-evolution-summary span{display:block;margin-top:3px;font-size:12px;line-height:1.15;color:var(--academy-muted);text-transform:uppercase}
      .academy-shortcuts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.academy-shortcut{min-height:74px;border:1px solid var(--academy-line);border-radius:var(--academy-radius-md);background:transparent;color:var(--academy-ivory);font-size:12px;font-weight:600;text-transform:uppercase;padding:8px}
      @media(max-width:340px){.academy-home{padding-inline:12px!important}.academy-home-hero{margin-inline:-12px;padding-inline:14px}.academy-stage-grid{gap:5px}.academy-stage-card{padding-inline:4px}.academy-stage-card strong{font-size:12px}.academy-shortcuts{gap:5px}.academy-shortcut{font-size:12px}}
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
    const last=window.ProgressService?.getLastRoute?.();
    if(last?.stage)return last;
    const s=window.ProgressService?.snapshot?.();
    if((s?.sections?.fundamentals?.pct||0)<100)return{type:'stage',stage:'fundamentos'};
    if((s?.sections?.modalities?.pct||0)<100)return{type:'stage',stage:'modalidades'};
    return{type:'stage',stage:'pratica'};
  };
  const goContinue=()=>{
    const r=continueRoute();
    if(r.type==='lesson')window.lesson?.(r.stage,r.index,1);else window.stage?.(r.stage,1);
  };

  function renderHome(){
    const root=document.getElementById('root');if(!root)return;
    document.getElementById('navtools')?.classList.remove('show');
    const S=window.ProgressService?.snapshot?.()||{answered:0,correct:0,errors:0,pct:0,accuracy:0,weekly:{completed:0,goal:25,pct:0},sections:{}};
    const route=continueRoute(),hasProgress=S.answered>0,CC=C(),E=window.EvolutionService?.snapshot?.()||{xp:0,category:{name:'INICIANTE',next:null},podium:{previous:null,current:{name:'INICIANTE',floor:0},next:null,progress:0,remaining:0},selfBattle:{heroPct:0,villainPct:0,heroXp:0,villainXp:0,deltaXp:0,deltaPp:0}},R=window.AcademyStudyService?.reviewSummary?.()||{due:0,wrong:0,weakest:E.weakest?.[0]||null};
    const stageCards=['fundamentos','modalidades','pratica'].map(key=>{
      const inf=stageInfo(key),section=S.sections?.[key]||{pct:0};return `<button type="button" class="academy-stage-card" data-home-stage="${key}"><span>ETAPA ${inf.num}</span><strong>${esc(inf.label)}</strong><small>${Math.round(section.pct||0)}%</small></button>`;
    }).join('');
    const metrics=[
      ['BASE',S.sections?.fundamentals?.pct||0],
      [t('modalities','MODALIDADES'),S.sections?.modalities?.pct||0],
      [t('practice','PRÁTICA'),S.sections?.practice?.pct||0]
    ].map(([label,pct])=>CC.EvolutionMetric({label,value:`${Math.round(pct)}%`,pct})).join('');

    const heroContent=CC.EditorialHero({
      kicker:"STACKUP HOLD'EM · ACADEMY",
      title:t('buildBase','CONSTRUA SUA BASE.'),
      subtitle:t('heroSub','Aprenda. Pratique. Evolua.'),
      action:CC.PrimaryButton(hasProgress?t('continue','CONTINUAR APRENDENDO'):t('start','COMEÇAR'),'data-home-continue')
    });
    root.innerHTML=`<section class="screen academy-home">
      ${CC.AcademyBackground({src:window.academyTheme?.backgrounds?.home,className:'academy-home-hero',content:heroContent,alt:''})}
      <section class="academy-home-section">
        ${CC.CourseSection({title:t('continueLearning','CONTINUAR APRENDENDO'),content:`<div class="academy-continue"><div class="academy-continue-top"><div><div class="academy-kicker">${hasProgress?t('lastSection','ÚLTIMA SEÇÃO'):t('nextStep','PRÓXIMA ETAPA')}</div><h3>${esc(lastLabel(route))}</h3><p>${Math.round(S.pct)}% · ${S.answered} ${t('answered','QUESTÕES RESPONDIDAS').toLowerCase()}</p></div><b>${Math.round(S.pct)}%</b></div>${CC.LearningProgress(S.pct)}${CC.SecondaryButton(hasProgress?t('continue','CONTINUAR APRENDENDO'):t('start','COMEÇAR'),'data-home-continue')}</div>`})}
      </section>
      <section class="academy-home-section">${CC.CourseSection({title:t('threeSteps','3 ETAPAS PRINCIPAIS'),content:`<div class="academy-stage-grid">${stageCards}</div>`})}</section>
      <section class="academy-home-section">
        ${CC.CourseSection({title:t('myEvolution','MINHA EVOLUÇÃO'),content:`<div class="academy-evolution-summary"><div><b>${S.answered}</b><span>${t('answered','QUESTÕES RESPONDIDAS')}</span></div><div><b>${S.correct}</b><span>${t('correct','ACERTOS')}</span></div><div><b>${S.accuracy}%</b><span>${t('accuracy','APROVEITAMENTO')}</span></div></div><div class="academy-evolution">${metrics}</div><div class="academy-evolution-strip"><div><b>${E.xp}</b><span>XP</span></div><div><b>${esc(E.category?.name||'INICIANTE')}</b><span>${t('category','CATEGORIA')}</span></div><div><b>${S.streak||0}</b><span>${t('streak','SEQUÊNCIA')}</span></div></div><div class="academy-evolution-duel"><div><b>${E.selfBattle?.villainPct||0}%</b><span>${t('villainMe','EU VILÃO')} · ${t('firstAttempt','1ª TENTATIVA')}</span><small>${E.selfBattle?.villainXp||0} XP</small></div><div><b>${E.selfBattle?.heroPct||0}%</b><span>${t('heroMe','EU HERÓI')} · ${t('currentPerformance','ATUAL')}</span><small>${E.selfBattle?.heroXp||0} XP</small></div></div><div class="academy-podium"><div class="academy-kicker" style="padding:12px 0 2px">${t('podium','PÓDIO DE EVOLUÇÃO')}</div><div class="academy-podium-row"><b>—</b><strong>${esc(E.podium?.previous?.name||'—')}</strong><span>${t('previous','ANTERIOR')}</span></div><div class="academy-podium-row"><b>✓</b><strong>${esc(E.podium?.current?.name||E.category?.name||'INICIANTE')}</strong><span>${t('currentPerformance','ATUAL')} · ${E.xp} XP</span></div><div class="academy-podium-row"><b>→</b><strong>${esc(E.podium?.next?.name||t('maxCategory','CATEGORIA MÁXIMA'))}</strong><span>${E.podium?.next?(E.podium.remaining+' XP '+t('toNext','PARA A PRÓXIMA')):t('maxCategory','CATEGORIA MÁXIMA')}</span></div></div><div style="margin-top:14px">${CC.WeeklyGoal(S.weekly)}</div><div class="academy-review-entry">${CC.SecondaryButton(R.due?t('todayReviewPending','REVISÃO DO DIA · {n} PENDENTES').replace('{n}',R.due):t('todayReview','REVISÃO DO DIA'),'data-home-review')}${R.weakest?`<small>${t('nextFocus','PRÓXIMO FOCO')} · ${esc(({fundamentals:'BASE',modalities:t('modalities','MODALIDADES'),quiz:'QUIZ',math:t('mathPoker','MATEMÁTICA DO POKER'),sim:t('simulator','SIMULADOR')}[R.weakest.key]||R.weakest.key).toUpperCase())} · ${R.weakest.accuracy}%</small>`:`<small>${t('reviewUpToDate','REVISÃO EM DIA')}</small>`}</div>`})}
      </section>
      <section class="academy-home-section">${CC.CourseSection({title:t('shortcuts','ATALHOS'),content:`<div class="academy-shortcuts"><button class="academy-shortcut" data-home-shortcut="profile">${t('profile','PERFIL')}</button><button class="academy-shortcut" data-home-shortcut="plans">${t('plans','PLANOS')}</button><button class="academy-shortcut" data-home-shortcut="apps">${t('otherApps','OUTROS APPS')}</button></div>`})}</section>
    </section>`;
    window.AnalyticsService?.screen?.('home');
  }

  window.home=renderHome;
  document.addEventListener('click',e=>{
    const review=e.target.closest('[data-home-review]');if(review){e.preventDefault();window.AcademyScreens?.studyTool?.('smartReview');return}
    const g=e.target.closest('[data-weekly-goal]');if(g){e.preventDefault();if(window.ProgressService?.setWeeklyGoal?.(Number(g.dataset.weeklyGoal)))renderHome();return}
    if(e.target.closest('[data-home-continue]')){e.preventDefault();goContinue();return}
    const s=e.target.closest('[data-home-stage]');if(s){e.preventDefault();window.stage?.(s.dataset.homeStage,1);return}
    const q=e.target.closest('[data-home-shortcut]');if(q){e.preventDefault();window.AcademyScreens?.profile?.(q.dataset.homeShortcut);return}
  });
  window.addEventListener('academy:studyready',()=>{if(document.querySelector('#root .academy-home'))renderHome()});
  if(history.state?.type==='home'||!history.state)requestAnimationFrame(renderHome);
})();