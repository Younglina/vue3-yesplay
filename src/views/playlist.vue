<script setup>
import { getPlayListDetail } from '@/api/music.js'
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getImgUrl } from '@/utils/useTool.js'
import Message from '@/components/Message'

const playlistDetail = ref(null)
onBeforeMount(()=>{
  const route = useRoute()
  getPlayListDetail(`${route.params.id}`).then(res=>{
    playlistDetail.value = res.playlist
  }).catch((e)=>{
    Message.error(e.message)
  })
})
</script>
<template>
  <div v-if="playlistDetail">
    <div class="pl-info">
      <div class="pl-info__img">
        <img :src="getImgUrl(playlistDetail)" alt="图片">
      </div>
      <div class="pl-info__date">
        <div class="pl-info__name">{{ playlistDetail.name  }}</div>
        <div class="pl-info__creator">Playlist by 
          <LinkTo :link="{name:playlistDetail.creator.nickname,type: $route.name,id: playlistDetail.creator.userId}" />
        </div>
        <div class="pl-info__count">{{ playlistDetail.updateTime  }} · {{ playlistDetail.trackCount }}首歌</div>
        <div class="pl-info__desc">{{ playlistDetail.description  }}</div>
        <div>
          <ButtonIcon>
            <SvgIcon name="play" color="#333"/>
          </ButtonIcon>
          <ButtonIcon>
            <SvgIcon name="more" color="var(--color-text)"/>
          </ButtonIcon>
        </div>
      </div>
  </div>
  </div>
</template>
<style scoped lang='scss'>
.pl-info{
  display: flex;
  &__img{
    width: 30%;
    img{
      width: 100%;
    }
  }
  &__date{
    margin-left: 36px;
  }
  &__name,&__count{
    margin-bottom: 12px;
  }
  &__name{
    font-size: 1.8em;
    font-weight: 600;
  }
  &__desc,&__count{
    font-size: 0.8em;
    color: var(--color-subtext)
  }
}
</style>