<script setup>
import { computed } from 'vue'

const props = defineProps({
  margin: { default: '12'},
  bgcolor: { default: 'var(--color-bg-gray)'},
  height: { default: '1px'},
  width: { default: '100%'},
})
const styles = computed(()=>{
  return {
    margin: `${props.margin}px 0`,
    backgroundColor: props.bgcolor,
    height: props.height,
    width: props.width,
  }
})
</script>
<template>
<div class="divide" :style="styles"></div>
</template>
<style scoped lang='scss'>
</style>