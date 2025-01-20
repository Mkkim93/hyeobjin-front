<template>
  <section class="location-container">
  
    <h2 class="location-title">찾아오시는 길</h2>
   
    <div class="map-wrapper">
     
      <div id="map" class="map"></div>
    </div>
   
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

  setup() {
   
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=893feef44fe943f2ac60e2fd3db808c7";
    script.onload = () => {
      kakao.maps.load(() => {
      
        const container = document.getElementById("map"); 
        const options = {
          center: new kakao.maps.LatLng(36.28238783070588, 127.37469104514605), 
          level: 3, 
        };

        const map = new kakao.maps.Map(container, options); 

        
        const markerPosition = new kakao.maps.LatLng(36.28238783070588, 127.37469104514605); 
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    };
    document.head.appendChild(script);
  },
};
</script>

<style>

.location-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #0078ff;
  padding-bottom: 10px;
}

.map-wrapper {
  width: 100%; 
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.map {
  width: 100%; 
  height: 800px; 
  border: none;
}


.info-wrapper {
  width: 100%; 
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
