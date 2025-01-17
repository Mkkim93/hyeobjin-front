<template>
    <section class="introduction">
      <h2>(주)협진시스템창호 제작 전문</h2>
      <p>700여 매장이 함께 참여한 시공, 믿을 수 있는 프리미엄 창호, 최대 10년 A/S 보증과 품질을 약속합니다.</p>
    </section>

    <div class="emax-Intro">
      <img :src="emaxIntro" alt="emax-intro">
    </div>

    <section class="services">
      <div class="service-item">
        <img src="#" alt="사진이 들어갈 곳입니다1">
        <h3>Layout1</h3>
        <p>40% 할인!</p>
        <button>More View</button>
      </div>
      <div class="service-item">
        <img src="# alt=" alt="사진이 들어갈 곳입니다2">
        <h3>Layout2</h3>
        <p>96% 이하 지원대상</p>
        <button>More View</button>
      </div>
      <div class="service-item">
        <img src="#" alt="사진이 들어갈 곳입니다3">
        <h3>Layout3</h3>
        <p>50% 지원사업</p>
        <button>More View</button>
      </div>
      
    
    </section>
    
</template>

<script>
import emaxIntro from '@/assets/images/emax-intro.png';
import '../../assets/styles/main.css';

export default {
    name: 'Main',

    data() {
        return {
          emaxIntro,
        }
    }
}
</script>

<style>
</style>