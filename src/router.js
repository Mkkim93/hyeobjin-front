import { createWebHistory, createRouter } from "vue-router";
import About from "./components/common/About.vue";
import Location from "./components/common/Location.vue";
import History from "./components/common/History.vue";
import Main from "./components/view/Main.vue";
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
import CalendarManageMent from "./components/admin/calender/CalendarManageMent.vue";
import FAQ from "./components/common/FAQ.vue";
import InquiryManagement from "./components/admin/inquiry/InquiryManagement.vue";
import InquiryDetail from "./components/admin/inquiry/InquiryDetail.vue";
import ForbiddenPage from "./components/error/ForbiddenPage.vue";
import NotFoundPage from "./components/error/NotFoundPage.vue";
import ServerErrorPage from "./components/error/ServerErrorPage.vue";
import UnauthorizedPage from "./components/error/UnauthorizedPage.vue";

const routes = [
  { path: '/', component: Main, props: true, },

  { path: '/error/401', component:UnauthorizedPage },
  { path: '/error/403', component:ForbiddenPage },
  { path: '/error/404', component:NotFoundPage },
  { path: '/error/500', component:ServerErrorPage },
  
  {
    path: '/admin',
    component: Admin,
    props: true,

    children: [

      {
        path: 'inquiry',
        name: 'InquiryManagement',
        component: InquiryManagement,
        props: true,
      },

      {
        path:'inquiry/:id',
        name: 'InquiryDetail',
        component: InquiryDetail,
        props: true,
      },

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
        path: 'item/:itemId',
        name: 'ItemDetail',
        component: ItemDetail,
        props: true,
      },

      {
        path: 'item/edit/:itemId',
        name: 'ItemEdit',
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
        path: 'delete',
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

      {
        path: 'calendar',
        name: 'CalendarManageMent',
        component: CalendarManageMent,
        props: true,
      }
    ]
  },

  // common components
  { path: '/about', component: About },
  { path: '/location', component: Location },
  { path: '/history', component: History },
  { path: '/faq', component: FAQ },


  {
    path: '/manu/:id',
    name: 'Manufact',
    component: Manufact,
    props: true,
  },

  { path: '/asform', component: ASForm },

  {
    path: '/notice',
    component: Notice,
  },

  {
    path: '/notice/:id',
    component: BoardDetail,
    props: true,
  },

  {
    path: '/fag',
    component: FAQ,
  },


  // {
  //   path: '/fag/:id',
  //   component: fagDetail,
  //   props: true,
  // },

  { path: '/login', component: Login },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;