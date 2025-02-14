<template>
    <p>제조사 관리 페이지 입니다.</p>
    <div class="button-container">
        <button type="button" @click="changeStep(0)" class="btn btn-secondary">제조사 목록</button>
        <button class="btn btn-dark" type="button" @click="changeStep(1)">제조사 등록</button>
        <button type="button" @click="changeStep(2)" class="btn btn-warning">제조사 수정</button>
        <button type="button" @click="changeStep(3)" class="btn btn-danger">제조사 삭제</button>
    </div>
    <div>
        <!-- 자식 컴포넌트에 데이터 전달 -->
        <div v-if="step == 0">
            <ManufactList :ManufactListData="ManufactListData" />
        </div>
        <!-- 제조사 추가 버튼 -->
        <div v-if="step == 1">
            <ManufactAdd />
        </div>

        <div v-if="step == 2">
            <ManufactEdit :ManufactListData="ManufactListData" />
        </div>

        <div v-if="step == 3">
            <ManufactDelete :ManufactListData="ManufactListData" />
        </div>
    </div>
</template>

<script>
import ManufactList from './ManufactList.vue';
import ManufactAdd from './ManufactAdd.vue';
import ManufactDelete from './ManufactDelete.vue';
import ManufactEdit from './ManufactEdit.vue';

export default {
    name: 'ManufactManagement',
    data() {
        return {
            step: Number,
            ManufactListData: [],  // 배열로 초기화
        }
    },

    components: {
        ManufactList,  // 자식 컴포넌트 등록
        ManufactAdd,
        ManufactDelete,
        ManufactEdit,
    },

    created() {
        // 컴포넌트가 생성될 때 데이터를 fetch
        this.fetchManuList();
        this.step = 0;
    },

    methods: {
        async fetchManuList() {
            try {
                const response = await this.$axios.get('/admin/manu/count');
                // 받아온 데이터를 ManufactListData에 할당
                this.ManufactListData = response.data;
                console.log('response', response);
                console.log('response.data', response.data);
            } catch (error) {
                console.log('fetchManuCountData get error', error);
            }
        },

        changeStep(newStep) {
            this.step = newStep;
        },

        // 제조사 추가 메서드 (예시)
        async addManuFacturer() {
            try {
                await this.$axios.post('/admin.manu', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // 성공적으로 추가 후 데이터를 다시 fetch하거나, 추가된 데이터를 리스트에 반영
                this.fetchManuList();
            } catch (error) {
                console.log('addManuFacturer error', error);
            }
        },
    }
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

th,
td {
    padding: 8px 12px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
}

/* 버튼을 가로로 정렬하고 스타일 개선 */
.button-container {
    display: flex;
    justify-content: center;
    gap: 10px; /* 버튼 간격 */
    margin-bottom: 20px;
}

.button-container .btn {
    width: 150px; /* 버튼의 고정 너비 */
    padding: 10px;
    font-size: 14px;
    text-align: center;
}

.button-container .btn:hover {
    color: white;
}
</style>