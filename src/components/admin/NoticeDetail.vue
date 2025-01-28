<template>
    <p>관리자 게시글 상세 페이지</p>
    <div class="max-w-4xl mx-auto p-5 bg-white shadow-md rounded-md">
  
      <!-- 파일 데이터 반복 렌더링 -->
      <div v-if="adminBoardFiles.length > 0" class="mb-6">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">첨부 파일</h2>
        <ul class="list-disc pl-5">
          <li v-for="(file) in adminBoardFiles" :key="file.fileBoxId">
            <a :href="file.filePath" target="_blank" class="text-blue-600 hover:underline">
              {{ file.fileOrgName }}
            </a>
          </li>
        </ul>
      </div>
  
      <!-- 게시글 제목 -->
      <h1 class="text-2xl font-bold text-gray-800 mb-4">{{ boardDetailData.boardTitle }}</h1>
  
      <!-- 게시글 정보 -->
      <div class="flex justify-between items-center text-sm text-gray-500 mb-6">
        <span>작성자: <span class="font-medium text-gray-700">{{ boardDetailData.writer }}</span></span>
        <span>최초 작성일: <span class="font-medium text-gray-700">{{ formatDate(boardDetailData.boardRegdate) }}</span></span>
        <span>최근 수정일: <span class="font-medium text-gray-700">{{ formatDate(boardDetailData.boardUpdate) }}</span></span>
        <span>게시글 유형: <span class="font-medium text-gray-700">{{ boardDetailData.boardType }}</span></span>
        <span>조회 수: <span class="font-medium text-gray-700">{{ boardDetailData.boardViewCount }}</span></span>
        <span>공개여부: <span class="font-medium text-gray-700">{{ boardDetailData.boardYN === 'Y' ? '등록' : '미등록' }}</span></span>
      </div>
  
      <!-- 게시글 내용 -->
      <div class="mb-6">
        <p class="text-gray-700 leading-relaxed">
          {{ boardDetailData.boardContent }}
        </p>
      </div>
    </div>

    
  </template>

<script>
import dayjs from 'dayjs';

export default {
    name: 'NoticeDetail',
    data() {
        return {
            boardDetailData: {},
            adminBoardFiles: [],
        }
    },

    setup() {
        console.log('NoticeDetail 컴포넌트가 실행 되었습니다.');
    },

    created() {
        this.fetchBoardDetailData(this.$route.params.id);
        console.log('this.$route.params.id', this.$route.params.id);
    },

    methods: {
        async fetchBoardDetailData(boardId) {
            try {
                const response = await this.$axios.get(`/admin/boards/detail/${boardId}`);
                
             
            
             this.boardDetailData = response.data;
             this.adminBoardFiles = response.data.adminBoardFiles;
             console.log('response.data', response.data);
             console.log('this.boardDetail.data', this.boardDetailData);
             console.log('this.fileBoxes', this.adminBoardFiles);
            } catch(error) {
                console.log('fetchBoardDetailData error', error);
            }
        },

        formatDate(date) {
            return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
        }
    }

}
</script>

<style>

</style>