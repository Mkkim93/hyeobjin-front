<template>
  <section class="location-container">
    <h2 class="location-title">찾아오시는 길</h2>

    <div class="map-info-wrapper">
      <div class="map-card">
        <div id="map" class="map"></div>
      </div>

      <div class="info-card">
        <h3 class="info-title">(주)협진시스템창호</h3>
        <ul class="info-list">
          <li><i class="fas fa-map-marker-alt"></i> 대전 중구 대둔산로 119-36 (대전 중구 안영동 239-2)</li>
          <li><i class="fas fa-phone"></i> 010-4951-4944 / 042-583-3131</li>
          <li><i class="fas fa-fax"></i> 042-583-3131</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Location",
  created() {
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=893feef44fe943f2ac60e2fd3db808c7";
    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map"); 
        const options = {
          center: new kakao.maps.LatLng(36.282378818987155, 127.37469382777536), 
          level: 3, 
        };
        const map = new kakao.maps.Map(container, options);
        const markerPosition = new kakao.maps.LatLng(36.282378818987155, 127.37469382777536);
        const marker = new kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);
      });
    };
    document.head.appendChild(script);
  },
};
</script>

<style>
/* 부드러운 배경과 심플한 레이아웃 */
.location-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 60px 20px;
  min-height: 100vh;
}

/* 제목 디자인 */
.location-title {
  font-size: 2.5rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 30px;
  position: relative;
}

.location-title::after {
  content: "";
  display: block;
  width: 100%;
  height: 4px;
  background-color: #0078ff;
  margin: 8px auto 0;
  border-radius: 2px;
}

/* 지도와 정보 섹션을 정렬 */
.map-info-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 1000px;
  width: 100%;
}

/* 카드 스타일 */
.map-card, .info-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.map-card:hover, .info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* 지도 스타일 */
.map-card {
  width: 100%;
  max-width: 600px;
  height: 400px;
  overflow: hidden;
}

.map {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

/* 정보 카드 */
.info-card {
  width: 100%;
  max-width: 600px;
  text-align: left;
}

.info-title {
  font-size: 1.8rem;
  color: #0078ff;
  margin-bottom: 15px;
  font-weight: bold;
}

.info-list {
  list-style: none;
  padding: 0;
  font-size: 1.1rem;
  color: #555;
}

.info-list li {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.info-list i {
  margin-right: 10px;
  color: #0078ff;
  font-size: 1.2rem;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .map-info-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .map-card, .info-card {
    width: 100%;
    max-width: 100%;
  }
}
</style>
