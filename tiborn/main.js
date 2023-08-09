
$(window).bind("scroll", function () {
  if ($(window).scrollTop() > 10) {
    $("#navigation").addClass("sticky");
  } else {
    $("#navigation").removeClass("sticky");
  }
});

// $(window).ready(function(){document.body.style.paddingTop = $("#navigation").height() + "px";})