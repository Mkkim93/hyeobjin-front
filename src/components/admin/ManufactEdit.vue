<template>
    <p>제조사 수정 페이지 입니다 (제조사명 변경 or 제조사 등록/미등록 여부 설정)</p>
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
                    <input type="checkbox" class="ck" v-model="selectedIds" :value="manu.manuId" />
                </td>
                <td>{{ index + 1 }}</td>
                <td>
                    <input v-if="selectedIds.includes(manu.manuId)" v-model="manu.manuName" type="text"
                        :placeholder="'제조사명 수정'" @change="updateStatus(manu)" />
                    <span v-else>{{ manu.manuName }}</span>
                </td>

                <td>{{ manu.itemCount }}</td>
                <td>
                    <select v-if="selectedIds.includes(manu.manuId)" v-model="manu.manuYN" @change="updateStatus(manu)">
                        <option value="Y">등록</option>
                        <option value="N">미등록</option>
                    </select>
                    <span v-else>{{ manu.manuYN === 'Y' ? '등록' : '미등록' }}</span>
                </td>
            </tr>
        </tbody>
    </table>
    <button @click="submitChanges">수정</button>
</template>

<script>
export default {
    name: 'ManufactEdit',

    data() {
        return {
            selectedIds: [], // 선택된 체크박스의 manuId를 저장

            manufactureDTO: {
                manuId: null,
                manuName: null,
                manuYN: null,
            },
        };
    },

    props: {
        ManufactListData: Array, // 제조사 리스트
    
    },

    methods: {
        // 등록 여부 변경 시 호출되는 메소드
        updateStatus(manu) {
            this.manufactureDTO = {
                manuId: manu.manuId,
                manuName: manu.manuName,
                manuYN: manu.manuYN,
            }
        },

        async submitChanges() {
            const isConfirmed = confirm('수정하시겠습니까?');

            if (isConfirmed) {
                try {
                    const response = await this.$axios.post('/admin/manu/update', this.manufactureDTO, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    console.log('response', response);
                    alert('제조사 정보가 수정 되었습니다.');
                    window.location.href = '/admin/manu';
                } catch (error) {
                    console.log('데이터 수정 실패', error);
                }
            } else {
                alert('취소');
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