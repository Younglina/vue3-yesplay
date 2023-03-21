<script setup>
</script>

<template>
  <NavBar />
  <main>
    <router-view v-slot="{ Component }">
      <keep-alive :include="['playlist','album']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</template>
<style lang="scss" scoped>
main{
  padding: 60px 10vw 96px;
}
</style>