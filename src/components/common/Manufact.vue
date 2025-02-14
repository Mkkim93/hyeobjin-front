<template>
   <!-- 상위 카테고리 네비게이션 -->
   

  <ManuIntro :step="Number(step)" />

  <nav class="category-nav">
    <ul>
      <button v-for="(types) in itemTypeList" :key="types.itemTypeId" @click="fetchItemNamesData(types.itemTypeId)"
        class="category-btn">
        {{ types.itemTypeName }}
      </button>
    </ul>
  </nav>

  <!-- 하위 소카테고리: 예시로 pill 형태 -->
  <nav class="sub-category-nav">
    <div class="product-versions">
      <ul>
        <!-- TODO 현재 위의 반복문과 KEY 값 중복으로 경고뜸 나중에 DTO 키 필드값 변경해야 할듯 -->
        <li v-for="(item, index) in itemTypeNames" :key="`${item.itemTypeId}-${index}`" class="itemCard">
          <button class="version-btn" @click="fetchItemDetails(item.itemId)">
            {{ item.itemName }}
          </button>
        </li>
      </ul>
    </div>
  </nav>

  <!-- 실제 제품 상세 영역 -->
  <div class="product-wrapper">
    <!-- 좌측 텍스트 영역 -->
    <div v-if="items">
      <div class="product-info">
        <h2 class="product-title">{{ items.itemName }}</h2>
        <div class="product-features">
          <strong>특징</strong>
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
                <td>{{ items.glassSize }}</td>
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
      <img :src="`/item/${items.fileBoxes[0].fileName}`" alt="제품 이미지" class="product-image" />
    </div>
    <div v-if="items">
      <div v-html="items.freeContent"></div>
    </div>
  </div>


</template>

<script>
import ManuIntro from './ManuIntro.vue';

export default {
  name: 'Manufact',
  data() {
    return {
      items: null,
      itemsNumList: [],
      manuId: null,
      step: null,
      imgBox: [],

      itemTypeList: [],
      itemTypeNames: [],

     

    };
  },

  props: ['id'],

  created() {
    console.log("Before manuId:", this.id); // ✅ 1. 확인
    this.manuId = this.id;
    console.log("After manuId:", this.id); // ✅ 2. 확인
    this.stepSave(this.id); // ✅ 3. 실행 후 step 값 확인

    console.log("After stepSave, step:", this.step); // ✅ 4. step 값이 변하는지 확인

    this.fetchItems(this.id);
    this.fetchItemTypeData(this.id);
  },


  watch: {
    id() {
      this.step = this.id;
    },

    '$route.params.id': 'handleManuIdChange',
  },

  components: {
    ManuIntro,
  },

  methods: {

    

    async handleManuIdChange() {
      this.items = null;
      this.itemsNumList = [];
      this.manuId = Number(this.$route.params.id);
      console.log(`now manuId: ${this.manuId}`);

      this.fetchItems(this.manuId);
      this.fetchItemTypeData(this.manuId);
    },

    async fetchItemTypeData(manuId) {


      try {
        const response = await this.$axios.get(`/type?manuId=${manuId}`);

        this.itemTypeList = response.data;
        console.log('itemTypeList', this.itemTypeList);

      } catch (error) {
        console.log('fetchItemTypeData error', error);
      }
    },

    async fetchItems(manuId) {
      this.itemTypeNames = null
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
      } catch (error) {
        console.error('Failed to fetch itemsList', error);
      }
    },

    async fetchItemDetails(itemId) {
      console.log('fetchItemDetails method start');
      try {
        const response = await this.$axios.get(`/items?itemId=${itemId}`, {
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

    async fetchItemNamesData(typeId) {

      try {
        const response = await this.$axios.get(`/type/category?itemTypeId=${typeId}&manuId=${this.manuId}`);
        this.itemTypeNames = response.data;
        console.log('this.itemTypeNames', this.itemTypeNames);
      } catch (error) {
        console.log('fetchItemNamesData error', error);
      }
    },

    async stepSave(manuId) {
      if (manuId == 1) {
        this.step = 1;
      } else if (manuId == 2) {
        this.step = 2;
      } else if (manuId == 3) {
        this.step = 3;
      }
      console.log('Updated step:', this.step);
    },
  },
};
</script>

<style scoped>
/* 전체 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f8f8f8;
}

/***** 🔹 상위 카테고리 네비게이션 (아이콘 & 버튼 스타일) *****/
.category-nav {
  display: flex;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.category-nav ul {
  display: flex;
  list-style: none;
  gap: 15px;
}

.category-btn {
  padding: 10px 20px;
  background-color: #fff;
  border: 2px solid #c2985e;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: #c2985e;
  transition: 0.3s;
}

.category-btn:hover {
  background-color: #c2985e;
  color: #fff;
}

/***** 🔹 하위 소카테고리 (Pill 형태) *****/
.sub-category-nav {
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
  padding: 10px 0;
}

.sub-category-nav ul {
  display: flex;
  list-style: none;
  gap: 10px;
}

.version-btn {
  background-color: #eee;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.version-btn.active {
  background-color: #c2985e;
  color: #fff;
}

/***** 🔹 제품 상세 페이지 (좌측 정보 & 우측 이미지) *****/
.product-wrapper {
  display: flex;
  justify-content: space-between;
  /* ✅ 좌측(텍스트) + 우측(이미지) 정렬 */
  align-items: flex-start;
  /* ✅ 위쪽 정렬 */
  max-width: 1200px;
  margin: 2rem auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 좌측 텍스트 영역 */
.product-info,
.product-image-area {
  flex: 1 1 100%;
  /* ✅ 전체 너비 사용 */
}



.product-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-features ul {
  list-style: disc;
  padding-left: 20px;
}

.product-spec table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.product-spec th {
  width: 30%;
  text-align: left;
  color: #666;
  padding: 8px;
  font-weight: bold;
}

.product-spec td {
  padding: 8px;
}

/* 우측 이미지 영역 */


/* 제품 이미지 크기 고정 */
.product-image {
  width: 100%;
  /* ✅ 고정된 크기 유지 */
  max-width: 400px;
  /* ✅ 최대 크기 제한 */
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/***** 🔹 반응형 디자인 *****/
/***** 🔹 반응형 디자인 *****/
@media (max-width: 768px) {
  .product-wrapper {
    flex-direction: column;
    /* ✅ 모바일에서 세로 배치 */
    align-items: center;
    /* ✅ 중앙 정렬 */
  }

  .category-nav ul,
  .sub-category-nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }
}



.product-info {
  flex: 1;
  /* ✅ 왼쪽 영역이 자동으로 확장됨 */
  padding: 20px;
}



/* 우측 이미지 영역 */
.product-image-area {
  flex: 0 0 400px;
  /* ✅ 고정된 너비 설정 */
  display: flex;
  justify-content: flex-end;
  /* ✅ 오른쪽 정렬 */
  align-items: center;
  padding: 20px;
}

/***** 🔹 반응형 디자인 *****/
@media (max-width: 768px) {
  .product-wrapper {
    flex-direction: column;
    /* ✅ 모바일에서 세로 배치 */
    align-items: center;
    /* ✅ 중앙 정렬 */
  }

  .product-info,
  .product-image-area {
    flex: 1 1 100%;
    /* ✅ 전체 너비 사용 */
    text-align: center;
    /* ✅ 텍스트 중앙 정렬 */
  }

  .product-image-area {
    justify-content: center;
    /* ✅ 모바일에서는 중앙 정렬 */
  }
}

/***** 🔹 상위 카테고리 네비게이션 바 (메인) *****/

</style>