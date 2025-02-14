<template>
  <section class="py-5 border-bottom">
    <div class="container px-5 my-5 px-5">
      <div class="text-center mb-5">
      

        <h2 class="about-title fw-bolder">회사 개요</h2><br>
        <p class="lead mb-2">저희 협진시스템창호는 창호 제작 공장을 직접 운영하여 정직하고 합리적인 가격, 우수한 제품을 보장할 수 있습니다.
          정직한 제품, 고객의 믿음과 신뢰를 쌓아가는 회사가 되도록 노력하겠습니다.
          A/S발생시 빠르고 책임감 있는 A/S처리를 약속드립니다.
          정품 자재로 믿을 수 있는 제품을 약속 드립니다. 언제나 편하게 문의 하세요.
          가족과 같은 마음으로 친절히 상담해 드리겠습니다.</p>
      </div>

      <div class="text-center mb-5">
        <div class="emax-Intro">
          <img :src="emaxIntro" alt="emax-intro" class="img-fluid">
        </div>
      </div>
    </div>

  </section>

  <section class="bg-light py-5 border-bottom">
    <div class="container px-5 my-5">
      <div class="text-center mb-5">
        <h2 class="fw-bolder">' ? '</h2>
        <img :src="emaxContent" alt="content-img">
        <p class="lead mb-5">' ? '</p>
      </div>
    </div>
  </section>

  <section class="services my-10 px-10 mb-20">
    <!-- <div class="service-item mb">
      <h3>Layout 01</h3>
      <p>Detail 01</p>
    </div>
    <div class="service-item">
      <h3>Layout 02</h3>
      <p>Detail 02</p>
    </div>
    <div class="service-item">
      <h3>Layout 03</h3>
      <p>Deatil 03</p>
    </div> -->
  </section>
</template>

<script>
import emaxIntro from '@/assets/images/emax-intro.png';
import emaxContent from '@/assets/images/emax-content.jpg';
export default {
  name: 'About',
  data() {
    return {
      emaxIntro,
      emaxContent,
    };
  },
}
</script>
<style scoped>
/* 이미지를 중앙 정렬 */
.emax-Intro {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  /* 텍스트와 이미지 사이에 공간 추가 */
  margin-bottom: 0px;
  /* 이미지 아래에도 여백 추가 */
}

/* 반응형 이미지 스타일 */
.img-fluid {
  max-width: 100%;
  height: auto;
  max-height: 800px;
  /* 이미지 최대 높이 제한 */
}

.about-title {
  display: inline-block;
  border-bottom: 3px solid #0078ff;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
</style>