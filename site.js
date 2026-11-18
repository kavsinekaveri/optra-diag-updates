/* shared: language, nav, footer, reveal */
(function(){
var NAMES={ar:"العربية",en:"English",ru:"Русский",uz:"Oʻzbekcha"}, DIR={ar:"rtl",en:"ltr",ru:"ltr",uz:"ltr"}, ORDER=["ar","en","ru","uz"];
var U={
ar:{nav_home:"الرئيسية",nav_feat:"المميزات",nav_inst:"التثبيت",nav_blog:"الأسئلة والمقالات",legal1:"التطبيق وجميع محتوياته ملكية خاصة لـ The Doctor Optra Garage ومحمية بقوانين الملكية الفكرية. يمنع النسخ أو التعديل أو فك التطبيق أو الالتفاف على التفعيل أو مشاركة الأكواد، وأي مخالفة تعرّض صاحبها للمساءلة القانونية.",legal2:"Chevrolet وOptra وLacetti وGentra علامات تجارية لأصحابها. التطبيق مستقل وغير تابع لهم ولا معتمد منهم. القراءات للمعلومة وتُستخدم على مسؤولية المستخدم.",dlapp:"تحميل التطبيق"},
en:{nav_home:"Home",nav_feat:"Features",nav_inst:"Install",nav_blog:"FAQ & Articles",legal1:"The app and everything in it is the private property of The Doctor Optra Garage and is protected by intellectual property laws. Copying, modifying, decompiling, bypassing the activation or sharing codes is prohibited, and violations may lead to legal action.",legal2:"Chevrolet, Optra, Lacetti and Gentra are trademarks of their owners. The app is independent and not affiliated with or endorsed by them. Readings are informational and use is at the user's own risk.",dlapp:"Download the app"},
ru:{nav_home:"Главная",nav_feat:"Возможности",nav_inst:"Установка",nav_blog:"Вопросы и статьи",legal1:"Приложение и всё его содержимое являются частной собственностью The Doctor Optra Garage и защищены законами об интеллектуальной собственности. Копирование, изменение, декомпиляция, обход активации и передача кодов запрещены, за нарушения возможна юридическая ответственность.",legal2:"Chevrolet, Optra, Lacetti и Gentra являются товарными знаками их владельцев. Приложение независимо, не связано с ними и не одобрено ими. Показания носят информационный характер, использование на риск пользователя.",dlapp:"Скачать приложение"},
uz:{nav_home:"Bosh sahifa",nav_feat:"Imkoniyatlar",nav_inst:"Oʻrnatish",nav_blog:"Savollar va maqolalar",legal1:"Ilova va undagi hamma narsa The Doctor Optra Garage ning shaxsiy mulki boʻlib, intellektual mulk qonunlari bilan himoyalangan. Nusxalash, oʻzgartirish, dekompilyatsiya, faollashtirishni aylanib oʻtish va kodlarni tarqatish taqiqlanadi, buzganlar qonuniy javobgarlikka tortilishi mumkin.",legal2:"Chevrolet, Optra, Lacetti va Gentra ularning egalarining tovar belgilaridir. Ilova mustaqil, ular bilan bogʻliq emas va ular tomonidan tasdiqlanmagan. Koʻrsatkichlar maʼlumot uchun, foydalanish foydalanuvchining oʻz xavfi ostida.",dlapp:"Ilovani yuklab olish"}
};
var cbs=[], lang;
function pick(){var s=null;try{s=localStorage.getItem("lang")}catch(e){}if(s&&DIR[s])return s;var n=(navigator.language||"en").slice(0,2).toLowerCase();return DIR[n]?n:"en"}
function base(){var p=location.pathname.split("/").pop()||"index.html";return p}
function chrome(){
  var page=base(), blog=/faq|article/.test(page);
  var u=U[lang];
  document.getElementById("nav").innerHTML='<div class="in"><a class="brand" href="index.html"><img src="img/optra_wordmark.png" alt="Optra Diag"></a>'+
   '<nav class="links"><a href="index.html"'+(blog?'':' class="on"')+'>'+u.nav_home+'</a><a href="index.html#features">'+u.nav_feat+'</a><a href="index.html#install">'+u.nav_inst+'</a><a class="hot'+(blog?' on':'')+'" href="faq.html">'+u.nav_blog+'</a></nav>'+
   '<div class="lang"><button id="langBtn" type="button" aria-haspopup="true">'+NAMES[lang]+'</button><div class="menu" id="langs"></div></div></div>';
  var box=document.getElementById("langs");
  ORDER.forEach(function(k){var b=document.createElement("button");b.type="button";b.textContent=NAMES[k];if(k===lang)b.className="on";b.onclick=function(){set(k)};box.appendChild(b)});
  document.getElementById("langBtn").onclick=function(e){e.stopPropagation();box.classList.toggle("open")};
  var f=document.getElementById("foot");
  if(f)f.innerHTML='<div class="wrap"><div class="fl"><img src="img/logo_garage_white.png" alt="The Doctor Optra Garage"><div class="fa"><a href="index.html">'+u.nav_home+'</a><a href="faq.html">'+u.nav_blog+'</a><a href="index.html#install">'+u.dlapp+'</a><a href="https://wa.me/966578087254" target="_blank" rel="noopener">WhatsApp</a></div></div><p>'+u.legal1+'</p><p>'+u.legal2+'</p><p>&copy; 2026 The Doctor Optra Garage</p></div>';
}
function set(l,silent){
  lang=l;try{localStorage.setItem("lang",l)}catch(e){}
  document.documentElement.lang=l;document.documentElement.dir=DIR[l];
  chrome();cbs.forEach(function(f){f(l)});
}
document.addEventListener("click",function(){var m=document.getElementById("langs");if(m)m.classList.remove("open")});
window.addEventListener("scroll",function(){var n=document.getElementById("nav");if(n)n.classList.toggle("solid",window.scrollY>30)},{passive:true});
window.SITE={get lang(){return lang},onLang:function(f){cbs.push(f)},reveal:function(root){
  var els=(root||document).querySelectorAll(".rv:not(.in)");
  if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("in")});return}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});
},start:function(){set(pick());var n=document.getElementById("nav");if(n)n.classList.toggle("solid",window.scrollY>30)}};
})();
