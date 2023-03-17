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
  }
})

const linkStyle = computed(() => {
  return {
    color: props.color,
    fontSize: props.fontSize,
  }
})
</script>
<template>
  <router-link :to="`/${link.type}/${link.id}`" class="link-to">{{ link.name }}</router-link>
</template>
<style scoped lang='scss'>
.link-to{
  color: #000000;
}
</style>