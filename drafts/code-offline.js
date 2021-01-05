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

function startCountdown(elem){
  document.getElementById('code').style.display = 'inline-block';
  var expiration_date = new Date().getTime() + 1000 * 60 * 60 * 24 * 11;
  var x = setInterval(function(){
    var now = new Date().getTime();
    var d = expiration_date - now;
    var days = Math.floor((d % (1000 * 60 * 60 * 24 * 12)) / (1000 * 60 * 60 * 24));
    var h = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var m = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60 ));
    var s = Math.floor((d % (1000 * 60 )) / 1000);
    elem.innerHTML = days + 'd ' + h + 'h ' + m + 'm ' + s + 's';
    if (d < 0){
      clearInterval(x);
      elem.innerHTML = 'EXPIRED';
    }
  }, 1000);
  return;
}

function truckMove(interval){
  var distance = 7;
  var dashes = ' - -';

  var truckElem = document.getElementById("success-truck");
  var planeElem = document.getElementById("success-plane");
  var countdownElem = document.getElementById("success-countdown");

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
  function movePlane(){
    if (window.getComputedStyle(planeElem,null).display == 'none') {
      planeElem.style.display = 'block';
      truckElem.style.display = 'none';
    }

    var planeSteps = 0;
    var target_geom = document.getElementById('success-back').getBoundingClientRect();
    var target = target_geom.left + target_geom.width;
    var planeTrigger = setInterval(addPlaneStep, interval);

    function addPlaneStep() {

      if (planeSteps >= distance && planeElem.getBoundingClientRect().left <= target ){
        stopPlane();
        return;
      }
      planeElem.insertAdjacentHTML("afterbegin",dashes + dashes);

      //innerHTML += ' - -';
      planeSteps += 1;
      return;
    }

    function stopPlane(){
      clearInterval(planeTrigger);
    //  planeElem.insertAdjacentHTML("afterbegin",dashes);
      planeElem.innerHTML = planeElem.innerHTML.substring(0,planeElem.innerHTML.length-2) + '  &#127873;'; // replace plane with gift
      setTimeout(function(){
        planeElem.innerHTML = planeElem.innerHTML.substring(0,planeElem.innerHTML.length - 2);
        startCountdown(countdownElem); // open and display timer
        document.getElementById('success-back').innerHTML += '  &#127873;';
        setTimeout(function(){
          planeElem.style.opacity = '0%';
        },interval * 2);
      },interval * 2);
      return;
    }

  }
  function stopTruck(){
    clearInterval(truckTrigger);
    truckElem.innerHTML = dashes + truckElem.innerHTML.substring(2); // remove truck
    setTimeout(movePlane, interval);
    return;
  }
  return;
}

function successAnimate(){
  if (window.location.pathname.includes("success")) {
    var delay_percent = .8;
    var time_unit = 200;
    // trigger blinking celebration
    var blink_ms = blinkThrice(time_unit);
    // triger truck motion
    setTimeout(truckMove,blink_ms * delay_percent,time_unit);
    return;
  }
  return;
}

successAnimate();

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
