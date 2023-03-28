<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { getLastOffset, getOffsetOrSpace } from './instance.js'

const props = defineProps({
  id: { type: String, require: true },
  type: { type: String, default: 'info' },
  message: { type: String, default: 'message' },
  duration: { type: Number, default: 3000 },
  onClose: { type: Function },
  offset: { type: Number, default: 12 },
  zIndex: { type: Number, default: 2000 },
})

defineEmits({ destroy: () => true }) // 当组件消失时抛出卸载钩子

const visible = ref(false)
const durationTime = ref(null) // 控制关闭组件的定时器
const messageRef = ref() // 组件ref
const height = ref(0) // 组件整体高度，通过上面的ref获取

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
// 可能会同时存在多个message，所以需要控制它们之间的offset
const lastOffset = computed(() => getLastOffset(props.id)) // 获取当前组件前一个message的 bottom值
const offset = computed(
  () => getOffsetOrSpace(props.id) + lastOffset.value,
)
const bottom = computed(() => height.value + offset.value)
const customStyle = computed(() => ({
  top: `${offset.value}px`,
  zIndex: props.zIndex,
}))

// 用于声明当组件实例被父组件通过模板引用访问时暴露的公共属性。
// 可以直接通过实例的.vm.exposed.bottom.value获取
defineExpose({
  visible,
  close,
  bottom,
})
onMounted(async () => {
  startTimer()
  visible.value = true
  await nextTick()
  height.value = messageRef.value ? messageRef.value.getBoundingClientRect().height : 54
})
</script>

<template>
  <!-- 监听transtition组件的钩子，离开前可以触发自定义的close方法，离开后把整个组件卸载 -->
  <transition @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible" ref="messageRef" class="message" :class="[type]" :style="customStyle" @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
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

// v-enter-from：进入动画的起始状态。
// v-leave-to 离开动画的结束状态。
// 意思是当组件显示时，
// 从opacity: 0;transform: translate(-50%, -100%);开始，
// 到opacity:1;top: 60px;transform: translateX(-50%);
// 是当组件隐藏时回到opacity: 0;transform: translate(-50%, -100%);
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
