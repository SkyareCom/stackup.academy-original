(() => {
  const plans=[
    {id:'free',name:'FREE',price:'R$ 0',period:'SEM PRAZO',status:'available',benefits:['Acesso gratuito fixo ao conteúdo liberado']},
    {id:'monthly',name:'MENSAL',price:'R$ 39,90',period:'/ MÊS',status:'prepared',benefits:['Acesso completo ao Academy']},
    {id:'semiannual',name:'SEMESTRAL',price:'R$ 179,90',period:'/ 6 MESES',status:'prepared',benefits:['Acesso completo ao Academy','2 mensagens Coach por semana incluídas']},
    {id:'annual',name:'ANUAL',price:'R$ 229,90',period:'/ ANO',status:'prepared',benefits:['Acesso completo ao Academy','2 mensagens Coach por semana incluídas']}
  ];
  const addons=[
    {id:'coachPlus',name:'COACH PLUS',price:'+ R$ 34,90',period:'/ MÊS',status:'prepared',benefits:['Mensagens diárias variadas do Coach','Disponível nos planos pagos']}
  ];
  window.BillingService={
    isConfigured:false,plans,addons,
    getPlans(){return plans.map(x=>({...x,benefits:[...(x.benefits||[])]}))},
    getAddons(){return addons.map(x=>({...x,benefits:[...(x.benefits||[])]}))},
    getCurrentPlan(){return plans[0]},
    async purchase(){throw new Error('Billing ainda não conectado.')}
  };
})();