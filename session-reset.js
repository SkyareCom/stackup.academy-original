(() => {
  const PROGRESS_KEYS=[
    'stackup-fundamentals-progress-v1','stackup-modalities-progress-v1','stackup-mixed-games-progress-v2',
    'stackup-practice-progress-v1','stackup-practice-advanced-v2','stackup-academy-weekly-v1','stackup-academy-last-route-v1'
  ];
  function clearAll(confirmToken=''){
    if(confirmToken!=='CLEAR_ACADEMY_PROGRESS')return false;
    try{PROGRESS_KEYS.forEach(key=>localStorage.removeItem(key));}catch(_){return false}
    window.dispatchEvent(new CustomEvent('academy:progress-reset'));
    return true;
  }
  window.AcademyProgressReset={keys:[...PROGRESS_KEYS],clearAll};
})();