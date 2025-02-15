import { createApp } from 'vue'
import App from './App.vue'
import RouterName from './router.js';
import store from './store.js'
import axios from "./plugins/axios";
import VCalender from 'v-calendar';
import mitt from 'mitt';

// bootstrap 5 css
import '@/assets/css/styles.css';

// ckeditor css
import '@/assets/css/editor.css';

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
axios.defaults.withCredentials = true;
app.config.globalProperties.$axios = axios;

// mitt
app.config.globalProperties.emitter = emitter;

// v-calendar
app.use(VCalender, {})

// vuex 
app.use(store)

// router
app.use(RouterName)
app.mount('#app')
