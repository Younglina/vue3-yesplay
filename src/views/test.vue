<script setup>
import contextMenu from '@/components/contextMenu'
import { h, render } from 'vue'

window.oncontextmenu = (e) => {
  e.preventDefault()
  contextMenu({ type: 'aa' }, e)
}
</script>
<template>
  asdf
</template>
<style scoped lang="scss"></style>
