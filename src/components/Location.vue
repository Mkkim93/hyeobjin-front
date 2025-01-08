<template>
  <section class="location-container">
    <!-- 섹션 제목 -->
    <h2 class="location-title">찾아오시는 길</h2>
    <!-- 지도 및 설명 컨테이너 -->
    <div class="map-wrapper">
      <!-- 카카오맵이 렌더링될 영역 -->
      <div id="map" class="map"></div>
    </div>
    <!-- 설명 폼 -->
    <div class="info-wrapper">
      <h3 class="info-title">(주)협진시스템창호</h3>
      <ul class="info-list">
        <li>주소: 대전 중구 대둔산로 119-36 (대전 중구 안영동 240-2)</li>
        <li>대표전화: 010-4951-4944, 042-583-3131</li>
        <li>팩스: 042-583-3131</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "Location",
  data() {
    return {

    }
  },
  mounted() {
    // 카카오맵 API 로드 및 초기화
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=893feef44fe943f2ac60e2fd3db808c7";
    script.onload = () => {
      kakao.maps.load(() => {
        // 지도 초기화
        const container = document.getElementById("map"); // 지도가 표시될 div
        const options = {
          center: new kakao.maps.LatLng(36.28238783070588, 127.37469104514605), // 초기 지도 중심 좌표
          level: 3, // 확대 레벨
        };

        const map = new kakao.maps.Map(container, options); // 지도 생성

        // 마커 추가
        const markerPosition = new kakao.maps.LatLng(36.28238783070588, 127.37469104514605); // 마커 위치
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map); // 마커를 지도에 표시
      });
    };
    document.head.appendChild(script);
  },
};
</script>

<style>

/* 제목 스타일 */
.location-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #0078ff;
  padding-bottom: 10px;
}

/* 지도 섹션 스타일 */
.map-wrapper {
  width: 100%; /* 부모 컨테이너의 전체 가로 길이 */
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.map {
  width: 100%; /* iframe의 가로 길이 최대화 */
  height: 800px; /* 고정 높이 */
  border: none;
}

/* 설명 폼 스타일 */
.info-wrapper {
  width: 100%; /* 부모 컨테이너의 전체 가로 길이 */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-title {
  font-size: 2rem;
  color: #0078ff;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.info-list {
  list-style: none;
  padding: 0;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
}

.info-list li {
  margin-bottom: 10px;
}
</style>
