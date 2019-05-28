const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

const conf = require('./conf')
app.use(bodyParser())
const router = new Router()
app.use(static(__dirname + '/'))
const axios = require('axios')
const wechat = require('co-wechat')
router.all(
  '/wechat',
  wechat(conf).middleware(async message => {
    console.log('wechat:', message)
    return 'Hello World ' + message.Content
  })
)

const tokenCache = {
  access_token: '',
  updateTime: Date.now(),
  expires_in: 7200,
}

// router.get('/getTokens', async ctx => {
//   //获取token的接口
//   const wxDomain = `https://api.weixin.qq.com/`
//   const path = `cgi-bin/token`
//   const param = `?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}`

//   const url = wxDomain + path + param
//   const res = await axios.get(url)
//   Object.assign(tokenCache, res.data, {//通过浅拷贝进行复制
//     updateTime: Date.now(), //更新过期时间
//   })
//   ctx.body = res.data
// })

// router.get('/getFollowers' , async ctx=>{ //获取用户列表的接口
//     const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}`  //NEXT_OPENID不是必须 是拉取下一次的开始值
//     const res = await axios.get(url)
//     console.log('getFollowers' , res)
//     ctx.body = res.data  //返回到前端
// })

//使用co-wechat-api的库来实现验签过程
// const WechatAPI = require('co-wechat-api');
// const api = new WechatAPI(conf.appid , conf.appsecret)
// router.get('/getFollowers' , async ctx=>{
//     let res = await api.getFollowers()
//     res = await api.batchGetUsers(res.data.openid,'zh_CN') //获取用户列表
//     ctx.body = res
// })

const { ServerToken } = require('./mongoose')

const WechatAPI = require('co-wechat-api')
const api = new WechatAPI(
  conf.appid,
  conf.appsecret,
  //取token
  async () => await ServerToken.findOne(),
  //存token
  async token => await ServerToken.updateOne({}, token, { upsert: true }) //upsert:true可以随意进行覆盖
)
router.get('/getFollowers', async ctx => {
  let res = await api.getFollowers()
  res = await api.batchGetUsers(res.data.openid, 'zh_CN') //获取用户列表
  ctx.body = res
})

app.use(router.routes()) /*启动路由*/
app.use(router.allowedMethods())
app.listen(3000)
