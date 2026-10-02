(() => {
  const t=(k,f='')=>window.AcademyI18n?.t(k,f)||f||k;
  const C=()=>window.AcademyComponents;
  const esc=v=>window.AcademyDOM?.esc(v)||String(v??'');
  let exam=null,timerId=0,reviewSession=null;
  const REVIEW_KEY='academy.smart-review.v1';
  const safeParse=(raw,fallback={})=>{try{return JSON.parse(raw||'')||fallback}catch(_){return fallback}};
  const readLocal=key=>{try{return safeParse(localStorage.getItem(key),{})}catch(_){return {}}};

  if(!document.getElementById('academy-study-tools-style')){
    const s=document.createElement('style');s.id='academy-study-tools-style';
    s.textContent='.academy-study-grid{display:grid;gap:12px}.academy-study-card{padding:16px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface);text-align:left}.academy-study-card strong,.academy-study-card span{display:block}.academy-study-card span{margin-top:5px;color:var(--academy-muted)}.academy-study-card button{width:100%;margin-top:14px}.academy-skill-row{padding:14px 0;border-bottom:1px solid var(--academy-line)}.academy-skill-row:first-child{border-top:1px solid var(--academy-line)}.academy-skill-head{display:flex;justify-content:space-between;gap:12px}.academy-skill-row small{display:block;margin-top:4px;color:var(--academy-muted)}.academy-certificate{padding:20px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-lg);background:var(--academy-surface);text-align:center}.academy-certificate strong,.academy-certificate span{display:block}.academy-certificate span{margin-top:8px;color:var(--academy-muted)}.academy-exam-meta{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--academy-line)}.academy-exam-question{padding:20px 0}.academy-exam-question p{margin:0 0 14px;color:var(--academy-ivory);line-height:1.5}.academy-exam-options{display:grid;gap:10px}.academy-exam-options button{width:100%;text-align:left}.academy-exam-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--academy-line);border:1px solid var(--academy-line);margin-bottom:20px}.academy-exam-summary div{padding:14px 6px;background:var(--academy-bg-2);text-align:center}.academy-exam-summary b,.academy-exam-summary span{display:block}.academy-exam-summary span{margin-top:4px;color:var(--academy-muted);text-transform:uppercase}.academy-xp-timeline{margin-top:20px;border-top:1px solid var(--academy-line)}.academy-xp-day{display:grid;grid-template-columns:72px 1fr auto;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid var(--academy-line)}.academy-xp-day span{color:var(--academy-muted)}';
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
      analysis:q.analysis||q.why||'',
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
    (window.StackupMixedGamesSpotBank||[]).forEach(q=>{const n=normalizeQuestion(q,'MIXED','MIXED GAMES');if(n)out.push(n)});
    const adv=window.StackupPracticeAdvancedBank||{};
    (adv.quiz||[]).forEach(q=>{const n=normalizeQuestion(q,'QUIZ',q.topic||'QUIZ');if(n)out.push(n)});
    (adv.math||[]).forEach(q=>{const n=normalizeQuestion(q,'MATEMÁTICA',q.topic||'MATEMÁTICA');if(n)out.push(n)});
    const seen=new Set();
    return out.filter(q=>q.question&&q.answer!=null&&!seen.has(q.id)&&(seen.add(q.id),true));
  }
  const shuffle=a=>{const out=[...a];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out};
  const wrongQuestionIds=()=>{
    const ids=new Set();
    const f=readLocal('stackup-fundamentals-progress-v1');
    Object.values(f||{}).forEach(section=>Object.entries(section?.answers||{}).forEach(([id,a])=>{if(a?.correct===false)ids.add('BASE:'+id)}));
    const m=readLocal('stackup-modalities-progress-v1');
    Object.values(m||{}).forEach(section=>Object.entries(section?.answers||{}).forEach(([id,a])=>{if(a?.correct===false)ids.add('MODALIDADES:'+id)}));
    const mixed=readLocal('stackup-mixed-games-progress-v2');
    Object.entries(mixed?.answers||{}).forEach(([id,a])=>{if(a?.correct===false)ids.add('MIXED:'+id)});
    const adv=readLocal('stackup-practice-advanced-v2');
    for(const [mode,source] of [['quiz','QUIZ'],['math','MATEMÁTICA']]){
      Object.entries(adv?.[mode]?.results||{}).forEach(([id,ok])=>{if(ok===false)ids.add(source+':'+id)});
    }
    return ids;
  };
  const reviewStore=()=>readLocal(REVIEW_KEY);
  const saveReviewResult=(q,correct)=>{
    const store=reviewStore(),now=Date.now(),rec=store[q.id]||{attempts:[]};
    rec.source=q.source;rec.skill=q.skill;rec.attempts=Array.isArray(rec.attempts)?rec.attempts:[];
    rec.attempts.push({at:now,correct:!!correct});rec.attempts=rec.attempts.slice(-20);rec.lastAt=now;rec.lastCorrect=!!correct;
    store[q.id]=rec;try{localStorage.setItem(REVIEW_KEY,JSON.stringify(store))}catch(_){}
  };
  const reviewCandidates=bank=>{
    const wrong=wrongQuestionIds(),store=reviewStore(),now=Date.now(),day=86400000;
    return bank.filter(q=>{
      const rec=store[q.id],baseWrong=wrong.has(q.id);
      if(!rec)return baseWrong;
      const due=Number(rec.lastAt||0)+(rec.lastCorrect?7*day:day);
      return baseWrong&&now>=due;
    });
  };


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

  async function renderReview(){
    shell(t('smartReview','REVISÃO INTELIGENTE'),t('smartReviewCopy','As questões erradas retornam em ciclos de reforço.'),'<div class="academy-state">'+t('loading','CARREGANDO...')+'</div>');
    try{
      const bank=await generalQuestionBank(),due=reviewCandidates(bank);
      if(!due.length){
        const E=window.EvolutionService?.snapshot?.()||{weakest:[]};
        const rows=E.weakest.length?E.weakest.map(s=>'<div class="academy-skill-row"><div class="academy-skill-head"><strong>'+stageName(s.key)+'</strong><b>'+s.accuracy+'%</b></div><small>'+s.correct+'/'+s.answered+' '+t('correct','acertos').toLowerCase()+' · '+s.xp+' XP</small>'+C().SecondaryButton(t('studyNow','ESTUDAR AGORA'),'data-review-stage="'+stageKey(s.key)+'"')+'</div>').join(''):'<div class="academy-state">'+t('reviewEmpty','Nenhuma revisão pendente. Continue treinando para gerar novas recomendações.')+'</div>';
        shell(t('smartReview','REVISÃO INTELIGENTE'),t('reviewClear','Nenhuma questão errada está pendente para revisão agora.'),rows);
        return;
      }
      reviewSession={questions:shuffle(due).slice(0,10),index:0,correct:0,answered:0,feedback:null};
      renderReviewQuestion();
    }catch(error){shell(t('smartReview','REVISÃO INTELIGENTE'),'',C().ErrorState(error?.message||t('reviewLoadError','Não foi possível preparar a revisão.')))}
  }
  function renderReviewQuestion(){
    if(!reviewSession)return renderReview();
    if(reviewSession.index>=reviewSession.questions.length){
      const total=reviewSession.questions.length,correct=reviewSession.correct;
      const body='<div class="academy-exam-summary"><div><b>'+total+'</b><span>'+t('reviewed','REVISADAS')+'</span></div><div><b>'+correct+'</b><span>'+t('correct','ACERTOS')+'</span></div><div><b>'+(total?Math.round(correct/total*100):0)+'%</b><span>'+t('accuracy','APROVEITAMENTO')+'</span></div></div>'+C().SecondaryButton(t('reviewAgain','REVISAR NOVAMENTE'),'data-study-kind="smartReview"');
      shell(t('reviewResult','RESULTADO DA REVISÃO'),t('reviewSchedule','Acertos voltam em 7 dias; erros voltam a partir de amanhã.'),body);
      return;
    }
    const q=reviewSession.questions[reviewSession.index],feedback=reviewSession.feedback;
    const options=(q.options||[]).map(o=>{
      const encoded=encodeURIComponent(o),disabled=feedback?'disabled':'';
      let extra='';
      if(feedback){if(o===q.answer)extra=' data-review-correct="1"';else if(o===feedback.selected)extra=' data-review-wrong="1"'}
      return '<button type="button" class="academy-secondary" data-review-answer="'+encoded+'" '+disabled+extra+'>'+esc(o)+'</button>';
    }).join('');
    const note=feedback?'<div class="academy-study-card"><strong>'+(feedback.correct?t('correct','ACERTO'):t('review','REVISAR'))+'</strong><span>'+esc(q.analysis||'')+'</span></div>':'';
    const next=feedback?C().PrimaryButton(reviewSession.index===reviewSession.questions.length-1?t('finish','FINALIZAR'):t('next','PRÓXIMO'),'data-review-next'):'';
    const body='<div class="academy-exam-meta"><strong>'+String(reviewSession.index+1).padStart(2,'0')+' / '+reviewSession.questions.length+'</strong><strong>'+esc(q.skill||q.source)+'</strong></div><div class="academy-exam-question"><p>'+esc(q.question)+'</p><div class="academy-exam-options">'+options+'</div></div>'+note+next;
    shell(t('smartReview','REVISÃO INTELIGENTE'),t('reviewQuestionCopy','Reforce apenas questões que já apresentaram erro.'),body);
  }
  function answerReview(value){
    if(!reviewSession||reviewSession.feedback)return;
    const q=reviewSession.questions[reviewSession.index];if(!q)return;
    const correct=value===q.answer;reviewSession.answered++;if(correct)reviewSession.correct++;
    saveReviewResult(q,correct);reviewSession.feedback={selected:value,correct};renderReviewQuestion();
  }
  function nextReview(){
    if(!reviewSession?.feedback)return;
    reviewSession.index++;reviewSession.feedback=null;renderReviewQuestion();
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
      return '<div class="academy-certificate"><strong>'+stageName(key)+'</strong><span>'+Math.round(s.pct||0)+'% '+t('progress','PROGRESSO').toLowerCase()+' · '+accuracy+'% '+t('accuracy','APROVEITAMENTO').toLowerCase()+'</span><span>'+(qualified?t('certificateEarned','CERTIFICADO CONQUISTADO'):t('certificateRule','Necessário 80% de progresso e 80% de acertos.'))+'</span>'+(qualified?C().SecondaryButton(t('viewCertificate','VER CERTIFICADO'),'data-certificate-stage="'+key+'"'):'')+'</div>';
    }).join('');
    shell(t('certificates','CERTIFICADOS'),t('certificatesCopy','A conquista é liberada por seção ao atingir os dois critérios.'),'<div class="academy-study-grid">'+rows+'</div>');
  }
  function renderCertificateDetail(key){
    const S=window.ProgressService?.snapshot?.()||{sections:{}},s=S.sections?.[key]||{answered:0,correct:0,pct:0};
    const accuracy=s.answered?Math.round(s.correct/s.answered*100):0;
    if(!(s.pct>=80&&accuracy>=80))return renderCertificates();
    const user=window.AuthService?.getCurrentUser?.(),name=String(user?.user_metadata?.full_name||user?.user_metadata?.name||user?.email?.split('@')?.[0]||t('player','JOGADOR')).toUpperCase();
    const section=stageName(key),date=new Date().toLocaleDateString(window.AcademyI18n?.lang?.()||'pt-BR');
    const template=t('certificateText',"certifica que {n} concluiu a seção {s} do StackUp Hold'em Academy com {p}% de acertos em {q} questões.")
      .replace('{n}',name).replace('{s}',section).replace('{p}',String(accuracy)).replace('{q}',String(s.answered||0));
    const body='<div class="academy-certificate"><span>STACKUP HOLD\'EM ACADEMY</span><strong>'+t('certificateOf','CERTIFICADO')+' · '+section+'</strong><span>'+esc(template)+'</span><span>'+t('issuedOn','EMITIDO EM')+' · '+date+'</span></div>';
    shell(t('certificateOf','CERTIFICADO'),section,body);
  }

  function renderReport(){
    const E=window.EvolutionService?.snapshot?.()||{sections:{},comparison:{},log:{}};
    const rows=Object.entries(E.sections||{}).sort((a,b)=>a[1].accuracy-b[1].accuracy).map(([key,s])=>{
      const base=E.comparison?.[key],first=base?.firstPct??s.accuracy,current=base?.lastPct??s.accuracy,delta=current-first;
      return '<div class="academy-skill-row"><div class="academy-skill-head"><strong>'+stageName(key)+'</strong><b>'+current+'%</b></div><small>'+t('firstAttempt','1ª TENTATIVA')+' '+first+'% → '+t('currentPerformance','ATUAL')+' '+current+'% · '+(delta>=0?'+':'')+delta+' pp · '+s.xp+' XP</small></div>';
    }).join('');
    const days=Object.entries(E.log||{}).sort((a,b)=>a[0].localeCompare(b[0])).slice(-14);
    const timeline=days.length?'<div class="academy-xp-timeline"><div class="academy-kicker" style="padding:12px 0 2px">'+t('xpTimeline','XP AO LONGO DOS DIAS')+'</div>'+days.map(([day,xp])=>'<div class="academy-xp-day"><span>'+day.slice(8,10)+'/'+day.slice(5,7)+'</span><div>'+C().LearningProgress(Math.min(100,E.xp?Math.round(Number(xp)/E.xp*100):0))+'</div><b>'+xp+' XP</b></div>').join('')+'</div>':'';
    shell(t('skillReport','RELATÓRIO POR COMPETÊNCIA'),t('skillReportCopy','Competências ordenadas da menor para a maior taxa de acerto.'),(rows||C().EmptyState())+timeline);
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
    const ra=e.target.closest('[data-review-answer]');if(ra){e.preventDefault();answerReview(decodeURIComponent(ra.dataset.reviewAnswer));return}
    if(e.target.closest('[data-review-next]')){e.preventDefault();nextReview();return}
    const cert=e.target.closest('[data-certificate-stage]');if(cert){e.preventDefault();renderCertificateDetail(cert.dataset.certificateStage);return}
    if(e.target.closest('[data-start-exam]')){e.preventDefault();startExam();return}
    const a=e.target.closest('[data-exam-answer]');if(a){e.preventDefault();answerExam(decodeURIComponent(a.dataset.examAnswer));return}
  });
  window.addEventListener('popstate',e=>{if(e.state?.type==='academy-study-tool')render(e.state.kind||'hub')});
})();