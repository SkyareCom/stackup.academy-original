(() => {
  const t=(k,f='')=>window.AcademyI18n?.t(k,f)||f||k;
  const C=()=>window.AcademyComponents;
  const esc=v=>window.AcademyDOM?.esc(v)||String(v??'');
  let exam=null,timerId=0;

  if(!document.getElementById('academy-study-tools-style')){
    const s=document.createElement('style');s.id='academy-study-tools-style';
    s.textContent='.academy-study-grid{display:grid;gap:12px}.academy-study-card{padding:16px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface);text-align:left}.academy-study-card strong,.academy-study-card span{display:block}.academy-study-card span{margin-top:5px;color:var(--academy-muted)}.academy-study-card button{width:100%;margin-top:14px}.academy-skill-row{padding:14px 0;border-bottom:1px solid var(--academy-line)}.academy-skill-row:first-child{border-top:1px solid var(--academy-line)}.academy-skill-head{display:flex;justify-content:space-between;gap:12px}.academy-skill-row small{display:block;margin-top:4px;color:var(--academy-muted)}.academy-certificate{padding:20px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-lg);background:var(--academy-surface);text-align:center}.academy-certificate strong,.academy-certificate span{display:block}.academy-certificate span{margin-top:8px;color:var(--academy-muted)}.academy-exam-meta{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--academy-line)}.academy-exam-question{padding:20px 0}.academy-exam-question p{margin:0 0 14px;color:var(--academy-ivory);line-height:1.5}.academy-exam-options{display:grid;gap:10px}.academy-exam-options button{width:100%;text-align:left}.academy-exam-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--academy-line);border:1px solid var(--academy-line);margin-bottom:20px}.academy-exam-summary div{padding:14px 6px;background:var(--academy-bg-2);text-align:center}.academy-exam-summary b,.academy-exam-summary span{display:block}.academy-exam-summary span{margin-top:4px;color:var(--academy-muted);text-transform:uppercase}';
    document.head.appendChild(s);
  }

  const stageName=k=>({fundamentals:'BASE',modalities:'MODALIDADES',practice:'PRÁTICA',quiz:'QUIZ',math:'MATEMÁTICA DO POKER',sim:'SIMULADOR'}[k]||String(k||'').toUpperCase());
  const stageKey=k=>({fundamentals:'fundamentos',modalities:'modalidades',practice:'pratica',quiz:'pratica',math:'pratica',sim:'pratica'}[k]||'pratica');

  const loadBankScript=(name,version,test)=>{
    if(test())return Promise.resolve();
    return new Promise((resolve,reject)=>{
      const key='academy-bank-'+name.replace(/[^a-z0-9]/gi,'-');
      const existing=document.querySelector('script[data-bank-key="'+key+'"]');
      if(existing){
        if(test())return resolve();
        existing.addEventListener('load',()=>test()?resolve():reject(new Error('Banco não exposto: '+name)),{once:true});
        existing.addEventListener('error',reject,{once:true});
        return;
      }
      const s=document.createElement('script');s.dataset.bankKey=key;s.src='./'+name+'?v='+version;s.async=false;
      s.onload=()=>test()?resolve():reject(new Error('Banco não exposto: '+name));
      s.onerror=()=>reject(new Error('Não foi possível carregar '+name+'.'));
      document.body.appendChild(s);
    });
  };
  async function ensureStudyBanks(){
    await loadBankScript('fundamentals-interactive-bank.js',1,()=>!!window.StackupFundamentalsSpotBank);
    await loadBankScript('modalities-module.js',7,()=>!!window.StackupModalitiesSpotBank);
    await loadBankScript('mixed-games-module.js',8,()=>!!window.StackupMixedGamesSpotBank);
    await loadBankScript('practice-advanced-bank.js',2,()=>!!window.StackupPracticeAdvancedBank);
  }
  const normalizeQuestion=(q,source,skill)=>{
    if(!q||!Array.isArray(q.options)||q.options.length<2||Array.isArray(q.answer))return null;
    return {
      id:source+':'+String(q.id||Math.random()),
      question:q.question||q.prompt||'',
      options:[...q.options],
      answer:q.answer,
      source,skill
    };
  };
  async function generalQuestionBank(){
    await ensureStudyBanks();
    const out=[];
    Object.entries(window.StackupFundamentalsSpotBank||{}).forEach(([chapter,rows])=>{
      (rows||[]).forEach(q=>{const n=normalizeQuestion(q,'BASE',chapter);if(n)out.push(n)});
    });
    Object.entries(window.StackupModalitiesSpotBank||{}).forEach(([game,rows])=>{
      (rows||[]).forEach(q=>{const n=normalizeQuestion(q,'MODALIDADES',game);if(n)out.push(n)});
    });
    (window.StackupMixedGamesSpotBank||[]).forEach(q=>{const n=normalizeQuestion(q,'MODALIDADES','MIXED GAMES');if(n)out.push(n)});
    const adv=window.StackupPracticeAdvancedBank||{};
    (adv.quiz||[]).forEach(q=>{const n=normalizeQuestion(q,'QUIZ',q.topic||'QUIZ');if(n)out.push(n)});
    (adv.math||[]).forEach(q=>{const n=normalizeQuestion(q,'MATEMÁTICA',q.topic||'MATEMÁTICA');if(n)out.push(n)});
    const seen=new Set();
    return out.filter(q=>q.question&&q.answer!=null&&!seen.has(q.id)&&(seen.add(q.id),true));
  }
  const shuffle=a=>{const out=[...a];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out};

  function shell(title,description,body){
    const root=document.getElementById('root');if(!root)return;
    document.getElementById('navtools')?.classList.add('show');
    root.innerHTML='<section class="screen academy-stage-screen"><header class="academy-stage-intro"><div class="academy-stage-hero-grid"><div class="academy-kicker">'+t('advancedStudy','ESTUDO AVANÇADO')+'</div><h1 class="academy-title">'+esc(title)+'</h1><p class="academy-copy">'+esc(description)+'</p></div></header><section class="academy-group">'+body+'</section></section>';
  }

  function renderHub(){
    const body='<div class="academy-study-grid">'+
      card('smartReview','REVISÃO INTELIGENTE','Priorize as competências com menor aproveitamento.')+
      card('timedExam','SIMULADO CRONOMETRADO','20 questões sorteadas · 12 minutos.')+
      card('certificates','CERTIFICADOS','Critério: 80% da seção respondida com 80% de acertos.')+
      card('skillReport','RELATÓRIO POR COMPETÊNCIA','Compare as competências já treinadas, da mais fraca à mais forte.')+
    '</div>';
    shell(t('advancedStudy','ESTUDO AVANÇADO'),t('advancedStudyCopy','Use seus dados de treino para direcionar a próxima etapa.'),body);
  }
  function card(kind,title,description){
    return '<div class="academy-study-card"><strong>'+t(kind,title)+'</strong><span>'+description+'</span>'+C().SecondaryButton(t('open','ABRIR'),'data-study-kind="'+kind+'"')+'</div>';
  }

  function renderReview(){
    const E=window.EvolutionService?.snapshot?.()||{weakest:[]};
    const rows=E.weakest.length?E.weakest.map(s=>'<div class="academy-skill-row"><div class="academy-skill-head"><strong>'+stageName(s.key)+'</strong><b>'+s.accuracy+'%</b></div><small>'+s.correct+'/'+s.answered+' '+t('correct','acertos').toLowerCase()+' · '+s.xp+' XP</small>'+C().SecondaryButton(t('studyNow','ESTUDAR AGORA'),'data-review-stage="'+stageKey(s.key)+'"')+'</div>').join(''):'<div class="academy-state">'+t('reviewEmpty','Treine algumas questões para receber recomendações.')+'</div>';
    shell(t('smartReview','REVISÃO INTELIGENTE'),t('smartReviewCopy','As competências com menor aproveitamento aparecem primeiro.'),rows);
  }

  async function startExam(){
    shell(t('timedExam','SIMULADO CRONOMETRADO'),t('examPreparing','Preparando 20 questões sorteadas do Academy...'),'<div class="academy-state">'+t('loading','CARREGANDO...')+'</div>');
    try{
      const bank=await generalQuestionBank();
      const questions=shuffle(bank).slice(0,20);
      if(questions.length<20)throw new Error('Banco geral insuficiente para o simulado.');
      exam={questions,index:0,answers:{},startedAt:Date.now(),endsAt:Date.now()+12*60*1000,finished:false};
      renderExam();
    }catch(error){shell(t('timedExam','SIMULADO CRONOMETRADO'),'',C().ErrorState(error.message||'Não foi possível iniciar o simulado.'))}
  }

  function timeLeft(){
    if(!exam)return 0;
    return Math.max(0,Math.ceil((exam.endsAt-Date.now())/1000));
  }
  function clock(sec){const m=Math.floor(sec/60),s=sec%60;return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')}
  function armTimer(){
    clearInterval(timerId);
    timerId=setInterval(()=>{
      const node=document.querySelector('[data-exam-time]');const left=timeLeft();
      if(node)node.textContent=clock(left);
      if(left<=0){clearInterval(timerId);finishExam(true)}
    },1000);
  }
  function renderExam(){
    if(!exam||exam.finished)return renderExamResult();
    const q=exam.questions[exam.index],left=timeLeft();
    if(!q||left<=0)return finishExam(left<=0);
    const options=shuffle(q.options||[]).map(o=>C().SecondaryButton(esc(o),'data-exam-answer="'+encodeURIComponent(o)+'"')).join('');
    const body='<div class="academy-exam-meta"><strong>'+String(exam.index+1).padStart(2,'0')+' / '+exam.questions.length+'</strong><strong data-exam-time>'+clock(left)+'</strong></div><div class="academy-exam-question"><p>'+esc(q.question||q.prompt||'')+'</p><div class="academy-exam-options">'+options+'</div></div>';
    shell(t('timedExam','SIMULADO CRONOMETRADO'),t('examNoFeedback','Responda sem feedback imediato. O resultado aparece ao final.'),body);
    armTimer();
  }
  function answerExam(value){
    if(!exam||exam.finished)return;
    const q=exam.questions[exam.index];if(!q)return;
    exam.answers[q.id||String(exam.index)]={selected:value,correct:value===q.answer};
    exam.index++;
    if(exam.index>=exam.questions.length)finishExam(false);else renderExam();
  }
  function finishExam(timeout=false){
    if(!exam||exam.finished)return;
    clearInterval(timerId);exam.finished=true;exam.timeout=timeout;exam.finishedAt=Date.now();
    try{localStorage.setItem('academy.exam.last.v1',JSON.stringify(exam))}catch(_){}
    renderExamResult();
  }
  function renderExamResult(){
    if(!exam)return renderTimedExamIntro();
    const rows=Object.values(exam.answers||{}),correct=rows.filter(x=>x.correct).length,total=exam.questions?.length||20,answered=rows.length,acc=answered?Math.round(correct/answered*100):0;
    const body='<div class="academy-exam-summary"><div><b>'+answered+'/'+total+'</b><span>'+t('answeredShort','RESPONDIDAS')+'</span></div><div><b>'+correct+'</b><span>'+t('correct','ACERTOS')+'</span></div><div><b>'+acc+'%</b><span>'+t('accuracy','APROVEITAMENTO')+'</span></div></div>'+C().SecondaryButton(t('newExam','NOVO SIMULADO'),'data-start-exam');
    shell(t('examResult','RESULTADO DO SIMULADO'),exam.timeout?t('examTimeout','O tempo terminou. Veja o resultado das questões respondidas.'):t('examFinished','Simulado concluído.'),body);
  }
  function renderTimedExamIntro(){
    let last=null;try{last=JSON.parse(localStorage.getItem('academy.exam.last.v1')||'null')}catch(_){}
    const lastInfo=last?'<div class="academy-study-card"><strong>'+t('lastExam','ÚLTIMO SIMULADO')+'</strong><span>'+Object.keys(last.answers||{}).length+'/20 '+t('answeredShort','respondidas').toLowerCase()+'</span></div>':'';
    shell(t('timedExam','SIMULADO CRONOMETRADO'),t('timedExamCopy','20 questões sorteadas de todo o banco geral, com limite de 12 minutos.'),lastInfo+C().PrimaryButton(t('startExam','INICIAR SIMULADO'),'data-start-exam'));
  }

  function renderCertificates(){
    const S=window.ProgressService?.snapshot?.()||{sections:{}};
    const rows=['fundamentals','modalities','practice'].map(key=>{
      const s=S.sections?.[key]||{answered:0,correct:0,total:0,pct:0},accuracy=s.answered?Math.round(s.correct/s.answered*100):0,qualified=s.pct>=80&&accuracy>=80;
      return '<div class="academy-certificate"><strong>'+stageName(key)+'</strong><span>'+Math.round(s.pct||0)+'% '+t('progress','PROGRESSO').toLowerCase()+' · '+accuracy+'% '+t('accuracy','APROVEITAMENTO').toLowerCase()+'</span><span>'+(qualified?t('certificateEarned','CERTIFICADO CONQUISTADO'):t('certificateRule','Necessário 80% de progresso e 80% de acertos.'))+'</span></div>';
    }).join('');
    shell(t('certificates','CERTIFICADOS'),t('certificatesCopy','A conquista é liberada por seção ao atingir os dois critérios.'),'<div class="academy-study-grid">'+rows+'</div>');
  }

  function renderReport(){
    const E=window.EvolutionService?.snapshot?.()||{sections:{}};
    const rows=Object.entries(E.sections||{}).sort((a,b)=>a[1].accuracy-b[1].accuracy).map(([key,s])=>'<div class="academy-skill-row"><div class="academy-skill-head"><strong>'+stageName(key)+'</strong><b>'+s.accuracy+'%</b></div><small>'+s.answered+' '+t('answeredShort','respondidas').toLowerCase()+' · '+s.correct+' '+t('correct','acertos').toLowerCase()+' · '+s.xp+' XP</small></div>').join('');
    shell(t('skillReport','RELATÓRIO POR COMPETÊNCIA'),t('skillReportCopy','Competências ordenadas da menor para a maior taxa de acerto.'),rows||C().EmptyState());
  }

  function render(kind){
    clearInterval(timerId);
    if(kind==='smartReview')return renderReview();
    if(kind==='timedExam')return renderTimedExamIntro();
    if(kind==='certificates')return renderCertificates();
    if(kind==='skillReport')return renderReport();
    renderHub();
  }
  function open(kind='hub'){history.pushState({type:'academy-study-tool',kind},'','#study-'+kind);render(kind)}

  window.AcademyScreens=window.AcademyScreens||{};
  window.AcademyScreens.studyTool=open;

  document.addEventListener('click',e=>{
    const k=e.target.closest('[data-study-kind]');if(k){e.preventDefault();open(k.dataset.studyKind);return}
    const s=e.target.closest('[data-review-stage]');if(s){e.preventDefault();window.stage?.(s.dataset.reviewStage,1);return}
    if(e.target.closest('[data-start-exam]')){e.preventDefault();startExam();return}
    const a=e.target.closest('[data-exam-answer]');if(a){e.preventDefault();answerExam(decodeURIComponent(a.dataset.examAnswer));return}
  });
  window.addEventListener('popstate',e=>{if(e.state?.type==='academy-study-tool')render(e.state.kind||'hub')});
})();