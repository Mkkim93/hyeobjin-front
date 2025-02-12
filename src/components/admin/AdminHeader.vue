<template>
  <div class="container my-4">
    <!-- 카드 정보 섹션 -->
    <div class="row">
      <div class="col-md-6">
        <div class="card credit-card">
          <VCalendar :attributes="attributes" expanded>

          </VCalendar>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card info-card bg-success text-white">
          <div class="card-body">
            <h6>Salary</h6>
            <p class="small">Belong Interactive</p>
            <h4>+$2000</h4>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card info-card bg-primary text-white">
          <div class="card-body">
            <h6>Paypal</h6>
            <p class="small">Freelance Payment</p>
            <h4>$455.00</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- 송장 & 결제 방법 -->
    <div class="row my-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-white fw-bold">공지 사항<router-link>더보기</router-link></div>
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <table>
                <thead>
                  <tr>
                  <th>제목</th>
                  <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="boards in BoardDataList" :key="boards">
                    <td> 
                      <p @click="$router.push('/admin/notice/' + boards.boardId)">
                        {{ boards.boardTitle }} 
                      </p>
                    </td>
                    <td>{{ formatDateTime(boards.boardUpdate) }}</td>
                  </tr>

                </tbody>
              </table>
                
            </div>
            
            <button class="btn btn-dark mt-3 w-100">+ Add New Card</button>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-white fw-bold">고객 문의</div>
          <div class="card-body">
            <ul class="list-unstyled">
              <li class="d-flex justify-content-between align-items-center">
                <span>March 01, 2020</span>
                <span class="text-muted">#MS-415646</span>
                <span>$180</span>
                <a href="#" class="text-primary">📄 PDF</a>
              </li>
              <li class="d-flex justify-content-between align-items-center mt-2">
                <span>February 10, 2021</span>
                <span class="text-muted">#RY-126749</span>
                <span>$250</span>
                <a href="#" class="text-primary">📄 PDF</a>
              </li>
            </ul>
            <button class="btn btn-outline-success w-100">View All</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 청구 정보 -->
    <div class="card my-4">
      <div class="card-header bg-white fw-bold">Billing Information</div>
      <div class="card-body">
        <div v-for="(customer, index) in customers" :key="index" class="border-bottom pb-3 mb-3">
          <h6>{{ customer.name }}</h6>
          <p class="mb-0">Company: {{ customer.company }}</p>
          <p class="mb-0">Email: {{ customer.email }}</p>
          <p>VAT Number: {{ customer.vat }}</p>
          <button class="btn btn-danger btn-sm">Delete</button>
          <button class="btn btn-outline-secondary btn-sm ms-2">Edit</button>
        </div>
      </div>
    </div>

    <!-- 최근 거래 내역 -->
    <div class="card">
      <div class="card-header bg-white fw-bold d-flex justify-content-between">
        <span>Your Transactions</span>
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
      customers: [],
      transactions: [],

      attributes: [],
    }
  },

  setup() {
    // 컴포넌트가 마운트되었을 때 콘솔 로그 출력
    console.log("AdminHeader 컴포넌트가 랜더링 되었습니다.");
  },

  created() {
    this.fetchCalendarData();
  },

  props: {
    BoardDataList: Array,
  },

  methods: {
    async fetchCalendarData() {

      try {
        const response = await this.$axios.get('/admin/calendar');
        if (!Array.isArray(response.data)) {
          console.error("❌ API 응답 데이터가 배열이 아닙니다:", response.data);
          return;
        }
        this.attributes = response.data
          .filter(event => event.startTime && event.endTime)
          .map(event => ({
            key: event.calendarId,
            highlight: 'red',

            dates: {
              start: event.startTime || event.createAt,  // ✅ start 값이 없으면 기본값으로 등록 시간 사용
              end: event.endTime || event.startTime || event.createAt, // ✅ end 값이 없으면 start 값으로 설정
            },

            popover: {
              label: event.title || "제목 없음",  // ✅ title이 없으면 기본값 설정
              visibility: 'hover',
              placement: 'bottom'
            },
          }))
      } catch (error) {
        console.log('fetchCalendarData error', error);
      }
    },

    formatDateTime(date) {
      return dayjs(date).format('YYYY-MM-DD'); 
       }
  },

  components: {
  }
}


</script>

<style>
/* Wrapper */
#wrapper {
  display: flex;
}

/* Sidebar */
#sidebar-wrapper {
  width: 250px;
  min-height: 100vh;
  transition: all 0.3s;
}

/* Sidebar Toggled */
#sidebar-wrapper.toggled {
  margin-left: -250px;
}

/* Page Content */
#page-content-wrapper {
  flex-grow: 1;
  padding-left: 20px;
}

/* Sidebar Links */
.list-group-item {
  transition: all 0.3s ease-in-out;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

/* Navbar */
.navbar {
  padding: 0.75rem 1rem;
}

/* Fade 효과 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>