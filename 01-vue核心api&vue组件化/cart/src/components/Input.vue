<template>
  <div class="wrapper">
      <input type="text" :value="value"  @input="onInput"/>
  </div>
</template>

<script>
export default {
  components:{},
  props:['value'],
  data(){
    return {
    }
  },
  methods:{
      onInput(e){
          let value = e.target.value;
          this.$emit("input",value)
      }
  }
}
</script>
<style scoped>

</style>