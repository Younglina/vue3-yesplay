<script setup>
const props = defineProps({
  type: { default: '' }
})
</script>
<template>
  <div class="context-menu">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>
</template>
<style scoped lang='scss'>
.context-menu {
  position: fixed;
}
</style>