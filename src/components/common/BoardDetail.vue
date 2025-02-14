<template>
  <div class="container my-5">
    <!-- 페이지 제목 -->
    <div class="text-center mb-5">
      <h2 class="notice-title fw-bold">공지사항</h2>
    </div>

    <!-- 게시판 카드 -->
    <div class="card shadow-sm">
      <div class="card-body">
        <!-- 게시글 제목 -->
        <h1 class="card-title text-primary fw-bold mb-3">{{ BoardDetail.boardTitle }}</h1>

        <!-- 작성자 및 날짜 -->
        <div class="d-flex justify-content-between text-muted small mb-4">
          <span>✍ 작성자: <strong class="text-dark">{{ BoardDetail.writer }}</strong></span>
          <span>📅 작성일: <strong class="text-dark">{{ formatDate(BoardDetail.boardRegdate) }}</strong></span>
        </div>

        <!-- 게시글 내용 -->
        <div class="border p-3 bg-light rounded">
          <div class="text-dark" v-html="BoardDetail.boardContent"></div>
        </div>

        <!-- 첨부 파일 -->
        <div v-if="BoardDetail.files && BoardDetail.files.length" class="mt-4 p-3 border rounded bg-white">
          <h5 class="fw-bold">📎 첨부 파일</h5>
          <ul class="list-group list-group-flush">
            <li v-for="(file, index) in BoardDetail.files" :key="index" class="list-group-item">
              <a :href="file.url" target="_blank" class="text-primary text-decoration-none">
                {{ file.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- 버튼 그룹 -->
        <div class="mt-4 d-flex justify-content-between">
          <button @click="$router.push('/notice')" class="btn btn-outline-secondary">⬅ 목록으로</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'BoardDetail',
  data() {
    return {
      BoardDetail: {},
    };
  },
  created() {
    this.fetchBoardDetails(this.$route.params.id);
    console.log('this.$route.params.id', this.$route.params.id);
  },
  methods: {
    async fetchBoardDetails(id) {
      try {
        const response = await this.$axios.get(`/boards/detail?boardId=${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        this.BoardDetail = response.data;
      } catch (error) {
        console.log('error', error);
      }
    },
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
  },
};
</script>

<style scoped>
/* 페이지 제목 스타일 */
.notice-title {
  display: inline-block;
  border-bottom: 3px solid #0078ff;
  padding-bottom: 5px;
}

/* 카드 스타일 */
.card {
  max-width: 100%;
  margin: auto;
}

/* 본문 스타일 */
.text-dark {
  font-size: 16px;
  line-height: 1.6;
}

/* 첨부 파일 스타일 */
.list-group-item a:hover {
  text-decoration: underline;
}
</style>
