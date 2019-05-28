const Koa = require('koa')
const app = new Koa()
const static = require('koa-static')
const hbs = require('koa-hbs')

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        // 响应用户
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = error.message;

        // 触发应用层级错误事件
        ctx.app.emit("error", error, ctx);
        console.log('捕获到错误：', error.message);
    }
});

// 静态服务
app.use(static(__dirname + '/public'));
const helpers = require('./utils/helpers')

app.use(hbs.middleware({
    viewPath: __dirname + '/views', //视图根目录
    defaultLayout: 'layout', //默认布局页面
    partialsPath: __dirname + '/views/partials', //注册partial目录
    disableCache: true //开发阶段不缓存
}));

const index = require('./routes/index');
const users = require('./routes/users');
app.use(index.routes());
app.use(users.routes());


app.on('error', (err, ctx) =>{
    console.error(err);
    // console.log('没得事')
    // throw err
})


app.listen(3000)
