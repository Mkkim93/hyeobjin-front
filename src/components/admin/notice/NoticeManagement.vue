<template>
  <div class="container my-5">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white text-center">
        <h3 class="mb-0">📌 공지사항 관리</h3>
      </div>

      <div class="card-body">
        <!-- 선택 삭제 버튼 -->
        <div class="text-end mb-3">
          <button @click="handleSelectedBoards" class="btn btn-danger btn-sm">
            🗑 선택 삭제
          </button>
        </div>

        <!-- 테이블 -->
        <div class="table-responsive">
          <table class="table table-hover text-center">
            <thead class="table-light">
              <tr>
                <th><input type="checkbox" @click="selectAll" /></th>
                <th>No</th>
                <th>유형</th>
                <th>제목</th>
                <th>작성자</th>
                <th>등록일</th>
                <th>수정일</th>
                <th>공개여부</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, count) in boardList" :key="post.boardId">
                <td>
                  <input type="checkbox" class="form-check-input" v-model="selectedIds" :value="post.boardId" />
                </td>
                <td>{{ currentPage * pageSize + count + 1 }}</td>
                <td>{{ post.boardType }}</td>
                <td class="text-start">
                  <router-link :to="'/admin/notice/' + post.boardId" class="text-primary fw-bold text-decoration-none">
                    {{ post.boardTitle }}
                  </router-link>
                </td>
                <td>{{ post.writer }}</td>
                <td>{{ formatDate(post.boardRegDate) }}</td>
                <td>{{ formatDate(post.boardUpdate) }}</td>
                <td>{{ post.boardYN === 'Y' ? '✅ 공개' : '❌ 비공개' }}</td>
                <td>{{ post.boardViewCount }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 페이지네이션 -->
        <nav class="d-flex justify-content-center my-4">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 0 }">
              <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">이전</a>
            </li>

            <li v-for="page in totalPages" :key="page" class="page-item"
                :class="{ active: currentPage === page - 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(page - 1)">{{ page }}</a>
            </li>

            <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">다음</a>
            </li>
          </ul>
        </nav>

        <!-- 검색 기능 -->
        <div class="input-group mb-4">
          <input v-model="searchKeyword" type="text" class="form-control" placeholder="검색어를 입력하세요" />
          <button @click="fetchBoardList" class="btn btn-outline-primary">검색</button>
        </div>

        <!-- 글쓰기 버튼 -->
        <div class="text-center">
          <router-link to="/admin/notice/add">
            <button class="btn btn-success">📝 글쓰기</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "NoticeManagement",

  data() {
    return {
      selectedIds: [],
      boardList: [],
      searchKeyword: null,
      currentPage: 0,
      totalPages: null,
      pageSize: 5,
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

        const response = await this.$axios.get(`/admin/boards`, { params });

        this.boardList = response.data.content;
        this.pageData = response.data;
        this.totalPages = this.pageData.totalPages;
      } catch (error) {
        console.error("게시판 목록을 불러오는 중 오류 발생:", error);
      }
    },

    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },

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
      if (ids.length === 0) {
        alert("삭제할 게시글을 선택하세요.");
        return;
      }

      const isConfirmed = confirm("선택한 게시글을 삭제하시겠습니까?");
      if (isConfirmed) {
        try {
          await this.$axios.delete("/admin/boards", { data: { boardIds: ids } });
          alert("게시글이 삭제되었습니다.");
          this.fetchBoardList();
        } catch (error) {
          console.error("게시글 삭제 오류:", error);
        }
      }
    },

    selectAll() {
      if (this.selectedIds.length === this.boardList.length) {
        this.selectedIds = [];
      } else {
        this.selectedIds = this.boardList.map((post) => post.boardId);
      }
    },
  },
};
</script>

<style scoped>
/* ✅ 테이블 스타일 */
.table {
  border-radius: 8px;
  overflow: hidden;
}

/* ✅ 체크박스 스타일 */
.form-check-input {
  transform: scale(1.2);
  cursor: pointer;
}

/* ✅ 페이지네이션 스타일 */
.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.page-item.disabled .page-link {
  color: #ccc;
  cursor: not-allowed;
}

/* ✅ 버튼 스타일 */
.btn {
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
}

/* ✅ 반응형 */
@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }

  .table {
    font-size: 0.9rem;
  }
}
</style>
