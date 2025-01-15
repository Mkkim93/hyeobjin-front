import { createApp } from 'vue'
import App from './App.vue'
import RouterName from './router.js';
import axios from "./plugins/axios";
import "./assets/base.css"; // Tailwind CSS 적용

const app = createApp(App);

// router 설정은 항상 axios 이후에 해줘야함

// axios 
axios.defaults.baseURL = 'http://localhost:8080';
app.config.globalProperties.$axios = axios;

// router
app.use(RouterName).mount('#app')
