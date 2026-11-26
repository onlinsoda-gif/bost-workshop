(()=>{
'use strict';
const KEY='bostWorkshopAccountV1';
const SESSION='bostWorkshopSessionV1';
const gate=document.getElementById('authGate');
if(!gate)return;
const registerForm=document.getElementById('registerForm');
const loginForm=document.getElementById('loginForm');
const title=document.getElementById('authTitle');
const intro=document.getElementById('authIntro');
const message=document.getElementById('authMessage');
const preview=document.getElementById('photoPreview');
const photoInput=document.getElementById('registerPhoto');
const languageSelect=document.getElementById('authLanguage');
let selectedPhoto='';
let lang=localStorage.getItem('bostAuthLanguage')||'fa';
const T={
 fa:{
  language:'تغییر زبان',welcome:'موترت را بهتر نگهداری کن',contactUs:'تماس با ما',forgotPassword:'رمز عبور را فراموش کرده‌ام؟',supportMessage:'سلام، رمز عبور خود را فراموش کرده‌ام. لطفاً راهنمایی کنید.',registerTitle:'ثبت‌نام کاربر',registerIntro:'برای ورود به بست ورکشاپ، مشخصات خود را ثبت کنید.',
  loginTitle:'ورود به بست ورکشاپ',loginIntro:'شماره تلفن و رمز ورود خود را وارد کنید.',
  nameLabel:'نام شخص',namePlaceholder:'نام و تخلص',phoneLabel:'شماره تلفن',phonePlaceholder:'شماره تلفن (۱۰ رقم)',
  savedPhone:'شماره تلفن ثبت‌شده',passwordLabel:'رمز ورود (حداقل ۴ رقم)',passwordPlaceholder:'فقط ارقام، حداقل ۴ رقم',confirmPasswordLabel:'تکرار رمز ورود',confirmPasswordPlaceholder:'رمز ورود را دوباره وارد کنید',showPassword:'نمایش رمز',hidePassword:'مخفی‌کردن رمز',passwordMismatch:'رمزهای ورود یکسان نیستند.',
  loginPasswordLabel:'رمز ورود',photoLabel:'عکس شخص',preview:'پیش‌نمایش عکس',registerButton:'ثبت‌نام و ورود',
  loginButton:'ورود به سایت',newRegisterButton:'ثبت‌نام کاربر جدید',note:'اطلاعات این نسخه در همین مرورگر ذخیره می‌شود.',
  nameError:'لطفاً نام خود را درست وارد کنید.',phoneError:'شماره تلفن باید دقیقاً ۱۰ رقم باشد.',phoneShort:'شماره تلفن هنوز به ۱۰ رقم نرسیده است.',
  passwordError:'رمز ورود باید حداقل ۴ رقم و فقط شامل عدد باشد.',photoError:'لطفاً عکس خود را آپلود کنید.',
  imageInvalid:'لطفاً یک عکس معتبر انتخاب کنید.',imageLarge:'حجم عکس باید کمتر از ۸ مگابایت باشد.',
  imageRead:'خواندن عکس ناموفق بود.',imageBad:'فایل عکس قابل خواندن نیست.',saveError:'ذخیره اطلاعات انجام نشد؛ ممکن است حافظه مرورگر پر باشد.',
  success:'ثبت‌نام موفق بود. در حال ورود...',wrongPhone:'شماره تلفن درست نیست.',wrongPassword:'رمز ورود اشتباه است.',
  loginError:'ورود انجام نشد. لطفاً دوباره تلاش کنید.',replaceConfirm:'ثبت‌نام جدید جای حساب قبلی را می‌گیرد. ادامه می‌دهید؟'
 },
 ps:{
  language:'د ژبې بدلول',welcome:'خپل موټر ښه وساتئ',contactUs:'موږ سره اړیکه',forgotPassword:'پټنوم مو هېر کړی؟',supportMessage:'سلام، خپل پټنوم مې هېر کړی دی. مهرباني وکړئ مرسته راسره وکړئ.',registerTitle:'د کارن نوم‌لیکنه',registerIntro:'بست ورکشاپ ته د ننوتلو لپاره خپل معلومات ثبت کړئ.',
  loginTitle:'بست ورکشاپ ته ننوتل',loginIntro:'خپل د ټیلیفون شمېره او پټنوم ولیکئ.',
  nameLabel:'د شخص نوم',namePlaceholder:'نوم او تخلص',phoneLabel:'د ټیلیفون شمېره',phonePlaceholder:'د ټیلیفون شمېره (۱۰ شمېرې)',
  savedPhone:'ثبت شوې د ټیلیفون شمېره',passwordLabel:'پټنوم (لږ تر لږه ۴ شمېرې)',passwordPlaceholder:'یوازې شمېرې، لږ تر لږه ۴',confirmPasswordLabel:'پټنوم بیا ولیکئ',confirmPasswordPlaceholder:'پټنوم یو ځل بیا ولیکئ',showPassword:'پټنوم ښکاره کړئ',hidePassword:'پټنوم پټ کړئ',passwordMismatch:'پټنومونه سره یو شان نه دي.',
  loginPasswordLabel:'پټنوم',photoLabel:'د شخص عکس',preview:'د عکس مخکتنه',registerButton:'ثبت او ننوتل',
  loginButton:'سایټ ته ننوتل',newRegisterButton:'د نوي کارن نوم‌لیکنه',note:'دا معلومات په همدې براوزر کې ساتل کېږي.',
  nameError:'مهرباني وکړئ خپل نوم سم ولیکئ.',phoneError:'د ټیلیفون شمېره باید دقیقاً ۱۰ شمېرې وي.',phoneShort:'د ټیلیفون شمېره لا تر ۱۰ عددونو کمه ده.',
  passwordError:'پټنوم باید لږ تر لږه ۴ شمېرې او یوازې عددونه ولري.',photoError:'مهرباني وکړئ خپل عکس پورته کړئ.',
  imageInvalid:'مهرباني وکړئ یو معتبر عکس وټاکئ.',imageLarge:'د عکس اندازه باید له ۸ مېګابایټو کمه وي.',
  imageRead:'د عکس لوستل بریالي نه شول.',imageBad:'د عکس فایل لوستل کېدای نه شي.',saveError:'معلومات خوندي نه شول؛ ښايي د براوزر حافظه ډکه وي.',
  success:'نوم‌لیکنه بریالۍ شوه. د ننوتلو په حال کې...',wrongPhone:'د ټیلیفون شمېره سمه نه ده.',wrongPassword:'پټنوم ناسم دی.',
  loginError:'ننوتل ترسره نه شول. بیا هڅه وکړئ.',replaceConfirm:'نوې نوم‌لیکنه به پخوانی حساب بدل کړي. دوام ورکوئ؟'
 },
 en:{
  language:'Change language',welcome:'Take better care of your car',contactUs:'Contact us',forgotPassword:'Forgot your password?',supportMessage:'Hello, I forgot my password. Please help me.',registerTitle:'User registration',registerIntro:'Enter your details to access Bost Workshop.',
  loginTitle:'Sign in to Bost Workshop',loginIntro:'Enter your phone number and password.',
  nameLabel:'Full name',namePlaceholder:'Full name',phoneLabel:'Phone number',phonePlaceholder:'Phone number (10 digits)',
  savedPhone:'Registered phone number',passwordLabel:'Password (at least 4 digits)',passwordPlaceholder:'Numbers only, at least 4 digits',confirmPasswordLabel:'Confirm password',confirmPasswordPlaceholder:'Enter password again',showPassword:'Show password',hidePassword:'Hide password',passwordMismatch:'Passwords do not match.',
  loginPasswordLabel:'Password',photoLabel:'Profile photo',preview:'Photo preview',registerButton:'Register and sign in',
  loginButton:'Sign in',newRegisterButton:'Register a new user',note:'This version stores information in this browser only.',
  nameError:'Please enter your name correctly.',phoneError:'The phone number must be exactly 10 digits.',phoneShort:'The phone number is still shorter than 10 digits.',
  passwordError:'Password must contain at least 4 digits and numbers only.',photoError:'Please upload your photo.',
  imageInvalid:'Please choose a valid image.',imageLarge:'The image must be smaller than 8 MB.',
  imageRead:'Could not read the image.',imageBad:'The image file could not be opened.',saveError:'Could not save information; browser storage may be full.',
  success:'Registration successful. Signing in...',wrongPhone:'Phone number is incorrect.',wrongPassword:'Incorrect password.',
  loginError:'Sign-in failed. Please try again.',replaceConfirm:'A new registration will replace the previous account. Continue?'
 }
};
const tr=k=>(T[lang]||T.fa)[k]||T.fa[k]||k;
const readAccount=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}};
const normalizePhone=v=>String(v||'').trim();
const hash=async value=>{
 const bytes=new TextEncoder().encode(value);
 const digest=await crypto.subtle.digest('SHA-256',bytes);
 return Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,'0')).join('');
};
const setMessage=(text,isError=true)=>{message.textContent=text;message.style.color=isError?'#c0392b':'#16834a'};
function applyLanguage(){
 document.documentElement.lang=lang==='fa'?'fa':lang;
 document.documentElement.dir=lang==='en'?'ltr':'rtl';
 document.getElementById('authLanguageLabel').textContent=tr('language');
 const forgot=document.getElementById('forgotPassword');if(forgot)forgot.href='https://wa.me/93704689507?text='+encodeURIComponent(tr('supportMessage'));
 document.querySelectorAll('.password-eye').forEach(btn=>{const input=btn.parentElement.querySelector('input');const key=input&&input.type==='text'?'hidePassword':'showPassword';btn.setAttribute('aria-label',tr(key));btn.title=tr(key);});
 document.querySelectorAll('[data-auth]').forEach(el=>el.textContent=tr(el.dataset.auth));
 registerForm.querySelector('[name="fullName"]').placeholder=tr('namePlaceholder');
 registerForm.querySelector('[name="phone"]').placeholder=tr('phonePlaceholder');
 loginForm.querySelector('[name="phone"]').placeholder=tr('savedPhone');
 registerForm.querySelector('[name="password"]').placeholder=tr('passwordPlaceholder');
 registerForm.querySelector('[name="confirmPassword"]').placeholder=tr('confirmPasswordPlaceholder');
 loginForm.querySelector('[name="password"]').placeholder=tr('loginPasswordLabel');
 preview.textContent=tr('preview');
 document.getElementById('authNote').textContent=tr('note');
 document.querySelectorAll('.phone-length-warning:not([hidden])').forEach(hint=>hint.textContent=tr('phoneShort'));
 updatePhoneValidationMessages();
 if(registerForm.hidden)showLogin(false);else showRegister(false);
}
function updatePhoneValidationMessages(){
 document.querySelectorAll('#registerForm input[name="phone"], #loginForm input[name="phone"]').forEach(input=>{
  const value=normalizePhone(input.value);
  input.setCustomValidity(value && !/^\d{10}$/.test(value) ? tr('phoneError') : '');
 });
}
function installPhoneLengthWarnings(){
 document.querySelectorAll('#registerForm input[name="phone"], #loginForm input[name="phone"]').forEach(input=>{
  const hint=document.createElement('small');
  hint.className='phone-length-warning';
  hint.setAttribute('role','status');
  hint.setAttribute('aria-live','polite');
  hint.hidden=true;
  input.insertAdjacentElement('afterend',hint);
  const validate=()=>{
   const digits=normalizePhone(input.value).replace(/\D/g,'').length;
   const show=input.value.length>0 && digits<10;
   hint.textContent=show?tr('phoneShort'):'';
   hint.hidden=!show;
   input.setAttribute('aria-invalid',show?'true':'false');
  };
  input.addEventListener('input',()=>{validate();updatePhoneValidationMessages();});
  input.addEventListener('blur',()=>{validate();updatePhoneValidationMessages();});
 });
}
function installPasswordMatchWarning(){
 const password=registerForm.querySelector('input[name="password"]');
 const confirmPassword=registerForm.querySelector('input[name="confirmPassword"]');
 if(!password||!confirmPassword)return;
 const hint=document.createElement('small');
 hint.className='phone-length-warning';
 hint.setAttribute('role','alert');
 hint.setAttribute('aria-live','polite');
 hint.hidden=true;
 confirmPassword.insertAdjacentElement('afterend',hint);
 const validate=()=>{
  const hasBoth=password.value.length>0&&confirmPassword.value.length>0;
  const mismatch=hasBoth&&password.value!==confirmPassword.value;
  hint.textContent=mismatch?tr('passwordMismatch'):'';
  hint.hidden=!mismatch;
  confirmPassword.setAttribute('aria-invalid',mismatch?'true':'false');
 };
 password.addEventListener('input',validate);
 confirmPassword.addEventListener('input',validate);
 password.addEventListener('change',validate);
 confirmPassword.addEventListener('change',validate);
}
function showRegister(clear=true){
 title.textContent=tr('registerTitle');intro.textContent=tr('registerIntro');
 registerForm.hidden=false;loginForm.hidden=true;if(clear)message.textContent='';
}
function showLogin(clear=true){
 title.textContent=tr('loginTitle');intro.textContent=tr('loginIntro');
 registerForm.hidden=true;loginForm.hidden=false;if(clear)message.textContent='';
}

function installPasswordEyes(){
 document.querySelectorAll('#authGate input[type="password"]').forEach(input=>{
  if(input.parentElement.classList.contains('password-field'))return;
  const wrap=document.createElement('div');wrap.className='password-field';
  input.parentNode.insertBefore(wrap,input);wrap.appendChild(input);
  const eye=document.createElement('button');eye.type='button';eye.className='password-eye';
  // Passwords are visible by default; use a familiar eye icon for the toggle.
  input.type='text';
  const eyeIcon='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
  eye.innerHTML=eyeIcon;eye.setAttribute('aria-label',tr('hidePassword'));eye.title=tr('hidePassword');
  eye.addEventListener('click',()=>{
   const hide=input.type==='text';input.type=hide?'password':'text';
   eye.setAttribute('aria-label',tr(hide?'showPassword':'hidePassword'));
   eye.title=tr(hide?'showPassword':'hidePassword');
  });
  wrap.appendChild(eye);
 });
}

function openSite(){sessionStorage.setItem(SESSION,'1');gate.remove();}
function resizePhoto(file){
 return new Promise((resolve,reject)=>{
  if(!file||!file.type.startsWith('image/'))return reject(new Error(tr('imageInvalid')));
  if(file.size>8*1024*1024)return reject(new Error(tr('imageLarge')));
  const reader=new FileReader();
  reader.onerror=()=>reject(new Error(tr('imageRead')));
  reader.onload=()=>{
   const img=new Image();img.onerror=()=>reject(new Error(tr('imageBad')));
   img.onload=()=>{
    const max=480,scale=Math.min(1,max/Math.max(img.width,img.height));
    const canvas=document.createElement('canvas');canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);
    canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
    resolve(canvas.toDataURL('image/jpeg',.78));
   };img.src=reader.result;
  };reader.readAsDataURL(file);
 });
}
photoInput.addEventListener('change',async()=>{
 const file=photoInput.files?.[0];if(!file)return;
 try{selectedPhoto=await resizePhoto(file);preview.innerHTML='';const img=document.createElement('img');img.src=selectedPhoto;preview.append(img);setMessage('',false);}
 catch(e){selectedPhoto='';setMessage(e.message);}
});
registerForm.addEventListener('submit',async e=>{
 e.preventDefault();setMessage('');
 const f=new FormData(registerForm),name=String(f.get('fullName')||'').trim(),phone=normalizePhone(f.get('phone')),password=String(f.get('password')||'');
 if(name.length<2)return setMessage(tr('nameError'));
 if(!/^\d{10}$/.test(phone))return setMessage(tr('phoneError'));
 if(!/^\d{4,32}$/.test(password))return setMessage(tr('passwordError'));
 if(password!==String(f.get('confirmPassword')||''))return setMessage(tr('passwordMismatch'));
 if(!selectedPhoto)return setMessage(tr('photoError'));
 try{
  const account={name,phone,passwordHash:await hash(password),photo:selectedPhoto,createdAt:new Date().toISOString()};
  localStorage.setItem(KEY,JSON.stringify(account));setMessage(tr('success'),false);openSite();
 }catch(err){setMessage(tr('saveError'));}
});
loginForm.addEventListener('submit',async e=>{
 e.preventDefault();setMessage('');
 const f=new FormData(loginForm),phone=normalizePhone(f.get('phone')),password=String(f.get('password')||''),account=readAccount();
 if(!account)return showRegister();
 if(!/^\d{10}$/.test(phone))return setMessage(tr('phoneError'));
 if(phone!==account.phone)return setMessage(tr('wrongPhone'));
 if(!/^\d{4,32}$/.test(password))return setMessage(tr('passwordError'));
 try{if(await hash(password)!==account.passwordHash)return setMessage(tr('wrongPassword'));openSite();}
 catch{setMessage(tr('loginError'));}
});
document.getElementById('showRegister').addEventListener('click',()=>{
 if(!confirm(tr('replaceConfirm')))return;
 localStorage.removeItem(KEY);selectedPhoto='';photoInput.value='';registerForm.reset();showRegister();
});
installPasswordEyes();
installPhoneLengthWarnings();
installPasswordMatchWarning();
languageSelect.value=lang;
languageSelect.addEventListener('change',()=>{lang=languageSelect.value;localStorage.setItem('bostAuthLanguage',lang);applyLanguage();});
if(sessionStorage.getItem(SESSION)==='1'){gate.remove();}
else{applyLanguage();if(readAccount())showLogin();else showRegister();}
})();