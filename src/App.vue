<template>

<div class="wrap">
    
    <HomeView />

    <section class="main-banner">
      <div class="banner-content">
        <MySwifer />
      </div>
    </section>

    <div class="router-content">
     <router-view></router-view>
    </div>
    
    <Footer />
  </div>

</template>

<script>
import Footer from './components/Footer.vue';
import HomeView from './components/HomeView.vue';
import MySwifer from './components/MySwifer.vue';

export default {
  name: 'App',
  components: {
    Footer,
    HomeView,
    MySwifer,
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

.router-content {
  width: 60%; /* 원하는 너비로 수정 */
  margin: 0 auto; /* 가운데 정렬 */
  padding: 20px; /* 필요시 패딩 추가 */
}
</style>
