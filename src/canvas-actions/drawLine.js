module.exports = (payload, socket) => {
  socket.broadcast.emit('canvas/update', JSON.stringify(payload))
}
