// main server setup
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// other things
var path = require('path');

// our sockets
var conn = {};

// let us get stuff please?
app.use(express.static(path.join(__dirname, 'www')));

// start listening
server.listen(8008);

// connection
io.sockets.on('connection', function(socket) {
    socket.emit('identify');
    socket.on('identity', function(data) {
        var uid = data['uid'];

        if (conn[uid] == undefined)
            conn[uid] = {};

        if (data['type'] == 'viewer') {
            conn[uid]['viewer'] = socket;
        }

        if (data['type'] == 'remote') {
            conn[uid]['remote'] = socket;

            // register remote disconnect
            socket.on('disconnect', function() {
                if (conn[uid]['viewer'] != undefined)
                    conn[uid]['viewer'].emit('disconnected');
            });
        }

        if (conn[uid] != undefined) {
            if (conn[uid]['viewer'] != undefined && conn[uid]['remote'] != undefined) {

                var viewer = conn[uid]['viewer'];
                var remote = conn[uid]['remote'];

                viewer.emit('ready');
                remote.emit('ready');

                remote.on('msg', function(data){
                    viewer.emit('msg', data);
                });

            }
        }
    });
});
