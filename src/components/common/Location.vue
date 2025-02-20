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
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=893feef44fe943f2ac60e2fd3db808c7";
    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(36.282378818987155, 127.37469382777536),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        const markerPosition = new kakao.maps.LatLng(
          36.282378818987155,
          127.37469382777536
        );
        const marker = new kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);
      });
    };
    document.head.appendChild(script);
  },
};
</script>

<style scoped>
/* ✅ 전체 레이아웃 */
.location-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 60px 20px;
  min-height: 100vh;
  background-color: #fafafa; /* 밝은 배경으로 심플하게 */
}

/* ✅ 제목 스타일 */
.location-title {
  font-size: 2.2rem;
  color: #333;
  font-weight: 700;
  margin-bottom: 40px;
  position: relative;
}

.location-title::after {
  content: "";
  display: block;
  width: 80px;          /* 길이를 짧게 조정해 미니멀한 느낌 */
  height: 3px;          /* 두께도 조금 줄임 */
  background-color: #999; /* 중립 색상 사용 */
  margin: 12px auto 0;
  border-radius: 2px;
}

/* ✅ 지도 + 정보 카드 배치 */
.map-info-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
}

/* ✅ 지도 카드 */
.map-card,
.info-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.map-card:hover,
.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

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

/* ✅ 정보 카드 */
.info-card {
  width: 100%;
  max-width: 600px;
  text-align: left;
}

/* ✅ 정보 제목 */
.info-title {
  font-size: 1.6rem;
  color: #333; /* 파란색 계열 제거 */
  margin-bottom: 15px;
  font-weight: 700;
}

/* ✅ 정보 목록 */
.info-list {
  list-style: none;
  padding: 0;
  font-size: 1rem;
  color: #555;
}

.info-list li {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

/* ✅ 아이콘 색상 */
.info-list i {
  margin-right: 10px;
  color: #666; /* 중립 계열 */
  font-size: 1.1rem;
}

/* ✅ 반응형 */
@media (max-width: 768px) {
  .map-info-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .map-card,
  .info-card {
    width: 100%;
    max-width: 100%;
  }

  .location-title {
    font-size: 1.8rem;
  }

  .location-title::after {
    margin-top: 8px;
    height: 2px;
  }

  .info-title {
    font-size: 1.4rem;
  }

  .info-list {
    font-size: 0.95rem;
  }
}
</style>
