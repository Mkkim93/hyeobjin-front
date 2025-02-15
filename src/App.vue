<template>
  <HomeView v-if="!isAdminPage" @updateCategoryStep="updateCategoryStep" />
  <Header v-if="!isMainPage" />
  <div class="main-content">
    <div :class="{ 'main-content': !isAdminPage, 'admin-content': isAdminPage }">
      <!-- FormCategory에 categoryStep을 props로 전달 -->
      <FormCategory :categoryStep="categoryStep" v-if="isMainPage"/>
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
      categoryStep: 0, // 기본값 설정
    };
  },

  computed: {
    isAdminPage() {
      return this.$route.path.startsWith('/admin');
    },

    isMainPage() {
      return this.$route.path !== '/';
    }
  },

  methods: {
    updateCategoryStep(step) {
      this.categoryStep = step; // ✅ HomeView에서 받은 값을 저장
    }
  },

  components: {
    HomeView,
    Header,
    Footer,
    FormCategory,
  }
};
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
