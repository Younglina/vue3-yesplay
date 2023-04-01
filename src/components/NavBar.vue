<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const navLinks = [{ name: 'Home', label: '首页' }, { name: 'Explore', label: '发现' }, { name: 'MusicLibrary', label: '音乐库' }]
const route = useRoute()
const currentNav = computed(() => route.name)
</script>

<template>
  <nav class="nav wy-bar">
    <div class="nav-btns">
      <ButtonIcon radius="20%" @click="$router.go(-1)">
        <SvgIcon name="back" />
      </ButtonIcon>
      <ButtonIcon radius="20%" @click="$router.go(1)">
        <SvgIcon name="forword" />
      </ButtonIcon>
    </div>
    <div class="nav-links">
      <ButtonIcon
        v-for="item in navLinks" :key="item.name"
        :style="{ color: currentNav === item.name ? 'var(--color-primary)' : 'inherit' }"
      >
        <router-link :to="{ name: item.name }">
          {{ item.label }}
        </router-link>
      </ButtonIcon>
    </div>
    <div>
      <ButtonIcon>
        <SvgIcon name="user" />
      </ButtonIcon>
    </div>
  </nav>
</template>

<style scoped lang='scss'>
.nav {
  top: 0;
  height: 60px;

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
