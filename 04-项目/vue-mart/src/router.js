import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Cart from './views/Cart.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/about',
      name: 'about',
      meta: { //需要用户去认证 
        auth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth) { //需要登录
    const token = localStorage.getItem('token');
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.path }  //做redirect是为了登录成功之后页面转到来的地方
      })
    }
  }
  else {
    next()
  }
})

export default router
