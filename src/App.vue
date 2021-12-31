<template>
  <song-header></song-header>
  <main ref="main" class="song-main">
    <router-view></router-view>
  </main>
  <song-footer></song-footer>
  <audio src="" ref="player" autoplay></audio>
  <transition name="slide-up">
    <Lyrics v-show="showLyrics" :currentSong="currentSong" />
  </transition>
</template>
<script setup>
import VuePlayer from '@/utils/player.js'
import { ref, onMounted, computed } from 'vue'
import { useStore } from '@/store'

const player = ref(null)
onMounted(() => {
  new VuePlayer(player)
})

const store = useStore()
store.commit('SET_USERINFO', JSON.parse(localStorage.getItem('userInfo')))
const showLyrics = computed(() => {
  return store.state.showLyrics
})
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  position: relative;
  font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei;
  height: 100vh;
  .song-main {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 60px 8vw;
    overflow: auto;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.flex {
  display: flex;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-auto {
  flex: 1;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-justify {
  display: flex;
  justify-content: center;
}
.flex-align {
  display: flex;
  align-items: center;
}
.justify-between {
  justify-content: space-between;
}
.justify-end {
  justify-content: flex-end;
}

.align-end {
  align-items: flex-end;
}

.title {
  font-size: 1.17em;
  font-weight: bold;
  padding-bottom: 10px;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #666;
}

:root {
  --color-subtest: #666;

  --color-text-blue: #2f5ced; //鲜蓝
  --color-bg-blue: #eaeffd;

  --color-text-red: #bc343c; //象牙红

  --color-bg-gray: #c5bfad1f; //米灰
}
</style>
