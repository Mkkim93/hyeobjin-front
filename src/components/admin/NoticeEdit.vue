<template>
  <p>Edit Notice</p>
  <div class="max-w-4xl mx-auto p-5 bg-white shadow-md rounded-md">

    <!-- 첨부 파일 -->
    <div v-if="adminBoardFiles.length > 0" class="mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">첨부 파일</h2>
      <ul class="list-disc pl-5">
        <li v-for="(file, index) in adminBoardFiles" :key="file.fileBoxId">
          <a :href="file.filePath" target="_blank" class="text-blue-600 hover:underline">
            {{ file.fileOrgName }}
          </a>
          <button @click="removeFile(index, file.boardId, file.fileBoxId)" class="text-red-500 ml-2">삭제</button>
        </li>
      </ul>
    </div>

    <!-- 제목 수정 -->
    <h1 class="text-2xl font-bold text-gray-800 mb-4">
      <input type="text" v-model="EditBoardData.boardTitle" class="border border-gray-300 p-2 rounded-md w-full"
        placeholder="제목을 입력하세요" />
    </h1>

    <!-- 게시글 정보 -->
    <div class="flex justify-between items-center text-sm text-gray-500 mb-6">
      <span>작성자: <span class="font-medium text-gray-700">{{ EditBoardData.writer }}</span></span>
      <span>최초 작성일: <span class="font-medium text-gray-700">{{ formatDate(EditBoardData.boardRegdate) }}</span></span>
      <span>최근 수정일: <span class="font-medium text-gray-700">{{ formatDate(EditBoardData.boardUpdate) }}</span></span>
      <span>게시글 유형: <span class="font-medium text-gray-700">{{ EditBoardData.boardType }}</span></span>
      <span>조회 수: <span class="font-medium text-gray-700">{{ EditBoardData.boardViewCount }}</span></span>
      <span>공개여부: <span class="font-medium text-gray-700">{{ EditBoardData.boardYN === 'Y' ? '공개' : '비공개' }}</span></span>
    </div>

    <!-- 게시글 내용 수정 -->
    <div class="mb-6">
      <div id="summernote" class="text-gray-700 leading-relaxed"></div>
    </div>

    <!-- 파일 업로드 -->
    <div class="mb-6">
      <input type="file" @change="handleFileChange" class="border border-gray-300 p-2 rounded-md" />
    </div>

    <!-- 수정 완료 버튼 -->
    <div class="text-center">
      <button @click="updateBoard" class="bg-blue-600 text-white p-2 rounded-md">
        수정 완료
      </button>
    </div>

  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: 'NoticeEdit',
  data() {
    return {
      EditBoardData: {},
      adminBoardFiles: [],
      selectedFiles: [],  // 새로 추가된 파일들
      id: null,
    };
  },
  setup() {
    console.log('NoticeEdit component render');
  },

  created() {

    this.id = this.$route.params.id;
    this.fetchBoardDataList(this.id);
  },

  mounted() {
    $('#summernote').summernote({
      placeholder: '내용을 입력해주세요',
      tabsize: 2,
      height: 300,
    });

    // 에디터가 로드되면 boardContent를 에디터에 설정
    if (this.EditBoardData.boardContent) {
      $('#summernote').summernote('code', this.EditBoardData.boardContent);
    }
  },

  methods: {
    async fetchBoardDataList(id) {
      try {
        const response = await this.$axios.get(`/admin/boards/modify?boardId=${id}`);

        this.EditBoardData = response.data;
        this.adminBoardFiles = response.data.adminBoardFiles;
        console.log('response', response);
        console.log('this.route.params.id', this.$route.params.id);
        console.log('EditBoardData', this.EditBoardData);

        // 에디터가 초기화된 후 내용을 설정
        this.$nextTick(() => {
          if (this.EditBoardData.boardContent) {
            $('#summernote').summernote('code', this.EditBoardData.boardContent);
          }
        });

      } catch (error) {
        console.log('fetchBoardData error', error);
      }
    },

    // 날짜 포맷 함수
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    },

    // 파일 변경 처리
    handleFileChange(event) {
      this.selectedFiles = event.target.files;
    },

    // 게시글 수정 처리
    async updateBoard() {
      const updatedContent = $('#summernote').summernote('code');

      const formData = new FormData();

      // JSON 데이터를 Blob으로 변환하여 추가
      formData.append('updateBoardDTO', new Blob([JSON.stringify({
        boardId: this.EditBoardData.boardId,
        boardTitle: this.EditBoardData.boardTitle,
        content: updatedContent,
        files: this.adminBoardFiles,  // 기존 파일 정보 추가
      })], { type: 'application/json' }));

      // 새로 추가한 파일들도 formData에 추가
      if (this.selectedFiles.length > 0) {
        for (let file of this.selectedFiles) {
          formData.append('files', file);
        }
      } else {
        formData.append('files', new Blob()); // 파일이 없더라도 빈 데이터 전달
      }

      try {
        const response = await this.$axios.post(`/admin/boards/update`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        console.log('수정 완료:', response);
        alert('수정 완료!');
        this.$router.push({ name: 'NoticeManagement' }); // 신기!!

      } catch (error) {
        console.log('수정 실패:', error);
      }
    },

    async removeFile(index, boardId, fileBoxId) {
      this.adminBoardFiles.splice(index, 1);

      try {
        const params = {
          boardId: boardId,
          fileBoxId: fileBoxId,
        };

        await this.$axios.delete(`/admin/boardfiles`, { params }, {
          headers: {
            'Content-Type': 'application/json',
          }
        })

      } catch (error) {
        console.log('file delete error', error);
      }
    },
  },
}
</script>

<style scoped></style>
