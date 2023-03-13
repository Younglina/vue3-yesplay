<script setup>
// import message from '@/components/Message/instance.js'
// import { onMounted, ref } from 'vue';
// onMounted(()=>{
//   message("message123123")
// })
// let a = ref(1)
// function showMessage(){
//   message(`asdfasdf: ${a.value++}`)
// }

import axios from 'axios'
axios.get('/test/api/commom/getServerTime')
</script>
<template>
  sss
  <button @click="showMessage">showMessage</button>
</template>
<style scoped lang="scss">
</style>
