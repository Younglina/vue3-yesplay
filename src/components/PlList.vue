<script setup>
import ContextMenu from '@/components/ContextMenu'
import { getImgUrl, formatDT } from '@/utils/useTool.js'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const porps = defineProps({
  list: { default: () => []}
})

const route = useRoute()
const notAlbum = computed(()=>{
  return route.name !== 'album'
})

const openMenu = (e, data, idx) => {
  e.preventDefault()
  data.menuType = 'playlist'
  ContextMenu(e, data)
}
</script>
<template>

<div class="pl-list">
  <div v-for="(item, idx) in list" 
    @click.right.native="openMenu($event, item, idx)"
    class="pl-list__warp" 
    :key="item.id">
    <img v-if="notAlbum" :src="getImgUrl(item.al)" @click="$router.push(`/album/${item.id}`)" class="pl-list__img" loading="lazy" alt="图片">
    <div v-else class="pl-list__playidx">
      <div class="pl-list__idx">{{ idx+1 }}</div>
      <SvgIcon class="pl-list__play" name="play" size="1em" color="var(--color-primary)"/>
    </div>
    <div class="pl-list__name">
      <div class="pl-list__title">
        {{ item.name }}
        <span>{{ item.tns?`(${item.tns[0]})`:'' }}</span>
      </div>
      <div v-if="notAlbum">
        <LinkTo v-for="ars in item.ar" :key="ars.id" :link="{ ...ars, type: 'artist' }" />
      </div>
    </div>
    <div v-if="notAlbum" class="pl-list__al">
      <LinkTo :link="{ ...item.al, type: 'album' }" />
    </div>
    <SvgIcon class="pl-list__heart" name="heart" color="var(--color-primary)"/>
    <div class="pl-list__dt">
      {{ formatDT(item.dt) }}
    </div>
  </div>
</div>
</template>
<style scoped lang='scss'>
.pl-list {
  margin-top: 50px;

  &__warp {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 8px;
    border-radius: 8px;
    user-select: none;
    &:hover{
      background-color: var(--color-bg-gray);
      .pl-list__idx{
        opacity: 0;
      }
      .pl-list__heart, .pl-list__play{
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
    cursor: pointer;
  }
  &__idx{
    color: var(--text-subtext);
    font-size: 0.85em;
  }
  &__play{
    cursor: pointer;
    opacity: 0;
    &:hover{
      transform: scale(1.1)
    }
    &:active{
      transform: scale(0.95)
    }
  }
  &__playidx{
    @include flex-center;
    position: relative;
    width: 22px;
    .svg-icon{
      width: 1em;
      height: 1em;
    }
  }
  &__play,&__idx{
    position: absolute;
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
}
</style>