<template>
    <section class="introduction">
      <h2>(주)협진시스템창호 제작 전문</h2>
      <p>700여 매장이 함께 참여한 시공, 믿을 수 있는 프리미엄 창호, 최대 10년 A/S 보증과 품질을 약속합니다.</p>
    </section>

    <!-- Services Section -->
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
      <!-- Add more service items as needed -->
    </section>
</template>

<script>
export default {
    name: 'Main',

    data() {
        return {

        }
    }
}
</script>

<style scoped>

.main-banner {
  margin-top: 70px;
  background: url('/path/to/banner.jpg') no-repeat center center/cover;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
}

.main-banner h2 {
  font-size: 3.5rem;
  margin-bottom: 10px;
}
.main-banner p {
  font-size: 1.2rem;
}

.introduction {
  text-align: center;
  padding: 40px 20px;
  background-color: #f9f9f9;
}

.introduction h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.services {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.service-item {
  text-align: center;
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.service-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.service-item h3 {
  margin: 10px 0;
  font-size: 1.2rem;
}

.service-item button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-bottom: 10px;
}

</style>