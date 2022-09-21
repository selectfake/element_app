<template>
  <div class="index">
    <router-view></router-view>
    <tab-bar :data="tabbarData"></tab-bar>
  </div>
</template>

<script lang="ts" setup>
import TabBar from '../components/TabBar.vue';
const tabbarData = [
  { title: "首页", icon: 'icon-shouye', path: "/home" },
  { title: "订单", icon: 'icon-wodedingdan', path: "/order" },
  { title: "我的", icon: 'icon-wode', path: "/me" },
]
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: calc(100%-45px);
}
</style>