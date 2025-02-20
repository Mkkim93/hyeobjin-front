<template>
  <div class="d-flex" id="wrapper">

    <div class="bg-light border-end" :class="{ 'toggled': isToggled }" id="sidebar-wrapper">
      <div class="sidebar-heading text-center py-4"><a href="/admin">관리자 홈</a></div>
      <div class="list-group list-group-flush">
        
            <router-link to="/admin/item" class="list-group-item list-group-item-action">
              <i class="bi bi-diagram-3-fill">제품 관리</i></router-link>
        
            <router-link to="/admin/manu" class="list-group-item list-group-item-action">
              <i class="bi bi-buildings-fill">제조사 관리</i></router-link>
        
            <router-link to="/admin/notice" class="list-group-item list-group-item-action">
              <i class="bi bi-pencil-square">공지 사항</i></router-link>
        
            <router-link to="/admin/calendar" class="list-group-item list-group-item-action"><i
            class="bi bi-calendar-day-fill">일정 관리</i></router-link>
        
            <router-link to="/admin/inquiry" class="list-group-item list-group-item-action"><i
            class="bi bi-calendar-day-fill">고객 문의</i></router-link>
        
            <router-link to="/admin/user" class="list-group-item list-group-item-action">
          <i class="fa-solid fa-users-gear">관리자 목록</i></router-link>

        <a href="#" class="list-group-item list-group-item-action"><i class="bi bi-gear-fill"></i>설정</a>
      </div>
    </div>

    <div id="page-content-wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div class="container-fluid">
          <button class="btn btn-primary" @click="toggleSidebar">Toggle Menu</button>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
              </li>
             
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown">
                  Menu
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="/admin/myinfo">내정보</a></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li><button class="dropdown-item" @click="logout">로그아웃</button></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="header-content" v-if="showAdminHeader">
        <AdminHeader :BoardDataList="BoardDataList" :InquiryDataList="InquiryDataList" />
      </div>

      <div class="container-fluid mt-4">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
import AdminHeader from './AdminHeader.vue';


export default {
  name: 'Admin',

  data() {
    return {
      isToggled: false,
      showAdminHeader: false,

      BoardDataList: [],
      InquiryDataList: [],
    };
  },

  created() {
    this.updateAdminHeaderVisibility();
    this.fetchBoardListData();
    this.fetchInquiryListData();
  },

  components: { AdminHeader },

  watch: { $route() { this.updateAdminHeaderVisibility(); }, },

  methods: {

    async logout() {

      try {
        await this.$axios.post('/logout', {}, { withCredentials: true });

        localStorage.removeItem("access");
        alert('로그아웃이 완료 되었습니다.');
        window.location.href = '/';

      } catch (error) {
        console.error('로그아웃 실패', error);
      }
    },

    toggleSidebar() { this.isToggled = !this.isToggled; },

    updateAdminHeaderVisibility() { this.showAdminHeader = this.$route.path === "/admin"; },

    async fetchBoardListData() {

      try {
        const response = await this.$axios.get('/admin/boards/simple');
        
        this.BoardDataList = response.data;

      } catch (error) {
        console.error('fetchBoardListData error: ', error);
      }
    },

    async fetchInquiryListData() {

      try {
        const response = await this.$axios.get('/admin/inquiry/simple');

        this.InquiryDataList = response.data;

      } catch (error) {
        console.error('fetchInquiryListData error: ', error);
      }
    },


  },
};
</script>
<style scoped>
#sidebar-wrapper {
  width: 250px;
  min-height: 100vh;
  transition: all 0.3s;
  position: fixed;
  left: 0;
  top: 0;
  background: #f8f9fa;
  padding-top: 20px;
}

#sidebar-wrapper.toggled {
  width: 80px;
}

#page-content-wrapper {
  flex-grow: 1;
  padding-left: 250px;
  transition: all 0.3s;
}

#page-content-wrapper.toggled {
  padding-left: 80px;
}

@media (max-width: 768px) {
  #sidebar-wrapper {
    width: 80px;
  }

  #page-content-wrapper {
    padding-left: 80px;
  }
}
</style>
