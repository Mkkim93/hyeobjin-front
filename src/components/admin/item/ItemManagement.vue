<template>
  <div class="max-w-5xl mx-auto my-10">


    <p class="d-inline-flex gap-1">
      <button class="btn btn-dark" @click="itemAddForm">제품 등록</button>
      <a href="#" class="btn btn-secondary active" role="button" data-bs-toggle="button" aria-pressed="true"
        @click="itemDeleteForm">{{ deleteYN }}</a>

    </p>
    <div v-show="handleSelected">
      <button class="btn btn-outline-danger my-1" @click="handleSelectedItems">선택한 제품 삭제</button>
    </div>
    <div class="bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold text-center mb-6">제품 목록</h1>
      <p class="text-center">현재 페이지: {{ currentPage + 1 }} / {{ totalPages }}</p>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300 table table-hover">
          <thead class="bg-gray-200">
            <tr>
              <th class="border border-gray-300 p-2" v-if="showCheckBox">
                <input type="checkbox" v-model="allSelected" @change="toggleSelectAll"> 전체선택
              </th>
              <th class="border border-gray-300 p-2">No</th>
              <th class="border border-gray-300 p-2">품번</th>
              <th class="border border-gray-300 p-2">제품명</th>
              <th class="border border-gray-300 p-2">타입</th>
              <th class="border border-gray-300 p-2">등록일</th>
              <th class="border border-gray-300 p-2">최근수정일</th>
              <th class="border border-gray-300 p-2">등록여부</th>
              <th class="border border-gray-300 p-2">
                제조사명
                <select v-model="selectedManu" @change="filterByManu" class="border p-1 rounded-md ml-2">
                  <option value="">전체</option>
                  <option v-for="manu in newManuList" :key="manu.manuId" :value="manu.manuName">
                    {{ manu.manuName }}
                  </option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, count) in ItemListData" :key="item.itemId" class="text-center hover:bg-gray-100">
              <td class="border border-gray-300 p-2" v-if="showCheckBox">
                <input type="checkbox" v-model="selectedItems" :value="item.itemId">
              </td>
              <td class="border border-gray-300 p-2">{{ this.currentPage * this.pageSize + count + 1 }}</td>
              <td class="border border-gray-300 p-2">{{ item.itemNum }}</td>
              <td class="border border-gray-300 p-2">
                <router-link :to="`/admin/item/${item.itemId}`" class="text-blue-500 hover:underline cursor-pointer">
                  {{ item.itemName }}
                </router-link>
              </td>
              <td class="border border-gray-300 p-2">{{ item.itemType }}</td>
              <td class="border border-gray-300 p-2">{{ formatDate(item.itemRegDate) }}</td>
              <td class="border border-gray-300 p-2">{{ formatDate(item.itemUpdate) }}</td>
              <td class="border border-gray-300 p-2">{{ item.itemYN === true ? '등록' : '미등록' }}</td>
              <td class="border border-gray-300 p-2">{{ item.manuName }}</td>
            </tr>
          </tbody>
        </table>

      </div>

      <div class="container d-flex flex-column align-items-center my-3">

        <nav aria-label="Page navigation example">
          <ul class="flex space-x-2">
            <li class="page-item" :class="{ 'opacity-50 pointer-events-none': currentPage === 0 }">
              <a class="px-3 py-2 border rounded-md cursor-pointer" @click.prevent="changePage(currentPage - 1)">이전</a>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item"
              :class="{ 'font-bold text-blue-500': currentPage === page - 1 }">
              <a class="px-3 py-2 border rounded-md cursor-pointer" @click.prevent="changePage(page - 1)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ 'opacity-50 pointer-events-none': currentPage === totalPages - 1 }">
              <a class="px-3 py-2 border rounded-md cursor-pointer" @click.prevent="changePage(currentPage + 1)">다음</a>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'ItemManagement',
  data() {
    return {
      selectedManu: '',
      deleteYN: '제품선택',

      showCheckBox: false,
      allSelected: false,
      handleSelected: false,

      ItemListData: [],
      filteredItemList: [],
      selectedItems: [],
      newManuList: [],

      currentPage: 0,
      totalPages: null,
      pageSize: 5,
      pageData: null,
    };
  },

  created() {
    this.fetchItemList(this.currentPage);
    this.manuListData();
  },

  watch: {
    selectedItems() {
      this.allSelected = this.selectedItems.length === this.ItemListData.length;
    }
  },



  methods: {

    async fetchItemList(page) {

      try {
        const params = {
          page: page,
          size: this.pageSize,
        };

        if (this.selectedManu) {
          params.manuName = this.selectedManu || '';
        }

        const response = await this.$axios.get(`/admin/items`, {
          params,
          headers: { "Content-Type": "application/json" }
        });

        this.ItemListData = response.data.content;
        this.filteredItemList = this.ItemListData;

        this.pageData = response.data;
        this.totalPages = this.pageData.totalPages;

      } catch (error) {
        console.error('fetchItemList error: ', error);
      }
    },

    async manuListData() {

      try {
        const response = await this.$axios.get('/admin/manu/list');

        this.newManuList = response.data;

      } catch (error) {
        console.error('manuListData error: ', error);
      }
    },

    filterByManu() {
      this.fetchItemList();
    },

    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },

    changePage(pageNumber) {
      if (pageNumber >= 0 && pageNumber < this.totalPages) {
        this.currentPage = pageNumber;
        this.fetchItemList(this.currentPage);
      }
    },

    itemAddForm() {
      this.$router.push('/admin/add');
    },

    itemDeleteForm() {
      this.handleSelected = true;

      if (this.deleteYN === '제품선택') {
        this.deleteYN = '취소';
      }

      else if (this.deleteYN === '취소') {
        this.handleSelected = false;
        this.deleteYN = '제품선택';
      }

      this.showCheckBox = !this.showCheckBox;
      if (!this.showCheckBox) {
        this.selectedItems = [];
      }
    },

    async toggleSelectAll() {

      if (this.allSelected) {
        this.selectedItems = this.ItemListData.map(item => item.itemId);
      } else {
        this.selectedItems = [];
      }
    },

    async handleSelectedItems() {
      this.deletedItems(this.selectedItems);
    },

    async deletedItems(ids) {

      const inConfirmed = confirm('삭제 시 모든 제품 정보와 파일 정보가 삭제됩니다. 계속 하시겠습니까?');

      if (inConfirmed) {
        try {

          await this.$axios.delete(`/admin/items`,
            { data: ids })

          alert('제품이 성공적으로 삭제 되었습니다.');
          this.$router.push('/admin/item');

        } catch (error) {
          console.error('deletedItems error: ', error);
        }
      }
    },
  }
}
</script>
<style scoped>
.bg-white {
  background-color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

th,
td {
  padding: 8px;
  text-align: center;
}

.page-item {
  display: inline-block;
  margin: 0 4px;
}

.page-item a {
  text-decoration: none;
  color: #333;
  padding: 6px 12px;
}

.page-item a:hover {
  background-color: #f3f3f3;
}

.page-item .font-bold {
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}
</style>
