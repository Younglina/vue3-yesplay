<script setup>
import { ref } from "vue";

const props = defineProps({
  message: { type: String, default: "message"},
  duration: { type: Number, default: 1500},
})

const visible = ref(false);
const durationTime = ref(null)

console.log(props)

onShow()

function onShow(){
  visible.value = true
  if (props.duration !== 0) {
    startTimer()
  }
}

function startTimer() {
  durationTime.value = setTimeout(() => {
    onClose()
  }, props.duration)
}
function onClose() {
  visible.value = false
}
function clearTimer(){
  clearTimeout(durationTime.value)
  durationTime.value = null
}
</script>
<template>
  <transition>
    <div v-show="visible" 
      class="message" 
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <span>{{ message }}</span>
    </div>
  </transition>
</template>
<style scoped lang="scss">
.message {
  position: fixed;
  left: 50%;
  top: 20px;
  z-index: 2000;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  background-color: #666;
  padding: 2px 12px;
  border-radius: 6px;
  transition: opacity 0.3s, transform 0.3s, top 0.3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
