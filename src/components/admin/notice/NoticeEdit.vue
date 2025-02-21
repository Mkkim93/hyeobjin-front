<template>
  <div class="notice-edit-container">
    <h2 class="notice-title">게시글 수정</h2>

    <form @submit.prevent="modifyBoardData" class="edit-form">
      
      <div class="info-container">
        <div class="info-item">
          <strong>작성자:</strong> {{ EditBoardData.writer }}
        </div>
        <div class="info-item">
          <strong>최초 작성일:</strong> {{ formatDate(EditBoardData.boardRegdate) }}
        </div>
        <div class="info-item">
          <strong>최근 수정일:</strong> {{ formatDate(EditBoardData.boardUpdate) }}
        </div>
        <div class="info-item">
          <strong>게시글 유형:</strong> {{ EditBoardData.boardType }}
        </div>
        <div class="info-item">
          <strong>조회 수:</strong> {{ EditBoardData.boardViewCount }}
        </div>
        <div class="info-item">
          <strong>공개 : </strong> {{ EditBoardData.boardYN == 'Y' ? '공개' : '비공개' }}
        </div>
      </div>

      <div class="visibility-toggle">
        <label>
          <input type="radio" name="boardYN" value="Y" v-model="EditBoardData.boardYN" />
          공개
        </label>
        <label>
          <input type="radio" name="boardYN" value="N" v-model="EditBoardData.boardYN" />
          비공개
        </label>
      </div>

      <div class="input-group">
        <label for="boardTitle">제목</label>
        <input
          id="boardTitle"
          type="text"
          v-model="EditBoardData.boardTitle"
          placeholder="게시글 제목을 입력하세요"
          class="input-box"
        />
      </div>

      <div class="editor-container">
        <Editor v-model="editorContent" />
      </div>

      <div class="input-group file-upload">
        <label for="fileInput">첨부 파일</label>
        <input type="file" id="fileInput" multiple @change="handleFileChange" class="file-input" />
      </div>

      <div class="button-group">
        <button type="button" class="cancel-btn" @click="$router.back()">취소</button>
        <button type="submit" class="submit-btn">수정 완료</button>
      </div>
    </form>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Editor from "@/components/view/Editor.vue";

export default {
  name: "NoticeEdit",
  data() {
    return {
      id: null,
      editorContent: "",
      EditBoardData: {},
      files: [],
    };
  },

  created() {
    this.id = this.$route.params.id;
    this.fetchModifyData(this.id);
  },

  components: { Editor },

  methods: {
    async handleFileChange(event) {
      this.files = Array.from(event.target.files);
    },

    async fetchModifyData(id) {
      try {
        const response = await this.$axios.get(`/admin/boards/modify?boardId=${id}`);

        this.EditBoardData = response.data;
        this.editorContent = response.data.boardContent;
      } catch (error) {
        console.error("fetchModifyData error: ", error);
      }
    },

    async modifyBoardData() {
      try {
        const formData = new FormData();

        const updateBoardDTO = {
          boardId: this.id,
          boardTitle: this.EditBoardData.boardTitle,
          boardContent: this.editorContent,
          boardYN: this.EditBoardData.boardYN,
        };

        formData.append(
          "updateBoardDTO",
          new Blob([JSON.stringify(updateBoardDTO)], { type: "application/json" })
        );

        this.files.forEach((file) => {
          formData.append("files", file);
        });

        const response = await this.$axios.post("/admin/boards/update", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("게시글이 성공적으로 수정되었습니다.");
        this.$router.push(`/admin/notice/${response.data}`);
      } catch (error) {
        console.error("modifyBoardData error: ", error);
      }
    },

    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style scoped>
.notice-edit-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.notice-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.info-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.info-item {
  flex: 1 1 48%;
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.visibility-toggle {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
}

.visibility-toggle label {
  font-size: 16px;
  font-weight: 600;
  color: #444;
  cursor: pointer;
}

.visibility-toggle input {
  margin-right: 5px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
}

.input-box {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.input-box:focus {
  outline: none;
  border-color: #666;
}

.editor-container {
  background: #fff;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.file-upload {
  display: flex;
  flex-direction: column;
}

.file-input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.submit-btn {
  background-color: #444;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background-color: #333;
}

.cancel-btn {
  background: #bbb;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.cancel-btn:hover {
  background: #999;
}

</style>
