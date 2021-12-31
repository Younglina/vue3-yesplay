<template>
  <button :class="btnClass">
    <svg :class="svgClass" :width="size" :height="size" aria-hidden="true">
      <use :xlink:href="iconName" :fill="color" />
    </svg>
  </button>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  svgClass: {
    type: String,
    default: '',
  },
  btnClass: {
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
  if (props.svgClass) {
    return `svg-icon ${props.svgClass}`
  }
  return 'svg-icon'
})
const btnClass = computed(() => {
  if (props.btnClass) {
    return `wy-button ${props.btnClass}`
  }
  return 'wy-button'
})
</script>
<style lang="scss">
.wy-button {
  border: none;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  user-select: none;
  letter-spacing: 1px;
  color: #000;
  background-color: transparent;
  padding: 8px;
  border-radius: 5px;
  transition: all 0.4s cubic-bezier(0.35, 0.57, 0.13, 0.88);
  &:hover {
    background-color: var(--color-bg-gray);
  }
  &:active {
    transform: scale(0.92);
  }
}
</style>
