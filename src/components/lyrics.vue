<template>
  <div v-if="currentSong" class="lyrics-main">
    <div
      class="song- bgimg"
      :style="{
        backgroundImage: `url(${currentSong.picUrl}?param=224y224)`,
      }"
    />
    <div class="flex -justify flex-col lyrics-left">
      <img class="song-img" :src="currentSong.picUrl + '?param=224y224'" alt />
      <div>
        <div class="flex align-end justify-between">
          <div class="song-name">{{ currentSong.name }}</div>
          <div class="song-svg">
            <svg-icon name="heart-full" color="#fff" />
          </div>
        </div>
        <LinkTo class="song-singers" :items="currentSong.singers" />
      </div>
      <div class="song-process-main flex-align">
        <span>{{ formatDt(progress) }}</span>
        <div class="flex-auto song-process">
          <ProcessSlider :height="4" />
        </div>
        <span>{{ formatDt(duration) }}</span>
      </div>
      <div class="play-controls">
        <div class="song-svg" @click="switchSong('prev')">
          <svg-icon name="prev" />
        </div>
        <div class="song-svg play-item" @click="switchSong('play')">
          <svg-icon :name="isPlay ? 'pause' : 'play'" size="26" />
        </div>
        <div class="song-svg" @click="switchSong('next')">
          <svg-icon name="next" />
        </div>
      </div>
    </div>
    <div class="lyrics">
      <div class="lyrics-line">
        <div class="lyrics-line_temp" />
        <div
          v-for="(line, index) in formatLyric"
          :id="`lyric${index}`"
          :key="index"
          class="lyrics-line_item"
        >
          <span>{{ line.content }}</span>
        </div>
      </div>
    </div>
    <svg-button name="back" @click="setShowLyrics" />
  </div>
</template>
<script setup>
import { getLyric } from '@/api/song.js'
import { store } from '@/store'
import { watch, ref, computed } from 'vue'
import { lyricParser } from '@/utils/lyrics.js'
import ProcessSlider from '@/components/ProcessSlider.vue'
import { formatDt } from '@/utils/useTool.js'

const progress = computed(() => {
  return store.state.progress
})
const duration = computed(() => {
  return store.state.duration
})

const currentSong = computed(() => {
  return store.getters.currentSong
})

const isPlay = ref(true)

function switchSong(type) {
  const player = window.vueplayer
  isPlay.value = player.switchSong(type)
  scrollLyrics()
}

const formatLyric = ref(null)
watch(
  () => currentSong.value,
  async val => {
    if (val) {
      const data = await getLyric(val.id)
      const lyric = lyricParser(data)

      //copy from https://github.com/qier222/YesPlayMusic/blob/d580e633581df7c67e37831e42cb6ada4f03e26b/src/views/lyrics.vue
      let ret = []
      const lyricFiltered = lyric.lyric.filter(({ content }) =>
        Boolean(content),
      )
      if (lyricFiltered.length) {
        lyricFiltered.forEach(l => {
          const { rawTime, time, content } = l
          const lyricItem = { time, content, contents: [content] }
          const sameTimeTLyric = lyric.tlyric.find(
            ({ rawTime: tLyricRawTime }) => tLyricRawTime === rawTime,
          )
          if (sameTimeTLyric) {
            const { content: tLyricContent } = sameTimeTLyric
            if (content) {
              lyricItem.contents.push(tLyricContent)
            }
          }
          ret.push(lyricItem)
        })
      } else {
        ret = lyricFiltered.map(({ time, content }) => ({
          time,
          content,
          contents: [content],
        }))
      }
      formatLyric.value = ret
      scrollLyrics(ret)
    }
  },
)

const currrentLyric = ref(null)

function scrollLyrics(lyric) {
  setInterval(() => {
    const prevLyric = currrentLyric.value
    currrentLyric.value = lyric.findIndex((item, index) => {
      const nextLyric = lyric[index + 1]
      return (
        progress.value >= item.time &&
        (nextLyric ? progress.value < nextLyric.time : true)
      )
    })
    if (prevLyric !== currrentLyric.value) {
      const el = document.getElementById(`lyric${currrentLyric.value}`)
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }
  }, 50)
}

function setShowLyrics() {
  store.commit('SET_SHOWLYRICS', false)
}
</script>
<style lang="scss">
.lyrics-main {
  position: absolute;
  display: flex;
  justify-content: center;
  background: #fff;
  z-index: 110;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .song-bgimg {
    position: absolute;
    background-size: 120% 120%;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(50px);
    }
  }
  .song-img {
    width: 45vh;
    height: 45vh;
    border-radius: 5%;
  }
  .song-name {
    font-size: 26px;
    font-weight: bold;
    padding-top: 20px;
  }
  .song-singers {
    font-size: 18px;
    font-weight: 400;
    padding: 6px 0 10px;
  }
  .song-process-main,
  .song-singers,
  .song-name {
    color: #fff;
  }
  .song-process {
    padding: 0 20px;
    .vue-slider {
      border-radius: 4px;
    }
  }
  .lyrics-left {
    padding-right: 80px;
  }
  .play-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    .play-item {
      margin: 0 20px;
    }
  }
  .song-svg {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 26px;
    height: 26px;
    padding: 4px;
    cursor: pointer;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--color-bg-gray);
      transform: scale(0.5);
      opacity: 0;
      box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
      transition: all 0.4s cubic-bezier(0.35, 0.57, 0.13, 0.88);
    }
    &:hover {
      color: #532ab9;
      &::before {
        opacity: 1;
        transform: scale(1.3);
      }
    }
  }
  .lyrics {
    padding-left: 30px;
    font-size: 20px;
    min-width: 450px;
    color: #fff;
    &-line {
      height: 100%;
      overflow-y: auto;
    }
    &-line_temp {
      margin-top: 50vh;
    }
    &-line_item {
      padding: 8px;
    }
  }
}
</style>
