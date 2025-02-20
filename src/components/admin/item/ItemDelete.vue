<template>
  <h1 class="text-2xl font-bold text-center mb-5">제품삭제 페이지</h1>

  <div class="max-w-4xl mx-auto my-10">
    <p>현재 페이지: {{ currentPage + 1 }} / {{ totalPages }}</p>
    <table class="w-full table-auto border-collapse border border-gray-300">
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 p-2">선택</th>
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
        <tr v-for="item in ItemListData.content" :key="item.itemId" class="text-center hover:bg-gray-100">
          <td class="border border-gray-300 p-2">
            <input type="checkbox" class="ck" v-model="selectedIds" :value="item.itemId" />
          </td>
          <td class="border border-gray-300 p-2">{{ item.itemId }}</td>
          <td class="border border-gray-300 p-2">{{ item.itemNum }}</td>

          <td class="border border-gray-300 p-2">
            <p @click="$router.push({ name: 'ItemDetail', params: { itemId: item.itemId, manuId: item.manuId } })"
              tag="td">
              {{ item.itemName }}
            </p>
          </td>

          <td class="border border-gray-300 p-2">{{ item.itemType }}</td>
          <td class="border border-gray-300 p-2">{{ fomatDate(item.itemRegDate) }}</td>
          <td class="border border-gray-300 p-2">{{ fomatDate(item.itemUpdate) }}</td>
          <td class="border border-gray-300 p-2">{{ item.itemYN === 'Y' ? '등록' : '미등록' }}</td>
          <td class="border border-gray-300 p-2">{{ item.manuName }}</td>
        </tr>
      </tbody>
    </table>

    <div>
      <button :disabled="currentPage === 0" @click="fetchItemList(currentPage - 1)">이전</button>
      <button :disabled="currentPage === totalPages - 1" @click="fetchItemList(this.currentPage + 1)">다음</button>

    </div>
    <div>
      <button @click="handleSelectedItems">선택된 항목 삭제</button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'ItemDelete',
  data() {
    return {
      selectedManu: '',

      selectedIds: [],
      ItemListData: [],
      filteredItemList: [],

      currentPage: 0,
      totalPages: 10,
      pageSize: 5,
    }
  },



  mounted() { this.fetchItemList(this.currentPage); },

  methods: {

    async fetchItemList(page) {
      try {
        const response = await this.$axios.get(`/admin/items?page=${page}&size=${this.pageSize}&manuName=${this.selectedManu || ''}`, {
          headers: { "Content-Type": "application/json" }
        });

        this.ItemListData = response.data;
        this.filteredItemList = this.ItemListData;

        this.currentPage = page;
        this.totalPages = response.data.totalPages;

      } catch (error) {
        console.error('fetchItemList error: ', error);
      }
    },

    filterByManu() {
      this.fetchItemList(this.currentPage);
    },

    handleSelectedItems() {
      this.deleteItems(this.selectedIds);
    },

    async deleteItems(deleteIds) {

      const isConfirmed = confirm('삭제 시 모든 제품 정보와 파일정보가 삭제됩니다. 계속 하시겠습니까?');

      if (isConfirmed) {

        try {
          await this.$axios.delete('/admin/items', { data: deleteIds });

          alert("제품이 삭제 되었습니다.");
    
          this.fetchItemList(this.currentPage);
        
        } catch (error) {
          console.error('deleteItems error: ', error);
        }
      } else {
        alert('삭제가 취소 되었습니다.');
      }

    },

    fomatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
  },
}
</script>