<template>

  <ManuIntro :step="Number(step)" />

  <section class="container bg-light rounded shadow-lg my-5">
    <nav class="category-nav">
      <ul>
        <button v-for="(types) in itemTypeList" :key="types.itemTypeId" @click="fetchItemNamesData(types.itemTypeId)"
          class="category-btn">
          {{ types.itemTypeName }}
        </button>
      </ul>
    </nav>

    <nav class="sub-category-nav py-5">
      <div class="product-versions">
        <ul>
          <li v-for="(item, index) in itemTypeNames" :key="`${item.itemTypeId}-${index}`" class="itemCard">
            <button class="version-btn" @click="fetchItemDetails(item.itemId)">
              {{ item.itemName }}
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <transition name="slide-fade">

      <div class="product-wrapper py-5" v-if="items">
        <div class="product-info">
          <h2 class="product-title">{{ items.itemName + ' (' + items.itemNum + ')' }}</h2>
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

        <div class="product-image-area" v-if="items && items.fileBoxes && items.fileBoxes.length > 0">
          <img :src="`/item/${items.fileBoxes[0].fileName}`" alt="제품 이미지" class="product-image" />
        </div>

      </div>

    </transition>
    <div v-if="items" class="free-content">
            <div v-html="items.freeContent"></div>
    </div>
  </section>
</template>
<script>
import { nextTick } from 'vue';
import ManuIntro from './ManuIntro.vue';

export default {
  name: 'Manufact',
  props: ['id'],
  data() {
    return {
      items: null,
      manuId: null,
      step: null,

      imgBox: [],
      itemsNumList: [],
      itemTypeList: [],
      itemTypeNames: [],
    };
  },

  components: {
    ManuIntro,
  },

  created() {
    this.manuId = this.id;
    this.stepSave(this.id);
    this.fetchItems(this.id);
    this.fetchItemTypeData(this.id).then(() => {
      if (this.itemTypeList.length > 0) {
        this.fetchItemNamesData(this.itemTypeList[0].itemTypeId);
      }
    });
  },

  watch: {
    id() {
      this.step = this.id;
    },
    '$route.params.id': 'handleManuIdChange',
  },

  methods: {
    async handleManuIdChange() {
      this.items = null;
      this.itemsNumList = [];
      this.manuId = Number(this.$route.params.id);
      this.fetchItems(this.manuId);
      this.fetchItemTypeData(this.manuId);
    },

    async fetchItemTypeData(manuId) {
      try {
        const response = await this.$axios.get(`/type?manuId=${manuId}`);

        this.itemTypeList = response.data;

      } catch (error) {
        console.error('fetchItemTypeData error: ', error);
      }
    },

    async fetchItems(manuId) {
      this.itemTypeNames = null
      try {
        const response = await this.$axios.get(`/items/numbers?manuId=${manuId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        this.itemsNumList = response.data;

      } catch (error) {
        console.error('fetchItems error: ', error);
      }
    },

    async fetchItemDetails(itemId) {
      try {
        this.items = null;
        await nextTick();

        const response = await this.$axios.get(`/items?itemId=${itemId}`, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.data.manuId === Number(this.manuId)) {
          this.items = response.data;
          this.imgBox = response.data.fileBoxes;
        } else {
          console.log(`manuId ${response.data.manuId} does not match ${this.manuId}`);
        }
      } catch (error) {
        console.error('fetchItemDetails error: ', error);
        this.items = {};
      }
    },

    async fetchItemNamesData(typeId) {
      try {
        const response = await this.$axios.get(`/type/category?itemTypeId=${typeId}&manuId=${this.manuId}`);

        this.itemTypeNames = response.data;

      } catch (error) {
        console.error('fetchItemNamesData error: ', error);
      }
    },

    async stepSave(manuId) {
      if (manuId == 1) { this.step = 1; }
      else if (manuId == 2) { this.step = 2; }
      else if (manuId == 3) { this.step = 3; }
    },
  },
};
</script>
<style scoped>
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

.category-btn:hover {
  background-color: #c2985e;
  color: #fff;
}

.category-btn.active {
  background-color: #c2985e;
  color: #fff;
  border: 2px solid #c2985e;
}

.sub-category-nav {
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
  padding: 10px 0;
}


.free-content {
  flex: 1 1 100%; /* 부모 flex에 맞춰 정렬 */
  width: 100%; /* 부모 요소의 전체 너비 사용 */
  max-width: 1200px; /* 너무 커지지 않도록 제한 */
  margin: 20px auto; /* 가운데 정렬 */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  overflow-x: hidden; /* 가로 스크롤 방지 */
  word-wrap: break-word; /* 긴 단어 자동 줄바꿈 */
  word-break: break-word; /* 단어가 너무 길어도 줄바꿈 */
}

/* ✅ free-content 내부 이미지 반응형 적용 */
.free-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #ddd;
}

/* ✅ 반응형 적용: 화면이 작아질 경우 여백 및 크기 조정 */
@media (max-width: 1024px) {
  .free-content {
    padding: 15px;
    max-width: 90%; /* 화면이 줄어들면 너비 조정 */
  }
}

@media (max-width: 768px) {
  .free-content {
    padding: 10px;
    max-width: 100%; /* 작은 화면에서는 전체 너비 사용 */
    text-align: left; /* 좌측 정렬 */
  }

  .free-content img {
    max-width: 100%; /* 모바일에서 너비 최적화 */
  }
}


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

.version-btn:hover {
  background-color: #c2985e;
  color: #fff;
}

.version-btn.active {
  background-color: #c2985e;
  color: #fff;
}

.product-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.product-info,
.product-image-area {
  flex: 1 1 100%;
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

.product-image {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .product-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .category-nav ul,
  .sub-category-nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }
}

.product-info {
  flex: 1;
  padding: 20px;
  min-width: 300px;
}

.product-image-area {
  flex: 0 0 400px;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .product-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .product-info,
  .product-image-area {
    flex: 1 1 100%;
    text-align: center;
  }

  .product-image-area {
    justify-content: center;
    max-width: 100%;
  }
}

.slide-fade-enter-active {
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* ✅ 반응형 스타일 */
@media (max-width: 768px) {
  .category-nav ul,
  .sub-category-nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }

  .category-btn,
  .version-btn {
    font-size: 14px;
    padding: 6px 12px;
  }
}
</style>