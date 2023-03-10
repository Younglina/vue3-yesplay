<script setup>
import { computed } from 'vue';

const props = defineProps({
  link: {
    type: Object,
    default: {
      id: '',
      name: '',
      type: ''
    }
  },
  color: { default: "#000000" },
  fontSize: { default: '1em' }
})

const linkStyle = computed(() => {
  return {
    color: props.color,
    fontSize: props.fontSize,
  }
})
</script>
<template>
  <router-link :to="`/${link.type}/${link.id}`" :style="linkStyle">{{ link.name }}</router-link>
</template>
<style scoped lang='scss'></style>