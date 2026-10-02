const fs=require('fs');
const assert=require('node:assert/strict');

const theme=fs.readFileSync('src/theme/academy-theme.js','utf8');
const typography=fs.readFileSync('typography-standard.js','utf8');
const stage=fs.readFileSync('src/screens/stage-screen.js','utf8');
const profile=fs.readFileSync('src/screens/profile-screen.js','utf8');
const nav=fs.readFileSync('src/navigation/bottom-navigation.js','utf8');
const visual=fs.readFileSync('academy-visual-system.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');

assert(theme.includes('--academy-layout-x:16px'),'screen horizontal margin must be 16px');
assert(theme.includes('--academy-section-gap:20px'),'section gap must be 20px');
assert(theme.includes('--academy-control-gap:12px'),'control/card gap must be 12px');
assert(theme.includes('--academy-panel-pad:16px'),'functional panel padding must be 16px');
assert(typography.includes('--type-brand:12px')&&typography.includes('--type-caption:12px'),'all typography tokens must stay 12px');
assert(typography.includes('font-weight:400!important')&&typography.includes('font-weight:600!important'),'hierarchy must use 400/600');
assert(stage.includes('height:176px;min-height:176px;max-height:176px'),'stage hero geometry must be fixed at 176px');
assert(stage.includes('grid-template-rows:18px 18px 54px'),'stage kicker/title/copy slots must be fixed');
assert(stage.includes('academy-practice-grid')&&stage.includes('repeat(2,minmax(0,1fr))'),'Practice must be four cards in 2x2 grid');
assert(stage.includes('SIMULADOR')&&stage.includes('QUIZ')&&stage.includes('MATEMÁTICA DO POKER')&&stage.includes('HISTÓRICO'),'Practice four-card content must be present');
assert(profile.includes('height:176px;min-height:176px;max-height:176px'),'Profile header must share the structural height');
assert(nav.includes('repeat(5,minmax(0,1fr))')&&nav.includes('white-space:nowrap'),'footer must stay five columns in one row');
assert(visual.includes('overflow-x:hidden'),'horizontal overflow must remain blocked');
assert(sw.includes('training-history-service.js')&&sw.includes('study-tools-screen.js'),'migrated runtime modules must be cached');

console.log('Academy layout contract OK: 16/20/12/16 rhythm, 12px type, fixed stage headers and Practice 2x2.');
