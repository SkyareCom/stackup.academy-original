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
    .brandin>div{min-width:0}.brandin .logo[data-stackup-logo="1"]{width:62px!important;height:62px!important;max-width:62px!important;flex:0 0 62px!important;object-fit:contain!important;filter:grayscale(1) contrast(1.04)}
    .name{font-size:14px!important;line-height:1!important;font-weight:600!important;letter-spacing:.055em!important;color:var(--academy-ivory)!important;text-transform:uppercase}
    .sub{margin-top:5px!important;font-size:10px!important;line-height:1.25!important;font-weight:600!important;letter-spacing:.1em!important;color:var(--academy-silver-2)!important;text-transform:uppercase}
    .navtools{display:none;gap:8px;padding:9px 14px 0;background:var(--academy-bg)}.navtools.show{display:flex}
    .navbtn{flex:1;min-height:40px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface);color:var(--academy-ivory);font-size:12px;font-weight:600;text-transform:uppercase}
    .navicon{font-size:14px;line-height:1}.screen{padding:20px 16px calc(30px + env(safe-area-inset-bottom))}
    .list{display:grid;gap:10px}.card{width:100%;min-width:0}
    .card.stage,.card.topic{border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface);color:var(--academy-ivory);box-shadow:none}
    .card.stage{padding:17px;text-align:center}.card.topic{display:flex;align-items:center;gap:12px;padding:13px;text-align:left;min-height:76px}
    .kicker,.eyebrow,.badge{font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--academy-silver-2)}
    .stitle{font-size:14px;font-weight:600;line-height:1.06;text-transform:uppercase}.desc,.tnote,.head p,.lead{color:var(--academy-muted);font-size:12px;line-height:1.5}
    .foot{display:flex;justify-content:space-between;align-items:center;margin-top:13px;padding-top:10px;border-top:1px solid var(--academy-line);font-size:10px;color:var(--academy-muted);text-transform:uppercase}
    .arrow{color:var(--academy-silver);font-size:14px}.head{padding:2px 0 18px;border-bottom:1px solid var(--academy-line);margin-bottom:12px}.head h2{margin:4px 0 0;font-size:14px;line-height:1.06;color:var(--academy-ivory);text-transform:uppercase}
    .idx{width:38px;height:38px;flex:0 0 38px;border:1px solid var(--academy-line-strong);border-radius:50%;display:grid;place-items:center;color:var(--academy-silver-2);font-size:12px}
    .tcopy{flex:1;min-width:0}.ttitle{display:block;font-size:14px;line-height:1.18;color:var(--academy-ivory)}.tnote{display:block;margin-top:3px}
    .lesson{padding:0}.badge{display:inline-flex;border:1px solid var(--academy-line-strong);border-radius:999px;padding:6px 9px;margin-bottom:12px}
    .blocks,.ranking{display:grid;gap:0}.block,.detail-card{padding:16px 0;border-bottom:1px solid var(--academy-line);background:transparent}
    .block h3,.detail-card h3{margin:0 0 6px;font-size:14px;color:var(--academy-ivory)}.block p,.detail-card p{margin:0;font-size:12px;line-height:1.55;color:var(--academy-muted)}
    .hand,.fv-hand,.fv-cards,.board-cards{max-width:100%;flex-wrap:wrap}.pc{width:42px;height:58px;border-radius:7px;background:var(--academy-white);border:1px solid var(--academy-silver-3);display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--academy-bg-3)}.pc.red{color:var(--academy-danger)}
    .rank,.suit{font-family:Arial,sans-serif!important}.compare{margin-top:18px;padding:15px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface);color:var(--academy-ivory)}.ci{padding:11px 0;border-top:1px solid var(--academy-line)}.ci:first-of-type{border-top:0}
    button,input,select,textarea{max-width:100%}.fi-stats,.p3-progress{grid-template-columns:repeat(3,minmax(0,1fr))!important}
    .fi-stat-label,.fi-stat span,.p3-stat span{white-space:normal!important;overflow-wrap:break-word!important}
    @media(max-width:340px){.brand{padding-inline:12px}.brandin .logo[data-stackup-logo="1"]{width:56px!important;height:56px!important;max-width:56px!important;flex-basis:56px!important}.name{font-size:14px!important}.sub{font-size:10px!important}.screen{padding-inline:12px}.fi-stats,.p3-progress{grid-template-columns:repeat(3,minmax(0,1fr))!important}}
  `;document.head.appendChild(s);
})();