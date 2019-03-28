import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import News from './views/News.vue'
import About from './views/About.vue'
import vuex from './components/vuex'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'vuex',
      component: vuex,
      //在进入这个路由之前调用
      beforeEnter: (to, from, next) => {
        next()
      }
    },
    {
      path: '/about/:id',
      name: 'about',
      props:true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About,
      //在进入这个路由之前调用
      beforeEnter: (to, from, next) => {
        next()
      }
    },
   
    {
      path: '/news',
      name: 'news',
      component: News
    }
  ]
})
