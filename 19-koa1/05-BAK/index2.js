const Koa = require('koa')
const app = new Koa()

// 响应时间输出
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`输出计时：${ctx.method} ${ctx.url} - ${rt}`)
})

// 响应时间计时
app.use(async (ctx, next) => {
  const start = Date.now()
  console.log('开始计时')
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
  console.log('结束')
})

// const sleep = time => new Promise(resolve => setTimeout(resolve, time))

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500
    ctx.body = error.message
    ctx.app.emit('error', error, ctx)
    console.log('中间件捕捉到了：', err.message)
  }
})

// 响应
app.use(async ctx => {
  await sleep(250)
  ctx.status = 200
  ctx.type = 'html'
  ctx.body = '<h1> hello koa</h1>'
})

// 全局捕捉错误
app.on('error', err => {
  console.error('app 捕捉到了：', err.message)
  //console.error(err) //错误抛向app级 
  // throw err //错误抛向node级别 会中止服务
})

app.listen(3000)
