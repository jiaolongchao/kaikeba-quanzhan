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

const tokenCache = {
  access_token: '',
  updateTime: Date.now(),
  expires_in: 7200,
}

const { ServerToken, ClientToken } = require('./mongoose')

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

const OAuth = require('co-wechat-oauth')
const oauth = new OAuth(
  conf.appid,
  conf.appsecret,
  async function(openid) {
    return await ClientToken.getToken(openid)
  },
  async function(openid, token) {
    return await ClientToken.setToken(openid, token)
  }
)
router.get('/wxAuthorize', async ctx => {
  const state = ctx.query.id
  console.log('ctx...' + ctx.href) //ctx.href 获取我们本地服务器的地址
  //目标地址 就是微信服务器确认成功以后的回调地址
  let redirectUrl = ctx.href
  redirectUrl = redirectUrl.replace('wxAuthorize', 'wxCallback')
  const scope = 'snsapi_userinfo' //这个选项代表能够获取用户身份的详细程度

  const url = oauth.getAuthorizeURL(redirectUrl, state, scope)
  console.log('url:' + url)
  ctx.redirect(url)
})

router.get('/wxCallback', async ctx => {
  const code = ctx.query.code //授权码
  console.log('callback...' + code)
  const token = await oauth.getAccessToken(code) //通过授权码去获取token

  const accessToken = token.data.access_token //获取用户token
  const openid = token.data.openid //获取登录用户的openid
  console.log('accessToken:' + accessToken + '  , openid:' + openid)
  ctx.redirect('/?openid=' + openid) //刷新页面 将openid传到前端
})

router.get('/getUser', async ctx => {
  const openid = ctx.query.openid
  const userInfo = await oauth.getUser(openid)
  ctx.body = userInfo
})


/**
 * 获取JSConfig
 */
router.get('/getJsConfig',async ctx => {
    console.log('getJSSDK...',ctx.query)
    const res = await api.getJsConfig(ctx.query)//构造好的参数集
    ctx.body = res
})


app.use(router.routes()) /*启动路由*/
app.use(router.allowedMethods())
app.listen(3000)
