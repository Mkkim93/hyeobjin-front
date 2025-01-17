<template>
 <div class="max-w-4xl mx-auto my-10">
    <h1 class="text-2xl font-bold text-center mb-5">공지사항</h1>
    <table class="w-full table-auto border-collapse border border-gray-300">
  <thead class="bg-gray-200">
    <tr>
      <th class="border border-gray-300 p-2">번호</th>
      <th class="border border-gray-300 p-2">제목</th>
      <th class="border border-gray-300 p-2">글쓴이</th>
      <th class="border border-gray-300 p-2">조회</th>
      <th class="border border-gray-300 p-2">날짜</th>
    </tr>
  </thead>
  <tbody>
    <tr
      v-for="post in boardList"
      :key="post.boardId"
      class="text-center hover:bg-gray-100"
    >
      <td class="border border-gray-300 p-2">{{post.boardId}}</td>
      <td class="border border-gray-300 p-2 text-left">
        <p @click="$router.push('/notice/' + post.boardId)" tag="td">{{post.boardTitle}}</p>
      </td>
      <td class="border border-gray-300 p-2">{{post.writer}}</td>
      <td class="border border-gray-300 p-2">{{post.boardViewCount}}</td>
      <td class="border border-gray-300 p-2">{{formatDate(post.boardRegDate)}}</td>
    </tr>
  </tbody>
</table>

<!-- //TODO 검색 기능 구현 -->
    <div class="mt-5 flex justify-center">
      <input
        v-model="searchKeyword"
        class="border border-gray-300 p-2 rounded-md"
        type="text"
        placeholder="검색어를 입력해주세요"
      />
      <button
        @click="searchPosts"
        class="ml-2 bg-blue-500 text-white p-2 rounded-md"
      >
        검색
      </button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
    name: 'Notice',
    data() {
      return {
        boardList: [],
      };
    },

    created() {
      this.fetchBoardList();
    },

    methods: {
      async fetchBoardList() {
        try {
          const response = await this.$axios.get('/boards', {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log('response', response);

          this.boardList = response.data.content;

          console.log('this.boardList', this.boardList);

        } catch(error) {

          console.log('response error', error);
        }
      },

      formatDate(date) {
        return dayjs(date).format('YYYY-MM-DD');
      }
    }
};
</script>

<style>
.container {
  max-width: 800px;
}
</style>