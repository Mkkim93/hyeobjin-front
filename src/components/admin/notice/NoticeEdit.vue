<template>
  <div class="notice-create">
    <p>Edit Notice</p>
    <!-- 게시글 정보 -->
    <form @submit.prevent="modifyBoardData">

      <input type="file" multiple @change="handleFileChange" />

      <div class="flex justify-between items-center text-sm text-gray-500 mb-6">
        <span>
          작성자: <span class="font-medium text-gray-700">{{ EditBoardData.writer }}</span>
        </span>
        <span>
          최초 작성일:
          <span class="font-medium text-gray-700">{{ formatDate(EditBoardData.boardRegdate) }}</span>
        </span>
        <span>
          최근 수정일:
          <span class="font-medium text-gray-700">{{ formatDate(EditBoardData.boardUpdate) }}</span>
        </span>
        <span>
          게시글 유형:
          <span class="font-medium text-gray-700">{{ EditBoardData.boardType }}</span>
        </span>
        <span>
          조회 수:
          <span class="font-medium text-gray-700">{{ EditBoardData.boardViewCount }}</span>
        </span>
        <div class="d-flex">
          <label>
            <input type="radio" name="boardYN" value="Y" v-model="EditBoardData.boardYN" /> 공개
          </label>
          <label>
            <input type="radio" name="boardYN" value="N" v-model="EditBoardData.boardYN" /> 비공개
          </label>
        </div>
      </div>
      <div class="max-w-4xl mx-auto p-5 bg-white shadow-md rounded-md">
        <!-- 제목 수정 -->
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          <input type="text" v-model="EditBoardData.boardTitle" class="border border-gray-300 p-2 rounded-md w-full"
            placeholder="수정할 제목을 입력하세요" />
        </h1>

        <div>
          <Editor v-model="editorContent" />
        </div>
      </div>
      <button type="submit">수정</button>
    </form>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Editor from '@/components/view/Editor.vue';

export default {
  name: 'NoticeEdit',
  data() {
    return {
      EditBoardData: {},
      editorContent: '',
      files: [],
      id: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
    console.log('this.id', this.id);
    this.fetchModifyData(this.id);
  },
  components: {
    Editor,
  },

  methods: {

    async handleFileChange(event) {

      this.files = Array.from(event.target.files);
    },

    async fetchModifyData(id) {
      try {
        const response = await this.$axios.get(`/admin/boards/modify?boardId=${id}`);
        // 서버에서 가져온 데이터를 EditBoardData에 할당
        this.EditBoardData = response.data;
        // 게시글 내용(수정할 내용)을 editorContent에 할당하여 NoticeCreate의 v-model로 전달
        this.editorContent = response.data.boardContent;
      } catch (error) {
        console.log('fetchModifyData error', error);
      }
    },

    async modifyBoardData() {

      try {

        const formData = new FormData();
        console.log('this.editorContent', this.editorContent);
        console.log('this.id', this.id);
        const updateBoardDTO = {
          boardId: this.id,
          boardTitle: this.EditBoardData.boardTitle,
          boardContent: this.editorContent,
          boardYN: this.EditBoardData.boardYN,
        };

        formData.append("updateBoardDTO", new Blob([JSON.stringify(updateBoardDTO)], {
          type: 'application/json',
        }))

        this.files.forEach(file => {
          formData.append("files", file);
        })

        const response = await this.$axios.post('/admin/boards/update', formData, {
          headers: {
            'Content-Type': 'mulitpart/form-data',
          }
        });
        const updateBoardId = response.data;
        console.log('updateBoardId', updateBoardId);
        alert('게시글이 성공적으로 수정 되었습니다.');
        this.$router.push(`/admin/notice/${updateBoardId}`);
      } catch (error) {
        console.log('error', error);
      }
    },

    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
};
</script>

<style scoped>
/* 필요에 따라 스타일 추가 */
</style>
