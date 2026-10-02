(() => {
  const t=(k,f='')=>window.AcademyI18n?.t(k,f)||f||k;
  const C=()=>window.AcademyComponents;
  const esc=v=>window.AcademyDOM?.esc(v)||String(v??'');

  if(!document.getElementById('academy-profile-style')){
    const s=document.createElement('style');s.id='academy-profile-style';
    s.textContent='.academy-profile{padding:16px 16px calc(32px + env(safe-area-inset-bottom))!important}.academy-profile-head{height:176px;min-height:176px;max-height:176px;padding:20px 0;display:flex;flex-direction:column;justify-content:flex-end;border-bottom:1px solid var(--academy-line-strong);margin:0 0 16px}.academy-profile-section{padding:20px 0 0}.academy-plan-grid{display:grid;gap:12px}.academy-plan{padding:16px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface)}.academy-plan.current{border-color:var(--academy-silver)}.academy-plan-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.academy-plan-price{margin-top:12px;display:flex;align-items:baseline;gap:6px}.academy-plan-benefits{display:grid;gap:6px;margin-top:12px;color:var(--academy-muted)}.academy-plan-benefits span{display:block;font-size:12px;letter-spacing:0;color:var(--academy-muted);text-transform:none;font-weight:400}.academy-plan strong{font-size:12px}.academy-plan-top span,.academy-plan-price span{font-size:12px;letter-spacing:.08em;color:var(--academy-muted);text-transform:uppercase}.academy-plan-action{margin-top:14px}.academy-plan-action button{width:100%}.academy-plan-soon{margin-top:14px;padding:9px 10px;border:1px solid var(--academy-line);border-radius:var(--academy-radius-sm);color:var(--academy-muted);text-align:center;text-transform:uppercase}.academy-addon{margin-top:12px;padding:16px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-bg-2)}.academy-lang-toggle{display:grid;grid-template-columns:1fr 1fr;gap:8px}.academy-lang-toggle button.active{background:var(--academy-ivory);color:var(--academy-bg);border-color:var(--academy-ivory)}.academy-ecosystem{display:grid;gap:12px}.academy-eco-card{padding:16px;border:1px solid var(--academy-line);border-radius:var(--academy-radius-md);background:var(--academy-bg-2);display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.academy-eco-card strong,.academy-eco-card span{display:block}.academy-eco-card span{margin-top:4px;color:var(--academy-muted)}.academy-soon-tag{flex:0 0 auto;margin:0!important;padding:5px 8px;border:1px solid var(--academy-line-strong);border-radius:999px;color:var(--academy-ivory)!important;text-transform:uppercase}';
    document.head.appendChild(s);
  }

  const planCard=(p,current,billingReady)=>{
    const status=p.id===current?t('currentPlan','PLANO ATUAL'):t('prepared','DISPONÍVEL EM BREVE');
    const benefits=(p.benefits||[]).map(b=>'<span>— '+esc(b)+'</span>').join('');
    let action='';
    if(p.id!=='free'&&p.id!==current){
      action=billingReady?'<div class="academy-plan-action">'+C().PrimaryButton(t('subscribe','ASSINAR'),'data-buy="'+esc(p.id)+'"')+'</div>':'<div class="academy-plan-soon">'+t('prepared','DISPONÍVEL EM BREVE')+'</div>';
    }
    return '<div class="academy-plan '+(p.id===current?'current':'')+'"><div class="academy-plan-top"><strong>'+esc(t(p.id,p.name))+'</strong><span>'+status+'</span></div><div class="academy-plan-price"><strong>'+esc(p.price||'')+'</strong><span>'+esc(p.period||'')+'</span></div><div class="academy-plan-benefits">'+benefits+'</div>'+action+'</div>';
  };

  const addonCard=a=>{
    const benefits=(a.benefits||[]).map(b=>'<span>— '+esc(b)+'</span>').join('');
    return '<div class="academy-addon"><div class="academy-plan-top"><strong>'+esc(t(a.id,a.name))+'</strong><span>'+t('prepared','DISPONÍVEL EM BREVE')+'</span></div><div class="academy-plan-price"><strong>'+esc(a.price||'')+'</strong><span>'+esc(a.period||'')+'</span></div><div class="academy-plan-benefits">'+benefits+'</div></div>';
  };

  const ecosystemCards=()=>[
    ['GRINDER',"Treinamento de No-Limit Hold'em"],
    ['HEROES',"Aperfeiçoamento em No-Limit Hold'em"],
    ['REVOLUTION','Simulador de treino e jogo interativo de NLH'],
    ['WRAPS','Treinamento de Pot-Limit Omaha'],
    ['D ACTION','Aperfeiçoamento em Pot-Limit Omaha']
  ].map(([name,desc])=>'<div class="academy-eco-card"><div><strong>'+name+'</strong><span>'+desc+'</span></div><span class="academy-soon-tag">'+t('comingSoon','EM BREVE')+'</span></div>').join('');

  function render(focus=''){
    const root=document.getElementById('root');if(!root)return;
    document.getElementById('navtools')?.classList.add('show');
    const CC=C(),plans=window.BillingService?.getPlans?.()||[],addons=window.BillingService?.getAddons?.()||[],current=window.BillingService?.getCurrentPlan?.()?.id||'free',lang=window.AcademyI18n?.lang?.()||'pt-BR',billingReady=!!window.BillingService?.isConfigured;
    const planCards=plans.map(p=>planCard(p,current,billingReady)).join('');
    const addOnCards=addons.map(addonCard).join('');
    root.innerHTML='<section class="screen academy-profile">'+
      '<header class="academy-profile-head academy-section-intro"><div class="academy-kicker">STACKUP HOLD\'EM · ACADEMY</div><h1 class="academy-title">'+t('profile','PERFIL')+'</h1><p class="academy-copy">'+t('profileCopy','Preferências, plano do Academy e acesso ao ecossistema.')+'</p></header>'+
      '<section class="academy-profile-section" id="profile-language">'+CC.CourseSection({title:t('language','IDIOMA'),content:'<div class="academy-lang-toggle"><button type="button" class="academy-secondary '+(lang==='pt-BR'?'active':'')+'" data-profile-lang="pt-BR">PT-BR</button><button type="button" class="academy-secondary '+(lang==='en-US'?'active':'')+'" data-profile-lang="en-US">EN-US</button></div>'})+'</section>'+
      '<section class="academy-profile-section" id="profile-plans">'+CC.CourseSection({title:t('plans','PLANOS'),content:'<div class="academy-plan-grid">'+planCards+'</div>'+addOnCards})+'</section>'+
      '<section class="academy-profile-section" id="profile-apps">'+CC.CourseSection({title:t('otherApps','OUTROS APPS'),content:'<div class="academy-ecosystem">'+ecosystemCards()+'</div>'})+'</section>'+
    '</section>';
    window.AnalyticsService?.screen?.('profile');
    if(focus){const id=focus==='plans'?'profile-plans':focus==='apps'?'profile-apps':'profile-language';setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),80)}
  }
  function open(focus=''){history.pushState({type:'academy-profile',focus},'','#profile');render(focus)}
  window.AcademyScreens=window.AcademyScreens||{};window.AcademyScreens.profile=open;window.AcademyScreens.renderProfile=render;

  document.addEventListener('click',e=>{
    const l=e.target.closest('[data-profile-lang]');
    if(l){const code=l.dataset.profileLang;try{localStorage.setItem('stackup-language-v1',code)}catch(_){};document.documentElement.lang=code;location.reload();return}
  });
  window.addEventListener('academy:billingchange',()=>{if(history.state?.type==='academy-profile')render(history.state.focus||'')});
  const old=window.onpopstate;
  window.onpopstate=e=>{if(e.state?.type==='academy-profile'){render(e.state.focus||'');return}old?.(e)};
})();