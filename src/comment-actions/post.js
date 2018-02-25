import { isNil } from 'lodash'

const fetchCommentsToDB = db => {
  const comments = db.getItem('comments')
  if (isNil(comments)) return []
  return JSON.parse(comments)
}

module.exports = (payload, db, io) => {
  const comments = fetchCommentsToDB(db)
  comments.push(payload)
  const json = JSON.stringify(comments)
  db.setItem('comments', json)
  io.emit('comment/stream', JSON.stringify(payload))
}
