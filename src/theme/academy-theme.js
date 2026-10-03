(() => {
  const theme={
    colors:{
      background:{primary:'#070707',secondary:'#0C0C0C',tertiary:'#151515'},
      surfaces:{one:'#1A1A1A',two:'#202020',three:'#282828'},
      concrete:{one:'#242424',two:'#2B2B2B',three:'#313131'},
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
      base:'https://images.unsplash.com/photo-1709540233692-23b65e46ac80?auto=format&fit=crop&w=1200&q=68',
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
      --academy-surface:#1A1A1A;--academy-surface-2:#202020;--academy-surface-3:#282828;--academy-concrete:#242424;--academy-concrete-2:#2B2B2B;--academy-concrete-3:#313131;
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
      --academy-layout-x:16px;--academy-section-gap:20px;--academy-control-gap:12px;--academy-panel-pad:16px;
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
    #root .fi-shell,#root .fi-question,#root .fi-option,#root .m2-shell,#root .m2-card,#root .m2-option,#root .mg-shell,#root .mg-card,#root .mg-option,#root .p3-shell,#root .p3-panel,#root .p3-option,#root .p3-math-card,#root .p3x-panel,#root .p3x-opt,#root .p3x-math-card,#root .p3m-group{
      background:var(--academy-surface)!important;color:var(--academy-ivory)!important;border-color:var(--academy-line-strong)!important;
    }
    #root .fi-question,#root .m2-question,#root .mg-question,#root .p3-q,#root .p3x-question,#root .p3x-panel p,#root .p3x-math-card p{color:var(--academy-ivory)!important}
    #root .fi-option,#root .m2-option,#root .mg-option,#root .p3-option,#root .p3x-opt{min-height:48px!important}
    #root .fi-option:disabled,#root .m2-option:disabled,#root .mg-option:disabled,#root .p3-option:disabled,#root .p3x-opt:disabled{opacity:.72}
    #root .fi-option.fi-correct,#root .m2-option.correct,#root .p3-option.correct,#root .p3x-opt.correct{background:var(--academy-surface-2)!important}
    #root .fi-option.fi-wrong,#root .m2-option.wrong,#root .p3-option.wrong,#root .p3x-opt.wrong{background:var(--academy-surface-2)!important}
    #root .fi-spot,#root .fi-spotbar,#root .fi-feedback,#root .m2-spot,#root .m2-spotbar,#root .m2-feedback,#root .p3x-quiz-banner,#root .p3x-hand,#root .p3x-filter-btn,#root .p3x-badge,#root .p3-math-card,#root .p3-input{
      background:var(--academy-surface)!important;color:var(--academy-ivory)!important;border-color:var(--academy-line-strong)!important;
    }
    #root .p3x-quiz-banner{background:var(--academy-surface-2)!important}
    #root .p3x-hand strong,#root .fi-question,#root .fi-analysis,#root .fi-analysis strong,#root .m2-question,#root .m2-analysis,#root .m2-analysis strong,#root .p3-q,#root .p3-output,#root .p3-note,#root .p3-math-card h4,#root .p3x-panel h3,#root .p3x-question,#root .p3x-math-card h3,#root .p3x-tip{color:var(--academy-ivory)!important}
    #root .fi-options,#root .m2-options,#root .p3-options,#root .p3x-options{gap:10px!important}
    #root .fi-nav,#root .m2-nav,#root .p3-actions,#root .p3x-nav{gap:10px!important;margin-top:12px!important}
    #root input:not([type="checkbox"]):not([type="radio"]),#root select,#root textarea{min-height:44px;padding:10px 12px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface)!important;color:var(--academy-ivory)!important}
    #root .academy-profile-section,#root .academy-home-section,#root .academy-group{scroll-margin-top:96px}
    #root .screen{padding-left:var(--academy-layout-x)!important;padding-right:var(--academy-layout-x)!important}
    #root .academy-home-section,#root .academy-profile-section{padding-top:var(--academy-section-gap)!important}
    #root .academy-group{margin-top:var(--academy-section-gap)!important}
    #root .academy-plan-grid,#root .academy-lang-toggle,#root .p3x-math-grid,#root .m2-grid{gap:var(--academy-control-gap)!important}
    #root .academy-plan,#root .academy-addon,#root .academy-cross-sell,#root .p3x-panel,#root .p3-shell,#root .p3-math-card,#root .p3x-math-card{padding:var(--academy-panel-pad)!important}
    #root .fi-shell,#root .m2-training,#root .p3-shell,#root .p3x-shell{margin-top:var(--academy-section-gap)!important}
    #root .fi-head,#root .m2-head{padding:var(--academy-panel-pad)!important}
    #root .fi-body,#root .m2-body{padding:var(--academy-panel-pad)!important}
    #root .fi-stats,#root .m2-stats,#root .p3-progress,#root .p3x-counter{margin:12px 16px!important}
    #root .academy-row-copy,#root .academy-plan,#root .academy-addon,#root .academy-cross-sell,#root .block,#root .detail-card{text-align:left!important}
    #root .academy-section-heading,#root .academy-plan-top,#root .academy-metric-row{align-items:flex-start!important}
    #root .academy-stage-card{text-align:center!important}

    /* Premium content guard: legacy educational modules must never reintroduce light panels. */
    #root .detail-card,#root .detail-note,#root .street-chip,#root .action-chip,#root .step-item,
    #root .ct-card,#root .ct-note,#root .ct-alert,#root .ct-mini,
    #root .etq-card,#root .etq-note,#root .etq-alert,#root .etq-mini,#root .penalty,
    #root .rule-card,#root .rule-note,#root .rule-alert,#root .rule-step,#root .staff-card,
    #root .rules-card,#root .rules-note,#root .rules-alert,#root .rules-step,
    #root .tp-card,#root .tp-note,#root .term,#root .profile,#root .axis>div,
    #root .strategy-item,#root .strategy-summary,#root .m2-depth-card,
    #root .positions-lesson-key .dealer-info,#root .position-key .dealer-info{
      background:var(--academy-concrete)!important;
      border-color:#3A3A3A!important;
      color:var(--academy-ivory)!important;
      box-shadow:none!important;
    }
    #root .term,#root .profile,#root .axis>div,#root .street-chip,#root .action-chip,#root .ct-mini,#root .etq-mini,#root .staff-card{
      background:var(--academy-concrete-2)!important;
      border-color:#3A3A3A!important;
    }
    #root .detail-card h3,#root .street-chip strong,#root .action-chip strong,#root .step-item strong,
    #root .ct-card h3,#root .ct-card strong,#root .ct-mini strong,
    #root .etq-card h3,#root .etq-card strong,#root .etq-mini strong,#root .penalty strong,
    #root .rule-card h3,#root .rule-card strong,#root .rule-step strong,#root .staff-card h3,#root .staff-card strong,
    #root .rules-card h3,#root .rules-card strong,#root .rules-step strong,
    #root .tp-card h3,#root .tp-card strong,#root .term strong,#root .profile strong,#root .axis b,
    #root .strategy-item h4,#root .strategy-item b,#root .strategy-summary strong,#root .m2-depth-card h3{
      color:var(--academy-ivory)!important;
    }
    #root .detail-card p,#root .street-chip span,#root .action-chip span,#root .step-item,
    #root .ct-card p,#root .ct-mini span,#root .etq-card p,#root .etq-mini span,#root .penalty,
    #root .rule-card p,#root .rule-step,#root .staff-card p,#root .rules-card p,#root .rules-step,
    #root .tp-card p,#root .term span,#root .profile span,#root .axis>div,
    #root .strategy-item p,#root .strategy-summary,#root .m2-depth-card p{
      color:var(--academy-silver-3)!important;
    }

    /* Premium ranking: hand name and five cards share one compact row. */
    #root .ranking{display:grid!important;gap:10px!important}
    #root .ranking .rrow{
      display:grid!important;
      grid-template-columns:max-content minmax(0,1fr)!important;
      grid-template-rows:auto auto!important;
      column-gap:8px!important;
      row-gap:7px!important;
      align-items:center!important;
      padding:11px 12px!important;
      border:1px solid var(--academy-line-strong)!important;
      border-radius:var(--academy-radius-lg)!important;
      background:var(--academy-surface)!important;
      overflow:hidden!important;
    }
    #root .ranking .rhead{grid-column:1!important;grid-row:1!important;display:flex!important;align-items:center!important;gap:5px!important;margin:0!important;white-space:nowrap!important}
    #root .ranking .rhead:after{content:'—';margin-left:2px;color:var(--academy-muted)!important}
    #root .ranking .rpos{color:var(--academy-muted)!important;flex:none!important}
    #root .ranking .rname{color:var(--academy-ivory)!important;white-space:nowrap!important}
    #root .ranking .hand{
      grid-column:2!important;
      grid-row:1!important;
      display:flex!important;
      flex-direction:row!important;
      flex-wrap:nowrap!important;
      align-items:center!important;
      justify-content:flex-start!important;
      gap:4px!important;
      width:100%!important;
      min-width:0!important;
      overflow:hidden!important;
      padding:0!important;
    }
    #root .ranking .pc{
      display:flex!important;
      flex:0 0 34px!important;
      width:34px!important;
      min-width:34px!important;
      max-width:34px!important;
      height:48px!important;
      min-height:48px!important;
      max-height:48px!important;
      margin:0!important;
      border-radius:7px!important;
      background:var(--academy-ivory-2)!important;
      border:1px solid var(--academy-silver-3)!important;
      color:var(--academy-bg-3)!important;
      align-items:center!important;
      justify-content:center!important;
      flex-direction:column!important;
      box-shadow:0 3px 8px var(--academy-shadow)!important;
    }
    #root .ranking .pc.red{color:var(--academy-danger)!important}
    #root .ranking .rnote{grid-column:1/-1!important;grid-row:2!important;margin:0!important;color:var(--academy-muted)!important;line-height:1.4!important}
    @media(max-width:390px){
      #root .ranking .rrow{column-gap:6px!important;padding:10px!important}
      #root .ranking .hand{gap:3px!important}
      #root .ranking .pc{flex-basis:31px!important;width:31px!important;min-width:31px!important;max-width:31px!important;height:44px!important;min-height:44px!important;max-height:44px!important}
    }

    /* Premium actions: avoid light/sage filled buttons inside training modules. */
    #root .fi-btn.primary,#root .m2-btn.primary,#root .p3-btn.primary,#root .p3x-btn.primary{
      background:var(--academy-surface-3)!important;
      color:var(--academy-ivory)!important;
      border-color:var(--academy-graphite-2)!important;
      box-shadow:none!important;
    }
    #root .fi-result.ok,#root .fi-complete{
      background:var(--academy-surface-3)!important;
      color:var(--academy-ivory)!important;
      border:1px solid var(--academy-success)!important;
    }
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}}
  `;
  document.head.appendChild(style);
})();