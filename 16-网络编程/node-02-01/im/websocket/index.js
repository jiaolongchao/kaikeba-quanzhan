var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var osUtils = require('os-utils')
var currCPU = 0


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/cpu', function (req, res) {
  res.sendFile(__dirname + '/cpu.html')
})

// 服务端监听连接状态：io的connection事件表示客户端与服务端成功建立连接，它接收一个回调函数，回调函数会接收一个socket参数。
io.on('connection', function (socket) {
  console.log('a user connected')

  // 响应某用户发送消息
  socket.on('chat message', function (msg) {
    console.log('chat message:' + msg)

    // 广播给所有人
    io.emit('chat message', msg)
    // 广播给除了发送者外所有人
    // socket.broadcast.emit('chat message', msg)

    io.emit('show cpu', {data:"hello,everyone"})
  })

  setInterval(() => {
    // socket.emit('cpuUpdate', {data : new Date().getMilliseconds()})
    socket.emit('cpuUpdate', {
      cpuUsage: (currCPU * 100).toFixed(2)
    })
  }, 3000)

  // 监听断开连接状态：socket的disconnect事件表示客户端与服务端断开连接
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
})

function updateCPU () {
  setTimeout(function () {
    osUtils.cpuUsage(function (value) {
      currCPU = value
      updateCPU()
    })
  }, 0)
}
updateCPU()

http.listen(3000, function () {
  console.log('listening on *:3000')
})
