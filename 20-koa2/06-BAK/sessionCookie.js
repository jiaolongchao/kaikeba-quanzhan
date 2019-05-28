const http = require('http')
const session = {}
http
  .createServer((req, res) => {
    const sessionKey = 'sid'
    const cookie = req.headers.cookie
    if (req.url === 'favicon.ico') {
    } else {
      if (cookie && cookie.indexOf(sessionKey) > -1) {
        res.end('welcom back')
        console.log('cookie:', req.headers.cookie)
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
        const sid = pattern.exec(cookie)[1]
        console.log('session:', sid, session, session[sid])
      } else {
        const sid = (Math.random() * 99999).toFixed()
        res.setHeader('Set-Cookie', `${sessionKey} = ${sid}`)
        session[sid] = { name: 'jiaolongchao' }
        res.end('hello cookie')
      }
    }
  })
  .listen(3001)
