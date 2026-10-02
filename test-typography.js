const fs=require('fs');
const typography=fs.readFileSync('typography-standard.js','utf8');
const index=fs.readFileSync('index.html','utf8');
if(!typography.includes("font-family:'Saira Semi Condensed'")){
  console.error('FAIL: Academy Saira Semi Condensed font lock is missing');
  process.exit(1);
}
if(!index.includes('family=Saira+Semi+Condensed')){
  console.error('FAIL: Saira Semi Condensed webfont import is missing');
  process.exit(1);
}
if(typography.includes('Love Ya Like A Sister')||typography.includes('Cormorant Garamond')||typography.includes("'Inter'")){
  console.error('FAIL: legacy Academy display families remain');
  process.exit(1);
}
if(!typography.includes('--type-screen:22px')||!typography.includes('--type-caption:10px')){
  console.error('FAIL: Academy mobile typography scale is outside specification');
  process.exit(1);
}
if(!typography.includes('--type-body:12px')||!typography.includes('--type-button:12px')){console.error('FAIL: Academy body/button typography must be 12px');process.exit(1);}
if(/font-weight:\s*(500|800|900)/.test(typography)){console.error('FAIL: unsupported font weights found');process.exit(1);}
console.log('Typography identity OK: Saira Semi Condensed 400/600/700');
