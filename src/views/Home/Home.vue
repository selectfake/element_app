<template>
  <div class="home">
    <div class="header">
      <div class="address_map" @click="ToAddress">
        <i class="iconfont icon-dingwei"></i>
        <span>{{address}}</span>
      </div>
    </div>
    <div class="search_wrap">
      <div class="shop_search">
        <i class="iconfont icon-sousuo"></i>
        搜索商家 商家名称
      </div>
    </div>
    <div id="container" style="height:2000px"></div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
const address = ref(store.state.address)
const city = ref(store.getters.location)

const ToAddress = () => {
  router.push('/address')
  store.commit('addCity', city.value.addressComponent.city)
}
</script>
<style  lang="less">
.home {
  width: 100%;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;

  .header {
    background-color: #009eef;
    padding: 10px 16px;

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
  }

  .search_wrap {
    background-color: #009eef;
    padding: 10px 16px;
    position: sticky;
    top: 0px;
    z-index: 999;
    box-sizing: border-box;

    .shop_search {
      background-color: #fff;
      padding: 10px 0;
      border-radius: 4px;
      text-align: center;
      color: #aaa;
    }
  }
}
</style>