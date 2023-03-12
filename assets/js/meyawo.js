/*!
=========================================================
* Meyawo Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Take an RFC 3339 or ISO 8601 date and returns
 * the date in human readable form.
 *
 * Will return undefined if lacks browser support
 * or it cannot parse the date.
 *
 * @param  {string} time
 * @param  {object} [lang] Optional language object
 * @return {string|undefined}
 * @license MIT
 * @author Sam Clarke <sam@samclarke.com>
 */
function timeToWords(time, lang) {
  lang = lang || {
    postfixes: {
      "<": " ago",
      ">": " from now",
    },
    1000: {
      singular: "a few moments",
      plural: "a few moments",
    },
    60000: {
      singular: "about a minute",
      plural: "# minutes",
    },
    3600000: {
      singular: "about an hour",
      plural: "# hours",
    },
    86400000: {
      singular: "a day",
      plural: "# days",
    },
    31540000000: {
      singular: "a year",
      plural: "# years",
    },
  };

  var timespans = [1000, 60000, 3600000, 86400000, 31540000000];
  var parsedTime = Date.parse(time.replace(/\-00:?00$/, ""));

  if (parsedTime && Date.now) {
    var timeAgo = parsedTime - Date.now();
    var diff = Math.abs(timeAgo);
    var postfix = lang.postfixes[timeAgo < 0 ? "<" : ">"];
    var timespan = timespans[0];

    for (var i = 1; i < timespans.length; i++) {
      if (diff > timespans[i]) {
        timespan = timespans[i];
      }
    }

    var n = Math.round(diff / timespan);

    return (
      lang[timespan][n > 1 ? "plural" : "singular"].replace("#", n) + postfix
    );
  }
}

// smooth scroll
$(document).ready(function () {
  $(".navbar .nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        700,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });

  $.getJSON(
    "https://api.github.com/users/vicky-project/repos",
    function (json) {
      $("#repos-count").text(json.length);
      let html = "";
      $.each(json, (k, v) => {
        html += `
        <div class="col-md-6 col-lg-3">
          <div class="service-card">
            <div class="body">
              <img class="icon">
              <h6 class="title">${v.name}</h6><p class="subtitle">${
          v.description ?? `No Description`
        }<br><code>${v.clone_url}</code><br><a href="${
          v.html_url
        }" class="btn btn-sm btn-info rounded"><i class="ti-github"></i></a> ${
          v.homepage !== null
            ? `| <a href="` +
              v.homepage +
              `" class="btn btn-sm btn-success">Visit</a>`
            : ``
        } <br> ${formatBytes(v.size * 1024)} | ${v.language} | ${timeToWords(
          v.pushed_at
        )}
              </p>
            </div>
          </div>
        </div>`;
      });
      $("#content-repos").html(html);
    }
  );
});
// navbar toggle
$("#nav-toggle").click(function () {
  $(this).toggleClass("is-active");
  $("ul.nav").toggleClass("show");
});
