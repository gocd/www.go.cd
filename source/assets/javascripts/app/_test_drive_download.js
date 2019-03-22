(function($, c, BASE_URL) {

  document.addEventListener("DOMContentLoaded", function initLinks() {
    var container = document.querySelector(".download-test-drive-links");

    if (!container) { return; }

    var hint = document.querySelector(".download-hint");

    var manifest = paramToggle(window.location.search, "dl", "latest") ? "latest.json" : "stable.json";

    $.ajax({
      url: new URL(BASE_URL + "/" + manifest).toString(),
      dataType: "json"
    }).done(function(data) {
      data = data || {};

      var platforms = ["osx", "windows", "linux"];

      var links = document.createDocumentFragment();
      var filesize = null;

      for (var i = 0, plt, meta, len = platforms.length; i < len; i++) {
        plt = platforms[i];
        meta = data[plt]

        if (null === filesize) {
          if (plt === os() || i === len - 1) {
            filesize = meta.size
          }
        }

        if (!!meta) {
          links.appendChild(
            c("div", {class: "download-test-drive-package"}, [
              c("a", {href: downloadUrl(BASE_URL, plt, meta), class: "btn btn-primary"}, "osx" === plt ? "Mac OS X" : titleCase(plt)),
              c("a", {href: downloadUrl(BASE_URL, plt, meta) + ".sha256", class: "checksum-link"}, "SHA-256")
            ])
          );
        }
      }

      empty(container).appendChild(links);


      var hintfrag = document.createDocumentFragment();
      hintfrag.appendChild(c("p", ["Approximately ", c("span", {class: "test-drive-file-size"}, filesize), " download."]));
      hintfrag.appendChild(c("p", "GoCD test-drive requires a 64 bit machine."));
      empty(hint).appendChild(hintfrag);
    });

  }, false);

  function downloadUrl(baseUrl, plt, meta) {
    return new URL([
      baseUrl,
      "installers",
      meta.version + "-" + meta.build,
      meta.trialbuild,
      ["gocd", meta.version, meta.build, meta.trialbuild, plt + ".zip"].join("-")
    ].join("/")).toString()
  }


  function os() {
    if (navigator.userAgent.indexOf("Win") !== -1) { return "windows"; }
    if (navigator.userAgent.indexOf("Mac") !== -1) { return "osx"; }
    return "linux";
  }

  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0, len = str.length; i < len; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  function paramToggle(search, key, value) {
    return new RegExp("(\\?|&)" + escapeRegExp(encodeURIComponent(key)) + "=" + escapeRegExp(encodeURIComponent(value)) + "(\\?|&|$)").test(search);
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  function empty(el) {
    while (el.firstChild) { el.removeChild(el.firstChild); }
    return el;
  }

})(jQuery, crel, "https://s3.amazonaws.com/gocd-test-drive-experimental"/* /installers/19.3.0-8719/14 */);
