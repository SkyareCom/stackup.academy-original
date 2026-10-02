(() => {
  const {esc}=window.AcademyDOM||{esc:v=>String(v??'')};
  const t=(k,f='')=>window.AcademyI18n?.t(k,f)||f||k;
  if(!document.getElementById('academy-premium-components')){
    const s=document.createElement('style');s.id='academy-premium-components';s.textContent=`
      .academy-photo-bg{position:relative;overflow:hidden;background:var(--academy-bg-2);isolation:isolate}
      .academy-photo-bg>.academy-photo{position:absolute;inset:-8px;z-index:-3;width:calc(100% + 16px);height:calc(100% + 16px);object-fit:cover;filter:grayscale(1) saturate(.06) contrast(.9) brightness(.62) blur(3px);transform:scale(1.04)}
      .academy-photo-bg::before{content:'';position:absolute;inset:0;z-index:-2;background:linear-gradient(180deg,rgba(7,7,7,.28),rgba(7,7,7,.80) 72%,var(--academy-bg))}
      .academy-photo-bg::after{content:'';position:absolute;inset:0;z-index:-1;box-shadow:inset 0 0 90px rgba(0,0,0,.72);pointer-events:none}
      .academy-kicker{font-size:12px;line-height:1.2;font-weight:600;letter-spacing:.17em;text-transform:uppercase;color:var(--academy-silver-2)}
      .academy-title{margin:5px 0 0;font-size:12px;line-height:.98;font-weight:600;letter-spacing:.01em;text-transform:uppercase;color:var(--academy-ivory)}
      .academy-copy{margin:10px 0 0;font-size:12px;line-height:1.5;color:var(--academy-muted)}
      .academy-primary,.academy-secondary,.academy-ghost{min-height:44px;border-radius:var(--academy-radius-md);padding:10px 14px;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}
      .academy-primary{border:1px solid var(--academy-ivory);background:var(--academy-ivory);color:var(--academy-bg)}
      .academy-secondary{border:1px solid var(--academy-silver);background:var(--academy-surface-2);color:var(--academy-ivory)}
      .academy-ghost{border:0;background:transparent;color:var(--academy-ivory);padding-inline:4px}
      .academy-divider{height:1px;background:var(--academy-line);margin:var(--academy-space-6) 0}
      .academy-section-heading{display:flex;align-items:end;justify-content:space-between;gap:12px;margin:0 0 12px}.academy-section-intro{height:176px;min-height:176px;max-height:176px;padding:20px 0;display:flex;flex-direction:column;justify-content:flex-end;border-bottom:1px solid var(--academy-line-strong)}
      .academy-section-heading h2{margin:0;font-size:12px;line-height:1.15;letter-spacing:.08em;text-transform:uppercase;color:var(--academy-ivory)}
      .academy-section-heading span{font-size:12px;letter-spacing:.08em;color:var(--academy-muted);text-transform:uppercase}
      .academy-progress{height:5px;border-radius:999px;overflow:hidden;background:var(--academy-line)}
      .academy-progress>i{display:block;height:100%;width:var(--progress,0%);background:var(--academy-ivory);border-radius:inherit;transition:width 240ms ease}
      .academy-metric{padding:12px 0;border-top:1px solid var(--academy-line)}
      .academy-metric:first-child{border-top:0}.academy-metric-row{display:flex;justify-content:space-between;gap:12px;align-items:baseline}
      .academy-metric strong{font-size:12px;color:var(--academy-ivory)}.academy-metric b{font-size:12px;color:var(--academy-ivory)}
      .academy-metric small{display:block;margin-top:4px;color:var(--academy-muted);font-size:12px}
      .academy-weekly{padding:15px;border:1px solid var(--academy-line-strong);border-radius:var(--academy-radius-md);background:var(--academy-surface)}
      .academy-weekly-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-end;margin-bottom:10px}
      .academy-weekly-top strong{font-size:12px;letter-spacing:.08em}.academy-weekly-top b{font-size:12px}.academy-weekly-top span{font-size:12px;color:var(--academy-muted)}.academy-weekly-goals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:12px}.academy-weekly-goals button{min-height:36px;padding:6px;border:1px solid var(--academy-line);border-radius:10px;background:transparent;color:var(--academy-ivory);font:600 12px/1 'Saira Semi Condensed',sans-serif}.academy-weekly-goals button.active{background:var(--academy-ivory);color:var(--academy-bg)}
      .academy-row{width:100%;display:flex;align-items:center;gap:12px;padding:16px 0;border:0;border-top:1px solid var(--academy-line);background:transparent;color:var(--academy-ivory);text-align:left;cursor:pointer}
      .academy-row:first-child{border-top:0}.academy-row-num{flex:0 0 28px;color:var(--academy-silver);font-size:12px;letter-spacing:.08em}
      .academy-row-copy{flex:1}.academy-row-copy strong{display:block;font-size:12px;line-height:1.15}.academy-row-copy span{display:block;margin-top:3px;color:var(--academy-muted);font-size:12px;line-height:1.35}
      .academy-row-arrow{color:var(--academy-silver);font-size:12px}
      .academy-state{padding:20px;border:1px solid var(--academy-line);border-radius:var(--academy-radius-md);text-align:center;color:var(--academy-muted);background:var(--academy-surface)}
      .academy-modal-backdrop{position:fixed;inset:0;z-index:90;display:grid;place-items:center;padding:18px;background:rgba(0,0,0,.72);backdrop-filter:blur(5px)}
      .academy-modal{width:min(100%,480px);max-height:82dvh;overflow:auto;border:1px solid var(--academy-line-strong);border-radius:16px;background:var(--academy-surface);padding:18px;color:var(--academy-ivory)}
      .academy-sheet{position:fixed;z-index:95;left:50%;bottom:0;transform:translateX(-50%);width:min(100%,560px);max-height:80dvh;overflow:auto;border:1px solid var(--academy-line-strong);border-bottom:0;border-radius:18px 18px 0 0;background:var(--academy-surface);padding:18px 18px calc(18px + env(safe-area-inset-bottom))}
      .fi-option.fi-correct,.m2-option.correct,.p3-option.correct,.p3x-opt.correct{border-color:var(--academy-success)!important}
      .fi-option.fi-wrong,.m2-option.wrong,.p3-option.wrong,.p3x-opt.wrong{border-color:var(--academy-danger)!important}
      @media(max-width:340px){.academy-primary,.academy-secondary{padding-inline:10px;font-size:12px}.academy-title{font-size:12px}}
    `;document.head.appendChild(s);
  }

  const AcademyBackground=({src='',className='',content='',alt=''})=>`<section class="academy-photo-bg ${className}">${src?`<img class="academy-photo" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async">`:''}${content}</section>`;
  const AcademyHeader=()=>{const brand=document.querySelector('.brand');if(!brand)return;brand.dataset.academyHeader='1'};
  const EditorialHero=({kicker='',title='',subtitle='',action=''})=>`<div class="academy-hero-content"><div class="academy-kicker">${esc(kicker)}</div><h1 class="academy-title">${esc(title)}</h1><p class="academy-copy">${esc(subtitle)}</p>${action}</div>`;
  const LearningProgress=(pct=0)=>`<div class="academy-progress" aria-label="${Math.round(pct)}%"><i style="--progress:${Math.max(0,Math.min(100,Math.round(pct)))}%"></i></div>`;
  const CourseSection=({title,meta='',content=''})=>`<section class="academy-course-section"><div class="academy-section-heading"><h2>${esc(title)}</h2>${meta?`<span>${esc(meta)}</span>`:''}</div>${content}</section>`;
  const LessonRow=({num,title,note='',attrs=''})=>`<button class="academy-row" type="button" ${attrs}><span class="academy-row-num">${esc(num)}</span><span class="academy-row-copy"><strong>${esc(title)}</strong>${note?`<span>${esc(note)}</span>`:''}</span><span class="academy-row-arrow">›</span></button>`;
  const PrimaryButton=(label,attrs='')=>`<button type="button" class="academy-primary" ${attrs}>${esc(label)}</button>`;
  const SecondaryButton=(label,attrs='')=>`<button type="button" class="academy-secondary" ${attrs}>${esc(label)}</button>`;
  const QuizOption=({label,text,attrs=''})=>`<button type="button" class="academy-secondary academy-quiz-option" ${attrs}><strong>${esc(label)}</strong> ${esc(text)}</button>`;
  const QuizProgress=({current,total})=>`<div class="academy-kicker">${String(current).padStart(2,'0')} / ${String(total).padStart(2,'0')}</div>`;
  const EvolutionMetric=({label,value,note='',pct=null})=>`<div class="academy-metric"><div class="academy-metric-row"><strong>${esc(label)}</strong><b>${esc(value)}</b></div>${note?`<small>${esc(note)}</small>`:''}${pct===null?'':LearningProgress(pct)}</div>`;
  const WeeklyGoal=({completed,goal,pct})=>`<div class="academy-weekly"><div class="academy-weekly-top"><div><div class="academy-kicker">${t('weeklyGoal','META SEMANAL')}</div><strong>${completed} / ${goal} <span>${t('questions','QUESTÕES')}</span></strong></div><b>${Math.round(pct)}%</b></div>${LearningProgress(pct)}<div class="academy-weekly-goals">${[30,50,100].map(v=>`<button type="button" class="${Number(goal)===v?'active':''}" data-weekly-goal="${v}">${v}</button>`).join('')}</div></div>`;
  const SectionDivider=()=>'<div class="academy-divider" aria-hidden="true"></div>';
  const Modal=content=>`<div class="academy-modal-backdrop" data-academy-modal><div class="academy-modal" role="dialog" aria-modal="true">${content}</div></div>`;
  const BottomSheet=content=>`<div class="academy-modal-backdrop" data-academy-sheet-backdrop><div class="academy-sheet" role="dialog" aria-modal="true">${content}</div></div>`;
  const LoadingState=(text='Carregando…')=>`<div class="academy-state" role="status">${esc(text)}</div>`;
  const EmptyState=(text='Nenhum conteúdo disponível.')=>`<div class="academy-state">${esc(text)}</div>`;
  const BottomNavigation=()=>document.querySelector('.academy-bottom-nav');
  const ErrorState=(text='Não foi possível carregar esta área.')=>`<div class="academy-state" role="alert">${esc(text)}</div>`;

  window.AcademyComponents={AcademyBackground,AcademyHeader,EditorialHero,LearningProgress,CourseSection,LessonRow,PrimaryButton,SecondaryButton,QuizOption,QuizProgress,EvolutionMetric,WeeklyGoal,SectionDivider,Modal,BottomSheet,LoadingState,EmptyState,BottomNavigation,ErrorState};
  AcademyHeader();
})();