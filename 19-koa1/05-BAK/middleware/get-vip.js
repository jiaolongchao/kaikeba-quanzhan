const vip = require('../models/vip')

module.exports = async (ctx, next) => {
  if (ctx.accepts('html') === 'html') { //当是html请求的时候
    ctx.state.vipCourses = await vip.find()  //state 是作为中间件传值的约定 
  }

  await next()
}
