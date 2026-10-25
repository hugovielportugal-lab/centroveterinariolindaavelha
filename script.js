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
      show(msg, "A abrir o seu programa de e-mail. Carregue em Enviar para concluir.", true);
      openMail("Pedido de marcação - " + animal,
        "Nome: " + nome + "\nTelemóvel: " + tel + "\nAnimal: " + animal + " (" + esp + ")\nMotivo: " + motivo);
    });
  }

  var fs = document.getElementById("f-sug");
  if (fs) {
    fs.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.getElementById("s-msg");
      var texto = clean(document.getElementById("s-texto").value, 800);
      var mail = clean(document.getElementById("s-mail").value, 120);
      if (!texto) { show(msg, "Escreva a sua sugestão.", false); return; }
      if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) { show(msg, "O e-mail indicado não parece válido.", false); return; }
      show(msg, "A abrir o seu programa de e-mail. Carregue em Enviar para concluir.", true);
      openMail("Sugestão pelo site", texto + (mail ? "\n\nResponder para: " + mail : ""));
    });
  }
})();
