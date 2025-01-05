<template>
  <!-- Slider main container -->
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide">
        <img src="@/assets/logo01.jpg" alt="Logo 1" />
      </div>
      <div class="swiper-slide">
        <img src="@/assets/logo02.jpg" alt="Logo 2" />
      </div>
      <div class="swiper-slide">
        <img src="@/assets/logo03.jpg" alt="Logo 3" />
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
// import styles bundle
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import image1 from "@/assets/logo01.jpg"; // @는 src 디렉토리를 나타냅니다.
import image2 from "@/assets/logo02.jpg";
import image3 from "@/assets/logo03.jpg";

export default {
  name: "MySwifer",
  data() {
    return {
      image1,
      image2,
      image3
    };
  },

  mounted() {
    var swiper = new Swiper('.swiper-container', {
      loop: true, // 무한 루프 활성화

      autoplay: {
        delay: 3000, // 3초마다 슬라이드 자동 전환
        disableOnInteraction: false, // 사용자가 슬라이드를 클릭해도 autoplay 유지
      },

      slidesPerView: 1, // 한 번에 하나의 슬라이드만 보이도록 설정
      spaceBetween: 0, // 슬라이드 간 간격을 없애기

      // Navigation arrows
      // Pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true, // 페이지네이션 클릭 가능
      },

      // Scrollbar (optional)
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true, // 드래그 가능
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
  width: 100%;      /* 화면 가로 크기를 꽉 채움 */
  height: 50vh;    /* 화면 높이를 꽉 채움 */
  overflow: hidden;
  position: relative;  /* 화면 고정 */
  top: 0;
  left: 0;
  flex: 1;
}

.swiper-slide img {
  width: 100%;      /* 이미지의 가로를 슬라이드 크기에 맞춤 */
  height: 70%;     /* 이미지의 세로를 슬라이드 크기에 맞춤 */
  object-fit: cover; /* 이미지를 칸에 맞게 비율을 유지하면서 자름 */
}
</style>
