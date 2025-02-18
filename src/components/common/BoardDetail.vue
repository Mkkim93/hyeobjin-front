<template>

  <div class="page-title">
    <div class="container">
      <h3>공지사항</h3>
    </div>
  </div>

  <div class="container mt-4">
    <!-- 제목 및 메타 정보 -->
    <div class="notice-meta">
      <h2 class="notice-title">{{ boardDetail.boardTitle }}</h2>
      <div class="meta-info">
        <span class="views">👀 {{ boardDetail.boardViewCount || 0 }}회</span>
        <span class="date">작성일 {{ formatDate(boardDetail.boardUpdate) }}</span>
        <span class="date">작성자 {{ boardDetail.writer }}</span>
      </div>
    </div>

    <!-- 이미지 포함된 내용 -->
    <div class="card">
      <div v-if="boardDetail.boardImage" class="image-container">
        <img :src="boardDetail.boardImage" alt="게시글 이미지" class="board-image">
      </div>
      <div class="card-body">
        <div class="content" v-html="boardDetail.boardContent"></div>

        <!-- 첨부파일 리스트 -->
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoticeDetail',
  props: ['id'], // ✅ id를 props로 받기
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
  created() {
    this.fetchBoardDetailData(this.id);
  },
  watch: {
    id(newId) {
      if (newId) {
        this.fetchBoardDetailData(newId);
      }
    }
  },
  methods: {
    async fetchBoardDetailData(id) {
      try {
        const response = await this.$axios.get(`/boards/detail/${id}`);
        this.boardDetail = response.data;
        console.log('response.data', response.data);
      } catch (error) {
        console.error('게시글 상세 데이터 오류', error);
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
          {},
          { responseType: 'blob' } // Blob 형식으로 응답 받기
        );

        // ✅ Blob 데이터를 사용하여 URL 생성
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);

        // ✅ a 태그를 동적으로 생성하여 다운로드 실행
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // 다운로드할 파일 이름 설정
        document.body.appendChild(link);
        link.click();

        // ✅ 사용이 끝난 URL 해제
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

      } catch (error) {
        console.error('파일 다운로드 실패:', error);
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

/* ✅ 제목 & 메타 정보 */
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

/* ✅ 카드 스타일 */
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

/* ✅ 이미지 컨테이너 */
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

/* ✅ 첨부파일 리스트 */
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

/* ✅ 반응형 스타일 */
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
