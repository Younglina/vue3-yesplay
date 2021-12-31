<template>
  <nav class="song-header">
    <div class="song-header_left">
      <button class="wy-button">
        <svg-icon name="back" @click="history(-1)" size="18" />
      </button>
      <button class="wy-button">
        <svg-icon name="forward" @click="history(1)" size="18" />
      </button>
    </div>
    <div class="song-header_center">
      <button
        v-for="item in pagePath"
        :key="item.id"
        :class="['wy-button', currentPageId === item.id ? 'active' : '']"
        @click="toPage(item.id)"
      >
        {{ item.name }}
      </button>
    </div>
    <div>
      <input type="text" />
      <img class="user-avatar" :src="userInfo?.avatarUrl" />
    </div>
  </nav>
</template>
<script setup>
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const pagePath = [
  {
    id: 'Home',
    name: '首页',
  },
  {
    id: 'test',
    name: '发现',
  },
  {
    id: 'mine',
    name: '我的',
  },
]

const store = useStore()
const userInfo = computed(() => {
  return store.state.userInfo
})
const route = useRoute()
const currentPageId = computed(() => {
  return route.meta.id
})

const router = useRouter()
const toPage = id => {
  currentPageId.value = id
  router.push({ name: id })
}
const history = type => {
  router.go(type)
}
</script>
<style lang="scss">
.song-header {
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  height: 60px;
  padding: 0 8vw;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div.song-header_left {
    justify-content: flex-start;
    padding: 0 10px;
    .wy-button {
      margin: 0 10px;
    }
  }
  &_center {
    .wy-button {
      margin: 0 16px;
    }
    .active {
      color: var(--color-text-blue);
    }
  }
  .user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
</style>
