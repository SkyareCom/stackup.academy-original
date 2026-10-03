(() => {
  const STORAGE='academy.plan.v1';
  const ptPaidBenefits=[
    'Todos os Fundamentos e regras básicas',
    'Todas as modalidades com prática',
    'Quiz e Matemática em ordem aleatória',
    'Simulador completo: NLH, PLO4/5/6, Stud e O8',
    'Minha evolução, sugestões e Revisão do dia',
    'Reforço inteligente ilimitado',
    'Simulado cronometrado, certificados e relatório por competência'
  ];
  const enPaidBenefits=[
    'All Fundamentals and basic rules',
    'Every game type with practice',
    'Quiz and Math in random order',
    'Full simulator: NLH, PLO4/5/6, Stud and O8',
    'My evolution, suggestions and Today\'s review',
    'Unlimited smart review',
    'Timed exam, certificates and skill report'
  ];
  const plans=[
    {id:'free',name:'FREE',price:'R$ 0',period:'SEM PRAZO',status:'available',benefits:['Ranking de mãos, Streets e Blinds e Ante','5 questões fixas por tema','Histórico de treinos']},
    {id:'monthly',name:'MENSAL',price:'R$ 39,90',period:'/ MÊS',status:'prepared',benefits:[...ptPaidBenefits]},
    {id:'semiannual',name:'SEMESTRAL',price:'R$ 179,90',period:'/ 6 MESES',status:'prepared',benefits:[...ptPaidBenefits,'2 mensagens do Academy Coach por semana incluídas']},
    {id:'annual',name:'ANUAL',price:'R$ 229,90',period:'/ ANO',status:'prepared',benefits:[...ptPaidBenefits,'2 mensagens do Academy Coach por semana incluídas']}
  ];
  const addons=[
    {id:'coachPlus',name:'COACH PLUS',price:'+ R$ 34,90',period:'/ MÊS',status:'prepared',benefits:['Mensagens diárias variadas','Treinos curtos e revisões','Alertas de fraquezas e evolução','Disponível nos planos pagos']}
  ];
  const language=()=>window.AcademyI18n?.lang?.()==='en-US'?'en-US':'pt-BR';
  const localizedPlans=()=>{
    if(language()!=='en-US')return plans.map(x=>({...x,benefits:[...(x.benefits||[])]}));
    return [
      {id:'free',name:'FREE',price:'R$ 0',period:'NO EXPIRY',status:'available',benefits:['Hand rankings, Streets and Blinds & Antes','5 fixed questions per topic','Training history']},
      {id:'monthly',name:'MONTHLY',price:'R$ 39.90',period:'/ MONTH',status:'prepared',benefits:[...enPaidBenefits]},
      {id:'semiannual',name:'SEMIANNUAL',price:'R$ 179.90',period:'/ 6 MONTHS',status:'prepared',benefits:[...enPaidBenefits,'2 Academy Coach messages per week included']},
      {id:'annual',name:'ANNUAL',price:'R$ 229.90',period:'/ YEAR',status:'prepared',benefits:[...enPaidBenefits,'2 Academy Coach messages per week included']}
    ];
  };
  const localizedAddons=()=>language()==='en-US'
    ?[{id:'coachPlus',name:'COACH PLUS',price:'+ R$ 34.90',period:'/ MONTH',status:'prepared',benefits:['Varied daily messages','Short drills and reviews','Weakness and progress alerts','Available on paid plans']}]
    :addons.map(x=>({...x,benefits:[...(x.benefits||[])]}));
  const savedPlanId=()=>{
    let id='free';
    try{const saved=JSON.parse(localStorage.getItem(STORAGE)||'{}');id=saved?.id||id}catch(_){}
    if(id==='edge'||id==='full')id='annual';
    if(!['free','monthly','semiannual','annual'].includes(id)){
      if(id==='mensal')id='monthly';else if(id==='semestral')id='semiannual';else if(id==='anual')id='annual';else id='free';
    }
    return id;
  };
  const readPlan=()=>{
    const catalog=localizedPlans(),id=savedPlanId();
    return catalog.find(p=>p.id===id)||catalog[0];
  };
  window.BillingService={
    isConfigured:false,plans,addons,
    getPlans(){return localizedPlans()},
    getAddons(){return localizedAddons()},
    getCurrentPlan(){const plan=readPlan();return {...plan,benefits:[...(plan.benefits||[])]}},
    async purchase(){throw new Error(language()==='en-US'?'Billing is not connected yet.':'Billing ainda não conectado.')}
  };
})();