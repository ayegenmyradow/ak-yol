var swiper = new Swiper(".akyol-swiper", {
  effect: "fade",
  fadeEffect: { crossFade: true },
  loop: true,
  allowTouchMove: false,
  speed: 2000,
  autoplay: { delay: 4000 },
});

var swiper = new Swiper(".brands-swiper", {
  slidesPerView: 7,
  spaceBetween: 30,
  slidesPerGroup: 7,
  loop: true,
  loopFillGroupWithBlank: true,
  speed: 2000,
  autoplay: { delay: 4000 },
});

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("component");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status === 404) {
            elmnt.innerHTML = "Page not found";
          }
          elmnt.removeAttribute("component");
          includeHTML();
        }
      };

      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}

var num = 0; /// $("#top-header-wrapper").height(); //number of pixels before modifying styles

$(window).bind("scroll", function () {
  if ($(window).scrollTop() > num) {
    $("#navigation").addClass("fixed");
  } else {
    $("#navigation").removeClass("fixed");
  }
});

$(document).ready(function () {
  $(".header-menu > li > a").on("click", function (evt) {
    if ($(evt.target).attr("href").startsWith("contact")) return;

    evt.preventDefault();
    $("html,body").animate(
      // { scrollTop: $($(evt.target).attr("href")).offset().top },
      {
        scrollTop: $($(evt.target).attr("href")).offset().top - $("#navigation").height(),
      },
      "slow"
    );
  });

  $("ul.tab-header > li > a").on("click", function (evt) {
    evt.preventDefault();
    const nextTab = $(evt.target).attr("href");
    const currentTab = $("#tabContent > .active-tab");

    if ("#" + currentTab.attr("id") !== nextTab) {
      $(".tab-header a.active").removeClass("active");
      $(evt.target).addClass("active");

      currentTab.hide().removeClass("active-tab");

      $(nextTab).fadeIn("slow").addClass("active-tab");
    }
  });

  includeHTML();

  var isCounted = false,
    counter = document.querySelector(".h-counter");

  function isInViewport(node) {
    var rect = node.getBoundingClientRect();
    return (
      (rect.height > 0 || rect.width > 0) &&
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  $(window).on("scroll", function () {
    if (!isCounted && isInViewport(counter)) {
      isCounted = true;
      $(".c-number").each(function () {
        var size = $(this).text().split(".")[1]
          ? $(this).text().split(".")[1].length
          : 0;
        var Counter = Number($(this).text().replace(/,/g, ""));
        $(this)
          .prop("Counter", Counter * 0.4)
          .animate(
            { Counter },
            {
              duration: 2000,
              step: function (func) {
                $(this).text(parseFloat(func).toFixed(size));
              },
            }
          );
      });
    }
  });
});

if (window.innerWidth < 992){
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

