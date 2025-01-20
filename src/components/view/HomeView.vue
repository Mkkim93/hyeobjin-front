<template>
  <header class="header">
    <div class="header-inner">

      <h1>Company Logo</h1>
      <nav class="menu">
        <ul>

          <li><router-link to="/" tag="li"><h4>Home</h4></router-link></li>

          <li class="dropdown">
            <h4>회사소개</h4>
            <ul class="submenu">
              <li><router-link to="/about" tag="li">회사소개</router-link></li>
              <li><router-link to="/location" tag="li">찾아오시는 길</router-link></li>
              <li><router-link to="/history" tag="li">회사 연혁</router-link></li>
            </ul>
          </li>

          <li class="dropdown">
            <h4>제품소개</h4>
            <ul class="submenu">
          
              <li v-for="manufacturer in manufacturers" :key="manufacturer.manuId">
              <router-link :to="`/manu/${manufacturer.manuId}`">{{ manufacturer.manuName }}</router-link>
              </li>

            </ul>
          </li>

          <li class="dropdown">
            <h4>고객상담</h4>
            <ul class="submenu">
              <li><router-link to="/notice" tag="li">공지사항</router-link></li>
              <li><router-link to="/support" tag="li">1:1문의</router-link></li>
              <li><router-link to="/asform" tag="li">A/S문의</router-link></li>
            </ul>
          </li>

          <!-- /admin (관리자폼 진입 향후 display:none 설정 후 관리자 로그인 상태에서 보이도록 구현 예정) -->
              <li><router-link to="/admin" tag="li">설정</router-link></li>

        </ul>
      </nav>

      <div class="contact-info">
        <span>📞 010 - 4951 - 4944</span>
        <span>📞 042 - 583 - 3131</span>
      </div>
    </div>
    
  </header>
  
</template>

<script>
import '../../assets/styles/homeview.css';

export default {
  name: "HomeView",
  data() {
    return {
      manufacturers: [],
     
    };
  },

  created() {
    this.fetchManufacturers();
  },

  methods: {
    async fetchManufacturers() {
      try {
        const response = await this.$axios.get('/manufacturers', {
          headers: {
            "Content-Type": "application/json",
          },
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

<style scoped>
body {
    margin: 0;
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }
</style>