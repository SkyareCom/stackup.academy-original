(() => {
  if(window.__stackupAcademyBillingBound)return;
  window.__stackupAcademyBillingBound=true;
  const map={mensal:'monthly',semestral:'semiannual',anual:'annual',monthly:'monthly','six-month':'semiannual',annual:'annual'};
  const STORAGE='academy.plan.v1';

  const save=(id,active,status)=>{
    const normalized=active?(map[id]||id||'monthly'):'free';
    try{localStorage.setItem(STORAGE,JSON.stringify({id:normalized,since:Date.now(),source:'google_play',status:status||''}))}catch(_){}
    window.dispatchEvent(new CustomEvent('academy:billingchange',{detail:{plan:normalized,active:!!active,status:status||''}}));
    window.AcademyScreens?.renderProfile?.('plans');
  };

  window.StackUpBilling={
    onEntitlement(plan,active,status){save(String(plan||''),!!active,String(status||''))},
    onMessage(message){
      const text=String(message||'');
      if(typeof window.toast==='function')window.toast(text,3500);
      else if(text)console.info('[ACADEMY BILLING]',text);
    }
  };

  document.addEventListener('click',event=>{
    const button=event.target.closest?.('[data-buy]');
    if(!button)return;
    event.preventDefault();
    const id=String(button.dataset.buy||'');
    window.BillingService?.purchase?.(id).catch(error=>{
      const msg=error?.message||'Não foi possível abrir a assinatura.';
      if(typeof window.toast==='function')window.toast(msg,3500);else alert(msg);
    });
  });

  window.BillingService?.restore?.();
})();