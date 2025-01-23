import { createApp } from 'vue'
import App from './App.vue'
import RouterName from './router.js';
import axios from "./plugins/axios";
import "./assets/styles/base.css"; 
import "./assets/styles/tailwind.css";

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Bootstrap JS Bundle (includes Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const app = createApp(App);

// router 설정은 항상 axios 이후에 해줘야함

// axios 
axios.defaults.baseURL = 'http://localhost:8080';
app.config.globalProperties.$axios = axios;

// router
app.use(RouterName).mount('#app')
