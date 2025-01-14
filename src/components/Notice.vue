<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">게시판 목록</h1>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="border border-gray-300 px-4 py-2">제목</th>
          <th class="border border-gray-300 px-4 py-2">작성자</th>
          <th class="border border-gray-300 px-4 py-2">작성일</th>
          <th class="border border-gray-300 px-4 py-2">조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(board, index) in boards"
          :key="index"
          class="hover:bg-gray-50"
        >
          <td class="border border-gray-300 px-4 py-2">
            <router-link
              :to="`/board/${board.id}`"
              class="text-blue-500 hover:underline"
            >
              {{ board.title }}
            </router-link>
          </td>
          <td class="border border-gray-300 px-4 py-2">{{ board.writer }}</td>
          <td class="border border-gray-300 px-4 py-2">
            {{ formatDate(board.createdDate) }}
          </td>
          <td class="border border-gray-300 px-4 py-2 text-center">
            {{ board.viewCount }}
          </td>
        </tr>
        <tr v-if="boards.length === 0">
          <td
            colspan="4"
            class="border border-gray-300 px-4 py-2 text-center text-gray-500"
          >
            게시글이 없습니다.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
    name: 'Notice',
    setup() {
    const boards = ref([
      {
        id: 1,
        title: "첫 번째 게시글",
        writer: "홍길동",
        createdDate: "2025-01-01",
        viewCount: 123,
      },
      {
        id: 2,
        title: "두 번째 게시글",
        writer: "김철수",
        createdDate: "2025-01-10",
        viewCount: 56,
      },
      {
        id: 3,
        title: "세 번째 게시글",
        writer: "박영희",
        createdDate: "2025-01-12",
        viewCount: 78,
      },
    ]);

    const formatDate = (date) => {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(date).toLocaleDateString("ko-KR", options);
    };

    return { boards, formatDate };
  },

  created() {
    this.checkToken().then(() => {
      this.getNotices();
    }).catch((error) => {
      this.errorMessage = "Token is invalid or expired. Please log in again.";
      console.log('error msg', this.errorMessage);
      this.$router.push("/login");
    });
  },
  methods: {
    // Check if the access token exists and is valid
    async checkToken() {
      const token = localStorage.getItem("access");

      if (!token) {
        throw new Error("No access token found.");
      }

      // If token exists, check if it's expired
      if (this.isTokenExpired(token)) {
        // If token is expired, try to refresh it
        await this.refreshToken();
      }
    },

    // Method to check if the token is expired
    isTokenExpired(token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert expiration time to milliseconds
      return Date.now() >= exp;
    },

    // Refresh the access token using the refresh token stored in the cookie
    async refreshToken() {
      try {
        const response = await this.$axios.post("/auth", {}, {
          withCredentials: true
        });

        const newAccessToken = response.headers['authorization'];
        if (newAccessToken) {
          localStorage.setItem("access", newAccessToken);
          console.log("Access token refreshed:", newAccessToken);
        } else {
          throw new Error("Unable to refresh token.");
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
      }
    },

    // Fetch notices from the server after successful token validation
    async getNotices() {
      try {
        const response = await this.$axios.get("/notice", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`
          }
        });

        this.notices = response.data;
      } catch (error) {
        console.error("Error fetching notices:", error);
        this.errorMessage = "Failed to load notices.";
      }
    }
  }
};
</script>

<style>
.container {
  max-width: 800px;
}
</style>