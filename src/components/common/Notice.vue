<template>
  <div class="max-w-4xl mx-auto my-10">
    <h1 class="text-2xl font-bold text-center mb-5">공지사항</h1>
    <table class="w-full table-auto border-collapse border border-gray-300">
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 p-2">번호</th>
          <th class="border border-gray-300 p-2">제목</th>
          <th class="border border-gray-300 p-2">작성자</th>
          <th class="border border-gray-300 p-2">조회</th>
          <th class="border border-gray-300 p-2">날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, count) in boardList" :key="post.boardId" class="text-center hover:bg-gray-100">
          <td class="border border-gray-300 p-2">{{ this.currentPage * this.pageSize + count + 1 }}</td>
          <td class="border border-gray-300 p-2 text-left cursor-pointer">
            <p @click="$router.push('/notice/' + post.boardId)" tag="td">{{ post.boardTitle }}</p>
          </td>
          <td class="border border-gray-300 p-2">{{ post.writer }}</td>
          <td class="border border-gray-300 p-2">{{ post.boardViewCount }}</td>
          <td class="border border-gray-300 p-2">{{ formatDate(post.boardRegDate) }}</td>
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

    <!-- //TODO 검색 기능 구현 -->
    <div class="mt-5 flex justify-center">
      <input v-model="searchKeyword" class="border border-gray-300 p-2 rounded-md" type="text"
        placeholder="검색어를 입력해주세요" />
      <button @click="fetchBoardList" class="ml-2 bg-blue-500 text-white p-2 rounded-md">
        검색
      </button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: 'Notice',
  data() {
    return {
      boardList: [],
      searchKeyword: null,

      currentPage: 0, // 현재 페이지
      totalPages: null, // 전체 페이지 수
      pageSize: 5,   // 페이지 크기
      
      pageData: null,
    };
  },

  created() {
    this.fetchBoardList();
  },

  methods: {
    async fetchBoardList() {
      try {

        const params = {
          page: this.currentPage, // 현재 페이지 번호 (0부터 시작)
          size: this.pageSize, // 페이지당 게시물 수
        };

        if (this.searchKeyword) {
          params.searchKeyword = this.searchKeyword; // 검색어 추가
        }

        const response = await this.$axios.get(`/boards`, { params }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.boardList = response.data.content;
        this.pageData = response.data;
        this.totalPages = this.pageData.totalPages; 

      } catch (error) {
        console.log('response error', error);
      }
    },

    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },

    changePage(pageNumber) {
      if (pageNumber >= 0 && pageNumber < this.totalPages) {
        this.currentPage = pageNumber;
       
        this.fetchBoardList(); // 페이지 변경 후 데이터 다시 불러오기
        
      }
    },
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.bg-gray-200 {
  text-align: center;
}
</style>