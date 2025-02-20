<template>
  <div class="container my-5">
    <div class="card shadow-sm">
      <div class="card-header bg-dark text-white text-center">
        <h3 class="mb-0">제조사 수정</h3>
      </div>

      <div class="card-body">
        <p class="text-center text-secondary">제조사명 변경 및 등록/미등록 상태를 설정하세요.</p>

        <div class="table-responsive">
          <table class="table table-hover text-center">
            <thead class="table-light">
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
                <td>
                  <input v-if="selectedIds.includes(manu.manuId)" v-model="manu.manuName" type="text"
                    class="form-control" placeholder="제조사명 수정" @change="updateStatus(manu)" />
                  <span v-else>{{ manu.manuName }}</span>
                </td>
                <td>{{ manu.itemCount }}</td>
                <td>
                  <select v-if="selectedIds.includes(manu.manuId)" v-model="manu.manuYN" class="form-select"
                    @change="updateStatus(manu)">
                    <option value="Y">✅ 등록</option>
                    <option value="N">❌ 미등록</option>
                  </select>
                  <span v-else>{{ manu.manuYN === 'Y' ? '✅ 등록' : '❌ 미등록' }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="text-center mt-4">
          <button @click="submitChanges" class="btn btn-warning w-50">수정하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManufactEdit",
  props: { ManufactListData: Array },

  data() {
    return {
      selectedIds: [],

      manufactureDTO: {
        manuId: null,
        manuName: null,
        manuYN: null,
      },
    };
  },

  methods: {

    updateStatus(manu) {
      this.manufactureDTO = {
        manuId: manu.manuId,
        manuName: manu.manuName,
        manuYN: manu.manuYN,
      };
    },

    async submitChanges() {
      const isConfirmed = confirm("제조사 정보를 수정하시겠습니까?");

      if (isConfirmed) {
        try {
          await this.$axios.post("/admin/manu/update", this.manufactureDTO,
            { headers: { "Content-Type": "application/json" } });

          alert("제조사 정보가 수정되었습니다.");
          this.$router.push("/admin/manu"); // ✅ 페이지 이동
        
        } catch (error) {
          console.error("submitChanges error: ", error);
        }
      } else {
        alert("제조사 수정이 취소되었습니다.");
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

.form-control {
  border-radius: 8px;
  padding: 8px;
  font-size: 1rem;
}

.form-select {
  border-radius: 8px;
  padding: 8px;
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