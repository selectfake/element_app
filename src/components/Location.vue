<template>
  <div>
    <div class="title">当前定位</div>
    <div class="des" @click="$emit('click')">
      <i class="iconfont icon-gaodeditu"></i>
      <span>{{address}}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  address: String
})
</script>

<style scoped>
.title {
  margin: 10px 0;
  font-size: 12px;
}

.des i {
  color: #009eef;
}

.des span {
  color: #333;
  font-weight: bold;
  margin-left: 5px;
  display: inline-block;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>