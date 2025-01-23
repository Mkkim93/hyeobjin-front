<template>
  <p>제조사 삭제 페이지 입니다 (제조사 삭제 시, 모든 제품과 파일 데이터도 삭제됩니다.)</p>
  <table border="1">
    <thead>
      <tr>
        <th></th>
        <th>No.</th>
        <th>제조사명</th>
        <th>등록된 제품 수</th>
        <th>등록 여부</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(manu, index) in ManufactListData" :key="manu.manuId">
        <td>
          <input type="checkbox" class="ck" v-model="selectedId" :value="manu.manuId" />
        </td>
        <td>{{ index + 1 }}</td>
        <td>
          <span>{{ manu.manuName }}</span>
        </td>

        <td>{{ manu.itemCount }}</td>
        <td>
          <span>{{ manu.manuYN === 'Y' ? '등록' : '미등록' }}</span>
        </td>
      </tr>
    </tbody>
  </table>
  <button @click="submitDelete">삭제</button>
</template>

<script>
export default {
  name: 'ManufactDelete',

  data() {
    return {
      selectedId: [], // 선택된 체크박스의 manuId를 저장
    };
  },

  props: {
    ManufactListData: Array, // 제조사 리스트

  },

  methods: {
    async submitDelete() {
      const isConfirmed = confirm('삭제 시 모든 제품정보와 파일정보가 삭제됩니다. 계속 하시겠습니까?');
      
      if (isConfirmed) {
        try {
          const response = await this.$axios.delete(`/manufacturers?manuId=${this.selectedId}`, {
           
            headers: {
              "Content-Type": "application/json",
            }
          })
         
          alert('해당 제조사의 모든 제품 정보가 삭제 되었습니다.');
          window.location.href = '/admin/manu';
        } catch (error) {
          console.log('데이터 삭제 실패', error);
        }
      } else {
        alert('삭제가 취소 되었습니다.');
      }
    },


  },
};
</script>

<style scoped>
.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px;
}

table {
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: center;
}

th,
td {
  padding: 8px 12px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
</style>