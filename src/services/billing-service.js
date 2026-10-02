(() => {
  const plans=[
    {id:'free',name:'ACADEMY FREE',status:'available'},
    {id:'edge',name:'ACADEMY EDGE',status:'prepared'},
    {id:'full',name:'ACADEMY FULL',status:'prepared'}
  ];
  window.BillingService={
    isConfigured:false,plans,
    getPlans(){return plans.map(x=>({...x}))},
    getCurrentPlan(){return plans[0]},
    async purchase(){throw new Error('Billing ainda não conectado.')}
  };
})();