<template>
  <div class="login-container">
    <h2 class="login-title">관리자 로그인</h2>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">아이디</label>
        <input type="text" id="username" v-model="username" placeholder="아이디를 입력해주세요" required class="input-field"/>
      </div>

      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력해주세요" required class="input-field"/>
      </div>

      <button type="submit" class="login-btn">로그인</button>
    </form>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await this.$axios.post("/login", {
          username: this.username,
          password: this.password
        }, {
          headers: { "Content-Type": "application/json" }
        });

        const accessToken = response.headers['authorization'];
        if (accessToken) {
          localStorage.setItem("access", accessToken);
        }

        alert('로그인 성공');
        this.$router.push("/admin");

      } catch (error) {
        this.errorMessage = "아이디와 비밀번호를 다시 확인해주세요.";
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 360px;
  margin: 50px auto;
  padding: 25px;
  background: #fefefe;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.login-title {
  font-size: 22px;
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 15px;
}

.form-group {
  text-align: left;
  margin-bottom: 15px;
}

.form-group label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
  display: block;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: #fafafa;
  transition: all 0.3s;
}

.input-field:focus {
  border-color: #b19777;
  outline: none;
  background-color: #fff;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #b19777;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn:hover {
  background-color: #a18265;
}

.error-message {
  color: #d9534f;
  font-size: 14px;
  margin-top: 12px;
}
</style>
