<template>
  <div class="max-w-4xl mx-auto my-10">
    <h1 class="text-2xl font-bold text-center mb-5">관리자 목록</h1>
    <table class="w-full table-auto border-collapse border border-gray-300">
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 p-2">No</th>
          <th class="border border-gray-300 p-2">ID</th>
          <th class="border border-gray-300 p-2">이름</th>
          <th class="border border-gray-300 p-2">권한</th>
          <th class="border border-gray-300 p-2">HP</th>
          <th class="border border-gray-300 p-2">E-Mail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in UsersList.content" :key="user.id" class="text-center hover:bg-gray-100">
          <td class="border border-gray-300 p-2">{{ user.usersId }}</td>
          <td class="border border-gray-300 p-2">{{ user.username }}</td>
          <td class="border border-gray-300 p-2">{{ user.name }}</td>
          <td class="border border-gray-300 p-2">{{ user.role }}</td>
          <td class="border border-gray-300 p-2">{{ user.userTel }}</td>
          <td class="border border-gray-300 p-2">{{ user.userMail }}</td>
        </tr>
      </tbody>
    </table>

    <div>
      <button :disabled="currentPage === 0" @click="fetchUsersList(currentPage - 1)">이전</button>
      <button :disabled="currentPage === totalPages - 1" @click="fetchUsersList(currentPage + 1)">다음</button>
      <p>현재 페이지: {{ currentPage + 1 }} / {{ totalPages }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      UsersList: [],
      currentPage: 0, // 현재 페이지
      totalPages: 1, // 전체 페이지 수
      pageSize: 5,   // 페이지 크기
    }
  },

  created() {
    this.fetchUsersList(this.currentPage);
  },

  methods: {
      async fetchUsersList(page) {
        try {
        const response = await this.$axios.get(`/users?page=${page}&size=${this.pageSize}`);

        this.UsersList = response.data;
        this.currentPage = page;
        this.totalPages = response.data.totalPages;
        console.log(response);
      } catch (error) {
        console.log(error);
        alert('데이터 응답 실패');
      }
    } 
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
.bg-gray-200 {
  text-align: center;
}
</style>