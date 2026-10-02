(() => {
  const KEY='academy.pref.v1';
  const DRAFT_KEY='academy.hist.draft.v1';
  const safeParse=(raw,f={})=>{try{return JSON.parse(raw||'')||f}catch(_){return f}};
  const read=()=>{try{return safeParse(localStorage.getItem(KEY),{})}catch(_){return {}}};
  const write=value=>{try{localStorage.setItem(KEY,JSON.stringify(value))}catch(_){}};
  const getMode=()=>read().historyMode==='manual'?'manual':'auto';
  const setMode=mode=>{
    const next=mode==='manual'?'manual':'auto';
    const state=read();state.historyMode=next;write(state);
    window.dispatchEvent(new CustomEvent('academy:historymode',{detail:{mode:next}}));
    return next;
  };
  const isAuto=()=>getMode()==='auto';
  const readDraft=()=>{try{return safeParse(sessionStorage.getItem(DRAFT_KEY),{runs:[]})}catch(_){return {runs:[]}}};
  const writeDraft=state=>{try{sessionStorage.setItem(DRAFT_KEY,JSON.stringify(state||{runs:[]}))}catch(_){}};
  const clearDraft=()=>{try{sessionStorage.removeItem(DRAFT_KEY)}catch(_){}};
  window.TrainingPreferenceService={KEY,DRAFT_KEY,getMode,setMode,isAuto,readDraft,writeDraft,clearDraft};
})();