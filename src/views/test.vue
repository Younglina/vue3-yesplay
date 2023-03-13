<script setup>
import message from '@/components/Message/instance.js'
import { onMounted, ref } from 'vue';
onMounted(()=>{
  message("message123123")
})
function showMessage(){
  message.success('success')
  message.error('error')
  message.warning('warning')
  message.info('info')
}

</script>
<template>
  <button @click="showMessage">showMessage</button>
</template>
<style scoped lang="scss">
</style>
