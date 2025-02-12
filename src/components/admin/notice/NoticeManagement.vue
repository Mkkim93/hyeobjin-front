<template>
  <div class="max-w-4xl mx-auto my-10">
    <div class="table-container text-center">
      <h1 class="text-2xl font-bold mb-5">공지사항</h1>
      <p>현재 페이지: {{ currentPage + 1 }} / {{ totalPages }}</p>
      <button @click="handleSelectedBoards" class="mb-4 px-4 py-2 bg-red-500 text-white rounded">
        선택된 항목 삭제
      </button>

      <!-- 테이블을 감싸는 div로 overflow 설정 -->

      <table class="w-full mx-auto table-auto border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-4 py-2">선택</th>
            <th class="px-4 py-2">번호</th>
            <th class="px-4 py-2">게시글유형</th>
            <th class="px-4 py-2">제목</th>
            <th class="px-4 py-2">작성자</th>
            <th class="px-4 py-2">등록일</th>
            <th class="px-4 py-2">수정일</th>
            <th class="px-4 py-2">공개여부</th>
            <th class="px-4 py-2">조회</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, count) in boardList" :key="post.boardId" class="hover:bg-gray-100">
            <td class="px-4 py-2">
              <input type="checkbox" class="ck" v-model="selectedIds" :value="post.boardId" />
            </td>
            <td class="px-4 py-2">
              {{ currentPage * pageSize + count + 1 }}
            </td>
            <td class="px-4 py-2">{{ post.boardType }}</td>
            <td class="px-4 py-2 text-left">
              <p @click="$router.push('notice/' + post.boardId)" class="cursor-pointer hover:underline">
                {{ post.boardTitle }}
              </p>
            </td>
            <td class="px-4 py-2">{{ post.writer }}</td>
            <td class="px-4 py-2">{{ formatDate(post.boardRegDate) }}</td>
            <td class="px-4 py-2">{{ formatDate(post.boardUpdate) }}</td>
            <td class="px-4 py-2">
              {{ post.boardYN === 'Y' ? '공개' : '비공개' }}
            </td>
            <td class="px-4 py-2">{{ post.boardViewCount }}</td>
          </tr>
        </tbody>
      </table>


      <!-- 페이지네이션: 가로 정렬 및 리스트 스타일 제거 -->
      <div class="flex justify-center mt-5 pagenavigation">
        <nav aria-label="Page navigation example">
          <ul class="flex list-none space-x-2">
            <!-- Previous Button -->
            <li :class="{ 'pointer-events-none': currentPage === 0 }">
              <a class="px-3 py-1 border border-gray-300 rounded" href="#" @click.prevent="changePage(currentPage - 1)">
                이전
              </a>
            </li>

            <!-- 페이지 번호 -->
            <li v-for="page in totalPages" :key="page" :class="{
              'bg-blue-500 text-white': currentPage === page - 1,
              'bg-white text-black': currentPage !== page - 1
            }">
              <a class="px-3 py-1 border border-gray-300 rounded" href="#" @click.prevent="changePage(page - 1)">
                {{ page }}
              </a>
            </li>

            <!-- Next Button -->
            <li :class="{ 'pointer-events-none': currentPage === totalPages - 1 }">
              <a class="px-3 py-1 border border-gray-300 rounded" href="#" @click.prevent="changePage(currentPage + 1)">
                다음
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- 검색 기능 -->
      <div class="mt-5 flex justify-center">
        <input v-model="searchKeyword" class="border border-gray-300 p-2 rounded-md" type="text"
          placeholder="검색어를 입력해주세요" />
        <button @click="fetchBoardList" class="ml-2 bg-blue-500 text-white p-2 rounded-md">
          검색
        </button>
      </div>

      <!-- 글쓰기 버튼 -->
      <div class="mt-5 flex justify-center">
        <router-link to="/admin/notice/add">
          <button type="button" class="bg-green-500 text-white px-4 py-2 rounded-md">
            글쓰기
          </button>
        </router-link>
      </div>
    </div>
  </div>
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

      currentPage: 0, // 현재 페이지 (0부터 시작)
      totalPages: null, // 전체 페이지 수
      pageSize: 5, // 한 페이지당 게시물 수
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
          page: this.currentPage,
          size: this.pageSize,
        };

        if (this.searchKeyword) {
          params.searchKeyword = this.searchKeyword;
        }

        const response = await this.$axios.get(`/admin/boards`, { params }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.boardList = response.data.content;
        this.pageData = response.data;
        this.totalPages = this.pageData.totalPages;
      } catch (error) {
        console.error('게시판 목록을 불러오는 중 오류 발생:', error);
      }
    },

    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },

    // 페이지 변경 처리
    changePage(pageNumber) {
      if (pageNumber >= 0 && pageNumber < this.totalPages) {
        this.currentPage = pageNumber;
        this.fetchBoardList();
      }
    },

    handleSelectedBoards() {
      this.deleteBoards(this.selectedIds);
    },

    async deleteBoards(ids) {
      const isConfirmed = confirm('삭제 시 모든 게시글과 파일이 삭제됩니다. 계속 하시겠습니까?');
      if (isConfirmed) {
        try {
          await this.$axios.delete('/admin/boards', { data: ids });
          alert('선택한 게시글이 모두 삭제 되었습니다.');
          window.location.href = '/admin/notice';
        } catch (error) {
          console.error('게시글 삭제 중 오류 발생:', error);
        }
      } else {
        alert('삭제가 취소되었습니다.');
      }
    },
  },
};
</script>

<style scoped>
/* pagination의 ul에 기본 리스트 스타일을 제거합니다. */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
