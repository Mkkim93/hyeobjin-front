<template>

  <div class="page-title">
    <div class="container">
      <h3>공지사항</h3>
    </div>
  </div>

  <div class="container mt-4">
    <div class="notice-meta">
      <h2 class="notice-title">{{ boardDetail.boardTitle }}</h2>
      <div class="meta-info">
        <span class="views">👀 {{ boardDetail.boardViewCount || 0 }}회</span>
        <span class="date">작성일 {{ formatDate(boardDetail.boardUpdate) }}</span>
        <span class="date">작성자 {{ boardDetail.writer }}</span>
      </div>
    </div>
<div v-if="boardDetail.boardFiles && boardDetail.boardFiles.length" class="mt-3">
          <h6 class="mb-2">📎 첨부파일</h6>
          <ul class="file-list">
            <li v-for="file in boardDetail.boardFiles" :key="file.fileBoxId">
              <button @click="downloadFile(file.fileBoxId, file.fileOrgName)" target="_blank"
                class="btn btn-outline-primary btn-sm"> {{ file.fileOrgName }}
                다운로드 🔽
              </button>
            </li>
          </ul>
        </div>
    <div class="card">
      <div v-if="boardDetail.boardImage" class="image-container">
        <img :src="boardDetail.boardImage" alt="게시글 이미지" class="board-image">
      </div>
      <div class="card-body">
        <div class="content" v-html="boardDetail.boardContent"></div>

        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoticeDetail',
  props: ['id'],
  data() {
    return {
      boardDetail: {
        boardTitle: "",
        boardContent: "",
        boardImage: "",
        boardFiles: [],
        boardViewCount: '',
        boardUpdate: "",
        category: "공지사항",
      },
    };
  },
  created() { this.fetchBoardDetailData(this.id); },

  watch: {
    id(newId) {
      if (newId) { this.fetchBoardDetailData(newId); }
    }
  },

  methods: {
    async fetchBoardDetailData(boardId) {

      try {

        const response = await this.$axios.get(`/boards/detail/${boardId}`);
        this.boardDetail = response.data;

      } catch (error) {
        console.error('fetchBoardDetailData error: ', error);
      }
    },

    formatDate(date) {

      if (!date) return "날짜 없음";
      return new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    async downloadFile(fileBoxId, fileName) {
      
      try {
        const response = await this.$axios.get(`/boardFiles/download/${fileBoxId}`,
          {}, { responseType: 'blob' });

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        
        link.href = url;
        link.setAttribute('download', fileName);

        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

      } catch (error) {
        console.error('downloadFile error: ', error);
      }
    },
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
}

.notice-meta {
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.category {
  color: #555;
  font-weight: bold;
}

.notice-title {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.meta-info {
  font-size: 14px;
  color: #777;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-body {
  padding: 20px;
}

.content {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

.image-container {
  width: 100%;
  overflow: hidden;
}

.board-image {
  width: 100%;
  height: auto;
  display: block;
  border-bottom: 1px solid #e0e0e0;
}

.file-list {
  list-style: none;
  padding: 0;
}

.file-list li {
  padding: 6px 0;
}

.file-list a {
  color: #007bff;
  text-decoration: none;
}

.file-list a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .notice-title {
    font-size: 20px;
  }

  .meta-info {
    flex-direction: column;
    align-items: center;
  }

  .card-body {
    padding: 15px;
  }
}

.page-title {
  margin-bottom: 40px;
}

.page-title h3 {
  font-size: 24px;
  color: #333;
  font-weight: 600;
  text-align: center;
}
</style>
