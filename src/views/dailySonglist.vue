<template>
  <div>
    <div>
      <h2>每日歌曲推荐</h2>
      <div class="subtitle">根据你的音乐口味生成 · 每天6:00更新</div>
    </div>
    <SongList :list="recommendSongs" />
  </div>
</template>
<script setup>
import { useStore } from '@/store'
import { computed } from 'vue'
import SongList from '@/components/SongList.vue'

const recommendSongs = computed(() => {
  return useStore().state.dailySong
})
</script>
<style lang=""></style>
