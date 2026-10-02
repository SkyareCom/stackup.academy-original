(() => {
  const STYLE_ID='stackup-typography-standard';
  if(document.getElementById(STYLE_ID)) return;

  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=String.raw\`
    :root{
      --type-display:clamp(32px,9.4vw,42px);
      --type-stage:clamp(28px,8vw,36px);
      --type-section:clamp(22px,6.5vw,27px);
      --type-card-title:clamp(18px,5.2vw,21px);
      --type-item-title:clamp(18px,5vw,20px);
      --type-question:clamp(15px,4.5vw,17px);
      --type-lead:clamp(14px,4.1vw,16px);
      --type-body:clamp(13px,3.9vw,15px);
      --type-small:clamp(11px,3.3vw,13px);
      --type-meta:clamp(10px,3vw,11px);
      --type-micro:10px;
      --type-display-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;
      --type-ui-family:'Inter',Arial,sans-serif;
      font-family:var(--type-ui-family)!important;
    }

    html,body,body *{font-family:var(--type-ui-family)!important}
    .navicon,.rank,.suit,.fv-rank,.fv-suit{font-family:Arial,sans-serif!important}

    .name,
    .intro h1,.stitle,.head h2,.card.lesson>h2,
    .ttitle,.rname,.compare h3{
      font-family:var(--type-display-family)!important;
      font-weight:700!important;
    }

    .name{font-size:clamp(21px,6.3vw,26px)!important}
    .sub{font-size:10px!important}
    .navbtn{font-size:11px!important}

    .intro h1{font-size:clamp(34px,10vw,46px)!important}
    .stitle{font-size:var(--type-stage)!important}
    .intro p,.head p,.desc{font-size:var(--type-body)!important;line-height:1.5!important}
    .kicker,.eyebrow,.badge,.foot{font-size:var(--type-meta)!important}
    .head h2,.card.lesson>h2{font-size:var(--type-display)!important}
    .ttitle,.rname{font-size:var(--type-item-title)!important}
    .tnote,.rnote{font-size:var(--type-small)!important;line-height:1.4!important}
    .idx{font-size:var(--type-small)!important}
    .lead{font-size:var(--type-lead)!important;line-height:1.55!important}

    .card.lesson{font-size:var(--type-body)!important}
    .card.lesson h3,.detail-card h3{font-size:var(--type-card-title)!important;line-height:1.18!important}
    .card.lesson h4{font-size:var(--type-question)!important;line-height:1.25!important}
    .card.lesson p,.card.lesson li,.detail-card p,.block p,.bet-sequence p,.strategy-example p,.ci p{
      font-size:var(--type-body)!important;line-height:1.55!important;
    }
    .ci strong{font-size:var(--type-question)!important}
    .street-chip strong,.action-chip strong{font-size:var(--type-lead)!important}
    .street-chip span,.action-chip span{font-size:var(--type-small)!important}
    .step-item{font-size:var(--type-body)!important;line-height:1.5!important}
    .step-num,.ct-tag,.profile-tag{font-size:var(--type-small)!important}

    .rank,.fv-rank{font-size:var(--type-lead)!important}
    .suit,.fv-suit{font-size:var(--type-question)!important}

    .fi-kicker{font-size:var(--type-meta)!important}
    .fi-head h3{font-size:var(--type-section)!important;line-height:1.1!important}
    .fi-head p{font-size:var(--type-small)!important;line-height:1.45!important}
    .fi-mode{font-size:var(--type-micro)!important}
    .fi-stat b,.fi-stat .fi-stat-value{font-size:var(--type-question)!important}
    .fi-stat span,.fi-stat small,.fi-stat .fi-stat-label{font-size:var(--type-micro)!important}
    .fi-spotbar span{font-size:var(--type-meta)!important}
    .fi-question{font-size:var(--type-question)!important;line-height:1.45!important}
    .fi-help,.fi-analysis,.fi-complete{font-size:var(--type-small)!important}
    .fi-option,.fi-result{font-size:var(--type-body)!important}
    .fi-btn,.fi-seqnum{font-size:var(--type-meta)!important}

    .fv-label,.fv-handtitle,.fv-seat,.fv-step,.fv-metric span{font-size:var(--type-micro)!important}
    .fv-empty{font-size:var(--type-small)!important}
    .fv-pill,.fv-value,.fv-formatline,.fv-scene p{font-size:var(--type-meta)!important}
    .fv-scene h4,.fv-name,.fv-format h4{font-size:var(--type-question)!important}
    .fv-metric b{font-size:var(--type-lead)!important}

    h1,h2,h3,h4,.name,.sub,.stitle,.ttitle,.rname,.lead,.desc,.tnote,.rnote,p,li,button,span{
      overflow-wrap:break-word;word-break:normal;
    }
  \`;
  document.head.appendChild(style);
})();