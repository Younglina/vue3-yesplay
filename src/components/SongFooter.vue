<template>
  <div>
    <div v-if="currentSong" class="song-footer">
      <div class="song-footer_slider">
        <ProcessSlider />
      </div>
      <div class="song-footer_action">
        <div class="flex-align">
          <img
            class="song-img"
            :src="currentSong.picUrl + '?param=224y224'"
            alt
          />
          <div class="flex-auto flex-col">
            <span class="song-name">{{ currentSong.name }}</span>
            <LinkTo class="song-singers" :items="currentSong.singers"></LinkTo>
          </div>
        </div>
        <div class="flex-center">
          <svg-button name="prev" @click="switchSong('prev')"></svg-button>
          <svg-button
            :name="isPlay ? 'pause' : 'play'"
            size="30"
            @click="switchSong('play')"
          ></svg-button>
          <svg-button name="next" @click="switchSong('next')"></svg-button>
        </div>
        <div class="flex-center">
          <svg-icon name="prev" />
          <svg-icon name="prev" />
          <svg-icon name="prev" />
          <svg-icon name="prev" />
          <svg-icon name="prev" @click="setShowLyrics" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from '@/store'
import { computed, ref } from 'vue'
import ProcessSlider from '@/components/ProcessSlider.vue'

const store = useStore()
const currentSong = computed(() => {
  return store.state.currentSong
})
const isPlay = ref(true)

function switchSong(type) {
  const player = window.vueplayer
  isPlay.value = player.switchSong(type)
}

function setShowLyrics() {
  store.commit('SET_SHOWLYRICS', true)
}
</script>
<style lang="scss">
.song-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  &_action {
    padding: 0 8vw;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    height: 60px;
    .song-img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      border-radius: 4px;
    }
    .svg-icon {
      cursor: pointer;
    }
    &-name {
      padding-bottom: 5px;
      font-size: 14px;
      font-weight: bold;
    }
    &-singers {
      font-size: 12px;
      color: var(--color-subtest);
    }
    &_play {
      margin: 0 10px;
    }
  }
}
.vue-slider-dot {
  visibility: hidden;
}
.vue-slider:hover .vue-slider-dot {
  visibility: visible;
}
</style>
