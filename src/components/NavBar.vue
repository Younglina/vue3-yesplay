<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const navLinks = [{ name: 'Home', label: '首页' }, { name: 'Explore', label: '发现' }, { name: 'MusicLibrary', label: '音乐库' }]
const route = useRoute()
const currentNav = computed(() => route.name)
</script>

<template>
  <nav class="nav">
    <div class="nav-btns">
      <ButtonIcon radius="20%" @click="$router.go(-1)">
        <SvgIcon name="back"></SvgIcon>
      </ButtonIcon>
      <ButtonIcon radius="20%" @click="$router.go(1)">
        <SvgIcon name="forword"></SvgIcon>
      </ButtonIcon>
    </div>
    <div class="nav-links">
      <ButtonIcon v-for="item in navLinks" :key="item.name"
        :style="{ color: currentNav === item.name ? 'var(--color-primary)' : 'inherit' }">
        <router-link :to="{ name: item.name }">{{ item.label }}</router-link>
      </ButtonIcon>
    </div>
    <div>
      <ButtonIcon>
        <SvgIcon name="user"></SvgIcon>
      </ButtonIcon>
    </div>
  </nav>
</template>

<style scoped lang='scss'>
.nav {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  height: 60px;

  padding: {
    right: 10vw;
    left: 10vw;
  }

  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 49;

  &-btns,
  &-links {
    @include flex-center;
  }
  &-btns{
    .svg-icon{
      width: 1em;
      height: 1em;
      margin: 6px;
    }
  }
  &-links {
    .button-icon {
      margin: 6px 18px;
      padding: 6px 10px;
    }

    a {
      text-decoration: none;
      font-size: 1.15em;
      font-weight: bold;
    }
  }
}
</style>