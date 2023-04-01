<script setup>
import 'APlayer/dist/APlayer.min.css'
import APlayer from 'APlayer'
import { computed, nextTick, onMounted } from 'vue'
import { initPlayer } from '@/utils/useMusic.js'
import { usePinia } from '@/pinia'

const pinia = usePinia()
onMounted(async () => {
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
  })
  const lrcContainer = document.querySelector('.aplayer .aplayer-lrc')
  lrcContainer.addEventListener('click', (event) => {
    console.dir(event.target)
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
            音量控制
          </div>
        </div>
        <div class="time-btns">
          时间控制
        </div>
        <div class="play-btns">
          播放控制
        </div>
      </div>
    </div>
    <div class="player-lrc">
      <div id="aplayer" />
    </div>
    <ButtonIcon class="close-btn" @click="hiddenLyric">
      <SvgIcon name="down" />
    </ButtonIcon>
  </div>
</template>

<style scoped lang="scss">
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

    &:before, &:after {
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
