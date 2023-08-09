var $ = jQuery;

var swiper = new Swiper(".ak-yol-swiper", {
  effect: "fade",
  fadeEffect: { crossFade: true },
  loop: true,
  allowTouchMove: false,
  speed: 2000,
  autoplay: { delay: 4000 },
});

$(window).bind("scroll", function () {
  if ($(window).scrollTop() > 10) {
    $("#navigation").addClass("fixed");
  } else {
    $("#navigation").removeClass("fixed");
  }
});

if (window.innerWidth < 992) {
  $("#nav-menu").on("click", function (evt) {
    $("#navigation").toggleClass("menu-active");

    if ($("#navigation").hasClass("menu-active")) {
      $("#navigation .header-menu").fadeIn("slow");
    } else {
      $("#navigation .header-menu").hide();
    }
  });

  $("#navigation li").on("click", function () {
    $("#navigation").removeClass("menu-active");
    $("#navigation .header-menu").hide();
  });
}

$(".header-menu > li > a").on("click", function (evt) {
  if ($(evt.target).attr("href").startsWith("contact")) return;

  evt.preventDefault();
  $("html,body").animate(
    // { scrollTop: $($(evt.target).attr("href")).offset().top },
    {
      scrollTop:
        $($(evt.target).attr("href")).offset().top - $("#navigation").height(),
    },
    "slow"
  );
});
