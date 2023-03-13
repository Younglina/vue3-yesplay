<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { getOffsetOrSpace, getLastOffset } from './instance.js'

const props = defineProps({
  id: { type: String, require: true },
  type: { type: String, default: 'info' },
  message: { type: String, default: "message" },
  duration: { type: Number, default: 3000 },
  onClose: { type: Function },
  offset: { type: Number, default: 12 },
  zIndex: { type: Number, default: 2000 }
})

const emits = defineEmits({ destroy: () => true })

const visible = ref(false);
const durationTime = ref(null)
const height = ref(0)
const messageRef = ref()

function startTimer() {
  if (props.duration !== 0) {
    durationTime.value = setTimeout(() => {
      close()
    }, props.duration)
  }
}
function close() {
  visible.value = false
}
function clearTimer() {
  clearTimeout(durationTime.value)
  durationTime.value = null
}
const lastOffset = computed(() => getLastOffset(props.id))
const offset = computed(
  () => getOffsetOrSpace(props.id, props.offset) + lastOffset.value
)
const bottom = computed(() => height.value + offset.value)
const customStyle = computed(() => ({
  top: `${offset.value}px`,
  zIndex: props.zIndex,
}))
defineExpose({
  visible,
  close,
  bottom
})
onMounted(async ()=>{
  startTimer()
  visible.value = true
  await nextTick()
  height.value = messageRef.value ? messageRef.value.getBoundingClientRect().height : 54
})
</script>
<template>
  <transition @before-leave="onClose" @after-leave="$emit('destroy')">
    <div v-show="visible" :class="[type, 'message']" :style="customStyle" ref="messageRef" @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <span>{{ message }}</span>
    </div>
  </transition>
</template>
<style scoped lang="scss">
.message {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  padding: 12px 18px;
  border-radius: 6px;
  transition: opacity 0.3s, transform 0.3s, top 0.3s;
}

.success{
  color: #67c23a;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.info{
  color: #909399;
  background-color: #f4f4f5;
  border-color: #e9e9eb;
}
.error{
  color: #f56c6c;
  background-color: #fef0f0;
  border-color: #fde2e2;
}
.warning{
  color: #e6a23c;
  background-color: #fdf6ec;
  border-color: #faecd8;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
