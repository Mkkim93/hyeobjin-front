<template>
  <div class="max-w-4xl mx-auto my-10">
    <h1 class="text-2xl font-bold text-center mb-5">제품 목록</h1>
    <table class="w-full table-auto border-collapse border border-gray-300">
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 p-2">No</th>
          <th class="border border-gray-300 p-2">품번</th>
          <th class="border border-gray-300 p-2">제품명</th>
          <th class="border border-gray-300 p-2">타입</th>
          <th class="border border-gray-300 p-2">등록일</th>
          <th class="border border-gray-300 p-2">최근수정일</th>
          <th class="border border-gray-300 p-2">등록여부</th>
          <th class="border border-gray-300 p-2">제조사명</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in ItemListData.content" :key="item.id" class="text-center hover:bg-gray-100">
          <td class="border border-gray-300 p-2">{{ item.itemId }}</td>
          <td class="border border-gray-300 p-2">{{ item.itemNum }}</td>
          <td class="border border-gray-300 p-2">{{ item.itemName }}</td>
          <td class="border border-gray-300 p-2">{{ item.itemType }}</td>
          <td class="border border-gray-300 p-2">{{ item.itemRegdate }}</td>
          <td class="border border-gray-300 p-2">{{ item.itemUpdate }}</td>
          <td class="border border-gray-300 p-2">{{ item.itemYN }}</td>
          <td class="border border-gray-300 p-2">{{ item.manuName }}</td>
        </tr>
      </tbody>
    </table>
    
    <div>
      <button :disabled="currentPage === 0" @click="fetchItemList(currentPage - 1)">이전</button>
      <button :disabled="currentPage === totalPages - 1" @click="fetchItemList(currentPage + 1)">다음</button>
      <p>현재 페이지: {{ currentPage + 1 }} / {{ totalPages }}</p>
    </div>

  </div>
</template>

<script>
import '../../assets/styles/admin.css';

export default {
  name: 'ItemManagement',
  data() {
    return {
      ItemListData: [],
      currentPage: 1, // 현재 페이지
      totalPages: 10, // 전체 페이지 수
      pageSize: 5,   // 페이지 크기
    }
  },
  setup() {
    console.log('ItemMangement 페이지가 로드되었습니다.');
  },
  
  mounted() {
    this.fetchItemList(this.currentPage);
  },

  methods: {
    async fetchItemList(page) {
      try {
        const response = await this.$axios.get(`/admin/items?=page${page}&size=${this.pageSize}&manuName=${"KCC"}`);
        
        this.ItemListData = response.data;
        this.currentPage = page;
        this.totalPages = response.data.totalPages;
        console.log(response);
      } catch (error) {
        console.log('page load error', error);
      }
    }
  },
  
}

</script>

<style>

</style>