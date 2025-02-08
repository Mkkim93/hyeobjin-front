<template>
  <div class="max-w-4xl mx-auto p-0 bg-white shadow-md rounded-md">

  <h1 class="text-2xl font-bold text-gray-800 mb-4">{{BoardDetail.boardTitle}}</h1>

 
  <div class="flex justify-between items-center text-sm text-gray-500 mb-6">
    <span>작성자: <span class="font-medium text-gray-700">{{BoardDetail.writer}}</span></span>
    <span>작성일: <span class="font-medium text-gray-700">{{formatDate(BoardDetail.boardRegdate)}}</span></span>
  </div>
  
  <div class="mb-6">
      <div
        class="text-gray-700 leading-relaxed"
        v-html="BoardDetail.boardContent"
      ></div>
    </div>
</div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    name: 'BoardDetail',
    data() {
        return {
            BoardDetail: {},
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

<style scoped>

</style>