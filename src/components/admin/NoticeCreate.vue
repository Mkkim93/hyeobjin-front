<template>
  <p>공지 등록 페이지 입니다.</p>
  <div>
    <h1>공지 사항을 작성해주세요</h1>

     <!-- 제목 입력 필드 -->
     <input 
      v-model="title" 
      type="text" 
      placeholder="Enter the title here" 
      class="border p-2 w-full mb-4 rounded-md" 
    />

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
        PostFileData: [],
      }
    },

    setup() {
      console.log("NoticeCreate 컴포넌트가 호출 되었습니다.");
    },

    mounted() {
    $('#editor').summernote({
      placeholder: 'Write your content here...',
      tabsize: 2,
      height: 300,
    });
  },
  methods: {
    async submitPost() {
      const content = $('#editor').summernote('code'); // Summernote에서 작성한 내용
      const postData = {
        boardTitle: this.title, // 제목
        boardContent: content, // 본문 내용
        
      };

      const accessToken = localStorage.getItem('access');
      // API로 데이터 전송
       await this.$axios.post('/admin/boards', postData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`, // Bearer로 액세스 토큰 전달
        }
      })
        .then(response => {
          alert('Post submitted successfully!');
          const boardId = response.data;
          this.$router.push(`/admin/notice/${boardId}`);
        })
        .catch(error => {
          console.error('Error submitting post:', error);
          alert('게시글 작성에 실패하였습니다 관리자에게 문의해주세요');
        });
    },
  },
};
</script>

<style>

</style>