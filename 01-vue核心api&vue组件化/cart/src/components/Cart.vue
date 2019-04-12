<template>
  <div class="wrapper">
      <h2>购物车</h2>
      <table>
          <tr>
              <th>勾选</th>
              <th>课程名称</th>
              <th>课程价格</th>
              <th>数量</th>
              <th>价格</th>
          </tr>
          <tr v-for="(item,index) in courseItem" :key="item.id">
              <td><input type="checkbox" v-model="item.isActive"></td>
              <td>{{item.name}}</td>
              <td>{{item.price}}</td>
              <td>
                  <el-button @click='add(index)'>+</el-button>
                  {{item.number}}
                  <el-button @click='minus(index)'>-</el-button>
              </td>
              <td>{{item.price * item.number}}</td>
          </tr>
          <tr>
              <td></td>
              <td colspan="2">{{isActiveCourse}} / {{allCourseList}}</td>
              <td colspan="2">{{allPrice}}</td>
          </tr>
      </table>
  </div>
</template>
<script>
export default {
  components: {},
  props: ["courseItem"],
  data() {
    return {};
  },
  methods: {
    add(index) {
      this.courseItem[index].number += 1;
    },
    minus(index) {
      let number = this.courseItem[index].number;
      if (number > 1) {
        this.courseItem[index].number -= 1;
      } else {
        if (window.confirm("确定要删除么")) {
          this.$emit("removeItem", index);
        }
      }
    }
  },
  computed: {
    isActiveCourse() {
      return this.courseItem.filter(item => item.isActive == true).length;
    },
    allCourseList() {
      return this.courseItem.length;
    },
    allPrice() {
      let num = 0;
      this.courseItem.forEach(element => {
        if (element.isActive) {
          num += element.number * element.price;
        }
      });
      return num;
    }
  }
};
</script>
<style scoped>
</style>