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
    button,input,select,textarea{max-width:100%}.fi-stats,.p3-progress{grid-template-columns:repeat(3,minmax(0,1fr))!important}
    .fi-stat-label,.fi-stat span,.p3-stat span{white-space:normal!important;overflow-wrap:break-word!important}
    @media(max-width:340px){.brand{padding-inline:12px}.brandin .logo[data-stackup-logo="1"]{width:56px!important;height:56px!important;max-width:56px!important;flex-basis:56px!important}.name{font-size:12px}.sub{font-size:12px}.screen{padding-inline:12px}.fi-stats,.p3-progress{grid-template-columns:repeat(3,minmax(0,1fr))!important}}
  `;document.head.appendChild(s);
})();
