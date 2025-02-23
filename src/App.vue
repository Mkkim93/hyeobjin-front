<template>
  <div v-if="errorStatus">
    <ErrorMainPage :errorStatus="errorStatus" />
  </div>

  <div v-if="!errorStatus">
    <HomeView v-if="!isAdminPage" @updateCategoryStep="updateCategoryStep" />
    <Header v-if="!isMainPage" />

    <div class="main-content">
      <div :class="{ 'main-content': !isAdminPage, 'admin-content': isAdminPage }">
        <FormCategory :categoryStep="categoryStep" v-if="isMainPage && !isAdminPage" />
        <router-view />
      </div>
    </div>

    <button v-show="showButton" @click="scrollToTop" class="scroll-to-top">
      ↑ TOP
    </button>

    <Footer v-if="!isAdminPage" />
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
      showButton: false,
    };
  },

  computed: {
    ...mapState(['errorStatus']),

    isAdminPage() {
      return this.$route.path.startsWith('/admin');
    },

    isMainPage() {
      return this.$route.path !== '/';
    }
  },

  mounted() {
    window.addEventListener("scroll", this.checkScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.checkScroll);
  },

  methods: {
    updateCategoryStep(step) {
      this.categoryStep = step;
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    checkScroll() {
      this.showButton = window.scrollY > 300;
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

.scroll-to-top {
  position: fixed;
  bottom: 40px;
  right: 30px;
  padding: 10px 15px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.7;
  transition: opacity 0.3s, transform 0.3s;
}

.scroll-to-top:hover {
  opacity: 1;
  transform: scale(1.1);
}
</style>
