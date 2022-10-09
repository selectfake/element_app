<template>
  <div :class="{'open':isSort || isScreen}" @click.self="hideView">
    <!-- 导航 -->
    <div v-if="filterData" class="filter_wrap">
      <aside class="filter">
        <div class="filter-nav" v-for="(item,index) in filterData.navTab" :key="index"
          :class="{'filter-bold':currentFilter == index}" @click="filterSort(index)">
          <span>{{item.name}}</span>
        </div>
      </aside>
    </div>
    <!-- 排序 -->
    <section class="filter-extend" v-if="isSort">
      <ul>
        <li v-for="(item,index) in filterData.sortBy" :key="index" @click="selectSort(item,index)">
          <span :class="{'selectName':currentSort==index}">{{item.name}}</span>
          <i v-show="currentSort == index" class="iconfont icon-icon"></i>
        </li>
      </ul>
    </section>
    <!-- 筛选 -->
    <section class="filter-extend" v-if="isScreen">
      <div class="filter-sort">
        <div v-for="(screen,index) in filterData.screenBy" :key="index" class="morefilter">
          <p class="title">{{screen.title}}</p>
          <ul>
            <li v-for="(item,i) in screen.data" :key="i" :class="{'selected':item.select}"
              @click="selectScreen(item,screen)">
              <img :src="item.icon" alt="" v-if="item.icon">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="morefilter-btn">
        <span class="morefilter-clear" :class="{'edit':edit}" @click="clearFilter">清空</span>
        <span class="morefilter-ok" @click="filterOk">确定</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
  filterData: Object
})
let emit = defineEmits();
const currentFilter = ref(0)
const currentSort = ref(0)
const isSort = ref(false)
// 筛选
const isScreen = ref(false)
const filterSort = (index) => {
  currentFilter.value = index
  if (index == 0) {
    isSort.value = true
    emit("searchFixed", true)
    isScreen.value = false
  } else if (index == 1) {
    emit("update", { condation: props.filterData.navTab[1].condition })
    hideView()
  } else if (index == 2) {
    emit("update", { condation: props.filterData.navTab[2].condition })
    hideView()
  } else if (index == 3) {
    isScreen.value = true
    isSort.value = false
    emit('searchFixed', true)
  }
  else {
    hideView()
  }
}
const hideView = () => {
  isSort.value = false
  isScreen.value = false
  emit("searchFixed", false)
}
const selectSort = (item, index) => {
  currentSort.value = index
  props.filterData.navTab[0].name = props.filterData.sortBy[index].name
  hideView()
  // 更新数据
  emit("update", { condation: item.code })
}
const selectScreen = (item, screen) => {
  if (screen.id !== "MPI") {
    //单选
    screen.data.forEach(ele => {
      ele.select = false
    })
  }
  item.select = !item.select
}
const edit = computed(() => {
  let edit = ref(false)
  props.filterData.screenBy.forEach(screen => {
    screen.data.forEach(item => {
      if (item.select) {
        edit.value = true
      }
    })
  })
  return edit.value;
})
const clearFilter = () => {
  props.filterData.screenBy.forEach(screen => {
    screen.data.forEach(item => {
      item.select = false;
    })
  })
}
const filterOk = () => {
  let screenData = ref({
    MPI: '',
    offer: '',
    per: ''
  })
  let mpiStr = ''
  props.filterData.screenBy.forEach(screen => {
    screen.data.forEach((item, index) => {
      if (item.select) {
        if (screen.id !== "MPI") {
          //单选
          screenData.value[screen.id] = item.code
        } else {
          // 多选
          mpiStr += item.code + ','
          screenData.value[screen.id] = mpiStr
        }
      }
    })
  })
  emit("update", { condation: screenData.value })
  hideView()
}
</script>

<style>
.filter_wrap {
  background: #fff;
  position: sticky;
  top: 54px;
  z-index: 10;
}

.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}

.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
}

.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  will-change: transform;
}

.filter-bold {
  font-weight: 600;
  color: #333;
}

.open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}

.filter-extend {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  top: 24.533333vw;
}

.filter-extend li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
  overflow: hidden;
}

.icon-icon {
  float: right;
  color: #009eef;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

.selectName {
  color: #009eef;
}

/* 筛选 */
.filter-sort {
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
}

.morefilter {
  margin: 2.666667vw 0;
  overflow: hidden;
}

.morefilter .title {
  margin-bottom: 2vw;
  color: #666;
  font-size: 0.5rem;
}

.morefilter ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0.8rem;
}

.morefilter li {
  box-sizing: border-box;
  width: 30%;
  height: 9.333333vw;
  line-height: 9.333333vw;
  margin: 0.8vw 1%;
  background: #fafafa;
}

.morefilter li img {
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: middle;
  margin-right: 0.8vw;
}

.morefilter li span {
  margin-left: 2%;
  vertical-align: middle;
}

.morefilter-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
  line-height: 11.466667vw;
  box-sizing: border-box;
}

.morefilter-btn span {
  font-size: 0.826667rem;
  text-align: center;
  text-decoration: none;
  flex: 1;
}

.morefilter-clear {
  color: #ddd;
  background: #fff;
}

.morefilter-ok {
  color: #fff;
  background: #00d762;
  border: 0.133333vw solid #00d762;
}

.selected {
  color: #3190e8 !important;
  background-color: #edf5ff !important;
}

.edit {
  color: #333 !important;
}
</style>