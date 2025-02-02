import { createWebHistory, createRouter } from "vue-router";
import About from "./components/common/About.vue";
import Location from "./components/common/Location.vue";
import History from "./components/common/History.vue";
import Main from "./components/view/Main.vue";
import BeforeAfter from "./components/common/BeforeAfter.vue";
import Support from "./components/common/Support.vue";
import Register from "./components/admin/users/Register.vue";
import Login from "./components/common/Login.vue";
import Admin from "./components/admin/Admin.vue";
import ASForm from "./components/common/ASForm.vue";
import Notice from "./components/common/Notice.vue";
import Manufact from "./components/common/Manufact.vue";
import BoardDetail from "./components/common/BoardDetail.vue";
import ItemManagement from "./components/admin/item/ItemManagement.vue";
import NoticeManagement from "./components/admin/notice/NoticeManagement.vue";
import UserManagement from "./components/admin/users/UserManagement.vue";
import ManufactManagement from "./components/admin/manu/ManufactManagement.vue";
import ItemCreate from "./components/admin/item/ItemCreate.vue";
import ItemDetail from "./components/admin/item/ItemDetail.vue";
import ItemEdit from "./components/admin/item/ItemEdit.vue";
import ItemDelete from "./components/admin/item/ItemDelete.vue";
import NoticeDetail from "./components/admin/notice/NoticeDetail.vue";
import NoticeCreate from "./components/admin/notice/NoticeCreate.vue";
import NoticeEdit from "./components/admin/notice/NoticeEdit.vue";


const routes = [
  {path: '/', component: Main},

  {
    path: '/admin', 
    component: Admin,
    props: true,
    
    children: [
      {
        path: 'user',
        name: 'UserManagement',
        component: UserManagement,
        props: true,
         

      },

      {
        path: 'manu',
        name: 'ManufactManagement',
        component: ManufactManagement,
        props: true,
      },

      { 
        path: 'register',
        name: "Register",
        component: Register,
        props: true,
      },

      {
        path: 'item', 
        name: 'ItemManagement',
        component: ItemManagement,
        props: true, 
        
      },

      {
        path: '/item/:itemId/:manuId',
        name: 'ItemDetail',
        component: ItemDetail,
        props: true,
      },

      {
        path: '/item/edit/:itemId',
        name: 'edit',
        component: ItemEdit,
        props: true,
        },

      {  
            path: 'add',
            name: 'ItemCreate',
            component: ItemCreate,
            props: true,
      },

      {
        path: '/admin/delete',
        name: 'delete',
        component: ItemDelete,
        props: true,
      },
      
      {
        path: 'notice', 
        name: 'NoticeManagement',
        component: NoticeManagement,
        props: true, 
      }, 

      {
        path: 'notice/:id',
        name: 'NoticeDetail',
        component: NoticeDetail,
        props: true,
      },
      
      {
        path: 'notice/add',
        name: 'NoticeCreate',
        component: NoticeCreate,
        props: true,
      },

      {
        path: 'notice/edit/:id',
        name: 'NoticeEdit',
        component: NoticeEdit,
        props: true,
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

    {path: '/login', component: Login},
    
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;