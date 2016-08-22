// /* global qrcode, Reveal, zoom, hljs, SockJS, epixa */
// var remoteServer = window.location.protocol + '//' + window.location.host;
// // generate our random hash
// var uid = "qazwsxedcrfvtgbyhnujmikolp1234567890".split('').sort(function(){return 0.5-Math.random();}).join('');

// // we need this to generate the URL
// var createQrCode = function(text) {
//   var qr = qrcode(5, 'M');
//   console.log(text);
//   qr.addData(text);
//   qr.make();

//   return qr.createImgTag(10);
// };

// // make qr code
// document.getElementById('qr').innerHTML = createQrCode(remoteServer + '/remote.html#'+uid);

// // connected?
// var connected = false;

//
// Presentation
//

// create presentation
Reveal.initialize({
  controls: true,
  keyboard: true,
  progress: true,
  history: true,
  center: true,
  width: 1280,
  height: 800,
  transition: 'convex',
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

//
// Websockets
//

// // Connect to websocket
// connect();

// function connect() {
//   // connect to server
//   var url = remoteServer + '/socket';
//   var sock = new SockJS(url);

//   // connected and ready
//   sock.onopen = function() {
//     if (!connected) {
//       connected = true;
//       setTimeout(function() {
//         document.querySelector(".socketConnection img").style.opacity = 1;
//       }, 4000);
//     }
//   };
//   // lose connection
//   sock.onclose = function() {
//     // lost the remote
//     console.error('lost connection.');
//     setTimeout(connect, 500);
//   };

//   // register moves
//   sock.onmessage = function(e) {
//     var data = e.data;
//     console.log('data', data);
//     try {
//       data = JSON.parse(data);
//       switch (data.type) {
//         case 'msg':
//           handleMessage(data.data);
//           break;
//         case 'identify':
//           handleIdentify();
//           break;
//       }
//     } catch(e) {
//       console.error("Unable to parse", data, e);
//     }

//   };

//   sock.emit = function(type, data) {
//     sock.send(JSON.stringify({type: type, data: data}));
//   };

//   var proxyMethods = ['right', 'left', 'up', 'down', 'next', 'prev'];
//   function handleMessage(msg) {
//     if (proxyMethods.indexOf(msg) !== -1){
//       Reveal[msg]();
//     } else if (msg === 'zoom') {
//       resetPan();
//       var el = document.querySelector(".present code");
//       zoom.to({element: el, pan: false});
//     } else if (msg.indexOf('zoom') === 0 && msg.length > 4){
//       var direction = msg.slice(4);
//       panScreen(direction);
//     } else if (msg === "overview") {
//       Reveal.toggleOverview();
//     }
//   }

//   // identify with server
//   function handleIdentify() {
//     Reveal.right();
//     sock.emit('identity', {
//       type: 'viewer',
//       uid: uid
//     });
//   }
// }




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
