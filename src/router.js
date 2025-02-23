import { createWebHistory, createRouter } from "vue-router";
import { handleAccessValidation } from "./utils/auth";
import About from "./components/common/About.vue";
import Admin from "./components/admin/Admin.vue";
import BoardDetail from "./components/common/BoardDetail.vue";
import CalendarManageMent from "./components/admin/calender/CalendarManageMent.vue";
import DetailManagement from "./components/admin/detail/DetailManagement.vue";
import ForbiddenPage from "./components/error/ForbiddenPage.vue";
import FAQ from "./components/common/FAQ.vue";
import Help from "./components/view/Help.vue";
import History from "./components/common/History.vue";
import ItemManagement from "./components/admin/item/ItemManagement.vue";
import ItemCreate from "./components/admin/item/ItemCreate.vue";
import ItemDetail from "./components/admin/item/ItemDetail.vue";
import ItemEdit from "./components/admin/item/ItemEdit.vue";
import ItemDelete from "./components/admin/item/ItemDelete.vue";
import InquiryManagement from "./components/admin/inquiry/InquiryManagement.vue";
import InquiryDetail from "./components/admin/inquiry/InquiryDetail.vue";
import Inquriy from "./components/common/Inquriy.vue";
import Location from "./components/common/Location.vue";
import Login from "./components/common/Login.vue";
import Main from "./components/view/Main.vue";
import Manufact from "./components/common/Manufact.vue";
import MyProfile from "./components/admin/info/MyProfile.vue";
import MyInfo from "./components/admin/info/MyInfo.vue";
import ManufactManagement from "./components/admin/manu/ManufactManagement.vue";
import Notice from "./components/common/Notice.vue";
import NoticeManagement from "./components/admin/notice/NoticeManagement.vue";
import NoticeDetail from "./components/admin/notice/NoticeDetail.vue";
import NoticeCreate from "./components/admin/notice/NoticeCreate.vue";
import NoticeEdit from "./components/admin/notice/NoticeEdit.vue";
import NotFoundPage from "./components/error/NotFoundPage.vue";
import Register from "./components/admin/users/Register.vue";
import ServerErrorPage from "./components/error/ServerErrorPage.vue";
import UserManagement from "./components/admin/users/UserManagement.vue";
import UnauthorizedPage from "./components/error/UnauthorizedPage.vue";
import UserDetail from "./components/admin/users/UserDetail.vue";

const routes = [

  // 0. main componets
  { path: '/', component: Main, props: true, },

  // 1. error page compontes
  { path: '/error/401', component:UnauthorizedPage },
  { path: '/error/403', component:ForbiddenPage },
  { path: '/error/404', component:NotFoundPage },
  { path: '/error/500', component:ServerErrorPage },
  
  // 2. admin componets & admin child
  { path: '/admin', component: Admin, props: true, meta: {requiresAuth: true},

    children: [
      { path: 'inquiry', name: 'InquiryManagement', component: InquiryManagement, props: true },
      { path: 'inquiry/:id', name: 'InquiryDetail', component: InquiryDetail, props: true },
      { path: 'user', name: 'UserManagement', component: UserManagement, props: true },
      { path: 'user/:id', name: 'UserDetail', component: UserDetail, props: true },
      { path: 'manu', name: 'ManufactManagement', component: ManufactManagement, props: true },
      { path: 'register', name: "Register", component: Register, props: true },
      { path: 'item', name: 'ItemManagement', component: ItemManagement, props: true },
      { path: 'item/:itemId', name: 'ItemDetail', component: ItemDetail, props: true },
      { path: 'item/edit/:itemId', name: 'ItemEdit', component: ItemEdit, props: true },
      { path: 'add', name: 'ItemCreate', component: ItemCreate, props: true },
      { path: 'delete', name: 'delete', component: ItemDelete, props: true },
      { path: 'notice', name: 'NoticeManagement', component: NoticeManagement, props: true },
      { path: 'notice/:id', name: 'NoticeDetail', component: NoticeDetail, props: true },
      { path: 'notice/add', name: 'NoticeCreate', component: NoticeCreate, props: true },
      { path: 'notice/edit/:id', name: 'NoticeEdit', component: NoticeEdit, props: true },
      { path: 'calendar', name: 'CalendarManageMent', component: CalendarManageMent, props: true },
      { path: 'myinfo', name: 'MyInfo', component: MyInfo, props: true},
      { path: 'profile', name: 'MyProfile', component: MyProfile, props: true},
      { path: 'detail', name: 'DetailManagement', component: DetailManagement, props: true},
    ]
  },

  // 3. common components
  { path: '/about', component: About },
  { path: '/location', component: Location },
  { path: '/history', component: History },
  { path: '/faq', component: FAQ },
  { path: '/manu/:id', name: 'Manufact', component: Manufact, props: true },
  { path: '/inquiry', component: Inquriy },
  { path: '/notice', component: Notice },
  { path: '/notice/:id', component: BoardDetail, props: true },
  { path: '/fag', component: FAQ },
  { path: '/login', component: Login },
  { path: '/help', component: Help},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 4. router guard
router.beforeEach(async (to, from, next) => {
  if (to.path.startsWith('/admin')) { // /admin 경로에서만 실행
      try {
          await handleAccessValidation(router);
          next();
      } catch (error) {
          console.error("token auth error :", error);
          next("/login"); 
      }
  } else {
      next();
  }
});

export default router;