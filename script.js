(function () {
  "use strict";
  var EMAIL = "geral@centroveterinariolindaavelha.pt";

  // Menu móvel
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Limpa texto: remove caracteres de controlo (evita injeção de cabeçalhos) e limita o tamanho
  function clean(v, max) {
    return String(v || "").replace(/[\u0000-\u001F\u007F]+/g, " ").trim().slice(0, max);
  }
  function show(el, text, ok) {
    el.textContent = text;
    el.className = "msg " + (ok ? "ok" : "err");
  }
  var EJS = { service: "service_309ip3s", template: "template_2qkqgga", key: "NJxFDw-frdjZmQFCD" };
  var lastSend = 0;
  // Envia por EmailJS (HTTPS). Se falhar, abre o programa de e-mail como plano B.
  function sendMail(subject, body, msgEl, okText, done) {
    var now = Date.now();
    if (now - lastSend < 30000) { show(msgEl, "Aguarde alguns segundos antes de enviar novamente.", false); return; }
    lastSend = now;
    show(msgEl, "A enviar...", true);
    var ctrl = new AbortController();
    var t = setTimeout(function () { ctrl.abort(); }, 12000);
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EJS.service, template_id: EJS.template, user_id: EJS.key,
        template_params: { subject: subject, name: "Site Centro Veterinário Linda-a-Velha", message: body, time: new Date().toLocaleString("pt-PT") }
      }),
      signal: ctrl.signal
    }).then(function (r) {
      clearTimeout(t);
      if (!r.ok) { throw new Error("falha"); }
      show(msgEl, okText, true);
      if (done) { done(); }
    }).catch(function () {
      clearTimeout(t);
      show(msgEl, "Não foi possível enviar automaticamente. Vamos abrir o seu programa de e-mail: carregue em Enviar para concluir, ou ligue-nos para o 910 730 466.", false);
      openMail(subject, body);
    });
  }
  function openMail(subject, body) {
    window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  var fm = document.getElementById("f-marcacao");
  if (fm) {
    fm.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.getElementById("m-msg");
      var nome = clean(document.getElementById("m-nome").value, 80);
      var tel = clean(document.getElementById("m-tel").value, 20);
      var animal = clean(document.getElementById("m-animal").value, 60);
      var esp = clean(document.getElementById("m-especie").value, 20);
      var motivo = clean(document.getElementById("m-motivo").value, 500);
      if (!nome || !animal) { show(msg, "Preencha o seu nome e o nome do animal.", false); return; }
      if (!/^[+0-9 ]{9,20}$/.test(tel)) { show(msg, "Indique um número de telemóvel válido.", false); return; }
      if (!document.getElementById("m-ok").checked) { show(msg, "É necessário aceitar o contacto para avançar.", false); return; }
      var hp = document.getElementById("m-hp");
      if (hp && hp.value) { show(msg, "Pedido enviado. Obrigado!", true); return; }
      sendMail("Pedido de marcação" + ((esp === "Cão" || esp === "Gato") ? "" : " (exótico, marcação prévia)") + " - " + animal,
        "Nome: " + nome + "\nTelemóvel: " + tel + "\nAnimal: " + animal + " (" + esp + ")\nMotivo: " + motivo,
        msg, "Pedido enviado! Entraremos em contacto para confirmar o dia e a hora.", function () { fm.reset(); if (typeof upd === "function") { upd(); } });
    });
  }

  var sel = document.getElementById("m-especie");
  var exo = document.getElementById("m-exo");
  var upd = function () { if (sel && exo) { exo.hidden = (sel.value === "Cão" || sel.value === "Gato"); } };
  if (sel) { sel.addEventListener("change", upd); upd(); }

  var fs = document.getElementById("f-sug");
  if (fs) {
    fs.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.getElementById("s-msg");
      var texto = clean(document.getElementById("s-texto").value, 800);
      var mail = clean(document.getElementById("s-mail").value, 120);
      if (!texto) { show(msg, "Escreva a sua sugestão.", false); return; }
      if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) { show(msg, "O e-mail indicado não parece válido.", false); return; }
      sendMail("Sugestão pelo site", texto + (mail ? "\n\nResponder para: " + mail : ""),
        msg, "Sugestão enviada. Obrigado!", function () { fs.reset(); });
    });
  }
})();
