(() => {
  const STYLE_ID='stackup-academy-visual-system';
  if(document.getElementById(STYLE_ID))return;
  const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
    html,body{margin:0;min-height:100%;width:100%;max-width:100%;overflow-x:hidden}
    *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
    body{background:var(--academy-bg);color:var(--academy-ivory)}
    .app{width:100%;max-width:560px;min-height:100dvh;margin:auto;background:var(--academy-bg);overflow-x:hidden}
    .brand{width:100%;padding:calc(14px + env(safe-area-inset-top)) 17px 13px;background:var(--academy-bg-2);border-bottom:1px solid var(--academy-line-strong)}
    .brandin{display:flex;align-items:center;gap:12px;min-width:0}
    .brandin>div{min-width:0}.brandin .logo[data-stackup-logo="1"]{width:62px!important;height:62px!important;max-width:62px!important;flex:0 0 62px!important;object-fit:contain!important;filter:drop-shadow(0 5px 10px rgba(0,0,0,.45))}
    .name{font-size:12px;line-height:1!important;font-weight:600!important;letter-spacing:.055em!important;color:var(--academy-ivory)!important;text-transform:uppercase}
    .sub{margin-top:5px!important;font-size:12px;line-height:1.25!important;font-weight:600!important;letter-spacing:.1em!important;color:var(--academy-silver-2)!important;text-transform:uppercase}
    .navtools{display:none;gap:12px;height:auto!important;min-height:0!important;max-height:none!important;margin:0!important;padding:12px 16px 16px!important;background:var(--academy-bg);align-items:flex-start;box-sizing:border-box}.navtools.show{display:flex!important}
    #root .academy-home,#root .academy-stage-screen,#root .academy-profile{padding-top:0!important}
#root .academy-home-hero,#root .academy-stage-intro,#root .academy-stage-intro.photo,#root .academy-profile-head{position:relative!important;height:176px!important;min-height:176px!important;max-height:176px!important;margin-top:0!important;margin-bottom:16px!important;padding-top:20px!important;padding-bottom:20px!important;box-sizing:border-box!important;border-bottom:1px solid var(--academy-line-strong)!important}
.navbtn{flex:1;min-height:40px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface);color:var(--academy-ivory);font-size:12px;font-weight:600;text-transform:uppercase;display:inline-flex;align-items:center;justify-content:center;gap:10px}
    .navicon{font-size:12px;line-height:1;display:inline-flex;align-items:center;justify-content:center;margin:0 2px}.screen{padding:16px 16px calc(32px + env(safe-area-inset-bottom))}
    .list{display:grid;gap:12px}.card{width:100%;min-width:0}
    .card.stage,.card.topic{border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface);color:var(--academy-ivory);box-shadow:none}
    .card.stage{padding:16px;text-align:center}.card.topic{display:flex;align-items:center;gap:12px;padding:16px 12px;text-align:left;min-height:72px}
    .kicker,.eyebrow,.badge{font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--academy-silver-2)}
    .stitle{font-size:12px;font-weight:600;line-height:1.06;text-transform:uppercase}.desc,.tnote,.head p,.lead{color:var(--academy-muted);font-size:12px;line-height:1.5}
    .foot{display:flex;justify-content:space-between;align-items:center;margin-top:13px;padding-top:10px;border-top:1px solid var(--academy-line);font-size:12px;color:var(--academy-muted);text-transform:uppercase}
    .arrow{color:var(--academy-silver);font-size:12px}.head{padding:16px 0;border-bottom:1px solid var(--academy-line);margin-bottom:16px}.head h2{margin:4px 0 0;font-size:12px;line-height:1.06;color:var(--academy-ivory);text-transform:uppercase}
    .idx{width:38px;height:38px;flex:0 0 38px;border:1px solid var(--academy-line-strong);border-radius:50%;display:grid;place-items:center;color:var(--academy-silver-2);font-size:12px}
    .tcopy{flex:1;min-width:0}.ttitle{display:block;font-size:12px;line-height:1.18;color:var(--academy-ivory)}.tnote{display:block;margin-top:3px}
    .lesson{padding:0}.badge{display:inline-flex;border:1px solid var(--academy-line-strong);border-radius:999px;padding:8px 10px;margin-bottom:12px}
    .blocks,.ranking{display:grid;gap:0}.block,.detail-card{padding:16px 0;border-bottom:1px solid var(--academy-line);background:transparent}
    .block h3,.detail-card h3{margin:0 0 6px;font-size:12px;color:var(--academy-ivory)}.block p,.detail-card p{margin:0;font-size:12px;line-height:1.55;color:var(--academy-muted)}
    .hand,.fv-hand,.fv-cards,.board-cards{max-width:100%;flex-wrap:wrap}.pc{width:42px;height:58px;border-radius:7px;background:var(--academy-white);border:1px solid var(--academy-silver-3);display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--academy-bg-3)}.pc.red{color:var(--academy-danger)}
    .ranking{display:grid!important;gap:10px!important}
    .ranking .rrow{
      display:grid!important;
      grid-template-columns:max-content minmax(0,1fr)!important;
      grid-template-rows:auto auto!important;
      column-gap:8px!important;
      row-gap:7px!important;
      align-items:center!important;
      padding:11px 12px!important;
      border:1px solid var(--academy-line-strong)!important;
      border-radius:16px!important;
      background:var(--academy-surface)!important;
      overflow:hidden!important;
    }
    .ranking .rhead{
      grid-column:1!important;
      grid-row:1!important;
      display:flex!important;
      align-items:center!important;
      gap:5px!important;
      margin:0!important;
      white-space:nowrap!important;
    }
    .ranking .rhead:after{content:'—';margin-left:2px;color:var(--academy-muted)!important}
    .ranking .rpos{display:inline-block!important;flex:0 0 auto!important;color:var(--academy-muted)!important}
    .ranking .rname{display:inline-block!important;color:var(--academy-ivory)!important;white-space:nowrap!important}
    .ranking .hand{
      grid-column:2!important;
      grid-row:1!important;
      display:flex!important;
      flex-direction:row!important;
      flex-wrap:nowrap!important;
      align-items:center!important;
      justify-content:flex-end!important;
      gap:4px!important;
      width:100%!important;
      min-width:0!important;
      max-width:100%!important;
      overflow:hidden!important;
      padding:0!important;
    }
    .ranking .hand .pc{
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
      flex-direction:column!important;
      align-items:center!important;
      justify-content:center!important;
    }
    .ranking .rnote{
      grid-column:1 / -1!important;
      grid-row:2!important;
      display:block!important;
      margin:0!important;
      color:var(--academy-muted)!important;
      line-height:1.4!important;
    }
    @media(max-width:390px){
      .ranking .rrow{column-gap:6px!important;padding:10px!important}
      .ranking .rhead{gap:4px!important}
      .ranking .hand{gap:3px!important}
      .ranking .hand .pc{flex-basis:31px!important;width:31px!important;min-width:31px!important;max-width:31px!important;height:44px!important;min-height:44px!important;max-height:44px!important}
    }
    .rank,.suit{font-family:Arial,sans-serif!important}.compare{margin-top:20px;padding:16px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface);color:var(--academy-ivory)}.ci{padding:12px 0;border-top:1px solid var(--academy-line)}.ci:first-of-type{border-top:0}
    #navtools + #root>.academy-home,#navtools + #root>.academy-stage-screen,#navtools + #root>.academy-profile{margin-top:0!important;padding-top:0!important}
    #root>.academy-home>.academy-photo-bg:first-child,#root>.academy-stage-screen>.academy-stage-intro,#root>.academy-profile>.academy-profile-head{height:176px!important;min-height:176px!important;max-height:176px!important;margin-top:0!important;border-bottom:1px solid var(--academy-line-strong)!important;box-sizing:border-box!important}
    /* v181: action strip ends immediately before hero; profile follows photo treatment */
    #navtools.show{height:auto!important;min-height:0!important;max-height:none!important}
    #root .academy-profile-head{filter:grayscale(1)!important}
    /* v179: single geometry source for every blurred hero */
    :root{--academy-hero-h:176px;--academy-hero-pad-y:20px;--academy-hero-text-h:135px}
    #root .academy-home-hero,#root .academy-stage-intro,#root .academy-stage-intro.photo,#root .academy-profile-head{
      height:var(--academy-hero-h)!important;min-height:var(--academy-hero-h)!important;max-height:var(--academy-hero-h)!important;
      margin:0 -16px 16px!important;padding:var(--academy-hero-pad-y) 16px!important;
      display:block!important;overflow:hidden!important;box-sizing:border-box!important;
      border:0!important;border-bottom:1px solid var(--academy-line-strong)!important
    }
    #root .academy-home-hero>.academy-photo{height:calc(var(--academy-hero-h) + 16px)!important}
    #root .academy-stage-intro>.academy-photo{height:calc(var(--academy-hero-h) + 16px)!important}
    #root .academy-home-hero .academy-hero-content,#root .academy-stage-hero-grid,#root .academy-profile-hero-grid{
      height:var(--academy-hero-text-h)!important;min-height:var(--academy-hero-text-h)!important;max-height:var(--academy-hero-text-h)!important;
      display:grid!important;grid-template-rows:18px 18px 54px!important;row-gap:6px!important;align-content:end!important;width:100%!important;max-width:430px!important
    }
    #root .academy-home-hero .academy-kicker,#root .academy-stage-hero-grid .academy-kicker,#root .academy-profile-hero-grid .academy-kicker{margin:0!important;align-self:end!important}
    #root .academy-home-hero .academy-title,#root .academy-stage-hero-grid .academy-title,#root .academy-profile-hero-grid .academy-title{margin:0!important;align-self:end!important}
    #root .academy-home-hero .academy-copy,#root .academy-stage-hero-grid .academy-copy,#root .academy-profile-hero-grid .academy-copy{margin:0!important;align-self:start!important;line-height:1.5!important;max-height:54px!important;overflow:hidden!important}
    /* v182 audit hardening */
    #root,#root .screen,#root section,#root div{min-width:0}
    #root img{max-width:100%}
    #root .academy-course-section,#root .academy-group,#root .academy-study-card,#root .academy-history-row,#root .academy-history-draft,#root .academy-certificate,#root .academy-skill-row,#root .academy-coach-box,#root .academy-plan,#root .academy-addon,#root .academy-app-card{overflow:hidden;overflow-wrap:anywhere}
    #root .academy-stage-card,#root .academy-practice-card,#root .academy-secondary,#root .academy-primary,#root .academy-lesson-row{overflow:hidden;overflow-wrap:anywhere}
    #root .academy-stage-card,#root .academy-practice-card,#root .academy-study-card,#root .academy-history-row,#root .academy-plan,#root .academy-addon,#root .academy-app-card{background:var(--academy-surface-2)!important;border:1px solid var(--academy-line-strong)!important}
    #root .academy-app-card{min-height:72px}
    /* v183: unified gold card system + legacy lesson integration */
    :root{--academy-card-border:var(--academy-line-strong)}
    #root .academy-row,#root .card.stage,#root .card.topic,#root .card.lesson,#root .block,#root .detail-card,#root .m2-card,#root .m2-depth-card,#root .academy-stage-card,#root .academy-practice-card,#root .academy-study-card,#root .academy-history-row,#root .academy-history-draft,#root .academy-certificate,#root .academy-skill-row,#root .academy-coach-box,#root .academy-plan,#root .academy-addon,#root .academy-app-card,#root .academy-weekly,#root .academy-state,#root .compare{
      border:1px solid var(--academy-card-border)!important;border-radius:var(--academy-radius-md)!important
    }
    #root .academy-row{margin:0 0 10px!important;padding:14px 12px!important;background:var(--academy-surface)!important}
    #root .academy-group-list{border:0!important}
    #root .block,#root .detail-card,#root .m2-card,#root .m2-depth-card{padding:15px 16px!important;margin-bottom:10px!important;background:var(--academy-surface)!important;color:var(--academy-ivory)!important}
    #root .block h3,#root .detail-card h3,#root .m2-card h3,#root .m2-depth-card h3{color:var(--academy-ivory)!important}
    #root .block p,#root .detail-card p,#root .m2-card p,#root .m2-depth-card p{color:var(--academy-muted)!important}
    #root .card.lesson{background:transparent!important;border:0!important;border-radius:0!important;padding:0!important}
    #root .card.lesson>.badge{border:1px solid var(--academy-card-border)!important;border-radius:var(--academy-radius-md)!important}
    button,input,select,textarea{max-width:100%}.fi-stats,.p3-progress{grid-template-columns:repeat(3,minmax(0,1fr))!important}
    .fi-stat-label,.fi-stat span,.p3-stat span{white-space:normal!important;overflow-wrap:break-word!important}
    @media(max-width:340px){.brand{padding-inline:12px}.brandin .logo[data-stackup-logo="1"]{width:56px!important;height:56px!important;max-width:56px!important;flex-basis:56px!important}.name{font-size:12px}.sub{font-size:12px}.screen{padding-inline:12px}.fi-stats,.p3-progress{grid-template-columns:repeat(3,minmax(0,1fr))!important}}
  `;document.head.appendChild(s);
})();


/* v184 — full visual audit: one border token + safe fixed-nav geometry */
(() => {
  const id='stackup-academy-audit-v184';
  if(document.getElementById(id))return;
  const s=document.createElement('style');s.id=id;s.textContent=`
    :root{
      --academy-card-border-color:rgba(217,170,87,.24);
      --academy-card-border:var(--academy-card-border-color);
      --academy-bottom-nav-h:58px;
      --academy-content-safe-bottom:calc(var(--academy-bottom-nav-h) + env(safe-area-inset-bottom) + 28px);
    }

    /* Every semantic card uses exactly the same border colour. */
    #root :is(
      .card,.academy-row,.academy-stage-card,.academy-practice-card,.academy-study-card,
      .academy-history-row,.academy-history-draft,.academy-certificate,.academy-skill-row,
      .academy-coach-box,.academy-plan,.academy-addon,.academy-app-card,.academy-weekly,
      .academy-state,.compare,.rrow,.block,.detail-card,.m2-card,.m2-depth-card,
      .academy-group-card,.academy-tool-card,.academy-profile-card,.academy-access-card,
      .academy-language-card,.academy-stat-card,.academy-exam-card,.academy-review-card,
      .academy-question-card,.academy-result-card,.academy-summary-card,.academy-progress-card,
      .fi-card,.p3-card
    ){
      border-color:var(--academy-card-border-color)!important;
    }

    /* Lists and separators are not allowed to fake a second card-border colour. */
    #root :is(.academy-group-list,.blocks,.ranking){border-color:transparent!important}

    /* Fixed footer must never cover the final card/title/control. */
    .app{padding-bottom:0!important}
    #root>.screen,
    #root>.academy-home,
    #root>.academy-stage-screen,
    #root>.academy-profile,
    #root>.academy-practice-screen,
    #root>.academy-study-screen{
      padding-bottom:var(--academy-content-safe-bottom)!important;
    }
    #root .academy-course-section:last-child,
    #root .academy-group:last-child,
    #root .academy-study-grid:last-child,
    #root .academy-profile-section:last-child,
    #root .list:last-child{margin-bottom:18px!important}

    /* Shared card geometry/alignment. */
    #root :is(.academy-row,.card.topic,.academy-stage-card,.academy-practice-card,.academy-study-card,
      .academy-history-row,.academy-plan,.academy-addon,.academy-app-card){
      min-width:0!important;max-width:100%!important;box-sizing:border-box!important;
    }
    #root :is(.academy-row,.card.topic){display:grid!important;grid-template-columns:42px minmax(0,1fr) 14px!important;align-items:center!important;column-gap:12px!important}
    #root :is(.academy-row,.card.topic) :is(.idx,.academy-row-index){grid-column:1!important}
    #root :is(.academy-row,.card.topic) :is(.tcopy,.academy-row-copy){grid-column:2!important;min-width:0!important}
    #root :is(.academy-row,.card.topic) .arrow{grid-column:3!important;justify-self:end!important}

    /* Heroes share one height, crop and darkness. */
    #root :is(.academy-home-hero,.academy-stage-intro,.academy-stage-intro.photo,.academy-profile-head){
      height:var(--academy-hero-h)!important;min-height:var(--academy-hero-h)!important;max-height:var(--academy-hero-h)!important;
      overflow:hidden!important;
    }
    #root :is(.academy-home-hero,.academy-stage-intro,.academy-profile-head) .academy-photo{
      width:100%!important;object-fit:cover!important;filter:grayscale(1) brightness(.42) blur(1.5px)!important;
    }

    /* Prevent clipping/overflow throughout the app. */
    #root :is(h1,h2,h3,h4,p,span,strong,small,button){max-width:100%}
    #root :is(.academy-copy,.tnote,.desc,.lead,.academy-row-copy,.academy-study-card,.academy-profile){
      overflow-wrap:anywhere!important;word-break:normal!important;
    }
    #root button{min-width:0}
    #root .academy-grid,#root .academy-study-grid,#root .academy-practice-grid{min-width:0!important;max-width:100%!important}

    @media(max-width:390px){
      #root :is(.academy-row,.card.topic){grid-template-columns:36px minmax(0,1fr) 12px!important;column-gap:9px!important}
    }
  `;document.head.appendChild(s);
})();


/* v185 — audit sweep: legacy cards, controls, grids and footer collision */
(() => {
 const id='stackup-academy-audit-v185';if(document.getElementById(id))return;
 const s=document.createElement('style');s.id=id;s.textContent=`
  /* Global card border contract. Status/answer outlines remain semantic, not card chrome. */
  #root :is(
   .tp-card,.term,.profile,.axis>div,.detail-note,.street-chip,.action-chip,.step-item,
   .ct-card,.ct-note,.ct-alert,.ct-mini,.etq-card,.etq-note,.etq-alert,.etq-mini,.penalty,
   .rule-card,.rule-note,.rule-alert,.rule-step,.staff-card,.rules-card,.rules-note,.rules-alert,.rules-step,
   .strategy-item,.strategy-summary,.positions-lesson-key .dealer-info,.position-key .dealer-info,
   .academy-continue,.academy-cross-sell,.academy-shortcut,.academy-access-feedback,
   .fi-shell,.fi-question,.fi-option,.fi-spot,.fi-spotbar,.fi-feedback,
   .m2-shell,.m2-card,.m2-option,.m2-spot,.m2-spotbar,.m2-feedback,.mg-shell,.mg-card,.mg-option,
   .p3-shell,.p3-panel,.p3-option,.p3-math-card,.p3x-panel,.p3x-opt,.p3x-math-card,.p3m-group,
   .p3x-quiz-banner,.p3x-hand,.p3x-filter-btn,.p3x-badge,.p3-input
  ){border-color:var(--academy-card-border-color)!important}

  /* Never mutate card border colour on hover/current/active; selection is expressed by fill/text. */
  #root :is(.academy-stage-card,.academy-plan,.academy-app-card,.academy-practice-card,.academy-study-card):hover,
  #root .academy-plan.current{border-color:var(--academy-card-border-color)!important}
  #root :is(.academy-stage-card,.academy-practice-card,.academy-study-card,.academy-shortcut):active{
   background:var(--academy-surface-3)!important
  }

  /* Uniform vertical rhythm and no accidental viewport overflow. */
  #root .screen{width:100%!important;max-width:100%!important;overflow-x:hidden!important}
  #root :is(.academy-home-section,.academy-profile-section,.academy-group){width:100%!important;max-width:100%!important}
  #root :is(.academy-plan-grid,.academy-apps-grid,.academy-study-grid,.academy-practice-grid,.list){width:100%!important;max-width:100%!important}
  #root :is(.academy-plan-grid,.academy-apps-grid,.academy-study-grid,.list)>*{min-width:0!important;max-width:100%!important}

  /* Fixed navigation is the final visual layer but content always clears it. */
  .academy-bottom-nav{height:calc(var(--academy-bottom-nav-h) + env(safe-area-inset-bottom))!important}
  #root{min-height:calc(100dvh - var(--academy-bottom-nav-h) - env(safe-area-inset-bottom))!important}
  #root>.screen{padding-bottom:var(--academy-content-safe-bottom)!important}

  /* Profile hero must obey the same monochrome/blur treatment as all other section heroes. */
  #root .academy-profile-head{filter:none!important}
  #root .academy-profile-head .academy-photo,
  #root .academy-stage-intro .academy-photo,
  #root .academy-home-hero .academy-photo{
   filter:grayscale(1) saturate(.05) brightness(.42) blur(1.5px)!important;
   transform:scale(1.035)!important
  }

  /* Preserve readable controls on narrow Android viewports. */
  @media(max-width:360px){
   #root :is(.academy-plan-top,.academy-section-heading){gap:8px!important}
   #root :is(.academy-plan-top,.academy-section-heading)>*{min-width:0!important}
   #root .academy-lang-toggle{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  }
 `;document.head.appendChild(s);
})();


/* v186 — deep module sweep: legacy learning/practice surfaces */
(() => {
 const id='stackup-academy-audit-v186';if(document.getElementById(id))return;
 const s=document.createElement('style');s.id=id;s.textContent=`
  /* Source modules now own their card borders. Keep this layer limited to
     known interactive answer controls so rows, shells and structural panels
     are not accidentally restyled by class-name heuristics. */
  #root :is(.fi-option,.m2-option,.mg-option,.p3-option,.p3x-opt){
   border-color:var(--academy-card-border-color)!important
  }

  /* Training answer states use fill/icon/text, never a different card outline. */
  #root :is(.fi-option,.m2-option,.mg-option,.p3-option,.p3x-opt).correct,
  #root :is(.fi-option,.m2-option,.mg-option,.p3-option,.p3x-opt).fi-correct{
   border-color:var(--academy-card-border-color)!important;
   box-shadow:inset 4px 0 0 var(--academy-success)!important
  }
  #root :is(.fi-option,.m2-option,.mg-option,.p3-option,.p3x-opt).wrong,
  #root :is(.fi-option,.m2-option,.mg-option,.p3-option,.p3x-opt).fi-wrong{
   border-color:var(--academy-card-border-color)!important;
   box-shadow:inset 4px 0 0 var(--academy-danger)!important
  }

  /* Tables/game areas remain special graphics; surrounding cards stay within viewport. */
  #root :is(.fi-shell,.m2-shell,.mg-shell,.p3-shell,.p3x-shell,.academy-training-shell){
   width:100%!important;max-width:100%!important;overflow-x:hidden!important
  }
  #root :is(.fi-options,.m2-options,.mg-options,.p3-options,.p3x-options){
   width:100%!important;max-width:100%!important
  }
  #root :is(.fi-option,.m2-option,.mg-option,.p3-option,.p3x-opt){
   width:100%!important;max-width:100%!important;white-space:normal!important;overflow-wrap:anywhere!important
  }

  /* No fixed auxiliary action bar may sit underneath the main bottom navigation. */
  #root :is(.training-save-bar,.academy-training-save-bar,.academy-save-bar){
   bottom:calc(var(--academy-bottom-nav-h) + env(safe-area-inset-bottom))!important;
   max-width:560px!important
  }
 `;document.head.appendChild(s);
})();
