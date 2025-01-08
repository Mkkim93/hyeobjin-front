<template>
  <div class="wrap">
    <HomeView />
    <div class="swifer-content">
      <MySwifer />
    </div>

    <div class="main-content">

      <div class="left-banner">
        <LeftBanner />
      </div>

      <div class="router-content">
        <router-view></router-view>
      </div>

      <div class="right-banner">
        <RightBanner />
      </div>

    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import HomeView from './components/HomeView.vue';
import MySwifer from './components/MySwifer.vue';
import LeftBanner from './components/LeftBanner.vue';
import RightBanner from './components/RightBanner.vue';

export default {
  name: 'App',
  components: {
    HomeView,
    MySwifer,
    LeftBanner,
    RightBanner,
    Footer,
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}

.main-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.left-banner,
.right-banner {
  width: 20%;
  background-color: #f0f0f0;
  padding: 10px;
  box-sizing: border-box;
}

.router-content {
  width: 60%;
  /* 중앙 콘텐츠 영역 */
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  /* 가운데 콘텐츠 배경색 추가 (필요시) */
}

/* 배너 및 콘텐츠 영역 조정 */
.left-banner, .right-banner {
  position: sticky; /* 스크롤에 따라 고정 */
  top: 0; /* 화면 상단 고정 */
  height: calc(100vh - 40px); /* 전체 높이에서 여백을 빼서 고정 크기 설정 */
}
</style>
