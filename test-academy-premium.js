const fs=require('fs');
const path=require('path');
const assert=(name,ok)=>{if(!ok){console.error('FAIL:',name);process.exitCode=1}else console.log('PASS:',name)};

const read=p=>fs.readFileSync(path.join(__dirname,p),'utf8');
const exists=p=>fs.existsSync(path.join(__dirname,p));
const theme=read('src/theme/academy-theme.js');
const copy=read('src/i18n/academy-copy.js');
const components=read('src/components/academy-components.js');
const home=read('src/screens/home-screen.js');
const stage=read('src/screens/stage-screen.js');
const profile=read('src/screens/profile-screen.js');
const tools=read('src/screens/practice-tools-screen.js');
const nav=read('src/navigation/bottom-navigation.js');
const progress=read('src/services/progress-service.js');
const trainingPref=read('src/services/training-preference-service.js');
const trainingHistory=read('src/services/training-history-service.js');
const evolution=read('src/services/evolution-service.js');
const planAccess=read('src/services/plan-access-service.js');
const study=read('src/screens/study-tools-screen.js');
const privacy=read('privacy.html');
const auth=read('src/services/auth-service.js');
const billing=read('src/services/billing-service.js');
const content=read('src/services/content-service.js');
const analytics=read('src/services/analytics-service.js');
const reset=read('session-reset.js');
const advanced=read('practice-advanced.js');
const photos=read('src/assets/PHOTO-SOURCES.md');
const index=read('index.html');

for(const dir of ['theme','components','screens','navigation','content','i18n','services','hooks','utils','assets']){
  assert('src/'+dir+' exists',exists('src/'+dir));
}
assert('exact Academy backgrounds',theme.includes("primary:'#070707'")&&theme.includes("secondary:'#0C0C0C'")&&theme.includes("tertiary:'#151515'"));
assert('exact Academy surfaces',theme.includes("one:'#1A1A1A'")&&theme.includes("two:'#202020'")&&theme.includes("three:'#282828'"));
assert('exact Academy ivory and white',theme.includes("one:'#F2EDE2'")&&theme.includes("two:'#F7F3EB'")&&theme.includes("white:'#FAF7F0'"));
assert('semantic colors',theme.includes("success:'#82917F'")&&theme.includes("warning:'#B39B72'")&&theme.includes("danger:'#956A66'"));
assert('Saira Semi Condensed only for Academy UI',index.includes('family=Saira+Semi+Condensed')&&!index.includes('Cormorant+Garamond')&&!index.includes('Love+Ya+Like+A+Sister')&&index.includes('wght@400;600')&&!index.includes('wght@500')&&!index.includes('wght@700')&&!index.includes('wght@800')&&!index.includes('wght@900'));
assert('Portuguese premium copy is primary',copy.includes("continueLearning:'CONTINUAR APRENDENDO'")&&copy.includes("trainingLab:'LABORATÓRIO DE TREINO'")&&copy.includes("mathPoker:'MATEMÁTICA DO POKER'"));
assert('plan access service loads before Premium screens',index.includes('src/services/plan-access-service.js?v=1')&&index.indexOf('src/services/plan-access-service.js')<index.indexOf('src/screens/stage-screen.js'));
assert('advanced study script loads once',(index.match(/src\/screens\/study-tools-screen\.js/g)||[]).length===1);
assert('PT-BR and EN-US copy',copy.includes("'pt-BR'")&&copy.includes("'en-US'"));
for(const name of ['AcademyBackground','AcademyHeader','EditorialHero','LearningProgress','CourseSection','LessonRow','PrimaryButton','SecondaryButton','QuizOption','QuizProgress','EvolutionMetric','WeeklyGoal','SectionDivider','BottomNavigation','Modal','BottomSheet','LoadingState','EmptyState','ErrorState']){
  assert('component '+name,components.includes(name));
}
assert('villain is first attempt and hero is current',evolution.includes('firstPct')&&evolution.includes('lastPct')&&evolution.includes('villainXp')&&evolution.includes('heroXp')&&home.includes("firstAttempt")&&home.includes("currentPerformance"));
assert('evolution podium is previous current next category',evolution.includes('previous:previous?')&&evolution.includes('current:{name:current[1]')&&home.includes('E.podium?.previous')&&home.includes('E.podium?.next'));
assert('Premium habit has 30 50 100 goals and weekly shield',progress.includes('[30,50,100]')&&progress.includes('shieldDaysUsed')&&components.includes('streakShield'));
assert('Premium Free uses fixed five-question fundamentals',planAccess.includes('FREE_LIMIT=5')&&read('fundamentals-interactive.js').includes('fixedQuestionLimit')&&read('fundamentals-interactive.js').includes('chapterBank')&&read('fundamentals-interactive.js').includes('if(freeMode())return [...spots]'));
assert('Premium access rules stay prepared while test access remains open',planAccess.includes('TEST_ACCESS=true')&&planAccess.includes('FREE_LIMIT=5')&&planAccess.includes('FREE_FUNDAMENTALS'));
assert('Premium report ranks real competencies',study.includes('competencyReport')&&study.includes('weightedAccuracy')&&study.includes('persistentErrors')&&study.includes('repeatedErrors')&&study.includes('data-competency-review'));
assert('Premium smart review keeps spaced repetition',study.includes('REVIEW_INTERVAL_DAYS=[0,1,2,4,8,16]')&&study.includes('dueAt')&&study.includes('reviewBox'));
assert('Premium report compares first attempt to current and keeps XP timeline',study.includes('E.comparison')&&study.includes('xpTimeline'));
assert('Premium history replays exact saved question sets',trainingHistory.includes('changedQuestionIds')&&trainingHistory.includes('questionIds:mergeIds([],questionIds)')&&study.includes('startHistoryRetrain')&&study.includes('data-history-retrain-answer'));
assert('Premium history supports retrain and per-session delete',tools.includes('data-history-retrain')&&tools.includes('data-history-delete'));
assert('Premium supports automatic and manual history saving',trainingPref.includes("historyMode")&&trainingPref.includes("DRAFT_KEY='academy.hist.draft.v1'")&&profile.includes('data-history-mode="auto"')&&profile.includes('data-history-mode="manual"'));
assert('Premium manual history has working save and discard controls',trainingHistory.includes('savePending')&&trainingHistory.includes('discardPending')&&tools.includes("savePending?.()")&&tools.includes("discardPending?.()"));
assert('Premium training preference loads before history service',index.indexOf('src/services/training-preference-service.js')<index.indexOf('src/services/training-history-service.js'));
assert('Premium privacy has no legacy green or handwritten font',!privacy.includes('#0e4b3b')&&!privacy.includes('Love+Ya+Like+A+Sister')&&privacy.includes('Saira+Semi+Condensed'));
assert('premium evolution is completed without replacing Home shell',home.includes('academy-home-hero')&&home.includes('EvolutionService')&&home.includes('villainMe')&&home.includes('podium')&&progress.includes('setWeeklyGoal')&&progress.includes('[30,50,100]'));
assert('Premium Profile exposes access data without requiring login',profile.includes('accessSection')&&profile.includes("directAccess")&&profile.includes('data-profile-signout'));
assert('premium Profile includes Coach and privacy completion',profile.includes('academy.coach.v1')&&profile.includes('data-profile-clear-local')&&profile.includes('data-profile-delete-account'));
assert('premium certificates are consultable',read('src/screens/study-tools-screen.js').includes('data-certificate-stage')&&read('src/screens/study-tools-screen.js').includes('renderCertificateDetail'));
assert('home is editorial and progress-aware',home.includes('academy-home-hero')&&home.includes('ProgressService')&&home.includes('WeeklyGoal'));
assert('BASE uses editorial groups',stage.includes('AcademyCourseMap')&&stage.includes('academy-group-list'));
assert('Practice tools use real progress',tools.includes('ProgressService')&&tools.includes("personalRanking"));
assert('12px-only hierarchy',read('typography-standard.js').includes('--type-brand:12px')&&read('typography-standard.js').includes('--type-caption:12px'));
assert('card and section titles uppercase',read('typography-standard.js').includes('.academy-row-copy strong')&&read('typography-standard.js').includes('text-transform:uppercase!important'));
assert('stage header content cannot shift vertically',stage.includes('academy-stage-hero-grid')&&stage.includes('grid-template-rows:18px 18px 54px')&&!stage.includes("action:key==='pratica'"));
assert('Base Modalidades Practice use photo headers',stage.includes("key==='fundamentos'?window.academyTheme?.backgrounds?.base")&&stage.includes("key==='modalidades'?")&&stage.includes("key==='pratica'?"));
assert('Profile header matches stage height',profile.includes('height:176px;min-height:176px;max-height:176px'));
assert('Premium footer supports top-level swipe only',nav.includes('touchstart')&&nav.includes('touchmove')&&nav.includes('touchend')&&nav.includes('topLevelKey')&&nav.includes("st.type==='academy-profile'")&&nav.includes("st.type==='stage'"));
assert('bottom nav is five-column single-line',nav.includes('repeat(5,minmax(0,1fr))')&&nav.includes('white-space:nowrap'));
assert('profile exposes Academy commercial plans',billing.includes("name:'FREE'")&&billing.includes("name:'MENSAL'")&&billing.includes("R$ 39,90")&&billing.includes("name:'SEMESTRAL'")&&billing.includes("R$ 179,90")&&billing.includes("name:'ANUAL'")&&billing.includes("R$ 229,90")&&billing.includes("name:'COACH PLUS'")&&billing.includes("R$ 34,90"));
assert('interaction analytics are wired without UI changes',read('src/hooks/academy-events.js').includes('study_tool_open')&&read('src/hooks/academy-events.js').includes('history_retrain')&&read('src/services/progress-service.js').includes('training_progress'));
assert('local analytics queue is capped and device-only',analytics.includes("KEY='academy.events.v1'")&&analytics.includes('LIMIT=1000')&&analytics.includes('localStorage.setItem')&&!analytics.includes('fetch('));
assert('local data reset clears analytics queue',profile.includes("'academy.events.v1'"));
assert('service interfaces exist',auth.includes('AuthService')&&progress.includes('ProgressService')&&content.includes('ContentService')&&analytics.includes('AnalyticsService')&&billing.includes('BillingService'));
assert('progress is not auto-deleted',reset.includes('CLEAR_ACADEMY_PROGRESS')&&!reset.includes('visibilitychange')&&!reset.includes('pagehide'));
assert('NLH spelling is normalized',advanced.includes("key:'NLH'")&&!/\bHNL\b/.test(advanced));
assert('real photos documented',photos.includes('Unsplash')&&photos.includes('images.unsplash.com/photo-'));
const banned=['#0e4b3b','#08372d','#211008','#2a160d','#d4aa58','#a87c32'];
for(const file of ['fundamentals-interactive.js','modalities-module.js','practice-module.js','practice-advanced.js']){
  const src=read(file).toLowerCase();
  assert(file+' has no legacy dominant palette',!banned.some(c=>src.includes(c)));
}
if(process.exitCode)process.exit(process.exitCode);
console.log('Academy premium frontend guard OK');
