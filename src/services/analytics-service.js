(() => {
  window.AnalyticsService={
    track(name,detail={}){window.dispatchEvent(new CustomEvent('academy:analytics',{detail:{name,...detail,at:Date.now()}}));},
    screen(name){this.track('screen_view',{screen:name})}
  };
})();