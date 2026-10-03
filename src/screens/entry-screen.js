(() => {
  const METHOD_KEY='academy.entry.method.v1';
  const LANG_KEY='stackup-language-v1';
  const allowedLangs=new Set(['pt-BR','en-US','es-ES']);
  const root=document.getElementById('root');
  const app=document.querySelector('.app');
  if(!root||!app)return;

  const currentLang=()=>{try{const v=localStorage.getItem(LANG_KEY);return allowedLangs.has(v)?v:'pt-BR'}catch(_){return'pt-BR'}};
  const saveLang=lang=>{
    if(!allowedLangs.has(lang))return;
    try{localStorage.setItem(LANG_KEY,lang)}catch(_){}
    document.documentElement.lang=lang;
    window.dispatchEvent(new CustomEvent('stackup:languagechange',{detail:{language:lang}}));
  };
  const hasSession=()=>window.__academyEntryPassed===true;
  const setSession=method=>{window.__academyEntryPassed=true;try{sessionStorage.setItem(METHOD_KEY,method)}catch(_){}};

  if(!document.getElementById('academy-entry-style')){
    const s=document.createElement('style');
    s.id='academy-entry-style';
    s.textContent=`
      html.academy-entry-active,html.academy-entry-active body{overflow:hidden!important}
      html.academy-entry-active .app{padding-bottom:0!important}
      html.academy-entry-active .brand,
      html.academy-entry-active .navtools,
      html.academy-entry-active .academy-bottom-nav{display:none!important}
      .academy-entry{position:fixed;z-index:120;inset:0;margin:auto;width:min(100%,560px);min-height:100dvh;overflow:auto;background:var(--academy-bg,#070707);color:var(--academy-ivory,#F2EDE2)}
      .academy-entry-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) saturate(.04) brightness(.28) blur(3px);transform:scale(1.035)}
      .academy-entry-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,7,7,.38) 0%,rgba(7,7,7,.72) 44%,#070707 86%)}
      .academy-entry-inner{position:relative;z-index:2;min-height:100dvh;padding:calc(34px + env(safe-area-inset-top)) 24px calc(28px + env(safe-area-inset-bottom));display:flex;flex-direction:column}
      .academy-entry-brand{display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:6vh}
      .academy-entry-logo{width:118px;height:118px;object-fit:contain;filter:drop-shadow(0 10px 20px rgba(0,0,0,.42))}
      .academy-entry-company{margin-top:18px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--academy-silver-3,#B9B9B9)}
      .academy-entry-product{margin-top:6px;font-size:12px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--academy-ivory,#F2EDE2)}
      .academy-entry-controls{margin-top:auto;padding-top:38px}
      .academy-entry-language{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:22px}
      .academy-entry-lang{min-height:44px;padding:10px 14px;border:1px solid var(--academy-silver,#7E7E7E);border-radius:var(--academy-radius-md,14px);background:var(--academy-surface-2,#202020);color:var(--academy-ivory,#F2EDE2);font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}
      .academy-entry-lang.active{background:var(--academy-ivory,#F2EDE2);border-color:var(--academy-ivory,#F2EDE2);color:var(--academy-bg,#070707)}
      .academy-entry-access{display:grid;gap:10px}
      .academy-entry-access-btn{width:100%;min-height:44px;padding:10px 14px;border:1px solid var(--academy-silver,#7E7E7E);border-radius:var(--academy-radius-md,14px);background:var(--academy-surface-2,#202020);color:var(--academy-ivory,#F2EDE2);display:grid;grid-template-columns:32px 1fr 18px;align-items:center;gap:12px;text-align:left;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}
      .academy-entry-lang:hover,.academy-entry-access-btn:hover{border-color:var(--academy-ivory,#F2EDE2)}
      .academy-entry-lang:active,.academy-entry-access-btn:active{transform:translateY(1px)}
      .academy-entry-access-btn:disabled{opacity:.55;cursor:wait}
      .academy-entry-access-btn svg{width:22px;height:22px;display:block}
      .academy-entry-stack-logo{width:24px;height:24px;border-radius:50%;overflow:hidden;display:grid;place-items:center;background:#090909}.academy-entry-stack-logo img{width:100%;height:100%;object-fit:cover;display:block}.academy-entry-arrow{color:var(--academy-silver,#7E7E7E);text-align:right;font-size:12px}
      .academy-entry-status{min-height:18px;margin:12px 2px 0;color:var(--academy-muted,#97938B);font-size:12px;line-height:1.35;text-align:center}
      @media(max-height:700px){.academy-entry-brand{padding-top:1vh}.academy-entry-logo{width:92px;height:92px}.academy-entry-controls{padding-top:24px}}
    `;
    document.head.appendChild(s);
  }

  const icon={
    biometric:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"><path d="M12 2.75a8.1 8.1 0 0 0-8.1 8.1"/><path d="M20.1 10.85A8.1 8.1 0 0 0 12 2.75"/><path d="M6.7 11.15A5.3 5.3 0 0 1 12 5.85a5.3 5.3 0 0 1 5.3 5.3c0 4.55-1.25 7.7-3.75 9.45"/><path d="M9.35 11.3A2.65 2.65 0 0 1 12 8.65a2.65 2.65 0 0 1 2.65 2.65c0 3.45-.8 5.9-2.45 7.45"/><path d="M9.6 20.55c1.55-2.25 2.15-5.05 2.15-8.45"/><path d="M6.2 15.4c.55-1.35.8-2.75.8-4.2"/></svg>',
    google:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.2c0-.64-.06-1.26-.17-1.85H12v3.5h5.25a4.49 4.49 0 0 1-1.95 2.94v2.27h3.16c1.85-1.7 2.89-4.22 2.89-6.86Z"/><path fill="#34A853" d="M12 21.72c2.64 0 4.85-.87 6.46-2.36l-3.16-2.27c-.87.59-1.99.94-3.3.94-2.55 0-4.71-1.72-5.48-4.04H3.26v2.34A9.75 9.75 0 0 0 12 21.72Z"/><path fill="#FBBC05" d="M6.52 13.99A5.86 5.86 0 0 1 6.21 12c0-.69.12-1.36.31-1.99V7.67H3.26A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.01 4.33l3.26-2.34Z"/><path fill="#EA4335" d="M12 5.97c1.43 0 2.71.49 3.72 1.45l2.79-2.79A9.35 9.35 0 0 0 12 2.28a9.75 9.75 0 0 0-8.74 5.39l3.26 2.34C7.29 7.69 9.45 5.97 12 5.97Z"/></svg>',
    stack:'<span class="academy-entry-stack-logo" aria-hidden="true"><img src="./header-logo-transparent.png?v=1" alt=""></span>'
  };

  const labels={
    'pt-BR':{bio:'ENTRAR COM BIOMETRIA',google:'ENTRAR COM GOOGLE',stack:'ENTRAR COM STACK ID',error:'NÃO FOI POSSÍVEL INICIAR O ACESSO.'},
    'en-US':{bio:'SIGN IN WITH BIOMETRICS',google:'SIGN IN WITH GOOGLE',stack:'SIGN IN WITH STACK ID',error:'COULD NOT START SIGN-IN.'},
    'es-ES':{bio:'ENTRAR CON BIOMETRIA',google:'ENTRAR CON GOOGLE',stack:'ENTRAR CON STACK ID',error:'NO SE PUDO INICIAR EL ACCESO.'}
  };

  const render=()=>{
    document.documentElement.classList.add('academy-entry-active');
    document.getElementById('navtools')?.classList.remove('show');
    const lang=currentLang(),L=labels[lang]||labels['pt-BR'];
    const bg=window.academyTheme?.backgrounds?.home||'https://images.unsplash.com/photo-1709540233692-23b65e46ac80?auto=format&fit=crop&w=1200&q=68';
    root.innerHTML=`<section class="academy-entry" aria-label="StackUp Hold'em Academy">
      <img class="academy-entry-bg" src="${bg}" alt="" aria-hidden="true">
      <div class="academy-entry-shade"></div>
      <div class="academy-entry-inner">
        <div class="academy-entry-brand">
          <img class="academy-entry-logo" src="./header-logo-transparent.png?v=1" alt="StackUp Hold'em">
          <div class="academy-entry-company">STACKUP HOLD'EM</div>
          <div class="academy-entry-product">ACADEMY</div>
        </div>
        <div class="academy-entry-controls">
          <div class="academy-entry-language" role="group" aria-label="Idioma">
            <button class="academy-entry-lang ${lang==='pt-BR'?'active':''}" type="button" data-entry-lang="pt-BR">PT-BR</button>
            <button class="academy-entry-lang ${lang==='en-US'?'active':''}" type="button" data-entry-lang="en-US">EN-US</button>
            <button class="academy-entry-lang ${lang==='es-ES'?'active':''}" type="button" data-entry-lang="es-ES">ES-ES</button>
          </div>
          <div class="academy-entry-access">
            <button class="academy-entry-access-btn" type="button" data-entry-provider="biometric">${icon.biometric}<span>${L.bio}</span><span class="academy-entry-arrow">›</span></button>
            <button class="academy-entry-access-btn" type="button" data-entry-provider="google">${icon.google}<span>${L.google}</span><span class="academy-entry-arrow">›</span></button>
            <button class="academy-entry-access-btn" type="button" data-entry-provider="stack-id">${icon.stack}<span>${L.stack}</span><span class="academy-entry-arrow">›</span></button>
          </div>
          <div class="academy-entry-status" aria-live="polite"></div>
        </div>
      </div>
    </section>`;
  };

  const enterApp=method=>{
    setSession(method);
    document.documentElement.classList.remove('academy-entry-active','academy-entry-pending');
    try{history.replaceState({type:'home'},'',location.pathname+location.search)}catch(_){}
    if(typeof window.home==='function')window.home();
    else location.reload();
  };

  document.addEventListener('click',async event=>{
    const langButton=event.target.closest?.('[data-entry-lang]');
    if(langButton){
      event.preventDefault();
      saveLang(langButton.dataset.entryLang);
      render();
      return;
    }
    const providerButton=event.target.closest?.('[data-entry-provider]');
    if(!providerButton)return;
    event.preventDefault();
    const provider=providerButton.dataset.entryProvider;
    const status=root.querySelector('.academy-entry-status');
    providerButton.disabled=true;
    try{
      if(window.AuthService?.isConfigured===true){
        await window.AuthService.signIn(provider);
      }
      enterApp(provider);
    }catch(error){
      providerButton.disabled=false;
      const L=labels[currentLang()]||labels['pt-BR'];
      if(status)status.textContent=error?.message||L.error;
    }
  });

  window.AcademyEntry={render,enterApp,hasSession};
  if(!hasSession())render();
  else document.documentElement.classList.remove('academy-entry-active','academy-entry-pending');
})();