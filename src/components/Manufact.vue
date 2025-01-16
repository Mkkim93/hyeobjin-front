<template>
  <!-- 선택된 품번의 상세 데이터 표시 -->

  <h4>Product No.</h4>
  
    <ul class="itemNums">
      <!-- 품번 리스트를 반복문으로 나열 -->

      <li v-for="(item, index) in itemsNumList" :key="item" class="itemCard">
        
        <!-- <p>{{ item.manuId }}</p> -->
        <!-- 클릭 시 fetchItemDetails(item.itemId) 호출 -->
        
        <button @click="fetchItemDetails(item.manuId, item.itemId)">
          {{ itemsNumList[index].itemNum }}
        </button>
      </li>
    
    </ul>
 
  <div v-if="items">
    <div class="container">
      <div class="image-container">
        <img :src="`/${items.fileBoxes[0].fileName}`" alt="제품 이미지" />
       <p>{{items.fileBoxes[0].fileName}}</p>
      </div>
      <div class="info-container">
        <h1>{{ items.itemName }}</h1>
        <p>{{ items.itemDescription }}</p>
        <table>
          <tr>
            <th>제조사</th>
            <td>{{ items.manuName }}</td>
          </tr>
          <tr>
            <th>원산지</th>
            <td>{{ items.itemUse }}</td>
          </tr>
          <tr>
            <th>컬러</th>
            <td>{{ items.itemInColor }}</td>
          </tr>
          <tr>
            <th>추천공간</th>
            <td>{{ items.itemSpec }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Manufact',
  data() {
    return {
      items: null,  // 품번 리스트
      itemsNumList: [],
      manuId: null,
    };
  },

  // computed: {
  //   filteredItems() {
  //     return this.itemsNumList.filter(item => item.manuId === Number(this.manuId));
  //   },
  // },

  created() {
    this.manuId = this.$route.params.id;
    this.fetchItems(this.manuId);  // 페이지가 로드되면 품번 리스트를 가져옴
  },

  watch: { // 특정 데이터가 변할 때 수행되는 메서드
    '$route.params.id': 'handleManuIdChange',
  },

  // mounted() {
  //   this.fetchItemDetails(itemId);
  // },

  methods: {
    handleManuIdChange() {
      // manuId가 변경될 때마다 초기화하고 데이터를 다시 가져옴
      this.items = null;  // 품번 상세 데이터를 초기화
      this.itemsNumList = [];  // 품번 리스트 초기화
      this.manuId = this.$route.params.id;  // 새로운 manuId 할당
      console.log(`now manuId: ${this.manuId}`);
      this.fetchItems(this.manuId);  // 새로운 manuId로 품번 리스트를 가져옴
    },
    // 품번 리스트를 API에서 가져오는 메서드
    async fetchItems(manuId) {
      try {

        const response = await this.$axios.get(`/items/numbers?manuId=${manuId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.itemsNumList = response.data;  // 품번 리스트 저장
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
      try {
        console.log('manuId', manuId);
        const response = await this.$axios.get(`/items?manuId=${manuId}&itemId=${itemId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // response에서 manuId가 현재 조건에 맞는지 확인
        if (response.data.manuId === Number(this.manuId)) {
          this.items = response.data; // 조건을 만족하면 items에 저장
          console.log('response.data', response.data);
        } else {
          console.log(`manuId ${response.data.manuId} does not match ${this.manuId}`);
        }
      } catch (error) {
        console.log('error', error);
        this.items = {};
      }
    }
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 20px;
}

h4 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.itemNums {
  display: flex;
  flex-wrap: white-space;
  /* 가로로 배치하되, 공간이 부족하면 자동으로 줄바꿈 */
  gap: 20px;
  /* 카드 간의 간격 */
  list-style: none;
  padding: 0;
}

.itemCard {
  background-color: #f4f4f4;
  border-radius: 8px;
  width: 200px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.itemCard:hover {
  transform: translateY(-10px);
  /* hover 시 살짝 위로 떠오르는 효과 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

button {
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  background-color: #007BFF;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.image-container {
  flex: 1;
  min-width: 200px;
}

.image-container img {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  background: #fff;
}

.info-container {
  flex: 2;
  min-width: 300px;
}

.info-container h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.info-container p {
  margin-bottom: 15px;
  color: #555;
}

.info-container table {
  width: 80%;
  border-collapse: collapse;
  margin-top: 10px;
}

.info-container table th,
.info-container table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.info-container table th {
  background-color: #f4f4f4;
}
</style>