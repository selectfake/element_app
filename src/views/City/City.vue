<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input v-model="city_val" type="text" placeholder="输入城市名">
      </div>
      <button @click="$router.go(-1)">取消</button>
    </div>
    <div style="height:100vh" v-if="searchList.length===0">
      <div class="location">
        <Location :address="city"></Location>
      </div>
      <Alphabet @selectCity="selectCity" ref="allcity" :cityInfo="cityInfo" :Keys="Keys"></Alphabet>
    </div>
    <div class="search_list" v-else>
      <ul>
        <li v-for="(item,index) in searchList" :key="index" @click="selectCity(item)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Location from '../../components/Location.vue'
import Alphabet from '../../components/Alphabet.vue';
import { ref, onMounted, getCurrentInstance, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore()
const router = useRouter()
const { proxy } = getCurrentInstance()
let city = ref(store.getters.address)
let cityInfo = ref({})
let Keys = ref([])
let city_val = ref('')
const allcity = ref()
const allCities = ref([])
const searchList = ref([])
watch(city_val, (newValue, oldValue) => {
  searchCity();
})
//得到城市列表信息
const getCityInfo = async (res) => {
  cityInfo.value = await proxy.$api.getCityInfo(res);
  Keys.value = Object.keys(cityInfo.value)
  Keys.value.pop()
  Keys.value.sort()
  // nextTick延迟执行代码，立即得到更新后的列表
  nextTick(() => {
    proxy.$refs.allcity.initScroll()
  })
  //存储所有城市，用来搜索过滤
  Keys.value.forEach(Key => {
    cityInfo.value[[Key]].forEach(city => {
      allCities.value.push(city)
    })
  })
}
//点击城市跳转回address页
const selectCity = (city) => {
  //跳转到
  store.commit('addCity', city.name)
  router.go(-1)
}
const searchCity = () => {
  //搜索框为空数组置空
  if (!city_val.value) {
    searchList.value = []
  } else {
    // 对输入内容过滤出包含输入内容的数据
    searchList.value = allCities.value.filter(item => {
      return item.name.indexOf(city_val.value) != -1
    })
  }

}

onMounted(() => {
  getCityInfo();
});
</script> 

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}

.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}

.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}

.search_wrap button {
  outline: none;
  color: #009eef;
  background-color: #fff;
  border-style: none;
}

.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}

.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
