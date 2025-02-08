<template>
  <div class="calendar-container">
    <div class="col-12">
      <VCalendar :attributes="attributes" expanded @dayclick="openEventDetailModal"></VCalendar>
    </div>
  </div>

  <!-- 📌 일정 상세 보기 모달 -->
  <div v-if="showEventDetailModal" class="custom-modal-overlay">
    <div class="custom-modal">
      <h3>일정 상세</h3>
      <p>선택한 날짜: {{ selectedEvent.createAt }}</p>
      <p><strong>제목:</strong> {{ selectedEvent.title }}</p>
      <p><strong>설명:</strong> {{ selectedEvent.description }}</p>
      <p><strong>기간:</strong> {{ selectedEvent.startTime }} ~ {{ selectedEvent.endTime }}</p>
      <p><strong>공개 여부:</strong> {{ selectedEvent.calendarYN === 'Y' ? '공개' : '비공개' }}</p>

      <div class="modal-buttons">
        <button class="btn btn-primary" @click="openAddEventModal">추가</button>
        <button class="btn btn-secondary" @click="closeModal">닫기</button>
      </div>
    </div>
  </div>

  <!-- 📌 일정 추가 모달 -->
  <div v-if="modalOpen" class="custom-modal-overlay">
    <div class="custom-modal">
      <h3>일정 추가</h3>
      <p>선택한 날짜: {{ createAt }}</p>

      <label>일정 제목:</label>
      <input v-model="newTitle" class="form-control mb-2" type="text" placeholder="제목 입력">

      <label>일정 설명:</label>
      <textarea v-model="newDescription" class="form-control mb-2" placeholder="설명 입력"></textarea>

      <label>시작 날짜:</label>
      <input v-model="newStartTime" class="form-control mb-2" type="date" placeholder="시작 날짜 입력">

      <label>종료 날짜:</label>
      <input v-model="newEndTime" class="form-control mb-2" type="date" placeholder="종료 날짜 입력">

      <label>
        <input type="radio" name="newCalendarYN" value="Y" v-model="newCalendarYN" />
        공개
      </label>

      <label>
        <input type="radio" name="newCalendarYN" value="N" v-model="newCalendarYN" />
        비공개
      </label>

      <div class="modal-buttons">
        <button class="btn btn-primary" @click="addEvent">추가</button>
        <button class="btn btn-primary" @click="showEventDetailModal">상세</button>
        <button class="btn btn-secondary" @click="closeModal">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarManageMent',

  data() {
    return {
      modalOpen: false, // 일정 추가 모달 상태
      showEventDetailModal: false, // 일정 상세 모달 상태
      selectedEvent: {}, // 선택한 일정 정보
      attributes: [],

      // 신규 일정 추가를 위한 데이터
      createAt: '',
      newTitle: '',
      newDescription: '',
      newStartTime: '',
      newEndTime: '',
      newCalendarYN: 'Y',
    };
  },

  async created() {
    await this.fetchCalendarDataAdmin();
  },

  methods: {

    async fetchCalendarDataAdmin() {

      try {
        const response = await this.$axios.get('/admin/calendar');

        if (!Array.isArray(response.data)) {
          console.error("❌ API 응답 데이터가 배열이 아닙니다:", response.data);
          return;
        }

        console.log('response.data', response.data);

        this.attributes = response.data
          .filter(event => event.startTime && event.endTime) // ✅ startTime, endTime이 없는 데이터 제거
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
              placement: 'top'
            }
          }));
        console.log('response calendar data', this.attributes);
      } catch (error) {
        console.log('admin call calendar fetch error', error);
      }
    },

    // 📌 일정 클릭 시 상세 모달 오픈
    openEventDetailModal(day) {
      console.log("📅 클릭한 날짜:", day);

      // 기존 일정 중 클릭한 날짜의 데이터 가져오기
      const eventData = this.attributes.find(event => event.dates.start === day.id) || {};

      // 이벤트 데이터가 있다면 상세 모달 열기
      if (eventData.title) {
        this.selectedEvent = {
          createAt: day.id,
          title: eventData.title,
          description: eventData.popover?.label || '',
          startTime: eventData.dates.start,
          endTime: eventData.dates.end || eventData.dates.start,
          calendarYN: eventData.calendarYN || 'N',
        };
        this.showEventDetailModal = true;
      } else {
        // 기존 일정이 없으면 바로 추가 모달 열기
        this.createAt = day.id;
        this.openAddEventModal();
      }
    },

    // 📌 상세 모달에서 추가 버튼을 누르면 일정 추가 모달로 전환
    openAddEventModal() {
      this.showEventDetailModal = false; // 상세 모달 닫기
      this.modalOpen = true; // 추가 모달 열기
    },

    // 📌 일정 추가
    addEvent() {
      if (!this.newTitle.trim()) {
        alert("일정 제목을 입력하세요.");
        return;
      }

      try {

      const newEvent = {

        key: this.formatDateTime(new Date()),
        highlight: 'blue',
        startTime: this.formatDateTime(this.newStartTime),
        endTime: this.formatDateTime(this.newEndTime),
        createAt: this.formatDateTime(new Date()),
        title: this.newTitle,
        description: this.newDescription,
        calendarYN: this.newCalendarYN,
      };

      // 프론트엔드 일정 데이터에 추가
      this.attributes.push(newEvent);
      console.log("✅ 추가된 일정:", newEvent);

      // 서버에 일정 저장 요청
      this.$axios.post('/admin/calendar', newEvent, {
        headers: { 'Content-Type': 'application/json' },
      })
      console.log('일정 추가 성공');
      alert('일정이 추가되었습니다.');
      this.$router.push('/admin/calendar');

    } catch(error) {
      console.log('일정 추가 실패', error);
    }
    this.fetchCalendarDataAdmin();
    this.closeModal(); // 모달 닫기
    },

    // 📌 모달 닫기
    closeModal() {
      this.modalOpen = false;
      this.showEventDetailModal = false;
    },

    formatDateTime(date) {
    if (!date) return null; // ✅ date 값이 없으면 null 반환 (오류 방지)

    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T00:00:00`;
  },

    showEventDetailModal() {

    },

    


  },


};
</script>

<style scoped>
/* ✅ 모달 오버레이 */
.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

/* ✅ 모달 스타일 */
.custom-modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
}

/* ✅ 버튼 스타일 */
.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.modal-buttons button {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border-radius: 4px;
}

:deep(.vc-header) {
  color: #fff;
  height: 160px;
}

/* 2) 또 다른 예시: 달력 내부 셀 스타일 */
:deep(.vc-day) {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 30px;
}

:deep(.calendar-wrapper) {
  width: 100%;
  /* 부모 컨테이너가 가득 차도록 설정 */
  max-width: 100%;
  /* 최대 너비 설정 (필요시 조정) */
  margin: 10 auto;
  /* 가운데 정렬 */
}

:deep(.vc-container) {
  width: 100%;
  /* 달력 컨테이너가 부모 크기에 맞게 조정됨 */
}

.bi {
  width: 80%;
}
</style>
