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
    var buttons = document.querySelectorAll("[data-download]");
    buttons.forEach(function (a) { a.href = releases; });
    document.querySelectorAll("[data-repo]").forEach(function (a) { a.href = "https://github.com/" + REPO; });

    // Lien direct vers le .dmg de la dernière version, demandé à GitHub.
    // En cas d'échec (hors ligne, limite de l'API), les boutons gardent le lien vers la page de la version.
    if (window.fetch) {
      fetch("https://api.github.com/repos/" + REPO + "/releases/latest", { headers: { Accept: "application/vnd.github+json" } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (rel) {
          var dmg = rel && (rel.assets || []).filter(function (x) { return /\.dmg$/i.test(x.name); })[0];
          if (dmg) buttons.forEach(function (a) { a.href = dmg.browser_download_url; });
        })
        .catch(function () {});
    }
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
