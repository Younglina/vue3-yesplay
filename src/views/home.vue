<script setup>
import { reactive } from 'vue'
import { getPersonalized } from '@/api/music.js'
const cardList = reactive([
  {
    data: [],
    title: '推荐歌单',
    type: 'playlist',
    key: 'result',
    loading: true,
    api: getPersonalized,
  },
  // {
  //   data: [],
  //   title: "新专速递",
  //   type: 'album',
  //   api: getAlbumNew,
  //   loading: true,
  //   key: 'albums',
  // },
  // {
  //   data: [],
  //   title: "推荐艺人",
  //   type: 'artist',
  //   api: getToplistArtist,
  //   loading: true,
  //   key: 'list',
  //   subkey:'artists',
  //   cardNum: 6
  // },
  // {
  //   data: [],
  //   title: "排行榜",
  //   type: 'toplist',
  //   api: getToplist,
  //   loading: true,
  //   key: 'list',
  //   cardNum: 5,
  // },
])

cardList.map((item) => {
  item.api().then((res) => {
    let data = res ? res[item.key] : []
    if (item.type === 'album') {
      data.map((d) => {
        d.subLink = { type: 'artist', id: d.artist.id, name: d.artist.name }
      })
    }
    if (item.type === 'artist')
      data = data[item.subkey].slice(0, 6)

    if (item.type === 'toplist')
      data = data.slice(0, 5)

    item.data = data
    item.loading = false
  }).catch((err) => {
    console.log(err)
    item.loading = false
  })
})
</script>

<template>
  <CardList v-for="val in cardList" :key="val.title" :loading="val.loading" :title="val.title" :type="val.type" :card-num="val.cardNum" :cards="val.data" />
</template>
