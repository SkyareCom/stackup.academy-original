(() => {
  const theme={
    colors:{
      background:{primary:'#070707',secondary:'#0C0C0C',tertiary:'#151515'},
      surfaces:{one:'#1A1A1A',two:'#202020',three:'#282828'},
      graphite:{one:'#333333',two:'#484848'},
      silver:{one:'#7E7E7E',two:'#A5A5A5',three:'#B9B9B9'},
      ivory:{one:'#F2EDE2',two:'#F7F3EB'},
      white:'#FAF7F0',
      muted:{one:'#97938B',two:'#77736C'},
      lines:{soft:'rgba(242,237,226,0.10)',strong:'rgba(242,237,226,0.18)'},
      success:'#82917F',warning:'#B39B72',danger:'#956A66'
    },
    typography:{
      family:"'Saira Semi Condensed', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      brand:'12px',screen:'12px',section:'12px',body:'12px',button:'12px',caption:'12px'
    },
    spacing:{xs:'4px',sm:'8px',md:'12px',lg:'16px',xl:'20px',xxl:'24px',xxxl:'32px',huge:'40px'},
    radius:{sm:'8px',md:'12px',lg:'16px',xl:'20px',pill:'999px'},
    backgrounds:{
      home:'https://images.unsplash.com/photo-1709540233692-23b65e46ac80?auto=format&fit=crop&w=1200&q=68',
      modalities:'https://images.unsplash.com/photo-1631203935571-466cae74e641?auto=format&fit=crop&w=1200&q=68',
      practice:'https://images.unsplash.com/photo-1670251400844-26c200b75a0f?auto=format&fit=crop&w=1200&q=68'
    },
    materials:{photoFilter:'grayscale(1) saturate(.06) contrast(.90) brightness(.64)',photoBlur:'3px'}
  };
  window.academyTheme=theme;

  if(document.getElementById('academy-theme-tokens')) return;
  const style=document.createElement('style');
  style.id='academy-theme-tokens';
  style.textContent=`
    :root{
      --academy-bg:#070707;--academy-bg-2:#0C0C0C;--academy-bg-3:#151515;
      --academy-surface:#1A1A1A;--academy-surface-2:#202020;--academy-surface-3:#282828;
      --academy-graphite:#333333;--academy-graphite-2:#484848;
      --academy-silver:#7E7E7E;--academy-silver-2:#A5A5A5;--academy-silver-3:#B9B9B9;
      --academy-ivory:#F2EDE2;--academy-ivory-2:#F7F3EB;--academy-white:#FAF7F0;
      --academy-muted:#97938B;--academy-muted-2:#77736C;
      --academy-line:rgba(242,237,226,.10);--academy-line-strong:rgba(242,237,226,.18);
      --academy-success:#82917F;--academy-warning:#B39B72;--academy-danger:#956A66;
      --academy-font:'Saira Semi Condensed',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      --academy-space-1:4px;--academy-space-2:8px;--academy-space-3:12px;--academy-space-4:16px;
      --academy-space-5:20px;--academy-space-6:24px;--academy-space-7:32px;--academy-space-8:40px;
      --academy-radius-sm:8px;--academy-radius-md:12px;--academy-radius-lg:16px;--academy-radius-xl:20px;
      --academy-motion-fast:160ms;--academy-motion:220ms;--academy-shadow-soft:rgba(0,0,0,.22);--academy-shadow:rgba(0,0,0,.45);--academy-shadow-heavy:rgba(0,0,0,.70);
      --g:var(--academy-bg-2);--gd:var(--academy-bg);--gs:var(--academy-bg-3);--b:var(--academy-bg);--b2:var(--academy-bg-3);--c:var(--academy-ivory);--c2:var(--academy-ivory-2);--ink:var(--academy-bg-3);--m:var(--academy-muted-2);--gold:var(--academy-ivory);--gold2:var(--academy-silver-2);--w:var(--academy-white);
      --academy-green:var(--academy-bg-2);--academy-green-dark:var(--academy-bg);--academy-emerald:var(--academy-bg-3);--academy-gold:var(--academy-ivory);--academy-gold-dark:var(--academy-silver-2);--academy-parchment:var(--academy-ivory);--academy-parchment-2:var(--academy-ivory-2);--academy-brown:var(--academy-bg);--academy-brown-2:var(--academy-bg-3);--academy-ink:var(--academy-bg-3);
    }
    html,body,body *{font-family:var(--academy-font)!important}
    body{background:var(--academy-bg)!important;color:var(--academy-ivory)!important}
    button,a,input,select,textarea{font:inherit}
    button,[role="button"]{transition:transform var(--academy-motion-fast) ease,background-color var(--academy-motion) ease,border-color var(--academy-motion) ease,color var(--academy-motion) ease,opacity var(--academy-motion) ease}
    button:active,[role="button"]:active{transform:scale(.985)}
    *{min-width:0}
    img,svg,canvas,video{max-width:100%}
    :focus-visible{outline:2px solid var(--academy-ivory)!important;outline-offset:2px}
        #root .card,#root .block,#root .rrow,#root .detail-card,#root .m2-card,#root .p3-shell,#root .p3x-panel,#root .p3x-math-card,#root .p3m-group{box-shadow:none!important}
    #root .fi-option.fi-correct,#root .m2-option.correct,#root .p3-option.correct,#root .p3x-opt.correct{border-color:var(--academy-success)!important}
    #root .fi-option.fi-wrong,#root .m2-option.wrong,#root .p3-option.wrong,#root .p3x-opt.wrong{border-color:var(--academy-danger)!important}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}}
  `;
  document.head.appendChild(style);
})();