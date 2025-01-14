<template>
<section class="introduction">
    <div class="intro-container">
      <!-- Left Section: Image -->
      <div class="intro-image">
        <img :src="asformImg" alt="A/S 이미지" />
      </div>

      <!-- Right Section: Company Introduction -->
      <div class="intro-text">
        <h2>A/S 문의</h2>
        <p>협진 창호 A/S 신청은 아래의 연락처로 내용을 문자로 부탁드립니다.</p><br>
      </div>
    </div>
  </section>

  <section class="services">
    <div class="service-item">
      <img src="#" alt="">
      <h3>고객 상담</h3>
      <p>평일 09:00 ~ 17:00 주말 및 공휴일 휴무</p>
      <p>010-2223-0000</p>
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
import asformImg from '@/assets/asform.jpg';
export default {
    name: 'ASForm',
    data() {
        return {
          asformImg,

        }
    },
}
</script>

<style>
/* 전체 레이아웃 설정 */
.introduction {
  padding: 60px 20px;
  width: 100%;
  background-color: #f9f9f9; /* 배경색 추가로 섹션 분리 */
}

/* 컨테이너 설정: Flexbox로 이미지와 텍스트 배치 */
.intro-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto; /* 가운데 정렬 */
}

/* 좌측 이미지 섹션 */
.intro-image img {
  width: 100%;
  max-width: 500px; /* 이미지 최대 너비 조정 */
  height: auto; /* 비율 유지 */
  border-radius: 10px; /* 부드러운 모서리 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
}

/* 우측 텍스트 섹션 */
.intro-text {
  max-width: 600px;
}

.intro-text h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #333; /* 진한 색상으로 강조 */
  border-left: 5px solid #0078ff; /* 좌측 강조선 */
  padding-left: 10px;
}

.intro-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 20px;
}

/* 서비스 항목 레이아웃 */
.services {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-top: 60px;
  max-width: 1200px;
  margin: 60px auto; /* 가운데 정렬 및 상단 여백 */
}

.service-item {
  flex: 1;
  text-align: center;
  padding: 20px;
  background-color: #fff; /* 배경 추가 */
  border: 1px solid #ddd; /* 외곽선 추가 */
  border-radius: 10px; /* 부드러운 모서리 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  transition: transform 0.3s, box-shadow 0.3s; /* 마우스 오버 효과 */
}

.service-item:hover {
  transform: translateY(-10px); /* 살짝 올라감 */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* 그림자 증가 */
}

.service-item img {
  width: 100%;
  max-width: 150px; /* 이미지 크기 제한 */
  height: auto;
  object-fit: cover;
  margin-bottom: 15px;
  border-radius: 50%; /* 원형 이미지 */
  border: 3px solid #0078ff; /* 테두리 추가 */
}

.service-item h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #0078ff; /* 강조색 */
}

.service-item p {
  font-size: 1rem;
  color: #666;
}

/* 모바일 반응형 */
@media screen and (max-width: 768px) {
  .intro-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .intro-image img {
    max-width: 100%;
    margin-bottom: 20px;
  }

  .services {
    flex-direction: column;
    gap: 20px;
  }

  .service-item {
    margin-bottom: 20px;
  }
}

</style>