<template>
 
  <h4>Product No.</h4>
  
    <ul class="itemNums">
      
      <li v-for="(item, index) in itemsNumList" :key="item" class="itemCard">
        <button @click="fetchItemDetails(item.manuId, item.itemId)">
          {{ itemsNumList[index].itemNum }}
        </button>
      </li>    
    </ul>
 
  <div v-if="items">
    <div class="container">
      <div class="image-container">
        <!-- TODO v-for 사용 해야됨 -->
        <img :src="`/item/${items.fileBoxes[0].fileName}`" alt="제품 이미지" />
      </div>
      <div class="info-container">
        <h1>{{ items.itemName }}</h1>
        <p>{{ items.itemDescription }}</p>
        <table>
          <tbody>
          <tr>
            <th>제조사</th>
            <td>{{ items.manuName }}</td>
          </tr>
          <tr>
            <th>용도</th>
            <td>{{ items.itemUse }}</td>
          </tr>

          <tr>
            <th>내부 색상</th>
            <td>{{ items.itemInColor }}</td>
          </tr>

          <tr>
            <th>외부 색상</th>
            <td>{{ items.itemOutColor }}</td>
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
</template>

<script>
import '../../assets/styles/manufact.css';
export default {
  name: 'Manufact',
  data() {
    return {
      items: null, 
      itemsNumList: [],
      manuId: null,
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
      try {
        console.log('manuId', manuId);
        const response = await this.$axios.get(`/items?manuId=${manuId}&itemId=${itemId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

       
        if (response.data.manuId === Number(this.manuId)) {
          this.items = response.data; 
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

<style>
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 20px;
}
</style>