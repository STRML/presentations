

/*********************
     Device Detection
  *********************/

var isWebkit = /Webkit/i.test(navigator.userAgent),
  isChrome = /Chrome/i.test(navigator.userAgent),
  isMobile = !!("ontouchstart" in window),
  isAndroid = /Android/i.test(navigator.userAgent),
  isIE = document.documentMode;

/******************
    Redirection
  ******************/

if (isMobile && isAndroid && !isChrome) {
  alert("Although Velocity.js works on all mobile browsers, this 3D demo is for iOS devices or Android devices running Chrome only. Redirecting you to Velocity's documentation.");
  window.location = "index.html";
}

/***************
    Helpers
  ***************/

/* Randomly generate an integer between two numbers. */
function r (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Override the default easing type with something a bit more jazzy. */
$.velocity.defaults.easing = "easeInOutsine";

/*******************
      Dot Creation
  *******************/

  /* Differentiate dot counts based on roughly-guestimated device and browser capabilities. */ 
var dotsCount = isMobile ? (isAndroid ? 40 : 70) : (isChrome ? 175 : 125) / 1.5,
  dotsHtml = "",
  $count = $("#count"),
  $dots;

for (var i = 0; i < dotsCount; i++) {
  dotsHtml += "<div class='dot'></div>";
}

$dots = $(dotsHtml);

$count.html(dotsCount);

/*************
      Setup
  *************/

var $container = $("#container");

var screenWidth = window.screen.availWidth,
  screenHeight = window.screen.availHeight,
  chromeHeight = screenHeight - (document.documentElement.clientHeight || screenHeight);

var translateZMin = -725,
  translateZMax = 600;

// var containerAnimationMap = {
//     perspective: [ 215, 50 ],
//     opacity: [ 0.90, 0.55 ]
//   };

/*****************
      Animation
  *****************/

/* Special visual enhancement for WebKit browsers, which are faster at box-shadow manipulation. */
if (isWebkit) {
  $dots.css("boxShadow", "0px 0px 4px 0px #4bc2f1");
}

function setPerspective(x, y) {
  /* Animate the dots' container. */
  var animationMap = {
    perspective: y,
    'perspective-origin':  x + "px " + 50 + "%"
  };
  $container
    .css(animationMap);
}

function getPerspective() {
  //"838px 463px"
  var x = parseInt($container.css('perspective-origin').split(' ')[0], 10);
  var y = parseInt($container.css('perspective'), 10);
  return {x: x, y: y};
}

/* Animate the dots. */
function animateDots() {
  $dots
    .velocity({
      translateX: [
        function() { return "+=" + r(-screenWidth/2.5, screenWidth/2.5); },
        function() { return r(0, screenWidth); }
      ],
      translateY: [
        function() { return "+=" + r(-screenHeight/2.75, screenHeight/2.75); },
        function() { return r(0, screenHeight);}
      ],
      translateZ: [
        function() { return "+=" + r(translateZMin, translateZMax);},
        function() { return r(translateZMin, translateZMax);}
      ],
      opacity: [ 
        function() { return Math.random();},
        function() { return Math.random() + 0.1;}
      ]
    }, { duration: 6000, complete: reverseDots })
    .appendTo($container);
}

function reverseDots() {
  $dots.velocity("reverse", { complete: reverseDots });
}

// Kickoff
animateDots();

var dragging = false, clientWidth = $(window).width(), clientHeight = $(window).height();
var initX = 0, initY = 0, initPerspective;
$(document.body).on('mousedown', function(e) {
  dragging = true;
  initX = e.screenX;
  initY = e.screenY;
  initPerspective = getPerspective();
});
$(document.body).on('mouseup', function(e) {
  dragging = false;
});
$(document.body).on('mousemove', function(e) {
  if (!dragging) return;
  var deltaX = initX - e.screenX;
  var deltaY = (initY - e.screenY) / 10;
  setPerspective(initPerspective.x + deltaX, initPerspective.y + deltaY);
});
