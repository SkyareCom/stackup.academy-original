const fs=require('fs');
const assert=require('node:assert/strict');

const theme=fs.readFileSync('src/theme/academy-theme.js','utf8');
const components=fs.readFileSync('src/components/academy-components.js','utf8');
const home=fs.readFileSync('src/screens/home-screen.js','utf8');
const stage=fs.readFileSync('src/screens/stage-screen.js','utf8');
const profile=fs.readFileSync('src/screens/profile-screen.js','utf8');
const practice=fs.readFileSync('src/screens/practice-tools-screen.js','utf8');

assert(theme.includes('background:var(--academy-surface)!important'),'functional training surfaces must remain dark');
assert(theme.includes('#root .fi-spot')&&theme.includes('#root .m2-spot')&&theme.includes('#root .p3x-quiz-banner'),'quiz/simulator blocks must use the dark normalization layer');
assert(theme.includes('min-height:44px')||components.includes('min-height:44px'),'interactive controls must keep a touch-friendly minimum');
assert(components.includes('.academy-row{width:100%;display:flex;align-items:center;gap:12px;padding:16px 0'),'editorial rows must share 12px gap and 16px vertical padding');
assert(home.includes('.academy-home-section{padding:20px 0 0}'),'Home sections must use the 20px rhythm');
assert(stage.includes('.academy-practice-card{min-height:152px'),'Practice cards must have equal structural height');
assert(stage.includes('text-align:center'),'Practice/menu content must remain centered');
assert(profile.includes('.academy-plan-grid{display:grid;gap:12px}'),'plan cards must keep 12px separation');
assert(profile.includes('.academy-ecosystem{display:grid;gap:12px}'),'ecosystem cards must keep 12px separation');
assert(practice.includes('.academy-history-row{min-height:68px;padding:14px 0'),'history rows must keep consistent geometry');
assert(!stage.includes("action:key==='pratica'"),'Practice-specific hero content must not shift the stage title');

console.log('Academy layout quality OK: dark surfaces, consistent spacing, equal cards and fixed header alignment.');
