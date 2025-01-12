import { createWebHistory, createRouter } from "vue-router";
import About from "./components/About.vue";
import Location from "./components/Location.vue";
import History from "./components/History.vue";
import Main from "./components/Main.vue";
import Kcc from "./components/Kcc.vue";
import Hugre from "./components/Hugre.vue";
import Yerim from "./components/Yerim.vue";
import BeforeAfter from "./components/BeforeAfter.vue";
import Estimate from "./components/Estimate.vue";
import Support from "./components/Support.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import Admin from "./components/Admin.vue";
import ASForm from "./components/ASForm.vue";
import Notice from "./components/Notice.vue";

const routes = [
  {path: '/', component: Main},

    {path: '/about', component: About},
    {path: '/location', component: Location},
    {path: '/history', component: History},

    {path: '/kcc', component: Kcc},
    {path: '/hugre', component: Hugre},
    {path: '/yerim', component: Yerim},

    {path: '/before-after', component: BeforeAfter},

    {path: '/support', component: Support},
    {path: '/estimate', component: Estimate},
    {path: '/asform', component: ASForm},
    {path: '/notice', component: Notice},

    {path: '/register', component: Register},
    {path: '/login', component: Login},

    {path: '/admin', component: Admin},
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;