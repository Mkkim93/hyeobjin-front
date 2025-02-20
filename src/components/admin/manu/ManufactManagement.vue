<template>
    <div class="container mt-5">
        <div class="card shadow-sm">
            <div class="card-header bg-dark text-white text-center py-3">
                <h4 class="mb-0">제조사 관리 페이지</h4>
            </div>

            <div class="card-body">
                <div class="d-flex flex-wrap justify-content-center gap-2 mb-4">
                    <button type="button" @click="changeStep(0)" class="btn btn-secondary">제조사 목록</button>
                    <button class="btn btn-dark" type="button" @click="changeStep(1)">제조사 등록</button>
                    <button type="button" @click="changeStep(2)" class="btn btn-warning">제조사 수정</button>
                    <button type="button" @click="changeStep(3)" class="btn btn-danger">제조사 삭제</button>
                </div>

                <div>
                    <div v-if="step === 0">
                        <ManufactList :ManufactListData="ManufactListData" />
                    </div>

                    <div v-if="step === 1">
                        <ManufactAdd />
                    </div>

                    <div v-if="step === 2">
                        <ManufactEdit :ManufactListData="ManufactListData" />
                    </div>

                    <div v-if="step === 3">
                        <ManufactDelete :ManufactListData="ManufactListData" />
                    </div>
                </div>
            </div>
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
            step: 0,
            ManufactListData: [],
        };
    },

    components: {
        ManufactList,
        ManufactAdd,
        ManufactDelete,
        ManufactEdit,
    },

    created() { this.fetchManuList(); },

    methods: {

        async fetchManuList() {

            try {
                const response = await this.$axios.get('/admin/manu/count');

                this.ManufactListData = response.data;

            } catch (error) {
                console.error('fetchManuCountData error: ', error);
            }
        },

        changeStep(newStep) {
            this.step = newStep;
        },

        async addManuFacturer() {

            try {
                await this.$axios.post('/admin/manu',
                    { headers: { 'Content-Type': 'application/json' } });

                this.fetchManuList();

            } catch (error) {
                console.error('addManuFacturer error: ', error);
            }
        },
    }
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

.d-flex.flex-wrap {
    justify-content: center;
}

.btn:hover {
    opacity: 0.9;
}

.table-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    border: 1px solid #ddd;
}

th,
td {
    padding: 12px;
    border: 1px solid #ddd;
}

th {
    background-color: #f8f9fa;
    font-weight: bold;
}

@media (max-width: 768px) {
    .table-container {
        overflow-x: auto;
    }
}
</style>
