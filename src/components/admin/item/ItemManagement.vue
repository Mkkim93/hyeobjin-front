<template>
  <div class="max-w-5xl mx-auth my-10">
    <!-- 카드 스타일 섹션 -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold text-center mb-6">제품 목록</h1>
      <p class="text-center">현재 페이지: {{ currentPage + 1 }} / {{ totalPages }}</p>

      <!-- 제품 목록 테이블 -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300">
          <thead class="bg-gray-200">
            <tr>
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
                  <option value="KCC">KCC</option>
                  <option value="예림">예림</option>
                  <option value="휴그린">휴그린</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, count) in ItemListData" :key="item.itemId" class="text-center hover:bg-gray-100">
              <td class="border border-gray-300 p-2">{{ this.currentPage * this.pageSize + count + 1 }}</td>
              <td class="border border-gray-300 p-2">{{ item.itemNum }}</td>
              <td class="border border-gray-300 p-2">
                <p @click="$router.push({ name: 'ItemDetail', params: { itemId: item.itemId, manuId: item.manuId } })"
                  class="cursor-pointer text-blue-500 hover:underline">
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
      </div>

      <!-- 페이지네이션 섹션 -->
      <div class="flex justify-center items-center mt-5">
        <nav aria-label="Page navigation example">
          <ul class="flex space-x-2">
            <!-- Previous Button -->
            <li class="page-item" :class="{'opacity-50 pointer-events-none': currentPage === 0}">
              <a class="px-3 py-2 border rounded-md cursor-pointer" @click.prevent="changePage(currentPage - 1)">이전</a>
            </li>

            <!-- 페이지 번호들 동적으로 생성 -->
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{'font-bold text-blue-500': currentPage === page - 1}">
              <a class="px-3 py-2 border rounded-md cursor-pointer" @click.prevent="changePage(page - 1)">{{ page }}</a>
            </li>

            <!-- Next Button -->
            <li class="page-item" :class="{'opacity-50 pointer-events-none': currentPage === totalPages - 1}">
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

th, td {
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