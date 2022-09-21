<template>
  <div class="home">
    <div class="header">
      <div class="address_map" @click="ToAddress()">
        <i class="iconfont icon-dingwei"></i>
        <span>{{address}}</span>
      </div>
      <div class="shop_search">
        <i class="iconfont icon-sousuo"></i>
        搜索商家 商家名称
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
const address = ref(store.getters.address)
const city = ref(store.getters.location)
const ToAddress = () => {
  router.push({ name: 'address', params: { city: JSON.stringify(city.value)}})
}
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  .header {
    background-color: #009eef;
    padding: 16px;

    .address_map {
      color: #fff;
      font-weight: bold;

      i {
        margin: 0 3px;
        font-size: 18px;
      }

      span {
        display: inline-block;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .shop_search {
      margin-top: 10px;
      background-color: #fff;
      padding: 10px 0;
      border-radius: 4px;
      text-align: center;
      color: #aaa;
    }
  }

}
</style>