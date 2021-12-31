<template>
  <svg :class="svgClass" :width="size" :height="size" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '22',
  },
  color: {
    type: String,
    default: '#000000',
  },
})
const iconName = computed(() => {
  return `#icon-${props.name}`
})
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})
</script>
