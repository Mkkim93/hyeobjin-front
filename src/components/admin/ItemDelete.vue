<template>
    <p>제품 삭제 페이지 입니다.</p>
    <div class="max-w-4xl mx-auto my-10">
      <h1 class="text-2xl font-bold text-center mb-5">제품 목록</h1>
      
      <table class="w-full table-auto border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th>선택</th>
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
            <td>
              <input type="checkbox" class="ck" v-model="selectedIds" :value="item.itemId" />
            </td>
            <td class="border border-gray-300 p-2">{{ item.itemId }}</td>
            <td class="border border-gray-300 p-2">{{ item.itemNum }}</td>
  
            <td class="border border-gray-300 p-2">
            <p @click="$router.push({ name: 'ItemDetail', params: { itemId: item.itemId, manuId: item.manuId } })" tag="td">
            {{ item.itemName }}
            </p>
            </td>
  
            <td class="border border-gray-300 p-2">{{ item.itemType }}</td>
            <td class="border border-gray-300 p-2">{{ fomatDate(item.itemRegDate) }}</td>
            <td class="border border-gray-300 p-2">{{ fomatDate(item.itemUpdate) }}</td>
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
      <div>
        <button @click="handleSelectedItems">선택된 항목 삭제</button>
      </div>
    </div>
  </template>
  
  <script>
  import '../../assets/styles/admin.css';
  import dayjs from 'dayjs';
  export default {
      name: 'ItemDelete',
      data() {
      return {
        selectedIds: [], // 선택된 itemId들을 담을 배열
        ItemListData: [], 
        currentPage: 0, 
        totalPages: 10, 
        pageSize: 5,   
        selectedManu: '',
        filteredItemList: [],
      }
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
          this.filteredItemList = this.ItemListData; 
          this.currentPage = page;
          this.totalPages = response.data.totalPages;
        } catch (error) {
          console.log('page load error', error);
        }
      },
  
      filterByManu() {
        this.fetchItemList(this.currentPage); 
      },
  
      handleSelectedItems() {
        // 선택된 아이템들의 ID 출력
        console.log('선택된 itemId들:', this.selectedIds);
  
        // 예시: 선택된 ID들을 서버로 삭제 요청
        this.deleteItems(this.selectedIds);
      },
  
      async deleteItems(ids) {
        try {
          const response = await this.$axios.post('/admin/items/delete', ids);
          console.log('삭제 성공:', response);
          alert("제품의 삭제에 성공하였습니다.");
          this.fetchItemList(this.currentPage); // 삭제 후 데이터 다시 불러오기
        } catch (error) {
          console.error('삭제 실패:', error);
        }
      },

      fomatDate(date) {
        return dayjs(date).format('YYYY-MM-DD');
      },
    },
  }
  </script>
  
  <style>
  </style>