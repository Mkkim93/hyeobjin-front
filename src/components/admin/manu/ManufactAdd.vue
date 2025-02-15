<template>
  <div class="container my-5">
    <div class="card shadow-sm">
      <div class="card-header bg-dark text-white text-center">
        <h3 class="mb-0">제조사 등록</h3>
      </div>

      <div class="card-body">
        <form @submit.prevent="submitForm">
          <!-- 제조사명 입력 -->
          <div class="mb-3">
            <label for="manuName" class="form-label">📌 제조사명</label>
            <input
              type="text"
              id="manuName"
              v-model="manuName"
              class="form-control"
              placeholder="제조사명을 입력하세요"
              required
            />
          </div>

          <!-- 등록 여부 선택 -->
          <div class="mb-4">
            <label for="manuYN" class="form-label">📋 등록 여부</label>
            <select id="manuYN" v-model="manuYN" class="form-select" required>
              <option value="" disabled selected>등록 여부 선택</option>
              <option value="Y">✅ 등록</option>
              <option value="N">❌ 미등록</option>
            </select>
          </div>

          <!-- 버튼 그룹 -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary w-100">제조사 추가</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManufactAdd",
  data() {
    return {
      manuName: "",
      manuYN: "",
    };
  },

  methods: {
    async submitForm() {
      const manufactureDTO = {
        manuName: this.manuName,
        manuYN: this.manuYN,
      };

      try {
        await this.$axios.post("/admin/manu", manufactureDTO);
        alert(`${this.manuName}의 제조사가 성공적으로 등록되었습니다.`);
        this.$router.push("/admin/manu"); // ✅ Vue Router로 페이지 이동
      } catch (error) {
        console.error("제조사 등록 실패", error);
        alert("제조사 등록에 실패했습니다.");
      }
    },
  },
};
</script>

<style scoped>
/* 컨테이너 설정 */
.container {
  max-width: 500px;
}

/* 카드 스타일 */
.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* 입력 필드 스타일 */
.form-control {
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
}

/* 포커스 효과 */
.form-control:focus,
.form-select:focus {
  border-color: #007bff;
  box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.3);
}

/* 드롭다운 스타일 */
.form-select {
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
}

/* 버튼 스타일 */
.btn {
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
}

/* 반응형 */
@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
}
</style>
