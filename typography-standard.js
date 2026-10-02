(() => {
  const STYLE_ID='stackup-typography-standard';
  if(document.getElementById(STYLE_ID))return;
  const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
    :root{--type-brand:12px;--type-screen:12px;--type-section:12px;--type-body:12px;--type-button:12px;--type-caption:12px}
    html,body,body *{font-family:'Saira Semi Condensed',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important}
    #root *, .brand *, .navtools *, .academy-bottom-nav *{font-size:12px!important}
    body,p,li,input,select,textarea,.academy-copy,.desc,.tnote,.lead{font-weight:400!important}
    button,strong,b,h1,h2,h3,h4,.name,.stitle,.ttitle,.rname,.academy-title,.academy-section-heading h2,.academy-row-copy strong,.academy-stage-card strong,.academy-continue h3,.academy-plan strong,.fi-head h3,.m2-head h3,.p3x-panel h3,.detail-card h3,.card.lesson>h2,.card.lesson h3,.compare h3{font-weight:600!important}
    h1,h2,h3,h4,.stitle,.ttitle,.rname,.academy-title,.academy-section-heading h2,.academy-row-copy strong,.academy-stage-card strong,.academy-continue h3,.academy-plan strong,.academy-group-title,.fi-head h3,.m2-head h3,.m2-card h3,.mg-card h3,.p3-head h3,.p3x-panel h3,.p3x-math-card h3,.p3-math-card h4,.detail-card h3,.card.lesson>h2,.card.lesson h3,.compare h3,.academy-shortcut{text-transform:uppercase!important}
    .rank,.suit,.fv-rank,.fv-suit{font-family:Arial,sans-serif!important}
    .academy-stage-card strong{white-space:nowrap!important;letter-spacing:0!important}
    h1,h2,h3,h4,p,li,button,span{overflow-wrap:break-word;word-break:normal}
  `;document.head.appendChild(s);
})();