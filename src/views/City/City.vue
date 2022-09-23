<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input v-model="city_val" type="text" placeholder="输入城市名">
      </div>
      <button @click="$router.go(-1)">取消</button>
    </div>
    <div style="height:100vh">
      <div class="location">
        <Location :address="city"></Location>
      </div>
      <Alphabet @selectCity="selectCity" ref="allcity" :cityInfo="cityInfo" :Keys="Keys"></Alphabet>
    </div>
  </div>
</template>

<script setup>
import Location from '../../components/Location.vue'
import Alphabet from '../../components/Alphabet.vue';
import { ref, onMounted, getCurrentInstance, nextTick } from 'vue';
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
//得到城市列表信息
const getCityInfo = async (res) => {
  cityInfo.value = await proxy.$api.getCityInfo(res);
  Keys.value = Object.keys(cityInfo.value)
  Keys.value.pop()
  Keys.value.sort()
  // nextTick延迟执行代码，立即得到更新后的列表
  nextTick(() => {
    // console.log(proxy.$refs.allcity);
    proxy.$refs.allcity.initScroll()
  })
}
//点击城市跳转回address页
const selectCity = (city) => {
  //跳转到
  store.commit('addCity', city.name)
  router.go(-1)
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
