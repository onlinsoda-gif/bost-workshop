(()=>{
'use strict';
const gate=document.getElementById('authGate'); if(!gate) return;
const cfg={url:window.BOST_SUPABASE_URL,key:window.BOST_SUPABASE_ANON_KEY};
const T={
fa:{language:'تغییر زبان',welcome:'موترت را بهتر نگهداری کن',contactUs:'تماس با ما',forgotPassword:'رمز را فراموش کرده‌اید؟',registerTitle:'ثبت‌نام کاربر',registerIntro:'نام، شماره تلفن، ایمیل و رمز عبور خود را وارد کنید.',loginTitle:'ورود به بست ورکشاپ',loginIntro:'با شماره موبایل یا ایمیل و رمز عبور وارد شوید.',nameLabel:'نام شخص',namePlaceholder:'نام و تخلص',phoneLabel:'شماره تلفن',phonePlaceholder:'شماره تلفن (۱۰ رقم)',emailLabel:'ایمیل',emailPlaceholder:'name@example.com',savedPhone:'شماره تلفن ثبت‌شده',passwordLabel:'رمز عبور (حداقل ۸ نویسه)',passwordPlaceholder:'حداقل ۸ نویسه',confirmPasswordLabel:'تکرار رمز عبور',confirmPasswordPlaceholder:'رمز را دوباره وارد کنید',passwordMismatch:'رمزها یکسان نیستند.',loginPasswordLabel:'رمز عبور',loginIdentifierLabel:'شماره موبایل یا ایمیل',loginIdentifierPlaceholder:'شماره موبایل یا ایمیل ثبت‌شده',existingAccountButton:'حساب دارید؟ ورود',registerButton:'ثبت‌نام',loginButton:'ورود به سایت',newRegisterButton:'ثبت‌نام کاربر جدید',note:'حساب‌ها در Supabase ثبت می‌شوند. شماره تلفن در پروفایل شما نگهداری می‌شود.',nameError:'نام را درست وارد کنید.',phoneError:'شماره تلفن باید دقیقاً ۱۰ رقم باشد.',passwordError:'رمز باید حداقل ۸ نویسه داشته باشد.',loginError:'ورود انجام نشد. شماره موبایل یا ایمیل و رمز را بررسی کنید.',success:'ثبت‌نام موفق بود. اکنون می‌توانید وارد سایت شوید.',confirmStillOn:'حساب ساخته شد، اما تأیید ایمیل هنوز در Supabase فعال است. گزینه Confirm email را خاموش کنید.',emailError:'لطفاً یک ایمیل معتبر وارد کنید.',sendResetButton:'ارسال لینک بازیابی',backToLogin:'بازگشت به ورود',recoveryTitle:'بازیابی رمز عبور',recoveryIntro:'ایمیل حساب خود را وارد کنید تا لینک بازیابی برایتان ارسال شود.',resetSent:'اگر این ایمیل در سیستم ثبت باشد، لینک بازیابی ارسال می‌شود.',newPasswordTitle:'تنظیم رمز جدید',newPasswordLabel:'رمز عبور جدید',saveNewPassword:'ذخیره رمز جدید',passwordUpdated:'رمز عبور با موفقیت تغییر کرد.'},
ps:{language:'د ژبې بدلول',welcome:'خپل موټر ښه وساتئ',contactUs:'موږ سره اړیکه',forgotPassword:'پټنوم مو هېر شوی؟',registerTitle:'د کارن نوم‌لیکنه',registerIntro:'خپل نوم، د ټیلیفون شمېره، برېښنالیک او پټنوم ولیکئ.',loginTitle:'بست ورکشاپ ته ننوتل',loginIntro:'د موبایل شمېرې یا برېښنالیک او پټنوم له لارې ننوځئ.',nameLabel:'بشپړ نوم',namePlaceholder:'بشپړ نوم',phoneLabel:'د ټیلیفون شمېره',phonePlaceholder:'۱۰ شمېرې',emailLabel:'برېښنالیک',emailPlaceholder:'name@example.com',savedPhone:'ثبت شوې شمېره',passwordLabel:'پټنوم (لږ تر لږه ۸ توري)',passwordPlaceholder:'لږ تر لږه ۸ توري',confirmPasswordLabel:'پټنوم بیا ولیکئ',confirmPasswordPlaceholder:'پټنوم بیا ولیکئ',passwordMismatch:'پټنومونه برابر نه دي.',loginPasswordLabel:'پټنوم',loginIdentifierLabel:'د موبایل شمېره یا برېښنالیک',loginIdentifierPlaceholder:'ثبت شوې شمېره یا برېښنالیک',existingAccountButton:'حساب لرئ؟ ننوتل',registerButton:'ثبت‌نام',loginButton:'ننوتل',newRegisterButton:'نوی حساب',note:'حسابونه په Supabase کې ساتل کېږي او د ټیلیفون شمېره په پروفایل کې خوندي کېږي.',nameError:'سم نوم ولیکئ.',phoneError:'شمېره باید ۱۰ عددونه وي.',passwordError:'پټنوم لږ تر لږه ۸ توري وي.',loginError:'ننوتل ناکام شول؛ د موبایل شمېره یا برېښنالیک او پټنوم وګورئ.',success:'نوم‌لیکنه بریالۍ شوه. اوس کولای شئ ننوځئ.',confirmStillOn:'حساب جوړ شو، خو د ایمیل تایید لا هم په Supabase کې فعال دی. Confirm email بند کړئ.',emailError:'سم برېښنالیک ولیکئ.',sendResetButton:'د بیا تنظیم لینک ولېږئ',backToLogin:'ننوتلو ته ستنېدل',recoveryTitle:'د پټنوم بیا تنظیم',recoveryIntro:'د خپل حساب برېښنالیک ولیکئ.',resetSent:'که دا برېښنالیک ثبت وي، د بیا تنظیم لینک به واستول شي.',newPasswordTitle:'نوی پټنوم',newPasswordLabel:'نوی پټنوم',saveNewPassword:'نوی پټنوم خوندي کړئ',passwordUpdated:'پټنوم بدل شو.'},
en:{language:'Language',welcome:'Take better care of your car',contactUs:'Contact us',forgotPassword:'Forgot password?',registerTitle:'Create account',registerIntro:'Enter your name, phone number, email and password.',loginTitle:'Sign in to Bost Workshop',loginIntro:'Sign in with your phone number or email and password.',nameLabel:'Full name',namePlaceholder:'Full name',phoneLabel:'Phone number',phonePlaceholder:'10-digit phone number',emailLabel:'Email',emailPlaceholder:'name@example.com',savedPhone:'Registered phone number',passwordLabel:'Password (at least 8 characters)',passwordPlaceholder:'At least 8 characters',confirmPasswordLabel:'Confirm password',confirmPasswordPlaceholder:'Enter password again',passwordMismatch:'Passwords do not match.',loginPasswordLabel:'Password',loginIdentifierLabel:'Phone number or email',loginIdentifierPlaceholder:'Registered phone number or email',existingAccountButton:'Already have an account? Sign in',registerButton:'Create account',loginButton:'Sign in',newRegisterButton:'Create account',note:'Accounts are stored in Supabase. Your phone number is kept in your profile.',nameError:'Enter your name.',phoneError:'Phone number must contain exactly 10 digits.',passwordError:'Password must be at least 8 characters.',loginError:'Sign-in failed. Check your phone number or email and password.',success:'Registration successful. You can now sign in.',confirmStillOn:'The account was created, but email confirmation is still enabled in Supabase. Turn Confirm email off.',emailError:'Enter a valid email address.',sendResetButton:'Send recovery link',backToLogin:'Back to sign in',recoveryTitle:'Reset password',recoveryIntro:'Enter your account email to receive a recovery link.',resetSent:'If the email is registered, a recovery link has been sent.',newPasswordTitle:'Set a new password',newPasswordLabel:'New password',saveNewPassword:'Save new password',passwordUpdated:'Password updated successfully.'}
};
let lang=localStorage.getItem('bostAuthLanguage')||'fa';
const $=id=>document.getElementById(id),registerForm=$('registerForm'),loginForm=$('loginForm'),recoveryForm=$('recoveryForm'),newPasswordForm=$('newPasswordForm'),message=$('authMessage');
const tr=k=>(T[lang]||T.fa)[k]||T.fa[k]||k;
const setMessage=(s,bad=true)=>{message.textContent=s;message.style.color=bad?'#c0392b':'#16834a'};
const client=(()=>{if(!cfg.url||!cfg.key||!window.supabase?.createClient){setMessage('تنظیمات Supabase کامل نیست. فایل supabase-config.js را بررسی کنید.');return null;}return window.supabase.createClient(cfg.url,cfg.key);})();
function asciiDigits(v){return String(v||'').replace(/[۰-۹٠-٩]/g,ch=>String('۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩'.indexOf(ch)%10));}
function phoneValue(v){const d=asciiDigits(v).replace(/\D/g,'');return d.length===10?d:null;}
function setLang(){
 document.documentElement.lang=lang;document.documentElement.dir=lang==='en'?'ltr':'rtl';
 $('authLanguageLabel').textContent=tr('language');
 document.querySelectorAll('[data-auth]').forEach(e=>e.textContent=tr(e.dataset.auth));
 const set=(form,field,key)=>{const el=form?.querySelector(`[name="${field}"]`);if(el&&T[lang][key])el.placeholder=tr(key);};
 set(registerForm,'fullName','namePlaceholder');set(registerForm,'phone','phonePlaceholder');set(registerForm,'email','emailPlaceholder');set(loginForm,'identifier','loginIdentifierPlaceholder');
 $('authNote').textContent=tr('note');
}
function hideForms(){[registerForm,loginForm,recoveryForm,newPasswordForm].forEach(f=>f.hidden=true);}
function showLogin(){hideForms();$('authTitle').textContent=tr('loginTitle');$('authIntro').textContent=tr('loginIntro');loginForm.hidden=false;message.textContent='';}
function showRegister(){hideForms();$('authTitle').textContent=tr('registerTitle');$('authIntro').textContent=tr('registerIntro');registerForm.hidden=false;message.textContent='';}
function showRecovery(){hideForms();$('authTitle').textContent=tr('recoveryTitle');$('authIntro').textContent=tr('recoveryIntro');recoveryForm.hidden=false;message.textContent='';}
function showNewPassword(){hideForms();$('authTitle').textContent=tr('newPasswordTitle');$('authIntro').textContent='';newPasswordForm.hidden=false;message.textContent='';}
async function afterLogin(user){gate.remove();const {data:profile}=await client.from('profiles').select('role').eq('id',user.id).maybeSingle();if(profile?.role==='admin'){$('adminPanel').hidden=false;loadUsers();}}
// Password visibility controls: the eye button sits on the left of each password field.
document.querySelectorAll('[data-password-toggle]').forEach(btn=>btn.addEventListener('click',()=>{
 const input=btn.parentElement.querySelector('input');if(!input)return;
 const reveal=input.type==='password';input.type=reveal?'text':'password';btn.setAttribute('aria-pressed',String(reveal));
 btn.setAttribute('aria-label',reveal?'پنهان‌کردن رمز عبور':'نمایش رمز عبور');
}));
// Accept Persian, Arabic and Western numerals, but store exactly ten digits.
const phoneInput=registerForm.querySelector('[name="phone"]');
phoneInput.addEventListener('input',()=>{
 const normalized=asciiDigits(phoneInput.value).replace(/\D/g,'').slice(0,10);
 phoneInput.value=normalized;
 if(normalized.length>0&&normalized.length<10)setMessage(`${tr('phoneError')} (${normalized.length}/10)`);
 else if(normalized.length===10)setMessage('',false);
 else setMessage('');
});
phoneInput.addEventListener('blur',()=>{if(phoneInput.value&&phoneInput.value.length!==10)setMessage(tr('phoneError'));});

registerForm.addEventListener('submit',async e=>{
 e.preventDefault();if(!client)return;setMessage('');
 const f=new FormData(registerForm),name=String(f.get('fullName')||'').trim(),phone=phoneValue(f.get('phone')),email=String(f.get('email')||'').trim().toLowerCase(),password=String(f.get('password')||'');
 if(name.length<2)return setMessage(tr('nameError'));if(!phone)return setMessage(tr('phoneError'));if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return setMessage(tr('emailError'));if(password.length<8)return setMessage(tr('passwordError'));if(password!==String(f.get('confirmPassword')||''))return setMessage(tr('passwordMismatch'));
 try{
  const {data,error}=await client.auth.signUp({email,password,options:{data:{full_name:name,phone}}});
  if(error)throw error;
  if(data.session){setMessage(tr('success'),false);await afterLogin(data.user);}
  else setMessage(tr('confirmStillOn')); 
 }catch(err){setMessage(err.message||tr('loginError'));}
});
loginForm.addEventListener('submit',async e=>{
 e.preventDefault();if(!client)return;setMessage('');
 const f=new FormData(loginForm),identifier=String(f.get('identifier')||'').trim(),password=String(f.get('password')||'');
 if(password.length<1)return setMessage(tr('loginError'));
 try{
  if(identifier.includes('@')){
   const email=identifier.toLowerCase();
   const {data,error}=await client.auth.signInWithPassword({email,password});if(error)throw error;
   await afterLogin(data.user);
  }else{
   const phone=phoneValue(identifier);if(!phone)return setMessage(tr('phoneError'));
   const {data,error}=await client.functions.invoke('login-by-phone',{body:{phone,password}});
   if(error)throw error;
   if(data?.error)throw new Error(data.error);
   if(!data?.session||!data?.user)throw new Error(tr('loginError'));
   const {error:setError}=await client.auth.setSession(data.session);if(setError)throw setError;
   await afterLogin(data.user);
  }
 }catch(err){setMessage(err.message||tr('loginError'));}
});
recoveryForm.addEventListener('submit',async e=>{
 e.preventDefault();if(!client)return;setMessage('');
 const email=String(new FormData(recoveryForm).get('email')||'').trim().toLowerCase();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return setMessage(tr('emailError'));
 try{const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});if(error)throw error;setMessage(tr('resetSent'),false);}catch(err){setMessage(err.message||tr('loginError'));}
});
newPasswordForm.addEventListener('submit',async e=>{
 e.preventDefault();if(!client)return;setMessage('');
 const f=new FormData(newPasswordForm),password=String(f.get('password')||'');
 if(password.length<8)return setMessage(tr('passwordError'));if(password!==String(f.get('confirmPassword')||''))return setMessage(tr('passwordMismatch'));
 try{const {error}=await client.auth.updateUser({password});if(error)throw error;setMessage(tr('passwordUpdated'),false);await client.auth.signOut();showLogin();}catch(err){setMessage(err.message||tr('loginError'));}
});
$('showRegister').addEventListener('click',()=>{registerForm.reset();showRegister();});
$('showLogin').addEventListener('click',showLogin);
$('forgotPassword').addEventListener('click',e=>{e.preventDefault();showRecovery();});
$('backToLogin').addEventListener('click',showLogin);
$('authLanguage').value=lang;$('authLanguage').addEventListener('change',e=>{lang=e.target.value;localStorage.setItem('bostAuthLanguage',lang);setLang();});
async function loadUsers(){const box=$('adminUsers'),msg=$('adminMessage');if(!client)return;box.textContent='در حال بارگذاری...';const {data,error}=await client.from('profiles').select('id,phone,full_name,role,created_at').order('created_at',{ascending:false}).limit(500);if(error){box.textContent='خطا در دریافت کاربران: '+error.message;return;}const q=$('adminSearch').value.trim().toLowerCase(),users=(data||[]).filter(u=>(u.full_name||'').toLowerCase().includes(q)||(u.phone||'').includes(q));box.replaceChildren();if(!users.length){box.textContent='کاربری پیدا نشد.';return;}users.forEach(u=>{const row=document.createElement('div');row.style.cssText='display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap;border-bottom:1px solid #ddd;padding:10px 0';const label=document.createElement('span');label.textContent=`${u.full_name||'بدون نام'} — ${u.phone} — ${u.role}`;const btn=document.createElement('button');btn.type='button';btn.className='outline';btn.textContent='تغییر رمز';btn.addEventListener('click',async()=>{const p=prompt('رمز جدید را وارد کنید (حداقل ۸ نویسه):');if(p===null)return;if(p.length<8||p.length>72){msg.textContent='رمز باید بین ۸ تا ۷۲ نویسه باشد.';return;}if(!confirm(`رمز حساب ${u.phone} تغییر کند؟`))return;btn.disabled=true;const {data:result,error}=await client.functions.invoke('admin-password-reset',{body:{userId:u.id,password:p}});btn.disabled=false;msg.textContent=error?(error.message||'تغییر رمز ناموفق بود.'):result?.error||'رمز با موفقیت تغییر کرد.';});row.append(label,btn);box.append(row);});}
$('adminReload').addEventListener('click',loadUsers);$('adminRefresh').addEventListener('click',loadUsers);$('adminSearch').addEventListener('input',loadUsers);
document.addEventListener('click',async e=>{const logout=e.target.closest('[data-action="logout"]');if(logout&&client){e.preventDefault();await client.auth.signOut();location.reload();}});
(async()=>{
 setLang();if(!client){showRegister();return;}
 client.auth.onAuthStateChange((event)=>{
  if(event==='PASSWORD_RECOVERY')showNewPassword();
 });
 const {data:{session}}=await client.auth.getSession();
 if(session)await afterLogin(session.user);
 else if(location.hash.includes('type=recovery'))showNewPassword();
 else showRegister();
})();
})();