<template>
    <div class="login-container">

      <p>관리자 로그인</p>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">아이디</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            placeholder="아이디를 입력해주세요" 
            required 
          />
        </div>
  
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="비밀번호를 입력해주세요" 
            required 
          />
        </div>
  
        <button type="submit">Login</button>
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
   
    console.log('username', this.username);
    console.log('password', this.password);
    try {
      // /login : 현재 서버의 Security config 로그인 경로에 /login 이 정의되어 있기 때문
      const response = await this.$axios.post("/login", {
        username: this.username,
        password: this.password

      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      console.log('response', response);

      // 로그인 성공 시, 토큰이 Authorization 헤더에 포함되어 있음 (access token)
      const accessToken = response.headers['authorization'];
      if (accessToken) {
      
        localStorage.setItem("access", accessToken);
        console.log('Access Token save', accessToken);
      }

      console.log('Refresh Token = server cookie'); // refresh token 은 서버에서 이미 쿠키에 저장
      alert('로그인 성공');
      this.$router.push("/admin");
      
    } catch (error) {
     
      console.log('username', this.username);
      console.log('password', this.password);
      this.errorMessage = "Invalid username or password!";
    }
  }
}
};
  </script>
  
  <style scoped>

  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  </style>