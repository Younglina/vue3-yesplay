<script setup>
import message from '@/components/Message'
import { onMounted } from 'vue';
onMounted(() => {
  message.success('success message')
  message({
    message: 'warning message',
    type: 'warning',
    duration: 1000
  })
})
const types = ['success', 'error', 'warning', 'info']

</script>
<template>
  <ButtonIcon v-for="item in types" radius="6px" :key="item" @click="$message[item](`${item} message`)">
    show {{ item }} Message
  </ButtonIcon>
</template>
<style scoped lang="scss"></style>
