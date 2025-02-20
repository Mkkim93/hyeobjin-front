<template>
  <div class="container my-5">
    <div class="card shadow-sm">
      <div class="card-header bg-dark text-white text-center">
        <h3 class="mb-0">제조사 등록</h3>
      </div>

      <div class="card-body">
        <p class="text-center text-secondary">제조사 동록 시, 해당 제조사가 페이지에 노출됩니다. (미등록 시 관리자 페이지에서만 확인)</p>
        <form @submit.prevent="submitForm">
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

          <div class="mb-4">
            <label for="manuYN" class="form-label">📋 등록 여부</label>
            <select id="manuYN" v-model="manuYN" class="form-select" required>
              <option value="" disabled selected>등록 여부 선택</option>
              <option value="Y">✅ 등록</option>
              <option value="N">❌ 미등록</option>
            </select>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary w-50">등록</button>
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
      manuName: '',
      manuYN: '',
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
        console.error("submitForm error: ", error);
        alert("알수 없는 이유로 제조사 등록에 실패했습니다. 관리자에게 문의 해주세요.");
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}

.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.form-control {
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
}

.form-control:focus,
.form-select:focus {
  border-color: #007bff;
  box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.3);
}

.form-select {
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
}

.btn {
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
}
</style>
