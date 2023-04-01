<script setup>
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { usePinia } from '@/pinia'
import { getImgUrl } from '@/utils/useTool.js'
import { musicCtrl } from '@/utils/useMusic.js'

const pinia = usePinia()
const { currentPlaying, isPause, isMinSound } = storeToRefs(pinia)
const svgNames = [{ name: 'prev', title: '上一首' },
  { name: 'pause', title: '暂停' },
  { name: 'next', title: '下一首' },
  { name: 'musicList', title: '列表' },
  { name: 'cycle', title: '单曲循环' },
  { name: 'random', title: '随机播放' },
  { name: 'maxSound', title: '声音' },
  { name: 'up', title: '显示歌词' }]
const router = useRouter()
const route = useRoute()
const handleClick = (type) => {
  switch (type) {
    case 'show':
    case 'up':
      pinia.showLyric = true
      break
    case 'musicList':
      route.name === 'curList' ? router.go(-1) : router.push('/curList')
      break
    default:
      musicCtrl(type)
  }
}
</script>

<template>
  <div class="bottom-bar wy-bar" @click="handleClick('show')">
    <div class="bottom-bar__info">
      <img
        class="bottom-bar__img" :src="`${getImgUrl(currentPlaying)}`" loading="lazy" alt="图片"
        @click.stop="router.push(`/album/${currentPlaying.alId}`)"
      >
      <div class="bottom-bar__desc">
        <div class="bottom-bar__name">
          {{ currentPlaying.name }}
        </div>
        <div class="bottom-bar__subname" @click.stop="router.push(`/artist/${currentPlaying.artistId}`)">
          {{ currentPlaying.artistName }}
        </div>
      </div>
      <ButtonIcon @click.stop="handleClick('heart')">
        <SvgIcon name="heart" />
      </ButtonIcon>
    </div>
    <div class="bottom-bar__playctrl">
      <ButtonIcon v-for="item in svgNames.slice(0, 3)" :key="item.title" :title="item.title" @click.stop="handleClick(item.name)">
        <SvgIcon :name="(item.name === 'pause' && isPause) ? 'play' : item.name" />
      </ButtonIcon>
    </div>
    <div class="bottom-bar__listctrl">
      <ButtonIcon v-for="item in svgNames.slice(3)" :key="item" :title="item.title" @click.stop="handleClick(item.name)">
        <SvgIcon :name="(item.name === 'maxSound' && isMinSound) ? 'minSound' : item.name" />
      </ButtonIcon>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.bottom-bar {
  bottom: 0;
  height: 64px;

  >div {
    display: flex;
    justify-content: center;
  }

  &__info {
    justify-content: flex-start !important;
    align-items: center;
    width: 20vw;
  }

  &__desc {
    flex-direction: column;
    margin-right: 20px;
  }

  &__img {
    width: 48px;
    height: 48px;
    border-radius: 6px;
    border: 1px solid var(--color-img);
    margin-right: 12px;
    cursor: pointer;
  }

  &__name {
    font-weight: 600;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__subname {
    color: var(--color-subtext);
    font-size: 0.85px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &__playctrl {
    flex: 1;
  }
}
</style>
