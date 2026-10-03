(() => {
  const SESSION_KEY='academy.entry.session.v1';
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
  const hasSession=()=>{try{return sessionStorage.getItem(SESSION_KEY)==='1'}catch(_){return false}};
  const setSession=method=>{try{sessionStorage.setItem(SESSION_KEY,'1');sessionStorage.setItem(METHOD_KEY,method)}catch(_){}};

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
      .academy-entry-lang{min-height:42px;border:1px solid #3A3A3A;border-radius:12px;background:rgba(36,36,36,.88);color:var(--academy-silver-3,#B9B9B9);font-size:12px;font-weight:600;letter-spacing:.04em}
      .academy-entry-lang.active{background:var(--academy-concrete-3,#313131);border-color:var(--academy-silver,#7E7E7E);color:var(--academy-ivory,#F2EDE2)}
      .academy-entry-access{display:grid;gap:10px}
      .academy-entry-access-btn{width:100%;min-height:54px;padding:0 16px;border:1px solid #3A3A3A;border-radius:14px;background:rgba(36,36,36,.92);color:var(--academy-ivory,#F2EDE2);display:grid;grid-template-columns:26px 1fr 18px;align-items:center;gap:12px;text-align:left;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase}
      .academy-entry-access-btn svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
      .academy-entry-arrow{color:var(--academy-silver,#7E7E7E);text-align:right;font-size:12px}
      .academy-entry-status{min-height:18px;margin:12px 2px 0;color:var(--academy-muted,#97938B);font-size:12px;line-height:1.35;text-align:center}
      @media(max-height:700px){.academy-entry-brand{padding-top:1vh}.academy-entry-logo{width:92px;height:92px}.academy-entry-controls{padding-top:24px}}
    `;
    document.head.appendChild(s);
  }

  const icon={
    biometric:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3.5A4.5 4.5 0 0 1 16.5 6M5.5 8A6.5 6.5 0 0 1 18 10.5M4 12.5c0-4.7 3.1-8 8-8M20 12c0 5.2-2.4 8.1-6 9M7 13c0-3 1.8-5 5-5 3.1 0 5 2.1 5 5 0 3.8-1.5 6.1-4.2 7.7M10 12.5c0-1.2.7-2 2-2s2 .9 2 2c0 2.7-.7 4.5-2.3 6.2M8.5 16.5c.5-1.1.7-2.4.7-4"/></svg>',
    google:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12.2c0-.7-.1-1.4-.2-2H12v3.6h4.5a4.2 4.2 0 0 1-1.8 2.7v2.3h3c1.7-1.6 2.3-3.9 2.3-6.6Z"/><path d="M12 20.2c2.2 0 4.1-.7 5.6-2l-3-2.3c-.8.5-1.7.8-2.6.8-2.1 0-3.9-1.4-4.5-3.4H4.4v2.4A8.4 8.4 0 0 0 12 20.2Z"/><path d="M7.5 13.3A5 5 0 0 1 7.2 12c0-.5.1-.9.2-1.3V8.3H4.4A8.3 8.3 0 0 0 3.5 12c0 1.3.3 2.6.9 3.7l3.1-2.4Z"/><path d="M12 7.3c1.2 0 2.3.4 3.1 1.2l2.4-2.3A8.1 8.1 0 0 0 12 4 8.4 8.4 0 0 0 4.4 8.3l3.1 2.4c.6-2 2.4-3.4 4.5-3.4Z"/></svg>',
    stack:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6.5v5.4c0 4.1 2.5 7.7 7 9.1 4.5-1.4 7-5 7-9.1V6.5L12 3Z"/><path d="M9.1 9.2c.5-1 1.5-1.5 2.9-1.5 1.5 0 2.5.6 2.9 1.6M14.7 13c-.4 1-1.4 1.6-2.8 1.6-1.5 0-2.6-.6-3-1.7M12 6.7v9.6"/></svg>'
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