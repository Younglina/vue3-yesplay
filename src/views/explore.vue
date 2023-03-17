<script setup>
import { staticData } from '@/utils/useData.js';
import { getApiByType } from '@/api/music'
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const hotCat = [...staticData.playListTag.filter(item => item.hot).slice(0, 10), { name: 'more', icon: 'more' }]
const router = useRouter()
const route = useRoute()

const currentCat = ref('')
const cardData = ref([])
const loading = ref(false)
watch(() => route.query, ({ category, apiType }) => {
  loading.value = true
  currentCat.value = category || '全部'
  getApiByType[apiType || 'playList'](apiType ? '' : { cat: category }).then(res => {
    console.log(res)
    cardData.value = res.playlists || res.list || res.result
    loading.value = false
  }).catch(err => {
    console.log(err)
    loading.value = false
  })
}, { immediate: true })

const showAllCats = ref(false)
const templateCur = ref('')
const changeCat = ({ name, apiType, icon }) => {
  if (!icon) {
    cardData.value = []
    loading.value = true
    currentCat.value = name || '全部'
    templateCur.value = name
    router.push(`/explore?category=${name}${apiType ? '&apiType=' + apiType : ''}`)
  } else {
    showAllCats.value = !showAllCats.value
    if (showAllCats.value) {
      templateCur.value = currentCat.value
      currentCat.value = icon
    } else {
      currentCat.value = templateCur.value
    }
  }
}

const getCatByType = (type) => {
  return staticData.playListTag.filter(item => (item.category === type && !hotCat.some(hc => hc.name === item.name))).map(item => item.name)
}
</script>
<template>
  <h1>发现</h1>
  <div class="hot-cats">
    <ButtonIcon v-for="item in hotCat" :key="item.name" @click="changeCat(item)"
      :class="item.name === currentCat ? 'active' : ''">
      <span v-if="!item.icon" class="cat-name">{{ item.name }}</span>
      <SvgIcon v-else :name="item.icon" :color="showAllCats ? 'var(--color-primary)' : '#666'" />
    </ButtonIcon>
  </div>
  <div v-show="showAllCats" class="all-cats">
    <div v-for="(val, key) in staticData.playListCategories" class="all-cats-item" :key="val">
      <div class="cat-type">{{ val }}</div>
      <div class="cat-name">
        <ButtonIcon v-for="cat in getCatByType(+key)" :key="cat"
          :class="(cat === currentCat || cat === templateCur) ? 'active' : ''" @click="changeCat({ name: cat })"
          >{{ cat }}</ButtonIcon>
      </div>
    </div>
  </div>
  <CardList :cards="cardData" :loading="loading" />
</template>
<style scoped lang='scss'>
h1 {
  font-size: 3em;
}

.button-icon {
  font-size: 1.15em;
  margin-right: 10px;
  padding: 6px 10px;

  &:hover {
    background-color: var(--color-bg-primary);
    color: var(--color-primary);

    .cat-name {
      color: var(--color-primary);
    }
  }

  &:active {
    transform: scale(0.94);
  }
}

.hot-cats {
  display: flex;
  flex-wrap: wrap;

  .button-icon {
    background-color: var(--color-bg-gray);
  }

  .cat-name {
    font-weight: 700;
    color: var(--color-subtext)
  }
}

.all-cats {
  background-color: var(--color-bg-gray);
  border-radius: 6px;
  padding: 12px 0 12px 22px;
  margin: 6px 0 0 6px;

  &-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .cat-type {
    font-size: 1.5em;
    font-weight: 500;
    white-space: nowrap;
    padding: 6px 0 0 10px;
  }

  .cat-name {
    display: flex;
    flex-wrap: wrap;
    margin-left: 18px;
  }

  .button-icon {
    font-size: 1em;
    min-width: 90px;
  }
}

.active {
  color: var(--color-primary);

  .cat-name {
    color: var(--color-primary);
  }

  background-color: var(--color-bg-primary);
}
</style>