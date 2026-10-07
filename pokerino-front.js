(() => {
  if(document.getElementById('pokerino-front-style'))return;
  const s=document.createElement('style');s.id='pokerino-front-style';s.textContent=`
    :root{--pokerino-green:#061713;--pokerino-green-2:#0a241d;--pokerino-gold:#ffc83d;--pokerino-orange:#f39a32;--pokerino-blue:#3ca9ff;--pokerino-purple:#9b62ff}
    body{background:radial-gradient(circle at 50% -10%,#143b2d 0,#07130f 36%,#030806 100%)!important}
    .app{background:linear-gradient(180deg,#071711 0%,#03100c 100%)!important}
    .brand{background:rgba(3,13,10,.94)!important;border-bottom:1px solid rgba(255,200,61,.28)!important}
    .pokerino-mascot{position:absolute;right:12px;bottom:-3px;width:104px;height:124px;pointer-events:none;filter:drop-shadow(0 8px 14px rgba(0,0,0,.38))}
    .pokerino-head{position:absolute;left:24px;top:20px;width:62px;height:69px;border-radius:48% 48% 45% 45%;background:linear-gradient(145deg,#f1a36c,#b95d3c);border:2px solid #3b1c13}
    .pokerino-hair{position:absolute;left:17px;top:8px;width:78px;height:42px;border-radius:58% 45% 40% 35%;background:#3a1a12;transform:rotate(-7deg);box-shadow:-10px 10px 0 -4px #29110d,12px 8px 0 -5px #4b2115}
    .pokerino-eye{position:absolute;top:47px;width:12px;height:16px;border-radius:50%;background:#fff}.pokerino-eye:after{content:'';position:absolute;left:4px;top:5px;width:6px;height:7px;border-radius:50%;background:#2b170d}
    .pokerino-eye.left{left:38px}.pokerino-eye.right{left:61px}.pokerino-smile{position:absolute;left:48px;top:72px;width:24px;height:10px;border-bottom:2px solid #5e261a;border-radius:50%}
    .pokerino-body{position:absolute;left:20px;top:82px;width:76px;height:49px;border-radius:28px 28px 10px 10px;background:#111;border:1px solid #5e461b}.pokerino-body:before{content:'♠';position:absolute;left:29px;top:8px;color:var(--pokerino-gold);font-size:24px}
    .pokerino-chip{position:absolute;right:3px;bottom:9px;width:28px;height:28px;border-radius:50%;background:repeating-conic-gradient(#fff 0 12deg,#1d6e55 12deg 28deg);border:5px solid #1d6e55;box-shadow:0 0 0 2px #d6b25a}
    .academy-home-hero,.academy-stage-intro,.academy-profile-head{position:relative!important;background:linear-gradient(125deg,rgba(3,15,11,.96),rgba(8,37,28,.88) 60%,rgba(76,44,12,.72))!important;filter:none!important;border:1px solid rgba(255,200,61,.32)!important;border-radius:0 0 24px 24px!important}
    .academy-home-hero .academy-hero-content,.academy-stage-hero-grid,.academy-profile-hero-grid{position:relative;z-index:2;max-width:calc(100% - 112px)!important}
    .academy-title{font-size:20px!important;line-height:1.05!important;color:#fff!important}.academy-kicker,.academy-group-title,.academy-section-heading h2{color:var(--pokerino-gold)!important}
    .academy-stage-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}
    .academy-stage-card{min-height:118px!important;border-radius:18px!important;padding:14px!important;background:linear-gradient(145deg,#12392c,#071c16)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)!important}
    .academy-stage-card:nth-child(1){background:linear-gradient(145deg,#4d2912,#18110a)!important}.academy-stage-card:nth-child(2){background:linear-gradient(145deg,#112e52,#081522)!important}.academy-stage-card:nth-child(3){background:linear-gradient(145deg,#11412d,#071b13)!important}
    .academy-stage-name{font-size:16px!important}.academy-stage-step{color:var(--pokerino-gold)!important}.academy-stage-progress>i{background:linear-gradient(90deg,var(--pokerino-orange),var(--pokerino-gold))!important}
    .academy-continue,.academy-row,.academy-practice-card,.academy-plan,.academy-addon,.academy-cross-sell,.academy-app-card,.academy-coach-box,.block,.detail-card,.m2-card,.mg-card{border-color:rgba(255,200,61,.42)!important;border-radius:16px!important;background:linear-gradient(145deg,rgba(14,42,33,.96),rgba(5,21,16,.98))!important;box-shadow:0 7px 20px rgba(0,0,0,.16)!important}
    .academy-row-num{background:#173d30!important;color:var(--pokerino-gold)!important}.academy-row-arrow{color:var(--pokerino-gold)!important}
    .academy-primary{background:linear-gradient(135deg,#ffd455,#f4ad25)!important;color:#151006!important;border-color:#ffd455!important}.academy-secondary.active{background:var(--pokerino-gold)!important;color:#161108!important}
    .academy-bottom-nav{background:rgba(2,13,10,.97)!important;border-top-color:rgba(255,200,61,.32)!important}.academy-nav-item.active{color:var(--pokerino-gold)!important}
    .pokerino-guide{display:grid;grid-template-columns:74px minmax(0,1fr);gap:12px;align-items:center;padding:12px;border:1px solid rgba(255,200,61,.4);border-radius:18px;background:linear-gradient(135deg,#102d23,#071713);margin-bottom:14px}.pokerino-mini{position:relative;width:68px;height:72px}.pokerino-mini .pokerino-head{transform:scale(.62);transform-origin:top left}.pokerino-mini .pokerino-hair{transform:scale(.62) rotate(-7deg);transform-origin:top left}.pokerino-mini .pokerino-eye,.pokerino-mini .pokerino-smile,.pokerino-mini .pokerino-body,.pokerino-mini .pokerino-chip{display:none}.pokerino-guide strong{display:block;color:var(--pokerino-gold);font-size:14px}.pokerino-guide span{display:block;margin-top:4px;color:#d5d2c8;font-size:12px;line-height:1.35}
    @media(max-width:350px){.pokerino-mascot{right:5px;transform:scale(.86);transform-origin:right bottom}.academy-home-hero .academy-hero-content,.academy-stage-hero-grid,.academy-profile-hero-grid{max-width:calc(100% - 92px)!important}.academy-title{font-size:18px!important}}
  `;document.head.appendChild(s);
  const mascot=()=>'<div class="pokerino-mascot" aria-hidden="true"><i class="pokerino-hair"></i><i class="pokerino-head"></i><i class="pokerino-eye left"></i><i class="pokerino-eye right"></i><i class="pokerino-smile"></i><i class="pokerino-body"></i><i class="pokerino-chip"></i></div>';
  const guide=(message)=>'<div class="pokerino-guide"><div class="pokerino-mini">'+mascot()+'</div><div><strong>POKERINO</strong><span>'+message+'</span></div></div>';
  const decorate=()=>{
    document.querySelectorAll('.academy-home-hero,.academy-stage-intro,.academy-profile-head').forEach(el=>{if(!el.querySelector(':scope > .pokerino-mascot'))el.insertAdjacentHTML('beforeend',mascot())});
    const home=document.querySelector('.academy-home');if(home&&!home.querySelector('.pokerino-guide')){const first=home.querySelector('.academy-home-section');first?.insertAdjacentHTML('beforebegin',guide('Eu vou acompanhar sua evolução. Escolha uma etapa e vamos para a mesa!'))}
    const stage=document.querySelector('.academy-stage-screen');if(stage&&!stage.querySelector('.pokerino-guide')){stage.querySelector('.academy-group')?.insertAdjacentHTML('beforebegin',guide('Aprenda no seu ritmo. Cada aula concluída deixa seu jogo mais forte.'))}
  };
  new MutationObserver(()=>requestAnimationFrame(decorate)).observe(document.getElementById('root'),{childList:true,subtree:true});
  decorate();
})();