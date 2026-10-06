// Subelle — petit script du site : lien de téléchargement et choix de la langue.
(function () {
  // Dépôt GitHub : deviné depuis l'adresse GitHub Pages (proprietaire.github.io/depot/).
  // Pour un nom de domaine personnalisé, indiquez-le ici, par exemple "philippe/Subelle".
  var REPO = "subelle/Subelle";

  if (!REPO && /\.github\.io$/.test(location.hostname)) {
    var owner = location.hostname.split(".")[0];
    var repo = location.pathname.split("/").filter(Boolean)[0];
    if (repo && repo !== "fr") REPO = owner + "/" + repo;
  }
  if (REPO) {
    var releases = "https://github.com/" + REPO + "/releases/latest";
    document.querySelectorAll("[data-download]").forEach(function (a) { a.href = releases; });
    document.querySelectorAll("[data-repo]").forEach(function (a) { a.href = "https://github.com/" + REPO; });
  }

  // Langue : le choix fait avec le sélecteur est retenu ; sinon, un navigateur en français va sur /fr/.
  function save(lang) { try { localStorage.setItem("subelle-lang", lang); } catch (e) {} }
  function saved() { try { return localStorage.getItem("subelle-lang"); } catch (e) { return null; } }
  document.querySelectorAll("[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () { save(a.getAttribute("data-lang")); });
  });
  var page = document.documentElement.lang;
  if (page === "en" && !saved()) {
    var langs = navigator.languages || [navigator.language || ""];
    if (String(langs[0] || "").toLowerCase().indexOf("fr") === 0) location.replace("fr/");
  }
})();
