import { createApp } from 'vue'
import App from './App.vue'
import RouterName from './router.js';
import store from './store.js'
import axios from "./plugins/axios";
import VCalender from 'v-calendar';
import '@/assets/css/styles.css';
import '@/assets/css/editor.css';
import mitt from 'mitt';


// 1) Bootstrap CSS import
import 'bootstrap/dist/css/bootstrap.min.css';
// 2) (선택) Bootstrap Icons import
import 'bootstrap-icons/font/bootstrap-icons.css';

// 3) Bootstrap JS import (팝오버, 드롭다운 등 JS 필요 시)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);
let emitter = mitt();
// axios 
axios.defaults.baseURL = 'http://localhost:8080';
app.config.globalProperties.$axios = axios;
app.config.globalProperties.emitter = emitter;
app.use(VCalender, {})

// vuex 
app.use(store)
// router
// router 설정은 axios 다음으로 해줘야함
app.use(RouterName)
app.mount('#app')
