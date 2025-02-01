<template>
  <p>공지 등록 페이지 입니다.</p>
  <div>
    <h1>공지 사항을 작성해주세요</h1>

    <!-- 제목 입력 필드 -->
    <input v-model="title" type="text" placeholder="제목을 입력해주세요" class="border p-2 w-full mb-4 rounded-md" />


     <!-- 공개 여부 선택 -->
     <label for="boardYN" class="block mb-2">공개 여부:</label>
    <select v-model="boardYN" id="boardYN" class="border p-2 rounded-md w-full mb-4">
      <option value="Y">공개</option>
      <option value="N">비공개</option>
    </select>

    <div id="editor"></div>
    <button class="btn btn-primary mt-3" @click="submitPost">Submit</button>
  </div>
  
</template>

<script>
export default {
  name: 'NoticeCreate',
  data() {
    return {
      title: '',
      boardFiles: [],
      boardYN: '',
    }
  },

  setup() {
    console.log("NoticeCreate 컴포넌트가 호출 되었습니다.");
  },

  mounted() {
    $('#editor').summernote({
      placeholder: '내용을 입력해주세요',
      tabsize: 2,
      height: 300,
      callbacks: {
        onImageUpload: (files) => {
          // files가 배열이 아니면 배열로 감싸서 처리
          if (files instanceof FileList) {
            files = Array.from(files); // FileList를 배열로 변환
          }

          files.forEach(file => {
            // 파일 객체가 아닌 경우 처리하지 않도록 검증
            if (file instanceof File) {
              this.boardFiles.push(file);

              const reader = new FileReader();
              reader.onload = (e) => {
                const base64 = e.target.result;
                

                $('#editor').summernote('insertImage', base64, function ($image) {
                $image.attr('data-filename', file.name); // 파일명 저장
            });
        };
        reader.readAsDataURL(file);

              // FileReader가 파일 데이터를 읽도록 설정
              reader.readAsDataURL(file);
            } else {
              console.error('파일 객체가 아닙니다:', file);
            }
          });
        },
        onInit: () => {
          // Summernote 내부 요소에서 aria-hidden을 비활성화
          const hiddenElements = document.querySelectorAll('[aria-hidden="true"]');
          hiddenElements.forEach((element) => {
            element.setAttribute('aria-hidden', 'false'); // 숨김 해제
          });
        },
      }
    });
  },

  methods: {
    async submitPost() {
      const content = $('#editor').summernote('code'); // Summernote에서 작성한 내용
      const formData = new FormData();

      // 게시글 데이터 JSON 형태로 추가
      formData.append('createBoardDTO', new Blob([JSON.stringify({
        boardTitle: this.title,
        boardContent: content,
        boardYN: this.boardYN,
        
      })], { type: 'application/json' }));

      // 파일 데이터를 formData에 추가
      this.boardFiles.forEach((file) => {
        formData.append('files', file); // 파일 데이터를 'files'라는 동일한 이름으로 추가
      });

      console.log('formData:', [...formData.entries()]); // formData 내용 확인

      const accessToken = localStorage.getItem('access');
      console.log('formData', formData);

      // API로 데이터 전송
      try {
        const response = await this.$axios.post('/admin/boards', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${accessToken}`, // Bearer 토큰 방식으로 Authorization 헤더 설정
          }
        });

        alert('Post submitted successfully!');
        const boardId = response.data; // 게시글 ID
        this.$router.push(`/admin/notice/${boardId}`); // 새로 생성된 게시글 페이지로 이동
      } catch (error) {
        console.error('Error submitting post:', error);
        alert('게시글 작성에 실패하였습니다. 관리자에게 문의해주세요.');
      }
    },

  },
};
</script>

<style scoped>
#editor img {
  max-width: 100%;
  /* 이미지가 부모 요소를 넘어가지 않도록 설정 */
  height: auto;
  /* 비율을 유지하며 크기를 조정 */
}
</style>