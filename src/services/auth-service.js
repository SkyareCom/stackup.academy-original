(() => {
  window.AuthService={
    isConfigured:false,
    getCurrentUser(){return null},
    getStatus(){return {authenticated:false,provider:null}},
    async signIn(){throw new Error('AuthService ainda não conectado a um provedor.')},
    async signOut(){return true}
  };
})();