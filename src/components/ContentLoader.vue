<script setup>
import { ContentLoader } from 'vue-content-loader'
</script>
<template>
<content-loader
    width="100%"
    height="80vh"
    primaryColor="#f3f3f3"
    secondaryColor="#cccccc"
  >
    <rect x="0" y="0" rx="8" ry="8" width="30%" height="30%"/>
    <rect x="35%" y="8" rx="8" ry="8" width="60%" height="28px" />
    <rect x="35%" y="68" rx="8" ry="8" width="40%" height="28px" />
    <rect x="35%" y="108" rx="8" ry="8" width="55%" height="28px" />
    <rect x="35%" y="158" rx="8" ry="8" width="58px" height="38px" />
    <rect x="43%" y="158" rx="8" ry="8" width="58px" height="38px" />
    <rect x="51%" y="158" rx="8" ry="8" width="58px" height="38px" />

    <rect x="0" y="45%" rx="8" ry="8" width="10%" height="10%"/>
    <rect x="12%" y="46%" rx="8" ry="8" width="15%" height="20px" />
    <rect x="12%" y="50%" rx="8" ry="8" width="10%" height="20px" />
    <rect x="42%" y="48%" rx="8" ry="8" width="20%" height="20px" />
    <rect x="75%" y="48%" rx="8" ry="8" width="20%" height="20px" />
  </content-loader>
</template>
<style scoped lang='scss'>

</style>