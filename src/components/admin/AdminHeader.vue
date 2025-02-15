<template>
  <div class="dashboard-container">
    <!-- 📅 캘린더 & 주요 정보 -->
    <div class="row">
      <div class="col-lg-6">
        <div class="card shadow-sm calendar-card">
          <div class="card-body">
            <h5 class="card-title fw-bold">📅 일정 관리</h5>
            <VCalendar :attributes="attributes" expanded title-position="left" />
          </div>
        </div>
      </div>
      
      <div class="col-lg-3">
        <div class="card info-card bg-success text-white">
          <div class="card-body text-center">
            <h6 class="fw-bold">💰 총 매출</h6>
            <p class="small">최근 거래 내역</p>
            <h4 class="fw-bold">+$2000</h4>
          </div>
        </div>
      </div>

      <div class="col-lg-3">
        <div class="card info-card bg-primary text-white">
          <div class="card-body text-center">
            <h6 class="fw-bold">💳 결제 내역</h6>
            <p class="small">Freelance Payment</p>
            <h4 class="fw-bold">$455.00</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- 📌 공지사항 & 문의사항 -->
    <div class="row my-4">
      <div class="col-lg-6">
        <div class="card shadow-sm">
          <div class="card-header bg-white fw-bold d-flex justify-content-between">
            <span>📢 공지 사항</span>
            <router-link to="/admin/notice" class="text-muted small">더보기 ➜</router-link>
          </div>
          <div class="card-body">
            <table class="table table-hover">
              <thead class="table-light">
                <tr>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="board in BoardDataList" :key="board.boardId">
                  <td>
                    <p @click="$router.push('/admin/notice/' + board.boardId)" class="cursor-pointer text-primary fw-bold">
                      {{ board.boardTitle }}
                    </p>
                  </td>
                  <td>{{ board.writer }}</td>
                  <td>{{ formatDateTime(board.boardUpdate) }}</td>
                </tr>
              </tbody>
            </table>
            <router-link to="/admin/notice/add">
              <button class="btn btn-dark mt-3 w-100">공지 작성</button>
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card shadow-sm">
          <div class="card-header bg-white fw-bold d-flex justify-content-between">
            <span>📩 고객 문의</span>
            <router-link to="/admin/inquiry" class="text-muted small">더보기 ➜</router-link>
          </div>
          <div class="card-body">
            <table class="table table-hover">
              <thead class="table-light">
                <tr>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="inquiry in InquiryDataList" :key="inquiry.inquiryId">
                  <td>
                    <p @click="$router.push('/admin/inquiry/' + inquiry.inquiryId)" class="cursor-pointer text-primary fw-bold">
                      {{ inquiry.title }}
                    </p>
                  </td>
                  <td>{{ inquiry.writer }}</td>
                  <td>{{ formatDateTime(inquiry.createAt) }}</td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn-outline-success w-100">문의 답변</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 💳 최근 거래 내역 -->
    <div class="card shadow-sm">
      <div class="card-header bg-white fw-bold d-flex justify-content-between">
        <span>💳 최근 거래 내역</span>
        <span class="text-muted">📅 23 - 30 March 2020</span>
      </div>
      <div class="card-body">
        <div v-for="(transaction, index) in transactions" :key="index" class="d-flex justify-content-between mb-2">
          <span>{{ transaction.name }}</span>
          <span class="text-muted">{{ transaction.date }}</span>
          <span :class="transaction.amount > 0 ? 'text-success' : 'text-danger'">
            {{ transaction.amount > 0 ? '+ ' : '- ' }}${{ Math.abs(transaction.amount) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'AdminHeader',
  data() {
    return {
      transactions: [],
      attributes: [],
    };
  },

  created() {
    this.fetchCalendarData();
  },

  props: {
    BoardDataList: Array,
    InquiryDataList: Array,
  },

  methods: {
    async fetchCalendarData() {
      try {
        const response = await this.$axios.get('/admin/calendar');
        if (!Array.isArray(response.data)) {
          console.error("❌ API 응답 데이터가 배열이 아닙니다:", response.data);
          return;
        }
        this.attributes = response.data.map(event => ({
          key: event.calendarId,
          highlight: 'red',
          dates: { start: event.startTime || event.createAt, end: event.endTime || event.startTime || event.createAt },
          popover: { label: event.title || "제목 없음", visibility: 'hover', placement: 'bottom' },
        }));
      } catch (error) {
        console.log('fetchCalendarData error', error);
      }
    },

    formatDateTime(date) {
      return dayjs(date).format('YYYY-MM-DD');
    }
  },
};
</script>

<style scoped>
/* 🌟 전체 레이아웃 */
.dashboard-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

/* 🌟 카드 디자인 */
.card {
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* 🌟 캘린더 카드 */
.calendar-card {
  background: #f9f9f9;
  padding: 15px;
}

/* 🌟 테이블 스타일 */
.table {
  text-align: left;
}

.table th,
.table td {
  padding: 10px;
  font-size: 14px;
}

/* 🌟 버튼 스타일 */
.btn {
  font-weight: bold;
}

/* 🌟 공지사항 & 문의사항 테이블 */
.table-hover tbody tr:hover {
  background: #f1f1f1;
}

/* 🌟 반응형 디자인 */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 10px;
  }

  .table th,
  .table td {
    font-size: 12px;
  }
}
</style>
