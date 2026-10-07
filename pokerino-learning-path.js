(() => {
  const stages=[
    {n:1,name:'APRENDER',icon:'?',copy:'Entenda as regras, a mesa, as cartas e a dinâmica do poker.'},
    {n:2,name:'PRATICAR',icon:'◎',copy:'Treine o básico antes de tomar suas primeiras decisões na mesa.'},
    {n:3,name:'JOGAR',icon:'♠',copy:'Chegue às mesas entendendo o que está acontecendo e sabendo como participar.'}
  ];
  const style=document.createElement('style');style.textContent=`
    .pokerino-learning-path{margin:14px 0 18px;padding:16px;border:1px solid rgba(255,200,61,.34);border-radius:18px;background:linear-gradient(145deg,#0d2d22,#061711)}.pokerino-learning-path>strong{display:block;color:#ffc83d;font-size:12px;letter-spacing:.1em}.pokerino-learning-path>p{margin:4px 0 12px;color:#aaa69d;font-size:11px}.pokerino-layer-list{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.pokerino-layer{position:relative;min-width:0;text-align:center}.pokerino-layer b{margin:auto;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(255,200,61,.38);background:#071b14;color:#ffc83d}.pokerino-layer span{display:block;margin-top:5px;font-size:8px;line-height:1.1;color:#d9d5cc}.pokerino-layer:not(:last-child):after{content:'';position:absolute;top:17px;left:calc(50% + 18px);right:calc(-50% + 18px);height:1px;background:rgba(255,200,61,.25)}.pokerino-layer.done b{background:#ffc83d;color:#171006}.pokerino-layer.current b{box-shadow:0 0 0 3px rgba(255,200,61,.14),0 0 18px rgba(255,200,61,.22)}.pokerino-layer-detail{margin-top:12px;padding:10px;border-radius:12px;background:#06130f;color:#c7c3ba;font-size:11px;line-height:1.35}.pokerino-next-series{margin-top:10px;padding:12px;border-top:1px solid rgba(255,200,61,.22);display:grid;gap:4px}.pokerino-next-series strong{color:#ffc83d;font-size:11px}.pokerino-next-series span{color:#aaa69d;font-size:11px;line-height:1.35}
  `;document.head.appendChild(style);
  const render=()=>{
    document.querySelectorAll('.academy-stage-screen').forEach(screen=>{
      if(screen.querySelector('.pokerino-learning-path'))return;
      const target=screen.querySelector('.academy-group');if(!target)return;
      const current=0;
      const html='<div class="pokerino-learning-path"><strong>SUA JORNADA</strong><p>Poker é um jogo que demora minutos para aprender. Mas leva uma vida para dominar. Aqui, Pokerino prepara você para chegar às mesas sem passar vergonha.</p><div class="pokerino-layer-list">'+stages.map((x,i)=>'<button class="pokerino-layer '+(i===current?'current':'')+'" type="button" data-learning-layer="'+i+'"><b>'+x.icon+'</b><span>'+x.name+'</span></button>').join('')+'</div><div class="pokerino-layer-detail">'+stages[current].copy+'</div><div class="pokerino-next-series"><strong>QUER EVOLUIR?</strong><span>O Academy coloca você na mesa. Para evoluir e buscar domínio, continue nos outros apps da série Stackup Hold’em.</span></div></div>';
      target.insertAdjacentHTML('beforebegin',html);
    });
  };
  document.addEventListener('click',e=>{const b=e.target.closest('[data-learning-layer]');if(!b)return;const box=b.closest('.pokerino-learning-path'),i=Number(b.dataset.learningLayer)||0;box.querySelectorAll('.pokerino-layer').forEach((x,j)=>{x.classList.toggle('current',j===i);x.classList.toggle('done',j<i)});box.querySelector('.pokerino-layer-detail').textContent=stages[i].copy});
  new MutationObserver(()=>requestAnimationFrame(render)).observe(document.getElementById('root'),{childList:true,subtree:true});render();
})();