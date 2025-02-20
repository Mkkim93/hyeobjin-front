<template>
  <div class="custom-modal-overlay">
    <div class="custom-modal">
      <h3>관리자 권한 수정</h3>

      <div>
        <p><strong>계정:</strong> {{ editorUserData.username }}</p>
      </div>

      <div>
        <p><strong>관리자명:</strong> {{ editorUserData.name }}</p>
      </div>

      <select v-model="selectedRole" id="roleSelect">
      <option v-for="role in roles" :key="role.name" :value="role.name">
        {{ role.description }}
      </option>
    </select>

      <div class="modal-buttons">
        <button class="btn btn-primary" @click="editUserData">수정</button>
        <button class="btn btn-danger" @click="$emit('close')">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editorUserData: Object,
  },
  data() {
    return {
      newEditUserData: {},
      roles: [],
      selectedRole: '',
    };
  },

  created() {
    this.fetchRolData();
  },

  methods: {

    async fetchRolData() {

      try {
        const response = await this.$axios.get('/admin/users/roles');

        this.roles = response.data;

      } catch (error) {
        console.error('fetchRolData error: ', error);
      }
    },

    async editUserData() {

      const usersId = this.editorUserData.usersId;
      const roleType = this.selectedRole;

      try {
        const response = await this.$axios.patch(`/admin/users/role?userId=${usersId}&roleType=${roleType}`);

        alert(response.data);
        this.$router.go(0);

      } catch (error) {
        alert(response.data)
        console.error('editUserData error', error);
      }
    },

    

    editModal() {
        this.$emit('close');
      },
  }
};
</script>
<style scoped>
.custom-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
  }
  
  .custom-modal {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    text-align: center;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  
  .modal-buttons button {
    padding: 8px 12px;
    border: none;
    cursor: pointer;
  }
</style>
