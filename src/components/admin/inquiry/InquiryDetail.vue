<template>
    <div class="container mt-4">
        <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="h5 mb-0 text-primary">📌 {{ inquiryDetail.title }}</h4>
                <button @click="deleted" class="btn btn-outline-danger btn-sm">삭제</button>
            </div>

            <div class="card-body">
                <div class="info-group">
                    <div>
                        <strong>👤 작성자:</strong> {{ inquiryDetail.writer }}
                    </div>
                    <div>
                        <strong>📱 연락처:</strong> {{ inquiryDetail.tel }}
                        
                    </div>
                    <div>
                        <strong>📅 작성일:</strong> {{ formatDate(inquiryDetail.createAt) }}
                    </div>
                    <div>
                        <strong>✉️ 이메일:</strong> {{ inquiryDetail.email }}
                    </div>
                </div>

                <hr />

                <div class="info-group">
                    <div>
                        <strong>🏷 제품명:</strong> {{ inquiryDetail.itemName }}
                    </div>
                    <div>
                        <strong>📌 제품 타입:</strong> {{ inquiryDetail.itemTypeName }}
                    </div>
                    <div>
                        <strong>🏭 제조사:</strong> {{ inquiryDetail.manuName }}
                    </div>
                </div>

                <hr />

                <div class="content-box">
                    <h6 class="text-secondary">📜 문의 내용</h6>
                    <div class="content" v-html="inquiryDetail.content"></div>
                </div>

                <div class="info-group mt-3">
                    <div>
                        <strong>📍 주소:</strong> {{ inquiryDetail.addr }}
                    </div>
                    <div>
                        <strong>🏠 상세 주소:</strong> {{ inquiryDetail.detailAddr }}
                    </div>
                </div>

                <div v-if="inquiryFilesList && inquiryFilesList.length" class="mt-4">
                    <h6 class="text-secondary">📎 첨부파일</h6>
                    <table class="table table-sm table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>파일명</th>
                                <th>다운로드</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="file in inquiryFilesList" :key="file.id">
                                <td>{{ file.fileOrgName }}</td>
                                <td>
                                    <a href="#" @click.prevent="preview(file.fileBoxId)"
                                        class="btn btn-outline-primary btn-sm">
                                        미리보기 🔍
                                    </a>

                                    <button :href="`/inquiry/${file.fileName}`"
                                        @click="downloadFile(file.fileBoxId, file.fileOrgName)" target="_blank"
                                        class="btn btn-outline-primary btn-sm">
                                        다운로드 🔽
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card-footer text-end text-muted">
                <small>최종 수정: {{ formatDate(inquiryDetail.updateAt) }}</small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InquiryDetail',
    data() {
        return {
            id: null,
            inquiryDetail: {},
            inquiryFilesList: [],
        };
    },

    created() {
        this.id = this.$route.params.id;
        this.fetchInquiryDetailData(this.id);
    },

    watch: {
        id(newId) {
            if (newId) {
                this.fetchInquiryDetailData(newId);
            }
        }
    },

    methods: {

        async fetchInquiryDetailData(inquiryId) {
            try {
                const response = await this.$axios.get(`/admin/inquiry/detail?inquiryId=${inquiryId}`);

                this.inquiryDetail = response.data;
                this.inquiryFilesList = response.data.inquiryFiles;

            } catch (error) {
                console.error('fetchInquiryDetailData error: ', error);
            }
        },

        formatDate(date) {
            if (!date) return "날짜 없음";
            return new Date(date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
        },

        deleted() {
            console.log("삭제 기능 구현 예정");
        },

        async downloadFile(fileboxId, fileName) {

            try {
                const response = await this.$axios.get(`/admin/inquiry/files/download/${fileboxId}`,
                    {},
                    { responseType: 'blob' }
                );

                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');

                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();

                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);

            } catch (error) {
                console.error('downloadFile error: ', error);
            }
        },

        async preview(fileBoxId) {
            try {
                const response = await this.$axios.get(`/admin/inquiry/files/preview/${fileBoxId}`,
                    { responseType: 'blob' });

                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const fileURL = URL.createObjectURL(blob);
                
                window.open(fileURL, '_blank');

            } catch (error) {
                console.error('preview error: ', error);
            }
        }
    }

}
</script>

<style scoped>
.container {
    max-width: 800px;
}

.card {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
}

.card-header {
    background-color: #f8f9fa;
    font-weight: bold;
    padding: 12px;
}

.info-group {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px 0;
}

.content-box {
    padding: 15px;
    background: #f9f9f9;
    border-radius: 5px;
}

.content {
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
}

.table {
    margin-top: 10px;
}

.table th {
    text-align: center;
}

.table td {
    vertical-align: middle;
}

.btn-sm {
    font-size: 0.85rem;
}
</style>