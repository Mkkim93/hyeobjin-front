<template>
 
  <div class="swiper-container">
   
    <div class="swiper-wrapper">
     
      <div class="swiper-slide">
        <img src="@/assets/images/이미지1.png" alt="Logo 1" />
      </div>
      <div class="swiper-slide">
        <img src="@/assets/images/이미지2.png" alt="Logo 2" />
      </div>
      <div class="swiper-slide">
        <img src="@/assets/images/이미지3.png" alt="Logo 3" />
      </div>
      <div class="swiper-slide">
        <img src="@/assets/images/이미지4.png" alt="Logo 3" />
      </div>
      <div class="swiper-slide">
        <img src="@/assets/images/이미지5.png" alt="Logo 3" />
      </div>
      <div class="swiper-slide">
        <img src="@/assets/images/이미지6.png" alt="Logo 3" />
      </div>
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
import image1 from "@/assets/images/이미지1.png"; 
import image2 from "@/assets/images/이미지2.png";
import image3 from "@/assets/images/이미지3.png";
import image4 from "@/assets/images/이미지4.png";
import image5 from "@/assets/images/이미지5.png";
import image6 from "@/assets/images/이미지6.png";

export default {
  name: "MySwifer",
  data() {
    return {
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
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
