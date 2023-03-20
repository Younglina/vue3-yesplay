<script setup>
import axios from "axios";
import ContextMenu from "@/components/ContextMenu";
const showContextMenu = (e) => {
  e.preventDefault();
  axios
    .get(
      "https://www.fastmock.site/mock/6b16c722604e6f9b79e16f7ec3a768d4/vue3vite/playlist/detail"
    )
    .then((res) => {
      ContextMenu(e, res.data.playlist.tracks[0]);
    });
};
</script>
<template>
  <div @click.right.native="showContextMenu($event)">
    展示右键菜单
  </div>
  <div style="text-align: right;" @click.right.native="showContextMenu($event)">
    展示右侧边界菜单
  </div>
  <div style="position: absolute;bottom: 0px" @click.right.native="showContextMenu($event)">
    展示底部边界菜单
  </div>
</template>
<style scoped lang="scss"></style>
