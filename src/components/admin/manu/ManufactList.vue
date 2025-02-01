<template>
  <h1>제조사 목록</h1>
    
    <table border="1">
      <thead>
        <tr>
          <th>No.</th>
          <th>제조사명</th>
          <th>등록된 제품 수</th>
          <th>등록 여부</th>
        </tr>
      </thead>
      <tbody>
        
        <tr v-for="(manu, index) in ManufactListData" :key="index">
          <td>{{ ManufactListData[index].manuId }}</td>
          <td>{{ ManufactListData[index].manuName }}</td>
          <td>{{ ManufactListData[index].itemCount }}</td>
          <td>{{ ManufactListData[index].manuYN === 'N' ? '미등록' : '등록' }}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
    name: 'ManufactList',
    data() {
        return { 
        }
    },
    created() {
        
    },

    props: {
        ManufactListData: Array,
    },

    
}

</script>

<style scoped>
.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

table {
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: center;
}

th, td {
  padding: 8px 12px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

</style>