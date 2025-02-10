<template>
  <nav class="category-nav">
    <ul>
      <li><a href="#!">단창</a></li>
      <li><a href="#!">터닝도어</a></li>
    </ul>
  </nav>

  <!-- 하위 소카테고리: 예시로 pill 형태 -->
  <nav class="sub-category-nav">
    <div class="product-versions">
        <ul>
          <li
            v-for="(item, index) in itemsNumList"
            :key="item.itemNum"
            class="itemCard"
          >
            <!-- 클릭된 버튼만 active 클래스를 부여 -->
            <button
              class="version-btn"
              :class="{ active: selectedIndex === index }"
              @click="fetchItemDetails(item.manuId, item.itemId)">
              {{ item.itemNum }}
            </button>
          </li>
        </ul>
      </div>
  </nav>

  <!-- 실제 제품 상세 영역 -->
  <div class="product-wrapper">
    <!-- 좌측 텍스트 영역 -->
    <div class="product-info">
      <!-- 상단 탭 버튼 예시 (itemsNumList) -->
      

      <!-- items가 존재할 때만 상세 영역 표시 -->
      <div v-if="items">
        <h2 class="product-title">{{ items.itemName }}</h2>
        <div class="product-features">
          <h3>특징</h3>
          <ul>
            <li>{{ items.itemDescription }}</li>
          </ul>
        </div>

        <div class="product-spec">
          <table>
            <tbody>
              <tr>
                <th>제품 용도</th>
                <td>{{ items.itemUse }}</td>
              </tr>
              <tr>
                <th>COLOR</th>
                <td>
                  <p>외부: {{ items.itemOutColor }}</p>
                  <p>내부: {{ items.itemInColor }}</p>
                </td>
              </tr>
              <tr>
                <th>유리사용두께</th>
                <td>{{ items.itemSpec }}</td>
              </tr>
              <tr>
                <th>창틀 폭</th>
                <td>{{ items.itemFrameWidth }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 우측 이미지 영역 -->
    <div class="product-image-area" v-if="items && items.fileBoxes && items.fileBoxes.length > 0">
      <img
        :src="`/item/${items.fileBoxes[0].fileName}`"
        alt="제품 이미지"
      />
    </div>
    <div v-if="items">
    
          <div v-html="items.freeContent"></div>
        </div>
      </div>
    
</template>

<script>


export default {
  name: 'Manufact',
  data() {
    return {
      items: null,
      itemsNumList: [],
      manuId: null,
      step: 0,
      imgBox: [],
    };
  },

  created() {
    this.manuId = this.$route.params.id;
    this.fetchItems(this.manuId);
  },

  watch: {
    '$route.params.id': 'handleManuIdChange',
  },

  methods: {
    handleManuIdChange() {
      this.items = null;
      this.itemsNumList = [];
      this.manuId = this.$route.params.id;
      console.log(`now manuId: ${this.manuId}`);
      this.fetchItems(this.manuId);
    },

    async fetchItems(manuId) {
      try {
        // get 요청 시 json type 명시를 생략 가능 (단, post, put 요청 시에는 명시하는 것이 일반적)
        const response = await this.$axios.get(`/items/numbers?manuId=${manuId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // await 를 사용해서 get(`/items/numbers?manuId...`) 가 완료될때까지 다음 코드를 중단 시킨다.
        // 즉, this.itemsNumList = response.data 가 실행되기 전에 get 요청을 기다리게 한다.
        this.itemsNumList = response.data;
        console.log('response', response);
        console.log('response-data', response.data);
        console.log('this.itemsNumList', this.itemsNumList);
      } catch (error) {
        console.error('Failed to fetch itemsList');
        console.log('response', response);
        console.log('response-data', response.data);
      }
    },

    async fetchItemDetails(manuId, itemId) {
      console.log('fetchItemDetails method start');
      try {
        console.log('manuId', manuId);
        const response = await this.$axios.get(`/items?manuId=${manuId}&itemId=${itemId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.data.manuId === Number(this.manuId)) {
          this.items = response.data;
          this.imgBox = response.data.fileBoxes;
          console.log('response.data', response.data);
          console.log('this.imgBox', this.imgBox);
        } else {
          console.log(`manuId ${response.data.manuId} does not match ${this.manuId}`);
        }
      } catch (error) {
        console.log('error', error);
        this.items = {};
      }
    },


  },
};
</script>

<style scoped>
/***** 전체 리셋 & 기본 설정 *****/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  color: #333;
  background-color: #f8f8f8;
}

/***** 상단 큰 카테고리 *****/
.category-nav {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.category-nav ul {
  display: flex;
  list-style: none;
  padding: 0.5rem 1rem;
}

.category-nav li {
  margin-right: 1.5rem;
}

.category-nav a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem;
  font-weight: 500;
}

/***** 하위 소카테고리 (pill 형태) *****/
.sub-category-nav {
  background-color: #f9f9f9;
  padding: 0.5rem 1rem;
}

.sub-category-nav ul {
  display: flex;
  list-style: none;
}

.sub-category-nav li {
  margin-right: 1rem;
}

.sub-category-nav a {
  text-decoration: none;
  padding: 0.4rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  color: #555;
  font-size: 0.9rem;
}

.sub-category-nav a.active {
  background-color: #000;
  border-color: #000;
  color: #fff;
}

/***** 제품 상세 메인 컨테이너 *****/
.product-wrapper {
  display: flex;
  flex-wrap: wrap;
  /* 반응형 고려 */
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;
  /* 임의로 그림자 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/***** 좌측 텍스트 영역 *****/
.product-info {
  flex: 1 1 50%;
  /* 기본적으로 절반 넓이 */
  padding: 1rem;
}

.product-versions {
  margin-bottom: 1rem;
}

.version-btn {
  background-color: #eee;
  border: none;
  padding: 0.4rem 0.8rem;
  margin-right: 0.5rem;
  cursor: pointer;
  border-radius: 20px;
  font-size: 0.9rem;
}

.version-btn.active {
  background-color: #c2985e;
  /* 골드톤 예시 */
  color: #fff;
  border: none;
}

.product-title {
  margin: 1rem 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.product-features ul {
  list-style: disc;
  padding-left: 1.2rem;
  margin-top: 0.5rem;
  line-height: 1.6;
}

.product-spec table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;
}

.product-spec th,
.product-spec td {
  padding: 0.5rem;
  vertical-align: top;
  text-align: left;
}

.product-spec th {
  width: 30%;
  white-space: nowrap;
  color: #666;
}

.product-spec td p {
  margin-bottom: 0.3rem;
}

/***** 우측 이미지 영역 *****/
.product-image-area {
  flex: 1 1 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.product-image-area img {
  max-width: 90%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.image-container img{
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.itemCard {
  list-style: none;
}

.product-versions ul {
  display: flex;        /* 수평으로 배치 */
  align-items: center;  /* 세로 정렬 (옵션) */
  gap: 0.5rem;            /* 아이템 간 간격 1rem */
  list-style: none;     /* 불필요한 기본 li 스타일 제거 */
  margin: 0;            /* ul 기본 여백 제거 */
  padding: 0;           /* ul 기본 패딩 제거 */
}

.version-btn {
  background-color: #eee;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.version-btn.active {
  background-color: #c2985e; /* 선택 상태 배경색 */
  color: #fff;
}

/* 마우스 오버 시 hover 효과 */
.version-btn:hover {
  background-color: #ccc; /* 원하는 컬러로 변경 */
  color: #333;            /* hover 시 텍스트 색상 */
}
</style>