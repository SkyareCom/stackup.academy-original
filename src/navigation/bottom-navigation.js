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
      :root{--academy-bottom-nav-height:calc(58px + env(safe-area-inset-bottom));--academy-bottom-safe:calc(86px + env(safe-area-inset-bottom))}
      .app{padding-bottom:var(--academy-bottom-safe)!important}
      #root{min-height:calc(100dvh - var(--academy-bottom-nav-height));padding-bottom:var(--academy-bottom-safe)!important}
      #root>.screen{padding-bottom:var(--academy-bottom-safe)!important}
      #root>.screen>:last-child{margin-bottom:0!important}
      .academy-bottom-nav{position:fixed;z-index:70;left:50%;bottom:0;transform:translateX(-50%);width:min(100%,560px);height:calc(58px + env(safe-area-inset-bottom));padding:5px 5px env(safe-area-inset-bottom);display:grid;grid-template-columns:repeat(5,minmax(0,1fr));background:rgba(7,7,7,.96);border-top:1px solid var(--academy-line-strong);backdrop-filter:blur(16px)}
      .academy-nav-item{min-width:0;border:0;background:transparent;color:var(--academy-silver);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:3px 1px;font-size:12px;font-weight:600;line-height:1;letter-spacing:0;text-transform:uppercase;white-space:nowrap}
      .academy-nav-item svg{width:18px;height:18px;flex:none}.academy-nav-item.active{color:var(--academy-ivory)}
      @media(max-width:330px){.academy-nav-item{font-size:12px;letter-spacing:-.02em}.academy-nav-item svg{width:16px;height:16px}}
    `;document.head.appendChild(s);
  }
  const app=document.querySelector('.app');if(!app)return;
  const root=document.getElementById('root');if(!root)return;
  const nav=document.createElement('nav');nav.className='academy-bottom-nav';nav.setAttribute('aria-label',t('mainNav','Navegação principal'));
  const items=[
    ['home','home',t('home','HOME')],['fundamentos','base',t('base','BASE')],['modalidades','modalities',t('modalities','MODALIDADES')],
    ['pratica','practice',t('practice','PRÁTICA')],['profile','profile',t('profile','PERFIL')]
  ];
  nav.innerHTML=items.map(([key,ic,label])=>`<button type="button" class="academy-nav-item" data-academy-nav="${key}" aria-label="${label}">${icon(ic)}<span>${label}</span></button>`).join('');
  app.appendChild(nav);

  const setActive=key=>nav.querySelectorAll('[data-academy-nav]').forEach(b=>b.classList.toggle('active',b.dataset.academyNav===key));
  const infer=()=>{const st=history.state;if(st?.type==='academy-profile')return'profile';if(st?.type==='academy-practice-tool')return'pratica';if(st?.stage)return st.stage;return'home'};
  const orderedKeys=items.map(x=>x[0]);
  const navigateTo=key=>{
    if(key==='home'){window.goHome?.();setActive('home');return}
    if(key==='profile'){window.AcademyScreens?.profile?.();setActive('profile');return}
    window.stage?.(key,1);setActive(key);
  };
  nav.addEventListener('click',e=>{
    const b=e.target.closest('[data-academy-nav]');if(!b)return;navigateTo(b.dataset.academyNav);
  });

  const topLevelKey=()=>{
    const st=history.state;
    if(!st||st.type==='home')return'home';
    if(st.type==='stage'&&orderedKeys.includes(st.stage))return st.stage;
    if(st.type==='academy-profile')return'profile';
    return null;
  };
  const interactiveTarget=target=>!!target?.closest?.('input,textarea,select,[contenteditable="true"],.academy-modal,.academy-bottom-sheet');
  let touch=null;
  const resetSwipe=()=>{
    root.style.transition='transform 180ms ease, opacity 180ms ease';
    root.style.transform='';
    root.style.opacity='';
    setTimeout(()=>{root.style.transition=''},190);
  };
  root.addEventListener('touchstart',e=>{
    if(e.touches.length!==1||!topLevelKey()||interactiveTarget(e.target)){touch=null;return}
    const p=e.touches[0];
    touch={x:p.clientX,y:p.clientY,dx:0,dy:0,horizontal:null};
  },{passive:true});
  root.addEventListener('touchmove',e=>{
    if(!touch||e.touches.length!==1)return;
    const p=e.touches[0];touch.dx=p.clientX-touch.x;touch.dy=p.clientY-touch.y;
    if(touch.horizontal===null){
      if(Math.abs(touch.dx)<8&&Math.abs(touch.dy)<8)return;
      touch.horizontal=Math.abs(touch.dx)>Math.abs(touch.dy)*1.15;
    }
    if(!touch.horizontal)return;
    const key=topLevelKey();if(!key){touch=null;resetSwipe();return}
    e.preventDefault();
    const i=orderedKeys.indexOf(key),edge=(touch.dx>0&&i===0)||(touch.dx<0&&i===orderedKeys.length-1);
    const dx=edge?touch.dx*.24:touch.dx;
    root.style.transition='none';
    root.style.transform='translateX('+dx+'px)';
    root.style.opacity=String(1-Math.min(Math.abs(dx)/700,.28));
  },{passive:false});
  root.addEventListener('touchend',()=>{
    if(!touch)return;
    const data=touch;touch=null;
    const key=topLevelKey(),i=orderedKeys.indexOf(key);
    if(!data.horizontal||i<0||Math.abs(data.dx)<60){resetSwipe();return}
    const next=data.dx<0?i+1:i-1;
    if(next<0||next>=orderedKeys.length){resetSwipe();return}
    const width=Math.max(root.clientWidth,320),dir=data.dx<0?-1:1;
    root.style.transition='transform 170ms ease-in, opacity 170ms ease-in';
    root.style.transform='translateX('+(dir*width)+'px)';
    root.style.opacity='0';
    setTimeout(()=>{
      root.style.transition='none';root.style.transform='translateX('+(-dir*26)+'px)';root.style.opacity='0';
      navigateTo(orderedKeys[next]);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        root.style.transition='transform 180ms ease-out, opacity 180ms ease-out';
        root.style.transform='';root.style.opacity='1';
        setTimeout(()=>{root.style.transition='';root.style.opacity=''},190);
      }));
    },165);
  },{passive:true});
  root.addEventListener('touchcancel',()=>{touch=null;resetSwipe()},{passive:true});
  window.addEventListener('popstate',()=>requestAnimationFrame(()=>setActive(infer())));
  new MutationObserver(()=>requestAnimationFrame(()=>setActive(infer()))).observe(root,{childList:true});
  setActive(infer());
})();