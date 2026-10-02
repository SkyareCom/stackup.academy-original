(() => {
  const wrap=(name)=>{
    const fn=window[name];if(typeof fn!=='function'||fn.__academyWrapped)return;
    const wrapped=function(...args){
      try{
        if(name==='lesson')window.ProgressService?.setLastRoute?.({type:'lesson',stage:args[0],index:Number(args[1]||0)});
        if(name==='stage')window.ProgressService?.setLastRoute?.({type:'stage',stage:args[0]});
        window.AnalyticsService?.track?.('navigation',{target:name,stage:args[0],index:args[1]});
      }catch(_){}
      return fn.apply(this,args);
    };wrapped.__academyWrapped=true;window[name]=wrapped;
  };
  wrap('stage');wrap('lesson');
  window.addEventListener('stackup:languagechange',e=>window.AnalyticsService?.track?.('language_change',{language:e.detail?.language}));
  document.addEventListener('click',e=>{
    const study=e.target.closest?.('[data-study-tool],[data-study-kind]');
    if(study)window.AnalyticsService?.track?.('study_tool_open',{tool:study.dataset.studyTool||study.dataset.studyKind||''});
    const practice=e.target.closest?.('[data-practice-tool]');
    if(practice)window.AnalyticsService?.track?.('practice_tool_open',{tool:practice.dataset.practiceTool||''});
    const goal=e.target.closest?.('[data-weekly-goal]');
    if(goal)window.AnalyticsService?.track?.('weekly_goal_changed',{goal:Number(goal.dataset.weeklyGoal||0)});
    const retrain=e.target.closest?.('[data-history-retrain]');
    if(retrain)window.AnalyticsService?.track?.('history_retrain',{session_id:retrain.dataset.historyRetrain||''});
    const del=e.target.closest?.('[data-history-delete]');
    if(del)window.AnalyticsService?.track?.('history_delete',{session_id:del.dataset.historyDelete||''});
    const shortcut=e.target.closest?.('[data-home-shortcut]');
    if(shortcut)window.AnalyticsService?.track?.('home_shortcut',{target:shortcut.dataset.homeShortcut||''});
  },true);
})();