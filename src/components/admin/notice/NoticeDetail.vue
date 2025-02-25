<template>
  <div class="notice-detail-container">
    <div class="card">
      <div class="card-header">
        <h3 class="title">{{ boardDetail.boardTitle }}</h3>
        <div class="action-buttons">
          <button @click="editForm" class="btn edit-btn">✏ 수정</button>
          <button @click="deleted" class="btn delete-btn">🗑 삭제</button>
        </div>
      </div>

      <div class="card-body">
        <div class="post-info">
          <span>📅 등록일: {{ formatDate(boardDetail.boardRegDate) }}</span>
          <span>✍ 작성자: {{ boardDetail.writer }}</span>
          <span>👁‍🗨 조회수: {{ boardDetail.boardViewCount }}</span>
          <span>🔒 공개여부: {{ boardDetail.boardYN === 'Y' ? '✅ 공개' : '❌ 비공개' }}</span>
        </div>

        <hr />

        <div class="content-box">
          <div v-html="boardDetail.boardContent"></div>
        </div>

        <div class="file-section" v-if="boardDetail.adminBoardFiles && boardDetail.adminBoardFiles.length > 0">
          <h5 class="file-title">📎 첨부파일</h5>
          <ul class="file-list">
            <li v-for="file in boardDetail.adminBoardFiles" :key="file.id" class="file-item">
              <a class="file-link" :href="file.fileUrl" target="_blank">{{ file.fileOrgName }}</a>
              <button class="btn preview-btn" @click.prevent="preview(file.fileBoxId)">🔍 미리보기</button>
              <button class="btn download-btn" @click="downloadFile(file.fileBoxId, file.fileOrgName)">🔽 다운로드</button>
            </li>
          </ul>
        </div>
      </div>

      <div class="card-footer">
        <router-link to="/admin/notice" class="btn back-btn">⬅ 목록으로</router-link>
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
      boardDetail: {},
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
        console.error("fetchBoardDetailData error: ", error);
      }
    },

    formatDate(date) {
      if (!date) return "날짜 없음";
      return new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    editForm() {
      this.$router.push(`/admin/notice/edit/${this.id}`);
    },

    deleted() {
      const confirmDelete = confirm("정말 삭제하시겠습니까?");
      if (confirmDelete) {
        this.$axios
          .delete(`/admin/boards/${this.id}`)
          .then(() => {
            alert("게시글이 삭제되었습니다.");
            this.$router.push("/admin/notice");
          })
          .catch((error) => {
            console.error("deleted error: ", error);
          });
      }
    },

    async downloadFile(id, fileName) {
      try {
        const response = await this.$axios.get(`/admin/boardfiles/download/${id}`, {
          responseType: "blob",
        });

        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } catch (error) {
        console.error("downloadFile error: ", error);
      }
    },

    async preview(fileId) {
      try {
        const response = await this.$axios.get(`/admin/boardfiles/preview/${fileId}`, {
          responseType: "blob",
        });

        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, "_blank");
      } catch (error) {
        console.error("preview error: ", error);
      }
    },
  },
};
</script>

<style scoped>
.notice-detail-container {
  max-width: 100%;
  margin: 40px auto;
  padding: 20px;
}

.card {
  background: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  background-color: #444;
  color: white;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
}

.edit-btn {
  background: #777;
  color: white;
}

.delete-btn {
  background: #c62828;
  color: white;
}

.edit-btn:hover,
.delete-btn:hover {
  opacity: 0.8;
}

.post-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 15px;
  font-size: 14px;
  color: #555;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
}

.content-box {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.file-section {
  margin-top: 20px;
}

.file-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.file-list {
  list-style: none;
  padding: 0;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
}

.file-link {
  font-weight: bold;
  text-decoration: none;
  color: #444;
}

.file-link:hover {
  text-decoration: underline;
}

.preview-btn,
.download-btn {
  background: #777;
  color: white;
}

.preview-btn:hover,
.download-btn:hover {
  opacity: 0.8;
}

.card-footer {
  padding: 15px;
  text-align: right;
}

.back-btn {
  background: #666;
  color: white;
}

.back-btn:hover {
  opacity: 0.8;
}

</style>
