<script setup>
import message from '@/components/Message'
import { onMounted } from 'vue';
onMounted(()=>{
  message.success('test global message')
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
