const app = require('express')()
const http = require('http').Server()
const io = require('socket.io')(http)

const dev = process.env.NODE_ENV === 'development'

if (dev) app.use(require('easy-livereload')());

io.on('connection', socket => {
})

http.listen(8080, () => {
  console.log('listening on *:8080');
})
