(() => {
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const qs=(s,r=document)=>r.querySelector(s),qsa=(s,r=document)=>[...r.querySelectorAll(s)];
  const on=(root,event,selector,handler)=>root.addEventListener(event,e=>{const el=e.target.closest?.(selector);if(el&&root.contains(el))handler(e,el)});
  window.AcademyDOM={esc,qs,qsa,on};
})();