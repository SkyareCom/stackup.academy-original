(() => {
  const STYLE_ID='stackup-typography-standard';
  if(document.getElementById(STYLE_ID))return;
  const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
    :root{
      --type-brand:clamp(16px,5vw,20px);--type-screen:clamp(18px,5.8vw,22px);--type-section:clamp(14px,4.6vw,18px);
      --type-body:clamp(12px,3.9vw,14px);--type-button:clamp(11px,3.6vw,14px);--type-caption:clamp(9px,3vw,11px);
    }
    html,body,body *{font-family:'Saira Semi Condensed',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important}
    .rank,.suit,.fv-rank,.fv-suit{font-family:Arial,sans-serif!important}
    .name{font-size:var(--type-brand)!important}.sub,.kicker,.eyebrow,.badge,.foot{font-size:var(--type-caption)!important}
    .head h2,.card.lesson>h2{font-size:var(--type-screen)!important;line-height:1.08!important}
    .stitle,.fi-head h3,.m2-head h3,.p3x-panel h3{font-size:var(--type-section)!important}
    .ttitle,.rname,.card.lesson h3,.detail-card h3{font-size:var(--type-section)!important}
    .intro p,.head p,.desc,.tnote,.lead,.card.lesson p,.card.lesson li,.detail-card p,.block p,.ci p,.fi-question,.m2-question,.p3-q{font-size:var(--type-body)!important}
    button,.navbtn,.fi-btn,.m2-btn,.p3-btn,.p3x-btn{font-size:var(--type-button)!important}
    .fi-kicker,.fi-mode,.fi-stat span,.fi-stat small,.m2-kicker,.m2-mode,.p3-meta,.p3x-kicker,.fv-label,.fv-seat{font-size:var(--type-caption)!important}
    h1,h2,h3,h4,p,li,button,span{overflow-wrap:break-word;word-break:normal}
  `;document.head.appendChild(s);
})();