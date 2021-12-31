<template>
  <DailySong />
  <h2>推荐歌单</h2>
  <SongCard :songList="songList" />
  <h2>最新音乐</h2>
  <SongCard :songList="newSongList" />
  <h2>新碟上架</h2>
  <SongCard :songList="discList" />
</template>

<script setup>
import { ref } from 'vue'
import { formatCount, formatDate } from '@/utils/useTool.js'
import {
  getPersonalized,
  getPersonalizedNewsong,
  getAlbumNewest,
  getRecommendSongs,
} from '@/api/song.js'
import SongCard from '@/components/SongCard.vue'
import DailySong from '@/components/DailySong.vue'

const songList = ref(null)
getPersonalized(10).then(({ result }) => {
  songList.value = result.map(item => {
    item.playCount = formatCount(item.playCount)
    item.trackNumberUpdateTime = formatDate(item.trackNumberUpdateTime)
    return item
  })
})
const newSongList = ref(null)
getPersonalizedNewsong().then(({ result }) => {
  newSongList.value = result.map(item => {
    item.copywriter = item.song.artists[0].name
    return item
  })
})
const discList = ref(null)
getAlbumNewest({ limit: 10 }).then(({ albums }) => {
  discList.value = albums.slice(0, 10).map(item => {
    item.copywriter = item.artist?.name
    return item
  })
})
</script>
<style lang="scss" scoped>
.song-day {
  font-size: 48px;
  width: 140px;
  letter-spacing: 10px;
  font-weight: bold;
}
</style>
