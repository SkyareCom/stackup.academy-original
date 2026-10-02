const fs=require('fs');
const path=require('path');
const typography=fs.readFileSync('typography-standard.js','utf8');
const index=fs.readFileSync('index.html','utf8');
const copy=fs.readFileSync('src/i18n/academy-copy.js','utf8');

const fail=msg=>{console.error('FAIL: '+msg);process.exit(1)};

if(!typography.includes("font-family:'Saira Semi Condensed'"))fail('Academy Saira Semi Condensed font lock is missing');
if(!index.includes('family=Saira+Semi+Condensed:wght@400;600'))fail('Saira Semi Condensed must load only weights 400 and 600');
if(index.includes('wght@700')||index.includes('wght@500')||index.includes('wght@800')||index.includes('wght@900'))fail('unsupported Saira font weights imported');
if(typography.includes('Love Ya Like A Sister')||typography.includes('Cormorant Garamond')||typography.includes("'Inter'"))fail('legacy Academy display families remain');

for(const token of ['--type-brand:14px','--type-screen:14px','--type-section:14px','--type-body:12px','--type-button:12px','--type-caption:10px']){
  if(!typography.includes(token))fail('missing typography token '+token);
}
if(!typography.includes('text-transform:uppercase!important'))fail('uppercase title guard is missing');
if(!typography.includes('.academy-row-copy strong')||!typography.includes('.academy-section-heading h2')||!typography.includes('.ttitle'))fail('card/section title selectors are not protected');

const allowedSizes=new Set([10,12,14]);
const allowedWeights=new Set([400,600]);
const files=[];
function walk(dir){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    if(entry.name==='.git'||entry.name==='node_modules'||entry.name==='android')continue;
    const full=path.join(dir,entry.name);
    if(entry.isDirectory())walk(full);
    else if(/\.(?:js|html)$/.test(entry.name)&&!entry.name.startsWith('test-'))files.push(full);
  }
}
walk('.');
const violations=[];
for(const file of files){
  const src=fs.readFileSync(file,'utf8');
  for(const m of src.matchAll(/font-size\s*:\s*([^;}"']+)/gi)){
    for(const px of m[1].matchAll(/(\d+(?:\.\d+)?)px/g)){
      const n=Number(px[1]);if(!allowedSizes.has(n))violations.push(file+': font-size '+n+'px');
    }
  }
  for(const m of src.matchAll(/font-weight\s*:\s*(\d+)/gi)){
    const n=Number(m[1]);if(!allowedWeights.has(n))violations.push(file+': font-weight '+n);
  }
}
if(violations.length)fail('typography violations: '+violations.slice(0,40).join(' | '));

if(!copy.includes("continueLearning:'CONTINUAR APRENDENDO'")||!copy.includes("trainingLab:'LABORATÓRIO DE TREINO'")||!copy.includes("mathPoker:'MATEMÁTICA DO POKER'"))fail('Portuguese primary premium copy is incomplete');

console.log('Typography identity OK: Saira Semi Condensed; sizes 14/12/10; weights 400/600; Portuguese primary');
