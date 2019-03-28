import Vue from 'vue'
import App from './App.vue'
import store from './store/modules/index'
import router from './router'

Vue.config.productionTip = false

//全局守卫
router.beforeEach((to, from, next) => {
  //全局前置守卫，当一个导航触发时，全局前置守卫按照创建顺便调用
  //数据检验时，非常有用
  next()
})
router.beforeResolve((to, from, next) => {
  //全局解析守卫beforeEach类似 区别是在导航被确认之前，同时在所有的组件内守卫和异步
  //路由组件被解析之后，解析守卫就被调用
  next()
})

router.afterEach((to, from, next) => {
  //全局后置守卫
})


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
