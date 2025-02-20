import { createApp } from 'vue'
import App from './App.vue'
import RouterName from './router.js';
import store from './store.js'
import axios from "./plugins/axios";
import VCalender from 'v-calendar';
import mitt from 'mitt';

// 1) bootstrap 5 css
import '@/assets/css/styles.css';

// 2) Bootstrap CSS import
import 'bootstrap/dist/css/bootstrap.min.css';

// 3) Bootstrap Icons import
import 'bootstrap-icons/font/bootstrap-icons.css';

// 4) Bootstrap JS import (팝오버, 드롭다운 등 JS 필요 시)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 5) kcc font
import '@/assets/css/font.css';

const app = createApp(App);
let emitter = mitt();

// axios 
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

// global axios
app.config.globalProperties.$axios = axios;

// global mitt
app.config.globalProperties.emitter = emitter;

// global store
app.config.globalProperties.store = store;

// v-calendar
app.use(VCalender, {})

// vuex 
app.use(store)

// router
app.use(RouterName)
app.mount('#app')
