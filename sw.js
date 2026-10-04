const CACHE='stackup-academy-v181';
const SW_VERSION=181;
const ASSETS=[
  './','./index.html','./privacy.html','./manifest.webmanifest','./engine.js','./session-reset.js','./language-selector.js','./i18n-en-us-phrases-1.js','./i18n-en-us-phrases-2.js','./i18n-en-us-phrases-3.js','./i18n-en-us-words.js','./i18n-en-us-words-extra-1.js','./i18n-en-us-words-extra-2.js','./i18n-en-us-words-extra-3.js','./i18n-en-us-words-extra-4.js','./i18n-en-us.js',
  './positions-table.js','./fundamentals-details.js','./misdeal-staff-details.js','./terminology-profiles-details.js',
  './strategic-concepts-details.js','./terminology-extra-terms.js','./cash-tournament-details.js','./highlight-card-style.js',
  './etiquette-details.js','./other-rules-details.js','./fundamentals-learning-flow.js','./fundamentals-interactive-bank.js',
  './fundamentals-visual-layer.js','./fundamentals-interactive.js','./fundamentals-progress-panel.js','./modalities-module.js',
  './modalities-depth-details.js','./mixed-games-module.js','./practice-module.js','./practice-table.js','./practice-advanced-bank.js',
  './practice-advanced.js','./table-rotation-guard.js','./math-card-structure.js','./practice-math-odds.js','./portuguese-corrections.js','./cover-layout.js','./release-compliance.js',
  './academy-loader.js','./academy-visual-system.js','./page-top-reset.js','./header-logo-transparent.png','./stackup-logo.png','./typography-standard.js','./icon-192.png','./icon-512.png',
  './src/theme/academy-theme.js','./src/utils/dom.js','./src/i18n/academy-copy.js','./src/content/academy-course-map.js','./src/services/training-preference-service.js','./src/services/training-history-service.js','./src/services/evolution-service.js','./src/services/progress-service.js','./src/services/auth-service.js','./src/screens/entry-screen.js','./src/services/content-service.js','./src/services/analytics-service.js','./src/services/billing-service.js','./src/services/plan-access-service.js','./src/components/academy-components.js','./src/components/editorial-lesson-adapter.js','./src/components/training-save-bar.js','./src/screens/home-screen.js','./src/screens/stage-screen.js','./src/screens/profile-screen.js','./src/screens/practice-tools-screen.js','./src/screens/study-tools-screen.js','./src/hooks/academy-events.js','./src/navigation/bottom-navigation.js'
];
const SCRIPTS=[
  ['session-reset.js',3],
  ['language-selector.js',7],
  ['i18n-en-us-phrases-1.js',2],
  ['i18n-en-us-phrases-2.js',2],
  ['i18n-en-us-phrases-3.js',2],
  ['i18n-en-us-words.js',2],
  ['i18n-en-us-words-extra-1.js',1],
  ['i18n-en-us-words-extra-2.js',1],
  ['i18n-en-us-words-extra-3.js',1],
  ['i18n-en-us-words-extra-4.js',5],
  ['i18n-en-us.js',7],
  ['positions-table.js',10],
  ['fundamentals-details.js',6],
  ['misdeal-staff-details.js',4],
  ['terminology-profiles-details.js',7],
  ['strategic-concepts-details.js',5],
  ['terminology-extra-terms.js',2],
  ['cash-tournament-details.js',4],
  ['highlight-card-style.js',42],
  ['etiquette-details.js',5],
  ['other-rules-details.js',6],
  ['fundamentals-learning-flow.js',3],
  ['fundamentals-interactive-bank.js',2],
  ['fundamentals-visual-layer.js',6],
  ['fundamentals-interactive.js',11],
  ['fundamentals-progress-panel.js',6],
  ['modalities-module.js',9],
  ['modalities-depth-details.js',5],
  ['mixed-games-module.js',8],
  ['practice-module.js',5],
  ['practice-table.js',7],
  ['practice-advanced-bank.js',4],
  ['practice-advanced.js',11],
  ['table-rotation-guard.js',5],
  ['math-card-structure.js',2],
  ['practice-math-odds.js',6],
  ['portuguese-corrections.js',2],
  ['cover-layout.js',10],
  ['release-compliance.js',1],
  ['academy-visual-system.js',21],
  ['page-top-reset.js',5],
  ['typography-standard.js',12],
  ['academy-loader.js',17],
  ['src/theme/academy-theme.js',15],
  ['src/utils/dom.js',1],
  ['src/i18n/academy-copy.js',22],
  ['src/content/academy-course-map.js',1],
  ['src/services/training-preference-service.js',1],
  ['src/services/training-history-service.js',7],
  ['src/services/evolution-service.js',3],
  ['src/services/progress-service.js',6],
  ['src/services/auth-service.js',1],
  ['src/screens/entry-screen.js',9],
  ['src/services/content-service.js',1],
  ['src/services/analytics-service.js',2],
  ['src/services/billing-service.js',4],
  ['src/services/plan-access-service.js',2],
  ['src/components/academy-components.js',7],
  ['src/components/editorial-lesson-adapter.js',3],
  ['src/components/training-save-bar.js',2],
  ['src/screens/home-screen.js',20],
  ['src/screens/stage-screen.js',11],
  ['src/screens/profile-screen.js',18],
  ['src/screens/practice-tools-screen.js',9],
  ['src/screens/study-tools-screen.js',9],
  ['src/hooks/academy-events.js',2],
  ['src/navigation/bottom-navigation.js',8],
];
const AUTO_SCRIPTS=new Set([
  'session-reset.js','highlight-card-style.js','fundamentals-learning-flow.js',
  'portuguese-corrections.js','cover-layout.js','release-compliance.js',
  'academy-visual-system.js','page-top-reset.js','typography-standard.js','academy-loader.js'
]);

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

function escapeRegExp(value){
  return value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
}

function enhanceHtml(source){
  let html=source.replace(/sw\.js\?v=\d+/g,`sw.js?v=${SW_VERSION}`);
  for(const [name,version] of SCRIPTS){
    const re=new RegExp(`${escapeRegExp(name)}\\?v=\\d+`,'g');
    html=html.replace(re,`${name}?v=${version}`);
  }
  if(!html.includes('stackup-performance-guard')){
    const guard=`<script id="stackup-performance-guard">(()=>{if(window.__stackupObserverGuard)return;window.__stackupObserverGuard=1;const nativeObserve=MutationObserver.prototype.observe;MutationObserver.prototype.observe=function(target,options){const root=document.getElementById('root');if(root&&target===document.documentElement&&options&&options.childList&&options.subtree&&!options.attributes&&!options.characterData){return nativeObserve.call(this,root,{childList:true});}return nativeObserve.call(this,target,options);};})();</script>`;
    html=html.replace('</head>',guard+'</head>');
  }
  if(!html.includes('stackup-header-logo-size')){
    html=html.replace('</head>','<style id="stackup-header-logo-size">.brandin .logo[data-stackup-logo="1"]{width:80px!important;height:80px!important;flex:0 0 80px!important;object-fit:contain!important;background:transparent!important}</style></head>');
  }
  if(!html.includes('stackup-font-lock')){
    html=html.replace('</head>','<style id="stackup-font-lock">html,body,body *{font-family:\'Saira Semi Condensed\',system-ui,sans-serif!important}.name,.intro h1,.stitle,.head h2,.card.lesson>h2,.ttitle,.rname,.compare h3{font-family:\'Saira Semi Condensed\',system-ui,sans-serif!important}.navicon,.rank,.suit,.fv-rank,.fv-suit{font-family:Arial,sans-serif!important}</style></head>');
  }
  for(const [name,version] of SCRIPTS){
    if(AUTO_SCRIPTS.has(name)&&!html.includes(name))html=html.replace('</body>',`<script src="./${name}?v=${version}"></script></body>`);
  }
  return html;
}

async function appShellResponse(request){
  let response;
  try{
    response=await fetch(request);
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
  }catch(_){
    response=await caches.match('./index.html');
  }
  if(!response)return new Response('Offline',{status:503,headers:{'content-type':'text/plain; charset=utf-8'}});
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html'))return response;
  const html=enhanceHtml(await response.text());
  const headers=new Headers(response.headers);
  headers.set('content-type','text/html; charset=utf-8');
  return new Response(html,{status:200,statusText:'OK',headers});
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    const url=new URL(event.request.url);
    const isAppShell=url.pathname.endsWith('/')||url.pathname.endsWith('/index.html');
    if(isAppShell){
      event.respondWith(appShellResponse(event.request));
      return;
    }
    event.respondWith(
      fetch(event.request).then(response=>{
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        return response;
      }).catch(()=>caches.match(event.request,{ignoreSearch:true}))
    );
    return;
  }
  event.respondWith(
    fetch(event.request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      return response;
    }).catch(()=>caches.match(event.request,{ignoreSearch:true}))
  );
});
