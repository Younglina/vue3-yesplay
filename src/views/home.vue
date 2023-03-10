<script setup>
import { getPersonalized, getAlbumNew, getToplistArtist, getToplist } from '@/api/music.js'
import { reactive } from 'vue';
const cardList = reactive({
  personalized: {
    data: [],
    title: "推荐歌单",
    type: 'playlist'
  },
  albumNew: {
    data: [],
    title: "新专速递",
    type: 'album',
  },
  toplistArtist: {
    data: [],
    title: "推荐艺人",
    type: 'artist',
    cardNum: 6
  },
  toplist: {
    data: [],
    title: "排行榜",
    type: 'toplist'
  },
})

Promise.all([getPersonalized(), getToplistArtist(), getAlbumNew({}), getToplist()]).then(res => {
  console.log(res)
  cardList.personalized.data = res[0].result
  cardList.toplistArtist.data = res[1].list.artists.slice(0, 6)
  cardList.albumNew.data = res[2].albums.map(item=>{
    item.subLink={ type: 'artist', id: item.artist.id, name: item.artist.name}
    return item
  })
  cardList.toplist.data = res[3].list.slice(0, 5)
}).catch(err => {
  console.log(err)
});

</script>
<template>
  <CardList v-for="val in cardList" :key="val.title" :title="val.title" :type="val.type" :cardNum="val.cardNum" :cards="val.data"></CardList>
  <!-- <CardList :cards="cardList.toplistArtist" title="推荐艺人" type="artist" cardNum="6"></CardList>
  <CardList :cards="cardList.albumNew" title="新专速递"></CardList>
  <CardList :cards="cardList.toplist" title="排行榜"></CardList> -->
</template>