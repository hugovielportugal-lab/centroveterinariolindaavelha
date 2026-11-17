(function () {
  "use strict";
  // Marca os pedidos vindos desta página, para sabermos de onde chegam
  var f = document.getElementById("f-marcacao");
  if (!f) { return; }
  f.addEventListener("submit", function () {
    var m = document.getElementById("m-motivo");
    if (m && m.value.indexOf("[1.ª consulta]") !== 0) { m.value = "[1.ª consulta] " + m.value; }
  }, true);
})();
