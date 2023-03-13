<script setup>
import message from '@/components/Message/instance.js'
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
