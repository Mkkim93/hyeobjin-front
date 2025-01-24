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
          <th class="border border-gray-300 p-2">제조사명
            <select v-model="selectedManu" @change="filterByManu" class="border p-1">
              <option value=""></option>
              <option value="KCC">KCC</option>
              <option value="예림">예림</option>
              <option value="휴그린">휴그린</option>
              <!-- 필요에 따라 제조사 옵션 추가 -->
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in ItemListData.content" :key="item.itemId" class="text-center hover:bg-gray-100">
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
      <button :disabled="currentPage === totalPages - 1" @click="fetchItemList(this.currentPage + 1)">다음</button>
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
      // 기본 페이지 값 데이터가 넘어오면 컨트롤러에서 지정한 페이징 데이터 비동기 응답
      currentPage: 0, // 현재 페이지
      totalPages: 10, // 전체 페이지 수
      pageSize: 5,   // 페이지 크기

      selectedManu: '',
      filteredItemList: [],
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
        const response = await this.$axios.get(`/admin/items?page=${page}&size=${this.pageSize}&manuName=${this.selectedManu || ''}`, {
          headers: {
            "Content-Type": "application/json",
          }
        });
      
        this.ItemListData = response.data;
        this.filteredItemList = this.ItemListData; // 초기에는 모든 데이터를 표시
        this.currentPage = page;
        this.totalPages = response.data.totalPages;
        console.log(response);
      } catch (error) {
        console.log('page load error', error);
      }
    },

    filterByManu() {
      // 선택된 제조사로 데이터를 필터링
      this.fetchItemList(this.currentPage); // 제조사명 변경 시 다시 데이터 로드
    }
  },
  
}

</script>

<style>

</style>