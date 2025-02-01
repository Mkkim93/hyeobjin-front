<template>
  <div class="max-w-4xl mx-auto my-10">
    <h1 class="text-2xl font-bold text-center mb-5">제품 목록</h1>
    <p>현재 페이지: {{ currentPage + 1 }} / {{ totalPages }}</p>
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
        <tr v-for="(item, count) in ItemListData" :key="item.itemId" class="text-center hover:bg-gray-100">
          <td class="border border-gray-300 p-2">{{ this.currentPage * this.pageSize + count + 1 }}</td>
          <td class="border border-gray-300 p-2">{{ item.itemNum }}</td>

          <td class="border border-gray-300 p-2">
          <p @click="$router.push({ name: 'ItemDetail', params: { itemId: item.itemId, manuId: item.manuId } })" tag="td" class="cursor-pointer">
          {{ item.itemName }}
          </p>
          </td>

          <td class="border border-gray-300 p-2">{{ item.itemType }}</td>
          <td class="border border-gray-300 p-2">{{ formatDate(item.itemRegDate) }}</td>
          <td class="border border-gray-300 p-2">{{ formatDate(item.itemUpdate) }}</td>
          <td class="border border-gray-300 p-2">{{ item.itemYN === 'Y' ? '등록' : '미등록' }}</td>
          <td class="border border-gray-300 p-2">{{ item.manuName }}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="flex justify-between items-center mt-5">
      <!-- 페이지 네비게이션 중앙 정렬 -->
      <nav aria-label="Page navigation example" class="flex-1 flex justify-center">
        <ul class="pagination">
          <!-- Previous Button -->
          <li class="page-item" :class="{'disabled': currentPage === 0}">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
          </li>

          <!-- 페이지 번호들 동적으로 생성 -->
          <li v-for="page in totalPages" :key="page" class="page-item" :class="{'active': currentPage === page - 1}">
            <a class="page-link" href="#" @click.prevent="changePage(page - 1)">{{ page }}</a>
          </li>

          <!-- Next Button -->
          <li class="page-item" :class="{'disabled': currentPage === totalPages - 1}">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
      <!-- 글쓰기 버튼 -->
    </div>
  </div>
</template>

<script>
import '@/assets/styles/admin.css';
import dayjs from 'dayjs';

export default {
  name: 'ItemManagement',
  data() {
    return {
      ItemListData: [],
      // 기본 페이지 값 데이터가 넘어오면 컨트롤러에서 지정한 페이징 데이터 비동기 응답
      currentPage: 0, // 현재 페이지
      totalPages: null, // 전체 페이지 수
      pageSize: 5,   // 페이지 크기

      pageData: null,

      selectedManu: '',
      filteredItemList: [],
    }
  },
  setup() {
    console.log('ItemMangement 페이지가 로드되었습니다.');
  },
  
  created() {

    this.fetchItemList(this.currentPage);
    
  },

  methods: {

    async fetchItemList(page) {

      try {

        const params = {
          page: page, // 현재 페이지 번호 (0부터 시작)
          size: this.pageSize, // 페이지당 게시물 수
        };

        if (this.selectedManu) {
          params.manuName = this.selectedManu || '';
        }

        const response = await this.$axios.get(`/admin/items`, { params , 
          headers: {
            "Content-Type": "application/json",
          }
        });
      
        this.ItemListData = response.data.content;
        this.filteredItemList = this.ItemListData; // 초기에는 모든 데이터를 표시
        this.pageData = response.data;
        this.totalPages = this.pageData.totalPages;
        console.log(response.data);
      } catch (error) {
        console.log('page load error', error);
      }
    },

    filterByManu() {
      // 선택된 제조사로 데이터를 필터링
      this.fetchItemList(); // 제조사명 변경 시 다시 데이터 로드
    },

    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },

    changePage(pageNumber) {
      if (pageNumber >= 0 && pageNumber < this.totalPages) {
        this.currentPage = pageNumber;
       
        this.fetchItemList(this.currentPage); // 페이지 변경 후 데이터 다시 불러오기
        
      }
    },
  },
  
}

</script>

<style>

</style>