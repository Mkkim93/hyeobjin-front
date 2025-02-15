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

        <!-- 제조사 리스트 -->
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

        <!-- 삭제 버튼 -->
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

  data() {
    return {
      selectedIds: [], // 선택된 체크박스의 manuId를 저장
    };
  },

  props: {
    ManufactListData: Array, // 제조사 리스트
  },

  methods: {
    async submitDelete() {
      if (this.selectedIds.length === 0) {
        alert("삭제할 제조사를 선택하세요.");
        return;
      }

      const isConfirmed = confirm("🚨 삭제 시 모든 제품과 파일 데이터가 삭제됩니다. 계속 하시겠습니까?");

      if (isConfirmed) {
        try {
          await this.$axios.delete(`/admin/manu`, {
            data: { manuIds: this.selectedIds }, // ✅ 여러 개의 ID를 배열로 전송
            headers: {
              "Content-Type": "application/json",
            },
          });

          alert("선택한 제조사의 모든 제품 정보가 삭제되었습니다.");
          this.$router.push("/admin/manu"); // ✅ 페이지 이동
        } catch (error) {
          console.error("데이터 삭제 실패", error);
        }
      } else {
        alert("삭제가 취소되었습니다.");
      }
    },

    // 전체 선택 기능
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
/* ✅ 컨테이너 정렬 */
.container {
  max-width: 900px;
}

/* ✅ 카드 스타일 */
.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* ✅ 테이블 스타일 */
.table {
  margin-top: 20px;
  text-align: center;
}

/* ✅ 체크박스 스타일 */
.form-check-input {
  transform: scale(1.2);
  cursor: pointer;
}

/* ✅ 버튼 스타일 */
.btn {
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
}

/* ✅ 반응형 */
@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
}
</style>
