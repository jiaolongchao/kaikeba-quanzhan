import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store/index'
import interceptor from './interceptor';
import {createAPI} from 'cube-ui'
import CartAnim from '@/components/CartAnim'

// 给vue注册实例方法，方法名$createCartAnim
createAPI(Vue, CartAnim, ['transitionend'])

Vue.config.productionTip = false
//执行拦截器初始化
const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 执行拦截器初始化
interceptor(app);