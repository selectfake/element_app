<template>
  <div class="Rating-gray">
    <i v-for="(item,index) in itemclasses" :key="index" :class="item"></i>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const LENGTH = 5
const CLS_ON = 'iconfont icon-shoucang'
const CLS_HALF = 'iconfont icon-banxing'
const CLS_OFF = 'iconfont icon-star'
const props = defineProps({
  rating: Number
})
const itemclasses = computed(() => {
  // 4.8 四个全星 1个半星
  let result = ref([])
  // 对分数进行处理, 向下取0.5的倍数
  let score = Math.floor(props.rating * 2) / 2
  // 控制半星
  let hasDecimal = score % 1 !== 0
  // 全星
  let integer = Math.floor(score)

  // 全星放入到数组中
  for (let i = 0; i < integer; i++) {
    result.value.push(CLS_ON);
  }

  // 半星
  if (hasDecimal) {
    result.value.push(CLS_HALF);
  }

  // 补齐
  while (result.value.length < LENGTH) {
    result.value.push(CLS_OFF);
  }

  return result.value;
})
</script>

<style scoped>
.Rating-gray {
  margin-right: 1.066667vw;
  color: #ffbe00;
  display: inline-block;
}
</style>