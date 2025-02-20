<template>
  <div class="container my-5">
    <div class="card shadow-sm">
      <div class="card-header bg-danger text-white text-center">
        <h3 class="mb-0">제조사 삭제</h3>
      </div>

      <div class="card-body">
        <p class="text-center text-secondary">
          제조사 삭제 시, 모든 제품과 파일 데이터도 함께 삭제됩니다.
        </p>

        <div class="table-responsive">
          <table class="table table-hover text-center">
            <thead class="table-danger">
              <tr>
                <th><input type="checkbox" @click="selectAll" /></th>
                <th>No.</th>
                <th>제조사명</th>
                <th>등록된 제품 수</th>
                <th>등록 여부</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(manu, index) in ManufactListData" :key="manu.manuId">
                <td>
                  <input type="checkbox" class="form-check-input" v-model="selectedIds" :value="manu.manuId" />
                </td>
                <td>{{ index + 1 }}</td>
                <td>{{ manu.manuName }}</td>
                <td>{{ manu.itemCount }}</td>
                <td>{{ manu.manuYN === 'Y' ? '✅ 등록' : '❌ 미등록' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="text-center mt-4">
          <button @click="submitDelete" class="btn btn-danger w-50">🚨 삭제하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManufactDelete",
  props: { ManufactListData: Array },

  data() {
    return {
      selectedIds: [],
    };
  },

  methods: {

    async submitDelete() {
      if (this.selectedIds.length === 0) {
        alert("삭제할 제조사를 선택해 주세요.");
        return;
      }

      const isConfirmed = confirm("🚨 삭제 시 모든 제품과 파일 데이터가 삭제됩니다. 계속 하시겠습니까?");

      if (isConfirmed) {

        try {
          await this.$axios.delete(`/admin/manu`, {
            data: { manuIds: this.selectedIds },
            headers: { "Content-Type": "application/json" }
          });

          alert("선택한 제조사의 모든 제품 정보가 삭제되었습니다.");
          this.$router.push("/admin/manu");
        
        } catch (error) {
          console.error("submitDelete error: ", error);
        }
      } else {
        alert("삭제가 취소되었습니다.");
      }
    },

    selectAll() {
      if (this.selectedIds.length === this.ManufactListData.length) {
        this.selectedIds = [];
      } else {
        this.selectedIds = this.ManufactListData.map((manu) => manu.manuId);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
}

.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.table {
  margin-top: 20px;
  text-align: center;
}

.form-check-input {
  transform: scale(1.2);
  cursor: pointer;
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
