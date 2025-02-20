<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4">
      <h2 class="text-center mb-4">공지 등록</h2>

      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input type="text" v-model="title" class="form-control" id="title" placeholder="제목을 입력하세요" />
      </div>

      <div class="mb-3">
        <label for="postContent" class="form-label">내용</label>
        <div class="border rounded p-2 shadow-sm">
          <Editor v-model="postContent" />
        </div>
      </div>
       
      <div>
        <p>게시글 유형</p>
        <label for="boardType">
          <input type="radio" name="boardType" v-model="boardType" value="NOTICE">
          공지사항</label>

         <label for="boardType">
          <input type="radio" name="boardType" v-model="boardType" value="FAQ">
         FAQ</label> 
      </div>

      <br>

      <div class="mb-3">
        <label for="fileUpload" class="form-label">파일 업로드</label>
        <input type="file" class="form-control" id="fileUpload" multiple @change="handleFileChange" />
      </div>

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
      boardType: '',
    };
  },

  components: { Editor },

  methods: {

    async handleFileChange(event) {
      this.files = Array.from(event.target.files);
    },

    async submitPost() {

      try {

        const formData = new FormData();

        const createBoardDTO = {
          boardTitle: this.title,
          boardContent: this.postContent,
          boardType: this.boardType,
        };

        formData.append("createBoardDTO", new Blob([JSON.stringify(createBoardDTO)],
          { type: "application/json" }));


        this.files.forEach(file => {
          formData.append("files", file);
        });

        if (!boardType) {
          alert('공개 또는 비공개를 선택해주세요');
          return;
        }

        

        const response = await this.$axios.post('/admin/boards', formData,
          { headers: { 'Content-Type': 'multipart/form-data' } });

        const boardId = response.data;

        alert('게시글이 성공적으로 등록 되었습니다.');

        this.$router.push(`/admin/notice/${boardId}`);

      } catch (error) {
        console.log('submitPost error: ', error);
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
