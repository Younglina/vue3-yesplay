<script setup>
defineProps({
  radius: { default: '6px' },
})
</script>

<template>
  <button class="button-icon" :style="{ borderRadius: radius }">
    <slot />
  </button>
</template>

<style scoped lang='scss'>
button {
  @include flex-center;
  padding: 0.5em;
  margin: 0.32em;
  font-size: 1em;
  transition: scale 0.25s;
  &:hover {
    background-color: var(--color-bg-gray)
  }
  &:active {
    transform: scale(0.94);
  }
}
</style>
