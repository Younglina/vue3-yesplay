<template>
  <div class="g-container">
    <div class="g-first" />
    <div v-for="item in 5" :key="item" class="g-ball" />
  </div>
</template>

<style scoped lang='scss'>
$count: 5;
.g-container {
  margin: 3.6vw auto 20px;
  position: relative;
  width: 1.8vw;
  height: 1.8vw;
}

.g-ball,
.g-first {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-primary);
  border-radius: 50%;
  transform: translate(-700%, 0);
  opacity: 0;
  // animation: move 3s infinite linear;
}

@for $i from 0 through $count {
  .g-ball:nth-child(#{$i}) {
    animation: move 3.5s infinite #{$i * 0.2 + 0.1}s linear;
  }
}

.g-first {
  animation: scaleMove 3.5s infinite linear;
}

@keyframes move {
  25% {
    opacity: 1;
    transform: translate(-1vw, 0);
  }

  50% {
    opacity: 1;
    transform: translate(1vw, 0);
  }

  75%,
  100% {
    opacity: 0;
    transform: translate(700%, 0);
  }
}

@keyframes scaleMove {
  25% {
    opacity: 1;
    transform: translate(-1vw, 0);
  }

  35% {
    opacity: 1;
    transform: scale(1);
  }

  70% {
    opacity: 1;
    transform: translate(1vw, 0) scale(2);
  }

  80% {
    opacity: 1;
  }

  90%,
  100% {
    opacity: 0;
    transform: translate(1vw, 0) scale(1);
  }
}
</style>
