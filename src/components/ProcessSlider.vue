<template>
  <VueSlider
    v-model="progress"
    :min="0"
    :max="duration"
    :dot-size="10"
    :duration="0"
    :height="props.height"
    :tooltip-formatter="formatTime"
    :lazy="true"
    :drag-on-click="true"
    @change="handleDrag"
  />
</template>
<script setup>
import VueSlider from 'vue-slider-component'
import { useStore } from '@/store'
import { computed } from 'vue'
import { formatTime } from '@/utils/useTool.js'
const props = defineProps({
  height: {
    default: 2,
    type: Number,
  },
})
const store = useStore()
const progress = computed(() => {
  return store.state.progress
})
const duration = computed(() => {
  return store.state.duration
})
function handleDrag(val) {
  const player = window.vueplayer
  store.commit('SET_PROGRESS', val)
  player.fastSeek(val)
}
</script>
