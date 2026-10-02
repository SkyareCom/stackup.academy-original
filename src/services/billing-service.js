(() => {
  const STORAGE='academy.plan.v1';
  const mapNative={mensal:'monthly',semestral:'semiannual',anual:'annual',monthly:'monthly','six-month':'semiannual',annual:'annual'};
  const mapWeb={monthly:'mensal',semiannual:'semestral',annual:'anual'};
  const plans=[
    {id:'free',nativeId:'free',name:'FREE',price:'R$ 0',period:'SEM PRAZO',status:'available',benefits:['Ranking de mãos, Streets e Blinds e Ante','Treinos introdutórios do Academy','Histórico de treinos']},
    {id:'monthly',nativeId:'mensal',name:'MENSAL',price:'R$ 39,90',period:'/ MÊS',status:'prepared',benefits:['Todos os Fundamentos e regras básicas','Todas as modalidades com prática','Quiz, Matemática e Simulador completos','Minha evolução e histórico completo']},
    {id:'semiannual',nativeId:'semestral',name:'SEMESTRAL',price:'R$ 179,90',period:'/ 6 MESES',status:'prepared',benefits:['Todo o conteúdo do plano Mensal','2 mensagens do Academy Coach por semana incluídas','Minha evolução e histórico completo']},
    {id:'annual',nativeId:'anual',name:'ANUAL',price:'R$ 229,90',period:'/ ANO',status:'prepared',benefits:['Todo o conteúdo do plano Mensal','2 mensagens do Academy Coach por semana incluídas','Minha evolução e histórico completo']}
  ];
  const addons=[
    {id:'coachPlus',name:'COACH PLUS',price:'+ R$ 34,90',period:'/ MÊS',status:'prepared',benefits:['Mensagens diárias variadas','Treinos curtos e revisões','Alertas de fraquezas e evolução','Disponível nos planos pagos']}
  ];
  const safeRead=()=>{try{return JSON.parse(localStorage.getItem(STORAGE)||'{}')||{}}catch(_){return {}}};
  const normalize=id=>mapNative[id]||id||'free';
  const current=()=>plans.find(p=>p.id===normalize(safeRead().id))||plans[0];
  const nativeReady=()=>!!(window.StackUpNative&&typeof window.StackUpNative.requestSubscription==='function');

  window.BillingService={
    STORAGE,plans,addons,mapNative,mapWeb,
    get isConfigured(){return nativeReady()},
    getPlans(){return plans.map(x=>({...x,benefits:[...(x.benefits||[])]}))},
    getAddons(){return addons.map(x=>({...x,benefits:[...(x.benefits||[])]}))},
    getCurrentPlan(){return {...current()}},
    async purchase(id){
      const plan=plans.find(p=>p.id===id);
      if(!plan||plan.id==='free')return plan||plans[0];
      if(!nativeReady())throw new Error('Assinaturas Google Play disponíveis somente no app Android.');
      window.StackUpNative.requestSubscription(mapWeb[id]||plan.nativeId);
      return plan;
    },
    restore(){
      if(window.StackUpNative&&typeof window.StackUpNative.restoreSubscriptions==='function'){
        window.StackUpNative.restoreSubscriptions();return true;
      }
      return false;
    }
  };
})();