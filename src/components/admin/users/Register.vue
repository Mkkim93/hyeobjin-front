<template>
  <div class="register-container">
    <div class="register-form">
      <h1>관리자 등록</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="username">ID</label>
          <input type="email" v-model="form.username" id="username" required placeholder="이메일을 입력하세요" />
        </div>

        <div class="form-group">
          <label for="password">PASSWORD</label>
          <input type="password" v-model="form.password" id="password" required placeholder="비밀번호를 입력하세요" />
        </div>

        <div class="form-group">
          <label for="name">관리자명</label>
          <input type="text" v-model="form.name" id="name" required placeholder="관리자 이름을 입력하세요" />
        </div>
        
        <div class="form-group">
          <label for="userTel">연락처</label>
          <input type="text" v-model="form.userTel" id="userTel" required placeholder="개인 연락처를 입력하세요" />
        </div>

        <div class="form-group">
          <label for="userMail">이메일</label>
          <input type="text" v-model="form.userMail" id="userMail" required placeholder="이메일 주소를 입력하세요" />
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn">관리자 등록</button>
        </div>
      </form>

      <div v-if="errorMessage" class="error">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        password: '',
        name: '',
        userTel: '',
        userMail: '',
      },
      errorMessage: '',
    };
  },

  methods: {
    async submitForm() {
      try {
        await this.$axios.post('/admin/users/register', this.form);
        alert('관리자 등록 성공');
        this.$router.push('/admin');
      } catch (error) {
        this.errorMessage = error.response?.data || '등록 실패';
      }
    },
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}

.register-form {
  background: #fff;
  padding: 25px;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.register-form h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  text-align: left;
}

.form-group label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: 0.2s ease-in-out;
}

.form-group input:focus {
  border-color: #888;
  outline: none;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background: #444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #333;
}

.error {
  margin-top: 10px;
  color: #d9534f;
  font-size: 14px;
  background: #f9e1e1;
  padding: 8px;
  border-radius: 5px;
  text-align: center;
}
</style>
