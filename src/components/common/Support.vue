<template>
  <div class="form-container">
    <h1>견적&실측문의</h1>
    <form @submit.prevent="handleSubmit">
      <!-- 고객유형 -->
      <div>
        <label>고객유형</label>
        <div class="checkbox-container">
          <label><input type="checkbox" v-model="formData.customerType" value="일반 개인" /> 일반 개인</label>
          <label><input type="checkbox" v-model="formData.customerType" value="정보 업체" /> 정보 업체</label>
          <label><input type="checkbox" v-model="formData.customerType" value="인테리어 업체" /> 인테리어 업체</label>
          <label><input type="checkbox" v-model="formData.customerType" value="건축 설계사" /> 건축 설계사</label>
          <label><input type="checkbox" v-model="formData.customerType" value="기타" /> 기타</label>
        </div>
      </div>

      <!-- 성명 / 회사명 -->
      <div>
        <label>성명 / 회사명(담당자명)</label>
        <input type="text" v-model="formData.name" placeholder="이름 또는 회사명을 입력하세요" />
      </div>

      <!-- 연락처 -->
      <div>
        <label>연락처</label>
        <input type="text" v-model="formData.contact" placeholder="연락처를 입력하세요" />
      </div>

      <!-- 이메일 -->
      <div>
        <label>이메일</label>
        <input type="email" v-model="formData.email" placeholder="이메일을 입력하세요" />
      </div>

      <!-- 주소 -->
      <div>
        <label>주소</label>
        <input type="text" v-model="formData.address" placeholder="주소를 입력하세요" />
      </div>

      <!-- 내용 -->
      <div>
        <label>내용</label>
        <textarea v-model="formData.message" placeholder="문의 내용을 입력하세요"></textarea>
      </div>

      <!-- 파일 첨부 -->
      <div>
        <label>파일 첨부</label>
        <input type="file" @change="handleFileUpload" />
        <p v-if="formData.fileName">선택된 파일: {{ formData.fileName }}</p>
      </div>

      <!-- 개인정보 동의 -->
      <div>
        <label>개인정보 수집 및 이용 동의</label>
        <textarea readonly>
          1. 수집하는 개인정보 항목: 성명, 이메일, 일반전화
          2. 수집 목적: 서비스 관련 문의 응대
        </textarea>
        <label>
          <input type="checkbox" v-model="formData.privacyAgree" /> 개인정보 수집 및 이용에 동의합니다.
        </label>
      </div>

      <!-- 등록 버튼 -->
      <div>
        <button type="submit" :disabled="!formData.privacyAgree">등록</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
    name: 'Support',
    data() {
        return  {
            formData: {
        customerType: [],
        name: '',
        contact: '',
        email: '',
        address: '',
        message: '',
        fileName: '',
        privacyAgree: false,
        }
    }
    
    },

    methods: {
    handleSubmit() {
      console.log("폼 데이터:", this.formData);
      alert("폼이 제출되었습니다.");
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.fileName = file.name;
      }
    },
  },
}




</script>

<style>

.checkbox-container {
    display: block;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}
label {
  display: block;
  margin: 10px 0 5px;
}
input,
textarea,
button {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
}
</style>