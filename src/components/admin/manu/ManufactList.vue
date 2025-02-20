<template>
  <div class="container my-5">
    <div class="card shadow-sm">
      <div class="card-header bg-dark text-white text-center">
        <h3 class="mb-0">제조사 목록</h3>
      </div>

      <div class="card-body">
        <p class="text-center text-secondary">현재 등록 된 제조사와 제조사별 등록된 제품의 수를 확인할 수 있습니다.</p>
        <div class="table-responsive">
          <table class="table table-hover text-center">
            <thead class="table-light">
              <tr>
                <th>No.</th>
                <th>제조사명</th>
                <th>등록된 제품 수</th>
                <th>등록 여부</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(manu, index) in ManufactListData" :key="index">
                <td>{{ manu.manuId }}</td>
                <td class="text-primary fw-bold">{{ manu.manuName }}</td>
                <td>{{ manu.itemCount }}</td>
                <td>
                  <span :class="manu.manuYN === 'N' ? 'badge bg-danger' : 'badge bg-success'">
                    {{ manu.manuYN === 'N' ? '미등록' : '등록' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManufactList',
  props: {
    ManufactListData: Array,
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
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
  text-align: center;
}

@media (max-width: 768px) {
  .table-responsive {
    overflow-x: auto;
  }
}
</style>
