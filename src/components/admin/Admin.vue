<template>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class="bg-light border-end" :class="{ 'toggled': isToggled }" id="sidebar-wrapper">
      <div class="sidebar-heading text-center py-4"><a href="/admin">관리자 페이지</a></div>
      <div class="list-group list-group-flush">
        <router-link to="/admin/item" class="list-group-item list-group-item-action"><i class="bi bi-diagram-3-fill">제품 관리</i></router-link>
        <router-link to="/admin/manu" class="list-group-item list-group-item-action"><i class="bi bi-buildings-fill">제조사 관리</i></router-link>
        <router-link to="/admin/notice" class="list-group-item list-group-item-action"><i class="bi bi-pencil-square">공지 사항</i></router-link>
        <router-link to="/admin/calendar" class="list-group-item list-group-item-action"><i class="bi bi-calendar-day-fill">일정 관리</i></router-link>
        <router-link to="/admin/inquiry" class="list-group-item list-group-item-action"><i class="bi bi-calendar-day-fill">고객 문의</i></router-link>
        <a href="#" class="list-group-item list-group-item-action"><i class="bi bi-gear-fill"></i>설정</a>
        
      </div>
    </div>

    <!-- Page Content -->
    <div id="page-content-wrapper">
      <!-- Top Navbar -->
      <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div class="container-fluid">
          <button class="btn btn-primary" @click="toggleSidebar">Toggle Menu</button>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <!-- Dropdown -->
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                  Menu
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">내정보</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#">로그아웃</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- ✅ AdminHeader: "/admin"에서만 표시 -->
      <div class="header-content" v-if="showAdminHeader">
        <AdminHeader :BoardDataList="BoardDataList"/>
      </div>

      <!-- Main Content -->
      <div class="container-fluid mt-4">
        <router-view></router-view>
      </div>
      
    </div>
  </div>
</template>

<script>
import { handleAccessValidation } from '@/utils/auth.js';
import axios from '@/plugins/axios.js';
import AdminHeader from './AdminHeader.vue';

export default {
  name: 'Admin',

  data() {
    return {
      isToggled: false, // Sidebar toggle 상태
      showAdminHeader: false, // AdminHeader 표시 여부

      BoardDataList: [],
    };
  },

  created() {
    this.handleAccessValidation();
    this.updateAdminHeaderVisibility();
    this.fetchBoardListData();
  },

  components: {
    AdminHeader,
  },

  watch: {
    // ✅ 라우트 변경 감지하여 AdminHeader 표시 여부 결정
    $route() {
      this.updateAdminHeaderVisibility();
    },
  },

  methods: {
    async handleAccessValidation() {
      console.log('handleAccessValidation method 실행');
      await handleAccessValidation(axios, this.$router);
    },
    toggleSidebar() {
      this.isToggled = !this.isToggled;
    },

    // ✅ AdminHeader 표시 여부를 결정하는 함수
    updateAdminHeaderVisibility() {
      this.showAdminHeader = this.$route.path === "/admin";
    },

    async fetchBoardListData() {

      try {
        const response = await this.$axios.get('/admin/boards/simple');
        console.log('response board data', response.data);
        this.BoardDataList = response.data;
        console.log('this.BoardDataList', this.BoardDataList);
      } catch (error) {
        console.log('fetchBoardListData error', error);
      }
    },
  },
};
</script>
