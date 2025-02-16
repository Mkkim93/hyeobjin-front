<template>
  <div v-if="errorStatus">
    <ErrorMainPage :errorStatus="errorStatus" />
  </div>

  <div v-if="!errorStatus">
    <HomeView v-if="!isAdminPage" @updateCategoryStep="updateCategoryStep" />
    <Header v-if="!isMainPage" />
    <div class="main-content">
      <div :class="{ 'main-content': !isAdminPage, 'admin-content': isAdminPage }">
        <!-- isMainPage이고, isAdminPage가 아닐 때만 FormCategory 렌더링 -->
        <FormCategory :categoryStep="categoryStep" v-if="isMainPage && !isAdminPage" />
        <router-view />
      </div>
    </div>
    <Footer v-if="isMainPage && !isAdminPage"/>
  </div>
</template>

<script>
import Footer from './components/view/Footer.vue';
import HomeView from './components/view/HomeView.vue';
import Header from './components/view/Header.vue';
import FormCategory from './components/view/FormCategory.vue';
import ErrorMainPage from './components/error/ErrorMainPage.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',

  data() {
    return {
      categoryStep: 0,
    };
  },

  computed: {
    ...mapState(['errorStatus']), // Vuex 상태를 직접 사용

    isAdminPage() {
      return this.$route.path.startsWith('/admin'); // /admin 경로인지 확인
    },

    isMainPage() {
      return this.$route.path !== '/';
    }
  },

  methods: {
    updateCategoryStep(step) {
      this.categoryStep = step; 
    }
  },

  components: {
    HomeView,
    Header,
    Footer,
    FormCategory,
    ErrorMainPage,
  }
};
</script>

<style>
.main-content {
  width: 100%;
  min-height: 70vh;
  max-height: 100%;
  padding: 0 10%;
  box-sizing: border-box;
  margin-bottom: 5%;
  overflow: hidden;
}

.admin-content {
  background-color: #f0f0f0;
}
</style>
