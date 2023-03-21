<script setup>
import { getPersonalized, getAlbumNew, getToplistArtist, getToplist } from '@/api/music.js'
import { reactive} from 'vue';
const cardList = reactive([
  {
    data: [],
    title: "推荐歌单",
    type: 'playlist',
    key: 'result',
    loading: true,
    api: getPersonalized,
  },
  {
    data: [],
    title: "新专速递",
    type: 'album',
    api: getAlbumNew,
    loading: true,
    key: 'albums',
  },
  {
    data: [],
    title: "推荐艺人",
    type: 'artist',
    api: getToplistArtist,
    loading: true,
    key: 'list',
    subkey:'artists',
    cardNum: 6
  },
  {
    data: [],
    title: "排行榜",
    type: 'toplist',
    api: getToplist,
    loading: true,
    key: 'list',
    cardNum: 5,
  },
])

cardList.map(item=>{
  item.api().then(res=>{
    console.log(item.type, res, res[item.key])
    let data = res?res[item.key]:[]
    if(item.type==='album'){
      data.map(d=>{
        d.subLink={ type: 'artist', id: d.artist.id, name: d.artist.name}
      })
    }
    if(item.type==='artist'){
      data = data[item.subkey].slice(6)
    }
    if(item.type==='toplist'){
      data = data.slice(5)
    }
    item.data = data
    item.loading = false
  }).catch(err=>{
    console.log(err)
    item.loading = false
  })
})

</script>
<template>
  <CardList v-for="val in cardList" :loading="val.loading" :key="val.title" :title="val.title" :type="val.type" :cardNum="val.cardNum" :cards="val.data"></CardList>
</template>