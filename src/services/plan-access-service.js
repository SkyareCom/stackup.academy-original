(() => {
  const TEST_ACCESS=true;
  const FREE_LIMIT=5;
  const FREE_FUNDAMENTALS=new Set([0,2,3]); // Ranking de mãos, Blinds/Ante, Streets
  const currentPlan=()=>window.BillingService?.getCurrentPlan?.()?.id||'free';
  const isPaid=()=>TEST_ACCESS||currentPlan()!=='free';
  const isLocked=(stage,index=null)=>{
    if(TEST_ACCESS||isPaid())return false;
    if(stage==='fundamentos')return index===null?false:!FREE_FUNDAMENTALS.has(Number(index));
    return stage!=='history';
  };
  const featureLocked=feature=>{
    if(TEST_ACCESS||isPaid())return false;
    return !['history','fundamentals-free'].includes(feature);
  };
  window.PlanAccessService={
    TEST_ACCESS,FREE_LIMIT,FREE_FUNDAMENTALS,
    currentPlan,isPaid,isLocked,featureLocked,
    fixedQuestionLimit(){return FREE_LIMIT}
  };
})();