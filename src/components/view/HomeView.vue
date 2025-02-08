<template>
  <!-- Responsive navbar-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container px-5">
      <a class="navbar-brand" href="/">(주)협진시스템창호</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible content -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

          <!-- Home (드롭다운 예시) -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active" href="/">
              Home
            </a>
          </li>

          <!-- 회사소개 (드롭다운) -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownCompany" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              회사소개
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownCompany">
              <li><router-link class="dropdown-item" to="/about">인사말</router-link></li>
              <li><a class="dropdown-item" href="#!">연혁</a></li>
              <li><router-link class="dropdown-item" to="/location">오시는 길</router-link></li>
            </ul>
          </li>

          <!-- 제품소개 (드롭다운) -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdownProducts" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              제품소개
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownProducts">
              <li v-for="manufacturer in manufacturers" :key="manufacturer.manuId">
                <router-link class="dropdown-item" :to="`/manu/${manufacturer.manuId}`">
                  {{ manufacturer.manuName }} </router-link>
              </li>
            </ul>
          </li>

          <router-link to="/notice" class="nav-link dropdown-toggle">
            공지사항
          </router-link>


          <!-- 고객문의 (드롭다운) -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#!" id="navbarDropdownContact" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              고객문의
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownContact">
              <li><router-link to="/asform" class="dropdown-item">1:1 문의</router-link></li>
              <li><router-link to="/fag" class="dropdown-item">FAQ</router-link></li>
              
            </ul>
          </li>

        </ul>
      </div>
    </div>
  </nav>

  <MySwifer />



</template>

<script>
import MySwifer from './MySwifer.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      manufacturers: []
    };
  },

  components: {
    MySwifer,
  },

  created() {
    this.fetchManufacturers();
  },
  methods: {
    async fetchManufacturers() {
      try {
        const response = await this.$axios.get('/manufacturers', {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('response', response);
        this.manufacturers = response.data;
      } catch (error) {
        console.error('Failed to fetch manufacturers:', error);
      }
    },
  },
};
</script>

<style scoped></style>
