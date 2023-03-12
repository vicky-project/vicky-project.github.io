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
      let html;
      $.each(json, (k, v) => {
        console.log(v);
        html += `
        <div class="col-md-6 col-lg-3">
          <div class="service-card">
            <div class="body">
              <h6 class="title">${v.name}</h6><p class="subtitle">${
          v.description ?? `No Description`
        }<br><code>${v.clone_url}</code><br><a href="${
          v.html_url
        }" class="btn btn-sm btn-info rounded">visit</a>
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
