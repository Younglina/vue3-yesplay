<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    return { symbolId }
  },
})
</script>

<template>
  <svg aria-hidden="true" class="svg-icon" :style="{ color }">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon{
  width: 1.4em;
  height: 1.4em;
}
</style>
