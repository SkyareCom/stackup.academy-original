(() => {
  const STYLE_ID='stackup-typography-standard';
  if(document.getElementById(STYLE_ID))return;
  const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
    :root{
      --type-brand:14px;--type-screen:14px;--type-section:14px;
      --type-body:12px;--type-button:12px;--type-caption:10px;
    }
    html,body,body *{font-family:'Saira Semi Condensed',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important}
    body,p,li,input,select,textarea{font-size:var(--type-body)!important;font-weight:400!important}
    button,.navbtn,.fi-btn,.m2-btn,.p3-btn,.p3x-btn{font-size:var(--type-button)!important;font-weight:600!important}
    h1,h2,h3,h4,.name,.stitle,.ttitle,.rname,.academy-title,.academy-section-heading h2,.academy-row-copy strong,.academy-stage-card strong,.academy-continue h3,.academy-plan strong,.fi-head h3,.m2-head h3,.p3x-panel h3,.detail-card h3,.card.lesson>h2,.card.lesson h3,.compare h3{
      font-size:var(--type-section)!important;font-weight:600!important;text-transform:uppercase!important;
    }
    .sub,.kicker,.eyebrow,.badge,.foot,.academy-kicker,.academy-section-heading span,.fi-kicker,.fi-mode,.fi-stat span,.fi-stat small,.m2-kicker,.m2-mode,.p3-meta,.p3x-kicker,.fv-label,.fv-seat{
      font-size:var(--type-caption)!important;font-weight:400!important;
    }
    strong,b{font-weight:600!important}
    .rank,.suit,.fv-rank,.fv-suit{font-family:Arial,sans-serif!important}
    .intro p,.head p,.desc,.tnote,.lead,.card.lesson p,.card.lesson li,.detail-card p,.block p,.ci p,.fi-question,.m2-question,.p3-q{font-size:var(--type-body)!important;font-weight:400!important}
    h1,h2,h3,h4,p,li,button,span{overflow-wrap:break-word;word-break:normal}
  `;document.head.appendChild(s);
})();