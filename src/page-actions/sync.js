module.exports = (payload, db, io, id) => {
  const currentPage = db.getItem('currentPage')
  io.to(id).emit('page/update', currentPage)
}
