<template>
    <section class="introduction">
    <div class="intro-container">
      <div class="emax-Intro">
      <img :src="emaxIntro" alt="emax-intro">
    </div>

      <div class="intro-text">
        <h2>회사 개요</h2>
        <p>저희 협진시스템창호는 창호 제작 공장을 직접 운영하여 정직하고 합리적인 가격, 우수한 제품을 보장할 수 있습니다.
정직한 제품, 고객의 믿음과 신뢰를 쌓아가는 회사가 되도록 노력하겠습니다.
A/S발생시 빠르고 책임감 있는 A/S처리를 약속드립니다.
정품 자재로 믿을 수 있는 제품을 약속 드립니다. 언제나 편하게 문의 하세요.
          가족과 같은 마음으로 친절히 상담해 드리겠습니다.</p>
      </div>
    </div>
  </section>

  <section class="services">
    <div class="service-item">
      <img src="#" alt="">
      <h3>Layout 01</h3>
      <p>Detail 01</p>
    </div>
    <div class="service-item">
      <img src="#" alt="">
      <h3>Layout 02</h3>
      <p>Detail 02</p>
    </div>
    <div class="service-item">
      <img src="#" alt="">
      <h3>Layout 03</h3>
      <p>Deatil 03</p>
    </div>
  </section>
</template>

<script>
import emaxIntro from '@/assets/images/emax-intro.png';
import '../../assets/styles/about.css';
export default {
    name: 'About',
    data() {
        return {
            emaxIntro,
        };
    },
}
</script>
<style>
</style>