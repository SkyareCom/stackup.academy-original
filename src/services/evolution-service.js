(() => {
  const WEIGHTS=Object.freeze({fundamentals:10,modalities:15,quiz:20,math:25,sim:30});
  const CATEGORIES=Object.freeze([
    [0,'INICIANTE'],[1300,'APRENDIZ'],[3900,'JOGADOR DE MESA'],[8300,'GRINDER'],
    [13900,'REGULAR'],[20700,'PRO'],[27700,'LENDA']
  ]);
  const safeParse=(raw,f={})=>{try{return JSON.parse(raw||'')||f}catch(_){return f}};
  const read=k=>{try{return safeParse(localStorage.getItem(k),{})}catch(_){return {}}};
  const values=o=>Object.values(o&&typeof o==='object'?o:{});
  const answers=store=>{
    let answered=0,correct=0;
    for(const section of values(store)){
      const rows=values(section?.answers||{});answered+=rows.length;correct+=rows.filter(x=>x?.correct===true).length;
    }
    return {answered,correct};
  };
  const mixed=()=>{
    const rows=values(read('stackup-mixed-games-progress-v2').answers||{});
    return {answered:rows.length,correct:rows.filter(x=>x?.correct===true).length};
  };
  const advanced=()=>{
    const s=read('stackup-practice-advanced-v2'),out={};
    for(const k of ['sim','quiz','math']){
      const rows=values(s[k]?.results||{});
      out[k]={answered:rows.length,correct:rows.filter(x=>x?.correct===true||x===true).length};
    }
    return out;
  };
  const corePractice=()=>{
    const s=read('stackup-practice-progress-v1'),out={};
    for(const k of ['sim','quiz']){
      const p=s[k]||{},answered=Object.keys(p.seen||{}).length;
      out[k]={answered,correct:Math.min(answered,Number(p.correct||0))};
    }
    return out;
  };
  const pct=(a,b)=>b?Math.round(a/b*100):0;
  function categoryFor(xp){
    let index=0;
    CATEGORIES.forEach((c,i)=>{if(xp>=c[0])index=i});
    const current=CATEGORIES[index],next=CATEGORIES[index+1]||null;
    return {index,name:current[1],floor:current[0],next:next?{name:next[1],floor:next[0],remaining:Math.max(0,next[0]-xp)}:null};
  }
  function snapshot(){
    const f=answers(read('stackup-fundamentals-progress-v1'));
    const mb=answers(read('stackup-modalities-progress-v1')),mx=mixed();
    const mod={answered:mb.answered+mx.answered,correct:mb.correct+mx.correct};
    const core=corePractice(),adv=advanced();
    const sim={answered:core.sim.answered+adv.sim.answered,correct:core.sim.correct+adv.sim.correct};
    const quiz={answered:core.quiz.answered+adv.quiz.answered,correct:core.quiz.correct+adv.quiz.correct};
    const math={answered:adv.math.answered,correct:adv.math.correct};
    const sections={fundamentals:f,modalities:mod,quiz,math,sim};
    let xp=0,answered=0,correct=0;
    for(const [k,s] of Object.entries(sections)){
      s.weight=WEIGHTS[k];s.xp=s.correct*s.weight;s.accuracy=pct(s.correct,s.answered);
      xp+=s.xp;answered+=s.answered;correct+=s.correct;
    }
    const weakest=Object.entries(sections)
      .filter(([,s])=>s.answered>0)
      .sort((a,b)=>a[1].accuracy-b[1].accuracy)
      .slice(0,3)
      .map(([key,s])=>({key,...s}));
    return {xp,answered,correct,accuracy:pct(correct,answered),category:categoryFor(xp),sections,weakest};
  }
  window.EvolutionService={WEIGHTS,CATEGORIES,snapshot,categoryFor};
})();