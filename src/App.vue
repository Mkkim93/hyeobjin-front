<template>

  <HomeView v-if="!isAdminPage" />
  <Header v-if="!isMainPage" />
  <div class="main-content">
    <FormCategory />
    <div :class="{ 'main-content': !isAdminPage, 'admin-content': isAdminPage }">
      <router-view />
    </div>
  </div>

  <Footer />
</template>

<script>
import Footer from './components/view/Footer.vue';
import HomeView from './components/view/HomeView.vue';
import Header from './components/view/Header.vue';
import FormCategory from './components/view/FormCategory.vue';
export default {
  name: 'App',

  data() {
    return {
      step: 0,
      category: '',
    }
  },

  computed: {
    isAdminPage() {
      return this.$route.path.startsWith('/admin');
    },

    isMainPage() {
      return this.$route.path !== '/';
    }

  },

  components: {
    HomeView,
    Header,
    Footer,
    FormCategory,
  }
}
</script>

<style>
.main-content {
  /* 고정 크기 설정 */
  width: 100%; /* 부모 요소의 너비를 100%로 설정 */
  min-height: 70vh; /* 최소 높이 설정 */
  max-height: 100%; /* 최대 높이 설정 (필요시 조정) */
  padding: 0 10%;
  box-sizing: border-box;
  margin-bottom: 5%;
  overflow: hidden; /* 내부 콘텐츠가 넘칠 경우 숨기기 */
}

.admin-content {
  background-color: #f0f0f0; /* 예시로 배경 색상 추가 */
}
</style>
