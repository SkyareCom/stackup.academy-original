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
      .academy-entry-brand{display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:0}
      .academy-entry-logo{width:210px!important;height:210px!important;object-fit:contain;border-radius:50%;filter:drop-shadow(0 14px 34px rgba(0,0,0,.62))}
      .academy-entry-company{margin-top:6px;font-family:'Saira Semi Condensed',system-ui,sans-serif!important;font-size:24px!important;font-weight:600!important;line-height:1.05;letter-spacing:.055em;text-transform:uppercase;color:var(--academy-ivory,#F2EDE2);text-shadow:0 2px 10px rgba(0,0,0,.45)}
      .academy-entry-product{margin-top:7px;font-family:'Saira Stencil One','Saira Semi Condensed',system-ui,sans-serif!important;font-size:35px!important;font-weight:400!important;line-height:1;letter-spacing:.10em;text-transform:uppercase;color:#D9AA57!important;text-shadow:0 2px 14px rgba(217,170,87,.22)}
      .academy-entry-controls{margin-top:30px!important;padding-top:0;width:100%;max-width:430px;align-self:center}
      .academy-entry-language{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:18px}
      .academy-entry-lang{min-height:40px;padding:8px 10px;border:1px solid rgba(242,237,226,.18);border-radius:12px;background:rgba(18,18,18,.58);backdrop-filter:blur(12px);color:var(--academy-silver-3,#B9B9B9);font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,.025);transition:background .18s ease,border-color .18s ease,color .18s ease,transform .12s ease}
      .academy-entry-lang.active{background:rgba(242,237,226,.10);border-color:rgba(242,237,226,.46);color:var(--academy-ivory,#F2EDE2)}
      .academy-entry-access{display:grid;gap:9px}
      .academy-entry-access-btn{position:relative;width:100%;min-height:52px;padding:0 15px;border:1px solid rgba(242,237,226,.16);border-radius:14px;background:linear-gradient(180deg,rgba(34,34,34,.78),rgba(20,20,20,.82));backdrop-filter:blur(14px);color:var(--academy-ivory,#F2EDE2);display:grid;grid-template-columns:28px 1fr 16px;align-items:center;gap:12px;text-align:left;font-size:12px;font-weight:600;letter-spacing:.055em;text-transform:uppercase;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,.035),0 8px 24px rgba(0,0,0,.16);transition:background .18s ease,border-color .18s ease,transform .12s ease}
      .academy-entry-lang:hover,.academy-entry-access-btn:hover{border-color:rgba(242,237,226,.36);background-color:rgba(44,44,44,.82)}
      .academy-entry-lang:active,.academy-entry-access-btn:active{transform:translateY(1px)}
      .academy-entry-access-btn:disabled{opacity:.55;cursor:wait}
      .academy-entry-access-btn svg{width:20px;height:20px;display:block}
      .academy-entry-stack-logo{width:22px;height:22px;border-radius:50%;overflow:hidden;display:grid;place-items:center;background:#090909;box-shadow:0 0 0 1px rgba(242,217,149,.22)}.academy-entry-stack-logo img{width:100%;height:100%;object-fit:cover;display:block}.academy-entry-arrow{color:rgba(242,237,226,.42);text-align:right;font-size:12px;font-weight:400}
      .academy-entry-status{min-height:18px;margin:12px 2px 0;color:var(--academy-muted,#97938B);font-size:12px;line-height:1.35;text-align:center}
      @media(max-height:700px){.academy-entry-brand{padding-top:0}.academy-entry-logo{width:172px!important;height:172px!important}.academy-entry-company{font-size:24px!important}.academy-entry-product{font-size:35px!important}.academy-entry-controls{margin-top:18px!important;padding-top:0}}
    `;
    document.head.appendChild(s);
  }

  const icon={
    biometric:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"><path d="M12 2.75a8.1 8.1 0 0 0-8.1 8.1"/><path d="M20.1 10.85A8.1 8.1 0 0 0 12 2.75"/><path d="M6.7 11.15A5.3 5.3 0 0 1 12 5.85a5.3 5.3 0 0 1 5.3 5.3c0 4.55-1.25 7.7-3.75 9.45"/><path d="M9.35 11.3A2.65 2.65 0 0 1 12 8.65a2.65 2.65 0 0 1 2.65 2.65c0 3.45-.8 5.9-2.45 7.45"/><path d="M9.6 20.55c1.55-2.25 2.15-5.05 2.15-8.45"/><path d="M6.2 15.4c.55-1.35.8-2.75.8-4.2"/></svg>',
    google:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-2 3.02v2.53h3.24c1.9-1.75 2.98-4.33 2.98-7.39Z"/><path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.24-2.53c-.9.6-2.05.96-3.38.96-2.6 0-4.81-1.76-5.6-4.13H3.06v2.6A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.4 13.87A6.01 6.01 0 0 1 6.08 12c0-.65.11-1.28.32-1.87v-2.6H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.47l3.34-2.6Z"/><path fill="#EA4335" d="M12 6c1.47 0 2.79.5 3.83 1.49l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.94 5.53l3.34 2.6C7.19 7.76 9.4 6 12 6Z"/></svg>',
    stack:'<span class="academy-entry-stack-logo" aria-hidden="true"><img src="./stackup-logo.png?v=20261004" alt=""></span>'
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
          <img class="academy-entry-logo" src="./stackup-logo.png?v=20261004" alt="StackUp Hold'em">
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