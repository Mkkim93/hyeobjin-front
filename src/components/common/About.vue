<template>
  
  <section class="py-5 border-bottom">
    <div class="container px-5 my-5 px-5">
      <div class="text-center mb-5">
        <h2 class="about-title fw-bolder">인사말</h2><br>
        <p class="lead mb-2">저희 협진시스템창호는 창호 제작 공장을 직접 운영하여 정직하고 합리적인 가격, 우수한 제품을 보장할 수 있습니다.
          정직한 제품, 고객의 믿음과 신뢰를 쌓아가는 회사가 되도록 노력하겠습니다.
          A/S발생시 빠르고 책임감 있는 A/S처리를 약속드립니다.
          정품 자재로 믿을 수 있는 제품을 약속 드립니다. 언제나 편하게 문의 하세요.
          가족과 같은 마음으로 친절히 상담해 드리겠습니다.</p>
      </div>
      <div class="text-center mb-5">
        <div class="emax-Intro">
          <img :src="emax01" alt="emax-intro" class="img-fluid">
        </div>
        <div>
          <img :src="emax02" alt="emax-intro02" class="img-fluid my-5">
        </div>
        <img :src="storagy" alt="storagy-img" class="img-fluid">
        </div>
    </div>
  </section>

  <section class="bg-light py-5 border-bottom">
    <div class="container px-5 my-5">
      <div class="text-center mb-5">
        
      </div>
    </div>
  </section>

</template>

<script>
import emax01 from '@/assets/images/e-max01.png';
import emax02 from '@/assets/images/e-max02.png';
import emaxContent from '@/assets/images/emax-content.jpg';
import storagy from '@/assets/images/starage01.png';
export default {
  name: 'About',
  data() {
    return {
      emax01,
      emax02,
      emaxContent,
      storagy
    };
  },
}
</script>
<style scoped>
.emax-Intro {
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 0px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  max-height: 800px;
}

.about-title {
  display: inline-block;
  border-bottom: 3px solid #0078ff;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
</style>