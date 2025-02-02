<template>
 
  <div class="swiper-container">
   
    <div class="swiper-wrapper">
     
      <div class="swiper-slide">
        <img src="@/assets/images/test01.jpg" alt="Logo 1" />
      </div>
      <div class="swiper-slide">
        <img src="@/assets/images/test02.jpg" alt="Logo 2" />
      </div>
      <div class="swiper-slide">
        <img src="@/assets/images/test03.jpg" alt="Logo 3" />
      </div>
      <!-- <div class="swiper-slide">
        <img src="@/assets/images/이미지4.png" alt="Logo 3" />
      </div>
      <div class="swiper-slide">
        <img src="@/assets/images/이미지5.png" alt="Logo 3" />
      </div>
      <div class="swiper-slide">
        <img src="@/assets/images/이미지6.png" alt="Logo 3" />
      </div> -->
    </div>
    <!-- If we need pagination -->

    <!-- If we need navigation buttons -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->

    <!-- If we need scrollbar -->
  </div>
</template>

<script>
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  name: "MySwifer",
  data() {
    return {
    
    };
  },

  mounted() {
    var swiper = new Swiper('.swiper-container', {
      loop: true,

      autoplay: {
        delay: 3000, 
        disableOnInteraction: false,
      },

      slidesPerView: 1,
      spaceBetween: 0,
 
      pagination: {
        el: '.swiper-pagination',
        clickable: true, 
      },

     
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true, 
      },
    });
  },
};
</script>

<style>

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.swiper-container {
  width: 100%;      
  height: 40vh;   
  overflow: hidden;
  position: relative;  
  top: 0;
  left: 0;
  flex: 1;
}

.swiper-slide img {
  width: 100%;      
  height: 100%;     
  object-fit: cover;
}
</style>
