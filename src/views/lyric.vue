<script setup>
import APlayer from 'APlayer'
import { computed, nextTick, onMounted, ref } from 'vue'
import VueSlider from 'vue-slider-component'
import { initPlayer, musicCtrl } from '@/utils/useMusic.js'
import { secondToTime } from '@/utils/useTool.js'
import 'vue-slider-component/theme/antd.css'
import { usePinia } from '@/pinia'
const svgNames = [
  { name: 'maxSound', title: '声音' },
  { name: 'heart', title: '喜欢' },
  { name: 'add', title: '添加到歌单' },
  { name: 'cycle', title: '单曲循环' },
  { name: 'prev', title: '上一首' },
  { name: 'pause', title: '暂停' },
  { name: 'next', title: '下一首' },
  { name: 'random', title: '随机播放' }]

const pinia = usePinia()
const timeCtrl = ref(0)
const beginTime = ref(0)
const isMinSound = ref(false)

onMounted(async () => {
  beginTime.value = 0
  const wyPlayer = new APlayer({
    container: document.getElementById('aplayer'),
    lrcType: 1,
  })
  await nextTick()
  initPlayer(wyPlayer)
  wyPlayer.on('timeupdate', () => {
    const el = document.querySelector('.aplayer-lrc-current')
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
    const currentTime = secondToTime(wyPlayer.audio.currentTime)
    if (beginTime.value !== currentTime)
      beginTime.value = currentTime
    timeCtrl.value = ~~(wyPlayer.audio.currentTime)
  })
  const lrcContainer = document.querySelector('.aplayer .aplayer-lrc')
  lrcContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'P') {
      const a = wyPlayer.lrc.current.find(item => item[1] === elements[i].innerHTML)
      if (a)
        wyPlayer.seek(a[0])
    }
  })
  pinia.wyPlayer = wyPlayer
})

const hiddenLyric = () => {
  pinia.showLyric = false
}

const currentPlaying = computed(() => pinia.currentPlaying)
const handleClick = (type) => {
  switch (type) {
    default:
      musicCtrl(type)
  }
}
const hanldeDragEnd = () => {
  console.log(timeCtrl.value)
  pinia.wyPlayer.seek(timeCtrl.value)
}
</script>

<template>
  <div class="player">
    <div
      v-if="currentPlaying" class="player-bg"
      :style="{ backgroundImage: `url(${currentPlaying.picUrl}?param=512y512)` }"
    >
      <div class="player-bg__div" />
    </div>
    <div v-if="currentPlaying" class="player-info">
      <div class="music-contral">
        <img :src="`${currentPlaying.picUrl}?param=512y512`" alt="">
        <div class="music-info">
          <div>
            <div class="name">
              {{ currentPlaying.name }}
            </div>
            <div class="artist">
              {{ currentPlaying.artistName }}-{{ currentPlaying.alName }}
            </div>
          </div>
          <div class="volume-btns">
            <ButtonIcon
              v-for="item in svgNames.slice(0, 3)" :key="item" :title="item.title"
              @click.stop="handleClick(item.name)"
            >
              <SvgIcon :name="(item.name === 'maxSound' && isMinSound) ? 'minSound' : item.name" color="#fff" />
            </ButtonIcon>
          </div>
        </div>
        <div class="time-btns wy-slider">
          <span>{{ beginTime }}</span>
          <VueSlider
            v-model="timeCtrl"
            :min="0"
            :max="~~(currentPlaying.dt / 1000)"
            :interval="1"
            :drag-on-click="true"
            :duration="0"
            :dot-size="12"
            :height="2"
            :tooltip-formatter="secondToTime"
            :lazy="true"
            :silent="true"
            @drag-end="hanldeDragEnd"
          />
          <span>{{ secondToTime(~~(currentPlaying.dt / 1000)) }}</span>
        </div>
        <div class="play-btns">
          <ButtonIcon
            v-for="item in svgNames.slice(3)" :key="item" :title="item.title"
            @click.stop="handleClick(item.name)"
          >
            <SvgIcon :name="(item.name === 'maxSound' && isMinSound) ? 'minSound' : item.name" color="#fff" />
          </ButtonIcon>
        </div>
      </div>
    </div>
    <div class="player-lrc">
      <div id="aplayer" />
    </div>
    <ButtonIcon class="close-btn" @click="hiddenLyric">
      <SvgIcon name="down" color="#fff" />
    </ButtonIcon>
  </div>
</template>

<style scoped lang="scss">
@import '../aplayer.css';
.player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 249;
  display: flex;

  &-info,
  &-lrc {
    display: flex;
    flex: 1;
    z-index: 1;
  }

  &-lrc {
    padding-left: 88px;
    margin-right: 80px;
  }

  &-info {
    align-items: center;
    justify-content: flex-end;
    margin: 20px 20px 0 0;

    img {
      width: 55vh;
      height: 55vh;
      border-radius: 0.8em;
    }
  }
}

.player-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 100% 100%;

  &__div {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(50px);
  }
}

.music-contral {
  color: var(--color-normal);

  .music-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;

    .name {
      font-size: 1.4em;
      font-weight: 600;
    }

    .artist {
      color: var(--color-normal-1);
    }
  }

  .music-info,
  .time-btns {
    margin-bottom: 18px
  }

  .time-btns,
  .play-btns,
  .volume-btns {
    display: flex;
  }
  .time-btns{
    align-items: center;
    .vue-slider{
      flex: 1;
      margin: 0 20px;
    }
  }
  .play-btns {
    justify-content: center;
  }
}

:deep(#aplayer) {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  box-shadow: unset;
  border-radius: 0px;
  background-color: transparent;
  max-width: 600px;

  .aplayer-info {
    padding: 0;
    margin-left: 0;
    margin-right: 24px;
    border: none;
  }

  .aplayer-lrc {
    height: 100vh;
    overflow-y: auto;
    margin: 0;

    &:before,
    &:after {
      display: none;
    }

    p {
      font-weight: 600;
      font-size: 1.5em;
      line-height: unset !important;
      height: auto !important;
      padding: 12px 20px !important;
      margin: 4px 0 !important;
      border-radius: 12px;
      opacity: 0.6;
      transition: translate .5s ease-out;
      cursor: pointer;

      &:hover {
        background-color: var(--color-bg-gray);
      }
    }

    .aplayer-lrc-current {
      opacity: 1 !important;
      color: var(--color-normal)
    }
  }

  .aplayer-lrc::-webkit-scrollbar {
    display: none;
  }

  .aplayer-lrc-contents {
    transform: translateY(0) !important;
    text-align: left;
  }

  .aplayer-lrc-contents p {
    &:first-child {
      margin-top: 50vh !important;
    }
  }

  .aplayer-list,
  .aplayer-pic,
  .aplayer-music,
  .aplayer-controller,
  .aplayer-notice {
    display: none;
  }
}

.close-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 251;
}
</style>
