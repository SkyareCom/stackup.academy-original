(() => {
  'use strict';
  if(window.StackUpProductionAuth)return;

  const SESSION_KEY='stackup.supabase.session.v1';
  const native=()=>window.StackUpNative||null;
  const api={SESSION_KEY};

  const config=()=>{
    const n=native();
    const url=n&&typeof n.getSupabaseUrl==='function'?String(n.getSupabaseUrl()||'').replace(/\/$/,''):'';
    const anonKey=n&&typeof n.getSupabaseAnonKey==='function'?String(n.getSupabaseAnonKey()||''):'';
    return {url,anonKey};
  };
  const configured=()=>{
    const c=config();
    return /^https:\/\/.+\.supabase\.co$/i.test(c.url)&&c.anonKey.length>20;
  };
  const loadSession=()=>{try{const raw=localStorage.getItem(SESSION_KEY);return raw?JSON.parse(raw):null}catch(_){return null}};
  const saveSession=data=>{
    const now=Math.floor(Date.now()/1000);
    const s={access_token:data.access_token||'',refresh_token:data.refresh_token||'',token_type:data.token_type||'bearer',expires_at:data.expires_at||(now+Number(data.expires_in||3600)),user:data.user||null};
    localStorage.setItem(SESSION_KEY,JSON.stringify(s));
    window.dispatchEvent(new CustomEvent('academy:authchange',{detail:{authenticated:true,user:s.user}}));
    return s;
  };
  const request=async(path,body)=>{
    if(!configured())throw new Error('Supabase ainda não foi configurado neste build.');
    const {url,anonKey}=config();
    const response=await fetch(url+'/auth/v1'+path,{method:'POST',headers:{'Content-Type':'application/json',apikey:anonKey,Authorization:'Bearer '+anonKey},body:JSON.stringify(body||{})});
    let data={};try{data=await response.json()}catch(_){}
    if(!response.ok)throw new Error(String(data.msg||data.message||data.error_description||data.error||('Erro de autenticação ('+response.status+')')));
    return data;
  };
  const activeSession=async()=>{
    let session=loadSession();
    if(!session||!session.refresh_token)return null;
    const now=Math.floor(Date.now()/1000);
    if(Number(session.expires_at||0)>now+60&&session.access_token)return session;
    try{
      session=saveSession(await request('/token?grant_type=refresh_token',{refresh_token:session.refresh_token}));
      return session;
    }catch(_){
      try{localStorage.removeItem(SESSION_KEY)}catch(__){}
      return null;
    }
  };
  const notify=(message)=>{
    const text=String(message||'');
    if(typeof window.toast==='function')window.toast(text,3500);
    else if(text)console.info('[ACADEMY AUTH]',text);
  };

  api.saveAcademyCoachPreference=async preference=>{
    const session=await activeSession();
    if(!session?.access_token||!session?.user?.id)return {synced:false,reason:'no_session'};
    if(!configured())return {synced:false,reason:'not_configured'};
    const number=String(preference?.number||'').trim();
    if(!/^\+[1-9][0-9]{7,14}$/.test(number))throw new Error('Número de WhatsApp inválido.');
    const {url,anonKey}=config(),now=new Date().toISOString(),optIn=preference?.optIn===true;
    const payload={
      user_id:session.user.id,
      whatsapp_number:number,
      academy_coach_opt_in:optIn,
      academy_coach_opt_in_at:optIn?(preference?.optInAt||now):null,
      academy_coach_updated_at:now,
      academy_coach_frequency:'included_2_week',
      academy_coach_daily_limit:1,
      academy_coach_weekly_limit:2,
      academy_coach_timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||null,
      updated_at:now
    };
    const response=await fetch(url+'/rest/v1/profiles?on_conflict=user_id',{
      method:'POST',
      headers:{'Content-Type':'application/json',apikey:anonKey,Authorization:'Bearer '+session.access_token,Prefer:'resolution=merge-duplicates,return=minimal'},
      body:JSON.stringify(payload)
    });
    if(!response.ok){
      let data={};try{data=await response.json()}catch(_){}
      throw new Error(data.message||data.error||'Não foi possível salvar a configuração do Academy Coach.');
    }
    return {synced:true};
  };

  api.isConfigured=configured;
  api.config=config;
  api.loadSession=loadSession;
  api.activeSession=activeSession;
  api.signOut=()=>{try{localStorage.removeItem(SESSION_KEY)}catch(_){};window.dispatchEvent(new CustomEvent('academy:authchange',{detail:{authenticated:false,user:null}}));return true};
  api.startGoogle=()=>{
    if(!configured())throw new Error('Supabase ainda não foi configurado neste build.');
    const n=native();if(!n||typeof n.requestGoogleSignIn!=='function')throw new Error('Login Google nativo indisponível.');
    n.requestGoogleSignIn();return true;
  };
  api.startBiometric=async()=>{
    const session=await activeSession();
    if(!session)throw new Error('Entre primeiro com Google para ativar o acesso biométrico.');
    const n=native();if(!n||typeof n.requestBiometricUnlock!=='function')throw new Error('Biometria nativa indisponível.');
    n.requestBiometricUnlock();return true;
  };
  api.onGoogleToken=async(idToken,email,name)=>{
    try{
      const data=await request('/token?grant_type=id_token',{provider:'google',id_token:idToken});
      const session=saveSession(data);
      notify('Conta Google conectada.');
      return session;
    }catch(error){notify(error.message||'Não foi possível entrar com o Google.');throw error}
  };
  api.onBiometricResult=async success=>{
    if(!success)return null;
    try{
      const session=await activeSession();
      if(!session)throw new Error('Sessão expirada. Entre novamente com Google.');
      window.dispatchEvent(new CustomEvent('academy:authchange',{detail:{authenticated:true,user:session.user,provider:'biometric'}}));
      return session;
    }catch(error){notify(error.message);throw error}
  };
  api.onNativeError=(method,message)=>notify(message||('Falha em '+String(method||'autenticação')+'.'));

  window.StackUpProductionAuth=api;
  activeSession().catch(()=>{});
})();