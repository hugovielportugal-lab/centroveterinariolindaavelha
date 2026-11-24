(function(){
var ID='G-DHE4H19WJS',K='cvla_cookies';
function load(){
if(window.__ga)return;window.__ga=1;
window.dataLayer=window.dataLayer||[];
window.gtag=function(){dataLayer.push(arguments)};
gtag('js',new Date());gtag('config',ID,{anonymize_ip:true});
var s=document.createElement('script');s.async=true;
s.src='https://www.googletagmanager.com/gtag/js?id='+ID;
document.head.appendChild(s);
}
function get(){try{return localStorage.getItem(K)}catch(e){return null}}
function set(v){try{localStorage.setItem(K,v)}catch(e){}}
function banner(){
if(document.getElementById('ck-banner'))return;
var b=document.createElement('div');b.id='ck-banner';b.setAttribute('role','dialog');b.setAttribute('aria-label','Cookies');
b.innerHTML='<p>Usamos cookies de análise (Google Analytics) para perceber como o site é usado e melhorá-lo. Só são ativados se aceitar. <a href="privacidade.html">Saber mais</a></p><div class="ck-btns"><button type="button" id="ck-no">Recusar</button><button type="button" id="ck-yes">Aceitar</button></div>';
document.body.appendChild(b);
document.getElementById('ck-yes').onclick=function(){set('sim');b.remove();load()};
document.getElementById('ck-no').onclick=function(){set('nao');b.remove()};
}
function init(){
var c=get();
if(c==='sim')load();else if(c!=='nao')banner();
var r=document.getElementById('ck-reset');
if(r)r.onclick=function(){set('');try{localStorage.removeItem(K)}catch(e){}location.reload()};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
