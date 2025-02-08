<template>
    <div class="max-w-4xl mx-auto my-10 text-center">
      <h2 class="notice-title fw-bolder my-5">FAQ</h2>
      <br>
      <div class="text-center mb-5">
      <p></p>
        <!-- 검색 기능: 오른쪽 상단에 위치 -->
        <div class="mt-3 d-flex justify-content-end mb-3">
          <div class="d-flex align-items-center">
            <input v-model="searchKeyword" class="form-control w-100 mx-3 my-2" type="text" placeholder="검색어를 입력해주세요" />
            <button @click="fetchBoardList" class="btn btn-primary btn-lg w-50 py-1">
              검색
            </button>
          </div>
        </div>
      </div>
      <!-- 게시글 목록 테이블 -->
      <table class="table table-hover w-full">
        <thead class="bg-gray-300">
          <tr>
            <th class="border border-gray-300 p-2">번호</th>
            <th class="border border-gray-300 p-2">제목</th>
            <th class="border border-gray-300 p-2">작성자</th>
            <th class="border border-gray-300 p-2">작성일</th>
            <th class="border border-gray-300 p-2">조회</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, count) in boardList" :key="post.boardId" class="text-center hover:bg-gray-100">
            <td class="border border-gray-300 p-1 align-middle">
              {{ this.currentPage * this.pageSize + count + 1 }}
            </td>
            <td class="border border-gray-300 p-1 text-left align-middle">
              <p @click="$router.push('/notice/' + post.boardId)" tag="td">{{ post.boardTitle }}</p>
            </td>
            <td class="border border-gray-300 p-1 align-middle">
              {{ post.writer }}
            </td>
            <td class="border border-gray-300 p-1 align-middle">
              {{ formatDate(post.boardRegDate) }}
            </td>
            <td class="border border-gray-300 p-1 align-middle">
              {{ post.boardViewCount }}
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- 페이지네이션: 테이블 하단 중앙 정렬 -->
      <!-- 페이지네이션: 테이블 하단 중앙 정렬 -->
      <div class="mt-5 d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <!-- Previous Button -->
            <li class="page-item" :class="{ 'disabled': currentPage === 0 }">
              <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">이전
                </a>
            </li>
            
            <!-- 페이지 번호들 동적으로 생성 -->
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ 'active': currentPage === page - 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(page - 1)">{{ page }}</a>
            </li>
  
            <!-- Next Button -->
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages - 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">다음</a>
            </li>
          </ul>
        </nav>
      </div>
  
    </div>
  </template>
  
  <script>
  import dayjs from "dayjs";
  
  export default {
    name: 'FAQ',
    data() {
      return {
        boardList: [],
        searchKeyword: null,
  
        currentPage: 0, // 현재 페이지
        totalPages: null, // 전체 페이지 수
        pageSize: 10,   // 페이지 크기
  
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
  .notice-title {
    display: inline-block;
    border-bottom: 3px solid #0078ff;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }
  </style>