<template>
  <div class="max-w-4xl mx-auto p-5 bg-white shadow-md rounded-md">

  <h1 class="text-2xl font-bold text-gray-800 mb-4">{{BoardDetail.boardTitle}}</h1>

 
  <div class="flex justify-between items-center text-sm text-gray-500 mb-6">
    <span>작성자: <span class="font-medium text-gray-700">{{BoardDetail.writer}}</span></span>
    <span>작성일: <span class="font-medium text-gray-700">{{formatDate(BoardDetail.boardRegdate)}}</span></span>
  </div>

 
  <div class="mb-6">
    <p class="text-gray-700 leading-relaxed">
      {{BoardDetail.boardContent}}
    </p>
  </div>

  <hr class="my-6 border-gray-300">
  
  <div>
    <h2 class="text-lg font-semibold text-gray-800 mb-4">댓글</h2>

   
    <div class="mb-6">
      <textarea
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        rows="4"
        placeholder="댓글을 입력하세요..."
      ></textarea>
      <button class="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        댓글 등록
      </button>
    </div>

  
    <div class="space-y-4">
      <div class="p-4 border border-gray-200 rounded-md bg-gray-50">
        <div class="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span class="font-medium text-gray-700">댓글 작성자</span>
          <span>2025-01-17</span>
        </div>
        <p class="text-gray-700">여기에 댓글 내용이 표시됩니다.</p>
      </div>
      <div class="p-4 border border-gray-200 rounded-md bg-gray-50">
        <div class="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span class="font-medium text-gray-700">다른 작성자</span>
          <span>2025-01-16</span>
        </div>
        <p class="text-gray-700">또 다른 댓글 내용입니다.</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    name: 'BoardDetail',
    data() {
        return {
            BoardDetail: null,
          
        }
    },
    props: {
      
    },

    created() {
      this.fetchBoardDetails(this.$route.params.id);
      console.log('this.$route.params.id', this.$route.params.id);
      
    },

    methods: {
      async fetchBoardDetails(id) {
        try {
          const response = await this.$axios.get(`/boards/detail?boardId=${id}`, {
            headers: {
            "Content-Type": "application/json", 
          },
        });

        this.BoardDetail = response.data;
          console.log('response', response);
          console.log('BoardList', BoardDetail);
        } catch(error) {
          console.log('error', error);
        } 
      },

      formatDate(date) {
        return dayjs(date).format('YYYY-MM-DD');
      },
    }
}
</script>

<style>
</style>