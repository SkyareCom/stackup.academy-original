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
})();