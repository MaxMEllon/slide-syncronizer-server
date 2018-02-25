module.exports = (payload, db, io) => {
  const comments = db.getItem('comments') || []
  comments.push(payload)
  const json = JSON.stringify(comments)
  db.setItem(comments)
  io.emit('comment/stream', JSON.stringify(payload))
}
