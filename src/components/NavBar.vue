<script setup>
</script>

<template>
  <nav class="nav">
    <div class="nav-btns">
      <ButtonIcon>
        <SvgIcon name="back"></SvgIcon>
      </ButtonIcon>
      <ButtonIcon>
        <SvgIcon name="forword"></SvgIcon>
      </ButtonIcon>
    </div>
    <div class="nav-links">
      <ButtonIcon radius="6px">
        <router-link to="/" style="color: var(--color-primary)">首页</router-link>
      </ButtonIcon>
      <ButtonIcon radius="6px">
      <router-link to="/">发现</router-link>
      </ButtonIcon>
      <ButtonIcon radius="6px">
        <router-link to="/">音乐库</router-link>
      </ButtonIcon>
    </div>
    <div>
      <ButtonIcon radius="6px">
        <SvgIcon name="user"></SvgIcon>
      </ButtonIcon>
    </div>
  </nav>
</template>

<style scoped lang='scss'>
.nav {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  height: 60px;

  padding: {
    right: 10vw;
    left: 10vw;
  }

  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 49;
  &-btns,&-links{
    @include flex-center;
  }
  &-links{
    .button-icon{
      margin: 6px 18px;
      padding: 6px 10px;
    }
    a{
      text-decoration: none;
      font-size: 1.15em;
      font-weight: bold;
    }
  }
}
</style>