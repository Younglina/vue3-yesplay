<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { getImgUrl } from '@/utils/useTool.js'
const props = defineProps({
  data: { default: null },
  onClose: { type: Function, default: () => { } },
})
const showData = computed(() => {
  const data = {}
  const pd = props.data
  if (pd) {
    data.name = pd.name
    data.id = pd.id
    data.menuType = pd.menuType
    if (pd.menuType === 'playlist') {
      data.subname = pd.ar[0].name
      data.picUrl = pd.al.picUrl
    }
  }
  return data
})

const contextMenu = ref(null)
onMounted(async () => {
  await nextTick()
  contextMenu.value.focus()
})

const clickFunc = () => {
  props.onClose()
}

const actions = [
  '',
  {
    label: '播放',
    type: 'play',
  },
  {
    label: '添加到队列',
    type: '添加到队列',
  },
  '',
  {
    label: '添加到我喜欢的音乐',
    type: '添加到我喜欢的音乐',
  },
  {
    label: '添加到歌单',
    type: '添加到歌单',
    menuType: 'play',
  },
  {
    label: '复制链接',
    type: '复制链接',
    menuType: 'play',
  },
]

const showActions = computed(() => {
  if (props.data) {
    if (props.data.menuType === 'play')
      return actions.filter(i => (i.menuType && i.menuType.includes('play')))
  }

  return actions
})
</script>

<template>
  <div ref="contextMenu" class="context-menu" tabindex="-1" @blur="onClose">
    <div v-if="showData.name" class="context-menu__info">
      <img class="context-menu__img" :src="getImgUrl(showData)" alt="">
      <div>
        <div class="context-menu__name">
          {{ showData.name }}
        </div>
        <div class="context-menu__subname">
          {{ showData.subname }}
        </div>
      </div>
    </div>
    <div v-for="(item, idx) in showActions" :key="idx">
      <Divide v-if="!item" margin="0" />
      <div v-else class="context-menu__item" @click="clickFunc(item.type)">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.context-menu {
  position: absolute;
  padding: 12px 4px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-normal);
  font-size: 0.85em;
  font-weight: 500;
  user-select: none;

  &:focus {
    outline: none;
  }

  .divide {
    margin: 8px auto !important;
    width: calc(100% - 12px) !important;
  }

  &__item {
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
      color: var(--color-primary);
      background-color: var(--color-bg-primary);
      border-radius: 6px;
    }
  }

  &__info {
    display: flex;
    padding: 0 12px;
  }

  &__img {
    width: 36px;
    height: 36px;
    margin-right: 6px;
  }

  &__name {
    font-size: 1.2em;
  }

  &__subname {
    color: var(--color-subtext);
    font-size: 0.6em;
  }
}
</style>
