(() => {
  const copy={
    'pt-BR':{
      home:'HOME',base:'BASE',modalities:'MODALIDADES',practice:'PRÁTICA',profile:'PERFIL',
      learn3:'APRENDA A JOGAR POKER EM 3 ETAPAS',buildBase:'CONSTRUA SUA BASE.',
      heroSub:'Aprenda. Pratique. Evolua.',continue:'CONTINUAR APRENDENDO',start:'COMEÇAR',
      continueLearning:'CONTINUE LEARNING',threeSteps:'3 ETAPAS PRINCIPAIS',myEvolution:'MINHA EVOLUÇÃO',
      overallProgress:'PROGRESSO GERAL',answered:'QUESTÕES RESPONDIDAS',correct:'ACERTOS',errors:'ERROS',
      streak:'SEQUÊNCIA',weeklyGoal:'META SEMANAL',performance:'DESEMPENHO POR SEÇÃO',
      shortcuts:'ATALHOS',plans:'PLANOS',otherApps:'OUTROS APPS',language:'IDIOMA',
      free:'ACADEMY FREE',edge:'ACADEMY EDGE',full:'ACADEMY FULL',
      currentPlan:'PLANO ATUAL',prepared:'ESTRUTURA PREPARADA',ecosystem:'ECOSSISTEMA STACKUP',
      grinderCopy:'Pronto para transformar conhecimento em treino?',knowGrinder:'CONHEÇA O GRINDER',
      trainingLab:'TRAINING LAB',back:'VOLTAR',next:'PRÓXIMO',review:'REVISAR',confirm:'CONFIRMAR',
      questions:'QUESTÕES',accuracy:'APROVEITAMENTO'
    },
    'en-US':{
      home:'HOME',base:'BASE',modalities:'GAME TYPES',practice:'PRACTICE',profile:'PROFILE',
      learn3:'LEARN TO PLAY POKER IN 3 STEPS',buildBase:'BUILD YOUR FOUNDATION.',
      heroSub:'Learn. Practice. Evolve.',continue:'CONTINUE LEARNING',start:'START',
      continueLearning:'CONTINUE LEARNING',threeSteps:'3 CORE STEPS',myEvolution:'MY EVOLUTION',
      overallProgress:'OVERALL PROGRESS',answered:'QUESTIONS ANSWERED',correct:'CORRECT',errors:'ERRORS',
      streak:'STREAK',weeklyGoal:'WEEKLY GOAL',performance:'PERFORMANCE BY SECTION',
      shortcuts:'SHORTCUTS',plans:'PLANS',otherApps:'OTHER APPS',language:'LANGUAGE',
      free:'ACADEMY FREE',edge:'ACADEMY EDGE',full:'ACADEMY FULL',
      currentPlan:'CURRENT PLAN',prepared:'FRONTEND READY',ecosystem:'STACKUP ECOSYSTEM',
      grinderCopy:'Ready to turn knowledge into training?',knowGrinder:'DISCOVER GRINDER',
      trainingLab:'TRAINING LAB',back:'BACK',next:'NEXT',review:'REVIEW',confirm:'CONFIRM',
      questions:'QUESTIONS',accuracy:'ACCURACY'
    }
  };
  const lang=()=>{try{return localStorage.getItem('stackup-language-v1')||'pt-BR'}catch(_){return 'pt-BR'}};
  const t=(key,fallback='')=>copy[lang()]?.[key]??copy['pt-BR'][key]??fallback??key;
  window.AcademyI18n={copy,lang,t};
})();