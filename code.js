// set click animation
var teachCoverElem = document.getElementById("teach-cover");
var teachBackElem = document.getElementById("teach-back");

teachBackElem.addEventListener("click", function(){
  teachCoverElem.style.display = 'inline-block';
  teachBackElem.style.display = "none";
});

teachCoverElem.addEventListener("click", function(){
  teachCoverElem.style.display = 'none';
  teachBackElem.style.display = "inline-block";
});

/*
teachBackElem.addEventListener("mouseout", function(){
  teachCoverElem.style.display = 'inline-block';
  teachBackElem.style.display = "none";
});

teachCoverElem.addEventListener("mouseover", function(){
  teachCoverElem.style.display = 'none';
  teachBackElem.style.display = "inline-block";
});

teachBackElem.addEventListener("mousedown", function(){
  teachCoverElem.style.display = "inline-block";
  teachBackElem.style.display = 'none';
});

teachCoverElem.addEventListener("mousedown", function(){
  teachCoverElem.style.display = 'none';
  teachBackElem.style.display = "inline-block";
});

teachBackElem.addEventListener("click", function(){
  window.open('test.pdf');
});

teachCoverElem.addEventListener("click", function(){
  window.open('test.pdf');
});
*/



//mousedown
//mouseup
//click



var stripe = Stripe('pk_live_51I4z07DmqJwbTDJD2MyELRnWhxe0lFQnO9wyCAdAq0OfTXiKqHkj8e5j98AezGqPX9r2NSUWzNfQG7lUEdp9cmu400kpwTjeAs');

var live_site_url = "https://your-move-publishing.github.io"; //"https://yourmovepublishing.com"

function successGoBack(){
  var cta_button = document.getElementById("success-back");
  var cta_replace = document.getElementById("success-redirecting");

  cta_button.style.display = "none";
  cta_replace.style.display = "inline-block";

  window.location.href = live_site_url;

  var dot_count = 0;
  var dotTrigger = setInterval(loadDots, 333);
  function loadDots() {
    if (dot_count >= 15){
      stopDots();
      return;
    }
    cta_replace.innerHTML += ' .';
    dot_count += 1;
    return;
  }
  function stopDots(){
    clearInterval(dotTrigger);
    cta_replace.innerHTML = 'Redirecting';
    cta_button.style.display = "inline-block";
    cta_replace.style.display = "none";
  }
}

function teachBookGoToStripe(){
  /*$("#buy-teach-book").fadeToggle(3000);
  $("#buy-teach-book").fadeToggle(3000);*/

  var cta_button = document.getElementById("buy-teach-book");
  var cta_replace = document.getElementById("buy-teach-redirecting");

  cta_button.style.display = "none";
  cta_replace.style.display = "inline-block";

  stripe.redirectToCheckout({
    lineItems: [{
      price: 'price_1I5bc7DmqJwbTDJDVzUp23cc', // book
      quantity: 1,
    },
    {
      price: 'price_1I5d9iDmqJwbTDJDpSgcAwbA', // shipping handling
      quantity: 1,
    }],
    mode: 'payment',
    successUrl: 'https://your-move-publishing.github.io',
    cancelUrl: 'https://your-move-publishing.github.io',
    shippingAddressCollection: {
      allowedCountries: ['US'],
    },
    billingAddressCollection: 'auto'
  }).then(function (result) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
    cta_button.style.display = "inline-block";
    cta_replace.style.display = "none";

    alert("Sorry, we encountered an error...please try again! Error message: " + `result.error.message`);
  }).catch(function(err){
    alert('Sorry, looks like we have an unexpected error going to the checkout page. This is not supposed to happen, and we will be working to fix it right away. You may contact us using the info provided in the FAQ section, and we will get your order processed right away!  \n\nError Message:\n' + `${err.message}`);
  });

  var dot_count = 0;
  var dotTrigger = setInterval(loadDots, 333);
  function loadDots() {
    if (dot_count >= 15){
      stopDots();
      return;
    }
    cta_replace.innerHTML += ' .';
    dot_count += 1;
    return;
  }
  function stopDots(){
    clearInterval(dotTrigger);
    cta_replace.innerHTML += ' Sorry, 5 seconds have passed. You can continue waiting, or refresh the page and try again.';
  }

  return;
}

function successAnimate(){
  alert(window.location);
}




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


$( document ).ready(function(){
  successAnimate();
});


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
