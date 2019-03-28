<template>
  <div class="wrapper">
       <h1>This is an News page</h1>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  beforeRouteEnter: (to,from,next) => {
    next()
  },
  beforeRouteUpdate: (to,from,next) => {
    next()
  },
  beforeRouteLeave: (to,from) => {
  }
}
</script>
