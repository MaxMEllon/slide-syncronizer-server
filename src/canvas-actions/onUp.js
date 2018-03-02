module.exports = socket => {
  socket.broadcast.emit('canvas/upPen')
}
