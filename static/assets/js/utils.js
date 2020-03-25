var esperar_e_executar = function (clausula, callback, tempo, periodo) {
  /**
   * Fica periodicamente checando uma condição.
   * Quando a condição for verdadeiro, executa uma função callback
   * e para de checar.
   */
  if (periodo === undefined) periodo = 500;
  if (tempo === undefined) tempo = 500;
  else if (typeof tempo === "function") tempo = tempo();
  var interval = setInterval(function () {
    if (clausula()) {
      clearInterval(interval);
      setTimeout(callback, tempo);
    }
  }, periodo);
};

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}