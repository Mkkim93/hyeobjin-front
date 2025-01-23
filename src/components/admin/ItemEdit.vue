<template>
  <div>
    <p>제품 수정 페이지 입니다.</p>
    
    <!-- 제품 수정 폼 -->
    <form @submit.prevent="submitForm">
      <div>
        <label for="productName">제품명:</label>
        <input 
          type="text" 
          id="productName" 
          v-model="product.name" 
          placeholder="제품명을 입력하세요" 
          required 
        />
      </div>
      <div>
        <label for="productPrice">가격:</label>
        <input 
          type="number" 
          id="productPrice" 
          v-model="product.price" 
          placeholder="가격을 입력하세요" 
          required 
        />
      </div>
      <div>
        <label for="productDescription">설명:</label>
        <textarea 
          id="productDescription" 
          v-model="product.description" 
          placeholder="제품 설명을 입력하세요" 
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary">제품 수정</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ItemEdit',
  data() {
    return {
      // 제품 정보를 저장할 객체
      product: {
        name: '',
        price: '',
        description: '',
      },
    };
  },
  methods: {
    async submitForm() {
      // API 호출을 통한 제품 수정 처리 로직
      try {
        const response = await this.$axios.put(`/api/products/${this.product.id}`, this.product);
        // 성공적으로 수정되면 추가 작업 (예: 알림, 페이지 리디렉션 등)
        console.log('제품 수정 완료:', response.data);
        // 예시로 success alert
        alert('제품이 성공적으로 수정되었습니다.');
      } catch (error) {
        console.log('제품 수정 실패', error);
        // 예시로 error alert
        alert('제품 수정에 실패했습니다.');
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

input, textarea {
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