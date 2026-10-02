(() => {
  const t=(k,f='')=>window.AcademyI18n?.t(k,f)||f||k;
  const C=()=>window.AcademyComponents;
  const esc=v=>window.AcademyDOM?.esc(v)||String(v??'');

  if(!document.getElementById('academy-profile-style')){
    const s=document.createElement('style');s.id='academy-profile-style';s.textContent=`
      .academy-profile{padding:16px 16px calc(32px + env(safe-area-inset-bottom))!important}.academy-profile-head{height:176px;min-height:176px;max-height:176px;padding:20px 0;display:flex;flex-direction:column;justify-content:flex-end;border-bottom:1px solid var(--academy-line-strong);margin:0 0 16px}
      .academy-profile-section{padding:20px 0 0}.academy-profile-list{border-top:1px solid var(--academy-line)}
      .academy-plan-grid{display:grid;gap:12px}.academy-plan{padding:16px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface)}
      .academy-plan.current{border-color:var(--academy-silver)}.academy-plan-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.academy-plan-price{margin-top:12px;display:flex;align-items:baseline;gap:6px}.academy-plan-benefits{display:grid;gap:6px;margin-top:12px;color:var(--academy-muted)}.academy-plan-benefits span{display:block}.academy-addon{margin-top:12px;padding:16px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-bg-2)}.academy-plan strong{font-size:12px}.academy-plan-top span,.academy-plan-price span{font-size:12px;letter-spacing:.08em;color:var(--academy-muted);text-transform:uppercase}.academy-plan-benefits span{font-size:12px;letter-spacing:0;color:var(--academy-muted);text-transform:none;font-weight:400}
      .academy-cross-sell{padding:16px;border:1px solid var(--academy-line);border-radius:var(--academy-radius-md);background:var(--academy-bg-2)}
      .academy-cross-sell p{margin:6px 0 14px;color:var(--academy-muted);font-size:12px;line-height:1.45}
      .academy-lang-toggle{display:grid;grid-template-columns:1fr 1fr;gap:8px}.academy-lang-toggle button.active{background:var(--academy-ivory);color:var(--academy-bg);border-color:var(--academy-ivory)}
    `;document.head.appendChild(s);
  }

  function render(focus=''){
    const root=document.getElementById('root');if(!root)return;
    document.getElementById('navtools')?.classList.add('show');
    const CC=C(),plans=window.BillingService?.getPlans?.()||[],addons=window.BillingService?.getAddons?.()||[],current=window.BillingService?.getCurrentPlan?.()?.id||'free',lang=window.AcademyI18n?.lang?.()||'pt-BR';
    root.innerHTML=`<section class="screen academy-profile">
      <header class="academy-profile-head academy-section-intro"><div class="academy-kicker">STACKUP HOLD'EM · ACADEMY</div><h1 class="academy-title">${t('profile','PERFIL')}</h1><p class="academy-copy">${t('profileCopy','Preferências, plano do Academy e acesso ao ecossistema.')}</p></header>
      <section class="academy-profile-section" id="profile-language">${CC.CourseSection({title:t('language','IDIOMA'),content:`<div class="academy-lang-toggle"><button type="button" class="academy-secondary ${lang==='pt-BR'?'active':''}" data-profile-lang="pt-BR">PT-BR</button><button type="button" class="academy-secondary ${lang==='en-US'?'active':''}" data-profile-lang="en-US">EN-US</button></div>`})}</section>
      <section class="academy-profile-section" id="profile-plans">${CC.CourseSection({title:t('plans','PLANOS'),content:`<div class="academy-plan-grid">${plans.map(p=>`<div class="academy-plan ${p.id===current?'current':''}"><div class="academy-plan-top"><strong>${esc(t(p.id,p.name))}</strong><span>${p.id===current?t('currentPlan','PLANO ATUAL'):t('prepared','DISPONÍVEL EM BREVE')}</span></div><div class="academy-plan-price"><strong>${esc(p.price||'')}</strong><span>${esc(p.period||'')}</span></div><div class="academy-plan-benefits">${(p.benefits||[]).map(b=>`<span>— ${esc(b)}</span>`).join('')}</div></div>`).join('')}</div>${addons.map(a=>`<div class="academy-addon"><div class="academy-plan-top"><strong>${esc(t(a.id,a.name))}</strong><span>${t('prepared','DISPONÍVEL EM BREVE')}</span></div><div class="academy-plan-price"><strong>${esc(a.price||'')}</strong><span>${esc(a.period||'')}</span></div><div class="academy-plan-benefits">${(a.benefits||[]).map(b=>`<span>— ${esc(b)}</span>`).join('')}</div></div>`).join('')}`})}</section>
      <section class="academy-profile-section" id="profile-apps">${CC.CourseSection({title:t('otherApps','OUTROS APPS'),content:`<div class="academy-cross-sell"><div class="academy-kicker">${t('ecosystem','ECOSSISTEMA STACKUP')}</div><p>${t('grinderCopy','Pronto para transformar conhecimento em treino?')}</p>${CC.SecondaryButton(t('knowGrinder','CONHEÇA O GRINDER'),'data-profile-grinder')}</div>`})}</section>
    </section>`;
    window.AnalyticsService?.screen?.('profile');
    if(focus){const id=focus==='plans'?'profile-plans':focus==='apps'?'profile-apps':'profile-language';setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),80)}
  }
  function open(focus=''){
    history.pushState({type:'academy-profile',focus},'','#profile');
    render(focus);
  }
  window.AcademyScreens=window.AcademyScreens||{};window.AcademyScreens.profile=open;window.AcademyScreens.renderProfile=render;

  document.addEventListener('click',e=>{
    const l=e.target.closest('[data-profile-lang]');if(l){const code=l.dataset.profileLang;try{localStorage.setItem('stackup-language-v1',code)}catch(_){};document.documentElement.lang=code;location.reload();return}
    if(e.target.closest('[data-profile-grinder]')){e.preventDefault();window.dispatchEvent(new CustomEvent('academy:crosssell',{detail:{product:'grinder'}}));}
  });
  const old=window.onpopstate;
  window.onpopstate=e=>{if(e.state?.type==='academy-profile'){render(e.state.focus||'');return}old?.(e)};
})();