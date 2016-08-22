// main server setup
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const websockets = require('sockjs').createServer();
const fs = require('fs');
const path = require('path');

const workdir = process.argv[2];

if (!workdir || !fs.existsSync(workdir)) throw new Error("Provide the working dir as the second arg!");

// Conf
const port = process.env.PORT || 8080;

// our sockets
const conns = {};

// let us get stuff please?
app.use(express.static(path.join(__dirname, 'www')));
app.use(express.static(workdir));

// start listening
server.listen(port);
websockets.installHandlers(server, {prefix: '/socket'});

console.log("Server listening at http://localhost:" + port);

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
    const uid = data.uid;
    if (!conns[uid]) conns[uid] = {};
    const conn = conns[uid];

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
        const viewer = conn.viewer;
        const remote = conn.remote;

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
