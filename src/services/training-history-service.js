(() => {
  const KEY='academy.hist.v1';
  const WINDOW_MS=20*60*1000;
  const safeParse=(raw,f={})=>{try{return JSON.parse(raw||'')||f}catch(_){return f}};
  const values=o=>Object.values(o&&typeof o==='object'?o:{});
  const read=()=>safeParse(localStorage.getItem(KEY),{runs:[]});
  const write=s=>{try{localStorage.setItem(KEY,JSON.stringify(s))}catch(_){}};

  const answerStats=store=>{
    let answered=0,correct=0;
    for(const section of values(store)){
      const rows=values(section?.answers||{});
      answered+=rows.length;
      correct+=rows.filter(x=>x?.correct===true).length;
    }
    return {answered,correct};
  };
  const mixedStats=store=>{
    const rows=values(store?.answers||{});
    return {answered:rows.length,correct:rows.filter(x=>x?.correct===true).length};
  };
  const corePracticeStats=store=>{
    const out={};
    for(const type of ['sim','quiz']){
      const p=store?.[type]||{};
      const answered=Object.keys(p.seen||{}).length;
      const correct=Math.min(answered,Number(p.correct||0));
      out[type]={answered,correct};
    }
    return out;
  };
  const advancedStats=store=>{
    const out={};
    for(const type of ['sim','quiz','math']){
      const rows=values(store?.[type]?.results||{});
      out[type]={answered:rows.length,correct:rows.filter(x=>x?.correct===true||x===true).length};
    }
    return out;
  };

  const descriptors=(key,raw)=>{
    const store=safeParse(raw,{});
    if(key==='stackup-fundamentals-progress-v1')return [{section:'fundamentals',kind:'fundamentals',label:'BASE',...answerStats(store)}];
    if(key==='stackup-modalities-progress-v1')return [{section:'modalities',kind:'modalities',label:'MODALIDADES',...answerStats(store)}];
    if(key==='stackup-mixed-games-progress-v2')return [{section:'modalities',kind:'mixed',label:'MODALIDADES · MIXED GAMES',...mixedStats(store)}];
    if(key==='stackup-practice-progress-v1'){
      const s=corePracticeStats(store);
      return [
        {section:'practice',kind:'sim',label:'SIMULADOR',...s.sim},
        {section:'practice',kind:'quiz',label:'QUIZ',...s.quiz}
      ];
    }
    if(key==='stackup-practice-advanced-v2'){
      const s=advancedStats(store);
      return [
        {section:'practice',kind:'sim',label:'SIMULADOR',...s.sim},
        {section:'practice',kind:'quiz',label:'QUIZ',...s.quiz},
        {section:'practice',kind:'math',label:'MATEMÁTICA DO POKER',...s.math}
      ];
    }
    return [];
  };

  function recordStorageChange(key,beforeRaw,afterRaw){
    const before=descriptors(key,beforeRaw),after=descriptors(key,afterRaw);
    if(!after.length)return;
    const state=read();state.runs=Array.isArray(state.runs)?state.runs:[];
    const now=Date.now();
    for(const next of after){
      const prev=before.find(x=>x.kind===next.kind&&x.section===next.section)||{answered:0,correct:0};
      const da=next.answered-prev.answered;
      const dc=next.correct-prev.correct;
      if(da<=0&&dc<=0)continue;
      const last=state.runs[0];
      const canMerge=last&&last.section===next.section&&last.kind===next.kind&&(now-last.updatedAt)<=WINDOW_MS;
      if(canMerge){
        last.updatedAt=now;
        last.answered=next.answered;
        last.correct=next.correct;
        last.errors=Math.max(0,next.answered-next.correct);
        last.deltaAnswered=(last.deltaAnswered||0)+Math.max(0,da);
        last.deltaCorrect=(last.deltaCorrect||0)+Math.max(0,dc);
      }else{
        state.runs.unshift({
          id:'AH-'+now.toString(36)+'-'+Math.random().toString(36).slice(2,7),
          section:next.section,kind:next.kind,label:next.label,
          startedAt:now,updatedAt:now,
          answered:next.answered,correct:next.correct,errors:Math.max(0,next.answered-next.correct),
          deltaAnswered:Math.max(0,da),deltaCorrect:Math.max(0,dc)
        });
      }
    }
    state.runs=state.runs.slice(0,250);
    write(state);
  }

  function list({section='',limit=100}={}){
    const runs=(read().runs||[]).filter(r=>!section||r.section===section);
    return runs.slice(0,Math.max(1,limit));
  }
  function summary(){
    const runs=list({limit:250});
    return {
      total:runs.length,
      practice:runs.filter(r=>r.section==='practice').length,
      fundamentals:runs.filter(r=>r.section==='fundamentals').length,
      modalities:runs.filter(r=>r.section==='modalities').length,
      answered:runs.reduce((n,r)=>n+Number(r.deltaAnswered||0),0),
      correct:runs.reduce((n,r)=>n+Number(r.deltaCorrect||0),0)
    };
  }
  function clear(){try{localStorage.removeItem(KEY)}catch(_){};return true}

  window.TrainingHistoryService={KEY,list,summary,clear,recordStorageChange};
})();