(function($, BASE_URL) {

  document.addEventListener("DOMContentLoaded", function initLinks() {
    var container = document.querySelector(".download-test-drive-links");

    if (!container) { return; }

    var inst = document.querySelector(".one-liners");
    var hint = document.querySelector(".download-hint");

    each(".click-to-copy", inst, function (dom) {
      on(dom, "click", function () {
        var payload = dom.previousElementSibling.textContent;
        writeText(payload).then(function() {
          var i = dom.querySelector(".fa-copy");

          if (i) {
            i.classList.remove("fa-copy");
            i.classList.add("fa-check");

            setTimeout(function() {
              i.classList.remove("fa-check");
              i.classList.add("fa-copy");
            }, 750);
          }
        });
      });
    });

    var manifest = paramToggle(window.location.search, "dl", "latest") ? "latest.json" : "stable.json";

    $.ajax({
      url: [BASE_URL, manifest].join("/"),
      dataType: "json"
    }).done(function(data) {
      data = data || {};

      var platforms = ["osx", "windows", "linux"];

      var links = el("div", {class: "platform-selector"});;
      var filesize = null;

      for (var i = 0, plt, meta, len = platforms.length; i < len; i++) {
        plt = platforms[i];
        meta = data[plt];

        if (null === filesize) {
          if (plt === os() || i === len - 1) {
            filesize = meta.size;
          }
        }

        if (!!meta) {
          if (plt === os()) {
            each(".snippet", inst, function (dom) {
              replaceContent(dom, window.location.origin, buildDownloadUrl(BASE_URL, plt, meta));
            });
          }

          links.appendChild(
            on(el("a", {
              href: buildDownloadUrl(BASE_URL, plt, meta),
              class: plt === os() ? "platform selected" : "platform",
              "data-filesize": meta.size
            }, "osx" === plt ? "macOS" : titleCase(plt)), "click", function (e) {
              e.preventDefault();
              e.stopPropagation();

              var link = e.currentTarget;
              container.querySelector(".selected").classList.remove("selected");
              link.classList.add("selected");

              each(".snippet", inst, function (dom) {
                replaceContent(dom, window.location.origin, link.getAttribute("href"));
              });

              hint.querySelector(".test-drive-file-size").textContent = link.getAttribute("data-filesize");
            })
          );
        }
      }

      empty(container).appendChild(links);
      inst.removeAttribute("hidden");

      var hintfrag = document.createDocumentFragment();
      hintfrag.appendChild(el("p", {}, ["Approximately ", el("span", {class: "test-drive-file-size"}, filesize), " download."]));
      hintfrag.appendChild(el("p", {}, "GoCD test-drive requires a 64 bit machine."));
      empty(hint).appendChild(hintfrag);
    });

  }, false);

  function replaceContent(container, origin, dlUrl) {
    if ("bash" === container.getAttribute("data-content")) {
      replaceWith(container.querySelector("pre"), bash(origin, dlUrl));
    }

    if ("powershell" === container.getAttribute("data-content")) {
      replaceWith(container.querySelector("pre"), pwsh(origin, dlUrl));
    }

    Prism.highlightAllUnder(container);
  }

  function bash(origin, dlUrl) {
    return el("pre", {class: "language-bash"}, el("code", null, "curl -fsSL '" + origin + "/test-drive-gocd/try.sh' | bash -s '" + dlUrl + "'"));
  }

  function pwsh(origin, dlUrl) {
    return el("pre", {class: "language-powershell"}, el("code", null, "iex \"& { $($c=(New-Object Net.WebClient); $c.CachePolicy = (New-Object Net.Cache.RequestCachePolicy(6)); $c.DownloadString('" +
        origin + "/test-drive-gocd/try.ps1')) } '" + dlUrl + "'\""));
  }

  function replaceWith(src, dst) {
    if ("function" === typeof src.replaceWith) {
      src.replaceWith(dst);
    } else {
      if (src.parentElement) {
        src.parentElement.replaceChild(dst, src);
      }
    }

    return dst;
  }

  function each(selector, context, callback) {
    [].slice.call((context || document).querySelectorAll(selector)).forEach(callback);
  }

  function oneliner(heading, scriptUrl, downloadUrl) {
    return el("div", {class: "oneliner"}, [
      el("h3", null, heading),
      el("pre", null, el("code", null, ""))
    ]);
  }

  function buildDownloadUrl(baseUrl, plt, meta) {
    return [
      baseUrl,
      "installers",
      meta.version,
      meta.build,
      ["gocd", meta.version, meta.build, meta.trialbuild, plt + ".zip"].join("-")
    ].join("/");
  }

  function el(tag, attrs, content) {
    var node = "string" === typeof tag ? document.createElement(tag.toLowerCase()) : tag;

    if (attrs) {
      for (var key in attrs) {
        node.setAttribute(key, attrs[key]);
      }
    }

    if (content) {
      if ("string" === typeof content) {
        content = document.createTextNode(content);
      }

      if (content.forEach) {
        content.forEach(function(child) {
          if ("string" === typeof child) {
            child = document.createTextNode(child);
          }
          node.appendChild(child);
        });
      } else {
        node.appendChild(content);
      }
    }
    return node;
  }

  function matches(dom, selector) {
    return ("function" === typeof dom.matches) ? dom.matches(selector) : dom.msMatchesSelector(selector);
  }

  function on(dom, event, selector, handler) {
    if ("function" === typeof selector) {
      handler = selector;
    }

    if ("function" === typeof handler) {
      if ("string" === typeof selector) {
        dom.addEventListener(event, function (e) {
          if (e.target && matches(e.target, selector)) {
            e.stopPropagation();
            handler(e);
          }
        });
      } else {
        dom.addEventListener(event, handler);
      }
    }

    return dom;
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

})(jQuery, "https://download.gocd.org/test-drive");
