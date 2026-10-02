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
const studyTools=read('src/screens/study-tools-screen.js');
const nav=read('src/navigation/bottom-navigation.js');
const progress=read('src/services/progress-service.js');
const auth=read('src/services/auth-service.js');
const billing=read('src/services/billing-service.js');
const content=read('src/services/content-service.js');
const analytics=read('src/services/analytics-service.js');
const historyService=read('src/services/training-history-service.js');
const evolutionService=read('src/services/evolution-service.js');
const authProduction=read('auth-production.js');
const billingProduction=read('billing-production.js');
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
assert('PT-BR and EN-US copy',copy.includes("'pt-BR'")&&copy.includes("'en-US'"));
for(const name of ['AcademyBackground','AcademyHeader','EditorialHero','LearningProgress','CourseSection','LessonRow','PrimaryButton','SecondaryButton','QuizOption','QuizProgress','EvolutionMetric','WeeklyGoal','SectionDivider','BottomNavigation','Modal','BottomSheet','LoadingState','EmptyState','ErrorState']){
  assert('component '+name,components.includes(name));
}
assert('home is editorial and progress-aware',home.includes('academy-home-hero')&&home.includes('ProgressService')&&home.includes('WeeklyGoal'));
assert('BASE uses editorial groups',stage.includes('AcademyCourseMap')&&stage.includes('academy-group-list'));
assert('Practice uses latest four-card 2x2 layout',stage.includes('academy-practice-grid')&&stage.includes('repeat(2,minmax(0,1fr))')&&stage.includes("data-practice-tool=\"history\""));
assert('advanced study tools are ported',studyTools.includes('SIMULADO CRONOMETRADO')&&studyTools.includes('REVISÃO INTELIGENTE')&&studyTools.includes('CERTIFICADOS')&&studyTools.includes('RELATÓRIO POR COMPETÊNCIA')&&home.includes('data-home-study'));
assert('Practice history is session-based',tools.includes('TrainingHistoryService')&&historyService.includes("KEY='academy.hist.v1'")&&historyService.includes('recordStorageChange'));
assert('12px-only hierarchy',read('typography-standard.js').includes('--type-brand:12px')&&read('typography-standard.js').includes('--type-caption:12px'));
assert('card and section titles uppercase',read('typography-standard.js').includes('.academy-row-copy strong')&&read('typography-standard.js').includes('text-transform:uppercase!important'));
assert('stage header content cannot shift vertically',stage.includes('academy-stage-hero-grid')&&stage.includes('grid-template-rows:18px 18px 54px')&&!stage.includes("action:key==='pratica'"));
assert('Base Modalidades Practice use photo headers',stage.includes("key==='fundamentos'?window.academyTheme?.backgrounds?.base")&&stage.includes("key==='modalidades'?")&&stage.includes("key==='pratica'?"));
assert('Profile header matches stage height',profile.includes('height:176px;min-height:176px;max-height:176px'));
assert('bottom nav is five-column single-line',nav.includes('repeat(5,minmax(0,1fr))')&&nav.includes('white-space:nowrap'));
assert('profile exposes Academy commercial plans',billing.includes("name:'FREE'")&&billing.includes("name:'MENSAL'")&&billing.includes("R$ 39,90")&&billing.includes("name:'SEMESTRAL'")&&billing.includes("R$ 179,90")&&billing.includes("name:'ANUAL'")&&billing.includes("R$ 229,90")&&billing.includes("name:'COACH PLUS'")&&billing.includes("R$ 34,90"));
assert('service interfaces exist',auth.includes('AuthService')&&progress.includes('ProgressService')&&content.includes('ContentService')&&analytics.includes('AnalyticsService')&&billing.includes('BillingService'));
assert('production auth bridge is optional and native-aware',authProduction.includes('StackUpProductionAuth')&&authProduction.includes('requestGoogleSignIn')&&authProduction.includes('requestBiometricUnlock'));
assert('production billing bridge is native-aware',billingProduction.includes('StackUpBilling')&&billingProduction.includes('academy:billingchange')&&billing.includes('requestSubscription'));
assert('production evolution weights are preserved',evolutionService.includes('fundamentals:10')&&evolutionService.includes('modalities:15')&&evolutionService.includes('quiz:20')&&evolutionService.includes('math:25')&&evolutionService.includes('sim:30'));
assert('Profile marks ecosystem apps coming soon',profile.includes('GRINDER')&&profile.includes('HEROES')&&profile.includes('REVOLUTION')&&profile.includes('WRAPS')&&profile.includes('D ACTION')&&profile.includes("comingSoon"));
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
