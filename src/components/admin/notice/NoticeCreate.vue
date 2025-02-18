<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4">
      <h2 class="text-center mb-4">공지 등록</h2>

      <!-- 제목 입력 -->
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input type="text" v-model="title" class="form-control" id="title" placeholder="제목을 입력하세요" />
      </div>

      <!-- 에디터 -->
      <div class="mb-3">
        <label class="form-label">내용</label>
        <div class="border rounded p-2 shadow-sm">
          <Editor v-model="postContent" />
        </div>
      </div>

      <!-- 파일 업로드 -->
      <div class="mb-3">
        <label for="fileUpload" class="form-label">파일 업로드</label>
        <input type="file" class="form-control" id="fileUpload" multiple @change="handleFileChange" />
      </div>

      <!-- 등록 버튼 -->
      <div class="text-center">
        <button class="btn btn-primary px-4 py-2" @click="submitPost">
          <i class="bi bi-upload"></i> 게시글 등록
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/view/Editor.vue';
export default {

  name: 'NoticeCreate',

  data() {
    return {
      title: '',
      postContent: '',
      files: [],
    };
  },

  components: {
    Editor,
  },

  methods: {

    async handleFileChange(event) {
      this.files = Array.from(event.target.files);
    },

    async submitPost() {

      try {

        const formData = new FormData();
        console.log('this.postContent', this.postContent);

        const createBoardDTO = {
          boardTitle: this.title,
          boardContent: this.postContent,
        };

        formData.append("createBoardDTO", new Blob([JSON.stringify(createBoardDTO)], {
          type: "application/json"
        }));


        this.files.forEach(file => {
          formData.append("files", file);
        });

        const response = await this.$axios.post('/admin/boards', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        const boardId = response.data;
        console.log('등록된 boardId', boardId);
        console.log('게시글 등록 성공');
        alert('게시글이 성공적으로 등록 되었습니다.');
        this.$router.push(`/admin/notice/${boardId}`);
      } catch (error) {
        console.log('게시글 등록 실패', error);
      }
    }
  },
}


</script>

<style scoped>
.notice-create {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.notice-create h2 {
  margin-bottom: 20px;
}

.notice-create input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  font-size: 1.2em;
}

.notice-create input[type="file"] {
  margin: 10px 0;
}

.notice-create button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
}

.container {
  max-width: 600px;
}
</style>
