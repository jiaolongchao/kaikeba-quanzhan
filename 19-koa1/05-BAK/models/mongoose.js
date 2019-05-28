const mongoose = require('mongoose')

// 连接
mongoose.connect(
  'mongodb://58.87.88.188:27017',
  { userNewUrlParser: true }
)

const conn = mongoose.connection
conn.on('error', () => console.error('数据库连接失败'))
conn.once('open', () => console.error('数据库连接成功'))
