<template>
  <Swiper :modules="[EffectFade, Autoplay]" :effect="'fade'" :loop="true"
    :autoplay="{ delay: 3000, disableOnInteraction: false }" :fadeEffect="{ crossFade: true }" class="swiper-container">
    <SwiperSlide v-for="slide in slides" :key="slide">
      <img :src="slide.imges" alt="Logo 1" />
      <div class="text-overlay">
        <h2>{{ slide.text }}</h2>
        <p> {{ slide.description }} </p>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import img1 from "@/assets/images/swiper02.jpg";
import img2 from "@/assets/images/swiper03.jpg";
import img3 from "@/assets/images/swiper05.jpg";
import img4 from "@/assets/images/swiper06.jpg";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {

    const slides = [
      {
        imges: img1,
        text: '"20년 이상 사용 가능한 탁월한 내구성, 프리미엄 창호"',
        description: 'KCC & 휴그린 & 예림 (주)협진시스템창호',
      },
      {
        imges: img2,
        text: '"정품 자재로 믿을 수 있는 시공을 약속 드립니다."',
        description: '자재 / 전문인력 / 부자재 / 10년 무상 AS / 부가 서비스',
      },
      {
        imges: img3,
        text: '"에너지 절감과 쾌적함을 선사하는 혁신 창호 솔루션"',
        description: '최첨단 단열 및 기밀 설계로 실내 온도 유지 및 에너지 비용 절감',
      },
      {
        imges: img4,
        text: '"맞춤형 디자인으로 완성하는 프리미엄 인테리어"',
        description: '고객의 공간 특성에 맞춘 정교한 설계와 철저한 품질 관리로 최고의 만족을 드립니다.',
      },
    ]

    return { slides, EffectFade, Autoplay, };
  },
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 60vh;
  overflow: hidden;
  position: relative;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-overlay {
  position: absolute;
  top: 60%;
  left: 20px;
  max-width: 750px;
  width: calc(100% - 40px);
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  text-align: left;
  border-radius: 8px;
  transition: 0.5s;
  z-index: 1;
}

.text-overlay h2 {
  font-size: 48px;
  color: #fff;
  line-height: 1.25;
  font-weight: bold;
  margin-bottom: 16px;
}

.text-overlay p {
  font-size: 16px;
  margin-top: 10px;
  color: #fff;
  font-style: 20px;
}

@media (max-width: 768px) {
  .text-overlay {
    left: 10px;
    width: calc(100% - 20px);
    padding: 10px;
  }

  .text-overlay h2 {
    font-size: 32px;
  }

  .text-overlay p {
    font-size: 14px;
  }
}
</style>
