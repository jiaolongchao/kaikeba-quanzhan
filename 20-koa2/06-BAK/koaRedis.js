const koa = require('koa')
const app = new koa()
const session = require('koa-session') // 中间件

const redis = require('redis')
const redisStore = require('koa-redis')

const redisClient = redis.createClient(6379, '58.87.88.188')

const wrapper = require('co-redis') // 把redis加工成promise成的方法
const client = wrapper(redisClient) // 包装一下形成新的client

app.keys = ['some secret'] // 加密的随机字符串 在这里随便写 实际上是不能泄露的

const SESS_CONFIG = {
  key: 'kkb:sess', // 名
  // maxAge: 86400000, // 有效期 表示一天 24*60*60
  // httpOnly: true, // 服务器有效
  // signed: true // 用作签名
  store: redisStore({ client }) // 实例化了一个koa的store 这个store要把真实的client端当作一个参数放进去
}

app.use(session(SESS_CONFIG, app)) // 设置一个中间件 加载一下cookie

app.use(ctx => {
  // 查看redis
  redisClient.keys('*', (err, keys) => {
    console.log('keys:', keys)
    keys.forEach(element => {
      redisClient.get(element, (err, val) => {
        console.log(val)
      })
    })
  })

  if (ctx.path === '/favicon.ico') {
  } else {
    let n = ctx.session.count || 0 // 设置第一次登录的默认值
    ctx.session.count = ++n
    ctx.body = '第' + n + '次访问'
  }
})

app.listen(3000)
