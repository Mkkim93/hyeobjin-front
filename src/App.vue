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

      <div class="router-content"><router-view></router-view></div>
      
      <div class="right-banner">
        <RightBanner />
      </div>

    </div>

    <Footer />

  </div>
</template>

<script>
import Footer from './components/view/Footer.vue';
import HomeView from './components/view/HomeView.vue';
import MySwifer from './components/view/MySwifer.vue';
import LeftBanner from './components/common/LeftBanner.vue';
import RightBanner from './components/common/RightBanner.vue';

import '@/assets/styles/app.css';

export default {
  name: 'App',

  data() {
    return {
      
    }
  },
  components: {
    HomeView,
    MySwifer,
    LeftBanner,
    RightBanner,
    Footer,
  }
}
</script>

<style scoped>
body {
    margin: 0;
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }
</style>
