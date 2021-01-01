// sticky header
if ($('.sticky-header').length >= 1) {
  $(window).scroll(function() {
    var header = $(document).scrollTop();
    var headerHeight = $('.header-wrapper').height();
    if (header > headerHeight) {
      $('.sticky-header').addClass('sticky');
      $('.sticky-header').fadeIn();
    } else {
      $('.sticky-header').removeClass('sticky');
    }
  });
}

/*
// scroll action nav show - https://www.codegrepper.com/code-examples/delphi/only+show+navbar+when+scroll+down

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
if (prevScrollpos > currentScrollPos) {
document.getElementById("navbar").style.top = "0";
} else {
document.getElementById("navbar").style.top = "-50px";
}
prevScrollpos = currentScrollPos;
}
*/
