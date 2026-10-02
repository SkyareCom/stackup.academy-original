(() => {
  const STORAGE='academy.plan.v1';
  const paidBenefits=[
    'Todos os Fundamentos e regras básicas',
    'Todas as modalidades com prática',
    'Quiz e Matemática em ordem aleatória',
    'Simulador completo: NLH, PLO4/5/6, Stud e O8',
    'Minha evolução, sugestões e Revisão do dia',
    'Reforço inteligente ilimitado',
    'Simulado cronometrado, certificados e relatório por competência'
  ];
  const plans=[
    {id:'free',name:'FREE',price:'R$ 0',period:'SEM PRAZO',status:'available',benefits:['Ranking de mãos, Streets e Blinds e Ante','5 questões fixas por tema','Histórico de treinos']},
    {id:'monthly',name:'MENSAL',price:'R$ 39,90',period:'/ MÊS',status:'prepared',benefits:[...paidBenefits]},
    {id:'semiannual',name:'SEMESTRAL',price:'R$ 179,90',period:'/ 6 MESES',status:'prepared',benefits:[...paidBenefits,'2 mensagens do Academy Coach por semana incluídas']},
    {id:'annual',name:'ANUAL',price:'R$ 229,90',period:'/ ANO',status:'prepared',benefits:[...paidBenefits,'2 mensagens do Academy Coach por semana incluídas']}
  ];
  const addons=[
    {id:'coachPlus',name:'COACH PLUS',price:'+ R$ 34,90',period:'/ MÊS',status:'prepared',benefits:['Mensagens diárias variadas','Treinos curtos e revisões','Alertas de fraquezas e evolução','Disponível nos planos pagos']}
  ];
  const readPlan=()=>{
    let id='free';
    try{const saved=JSON.parse(localStorage.getItem(STORAGE)||'{}');id=saved?.id||id}catch(_){}
    if(id==='edge'||id==='full')id='annual';
    if(!['free','monthly','semiannual','annual'].includes(id)){
      if(id==='mensal')id='monthly';else if(id==='semestral')id='semiannual';else if(id==='anual')id='annual';else id='free';
    }
    return plans.find(p=>p.id===id)||plans[0];
  };
  window.BillingService={
    isConfigured:false,plans,addons,
    getPlans(){return plans.map(x=>({...x,benefits:[...(x.benefits||[])]}))},
    getAddons(){return addons.map(x=>({...x,benefits:[...(x.benefits||[])]}))},
    getCurrentPlan(){return {...readPlan(),benefits:[...(readPlan().benefits||[])]}},
    async purchase(){throw new Error('Billing ainda não conectado.')}
  };
})();