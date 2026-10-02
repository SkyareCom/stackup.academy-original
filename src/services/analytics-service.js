(() => {
  const KEY='academy.events.v1';
  const LIMIT=1000;
  const safeParse=(raw,fallback=[])=>{try{const v=JSON.parse(raw||'');return Array.isArray(v)?v:fallback}catch(_){return fallback}};
  const read=()=>{try{return safeParse(localStorage.getItem(KEY),[])}catch(_){return []}};
  const write=events=>{try{localStorage.setItem(KEY,JSON.stringify(events.slice(-LIMIT)))}catch(_){}};
  const meta=()=>{
    let version='';
    try{version=document.querySelector('meta[name="stackup-release"]')?.content||''}catch(_){}
    let language='pt-BR';
    try{language=window.AcademyI18n?.lang?.()||localStorage.getItem('stackup-language-v1')||language}catch(_){}
    let plan='free';
    try{plan=window.BillingService?.getCurrentPlan?.()?.id||plan}catch(_){}
    return {product:'academy',plan,app_version:version,lang:language};
  };
  const push=(name,detail={})=>{
    const event={e:String(name||'event'),t:Date.now(),...meta(),...(detail||{})};
    const queue=read();queue.push(event);if(queue.length>LIMIT)queue.splice(0,queue.length-LIMIT);write(queue);
    return event;
  };

  window.AnalyticsService={
    KEY,LIMIT,
    track(name,detail={}){
      const event=push(name,detail);
      window.dispatchEvent(new CustomEvent('academy:analytics',{detail:{name,...detail,at:event.t}}));
      return event;
    },
    screen(name){return this.track('screen_view',{screen:name})},
    events(){return read().map(x=>({...x}))},
    clear(){try{localStorage.removeItem(KEY)}catch(_){};return true},
    size(){return read().length}
  };
  window.academyEvents=()=>window.AnalyticsService.events();

  if(!window.__academyAppOpenTracked){
    window.__academyAppOpenTracked=true;
    queueMicrotask(()=>window.AnalyticsService.track('app_open'));
  }
})();