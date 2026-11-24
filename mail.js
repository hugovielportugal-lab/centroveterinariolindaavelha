(function(){
function go(){
var l=document.querySelectorAll('[data-mail]');
for(var i=0;i<l.length;i++){
var p=l[i].getAttribute('data-mail').split('|'),e=p[0]+'@'+p[1];
if(l[i].tagName==='A')l[i].setAttribute('href','mailto:'+e);
if(l[i].hasAttribute('data-txt'))l[i].textContent=e;
}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
