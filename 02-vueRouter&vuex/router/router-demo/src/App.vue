<template>
  <div id="app">
    <test></test>
     <!-- <router-link to="/a">pageA</router-link> |  <router-link to="/b/123">pageB</router-link> <router-link to="/b/234">pageB</router-link>
     <router-view />   -->

     <!-- <router-view name='sliders'/> -->
     <!-- router view 相当于一个占位符 -->
     <!-- router-link 在dom中渲染的是一个a标签 为了防止to后面跟的参数当成一个普通字符串 所以我们需要在to前加一个冒号-->
  </div>
</template>
<script>
import Test from "./components/vuex";
export default {
   name:'app',
   components:{
     Test
   }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
