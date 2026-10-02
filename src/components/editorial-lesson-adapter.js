(() => {
  if(document.getElementById('academy-editorial-lesson-adapter'))return;
  const s=document.createElement('style');s.id='academy-editorial-lesson-adapter';s.textContent=`
    #root .card.lesson{border:0!important;border-radius:0!important;background:transparent!important;color:var(--academy-ivory)!important;padding:2px 0 22px!important;box-shadow:none!important;cursor:default!important}
    #root .card.lesson>.badge{border:1px solid var(--academy-line-strong)!important;background:transparent!important;color:var(--academy-silver-2)!important}
    #root .card.lesson>h2{color:var(--academy-ivory)!important;font-size:12px;line-height:1.05!important;letter-spacing:.02em!important;text-align:left!important}
    #root .card.lesson>.lead{color:var(--academy-muted)!important;font-size:12px;line-height:1.55!important;text-align:left!important;display:block!important;height:auto!important;max-height:none!important;-webkit-line-clamp:unset!important}
    #root .blocks{gap:0!important;border-top:1px solid var(--academy-line)!important}
    #root .block,#root .detail-card{padding:18px 0!important;border:0!important;border-bottom:1px solid var(--academy-line)!important;border-radius:0!important;background:transparent!important;color:var(--academy-ivory)!important;box-shadow:none!important}
    #root .block h3,#root .detail-card h3{color:var(--academy-ivory)!important;font-size:12px;letter-spacing:.06em!important;text-align:left!important}
    #root .block p,#root .detail-card p{color:var(--academy-muted)!important;font-size:12px;line-height:1.58!important;text-align:left!important;display:block!important;height:auto!important;max-height:none!important;-webkit-line-clamp:unset!important}
    #root .compare{margin-top:22px!important;border:1px solid var(--academy-line-strong)!important;background:var(--academy-surface)!important;border-radius:var(--academy-radius-md)!important}
    #root .rrow{background:var(--academy-surface)!important;border:1px solid var(--academy-line)!important;color:var(--academy-ivory)!important}
    #root .rname{color:var(--academy-ivory)!important}#root .rnote{color:var(--academy-muted)!important}
    #root .m2-card,#root .mg-card{padding:17px 0!important;border:0!important;border-bottom:1px solid var(--academy-line)!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}
    #root .m2-card h3,#root .mg-card h3{color:var(--academy-ivory)!important}#root .m2-card p,#root .mg-card p{color:var(--academy-muted)!important}
    #root .fi-shell,#root .m2-training,#root .mg-training,#root .p3-shell,#root .p3x-shell{margin-top:24px!important}
    #root .fi-shell,#root .m2-training,#root .mg-training{border:1px solid var(--academy-line-strong)!important;border-radius:var(--academy-radius-lg)!important;box-shadow:none!important}
    @media(max-width:340px){#root .card.lesson>h2{font-size:12px}#root .block,#root .detail-card{padding-block:15px!important}}
  `;document.head.appendChild(s);
})();