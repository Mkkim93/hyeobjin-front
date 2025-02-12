<template>
  <div class="max-w-5xl mx-auth my-10">
    <button @click="itemAddForm">제품 등록</button>

   
    <button @click="itemDeleteForm">{{deleteYN}}</button>


    <div v-show="handleSelected">
      <button @click="handleSelectedItems">선택한 제품 삭제</button>
    </div>
    <!-- 카드 스타일 섹션 -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold text-center mb-6">제품 목록</h1>
      <p class="text-center">현재 페이지: {{ currentPage + 1 }} / {{ totalPages }}</p>

      <!-- 제품 목록 테이블 -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300">
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
                  <option v-for="manu in updateManufactList" :key="manu.manuId" :value="manu.manuName">
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
                <p @click="$router.push(`/admin/item/${item.itemId}`)"
                  class="cursor-pointer text-blue-500 hover:underline">
                  {{ item.itemName }}
                </p>
              </td>
              <td class="border border-gray-300 p-2">{{ item.itemType }}</td>
              <td class="border border-gray-300 p-2">{{ formatDate(item.itemRegDate) }}</td>
              <td class="border border-gray-300 p-2">{{ formatDate(item.itemUpdate) }}</td>
              <td class="border border-gray-300 p-2">{{ item.itemYN === TRUE ? '등록' : '미등록' }}</td>
              <td class="border border-gray-300 p-2">{{ item.manuName }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 페이지네이션 섹션 -->
      <div class="flex justify-center items-center mt-5">
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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ItemManagement',
  data() {
    return {
      ItemListData: [],
      currentPage: 0,
      totalPages: null,
      pageSize: 5,

      pageData: null,
      updateManufactList: [],
      selectedManu: '',
      filteredItemList: [],

      showCheckBox: false,
      selectedItems: [],
      allSelected: false, // 전체 선택 상태

      handleSelected: false,

      deleteYN: '제품선택',
      
    };
  },

  created() {
    this.fetchItemList(this.currentPage);
  },

  mounted() {
    this.emitter.on('manufacturersLoaded', (manuList) => {
      console.log('emit manufacturersLoaded', manuList);
      this.updateManufacturers(manuList);
    });
  },

  computed: {
    ...mapState(['manufactList']),
    updateManufactList() {
      return this.manufactList;
    }
  },

  watch: {
    selectedItems() {
      this.allSelected = this.selectedItems.length === this.ItemListData.length;
    }
  },

 

  methods: {
    ...mapActions(['updateManufacturers']),

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
          headers: {
            "Content-Type": "application/json",
          }
        });

        this.ItemListData = response.data.content;
        this.filteredItemList = this.ItemListData;
        this.pageData = response.data;
        this.totalPages = this.pageData.totalPages;
        console.log(response.data);
      } catch (error) {
        console.log('page load error', error);
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
      
      else if (this.deleteYN === '취소'){
        this.handleSelected = false;
        this.deleteYN = '제품선택';
        
      }
      
      this.showCheckBox = !this.showCheckBox;
      if (!this.showCheckBox) {
        this.selectedItems = [];
      }
      console.log('단일 선택 체크박스', this.selectedItems);
    },

    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedItems = this.ItemListData.map(item => item.itemId);
        console.log('전체 선택 체크박스', this.selectedItems);
      } else {
        this.selectedItems = [];
      }
    },

    async handleSelectedItems() {

      console.log('삭제할 아이디', this.selectedItems);
      this.deletedItems(this.selectedItems);

    },

    async deletedItems(ids) {

      const inConfirmed = confirm('삭제 시 모든 제품 정보와 파일 정보가 삭제됩니다. 계속 하시겠습니까?');

      if (inConfirmed) {
        try {

          await this.$axios.delete(`/admin/items`, 
          {data: ids}
        )
          console.log('삭제 성공');
          alert('제품이 삭제 되었습니다.');
          this.$router.push('/admin/item');
        } catch (error) {
          console.log('제품 삭제 실패', error);
        }
      }
    },



  }
}
</script>
<style scoped>
/* 기본 카드 스타일 */
.bg-white {
  background-color: white;
}

/* 테이블 스타일 */
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

/* 페이지네이션 스타일 */
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

/* 선택된 페이지 */
.page-item .font-bold {
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}
</style>
