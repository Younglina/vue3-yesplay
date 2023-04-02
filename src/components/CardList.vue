<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getImgUrl } from '@/utils/useTool.js'

const props = defineProps({
  cards: { type: Array },
  title: { type: String },
  type: { type: String },
  loading: { type: Boolean, default: false },
  cardNum: { default: 5 },
  gap: { default: '40px 22px' },
})

const listStyle = computed(() => {
  return {
    'grid-template-columns': `repeat(${props.cardNum}, 1fr)`,
    'gap': props.gap,
  }
})

const radiusStyle = computed(() => {
  return {
    'border-radius': props.type === 'artist' ? '50%' : '0.75em',
  }
})

const router = useRouter()
const getPageByType = (id) => {
  router.push(`/${props.type}/${id}`)
}
</script>

<template>
  <div v-if="title" class="title">
    {{ title }}
  </div>
  <WyLoading v-if="loading" />
  <template v-else>
    <div v-if="cards.length > 0" class="list" :style="listStyle">
      <div v-for="item in cards" :key="item.id" class="card" @click="getPageByType(item.id)">
        <div class="card-img" :style="radiusStyle">
          <img :src="getImgUrl(item)" loading="lazy" :style="radiusStyle">
          <div class="play-warp">
            <button class="play-btn">
              <SvgIcon name="play" color="#ffffff" />
            </button>
          </div>
        </div>
        <div class="card-name" :style="{ 'text-align': type === 'artist' ? 'center' : 'start' }">
          <LinkTo :link="{ name: item.name, type, id: item.id }" />
          <template v-if="item.subname">
            <br>
            <span class="card-subname">{{ item.subname }}</span>
          </template>
          <br>
          <LinkTo v-if="item.subLink" :link="item.subLink" class="sublink" />
        </div>
      </div>
    </div>
    <div v-else class="no-data">
      <SvgIcon name="nodata" />
      <p>暂无数据</p>
    </div>
  </template>
</template>

<style scoped lang='scss'>
.title {
  font-size: 1.5em;
  margin: 40px 0 24px;
  font-weight: 600;
}

.list {
  display: grid;

  .card-img {
    @include flex-center;
    position: relative;
    cursor: pointer;
    transition: 0.2s;
    user-select: none;

    &:hover {
      box-shadow: 0 2px 10px 10px rgba(0, 0, 0, 0.1);

      .play-btn {
        visibility: visible;
      }
    }
  }

  .play-warp {
    @include flex-center;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
  }

  .play-btn {
    @include flex-center;
    visibility: hidden;
    width: 20%;
    height: 20%;
    border-radius: 50%;
    backdrop-filter: blur(12px);
    background-color: rgba(255, 255, 255, 0.22);
    font-size: 1.1em;

    &:hover {
      background-color: rgba(255, 255, 255, 0.38);
    }

    &:active {
      transform: scale(0.94);
    }
  }

  img {
    width: 100%;
    border: 1px solid var(--color-img);
    aspect-ratio: 1/1;
  }

  .card-name {
    font-weight: 600;
    padding-top: 6px;

    .sublink,
    .card-subname {
      color: var(--color-subtext);
      font-size: 0.75em;
    }
  }
}

.no-data {
  text-align: center;

  .svg-icon {
    width: 15vw;
    height: 15vw;
  }
}
</style>
