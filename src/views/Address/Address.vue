<template>
  <div class="address">
    <Header :isLeft="true" title="选择收货地址" />
    <div class="city-search">
      <div class="search">
        <span class="city" @click="$router.push('/city')">
          {{city.addressComponent.city}}
          <i class="iconfont icon-xiala"></i>
        </span>
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model="search_val" placeholder="小区/写字楼/学校等">
      </div>
      <Location :address="city.formattedAddress"></Location>
    </div>
    <div class="area">
      <ul class="area_list" v-for="(item,index) in arrayList" :key="index">
        <li @click="selectAddress(item)">
          <h4>{{item.name}}</h4>
          <p>{{item.district}}{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Header from '../../components/Header.vue';
import Location from '../../components/Location.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import store from '@/store';
import router from '@/router';
const route = useRoute()
let city = ref(JSON.parse(route.params.city))
let search_val = ref("")
let arrayList = ref([])

watch(search_val, (newValue, oldValue) => {
  searchPlace()
})
const searchPlace = () => {
  AMap.plugin('AMap.AutoComplete', function () {
    var autoOptions = {
      //city 限定城市，默认全国
      city: city.value.addressComponent.city
    };
    // 实例化AutoComplete
    var autoComplete = new AMap.AutoComplete(autoOptions);
    // 根据关键字进行搜索
    autoComplete.search(search_val.value, function (status, result) {
      // 搜索成功时，result即是对应的匹配数据
      // console.log(result);
      arrayList.value = result.tips
    })
  })
}
const selectAddress = (item) => {
  // 设置地址
  store.dispatch("setAddress",item.district+item.address+item.name);
  //跳转home
  router.push('/home')
}

</script>

<style lang="less" scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.city-search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}

.search .city {
  padding: 0 10px;
}

.city i {
  margin-right: 10px;
}

.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}

.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}

.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>