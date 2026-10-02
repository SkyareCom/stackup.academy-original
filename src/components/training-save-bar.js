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
      .academy-training-save-actions button{width:100%;min-height:40px}
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
    const dirty=window.ProgressService?.hasManualDraft?.()===true || pending.total>0;
    if(!manual||!host||!dirty){remove();return}

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
        <strong>${t('unsavedSession','SESSÃO NÃO SALVA')}</strong>
        <span>${Number(pending.answered||0)} ${t('answeredShort','RESPONDIDAS').toLowerCase()}</span>
      </div>
      <div class="academy-training-save-actions">
        <button type="button" class="academy-primary" data-inline-save-session>${t('saveSession','SALVAR SESSÃO')}</button>
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