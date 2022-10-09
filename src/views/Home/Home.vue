<template>
  <div class="home">
    <div class="header">
      <div class="address_map" @click="ToAddress">
        <i class="iconfont icon-dingwei"></i>
        <span>{{address}}</span>
      </div>
    </div>
    <div class="search_wrap" :class="{'fixedview':isShow}">
      <div class="shop_search">
        <i class="iconfont icon-sousuo"></i>
        搜索商家 商家名称
      </div>
    </div>
    <div id="container">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in imgData.swipeImgs" :key="index"><img :src="item" alt=""></van-swipe-item>
      </van-swipe>
      <!-- 分类 -->
      <van-swipe class="entries" :autoplay="0" indicator-color="white">
        <van-swipe-item v-for="(entry,i) in imgData.entries" :key="i" class="entry_wrap">
          <div class="foodentry" v-for="(item,index) in entry" :key="index">
            <div class="img_wrap"><img :src="item.image" alt=""></div>
            <span>{{item.name}}</span>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 推荐商家 -->
    <div class="shoplist-title">
      推荐商家
    </div>
    <!-- 筛选 -->
    <filter-view :filterData="filterData" @searchFixed="showFilterView" @update="update"></filter-view>
    <!-- 商家信息 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="shoplist">
          <index-shop v-for="(item,index) in restaurants" :key="index" :restaurant="item.restaurant"></index-shop>
        </div>
      </van-list>
    </van-pull-refresh>


  </div>
</template> 

<script setup>
import { useStore } from 'vuex';
import { getCurrentInstance, onMounted, ref } from 'vue';
import { Toast, List } from 'vant';
import { useRouter } from 'vue-router';
import FilterView from '../../components/FilterView.vue';
import IndexShop from '../../components/IndexShop.vue';
const { proxy } = getCurrentInstance()
const store = useStore()
const router = useRouter()
const address = ref(store.state.address)
const city = ref(store.getters.location)
const imgData = ref([])
const filterData = ref(null)
const isShow = ref(false)
const restaurants = ref([])
const page = ref(1)
const size = ref(100)
const count = ref(0);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const list = ref([]);
const ToAddress = () => {
  router.push('/address')
  store.commit('addCity', city.value.addressComponent.city)
}
const getImgData = async () => {
  imgData.value = await proxy.$api.getImgData()
}
const getFilter = async () => {
  filterData.value = await proxy.$api.getFilter()
}
const showFilterView = (boolean) => {
  isShow.value = boolean
}
const update = (condation) => {
  console.log(condation);
}
// 拉取商家信息
const getRestaurants = async () => {
  restaurants.value = await proxy.$api.getRestaurants([page.value, size.value])
  console.log(restaurants.value);
  // onLoad()
}
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
const onLoad = () => {
  
};
// restaurants.value = await proxy.$api.getRestaurants([page.value, size.value])
onMounted(() => {
  getImgData()
  getFilter()
  getRestaurants()
  onLoad()
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

    .entries {
      background: #fff;
      height: 43vw;
      text-align: center;
      overflow: hidden;

      .foodentry {
        width: 20%;
        float: left;
        position: relative;
        margin-top: 2.93333vw;

        span {
          display: block;
          color: #666;
          font-size: 0.32rem;
        }

        .img_wrap {
          position: relative;
          display: inline-block;
          width: 12vw;
          height: 12vw;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .shoplist-title {
    display: flex;
    align-items: flex;
    justify-content: center;
    height: 9.6vw;
    line-height: 9.6vw;
    font-size: 16px;
    color: #333;
    background: #fff;

    &:after,
    &:before {
      display: block;
      content: "-";
      width: 5.333333vw;
      height: 0.266667vw;
      color: #999;
      margin: 0 3.466667vw;
    }
  }

  .fixedview {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 999;
  }

  .shoplist {
    margin-bottom: 10px;
  }
}
</style>