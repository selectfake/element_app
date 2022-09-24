import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/iconfont/iconfont.css';
import './assets/less/index.less';
import store from './store'
import api from './api/api';
import vant from 'vant';
import 'vant/lib/index.css';
const app = createApp(App)
app.config.globalProperties.$api = api
app.use(router)
app.use(store)
app.use(vant)
app.mount('#app')

