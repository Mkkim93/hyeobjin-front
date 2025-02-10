<template>
  <button @click="editForm">수정</button>
  <button @click="deleted">삭제</button>
  
    <div class="notice-detail">
      <h2>{{ boardDetail.boardTitle }}</h2>
      <!-- HTML 콘텐츠를 v-html로 렌더링 -->
      <div v-html="boardDetail.boardContent"></div>
  
      <!-- 첨부파일이 있을 경우 예시 -->
      <div v-if="boardDetail.boardFiles && boardDetail.boardFiles.length">
        <h3>첨부파일</h3>
        <ul>
          <li v-for="file in boardDetail.boardFiles" :key="file.id">
            <a :href="file.fileUrl" target="_blank">{{ file.fileName }}</a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NoticeDetail',
    data() {
      return {
        id: null,
        boardDetail: {}
      }
    },
    created() {
      // 라우트 파라미터로부터 id를 가져옴
      this.id = this.$route.params.id;
      this.fetchBoardDetailData(this.id);
    },
    watch: {
    // 🔥 id 값이 변경될 때마다 fetchBoardDetailData() 실행
    id(newId) {
      if (newId) {
        this.fetchBoardDetailData(newId);
      }
    }
  },

    

    methods: {
      async fetchBoardDetailData(id) {
        try {
          const response = await this.$axios.get(`/admin/boards/detail/${id}`);
          this.boardDetail = response.data;
          console.log('받은 데이터:', this.boardDetail);
        } catch (error) {
          console.error('게시글 상세 데이터 오류', error);
        }
      },

      editForm() {
        this.$router.push(`edit/` + this.$route.params.id);
      },

      deleted() {
        
      },
    },
  }

  </script>
  
  <style scoped>
  .notice-detail {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }
  .notice-detail h2 {
    margin-bottom: 20px;
  }
  .notice-detail div {
    margin-bottom: 20px;
  }

  .notice-detail img {
  max-width: 300px !important; /* 최대 너비를 300px로 제한 */
  height: auto; /* 비율에 맞게 자동 조절 */
}
  </style>
  