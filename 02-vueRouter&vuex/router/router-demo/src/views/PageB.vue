<template>
  <div class="wrapper">this is pageB  {{id}}
      <router-view></router-view> 
      <!-- 嵌套路由 -->
  </div>
</template>

<script>
export default {
  components:{},
  props:['id'],
  beforeRouteEnter(to, from, next) { 
      //组件内的路由守卫 渲染组件的路由 注意方法内不可以用this
      //因为当守卫执行前，组件实例还没有被创建
      console.log('beforeRouteEnter')
      next();
  },
  beforeRouteUpdate(to, from, next) { 
      //在当前路由改变，但是该组件被复用时调用
      //举例来说，对于一个带有动态参数的路径 /foo/:id 在/foo/1 和 /foo/2 之间跳转的时候
      //由于会渲染同样的foo组件，因此组件实例会被复用，而这个钩子就会在这个情况下被调用   可以访问到组件实例 this
      console.log('beforeRouteUpdate')       
      next();
  },
  beforeRouteLeave(to, from, next) {
      //导航离开该组件的对应路由时调用 
      //可以访问该组件实例 的this
      //通常用来禁止用户在还未保存修改前突然离开，该以通过next(false)取消
      console.log('beforeRouteLeave')  
  }
}
</script>
