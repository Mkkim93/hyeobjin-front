<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img :src="img1" alt="Logo 1" />
      </div>
      <div class="swiper-slide">
        <img :src="img2" alt="Logo 2" />
      </div>
      <div class="swiper-slide">
        <img :src="img3" alt="Logo 3" />
      </div>
    </div>
    <!-- If we need pagination -->

    <!-- If we need navigation buttons -->
    <!-- <div class="swiper-scrollbar"></div> -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->

    <!-- If we need scrollbar -->
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle'; // Swiper 스타일 추가

import img1 from '@/assets/images/slide01.png';
import img2 from '@/assets/images/slide02.jpg';
import img3 from '@/assets/images/slide03.jpg';

export default {
  setup() {
    // Swiper 초기화
    onMounted(() => {
      const swiper = new Swiper('.swiper-container', {
        loop: true,

      autoplay: {
        delay: 3000, 
        disableOnInteraction: false,
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true, 
      },

      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true, 
      },

      });
    });

    return {
      img1,
      img2,
      img3,
    };
  },
};
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.swiper-container {
  width: 100%;      
  height: 60vh;   
  overflow: hidden;
  position: relative;  
  top: 0;
  left: 0;
  flex: 1;
}

.swiper-slide img {
  width: 100%;      
  height: 100%;     
  object-fit: fill;
}
</style>
