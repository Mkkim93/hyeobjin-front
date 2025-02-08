<template>
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
        await this.$axios.post('/register', this.form);
        alert('관리자 등록 성공');
        this.$router.push('/admin'); // redirect: /login
      } catch (error) {
        this.errorMessage = error.response.data || '등록 실패';
      }
    },
  }
};
</script>

<style scoped>
</style>