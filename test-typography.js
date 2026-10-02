const fs=require('fs');
const typography=fs.readFileSync('typography-standard.js','utf8');
const index=fs.readFileSync('index.html','utf8');
if(!typography.includes("font-family:'Overlock'")){
  console.error('FAIL: Academy Overlock font lock is missing');
  process.exit(1);
}
if(!index.includes('family=Overlock')){
  console.error('FAIL: Overlock webfont import is missing');
  process.exit(1);
}
if(typography.includes('Love Ya Like A Sister')||typography.includes('Cormorant Garamond')||typography.includes("'Inter'")){
  console.error('FAIL: legacy Academy display families remain');
  process.exit(1);
}
if(!typography.includes('--type-screen:clamp(18px,5.8vw,22px)')||!typography.includes('--type-caption:clamp(9px,3vw,11px)')){
  console.error('FAIL: Academy mobile typography scale is outside specification');
  process.exit(1);
}
console.log('Typography identity OK: Overlock / Academy Monochrome Ivory');
