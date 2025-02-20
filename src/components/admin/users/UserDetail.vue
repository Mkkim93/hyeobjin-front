<template>
  <div class="custom-modal-overlay">
    <div class="custom-modal">
      <h3>상세 정보</h3>

      <div>
        <p><strong>계정:</strong> {{ userDetailData.username }}</p>
      </div>

      <div>
        <p><strong>관리자명:</strong> {{ userDetailData.name }}</p>
      </div>

      <div>
        <p><strong>권한:</strong> {{ userDetailData.role === 'ROLE_ADMIN' ? '관리자' : '사용자' }}</p>
      </div>

      <div>
        <p><strong>연락처:</strong> {{ userDetailData.userTel }}</p>
      </div>

      <div>
        <p><strong>메일주소:</strong> {{ userDetailData.userMail }}</p>
      </div>

      <div class="d-flex gap-2 justify-content-center">
        <button class="btn btn-secondary" @click="closeModal">닫기</button>
        <button class="btn btn-warning" @click="editRole">변경</button>
        <button class="btn btn-danger" @click="deleteUser">삭제</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetail',
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      userDetailData: {}
    };
  },
  watch: {
    userId: {
      immediate: true,
      handler(newUserId) {
        if (newUserId) {
          this.fetchUsersDetail(newUserId);
        }
      }
    }
  },
  methods: {

    async fetchUsersDetail(usersId) {

      try {
        const response = await this.$axios.get(`/admin/users?usersId=${usersId}`);
        this.userDetailData = response.data;
      } catch (error) {
        console.error('fetchUsersDetail error:', error);
      }
    },

    closeModal() {
      this.$emit('close');
    },

    editRole() {
      this.closeModal();
      this.emitter.emit('editRole', this.userDetailData);
    },

    async deleteUser() {

      const isConfirmed = confirm('관리자 정보를 모두 삭제하시겠습니까? 계속하려면 확인을 눌러주세요');

      if (isConfirmed) {

        const usersId = this.userDetailData.usersId;
        try {
          const response = await this.$axios.delete(`/admin/users?usersId=${usersId}`);

          alert(response.data);
          this.$router.go(0);

        } catch (error) {
          console.error('deleteUser error: ', error);
        }

      } else {
        alert('삭제가 취소 되었습니다.');
        this.closeModal();
      }


    }
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