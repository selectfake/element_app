<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { getCurrentInstance, reactive } from 'vue';
import { useStore } from 'vuex';

const instance = getCurrentInstance()
const store = useStore()
const getLocation = () => {
  AMap.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
      // 是否使用高精度定位，默认：true
      enableHighAccuracy: true,
      // 设置定位超时时间，默认：无穷大
      timeout: 10000,
    })
    geolocation.getCurrentPosition(function (status, result) {
      if (status == 'complete') {
        onComplete(result)

      } else {
        onError(result)
      }
    });

    function onComplete(data) {
      const { lat, lng } = data.position
      getLngLatLocation(lng,lat)
      // store.dispatch("setLocation", data);
      // store.dispatch("setAddress", data.formattedAddress);
    }
    function onError(data) {
      // 定位出错
      // getLngLatLocation();
      alert("定位出错")
    }
  })
}
  const getLngLatLocation = (lng, lat)=> {
    AMap.plugin("AMap.Geocoder", function () {
      var geocoder = new AMap.Geocoder({
        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        city: "010",
      });
      const lnglat = [lng, lat];
      geocoder.getAddress(lnglat, function (status, result) {
        if (status === "complete" && result.info === "OK") {
          // 存储到vuex中
          store.dispatch("setLocation", result.regeocode);
          store.dispatch(
            "setAddress",
            result.regeocode.formattedAddress
          );
        }
      });
    });
  }
  getLocation()
</script>

<style scoped lang="less">
#app {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #f1f1f1;
}
</style>
