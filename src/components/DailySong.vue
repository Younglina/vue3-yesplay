<template>
  <h2>For You</h2>
  <div class="daily-recommend">
    <div
      class="daily-card"
      :style="{ backgroundImage: `url(${recommendSongBgImage})` }"
      @click="toDailySonglist"
    >
      <div class="song-day">每日推荐</div>
      <svg-icon name="play" color="#ffffff" size="42" />
    </div>
    <div
      class="daily-card"
      :style="{
        backgroundImage: `url(${recommendDj?.picUrl}?params=1024y1024)`,
      }"
    >
      <div class="song-day">精选电台</div>
      <svg-icon name="play" color="#ffffff" size="42" />
    </div>
  </div>
</template>
<script setup>
import { getRecommendSongs, getRecommendDJ } from '@/api/song.js'
import SongList from '@/components/SongList.vue'
import { formatSongs } from '@/utils/useTool.js'
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

const recommendSongs = ref([])
const store = useStore()
const recommendSongBgImage = computed(() => {
  return `${store.state.dailySong[0]?.picUrl}?param=1024y1024`
})
const recommendDj = ref(null)
onMounted(() => {
  getRecommendSongs().then(({ data }) => {
    store.commit('SET_DAILYSONG', formatSongs(data.dailySongs))
  })
  getRecommendDJ().then(({ djRadios }) => {
    recommendDj.value = djRadios[0]
  })
})
const router = useRouter()
function toDailySonglist() {
  console.log(123123)
  router.push({ name: 'DailySonglist' })
}
</script>
<style lang="scss" scoped>
.daily-recommend {
  display: flex;
  justify-content: space-between;
  .daily-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    border-radius: 20px;
    position: relative;
    color: #fff;
    background-size: cover;
    background-repeat: no-repeat;
    animation: positon 50s infinite;
    &:first-child {
      margin-right: 20px;
    }
    &:last-child {
      margin-left: 20px;
    }
    .svg-icon {
      border-radius: 50%;
      padding: 20px;
      background-color: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(4px);
      cursor: pointer;
      margin-right: 20px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  .song-day {
    font-size: 48px;
    padding: 18px;
    width: 140px;
    letter-spacing: 10px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.08);
    text-align: center;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
}
@keyframes positon {
  0% {
    background-position-y: bottom;
  }
  100% {
    background-position-y: top;
  }
}
</style>
