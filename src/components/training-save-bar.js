(() => {
  const BAR_ID='academy-training-save-bar';
  const t=(key,fallback='')=>window.AcademyI18n?.t?.(key,fallback)||fallback||key;

  if(!document.getElementById('academy-training-save-bar-style')){
    const style=document.createElement('style');
    style.id='academy-training-save-bar-style';
    style.textContent=`
      .academy-training-save-bar{margin-top:14px;padding:12px;border-top:1px solid var(--academy-line);border-bottom:1px solid var(--academy-line);background:var(--academy-bg-2)}
      .academy-training-save-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}
      .academy-training-save-meta strong,.academy-training-save-meta span{font-size:12px}
      .academy-training-save-meta strong{font-weight:600;text-transform:uppercase}
      .academy-training-save-meta span{color:var(--academy-muted)}
      .academy-training-save-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .academy-training-save-actions button{width:100%;min-height:40px}.academy-training-save-actions [data-inline-save-session]{grid-column:1/-1}
    `;
    document.head.appendChild(style);
  }

  const visibleTrainingHost=()=>{
    const lesson=document.querySelector('#root .card.lesson');
    if(!lesson)return null;
    const selectors=['.p3x-shell','.fi-shell','.m2-shell','.mg-shell','.p3-shell'];
    for(const sel of selectors){
      const el=lesson.querySelector(sel);
      if(el&&el.getClientRects().length)return el;
    }
    return null;
  };

  const remove=()=>document.getElementById(BAR_ID)?.remove();

  function render(){
    const manual=window.TrainingPreferenceService?.getMode?.()==='manual';
    const host=visibleTrainingHost();
    const pending=window.TrainingHistoryService?.pendingSummary?.()||{total:0,answered:0,correct:0};
    const dirty=Number(pending.total||0)>0||Number(pending.answered||0)>0;
    if(!manual||!host){remove();return}

    let bar=document.getElementById(BAR_ID);
    if(!bar){
      bar=document.createElement('div');
      bar.id=BAR_ID;
      bar.className='academy-training-save-bar';
      host.insertAdjacentElement('afterend',bar);
    }else if(bar.previousElementSibling!==host){
      host.insertAdjacentElement('afterend',bar);
    }

    bar.innerHTML=`
      <div class="academy-training-save-meta">
        <strong>${dirty?t('unsavedSession','SESSÃO NÃO SALVA'):t('savedSession','SESSÃO SALVA')}</strong>
        <span>${Number(pending.answered||0)} ${t('answeredShort','RESPONDIDAS').toLowerCase()}</span>
      </div>
      <div class="academy-training-save-actions">
        <button type="button" class="academy-primary" data-inline-save-session ${dirty?'':'disabled'}>${dirty?t('saveSession','SALVAR SESSÃO'):t('savedSession','SESSÃO SALVA')}</button>
        <button type="button" class="academy-secondary" data-inline-new-training>${t('newTraining','NOVO TREINO')}</button>
        <button type="button" class="academy-secondary" data-inline-open-history>${t('history','HISTÓRICO')}</button>
      </div>
    `;
  }

  let scheduled=false;
  const schedule=()=>{
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;render()});
  };

  document.addEventListener('click',event=>{
    const save=event.target.closest('[data-inline-save-session]');
    if(save){
      event.preventDefault();
      const progress=window.ProgressService?.commitManualSession?.()||{answered:0};
      window.TrainingHistoryService?.savePending?.();
      window.AnalyticsService?.track?.('training_saved_inline',{answered:Number(progress.answered||0)});
      schedule();
      return;
    }
    const fresh=event.target.closest('[data-inline-new-training]');
    if(fresh){
      event.preventDefault();
      const pending=window.TrainingHistoryService?.pendingSummary?.()||{answered:0,total:0};
      if(Number(pending.answered||0)>0){
        const ok=confirm(t('newTrainingConfirm','Iniciar um novo treino e descartar as respostas ainda não salvas?'));
        if(!ok)return;
        window.ProgressService?.discardManualSession?.();
        window.TrainingHistoryService?.discardPending?.();
      }
      window.TrainingHistoryService?.startNewRun?.();
      const host=visibleTrainingHost();
      const mode=host?.classList?.contains('p3x-shell')?host.dataset.p3x:null;
      if(mode&&window.StackupPracticeAdvanced?.newSession?.(mode)){
        window.AnalyticsService?.track?.('training_new_session_inline',{mode});
        schedule();return;
      }
      const nextSelector=host?.classList?.contains('fi-shell')?'[data-fi-next]':host?.classList?.contains('m2-shell')?'[data-m2-next]':host?.classList?.contains('mg-shell')?'[data-mg-next]':host?.classList?.contains('p3-shell')?'[data-p3-next]':'';
      if(nextSelector)host.querySelector(nextSelector)?.click();
      window.AnalyticsService?.track?.('training_new_session_inline',{mode:mode||'standard'});
      schedule();return;
    }
    const history=event.target.closest('[data-inline-open-history]');
    if(history){
      event.preventDefault();
      window.AcademyScreens?.practiceTool?.('history');
    }
  });

  window.addEventListener('academy:historydraft',schedule);
  window.addEventListener('academy:historymode',schedule);
  const root=document.getElementById('root');
  if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
  schedule();

  window.AcademyTrainingSaveBar={render:schedule};
})();