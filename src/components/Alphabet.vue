<template>
  <div class="area" v-if="cityInfo" ref="area_scroll">
    <div class="scroll_wrap">
      <!-- 热门城市 -->
      <div class="hot_wrap citylist">
        <div class="title">
          热门城市
        </div>
        <ul class="hot_city">
          <li @click="$emit('selectCity',item)" v-for="(item,index) in props.cityInfo.hotCities" :key="index">
            {{item.name}}</li>
        </ul>
      </div>
      <!-- 所有城市 -->
      <div class="city_wrap">
        <!-- 循环按字母排序的key -->
        <div class="city_content citylist" v-for="(item,index) in props.Keys" :key="index">
          <div class="title">{{item}}</div>
          <!-- 根据字母Keys展示城市名 -->
          <ul>
            <li @click="$emit('selectCity',city)" v-for="(city,index) in props.cityInfo[item]" :key="index">
              {{city.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="area_keys">
      <ul>
        <li @click="selectKey(0)">#</li>
        <li @click="selectKey(index+1)" v-for="(item,index) in props.Keys" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import BScroll from 'better-scroll';
import { getCurrentInstance, ref, defineExpose, onMounted } from 'vue';
const { proxy } = getCurrentInstance()
const props = defineProps({
  cityInfo: Object,
  Keys: Array
})
const scroll = ref(null)
//滚动功能,哪个区域滚动就在哪个区域加一个ref，这里是area_scroll
const initScroll = () => {
  scroll.value = new BScroll(proxy.$refs.area_scroll, {
    click: true,
  })
}
// 点击功能，点击右侧跳转对应字母位置
const selectKey = (index) => {
  const citylist = proxy.$refs.area_scroll.getElementsByClassName("citylist")
  //根据下标滚到相对应元素上
  let el = citylist[index]
  scroll.value.scrollToElement(el, 250)
}

defineExpose({
  initScroll
})
</script>

<style scoped>
.area {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 0 16px;
  background: #fff;
  height: calc(100% - 65px);
  overflow: hidden;
}

.scroll_wrap {
  background: #fff;
  overflow: auto;
}

.title {
  color: #aaa;
  padding: 15px 0;
}

.hot_city {
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.hot_city li {
  width: 30%;
  background: #f1f1f1;
  margin: 0 10px 10px 0;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}

.city_content li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.area_keys {
  position: fixed;
  right: 0;
  top: 25%;
  color: #aaa;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  padding: 0 5px;
}
</style>