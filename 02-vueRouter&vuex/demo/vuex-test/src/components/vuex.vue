<template>
    <div>

        <!-- 这是modules state -->
        {{$store.state.CountA.count}}
        {{$store.state.number.number}}


        <!-- 这是单份的 -->
        <button @click="add">+</button>
        {{count}}
        <button @click="minus">-</button> 
        <h2>{{`我的杯子是一个${cup.name}，颜色是${cup.color}`}}</h2>
        <button @click="changColor">修改颜色</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  // methods: mapActions([
  //     'increment',
  //     'decrement'
  // ]),
  computed: {
    ...mapGetters("CountA", ["count", "cup"])
  },

  methods: {
    changColor() {
      this.modifyColor({ color: "pink" });
    },
    ...mapActions("CountA", ["add", "minus", "modifyColor"])
  },
  beforeCreate(){ //生命周期 创建之前
    console.log('beforeCreate 生命周期创建之前 observe Data init Events')
  },
  created(){ //生命周期创建完成
    console.log('created 生命周期创建完成 has el option')
  },
  beforeMount(){//生命周期挂载之前
    console.log('beforeMount 生命周期挂载之前 create vn.$el and replace el with it')
  },
  mounted(){ //生命周期挂载完成
    console.log('mounted 生命周期挂载完成')
  },
  beforeUpdate(){//生命周期更新之前
     console.log('beforeUpdate 生命周期更新之前')
  },
  updated(){//生命周期更新之后
    console.log('updated 生命周期更新之后')
  },
  beforeDestroy(){//生命周期销毁之前
    console.log('beforeDestroy 生命周期销毁之前')
  },
  destroyed(){//生命周期销毁完成
    console.log('destroyed 生命周期销毁完成')
  }

};
</script>

<style scoped>
</style>