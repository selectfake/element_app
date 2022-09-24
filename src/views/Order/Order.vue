<template>

  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img :src="image" class="img1" />
    </van-swipe-item>
  </van-swipe>

</template>

<script setup>
import { ref } from 'vue';
const images = ref([
  'https://unpkg.com/@vant/assets/apple-1.jpeg',
  'https://unpkg.com/@vant/assets/apple-2.jpeg',
])
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.img1 {
  width: 100vh;
  height: 150px;
}
</style>