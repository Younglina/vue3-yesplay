<script setup>
import { ref } from 'vue'
import { getNewSong } from '@/api/song.js'

const asdf = ref(null)
getNewSong().then(({ result }) => {
  asdf.value = result
})
</script>

<template>
  <div>
    <h1>{{ list }}</h1>
    <div v-for="item in asdf" :key="item.name">{{ item.name }}</div>
  </div>
</template>

<style scoped></style>
