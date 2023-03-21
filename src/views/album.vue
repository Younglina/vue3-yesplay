<script setup>
import { ref, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import Message from '@/components/Message'
import { getAlbumDetail, getAlbumByArtist } from '@/api/music.js'
import { getImgUrl, formatData } from '@/utils/useTool.js'
import ContentLoader from '@/components/ContentLoader.vue'

const albumDetail = ref(null)
const artistAlbumList = ref([])
const isLike = ref(false)
const route = useRoute()

const routeWatch = watch(()=>route.params,async (val)=>{
  const albumData = await getAlbumDetail(`${val.id}`)
  albumDetail.value = albumData
  getAlbumByArtist({ id: albumData.album.artist.id, limit: 5 }).then(res => {
    artistAlbumList.value = res.hotAlbums.map(({ id, name, picUrl, publishTime }) => ({
      id, name, picUrl, subname: `Album · ${formatData(publishTime, 'YYYY')}`}))
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

</script>
<template>
  <div v-if="albumDetail" class="playlist">
    <div class="pl-info">
      <div class="pl-info__img">
        <img :src="getImgUrl(albumDetail.album)" alt="图片">
      </div>
      <div class="pl-info__data">
        <div class="pl-info__name">
          {{ albumDetail.album.name }}
        </div>
        <div class="pl-info__creator">Album by
          <LinkTo :link="{ name: albumDetail.album.artist.name, type: $route.name, id: albumDetail.album.artist.id }" />
        </div>
        <div class="pl-info__count">
          {{ formatData(albumDetail.album.publishTime, 'YYYY') }} · {{
            albumDetail.songs.length }}首歌</div>
        <div class="pl-info__desc">{{ albumDetail.album.description }}</div>
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
    <PlList class="album-list" :list="albumDetail.songs" />
    <div class="album-copyright">
      发行于 {{ formatData(albumDetail.album.publishTime) }}
      <div v-if="albumDetail.album.company">
        © {{ albumDetail.album.company }}
      </div>
    </div>
    <Divide />
    <div>
      <div class="album-more">More by {{ albumDetail.album.artist.name }}</div>
      <CardList :cards="artistAlbumList" type="album"></CardList>
    </div>
  </div>
  <ContentLoader v-else/>
</template>
<style scoped lang='scss'>
@import "@/assets/styles/playlist.scss";

.playlist {
  .pl-info__name {
    font-size: 3em;
  }
}

.album-list {
  :deep(.pl-list__warp) {
    padding: 16px 12px;
    margin-bottom: 4px;
  }

  :deep(.pl-list__title) {
    font-size: 1em;
  }
}

.album-copyright {
  margin-top: 30px;
  font-size: 0.8em;
  color: var(--color-subtext)
}
.album-more{
  margin-top: 50px;
  font-size: 1.5em;
  font-weight: 500;
}
</style>