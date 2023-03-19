<script setup>
import { onMounted, ref } from 'vue'

const asdf=()=>{
  console.log(123)
}
const focusaa = () => {
  console.log(1231231233)
}
const contextMenu = ref(null)
onMounted(() => {
  console.log(contextMenu)
  contextMenu.value.focus();
})
</script>
<template>
  <div class="context-menu" ref="contextMenu" @focus="focusaa" @blur="asdf" tabindex="-1">
    asdfasdf
  </div>
</template>
<style scoped lang="scss"></style>
