<script setup>
import { ref, computed } from 'vue';
import { usePinia } from '@/pinia'
import Lyric from './views/lyric.vue'

const pinia = usePinia()
const showLyric = computed(()=>pinia.showLyric)
</script>

<template>
  <NavBar />
  <main>
    <router-view v-slot="{ Component }">
      <keep-alive :include="['playlist','album']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
  <div @click="pinia.showLyric=true">123</div>
  <transition name="slide">
    <Lyric v-show="showLyric"/>
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

.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
}

</style>