<template>
    <p>이미지가 들어갈 곳입니다.</p>
    <!-- 이미지 출력 영역 -->
    <div class="image-gallery">
      <div 
        class="image-box" 
        v-for="(item, index) in items" 
        :key="index"
        :style="{ backgroundImage: `url(${item.imgUrl})` }">
        <!-- 이미지 배경으로 설정 -->
      </div>
    </div>
 
  </template>
  
  <script>
  export default {
    name: 'ItemImgBox',
    props: {
        items: Array
    },
    created() {
      console.log('itemsNumList:', this.items);  // 여기서 데이터 확인
    }
  }
  </script>

  <style>
</style>