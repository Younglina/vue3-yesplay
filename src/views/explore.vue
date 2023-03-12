<script setup>
import { staticData } from '@/utils/useData.js';
import { getApiByType } from '@/api/music'
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const hotCat = [...staticData.playListTag.filter(item => item.hot).slice(0, 10), { name:'more', icon: 'more' }]
const router = useRouter()
const route = useRoute()

const currentCat = ref('')
const cardData = ref([])
const loading = ref(false)
watch(() => route.query, ({ category, apiType }) => {
  loading.value = true
  currentCat.value = category || '全部'
  getApiByType[apiType || 'playList'](apiType ? '' : { cat: category }).then(res => {
    cardData.value = res.playlists || res.list || res.result
    loading.value = false
  }).catch(err => {
    console.log(err)
    loading.value = false
  })
}, { immediate: true })

const showAllCats = ref(false)
const changeCat = ({ name, apiType, icon }) => {
  if(!icon){
    cardData.value = []
    loading.value = true
    router.push(`/explore?category=${name}${apiType ? '&apiType=' + apiType : ''}`)
  }else{
    showAllCats.value = !showAllCats.value
    currentCat.value = showAllCats.value?icon:''
  }
}

const getCatByType = (type) => {
  return staticData.playListTag.filter(item=>item.category===type).map(item=>item.name)
}
</script>
<template>
  <h1>发现</h1>
  <div class="hot-cats">
    <ButtonIcon v-for="item in hotCat" :key="item.name" @click="changeCat(item)" radius="6px"
      :class="item.name === currentCat ? 'active' : ''">
      <span v-if="!item.icon" class="cat-name">{{ item.name }}</span>
      <SvgIcon v-else :name="item.icon" :color="showAllCats?'var(--color-primary)':'#666'"/>
    </ButtonIcon>
  </div>
  <div v-show="showAllCats" class="all-cats">
    <div v-for="(val, key) in staticData.playListCategories" :key="val">
      <div class="cat-type">{{ val }}</div>
      <div v-for="cat in getCatByType(+key)" class="cat-name" :key="cat">{{ cat }}</div>
    </div>
  </div>
  <CardList :cards="cardData" :loading="loading" />
</template>
<style scoped lang='scss'>
h1 {
  font-size: 3em;
}

.hot-cats {
  display: flex;

  .button-icon {
    background-color: var(--color-bg-gray);
    font-size: 1.15em;
    margin-right: 10px;
    padding: 9px 12px;

    &:hover {
      background-color: var(--color-bg-primary);

      .cat-name {
        color: var(--color-primary);
      }
    }

    &:active {
      transform: scale(0.94);
    }
  }

  .active {
    .cat-name {
      color: var(--color-primary);
    }

    background-color: var(--color-bg-primary);
  }

  .cat-name {
    font-weight: 700;
    color: var(--color-subtext)
  }
}
.all-cats{
  display: flex;
}
</style>