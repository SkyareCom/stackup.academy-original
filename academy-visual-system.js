(() => {
  const STYLE_ID='stackup-academy-visual-system';
  if(document.getElementById(STYLE_ID))return;

  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    :root{
      --academy-green:#0c0c0c;
      --academy-green-dark:#070707;
      --academy-emerald:#151515;
      --academy-gold:#d8d0bf;
      --academy-gold-dark:#8f8f8f;
      --academy-parchment:#f3eee4;
      --academy-parchment-2:#e6dfd3;
      --academy-brown:#070707;
      --academy-brown-2:#151515;
      --academy-ink:#151515;
      --academy-muted:#676767;
      --academy-card-bg:linear-gradient(180deg,#202020 0%,#1a1a1a 100%);
      --academy-card-bg-soft:linear-gradient(180deg,#f3eee4 0%,#e6dfd3 100%);
      --academy-card-border:#484848;
      --academy-card-border-soft:#bdb5a633;
      --academy-card-border-width:1.5px;
      --academy-card-radius:24px;
      --academy-card-shadow:0 12px 32px #00000038;
      --academy-card-gap:14px;
      --academy-card-padding:18px;
      --academy-index-size:48px;
      --academy-arrow-size:24px;
    }

    html,
    body{
      width:100%!important;
      max-width:100%!important;
      overflow-x:hidden!important;
      background:var(--academy-brown)!important;
    }

    body{
      min-width:0!important;
    }

    .app,
    #root,
    #root .screen,
    #root .list,
    #root .blocks,
    #root .ranking,
    #root .head,
    #root .intro,
    #root .card,
    #root .block,
    #root .rrow,
    #root .detail-card,
    #root .p3-shell,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group,
    #root .fi-spot{
      min-width:0!important;
      max-width:100%!important;
      box-sizing:border-box!important;
    }

    .app{
      width:100%!important;
      overflow-x:hidden!important;
      background:var(--academy-brown)!important;
    }

    .brand{
      width:100%!important;
      max-width:100%!important;
      min-width:0!important;
      overflow:visible!important;
      background:linear-gradient(180deg,var(--academy-emerald),var(--academy-green) 58%,var(--academy-green-dark))!important;
      border-bottom-color:var(--academy-gold)!important;
      scroll-margin-top:0!important;
    }

    .brandin,
    .brandin>div{
      min-width:0!important;
      max-width:100%!important;
    }

    .brandin .logo[data-stackup-logo="1"]{
      display:block!important;
      width:80px!important;
      height:80px!important;
      max-width:80px!important;
      flex:0 0 80px!important;
      object-fit:contain!important;
      background:transparent!important;
    }

    .name,
    .sub{
      max-width:100%!important;
      white-space:normal!important;
      overflow:visible!important;
      text-overflow:clip!important;
      word-break:normal!important;
    }

    .navtools{
      width:100%!important;
      max-width:100%!important;
      min-width:0!important;
      box-sizing:border-box!important;
    }

    .navbtn,
    button,
    input,
    select,
    textarea{
      min-width:0;
      max-width:100%;
      box-sizing:border-box;
    }

    img,
    svg,
    canvas,
    video{
      max-width:100%;
      height:auto;
    }

    #root .card.stage,
    #root .card.topic,
    #root .card.lesson,
    #root .block,
    #root .rrow,
    #root .m2-card,
    #root .p3-shell,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group,
    #root .fi-spot,
    #root .detail-card{
      border-width:var(--academy-card-border-width)!important;
      border-style:solid!important;
      border-radius:var(--academy-card-radius)!important;
      box-shadow:var(--academy-card-shadow)!important;
      box-sizing:border-box!important;
    }

    #root .card.stage,
    #root .card.topic,
    #root .card.lesson{
      width:100%!important;
      border-color:var(--academy-card-border)!important;
      background:var(--academy-card-bg)!important;
      color:var(--academy-ink)!important;
    }

    #root .card.stage,
    #root .card.lesson{
      padding:var(--academy-card-padding)!important;
    }

    #root .card.topic{
      display:flex!important;
      align-items:center!important;
      gap:var(--academy-card-gap)!important;
      min-height:96px!important;
      padding:var(--academy-card-padding)!important;
    }

    #root .block,
    #root .rrow,
    #root .m2-card,
    #root .p3-shell,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group,
    #root .fi-spot,
    #root .detail-card{
      border-color:var(--academy-card-border-soft)!important;
      background-color:var(--academy-parchment-2)!important;
    }

    #root .block,
    #root .rrow,
    #root .m2-card,
    #root .p3-shell,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group,
    #root .detail-card{
      padding:var(--academy-card-padding)!important;
    }

    #root .list{
      display:grid!important;
      gap:var(--academy-card-gap)!important;
      width:100%!important;
    }

    #root .blocks,
    #root .ranking,
    #root .p3x-math-grid,
    #root .p3m-odds{
      gap:var(--academy-card-gap)!important;
    }

    #root .card.topic .idx{
      width:var(--academy-index-size)!important;
      height:var(--academy-index-size)!important;
      min-width:var(--academy-index-size)!important;
      flex:0 0 var(--academy-index-size)!important;
      display:grid!important;
      place-items:center!important;
      margin:0!important;
      padding:0!important;
      border-radius:14px!important;
      background:var(--academy-brown)!important;
      color:var(--academy-gold)!important;
      text-align:center!important;
      line-height:1!important;
    }

    #root .card.topic .tcopy{
      flex:1 1 auto!important;
      min-width:0!important;
      max-width:100%!important;
      display:flex!important;
      flex-direction:column!important;
      justify-content:center!important;
      gap:4px!important;
      overflow:visible!important;
    }

    #root .card.topic .ttitle,
    #root .card.topic .tnote,
    #root .stitle,
    #root .desc,
    #root .head h2,
    #root .head p,
    #root .card.lesson h2,
    #root .card.lesson h3,
    #root .card.lesson h4,
    #root .card.lesson p,
    #root .card.lesson li,
    #root .block h3,
    #root .block p,
    #root .detail-card h3,
    #root .detail-card p{
      max-width:100%!important;
      white-space:normal!important;
      overflow:visible!important;
      text-overflow:clip!important;
      overflow-wrap:break-word!important;
      word-break:normal!important;
      -webkit-line-clamp:unset!important;
      -webkit-box-orient:initial!important;
    }

    #root .card.topic .ttitle{
      display:block!important;
      width:100%!important;
      margin:0!important;
      padding:0!important;
      line-height:1.16!important;
    }

    #root .card.topic .tnote{
      display:block!important;
      width:100%!important;
      margin:4px 0 0!important;
      line-height:1.34!important;
    }

    #root .card.topic .arrow{
      width:var(--academy-arrow-size)!important;
      min-width:var(--academy-arrow-size)!important;
      flex:0 0 var(--academy-arrow-size)!important;
      display:grid!important;
      place-items:center!important;
      align-self:center!important;
      margin:0!important;
      padding:0!important;
      color:var(--academy-gold-dark)!important;
      font-size:28px!important;
      line-height:1!important;
      text-align:center!important;
    }

    #root .block h3,
    #root .detail-card h3{
      margin-top:0!important;
    }

    #root .hand,
    #root .fv-hand,
    #root .fv-cards,
    #root .board-cards{
      min-width:0!important;
      max-width:100%!important;
      flex-wrap:wrap!important;
    }

    #root .badge,
    #root .p3x-badge,
    #root .fi-type,
    #root .p3x-phase{
      max-width:100%!important;
      border-radius:999px!important;
      letter-spacing:.05em!important;
      white-space:normal!important;
    }

    #root .fi-stats,
    #root .p3-progress{
      display:grid!important;
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      gap:8px!important;
      width:100%!important;
      max-width:100%!important;
      margin:12px 0 16px!important;
      padding:0!important;
      border:0!important;
      border-radius:0!important;
      background:transparent!important;
      box-shadow:none!important;
      overflow:visible!important;
    }

    #root .fi-stat,
    #root .p3-stat{
      display:flex!important;
      flex-direction:column!important;
      align-items:center!important;
      justify-content:center!important;
      min-width:0!important;
      min-height:82px!important;
      padding:10px 6px!important;
      border:var(--academy-card-border-width) solid #d4aa5870!important;
      border-radius:14px!important;
      background:linear-gradient(180deg,#2f1a10 0%,var(--academy-brown) 100%)!important;
      color:#f8f0df!important;
      text-align:center!important;
      box-shadow:0 5px 12px #00000030!important;
    }

    #root .fi-stat+.fi-stat{
      border-left:var(--academy-card-border-width) solid #d4aa5870!important;
    }

    #root .fi-stat:last-child,
    #root .p3-stat:last-child{
      background:linear-gradient(180deg,var(--academy-emerald) 0%,var(--academy-green-dark) 100%)!important;
      border-color:#d4aa58aa!important;
    }

    #root .fi-stat-label,
    #root .fi-stat span,
    #root .p3-stat span{
      display:block!important;
      order:1!important;
      margin:0 0 6px!important;
      color:#d8c6ad!important;
      line-height:1.05!important;
      letter-spacing:.06em!important;
      text-transform:uppercase!important;
      white-space:normal!important;
      overflow-wrap:break-word!important;
    }

    #root .fi-stat-value,
    #root .fi-stat b,
    #root .p3-stat b{
      display:block!important;
      order:2!important;
      margin:0!important;
      color:var(--academy-gold)!important;
      line-height:1.05!important;
      font-weight:700!important;
      white-space:normal!important;
      overflow-wrap:break-word!important;
    }

    #root .fi-stat small{
      display:block!important;
      order:3!important;
      margin-top:4px!important;
      color:#b9a58d!important;
      line-height:1.1!important;
    }

    #root .p3x-counter{
      position:sticky!important;
      top:8px!important;
      z-index:20!important;
      max-width:100%!important;
    }

    #root .p3x-opt,
    #root .p3-option,
    #root .fi-option,
    #root .p3x-btn,
    #root .p3-btn,
    #root .fi-btn{
      max-width:100%!important;
      min-width:0!important;
      border-radius:12px!important;
      white-space:normal!important;
      overflow-wrap:break-word!important;
    }

    #root .p3x-panel>h3,
    #root .p3-head h3,
    #root .fi-head h3{
      line-height:1.12!important;
      overflow-wrap:break-word!important;
    }

    @media(max-width:420px){
      :root{
        --academy-card-padding:16px;
        --academy-card-gap:12px;
        --academy-index-size:46px;
      }

      .brand{
        padding-left:16px!important;
        padding-right:16px!important;
      }

      .brandin{
        gap:12px!important;
      }

      .brandin .logo[data-stackup-logo="1"]{
        width:74px!important;
        height:74px!important;
        max-width:74px!important;
        flex-basis:74px!important;
      }

      #root .screen{
        padding-left:14px!important;
        padding-right:14px!important;
      }

      #root .card.topic{
        min-height:92px!important;
      }

      #root .card.topic .arrow{
        font-size:26px!important;
      }

      #root .fi-stats,
      #root .p3-progress{
        gap:6px!important;
      }

      #root .fi-stat,
      #root .p3-stat{
        min-height:76px!important;
        padding:9px 4px!important;
      }
    }

    @media(max-width:350px){
      :root{
        --academy-card-padding:14px;
        --academy-index-size:42px;
        --academy-card-gap:10px;
      }

      .brand{
        padding-left:12px!important;
        padding-right:12px!important;
      }

      .brandin{
        gap:10px!important;
      }

      .brandin .logo[data-stackup-logo="1"]{
        width:66px!important;
        height:66px!important;
        max-width:66px!important;
        flex-basis:66px!important;
      }

      #root .screen{
        padding-left:12px!important;
        padding-right:12px!important;
      }

      #root .card.topic{
        min-height:88px!important;
      }

      #root .fi-stats,
      #root .p3-progress{
        grid-template-columns:1fr!important;
      }

      #root .fi-stat,
      #root .p3-stat{
        min-height:64px!important;
      }
    }

    /* ACADEMY MONOCHROME IVORY — EDITORIAL POKER SCHOOL */
    :root{
      --academy-bg:#070707;
      --academy-bg-soft:#0c0c0c;
      --academy-surface:#1a1a1a;
      --academy-surface-2:#202020;
      --academy-surface-3:#282828;
      --academy-graphite:#333333;
      --academy-graphite-2:#484848;
      --academy-silver:#7e7e7e;
      --academy-silver-light:#a7a7a7;
      --academy-ivory:#f3eee4;
      --academy-ivory-2:#d8d0bf;
      --academy-paper:#eee8dc;
      --academy-display:'Cormorant Garamond',Georgia,'Times New Roman',serif;
      --academy-ui:'Inter',Arial,sans-serif;
    }

    html,body,.app{
      background:var(--academy-bg)!important;
      color:var(--academy-ivory)!important;
    }

    body{
      font-family:var(--academy-ui)!important;
      letter-spacing:0;
    }

    .app{
      max-width:560px!important;
      min-height:100dvh!important;
      border-left:1px solid #202020!important;
      border-right:1px solid #202020!important;
    }

    .brand{
      padding:calc(15px + env(safe-area-inset-top)) 18px 14px!important;
      background:linear-gradient(180deg,#111 0%,#0c0c0c 72%,#090909 100%)!important;
      border-bottom:1px solid var(--academy-graphite)!important;
      box-shadow:0 10px 34px #0008!important;
    }

    .brandin{gap:13px!important}
    .brandin .logo[data-stackup-logo="1"]{
      width:66px!important;height:66px!important;max-width:66px!important;flex-basis:66px!important;
      filter:grayscale(1) contrast(1.04)!important;
    }

    .name{
      font-family:var(--academy-display)!important;
      color:var(--academy-ivory)!important;
      font-size:clamp(21px,6.3vw,26px)!important;
      font-weight:700!important;
      letter-spacing:.07em!important;
      line-height:.96!important;
      text-transform:uppercase!important;
    }

    .sub{
      margin-top:7px!important;
      color:var(--academy-silver-light)!important;
      font-family:var(--academy-ui)!important;
      font-size:10px!important;
      font-weight:600!important;
      letter-spacing:.2em!important;
      line-height:1.25!important;
    }

    .navtools{
      gap:8px!important;
      padding:10px 14px 0!important;
      background:var(--academy-bg)!important;
    }
    .navbtn{
      min-height:42px!important;
      border:1px solid var(--academy-graphite)!important;
      border-radius:10px!important;
      background:var(--academy-surface)!important;
      color:var(--academy-ivory-2)!important;
      font-family:var(--academy-ui)!important;
      font-size:11px!important;
      font-weight:600!important;
      letter-spacing:.08em!important;
    }
    .navbtn:active{background:var(--academy-surface-2)!important}

    #root .screen{
      padding:24px 17px calc(38px + env(safe-area-inset-bottom))!important;
      background:
        linear-gradient(180deg,#0c0c0c00 0,#0c0c0c00 70%,#070707 100%)!important;
    }

    #root .intro{
      padding:6px 2px 24px!important;
      text-align:left!important;
      border-bottom:1px solid var(--academy-graphite)!important;
      margin-bottom:18px!important;
    }
    #root .intro h1,
    #root .head h2,
    #root .stitle,
    #root .card.lesson>h2,
    #root .rname,
    #root .compare h3{
      font-family:var(--academy-display)!important;
      font-weight:700!important;
      letter-spacing:.025em!important;
    }
    #root .intro h1{
      max-width:430px!important;
      color:var(--academy-ivory)!important;
      font-size:clamp(34px,10vw,46px)!important;
      line-height:.93!important;
      text-transform:uppercase!important;
    }
    #root .intro p{
      max-width:440px!important;
      margin:15px 0 0!important;
      color:var(--academy-silver-light)!important;
      font-size:14px!important;
      line-height:1.55!important;
    }

    #root .list{gap:11px!important}

    #root .card.stage{
      position:relative!important;
      padding:20px 19px 18px!important;
      overflow:hidden!important;
      border:1px solid var(--academy-graphite)!important;
      border-radius:14px!important;
      background:linear-gradient(145deg,#202020 0%,#181818 60%,#121212 100%)!important;
      color:var(--academy-ivory)!important;
      box-shadow:0 14px 34px #0005!important;
    }
    #root .card.stage::before{
      content:''!important;
      position:absolute!important;
      inset:0 auto 0 0!important;
      width:2px!important;
      background:var(--academy-ivory-2)!important;
      opacity:.8!important;
    }
    #root .card.stage:active{transform:scale(.992)!important}
    #root .card.stage .kicker{
      color:var(--academy-silver-light)!important;
      font-size:10px!important;
      font-weight:700!important;
      letter-spacing:.19em!important;
    }
    #root .card.stage .stitle{
      margin-top:4px!important;
      color:var(--academy-ivory)!important;
      font-size:clamp(27px,7.8vw,34px)!important;
      line-height:1!important;
    }
    #root .card.stage .desc{
      margin-top:9px!important;
      color:#a6a6a6!important;
      font-size:13px!important;
      line-height:1.5!important;
    }
    #root .card.stage .foot{
      margin-top:16px!important;
      padding-top:11px!important;
      border-top:1px solid #333!important;
      color:#858585!important;
      font-family:var(--academy-ui)!important;
      font-size:10px!important;
      font-weight:600!important;
      letter-spacing:.08em!important;
    }
    #root .card.stage .arrow{color:var(--academy-ivory-2)!important}

    #root .head{
      padding:2px 2px 22px!important;
      border-bottom:1px solid var(--academy-graphite)!important;
      margin-bottom:14px!important;
    }
    #root .head .eyebrow{
      color:var(--academy-silver-light)!important;
      font-family:var(--academy-ui)!important;
      font-size:10px!important;
      font-weight:700!important;
      letter-spacing:.19em!important;
    }
    #root .head h2{
      margin:5px 0 0!important;
      color:var(--academy-ivory)!important;
      font-size:clamp(34px,10vw,44px)!important;
      line-height:.94!important;
    }
    #root .head p{
      margin:12px 0 0!important;
      color:var(--academy-silver-light)!important;
      font-size:13px!important;
      line-height:1.55!important;
    }

    #root .card.topic{
      min-height:86px!important;
      padding:14px 14px!important;
      border:1px solid var(--academy-graphite)!important;
      border-radius:12px!important;
      background:var(--academy-surface)!important;
      color:var(--academy-ivory)!important;
      box-shadow:0 8px 22px #0003!important;
    }
    #root .card.topic .idx{
      width:42px!important;height:42px!important;min-width:42px!important;flex-basis:42px!important;
      border:1px solid var(--academy-graphite-2)!important;
      border-radius:50%!important;
      background:transparent!important;
      color:var(--academy-ivory-2)!important;
      font-family:var(--academy-ui)!important;
      font-size:12px!important;
      font-weight:600!important;
      letter-spacing:.05em!important;
    }
    #root .card.topic .ttitle{
      color:var(--academy-ivory)!important;
      font-family:var(--academy-display)!important;
      font-size:20px!important;
      font-weight:700!important;
      letter-spacing:.015em!important;
      line-height:1.06!important;
      text-transform:none!important;
    }
    #root .card.topic .tnote{
      color:#929292!important;
      font-family:var(--academy-ui)!important;
      font-size:11px!important;
      line-height:1.42!important;
    }
    #root .card.topic .arrow{
      color:#8e8e8e!important;
      font-size:22px!important;
    }

    #root .card.lesson{
      padding:21px!important;
      border:1px solid #c9c1b3!important;
      border-radius:16px!important;
      background:linear-gradient(180deg,#f3eee4 0%,#ece5d9 100%)!important;
      color:#151515!important;
      box-shadow:0 18px 44px #0007!important;
    }
    #root .card.lesson .badge{
      margin-bottom:16px!important;
      padding:6px 9px!important;
      border:1px solid #9d9588!important;
      background:transparent!important;
      color:#585858!important;
      font-family:var(--academy-ui)!important;
      font-size:9px!important;
      font-weight:700!important;
      letter-spacing:.14em!important;
    }
    #root .card.lesson>h2{
      color:#111!important;
      font-size:clamp(32px,9.4vw,42px)!important;
      line-height:.96!important;
      text-transform:uppercase!important;
    }
    #root .card.lesson>.lead{
      color:#5b5b5b!important;
      font-family:var(--academy-ui)!important;
      font-size:14px!important;
      line-height:1.55!important;
    }
    #root .blocks{gap:9px!important}
    #root .block,
    #root .detail-card,
    #root .rrow,
    #root .m2-card,
    #root .p3-shell,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group{
      border:1px solid #cec6b8!important;
      border-radius:12px!important;
      background:#e7e0d4!important;
      color:#171717!important;
      box-shadow:none!important;
    }
    #root .block h3,
    #root .detail-card h3{
      color:#222!important;
      font-family:var(--academy-ui)!important;
      font-size:12px!important;
      font-weight:700!important;
      letter-spacing:.09em!important;
    }
    #root .block p,
    #root .detail-card p{
      color:#555!important;
      font-family:var(--academy-ui)!important;
      font-size:13px!important;
      line-height:1.55!important;
    }

    #root .compare{
      border:1px solid var(--academy-graphite-2)!important;
      border-radius:12px!important;
      background:#111!important;
      color:var(--academy-ivory)!important;
      box-shadow:none!important;
    }
    #root .compare h3{color:var(--academy-ivory)!important}
    #root .compare .ci{border-top-color:#333!important}
    #root .compare .ci strong{color:var(--academy-ivory-2)!important}
    #root .compare .ci p{color:#a5a5a5!important}

    #root .rpos{
      background:#1a1a1a!important;
      color:var(--academy-ivory-2)!important;
      border-radius:50%!important;
    }
    #root .rname{color:#202020!important}
    #root .rnote{color:#666!important}

    #root .fi-stat,
    #root .p3-stat{
      border-color:#484848!important;
      background:linear-gradient(180deg,#202020,#151515)!important;
      color:var(--academy-ivory)!important;
      box-shadow:none!important;
    }
    #root .fi-stat:last-child,
    #root .p3-stat:last-child{
      border-color:#6a6a6a!important;
      background:linear-gradient(180deg,#282828,#1a1a1a)!important;
    }
    #root .fi-stat b,#root .fi-stat .fi-stat-value,#root .p3-stat b{color:var(--academy-ivory)!important}
    #root .fi-stat span,#root .fi-stat small,#root .fi-stat .fi-stat-label,#root .p3-stat span{color:#a0a0a0!important}

    #root button:focus-visible,
    .navbtn:focus-visible{
      outline:2px solid var(--academy-ivory-2)!important;
      outline-offset:2px!important;
    }

    @media(max-width:380px){
      #root .screen{padding-left:13px!important;padding-right:13px!important}
      #root .card.stage{padding:18px 16px 16px!important}
      #root .card.topic{padding:13px 12px!important;gap:11px!important}
      #root .card.topic .ttitle{font-size:18px!important}
      .brandin .logo[data-stackup-logo="1"]{width:60px!important;height:60px!important;max-width:60px!important;flex-basis:60px!important}
    }

  `;

  document.head.appendChild(style);
})();
