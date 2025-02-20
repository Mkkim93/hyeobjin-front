<template>
  <div class="max-w-3xl mx-auto my-5">
  <div class="container">
    <button type="button" class="btn btn-primary"><router-link class="router-container" to="/admin/register">새로운 관리자 등록</router-link></button>
    <h1 class="title">관리자 목록</h1>
    <small>(관리자의 이름 클릭 하시면 권한을 변경 하실 수 있습니다.)</small>
    <div class="table-wrapper">
      <table class="custom-table">
        <thead>
          <tr>
            <th>No</th>
            <th>계정</th>
            <th>이름</th>
            <th>권한</th>
            <th>연락처</th>
            <th>이메일</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="user in UsersList.content" 
            :key="user.id"
            @click="openModal(user.usersId)"
          >
            <td>{{ user.usersId }}</td>
            <td>{{ user.username }}</td>
            <td class="clickable">{{ user.name }}</td>
            <td>{{ user.role === 'ROLE_ADMIN' ? '관리자' : '사용자' }}</td>
            <td>{{ user.userTel }}</td>
            <td>{{ user.userMail }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-container">
      <button :disabled="currentPage === 0" @click="fetchUsersList(currentPage - 1)">이전</button>
      <span>현재 페이지: {{ currentPage + 1 }} / {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages - 1" @click="fetchUsersList(currentPage + 1)">다음</button>
    </div>

    <UserDetail v-if="showModal" :userId="selectedUserId" @close="closeModal" />
    <UserEdit v-if="editModal" :editorUserData="editorUserData" @close="closeEditModal"/>
  </div>
</div>
</template>

<script>
import UserDetail from './UserDetail.vue';
import UserEdit from './UserEdit.vue';

export default {
  name: 'UserManageMent',
  components: {
    UserDetail,
    UserEdit
  },
  data() {
    return {
      UsersList: [],
      currentPage: 0,
      totalPages: 1,
      pageSize: 5,
      showModal: false,
      selectedUserId: null,
      editModal: false,

      editorUserData: {},
    };
  },

  created() {
    this.fetchUsersList(this.currentPage);
  },

  mounted() {
    this.emitter.on('editRole', (editObject) => {
      this.editorUserData = editObject
      console.log('emitter data: ', this.editorUserData);
      this.editModal = true;
    })
  },



  methods: {
    async fetchUsersList(page) {
      try {
        const response = await this.$axios.get(`/admin/users/all?page=${page}&size=${this.pageSize}`);
        this.UsersList = response.data;
        this.currentPage = page;
        this.totalPages = response.data.totalPages;

      } catch (error) {
        console.error('fetchUsersList error: ', error);
      }
    },

    openModal(userId) {
      this.selectedUserId = userId;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedUserId = null;
    },

    openEditModal(userData) {
      this.editorUserData = userData;
      this.showModal = false; 
      this.editModal = true; 
    },

    closeEditModal() {
      this.editModal = false;
      this.editorUserData = null;
    }
  }
};
</script>

<style scoped>

.router-container {
  color: white;
  text-decoration: none;
}
.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.table-wrapper {
  overflow-x: auto;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  background: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
}

.custom-table th,
.custom-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.custom-table thead {
  background: #eee;
}

.custom-table tbody tr:hover {
  background: #f0f0f0;
  cursor: pointer;
}

.clickable {
  color: #666;
  font-weight: bold;
  cursor: pointer;
}

.clickable:hover {
  text-decoration: underline;
  color: #444;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination-container button {
  background: #ddd;
  color: #333;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.2s ease-in-out;
}

.pagination-container button:hover {
  background: #bbb;
}

.pagination-container button:disabled {
  background: #eee;
  cursor: not-allowed;
}

.pagination-container span {
  font-size: 14px;
  color: #666;
}
</style>