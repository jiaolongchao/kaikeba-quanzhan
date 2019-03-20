import Vue from 'vue';
import Router from 'vue-router';
import PageA from './views/PageA';
import PageB from './views/PageB';
import Test from './views/Test';

//安装路由到vue
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/a' //重定向 当有用户访问到跟目录的时候 重定向到/a
  },
  {
    path: '/a',
    name: 'PageA',
    component:PageA
    // components: {
    //   default: PageA,
    //   sliders: Test
    // }
  },
  {
    path: '/b/:id',
    props: true, //设置为True我们就可以pageb中设置prop来接收id
    component: PageB,
    children: [
      {
        path: "test",
        component: Test
      },
    ]
  }
]

export default new Router({
  mode: 'history',
  routes
})

