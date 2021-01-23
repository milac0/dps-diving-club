import $ from "jquery";
import Headroom from "headroom.js";

(function ($) {
  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    common: {
      init: function () {},
      finalize: function () {
        console.log("[Ok!]");
      },
    },
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function (func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = funcname === undefined ? "init" : funcname;
      fire = func !== "";
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === "function";

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function () {
      // Fire common init JS
      UTIL.fire("common");
      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, "_").split(/\s+/), function (
        i,
        classnm
      ) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, "finalize");
      });

      // Fire common finalize JS
      UTIL.fire("common", "finalize");
      //$(#sh);
    },
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

  var headroomOptions = {
    // vertical offset in px before element is first unpinned
    offset: 200,
  };

  var headroomElement = document.querySelector("header");
  var headroom = new Headroom(headroomElement);
  // initialise
  headroom.init(headroomOptions);

  $(".burger-menu__icon").on("click", function () {
    $(".burger-menu").toggleClass("burger-menu--opened");
    $(".icon__line--second").toggleClass("icon__line--opened");
    $(".content-overlay").toggleClass("content-overlay--on");
    $("header").toggleClass("header--opened");
  });

  $(".content-overlay").on("click", function () {
    $(".content-overlay").removeClass("content-overlay--on");
    $(".icon__line--second").removeClass("icon__line--opened");
    $(".burger-menu").removeClass("burger-menu--opened");
    $("header").removeClass("header--opened");
  });

  $(".burger-menu__item").on("click", function () {
    $(".content-overlay").removeClass("content-overlay--on");
    $(".icon__line--second").removeClass("icon__line--opened");
    $(".burger-menu").removeClass("burger-menu--opened");
    $("header").removeClass("header--opened");
  });
})(jQuery); // Fully reference jQuery after this point.
