<script setup>
import { ref, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import Message from '@/components/Message'
import ContextMenu from '@/components/ContextMenu'
import { getPlayListDetail } from '@/api/music.js'
import { getImgUrl, formatData } from '@/utils/useTool.js'
import ContentLoader from '@/components/ContentLoader.vue'

const playlistDetail = ref(null)
const isLike = ref(false)

const route = useRoute()
const routeWatch = watch(()=>route.params, async (val)=>{
  playlistDetail.value = null
  getPlayListDetail(`${val.id}`).then(res => {
    playlistDetail.value = res.playlist
  }).catch((e) => {
    Message.error(e.message)
  })
},{immediate:true})

onBeforeRouteLeave(()=>{
  routeWatch()
})

const joinLike = () => {
  isLike.value = !isLike.value
}

const openMenu = (e, data, idx) => {
  data = {menuType: 'play'}
  ContextMenu(e, data)
}

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
          最后更新于{{ formatData(playlistDetail.updateTime) }} · {{
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
          <ButtonIcon @click="openMenu($event)">
            <SvgIcon name="more" color="var(--color-text)" />
          </ButtonIcon>
        </div>
      </div>
    </div>
    <PlList :list="playlistDetail.tracks" />
  </div>
  <ContentLoader v-else/>
</template>
<style scoped lang='scss'>
@import "@/assets/styles/playlist.scss";
</style>