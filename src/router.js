import { createWebHistory, createRouter } from "vue-router";
import About from "./components/common/About.vue";
import Location from "./components/common/Location.vue";
import History from "./components/common/History.vue";
import Main from "./components/view/Main.vue";
import BeforeAfter from "./components/common/BeforeAfter.vue";
import Support from "./components/common/Support.vue";
import Register from "./components/common/Register.vue";
import Login from "./components/common/Login.vue";
import Admin from "./components/admin/Admin.vue";
import ASForm from "./components/common/ASForm.vue";
import Notice from "./components/common/Notice.vue";
import Manufact from "./components/common/Manufact.vue";
import BoardDetail from "./components/common/BoardDetail.vue";
import ItemManagement from "./components/admin/ItemManagement.vue";
import NoticeManagement from "./components/admin/NoticeManagement.vue";
import UserManagement from "./components/admin/UserManagement.vue";


const routes = [
  {path: '/', component: Main},

  
  {
    path: '/admin', 
    component: Admin,  // 기본적으로 Admin 컴포넌트를 렌더링
  },
  
  {
    path: '/admin/:id', 
    component: Admin,
    children: [
      {
        path: 'user', component: UserManagement,
      },

      {
        path: 'item', component: ItemManagement,
      },
      
      {
        path: 'notice', component: NoticeManagement,
      }, 
    ]
    
  },


  // common components
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
    {path: '/asform', component: ASForm},

    {
      path: '/notice', 
      component: Notice,
    },
    
    {
      path: '/notice/:id',
      component: BoardDetail,
      props: true,
    },

    {path: '/register', component: Register},
    {path: '/login', component: Login},

    
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;