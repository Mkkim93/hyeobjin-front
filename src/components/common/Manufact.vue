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

  // computed: {
  //   filteredItems() {
  //     return this.itemsNumList.filter(item => item.manuId === Number(this.manuId));
  //   },
  // },

  created() {
    this.manuId = this.$route.params.id;
    this.fetchItems(this.manuId);  
  },

  watch: {
    '$route.params.id': 'handleManuIdChange',
  },

  // mounted() {
  //   this.fetchItemDetails(itemId);
  // },

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

        const response = await this.$axios.get(`/items/numbers?manuId=${manuId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
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