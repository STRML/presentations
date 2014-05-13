// main server setup
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var websockets = require('sockjs').createServer();

// Conf
var port = 8008;

// our sockets
var conns = {};

// let us get stuff please?
app.use(express.static('./www'));

// start listening
server.listen(port);
websockets.installHandlers(server, {prefix: '/socket'});

console.log("Server listening on port", port);

// connection
websockets.on('connection', function(socket) {

  socket.on('data', function(data){
    try {
      console.log('data', data);
      data = JSON.parse(data);
      switch(data.type) {
        case 'identity':
          identity(data.data);
          break;
      }
    } catch(e) {
      console.error("Error parsing", data, e);
    }

  });

  write(socket, {type: 'identify'});

  function identity(data) {
    var uid = data.uid;
    if (!conns[uid]) conns[uid] = {};
    var conn = conns[uid];

    if (data.type === 'viewer') {
      conn.viewer = socket;
    }

    if (data.type === 'remote') {
      conn.remote = socket;

      // register remote disconnect
      socket.once('disconnect', function() {
        if (conn.viewer !== undefined){
          write(conn.viewer, {type: 'disconnected'});
        }
      });
    }

    if (conn !== undefined) {
      if (conn.viewer !== undefined && conn.remote !== undefined) {
        var viewer = conn.viewer;
        var remote = conn.remote;

        // Proxy messages from remote to viewer
        remote.on('data', function(data){
          viewer.write(data);
        });
      }
    }
  }

  function write(socket, data) {
    socket.write(JSON.stringify(data));
  }
});
