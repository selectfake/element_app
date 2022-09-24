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
    <div id="container">
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in imgData.swipeImgs" :key="index"><img :src="item" alt=""></van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template> 

<script setup>
import { useStore } from 'vuex';
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance()
const store = useStore()
const router = useRouter()
const address = ref(store.state.address)
const city = ref(store.getters.location)
const imgData = ref([])
const ToAddress = () => {
  router.push('/address')
  store.commit('addCity', city.value.addressComponent.city)
} 
const getImgData = async () => {
  // console.log(await proxy.$api.getImgData());
  imgData.value = await proxy.$api.getImgData()
  console.log(imgData.value.swipeImgs);
}
onMounted(() => {
  getImgData()
})
</script>
<style  lang="less" scoped>
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

  #container {
    .my-swipe {
      .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
        height: 100px;

        img {
          width: 100%;
          height: 100px;
        }
      }
    }
  }
}
</style>