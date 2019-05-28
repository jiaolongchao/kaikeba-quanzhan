import React from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from './store/user.redux'
function Home () {
  return (
    <div>
      <h3>课程列表</h3>
      <ul>
        <li>
          <Link to='/detail/web'>web架构师</Link>
        </li>
        <li>
          <Link to='/detail/python'>python架构师</Link>
        </li>
      </ul>
    </div>
  )
}
function About () {
  return (
    <div>
      <h3>个人中心</h3>
      <div>
        <Link to='/about/me'>个人信息</Link>
        <Link to='/about/order'>订单查询</Link>
      </div>
      <Switch>
        <Route path='/about/me' component={() => <div>edson 20</div>} />
        <Route path='/about/order' component={() => <div>order</div>} />
        <Redirect to='/about/me' />
      </Switch>
    </div>
  )
}

// 传递进来路由器对象
function Detail (props) {
  console.log(props)
  // history: 导航指令 命令式导航
  // location: 获取url的信息
  // match: 通常用来获取参数信息
  return (
    <div>
      当前课程是{props.match.params.course}
      <button onClick={props.history.goBack}>后退</button>
    </div>
  )
}

function NoMatch ({ location }) {
  return <div>404 {location.pathname}不存在</div>
}

// 路由守卫 高阶组件
// 希望用法：<PrivateRoute component={About} path="/about" ...>

// 使用Redux注入状态
const PrivateRoute = connect(state => ({ isLogin: state.user.isLogin }))(
  ({ component: Comp, isLogin, ...rest }) => {
    // 做认证
    return (
      <Route
        {...rest}
        render={props =>
          isLogin ? (
            <Comp />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { redirect: props.location.pathname }
              }}
            />
          )
        }
      />
    )
  }
)

// 关于登录组件的设置
function isLogin ({ location, isLogin }) {
  const redirect = location.state.redirect || '/'
  if (isLogin) {
    return <Redirect to={redirect} />
  }
}

// 登录组件
const Login = connect(
  state => ({
    isLogin: state.user.isLogin,
    loading: state.user.loading
  }),
  { login }
)(function ({ location, isLogin, login, loading }) {
  const redirect = location.state.redirect
  if (isLogin) {
    return <Redirect to={redirect} />
  }

  return (
    <div>
      <p>用户登录</p>
      <br />
      <button onClick={login} disabled={loading}>
        登录
      </button>
    </div>
  )
})

export default function RouteSample () {
  return (
    <div>
      <BrowserRouter>
        <div>
          {/* 导航的链接 */}
          <ul>
            <li>
              <Link to='/'>首页</Link>
              <Link to='/about'>关于</Link>
            </li>
          </ul>
          {/* 路由的配置  exact */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/detail/:course' component={Detail} />
            {/* <Route path='/about' component={About} /> */}
            {/* 使用高阶组件路由守卫个人中心 */}
            <PrivateRoute path='/about' component={About} />
            <Route path='/login' component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}
