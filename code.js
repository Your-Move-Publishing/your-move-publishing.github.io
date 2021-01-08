var stripe = Stripe('pk_live_51I4z07DmqJwbTDJD2MyELRnWhxe0lFQnO9wyCAdAq0OfTXiKqHkj8e5j98AezGqPX9r2NSUWzNfQG7lUEdp9cmu400kpwTjeAs');

var live_site_url = "https://yourmovepublishing.com";

// order options for stripe price items
var product_dict = {
  'teach-book': ['price_1I5bc7DmqJwbTDJDVzUp23cc','price_1I5d9iDmqJwbTDJDpSgcAwbA'],
  'enjoy-preorder': ['price_1I6caPDmqJwbTDJDJgknsN6k']
};

// define function to replace buttons with redirect pending text
function redirectDots(id_btn, id_replace, url = live_site_url, change_window = true) {
  var max_dots = 15;

  var cta_button = document.getElementById(id_btn);
  var cta_replace = document.getElementById(id_replace);

  cta_button.style.display = "none";
  cta_replace.style.display = "inline-block";

  if (change_window) {
    window.location.href = url;
  }

  var dot_count = 0;
  var dotTrigger = setInterval(loadDots, 333);
  function loadDots() {
    if (dot_count >= max_dots){
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
    return;
  }
  return;
}

// define function going to stripe checkout
function goToStripe(id_btn, id_replace, product){

  // get price objects for checkout
  var stripe_price_list = product_dict[product];
  var items = [];
  for (code of stripe_price_list){
    items.push({
      price: code,
      quantity: 1
    });
  }

  // start redirect animation
  redirectDots(id_btn, id_replace, live_site_url, change_window = false);

  // go to stripe
  stripe.redirectToCheckout({
    lineItems: items,
    mode: 'payment',
    successUrl: 'https://yourmovepublishing.com/success.html',
    cancelUrl: 'https://yourmovepublishing.com',
    shippingAddressCollection: {
      allowedCountries: ['US'],
    },
    billingAddressCollection: 'auto'
  }).then(function (result) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
    window.location.href = 'failure.html';
    alert("Sorry, we encountered an error...please try again! Error message: " + `result.error.message`);
  }).catch(function(err){
    window.location.href = 'failure.html';
    alert('Sorry, looks like we have an unexpected error going to the checkout page. This is not supposed to happen, and we will be working to fix it right away. You may contact us using the info provided in the FAQ section, and we will get your order processed right away!  \n\nError Message:\n' + `${err.message}`);
  });

  return;
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



//// animation for success page ////

function toggleClassDisplay(classList){
  for (c of classList){
    [].forEach.call(document.querySelectorAll(c), function(elem){
      if (window.getComputedStyle(elem,null).display == 'none'){
        elem.style.display = 'inline-block';
      } else {
        elem.style.display = 'none';
      }
    });
  }
  return;
}

function blinkThrice(interval){
  var max = 6; //toggle repetitions
  for (var i = 0; i < max; i++){
    setTimeout(toggleClassDisplay, interval * i, ['.blink1','.blink2']);
  }
  return interval * max;
}

function truckMove(interval){
  var distance = 7;
  var dashes = ' - -';

  var truckElem = document.getElementById("success-truck");

  var steps = 0;
  var truckTrigger = setInterval(addStep, interval);

  function addStep() {
    if (steps >= distance){
      stopTruck();
      return;
    }
    truckElem.innerHTML += dashes;
    steps += 1;
    return;
  }

  function stopTruck(){
    clearInterval(truckTrigger);
    truckElem.innerHTML = dashes + truckElem.innerHTML.substring(2); // remove truck
    setTimeout(function(){truckElem.style.display = 'none';}, interval);
    return;
  }
  return;
}

function successAnimate(){
  var delay_percent = .8;
  var time_unit = 200;
  // trigger blinking celebration
  var blink_ms = blinkThrice(time_unit);
  // triger truck motion
  setTimeout(truckMove,blink_ms * delay_percent,time_unit);
  return;
}

$( document ).ready(function(){
  if (window.location.pathname.includes("success")) {
    successAnimate();
  }
  return;
});
