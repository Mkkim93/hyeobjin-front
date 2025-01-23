<template>
  <div>
    <p>제품 등록 페이지 입니다.</p>

    <form @submit.prevent="submitForm">
      <div>
        <label for="manuName">제조사명:</label>
        <input type="text" id="manuName" v-model="manuName" placeholder="제조사명을 입력하세요" required />
      </div>
      <div>
        <label for="manuYN">등록여부</label>
        <select id="manuYN" v-model="manuYN" placeholder="등록/미등록">
          <option value="" disabled selected>등록여부 선택</option>
          <option value="Y">등록</option>
          <option value="N">미등록</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">추가</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ManufactAdd',
  data() {
    return {
      manuName: '',
      manuYN: '',
    }
  },

  props: {
  },

  methods: {
    async submitForm() {

      const manufactureDTO = {
        manuName: this.manuName,
        manuYN: this.manuYN,
      };

      try {
        await this.$axios.post('/manufacturers', manufactureDTO);
        alert(this.manuName + '의 제조사가 성공적으로 등록되었습니다.');
        window.location.href = '/admin/manu'; // router 안먹힘 나중에 원인 확인 어쩌면 현재 vue 파일 라우터 설정 안해서 그런듯?
      } catch (error) {
        console.log('제조사 등록 실패', error);
        alert('제조사 등록에 실패했습니다.');
      }
    },
  },
};
</script>

<style scoped>
form {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>