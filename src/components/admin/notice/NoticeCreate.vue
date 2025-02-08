<template>
  <div class="notice-create">
    <h2>공지 등록</h2>
    <input type="text" v-model="title" placeholder="제목을 입력하세요" />

    <CustomEditor v-model="postContent" />

    <h3>미리보기</h3>
    <div v-html="postContent"></div>
    <input type="file" multiple @change="handleFileChange" />
    <button @click="submitPost">게시글 등록</button>
  </div>
</template>

<script>
import CustomEditor from '@/components/view/CustomEditor.vue';
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
    CustomEditor,
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
</style>
