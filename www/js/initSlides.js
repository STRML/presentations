/* global qrcode, Reveal, io, zoom, hljs*/
var remoteServer = "http://securesha.re:8008";
// generate our random hash
var uid = "qazwsxedcrfvtgbyhnujmikolp1234567890".split('').sort(function(){return 0.5-Math.random();}).join('');

// we need this to generate the URL
var createQrCode = function(text) {
  var qr = qrcode(5, 'M');
  qr.addData(text);
  qr.make();

  return qr.createImgTag(10);
};

// make qr code
document.getElementById('qr').innerHTML = createQrCode(remoteServer + '/remote.html#'+uid);

// connected?
var connected = false;

// create presentation
Reveal.initialize({
  controls: true,
  keyboard: true,
  progress: true,
  history: true,
  center: true,
  width: 1280,
  height: 800,
  // Optional libraries used to extend on reveal.js
  dependencies: [
    { src: 'js/classList.js', condition: function() { return !document.body.classList; } },
    { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
    { src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
    { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
  ]
});

// Wait for global `zoom` to be present, then fix webkit jank
var zoomInterval = setInterval(function() {
  if (window.zoom) {
    clearInterval(zoomInterval);
    fixZoomJank();
  }
}, 50);

function fixZoomJank(){
  Reveal.toggleOverview();
  zoom.to({element: document.querySelector('.present')});
  zoom.out();
  Reveal.toggleOverview();
}


// connect to server
var socket = io.connect(remoteServer);

// identify with server
socket.on('identify', function() {
  socket.emit('identity', {
    type: 'viewer',
    uid: uid
  });
});

// connected and ready
socket.on('ready', function() {
  if (!connected) {
    Reveal.right();
    connected = true;
    setTimeout(function() {
      document.querySelector(".socketConnection img").style.opacity = 1;
    }, 4000);
  }
});

// lose connection
socket.on('disconnected', function() {
  // lost the remote
  window.alert('lost connection.');
});

// register moves
var proxyMethods = ['right', 'left', 'up', 'down', 'next', 'prev'];
socket.on('msg', function(data){
  var msg = data.msg;
  if (proxyMethods.indexOf(msg) !== -1){
    Reveal[msg]();
  } else if (msg === 'zoom') {
    resetPan();
    var el = document.querySelector(".present code");
    zoom.to({element: el, pan: false});
  } else if (msg.indexOf('zoom') === 0 && msg.length > 4){
    var direction = msg.slice(4);
    panScreen(direction);
  } else if (msg === "overview") {
    Reveal.toggleOverview();
  }
});

//
// Zoom Panning
//

var currentPan;
var reveal = document.querySelector('.reveal');
resetPan();

function panScreen(direction) {
  var scrollAmount = 50; // magicnum
  if (direction === "up") {
    currentPan.top += scrollAmount;
  }
  // Down
  else if( direction === "down") {
    currentPan.top -= scrollAmount;
  }

  // Left
  if(direction === "left") {
    currentPan.left += scrollAmount;
  }
  // Right
  else if(direction === "right") {
    currentPan.left -= scrollAmount;
  }
  doPan();
}

function resetPan() {
  var transition = "all 0.5s ease";
  reveal.style.transition = transition;
  reveal.style.OTransition = transition;
  reveal.style.msTransition = transition;
  reveal.style.MozTransition = transition;
  reveal.style.WebkitTransition = transition;

  currentPan = {top: 0, left: 0};
  doPan();
}

function doPan() {
  var transform = "translate(" + currentPan.left + "px, " + currentPan.top + "px)";
  reveal.style.transform = transform;
  reveal.style.OTransform = transform;
  reveal.style.msTransform = transform;
  reveal.style.MozTransform = transform;
  reveal.style.WebkitTransform = transform;
}