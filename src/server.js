const app = require('express')()
const http = require('http').Server()
const io = require('socket.io')(http)

const dev = process.env.NODE_ENV === 'development'

io.on('connection', socket => {
  socket.send('socket/connected', {
    message: '接続しました'
  })
})

http.listen(8080, () => {
  console.log('listening on *:8080');
})
