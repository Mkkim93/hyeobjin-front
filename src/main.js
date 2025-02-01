import { createApp } from 'vue'
import App from './App.vue'
import RouterName from './router.js';
import axios from "./plugins/axios";
import store from './store.js'

import "./assets/styles/tailwind.css";

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Bootstrap JS Bundle (includes Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import Summernote CSS
import 'summernote/dist/summernote-bs4.css';

// Import summernote JS Bundle
import 'summernote/dist/summernote-bs4.min.js';

// Import jQuery (Summernote 의존성)
import $ from 'jquery';
window.$ = $; // Summernote가 jQuery를 글로벌 `$` 객체로 필요로 함

const app = createApp(App);

// axios 
// axios.defaults.baseURL = 'http://localhost:8080';
app.config.globalProperties.$axios = axios;

// vuex 
app.use(store)

// router
// router 설정은 axios 다음으로 해줘야함
app.use(RouterName)


app.mount('#app')
