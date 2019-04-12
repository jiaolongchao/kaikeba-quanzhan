<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>{{title}}</h1>
    <h2>{{value}}</h2>
    <k-input :value="value" @input="value = arguments[0]" />
    <hr/>
    <h3>添加课程</h3>
    <table>
      <tr>
        <td>课程名称</td>
        <td><input type="text" v-model="courseInfo.name"></td>
      </tr>
      <tr>
        <td>课程价格</td>
        <td><input type="text" v-model="courseInfo.price"></td>
      </tr>
      <tr>
        <td colspan="2"><button @click="coursetoList">添加到课程列表</button></td>
      </tr>
    </table>
    <hr/>
    <table>
      <tr>
        <th>课程名称</th>
        <th>课程价格</th>
        <th></th>
      </tr>
      <tr v-for="(item,index) in courseList" :key="item.id">
        <th>{{item.name}}</th>
        <th>{{item.price}}</th>
        <th><button @click="addCourseToCart(index)">添加到购物车</button></th>
      </tr>
    </table>
    <cart :courseItem = "courseItem" @removeItem="remove"/>
  </div>
</template>

<script>
import Cart from "./components/Cart.vue";
import KInput from "./components/Input.vue"
export default {
  name: "app",
  components: {
    Cart,
    KInput
  },
  methods: {
    coursetoList() {
      this.courseList.push(this.courseInfo);
    },
    addCourseToCart(index) {
      let item = this.courseList[index];
      let hasCourse = this.courseItem.find(x => x.id === item.id);
      if (hasCourse) {
        hasCourse.number += 1;
      } else {
        this.courseItem.push({
          ...item,
          isActive: true,
          number: 1
        });
      }
    },
    remove(index) {
      this.courseItem.splice(index, 1);
    }
  },
  data() {
    return {
      value:"",
      title: "开课吧-购物车",
      courseInfo: {
        name: "",
        price: ""
      },
      courseList: [
        {
          id: 0,
          name: "web全栈开发架构师",
          price: 9998
        },
        {
          id: 1,
          name: "Python人工智能",
          price: 8888
        }
      ],
      courseItem: []
    };
  }
};
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
