<script setup>
import { computed } from 'vue';

const props = defineProps({
  cards: { type: Array },
  title: { type: String },
  type: { type: String },
  cardNum: { default: 5 },
  gap: { default: '40px 22px' }
})

const listStyle = computed(() => {
  return {
    'grid-template-columns': `repeat(${props.cardNum}, 1fr)`,
    gap: props.gap,
  };
})

const radiusStyle = computed(() => {
  return {
    'border-radius': props.type === 'artist' ? '50%' : '0.75em'
  }
})

const getImgUrl = (item) => {
  let url = item.picUrl || item.coverImgUrl;
  return `${url}?param=512y512`;
}
</script>
<template>
  <div class="title">{{ title }}</div>
  <div class="list" :style="listStyle">
    <div v-for="item in cards" :key="item.id" class="card">
      <div class="card-img" :style="radiusStyle">
        <img :src="getImgUrl(item)" loading="lazy" :style="radiusStyle" />
        <div class="play-warp">
          <button class="play-btn">
            <SvgIcon name="play" />
          </button>
        </div>
      </div>
      <div class="card-name" :style="{ 'text-align': type === 'artist' ? 'center' : 'start' }">
        <LinkTo :link="{name: item.name, type, id: item.id}"/>
        <br />
        <LinkTo v-if="item.subLink" :link="item.subLink" color="var(--color-subtext)" font-size="0.75em"/>
      </div>
    </div>
  </div>
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
  }

  .card-name {
    font-weight: 600;
    padding-top: 6px;
  }
}
</style>