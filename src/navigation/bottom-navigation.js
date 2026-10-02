(() => {
  const t=(k,f='')=>window.AcademyI18n?.t(k,f)||f||k;
  const icon=(name)=>{
    const paths={
      home:'<path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-5v-6h-5v6h-5A1.5 1.5 0 0 1 3 19.5z"/>',
      base:'<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
      modalities:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h4v6H7zM15 9h2v2h-2zM15 14h2"/>',
      practice:'<path d="M8 4h8l1 3h3v13H4V7h3z"/><path d="m9 13 2 2 4-5"/>',
      profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4.3 3.3-6.5 8-6.5s7.3 2.2 8 6.5"/>'
    };return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[name]||''}</svg>`;
  };
  if(!document.getElementById('academy-bottom-nav-style')){
    const s=document.createElement('style');s.id='academy-bottom-nav-style';s.textContent=`
      .app{padding-bottom:calc(62px + env(safe-area-inset-bottom))!important}
      .academy-bottom-nav{position:fixed;z-index:70;left:50%;bottom:0;transform:translateX(-50%);width:min(100%,560px);height:calc(58px + env(safe-area-inset-bottom));padding:5px 5px env(safe-area-inset-bottom);display:grid;grid-template-columns:repeat(5,minmax(0,1fr));background:rgba(7,7,7,.96);border-top:1px solid var(--academy-line-strong);backdrop-filter:blur(16px)}
      .academy-nav-item{min-width:0;border:0;background:transparent;color:var(--academy-silver);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:3px 1px;font-size:9px;font-weight:700;line-height:1;letter-spacing:.025em;text-transform:uppercase;white-space:nowrap}
      .academy-nav-item svg{width:18px;height:18px;flex:none}.academy-nav-item.active{color:var(--academy-ivory)}
      @media(max-width:330px){.academy-nav-item{font-size:8px}.academy-nav-item svg{width:16px;height:16px}}
    `;document.head.appendChild(s);
  }
  const app=document.querySelector('.app');if(!app)return;
  const nav=document.createElement('nav');nav.className='academy-bottom-nav';nav.setAttribute('aria-label',t('mainNav','Navegação principal'));
  const items=[
    ['home','home',t('home','HOME')],['fundamentos','base',t('base','BASE')],['modalidades','modalities',t('modalities','MODALIDADES')],
    ['pratica','practice',t('practice','PRÁTICA')],['profile','profile',t('profile','PERFIL')]
  ];
  nav.innerHTML=items.map(([key,ic,label])=>`<button type="button" class="academy-nav-item" data-academy-nav="${key}" aria-label="${label}">${icon(ic)}<span>${label}</span></button>`).join('');
  app.appendChild(nav);

  const setActive=key=>nav.querySelectorAll('[data-academy-nav]').forEach(b=>b.classList.toggle('active',b.dataset.academyNav===key));
  const infer=()=>{const st=history.state;if(st?.type==='academy-profile')return'profile';if(st?.stage)return st.stage;return'home'};
  nav.addEventListener('click',e=>{
    const b=e.target.closest('[data-academy-nav]');if(!b)return;const key=b.dataset.academyNav;
    if(key==='home'){window.goHome?.();setActive('home');return}
    if(key==='profile'){window.AcademyScreens?.profile?.();setActive('profile');return}
    window.stage?.(key,1);setActive(key);
  });
  window.addEventListener('popstate',()=>requestAnimationFrame(()=>setActive(infer())));
  const root=document.getElementById('root');new MutationObserver(()=>requestAnimationFrame(()=>setActive(infer()))).observe(root,{childList:true});
  setActive(infer());
})();