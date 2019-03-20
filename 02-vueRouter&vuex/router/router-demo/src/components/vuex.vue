<template>
  <div class="wrapper">
      <button @click="increment">+</button>
      {{$store.state.count}}
      <button @click="decrement">-</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  // methods:{
  //     add(){
  //         this.$store.dispatch('increment')
  //     },
  //     minus(){
  //         this.$store.dispatch('decrement')
  //     }
  // }
  methods: mapActions([
      'increment',
      'decrement'
  ])
};
</script>
