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
    {id:'semiannual',name:'SEMESTRAL',price:'R$ 179,90',period:'/ 6 MESES',status:'prepared',monthlyEquivalent:'R$ 29,98 / MÊS',saving:'ECONOMIZE 25%',benefits:[...ptPaidBenefits]},
    {id:'annual',name:'ANUAL',price:'R$ 219,90',period:'/ ANO',status:'prepared',monthlyEquivalent:'R$ 18,33 / MÊS',saving:'ECONOMIZE 54%',trial:'7 DIAS GRÁTIS',featured:true,benefits:[...ptPaidBenefits]}
  ];
  const language=()=>window.AcademyI18n?.lang?.()==='en-US'?'en-US':'pt-BR';
  const localizedPlans=()=>{
    if(language()!=='en-US')return plans.map(x=>({...x,benefits:[...(x.benefits||[])]}));
    return [
      {id:'free',name:'FREE',price:'R$ 0',period:'NO EXPIRY',status:'available',benefits:['Hand rankings, Streets and Blinds & Antes','5 fixed questions per topic','Training history']},
      {id:'monthly',name:'MONTHLY',price:'R$ 39.90',period:'/ MONTH',status:'prepared',benefits:[...enPaidBenefits]},
      {id:'semiannual',name:'SEMIANNUAL',price:'R$ 179.90',period:'/ 6 MONTHS',status:'prepared',monthlyEquivalent:'R$ 29.98 / MONTH',saving:'SAVE 25%',benefits:[...enPaidBenefits]},
      {id:'annual',name:'ANNUAL',price:'R$ 219.90',period:'/ YEAR',status:'prepared',monthlyEquivalent:'R$ 18.33 / MONTH',saving:'SAVE 54%',trial:'7 DAYS FREE',featured:true,benefits:[...enPaidBenefits]}
    ];
  };
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
    isConfigured:false,plans,addons:[],
    getPlans(){return localizedPlans()},
    getAddons(){return []},
    getCurrentPlan(){const plan=readPlan();return {...plan,benefits:[...(plan.benefits||[])]}},
    async purchase(){throw new Error(language()==='en-US'?'Billing is not connected yet.':'Billing ainda não conectado.')}
  };
})();