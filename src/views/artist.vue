<script setup>
import { ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import Message from '@/components/Message'
import { getAlbumByArtist, getArtist, getArtistMV } from '@/api/music.js'
import { formatData, getImgUrl } from '@/utils/useTool.js'
import ContentLoader from '@/components/ContentLoader.vue'

const artistDetail = ref(null)
const artistAlbumList = ref([])
const artistMVList = ref([])
const isLike = ref(false)
const albumLoading = ref(true)
const mvsLoading = ref(true)
const route = useRoute()

const routeWatch = watch(() => route.params, async (val) => {
  artistDetail.value = null
  const artistData = await getArtist(val.id)
  artistData.hotSongs = artistData.hotSongs.map((item) => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.al.picUrl,
      alId: item.al.id,
      alName: item.al.name,
    }
  })
  artistDetail.value = artistData
  getAlbumByArtist({ id: val.id }).then((res) => {
    artistAlbumList.value = res.hotAlbums.map(({ id, name, picUrl, publishTime }) => ({
      id, name, picUrl, subname: `${formatData(publishTime, 'YYYY')}`,
    }))
    albumLoading.value = false
  }).catch((e) => {
    Message.error(e.message)
    albumLoading.value = false
  })
  getArtistMV(val.id).then((res) => {
    artistMVList.value = res.mvs.map(({ id, name, imgurl, publishTime }) => ({
      id, name, imgurl, subname: `${formatData(publishTime, 'YYYY')}`,
    }))
    mvsLoading.value = false
  }).catch((e) => {
    mvsLoading.value = false
    Message.error(e.message)
  })
}, { immediate: true })

onBeforeRouteLeave(() => {
  routeWatch()
})

const joinLike = () => {
  isLike.value = !isLike.value
}
</script>

<template>
  <div v-if="artistDetail" class="playlist">
    <div class="pl-info">
      <div class="pl-info__img">
        <img :src="getImgUrl(artistDetail.artist)" alt="图片">
      </div>
      <div class="pl-info__data">
        <div class="pl-info__name">
          {{ artistDetail.artist.name }}
        </div>
        <div class="pl-info__creator">
          艺人
        </div>
        <div class="pl-info__count">
          {{ artistDetail.artist.musicSize }}首歌 ·
          {{ artistDetail.artist.albumSize }}张专辑 ·
          {{ artistDetail.artist.mvSize }}张专辑
        </div>
        <div class="pl-info__desc">
          {{ artistDetail.artist.briefDesc }}
        </div>
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
    <div class="list-warp">
      <div class="list-warp-title">
        热门歌曲
      </div>
      <div class="hot-songs">
        <div v-for="item in artistDetail.hotSongs.slice(0, 12)" :key="item.id" class="hot-songs__items">
          <img :src="getImgUrl(item)" loading="lazy" alt="hotsong">
          <div>
            <div class="hot-songs__name">
              {{ item.name }}
            </div>
            <div class="hot-songs__subname">
              <LinkTo :link="{ id: item.alId, name: item.alName, type: 'album' }" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list-warp">
      <div class="list-warp-title">
        专辑
      </div>
      <CardList :cards="artistAlbumList" :loading="albumLoading" type="album" />
    </div>
    <div class="list-warp">
      <div class="list-warp-title">
        MVs
      </div>
      <CardList :cards="artistMVList" :loading="mvsLoading" type="mv" />
    </div>
  </div>
  <ContentLoader v-else />
</template>

<style scoped lang='scss'>
@import "@/assets/styles/playlist.scss";

.playlist {
  .pl-info__name {
    font-size: 3em;
  }
  .pl-info__img{
    img{
      border-radius: 50%;
    }
  }
}

.list-warp {
  margin-top: 50px;
}

.hot-songs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px 12px;

  &__items {
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 8px;

    &:hover {
      background-color: var(--color-bg-gray);
    }
  }

  img {
    width: 38px;
    height: 38px;
    border-radius: 6px;
    border: 1px solid var(--color-img);
    margin-right: 12px;
    cursor: pointer;
  }

  &__name {
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__subname {
    color: var(--color-subtext);
    font-size: 0.85px;
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

.list-warp-title {
  margin: 20px 0;
  font-size: 1.5em;
  font-weight: 600;
}
</style>
