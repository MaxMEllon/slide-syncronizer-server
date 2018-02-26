module.exports = (payload, db, socket) => {
  socket.broadcast.emit('canvas/update', JSON.stringify(payload))
}
