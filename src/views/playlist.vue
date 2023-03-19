<script setup>
import { onBeforeMount, ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import Message from '@/components/Message'
import ContextMenu from '@/components/ContextMenu'
import { getPlayListDetail } from '@/api/music.js'
import { getImgUrl } from '@/utils/useTool.js'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';

const playlistDetail = ref(null)
const isLike = ref(false)
onBeforeMount(() => {
  const route = useRoute()
  getPlayListDetail(`${route.params.id}`).then(res => {
    playlistDetail.value = res.playlist
  }).catch((e) => {
    Message.error(e.message)
  })
})

const joinLike = () => {
  isLike.value = !isLike.value
}

const formatDT = (dt) => {
  dayjs.extend(duration);
  let time = dayjs.duration(dt);
  let hours = time.hours().toString();
  let mins = time.minutes().toString();
  let seconds = time.seconds().toString().padStart(2, '0');
  return `${hours > 0 ? hours + ':' : ''}${mins}:${seconds}`
}

const Cmenu = ref(null)
const openMenu = (e, data, idx) => {
  e.preventDefault()
  data.menuType = 'playlist'
  Cmenu.value = ContextMenu(e, data)
}

onUnmounted(()=>{
  if(Cmenu){
    Cmenu.value.destroy()
  }
})
</script>
<template>
  <div v-if="playlistDetail" class="playlist">
    <div class="pl-info">
      <div class="pl-info__img">
        <img :src="getImgUrl(playlistDetail)" alt="图片">
      </div>
      <div class="pl-info__data">
        <div class="pl-info__name">
          {{ playlistDetail.name }}
        </div>
        <div class="pl-info__creator">Playlist by
          <LinkTo
            :link="{ name: playlistDetail.creator.nickname, type: $route.name, id: playlistDetail.creator.userId }" />
        </div>
        <div class="pl-info__count">
          最后更新于{{ dayjs(playlistDetail.updateTime).format('YYYY年MM月DD日') }} · {{
            playlistDetail.trackCount }}首歌</div>
        <div class="pl-info__desc">{{ playlistDetail.description }}</div>
        <div class="pl-info__btns">
          <ButtonIcon class="pl-info__play">
            <SvgIcon name="play" color="var(--color-primary)" />
            <span>播放</span>
          </ButtonIcon>
          <ButtonIcon @click="joinLike">
            <SvgIcon :name="isLike ? 'heartFill' : 'heart'" />
          </ButtonIcon>
          <ButtonIcon>
            <SvgIcon name="more" color="var(--color-text)" />
          </ButtonIcon>
        </div>
      </div>
    </div>
    <div class="pl-list">
      <div v-for="(item, idx) in playlistDetail.tracks" 
        @click.right.native="openMenu($event, item, idx)"
        class="pl-list__warp" 
        :key="item.id">
        <img :src="getImgUrl(item.al)" class="pl-list__img" loading="lazy" alt="图片">
        <div class="pl-list__name">
          <div class="pl-list__title">
            {{ item.name }}
            <span>{{ item.tns?`(${item.tns[0]})`:'' }}</span>
          </div>
          <div>
            <LinkTo v-for="ars in item.ar" :key="ars.id" :link="{ ...ars, type: 'artist' }" />
          </div>
        </div>
        <div class="pl-list__al">
          <LinkTo :link="{ ...item.al, type: 'album' }" />
        </div>
        <SvgIcon class="pl-list__heart" name="heart" color="var(--color-primary)"/>
        <div class="pl-list__dt">
          {{ formatDT(item.dt) }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang='scss'>
.playlist {
  margin-top: 20px;
}

.pl-info {
  display: flex;

  &__img {
    img {
      background: #ffffff;
      box-shadow: 8px 8px 26px #d9d9d9,
        -8px -8px 26px #ffffff;
      width: 288px;
      height: 288px;
      border-radius: 12px;
    }
  }

  &__data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 58px;
  }

  &__name,
  &__count {
    margin-bottom: 18px;
  }

  &__name {
    font-size: 2em;
    font-weight: 600;
  }

  &__count {
    margin-top: 6px;
  }

  &__desc,
  &__count {
    font-size: 0.85em;
    color: var(--color-subtext)
  }

  &__desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-bottom: 28px;
  }

  &__btns {
    display: flex;

    .button-icon {
      background-color: var(--color-bg-gray);
      margin-right: 12px;
      padding: 6px 10px;
      transition: 0.25s;

      &:hover {
        transform: scale(1.05)
      }

      &:active {
        transform: scale(0.8)
      }
    }
  }

  &__play {
    @include flex-center;
    font-weight: 600;
    color: var(--color-primary);
    background-color: var(--color-bg-primary);
    flex-wrap: nowrap;
    min-width: 88px;

    .svg-icon {
      font-size: 0.85em;
    }

    >span {
      margin-left: 6px;
      font-size: 1.2em;
    }
  }
}

.pl-list {
  margin-top: 50px;

  &__warp {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 8px;
    border-radius: 6px;
    user-select: none;
    &:hover{
      background-color: var(--color-bg-gray);
      .pl-list__heart{
        opacity: 1;
      }
    }
  }

  &__heart{
    font-size: 0.8em;
    opacity: 0;
    cursor: pointer;
    margin-left: 12px;
    transition: scale 0.25s;
    &:hover{
      transform: scale(1.08);
    }
    &:active {
      transform: scale(0.8)
    }
  }

  &__img {
    width: 46px;
    height: 46px;
    border-radius: 6px;
    border-radius: 1px solid rgba(0, 0, 0, 0.08);
  }

  &__name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 20px;

    .link-to {
      color: var(--color-subtext);
      font-size: 0.8em;
    }
    .link-to + .link-to{
      &::before{
        content: ',';
      }
    }
  }

  &__title {
    font-weight: 600;
    font-size: 1.2em;
    margin-bottom: 4px;
    span{
      color: var(--color-subtext)
    }
  }

  &__dt {
    margin: 0 10px 0 18px;
  }

  &__al {
    .link-to {
      font-weight: 500;
    }
  }

  &__name,
  &__al {
    flex: 1;
  }

  &__title,
  .link-to,
  &__name,
  &__al {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}</style>