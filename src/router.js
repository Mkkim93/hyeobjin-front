import { createWebHistory, createRouter } from "vue-router";
import About from "./components/About.vue";
import Location from "./components/Location.vue";
import History from "./components/History.vue";
import Main from "./components/Main.vue";
import BeforeAfter from "./components/BeforeAfter.vue";
import Estimate from "./components/Estimate.vue";
import Support from "./components/Support.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import Admin from "./components/admin/Admin.vue";
import ASForm from "./components/ASForm.vue";
import Notice from "./components/Notice.vue";
import Manufact from "./components/Manufact.vue";


const routes = [
  {path: '/', component: Main},

    {path: '/about', component: About},
    {path: '/location', component: Location},
    {path: '/history', component: History},

    {
      path: '/manu/:id',
      component: Manufact,
      name: 'manu-detail',
      children: [
        {
          path: "1",
          redirect: {name: 'manu-detail', params: {id: ':id', type: '1'}}
        },
        {
          path: "2",
          redirect: {name: 'manu-detail', params: {id: ':id', type: '2'}}
        },
        {
          path: "3",
          redirect: {name: 'manu-detail', params: {id: ':id', type: '3'}}
        }
          
      ]
    },
   
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