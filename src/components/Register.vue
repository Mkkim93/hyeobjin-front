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
  import axios from 'axios';
  
  export default {
    name: 'Register',
    data() {
      return {
        form: {
          username: '',
          password: '',
          name: '',
        },
        errorMessage: '',
      };
    },
  
    methods: {
      async submitForm() {
        try {
          const response = await this.$axios.post('/api/register', this.form);
          alert('관리자 등록 성공');
          this.$router.push('/login'); // redirect: /login
        } catch (error) {
          this.errorMessage = error.response.data || '등록 실패';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-form {
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    font-size: 16px;
    color: #444;
    display: block;
    margin-bottom: 8px;
  }
  
  .form-group input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s;
  }
  
  .form-group input:focus {
    border-color: #4a90e2;
    outline: none;
  }
  
  .submit-btn {
    width: 100%;
    padding: 14px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-btn:hover {
    background-color: #357ab7;
  }
  
  .error {
    color: red;
    font-size: 14px;
    margin-top: 20px;
    text-align: center;
  }
  </style>