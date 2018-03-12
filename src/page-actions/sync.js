module.exports = (payload, db, io, id) => {
  const currentPage = db.getItem('currentPage') || 0
  io.to(id).emit('page/update', currentPage)
  io.emit('canvas/clear')
}
