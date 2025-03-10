<template>
  <section class="notice">
    <div class="page-title">
      <div class="container">
        <h3>FAQ</h3>
      </div>
    </div>

    <div id="board-search">
      <div class="container">
        <div class="search-window">
          <form @submit.prevent="fetchBoardList">
            <div class="search-wrap d-flex justify-content-end">
              <input
                v-model="searchKeyword"
                class="form-control"
                type="text"
                placeholder="검색어를 입력해주세요."
              />
              <button type="submit" class="btn btn-dark">검색</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div id="board-list">
      <div class="container">
        <table class="board-table">
          <thead>
            <tr>
              <th scope="col" class="th-num">번호</th>
              <th scope="col" class="th-title">제목</th>
              <th scope="col" class="th-date">등록일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in boardList" :key="post.boardId">
              <td>{{ currentPage * pageSize + index + 1 }}</td>
              <td class="board-title">
                <router-link :to="`/notice/${post.boardId}`" class="text-dark">
                  {{ post.boardTitle }}
                </router-link>
              </td>
              <td>{{ formatDate(post.boardRegDate) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-5 d-flex justify-content-center">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 0 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">이전</a>
          </li>
          <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page - 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(page - 1)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">다음</a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "FAQ",
  data() {
    return {
      boardList: [],

      searchKeyword: "",
      currentPage: 0,
      totalPages: 0,
      pageSize: 10,
      boardType: 'FAQ',

      selectedPostId: null,
    };
  },
  created() { this.fetchBoardList(); },

  methods: {
    async fetchBoardList() {
      try {
        const params = {
          page: this.currentPage,
          size: this.pageSize,
          boardType: this.boardType,
          searchKeyword: this.searchKeyword || null,
        };

        const response = await this.$axios.get("/boards", { params });

        this.boardList = response.data.content;
        this.totalPages = response.data.totalPages;

      } catch (error) {
        console.error("fetchBoardList error:", error);
      }
    },

    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },

    changePage(page) {
      if (page >= 0 && page < this.totalPages) {
        this.currentPage = page;
        this.fetchBoardList();
      }
    },

    togglePost(postId) {
    this.selectedPostId = this.selectedPostId === postId ? null : postId;
  },
  },
};
</script>

<style scoped>
.page-title {
  margin-bottom: 40px;
}
.page-title h3 {
  font-size: 24px;
  color: #333;
  font-weight: 600;
  text-align: center;
}

#board-search .search-window {
  padding: 15px 0;
  background-color: #f9f7f9;
  text-align: center;
}

#board-search .search-wrap {
  display: flex;
  justify-content: end;
  gap: 10px;
  max-width: 564px;
  margin: 0 auto;
}

#board-search input {
  flex-grow: 1;
  height: 40px;
  font-size: 14px;
  padding: 7px 14px;
  border: 1px solid #ccc;
  min-width: 200px;
}

#board-search .btn {
  height: 40px;
  padding: 0 15px;
  font-size: 14px;
  min-width: 100px;
  white-space: nowrap;
}

#board-list {
  width: 100%;
  overflow-x: auto;
}

.board-table {
  font-size: 14px;
  width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  white-space: nowrap;
}

.board-table th {
  text-align: center;
  font-weight: bold;
}

.board-table th,
.board-table td {
  padding: 12px 8px;
  text-align: center;
  border-top: 1px solid #e7e7e7;
}

.board-title {
  text-align: left !important;
  padding-left: 10px !important;
}

@media (max-width: 768px) {
  .board-table {
    font-size: 12px;
  }
  .board-table th:nth-child(1),
  .board-table td:nth-child(1),
  .board-table th:nth-child(3),
  .board-table td:nth-child(3) {
    display: none;
  }
  .board-table .th-title {
    text-align: center;
  }
}

.btn {
  display: inline-block;
  padding: 8px 20px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.3s;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

* {
  list-style: none;
  text-decoration: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

@media (max-width: 480px) {
  .page-title h3 {
    font-size: 20px;
  }
  .btn {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
