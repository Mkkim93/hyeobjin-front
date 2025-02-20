<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-white">
    <div class="container d-flex align-items-center justify-content-between px-3">
      <div class="d-flex align-items-center">
        <img :src="hjlogo" alt="로고" class="main-company-logo me-1" />
        <a class="navbar-brand me-3" href="/"> (주)협진시스템창호 </a>
        <img :src="kccglass01" alt="로고" class="company-logo" />
        <img :src="kccglass02" alt="로고" class="company-logo" />
        <img :src="hugreen" alt="로고" class="company-logo" />
      </div>

      <button class="navbar-toggler bg-dark" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active" href="/"> Home </a>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownCompany" role="button"
              data-bs-toggle="dropdown" aria-expanded="false"> 회사소개 </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownCompany">
              <li><router-link class="dropdown-item" to="/about" @click="setCategoryStep(1)">인사말</router-link></li>
              <li><a class="dropdown-item" href="#!">연혁</a></li>
              <li><router-link class="dropdown-item" to="/location" @click="setCategoryStep(1)">오시는 길</router-link></li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdownProducts" role="button" data-bs-toggle="dropdown"
              aria-expanded="false"> 제품소개 </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownProducts">
              <li v-for="manufacturer in manufacturers" :key="manufacturer.manuId">
                <router-link class="dropdown-item" :to="{ name: 'Manufact', params: { id: Number(manufacturer.manuId) } }"
                  @click="setCategoryStep(2)">
                  <slot>{{ manufacturer.manuName }}</slot>
                </router-link>
              </li>
            </ul>
          </li>

          <router-link to="/notice" class="nav-link dropdown-toggle" @click="setCategoryStep(3)"> 공지사항 </router-link>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#!" id="navbarDropdownContact" role="button"
              data-bs-toggle="dropdown" aria-expanded="false"> 고객문의 </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownContact">
              <li><router-link to="/inquiry" class="dropdown-item" @click="setCategoryStep(4)">1:1 문의</router-link></li>
              <li><router-link to="/help" class="dropdown-item" @click="setCategoryStep(4)">A/S 문의</router-link></li>
              <li><router-link to="/faq" class="dropdown-item" @click="setCategoryStep(4)">FAQ</router-link></li>
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
import hugreen from '@/assets/images/logo_hugreens.png';
import kccglass01 from '@/assets/images/logo_kgs01.png';
import kccglass02 from '@/assets/images/logo_kgs02.png';
import hjlogo from '@/assets/images/hjlogo.png';

export default {
  name: 'HomeView',
  emits: ['updateCategoryStep'],

  data() {
    return {
      manufacturers: [],
      hugreen,
      kccglass01,
      kccglass02,
      hjlogo,
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

        this.manufacturers = response.data;
        this.emitter.emit('manufacturersLoaded', this.manufacturers);

      } catch (error) {
        console.error('fetchManufacturers error: ', error);
      }
    },

    setCategoryStep(step) {
      this.$emit("updateCategoryStep", step);
    },
  },
};
</script>

<style scoped>
.d-flex.align-items-center {
  gap: 5px;
}

.navbar {
  padding: 10px 0;

}

.navbar-nav .nav-link.active {
  color: #ff6600 !important;
  font-weight: bold;
}

.navbar-brand:hover {
  color: black;
}

.nav-item:hover {
  color: black;
  border-bottom: 1px;
}

.company-logo {
  height: 30px;
  width: auto;
  object-fit: contain;
}

.main-company-logo {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.navbar-brand {
  font-family: 'KIMM_Bold', sans-serif;
  color: #333;
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.navbar-nav .nav-link {
  color: black;
  transition: all 0.3s ease-in-out;
  font-weight: bold;
}

.navbar-nav .nav-link:hover {
  color: #ff6600 !important;
  border-radius: 5px;
  padding: 5px 10px;
}

.navbar-nav .dropdown-menu {
  display: none;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  width: auto;
  min-width: 200px;
  max-width: 250px;
  text-align: left;
}

.navbar-nav .nav-item.dropdown:hover .dropdown-menu {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

.dropdown-menu {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  font-weight: 500;
  padding: 10px 15px;
  transition: background 0.2s ease-in-out;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #ff6600 !important;
}

@font-face {
  font-family: 'KIMM_Bold';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/KIMM_Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}
</style>
