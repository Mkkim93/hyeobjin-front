<template>
  <div class="table-container">
    <h1 class="text-2xl font-bold text-center mb-5">공지사항</h1>
    <p>현재 페이지: {{ currentPage + 1 }} / {{ totalPages }}</p>
    <button @click="handleSelectedBoards">선택된 항목 삭제</button>
    <!-- 테이블 -->
    <table class="w-full table-auto border-collapse border border-gray-300">
      <thead class="table-header">
        <tr>
          <th class="table-cell">선택</th>
          <th class="table-cell">번호</th>
          <th class="table-cell">게시글유형</th>
          <th class="table-cell">제목</th>
          <th class="table-cell">작성자</th>
          <th class="table-cell">등록일</th>
          <th class="table-cell">수정일</th>
          <th class="table-cell">공개여부</th>
          <th class="table-cell">조회</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, count) in boardList" :key="post.boardId" class="hover:bg-gray-100">
          <td class="table-cell">
            <input type="checkbox" class="ck" v-model="selectedIds" :value="post.boardId" />
          </td>
          <td class="table-cell">{{ this.currentPage * this.pageSize + count + 1 }}</td>
          <td class="table-cell">{{ post.boardType }}</td>
          <td class="table-cell text-left">
            <p @click="$router.push('notice/' + post.boardId)" class="cursor-pointer">
              {{ post.boardTitle }}
            </p>
          </td>
          <td class="table-cell">{{ post.writer }}</td>
          <td class="table-cell">{{ formatDate(post.boardRegDate) }}</td>
          <td class="table-cell">{{ formatDate(post.boardUpdate) }}</td>
          <td class="table-cell">{{ post.boardYN }}</td>
          <td class="table-cell">{{ post.boardViewCount }}</td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-between items-center mt-5">
      <!-- 페이지 네비게이션 중앙 정렬 -->
      <nav aria-label="Page navigation example" class="flex-1 flex justify-center">
        <ul class="pagination">
          <!-- Previous Button -->
          <li class="page-item" :class="{ 'disabled': currentPage === 0 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
          </li>

          <!-- 페이지 번호들 동적으로 생성 -->
          <li v-for="page in totalPages" :key="page" class="page-item" :class="{ 'active': currentPage === page - 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(page - 1)">{{ page }}</a>
          </li>

          <!-- Next Button -->
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages - 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
      <!-- 글쓰기 버튼 -->
    </div>
    <!-- 검색 기능 -->
  </div>
  <div class="mt-5 flex justify-center">
    <input v-model="searchKeyword" class="border border-gray-300 p-2 rounded-md" type="text"
      placeholder="검색어를 입력해주세요" />
    <button @click="fetchBoardList" class="ml-2 bg-blue-500 text-white p-2 rounded-md">
      검색
    </button>
  </div>

  <router-link to="/admin/notice/add" tag="button">
    <button type="button">글쓰기</button>
  </router-link>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'NoticeManagement',

  data() {
    return {
      selectedIds: [],

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
          console.log('parames', params);
        }

        const response = await this.$axios.get(`/admin/boards`, { params }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.boardList = response.data.content;
        this.pageData = response.data;
        this.totalPages = this.pageData.totalPages;

        console.log('this.boardList', this.boardList);
        console.log('response.data', response.data);

      } catch (error) {
        console.log('response error', error);
      }
    },

    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },

    // 페이지 변경 처리
    changePage(pageNumber) {
      if (pageNumber >= 0 && pageNumber < this.totalPages) {
        this.currentPage = pageNumber;
        this.fetchBoardList(); // 페이지 변경 후 데이터 다시 불러오기
      }
    },

    handleSelectedBoards() {

      console.log('선택된 boardId들', this.selectedIds);

      this.deleteBoards(this.selectedIds);
    },

    async deleteBoards(ids) {
      const isConfirmed = confirm('삭제 시 모든 게시글과 파일이 삭제됩니다. 계속 하시겠습니까?');
      if (isConfirmed) {
        try {

          await this.$axios.delete('/admin/boards', {
            data: ids,
          })

          alert('선택한 게시글이 모두 삭제 되었습니다.');
          window.location.href = '/admin/notice';
        } catch (error) {
          console.log('board delete error', error);
        }
      } else {
        alert('삭제가 취소 되었습니다.');
      }

    }
  }
};
</script>

<style scoped>
.btn-1 {
  width: 50px;
}
</style>