const express = require('express')
const app = express()
const http = require('http').Server()
const io = require('socket.io')(http)
const redis = require('socket.io-redis')
const glob = require('glob')
const { LocalStorage } = require('node-localstorage')

const pageUpdate = require('./page-actions/update')
const pageSync = require('./page-actions/sync')
const commentPost = require('./comment-actions/post')
const drawLine = require('./canvas-actions/drawLine')
const onUp = require('./canvas-actions/onUp')

const env = process.env.NODE_ENV || 'development'
const db = new LocalStorage(`./db.${env}`)
const dev = env === 'development'

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  next()
})

app.options('*', (req, res) => res.sendStatus(200))

const pages = JSON.stringify(glob.sync('public/*.jpg').map(f => f.replace('public', '')))

if (dev) app.use(express.static('public'))

app.get('/api/pages', (req, res) => res.send(pages))

io.adapter(redis({ host: 'localhost', port: 6379 }))

io.on('connection', socket => {
  // page
  socket.on('page/update', payload => pageUpdate(payload, db, socket))
  socket.on('page/sync', payload => pageSync(payload, db, io, socket.id))
  // comment
  socket.on('comment/post', payload => commentPost(payload, db, io))
  // canvas
  socket.on('canvas/drawLine', payload => drawLine(payload, socket))
  socket.on('canvas/onUp', () => onUp(socket))
  socket.on('canvas/clear', () => io.emit('canvas/clear'))
  // misc
  socket.send('socket/connected', { message: '接続しました' })
})

const httpPort = 8080 + parseInt(process.env.NODE_APP_INSTANCE || 0)
const appPort = 8765 + parseInt(process.env.NODE_APP_INSTANCE || 0)

http.listen(httpPort, () => console.log(`listening on *:${httpPort}`))

app.listen(appPort, () => console.log(`listening on *:${appPort}`))
