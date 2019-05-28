// const express = require('express')
// const app = express()
// app.get('/', (req, res) => {
//   res.end('helloWord')
// })

// app.get('/users', (req, res) => {
//   res.end(JSON.stringify({ name: 'abc' }))
// })

// app.listen(3000, () => {
//   console.log('app listen 300')
// })

//创建一个express服务器

//const express = require('express')
const express = require('./kpress')
const app = express()
app.get('/', (req, res) => {
  res.end('helloWord')
})

app.get('/users', (req, res) => {
  res.end(JSON.stringify({ name: 'abc' }))
})

app.listen(3000, () => {
  console.log('app listen 3000')
})

//创建一个express服务器

