import Vue from 'vue'
import App from './App.vue'
import router from './router' //这个名字不能改变
import store from './store'

Vue.config.productionTip = false  //一个全局设置

//路由的导航守卫
//全局守卫 beforEach

router.beforeEach((to, form, next) => {  //全局前置守卫 在进入某个路由之前发生
  console.log('beforeEach', to, form) 
  next()
})
router.beforeResolve((to, form, next) => {
  console.log('beforeResolve', to, form)
  // if(to.fullPath == '/shoppingCart'){
  //   next('/login')
  // }
  next()

})
router.afterEach((to, form, next) => {
  console.log('afterEach')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
