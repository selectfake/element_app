<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped lang="less">
  #app{
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #f1f1f1;
  }
</style>
