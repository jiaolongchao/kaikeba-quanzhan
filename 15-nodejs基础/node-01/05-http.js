const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
  const { url, method, headers } = req
  if (url === '/' && method === 'GET') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' }) // 报头是一个普通文字   //服务器端错误500 400 找不着  300 重定向 200 正确
        res.end('Server Error')
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  } else if (url === '/users' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ name: 'god' }))
  } else if (method === 'GET' && headers.accept.indexOf('image/*')) {
    console.log('11111');
    console.log(headers);
    fs.createReadStream('.' + url).pipe(res)  //用来打开一个可读的文件流，它返回一个fs.ReadStream对象
  }
})
server.listen(3000)

// const http = require('http')
// const fs = require('fs')
// const server = http.createServer((request, response) => {
//     const { url, method, headers } = request
//     console.log('this is a request', request.url,headers.accept)
//     if (url === '/' && method === 'GET') {
//         fs.readFile('index.html', (err, data) => {
//             if (err) {
//                 response.writeHead(500, { 'Content-Type': 'text/pain;charset=utf-8' })
//                 response.end('服务器错误')
//             }
//             response.statusCode = 200
//             response.setHeader('Content-Type', 'text/html')
//             response.end(data)
//         })
//     } else if (url == '/users' && method === 'GET') {
//         response.statusCode = 200
//         response.setHeader('Content-Type', 'text/html')
//         response.end(JSON.stringify({ a: 123 }))
//     } else if (method == 'GET' && headers.accept.indexOf('image/*') !== -1) {

//         fs.createReadStream('.' + url).pipe(response)
//     }
//     else {
//         response.statusCode = 404
//         response.setHeader('Content-Type', 'text/plain;charset=utf-8')
//         response.end('No Page 页面不存在')
//     }

//     // response.end('a response...')
// })
// server.listen(3000)
