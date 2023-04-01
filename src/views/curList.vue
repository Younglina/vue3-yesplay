<script setup>
import { computed } from 'vue'
import PlList from '../components/PlList.vue'
import { usePinia } from '@/pinia'
const pinia = usePinia()
console.log(pinia.wyPlayer.list.audios)
const list = computed(() => {
  return pinia.wyPlayer.list.audios.filter(item => item.id !== pinia.currentPlaying.id)
})
</script>

<template>
  <div class="title">
    正在播放
  </div>
  <PlList :list="[pinia.currentPlaying]" />
  <div class="title">
    即将播放
  </div>
  <PlList :list="list" />
</template>

<style scoped lang='scss'>
.title {
  font-size: 1.8em;
  margin-top: 40px;
  font-weight: 600;
}
</style>
