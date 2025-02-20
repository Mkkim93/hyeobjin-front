<template>
    <div class="max-w-5xl mx-auto my-10">


        <p class="d-inline-flex gap-1">
        </p>
        <div>
            <div class="bg-white shadow-md rounded-lg p-6">
                <h1 class="text-2xl font-bold text-center mb-6">문의 목록</h1>
                <p class="text-center">현재 페이지: {{ currentPage + 1 }} / {{ totalPages }}</p>

                <div class="overflow-x-auto">
                    <table class="w-full border-collapse border border-gray-300 table table-hover">
                        <thead class="bg-gray-200">
                            <tr>
                                <th class="border border-gray-300 p-2">No</th>
                                <th class="border border-gray-300 p-2">제목</th>
                                <th class="border border-gray-300 p-2">작성자</th>
                                <th class="border border-gray-300 p-2">작성일</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(inquiry, count) in InquiryList" :key="inquiry.inquiryId"
                                class="text-center hover:bg-gray-100">
                                <td class="border border-gray-300 p-2">{{ this.currentPage * this.pageSize + count + 1
                                    }}
                                </td>
                                <td>
                                    <p @click="$router.push('inquiry/' + inquiry.inquiryId)" style="cursor: pointer;">
                                        {{ inquiry.title }}
                                    </p>
                                </td>
                                <td class="border border-gray-300 p-2">{{ inquiry.writer }}</td>
                                <td class="border border-gray-300 p-2">{{ formatDate(inquiry.createAt) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="container d-flex flex-column align-items-center my-3">

                    <nav aria-label="Page navigation example">
                        <ul class="flex space-x-2">
                            <li class="page-item" :class="{ 'opacity-50 pointer-events-none': currentPage === 0 }">
                                <a class="px-3 py-2 border rounded-md cursor-pointer"
                                    @click.prevent="changePage(currentPage - 1)">이전</a>
                            </li>
                            <li v-for="page in totalPages" :key="page" class="page-item"
                                :class="{ 'font-bold text-blue-500': currentPage === page - 1 }">
                                <a class="px-3 py-2 border rounded-md cursor-pointer"
                                    @click.prevent="changePage(page - 1)">{{ page }}</a>
                            </li>
                            <li class="page-item"
                                :class="{ 'opacity-50 pointer-events-none': currentPage === totalPages - 1 }">
                                <a class="px-3 py-2 border rounded-md cursor-pointer"
                                    @click.prevent="changePage(currentPage + 1)">다음</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    name: 'InquiryManagement',
    data() {
        return {
            currentPage: 0,
            totalPages: null,
            pageSize: 5,
            pageData: null,

            showCheckBox: false,
            filteredInquiryList: [],
            InquiryList: [],
            selectedInquirys: [],

            allSelected: false,
            handleSelected: false,
        }
    },

    created() {
        this.fetchInquiryListData();
    },

    watch: {
        selectedItems() {
            this.allSelected = this.selectedInquirys.length === this.InquiryList.length;
        }
    },

    methods: {

        async fetchInquiryListData() {

            try {
                const params = {
                    page: this.currentPage,
                    size: this.pageSize,
                };

                const response = await this.$axios.get('/admin/inquiry', {
                    params,
                });

                this.InquiryList = response.data.content;

                this.pageData = response.data;
                this.totalPages = this.pageData.totalPages;

            } catch (error) {
                console.error('fetchInquiryListData error: ', error);
            }
        },

        formatDate(date) {
            return dayjs(date).format('YYYY-MM-DD');
        },

        changePage(pageNumber) {
            if (pageNumber >= 0 && pageNumber < this.totalPages) {
                this.currentPage = pageNumber;
                this.fetchInquiryListData();
            }
        }
    }
}
</script>

<style scoped>
.bg-white {
    background-color: white;
}

table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
}

th,
td {
    padding: 8px;
    text-align: center;
}

.page-item {
    display: inline-block;
    margin: 0 4px;
}

.page-item a {
    text-decoration: none;
    color: #333;
    padding: 6px 12px;
}

.page-item a:hover {
    background-color: #f3f3f3;
}

.page-item .font-bold {
    background-color: #007bff;
    color: white;
    border-radius: 4px;
}
</style>