import { createApp } from 'vue'
import App from './App.vue'
import RouterName from './router.js';
import axios from "./plugins/axios";

const app = createApp(App);

// router
app.use(RouterName).mount('#app')

// axios 
axios.defaults.baseURL = 'http://localhost:8080';
app.config.globalProperties.$axios = axios;
