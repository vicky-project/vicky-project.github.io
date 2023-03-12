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

  $.ajax({
    url: "https://api.github.com/user",
    dataType: "json",
    headers: {
      Authorization:
        "Basic " +
        btoa(
          "vicky-project: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"
        ),
    },
    data: {
      username: "",
      password: "",
    },
    success: function (data) {
      console.log(data);
    },
    error: function (e) {
      console.log(e);
    },
  });
});

// navbar toggle
$("#nav-toggle").click(function () {
  $(this).toggleClass("is-active");
  $("ul.nav").toggleClass("show");
});
