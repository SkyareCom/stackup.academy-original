(() => {
  const SESSION_KEY='stackup.supabase.session.v1';
  const read=()=>{try{const raw=localStorage.getItem(SESSION_KEY);return raw?JSON.parse(raw):null}catch(_){return null}};
  const user=()=>read()?.user||null;
  window.AuthService={
    get isConfigured(){return !!window.StackUpProductionAuth?.isConfigured?.()},
    getCurrentUser(){return user()},
    getStatus(){
      const u=user();
      return {authenticated:!!u,provider:u?.app_metadata?.provider||null,user:u};
    },
    async signIn(provider='google'){
      if(provider==='google')return window.StackUpProductionAuth?.startGoogle?.();
      if(provider==='biometric')return window.StackUpProductionAuth?.startBiometric?.();
      throw new Error('Método de autenticação ainda não disponível.');
    },
    async signOut(){return window.StackUpProductionAuth?.signOut?.()??(localStorage.removeItem(SESSION_KEY),true)}
  };
})();