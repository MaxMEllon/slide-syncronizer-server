var app = require('express')();

var http = require('http').Server();

var io = require('socket.io')(http);

var dev = process.env.NODE_ENV === 'development';
if (dev) app.use(require('easy-livereload')());
io.on('connection', function (socket) {});
http.listen(8080, function () {
  console.log('listening on *:8080');
});