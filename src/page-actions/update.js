module.exports = (payload, db, socket) => {
  const json = payload |> JSON.stringify
  db.setItem('currentPage', json)
  socket.broadcast.emit('page/update', json)
}
