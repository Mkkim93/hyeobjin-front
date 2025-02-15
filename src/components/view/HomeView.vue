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

      <button class="navbar-toggler bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                <router-link class="dropdown-item" :to="{ name: 'Manufact', params: {id: Number(manufacturer.manuId)} }" @click="setCategoryStep(2)">
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
              <li><router-link to="/asform" class="dropdown-item" @click="setCategoryStep(4)">1:1 문의</router-link></li>
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
        console.log('response', response);
        this.manufacturers = response.data;
        this.emitter.emit('manufacturersLoaded', this.manufacturers);
      } catch (error) {
        console.error('Failed to fetch manufacturers:', error);
      }
    },

    emits: ["updateCategoryStep"],

    setCategoryStep(step) {
      this.$emit("updateCategoryStep", step); // ✅ App.vue에서 수신하여 categoryStep을 변경
    },
  },
};
</script>

<style scoped>
.d-flex.align-items-center {
  gap: 5px; /* ✅ 로고들 간 15px 간격 추가 */
}

/* 네비게이션 바 */
.navbar {
  padding: 10px 0;
  
}
.navbar-nav .nav-link.active {
  color: #ff6600 !important; /* ✅ 원하는 색상 (주황색) */
  font-weight: bold; /* ✅ 강조 효과 */
}


.navbar-brand:hover {
  color: black;
}

.nav-item:hover {
  color: black;
  border-bottom: 1px;
}

/* 회사 로고 */
.company-logo {
  height: 30px; /* 로고 크기 조정 */
  width: auto;
  object-fit: contain;
}

.main-company-logo {
  height: 40px; /* 로고 크기 조정 */
  width: auto;
  object-fit: contain;
}

.navbar-brand {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(to right, #ff7e5f, #feb47b); /* 오렌지-핑크 그라디언트 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 10px; /* 로고와 텍스트 사이 여백 */
}

.navbar-nav .nav-link {
  color: black; /* 기본 글씨 색 */
  transition: all 0.3s ease-in-out;
  font-weight: bold; /* ✅ 강조 효과 */
  
}

.navbar-nav .nav-link:hover {
  color: #ff6600 !important; /* ✅ 원하는 색상 (주황색) */
  border-radius: 5px; /* 모서리 부드럽게 */
  padding: 5px 10px; /* 내부 여백 추가 */
}

/* ✅ 드롭다운 메뉴 스타일 */
.navbar-nav .dropdown-menu {
  display: none; /* 기본적으로 숨김 */
  opacity: 0; /* 투명도 0으로 설정 */
  transform: translateY(-10px); /* 위에서 내려오는 효과 */
  transition: opacity 0.3s ease, transform 0.3s ease; /* 부드러운 애니메이션 */
  min-width: 200px; /* 최소 너비 설정 */
}

/* ✅ 마우스를 올리면 드롭다운 활성화 */
.navbar-nav .nav-item.dropdown:hover .dropdown-menu {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

/* ✅ 서브메뉴 항목 스타일 */
.dropdown-menu {
  background-color: white; /* 배경색 흰색 */
  border-radius: 8px; /* 모서리 둥글게 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 효과 */
}

/* ✅ 서브메뉴 항목 스타일 */
.dropdown-item {
  font-weight: 500;
  padding: 10px 15px;
  transition: background 0.2s ease-in-out;
}

/* ✅ 서브메뉴 항목 호버 효과 */
.dropdown-item:hover {
  background-color: #f8f9fa; /* 연한 회색 배경 */
  color: #ff6600 !important; /* ✅ 원하는 색상 (주황색) */
}

.navbar-nav .dropdown-menu {
  width: auto; /* ✅ 메뉴 크기를 자동으로 조정 */
  min-width: 200px; /* 최소 크기 유지 */
  max-width: 250px; /* 최대 크기 제한 */
  text-align: left;
}

@font-face {
  font-family: 'KIMM_Bold';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/KIMM_Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

/* ✅ 특정 요소에 폰트 적용 */
.navbar-brand {
  font-family: 'KIMM_Bold', sans-serif;
  font-size: 20px;
  color: #333;
}
</style>
