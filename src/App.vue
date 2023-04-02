<script setup>
import { storeToRefs } from 'pinia'
import Lyric from './views/lyric.vue'
import BottomBar from './components/BottomBar.vue'
import { usePinia } from '@/pinia'

const pinia = usePinia()
const { showLyric, currentPlaying } = storeToRefs(pinia)
</script>

<template>
  <NavBar />
  <main>
    <router-view v-slot="{ Component }">
      <keep-alive :include="['album']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
  <BottomBar v-if="currentPlaying" />
  <transition name="slide">
    <Lyric v-show="showLyric" />
  </transition>
</template>

<style lang="scss" scoped>
main{
  padding: 60px 10vw 96px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s;
}

.slide-enter-from, .slide-leave-to {
  transform: translateY(100%);
}
</style>
