<template>
  <div class="container my-5">
    <div class="card shadow-sm">
      <!-- 제목 섹션 -->
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h3 class="mb-0">📌 {{ boardDetail.boardTitle }}</h3>
        <div>
          <button @click="editForm" class="btn btn-outline-light btn-sm me-2">✏ 수정</button>
          <button @click="deleted" class="btn btn-danger btn-sm">🗑 삭제</button>
        </div>
      </div>

      <!-- 게시글 내용 -->
      <div class="card-body">
        <div class="text-muted mb-3">
          <small>📅 등록일: {{ formatDate(boardDetail.boardRegDate) }}</small> |
          <small>✍ 작성자: {{ boardDetail.writer }}</small> |
          <small>👁‍🗨 조회수: {{ boardDetail.boardViewCount }}</small>
        </div>

        <hr />

        <!-- 내용 -->
        <div class="content-box p-3 bg-light">
          <div v-html="boardDetail.boardContent"></div>
        </div>

        <!-- 첨부파일 -->
        <div v-if="boardDetail.boardFiles && boardDetail.boardFiles.length" class="mt-4">
          <h5 class="mb-3">📎 첨부파일</h5>
          <ul class="list-group">
            <li v-for="file in boardDetail.boardFiles" :key="file.id" class="list-group-item">
              <a :href="file.fileUrl" target="_blank" class="text-primary fw-bold text-decoration-none">
                {{ file.fileName }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 하단 네비게이션 -->
      <div class="card-footer text-end">
        <router-link to="/notice" class="btn btn-outline-secondary btn-sm">⬅ 목록으로</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoticeDetail",
  data() {
    return {
      id: null,
      boardDetail: {}
    };
  },

  created() {
    this.id = this.$route.params.id;
    this.fetchBoardDetailData(this.id);
  },

  methods: {
    async fetchBoardDetailData(id) {
      try {
        const response = await this.$axios.get(`/admin/boards/detail/${id}`);
        this.boardDetail = response.data;
      } catch (error) {
        console.error("게시글 상세 데이터 오류", error);
      }
    },

    formatDate(date) {
      if (!date) return "날짜 없음";
      return new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    },

    editForm() {
      this.$router.push(`/admin/notice/edit/${this.id}`);
    },

    deleted() {
      const confirmDelete = confirm("정말 삭제하시겠습니까?");
      if (confirmDelete) {
        // 삭제 API 호출
        this.$axios.delete(`/admin/boards/${this.id}`).then(() => {
          alert("게시글이 삭제되었습니다.");
          this.$router.push("/notice");
        }).catch(error => {
          console.error("삭제 오류", error);
        });
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
}

.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  font-weight: bold;
  background-color: #007bff;
  color: white;
  padding: 15px;
}

.content-box {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  border-radius: 8px;
  background: #f9f9f9;
}

.list-group-item a {
  text-decoration: none;
}

.list-group-item a:hover {
  text-decoration: underline;
}
</style>
