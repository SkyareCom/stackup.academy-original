const fs=require('fs');
const assert=(name,ok)=>{
  if(!ok){console.error(`FAIL: ${name}`);process.exitCode=1;}
  else console.log(`PASS: ${name}`);
};

const index=fs.readFileSync('index.html','utf8');
const typography=fs.readFileSync('typography-standard.js','utf8');
const visual=fs.readFileSync('academy-visual-system.js','utf8');
const theme=fs.readFileSync('src/theme/academy-theme.js','utf8');
const components=fs.readFileSync('src/components/academy-components.js','utf8');
const bottomNav=fs.readFileSync('src/navigation/bottom-navigation.js','utf8');
const academyCopy=fs.readFileSync('src/i18n/academy-copy.js','utf8');
const stageScreen=fs.readFileSync('src/screens/stage-screen.js','utf8');
const profileScreen=fs.readFileSync('src/screens/profile-screen.js','utf8');
const billing=fs.readFileSync('src/services/billing-service.js','utf8');
const languageSelector=fs.readFileSync('language-selector.js','utf8');
const reset=fs.readFileSync('session-reset.js','utf8');
const topReset=fs.readFileSync('page-top-reset.js','utf8');
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));
const androidGradle=fs.readFileSync('android/app/build.gradle.kts','utf8');
const androidManifest=fs.readFileSync('android/app/src/main/AndroidManifest.xml','utf8');

assert('Saira Semi Condensed font import exists',index.includes('family=Saira+Semi+Condensed'));
assert('global font lock uses Saira Semi Condensed',typography.includes("font-family:'Saira Semi Condensed'"));
assert('legacy display fonts are removed',!typography.includes('Cormorant')&&!typography.includes('Love Ya Like A Sister'));
assert('typography is 12px everywhere',typography.includes('--type-screen:12px')&&typography.includes('--type-body:12px')&&typography.includes('--type-caption:12px')&&typography.includes('#root *'));
assert('horizontal overflow is blocked globally',visual.includes('overflow-x:hidden'));
assert('Academy exact background token exists',theme.includes("primary:'#070707'")&&theme.includes("secondary:'#0C0C0C'"));
assert('Academy exact ivory token exists',theme.includes("one:'#F2EDE2'")&&theme.includes("two:'#F7F3EB'"));
assert('Academy semantic tokens exist',theme.includes("success:'#82917F'")&&theme.includes("warning:'#B39B72'")&&theme.includes("danger:'#956A66'"));
assert('Portuguese is primary',academyCopy.includes("continueLearning:'CONTINUAR APRENDENDO'")&&academyCopy.includes("trainingLab:'LABORATÓRIO DE TREINO'")&&languageSelector.includes("==='en-US'?'en-US':'pt-BR'"));
assert('stage titles have fixed vertical slots',stageScreen.includes('academy-stage-hero-grid')&&stageScreen.includes('grid-template-rows:18px 18px 54px')&&!stageScreen.includes("action:key==='pratica'"));
assert('section starts share one structure',stageScreen.includes('min-height:176px')&&profileScreen.includes('min-height:176px')&&stageScreen.includes('academy-section-intro')&&profileScreen.includes('academy-section-intro'));
assert('all three learning stages use photo headers',stageScreen.includes("key==='fundamentos'?window.academyTheme?.backgrounds?.base")&&stageScreen.includes("key==='modalidades'?")&&stageScreen.includes("key==='pratica'?"));
assert('Profile keeps the same header height',profileScreen.includes('height:176px;min-height:176px;max-height:176px'));
assert('Academy commercial plans are correct',billing.includes("id:'monthly'")&&billing.includes("R$ 39,90")&&billing.includes("id:'semiannual'")&&billing.includes("R$ 179,90")&&billing.includes("id:'annual'")&&billing.includes("R$ 229,90")&&billing.includes("R$ 34,90"));
assert('training surfaces are darkened',theme.includes('.p3x-quiz-banner')&&theme.includes('.fi-spot')&&theme.includes('background:var(--academy-surface)!important'));
assert('bottom navigation has five columns',bottomNav.includes('grid-template-columns:repeat(5,minmax(0,1fr))'));
assert('premium components expose AcademyBackground',components.includes('AcademyBackground')&&components.includes('WeeklyGoal')&&components.includes('BottomSheet'));
assert('progress reset is explicit only',reset.includes('CLEAR_ACADEMY_PROGRESS')&&!reset.includes('visibilitychange'));
assert('header-first navigation is enforced',topReset.includes('resetToHeader')&&topReset.includes('scrollIntoView')&&topReset.includes('[data-academy-lesson]')&&topReset.includes('[data-academy-nav]'));
assert('header reset survives delayed rendering',topReset.includes('1450')&&topReset.includes('MutationObserver'));
assert('web app is standalone',manifest.display==='standalone');
assert('web app stays portrait-first',manifest.orientation==='portrait-primary');
assert('web theme is Academy black',String(manifest.theme_color).toLowerCase()==='#070707');
assert('Android application id is stable',androidGradle.includes('applicationId = "com.skyare.stackupacademy"'));
assert('Android targets API 36',androidGradle.includes('targetSdk = 36')&&androidGradle.includes('compileSdk = 36'));
assert('Android blocks cleartext traffic',androidManifest.includes('android:usesCleartextTraffic="false"'));
assert('Android opens the Academy HTTPS host',androidManifest.includes('android:host="skyarecom.github.io"')&&androidManifest.includes('android:pathPrefix="/stackup.holdem-academy/"'));

if(process.exitCode)process.exit(process.exitCode);
console.log('Play release UI guard OK');
