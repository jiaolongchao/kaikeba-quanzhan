<template>
  <div class="about">
    <h1>This is an about page  {{id}}</h1>
  </div>
</template>
<script>
export default {
  props: ["id"],
  beforeRouteEnter: (to,from,next) => {
    //在渲染该组件的对应路由被confirm前调用 不能获取实例this 因为守卫执行前 组件实例还没有创建
    next()
  },
  beforeRouteUpdate: (to,from,next) => {
    //在当前路改变但是该组件被复用时调用，例如对于一个带有动态参数的路径 /foo/:id 在/foo/1 和 /foo/2 之间跳转的时候
    //由于会渲染同样的foo组件，因此组件实例会被复用 而这个钩子就会在这个情况下被调用 可以访问this
    next()
  },
  beforeRouteLeave: (to,from) => {
    //导航离开该组件的对应路由时调用 可以访问This 通常用来禁止用户在还未保存修改前离开
    //该导航可以通过next(false) 来取消
  }
};
</script>

