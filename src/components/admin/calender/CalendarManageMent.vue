<template>
  <div class="calendar-container">
    <div class="col-12">
      <VCalendar :attributes="attributes" expanded @dayclick="openEventDetailModal"></VCalendar>
    </div>
  </div>

  <CalendarCreate v-if="createModalOpen" :key="createModalOpen" :createModalOpen="createModalOpen" @close="createModalOpen = false"/>

  <div>
    <CalendarDetail v-if="modalOpen" :dayOfEventsData="dayOfEventsData" :modalOpen="modalOpen"
      @close="modalOpen = false" />
  </div>

  <div>
    <CalendarEdit v-if="editModalOpen" :newModifyCalendarData="newModifyCalendarData" :modalOpen="editModalOpen"
      @close="editModalOpen = false" />
  </div>

</template>

<script>
import CalendarDetail from './CalendarDetail.vue';
import CalendarCreate from './CalendarCreate.vue';
import CalendarEdit from './CalendarEdit.vue';

export default {
  name: 'CalendarManageMent',

  data() {
    return {
      modalOpen: false, // 일정 추가 모달 상태
      createModalOpen: false,
      editModalOpen: false,

      attributes: [],

      // 신규 일정 추가를 위한 데이터
      createAt: '',
      newTitle: '',
      newDescription: '',
      newStartTime: '',
      newEndTime: '',
      newCalendarYN: 'Y',
      newLocation: '',

      postcode: '',
      address: '',

      selectedEventId: null,
      selectedEvent: {

        createAt: '',

      },

      dayOfEventsData: [],

      newModifyCalendarData: null,



    };
  },

  async created() {
    await this.fetchCalendarDataAdmin();
  },

  components: {
    CalendarDetail,
    CalendarCreate,
    CalendarEdit,
  },

  mounted() {
    this.emitter.on('modifyCalendarObject', (modifyCalendarData) => {
      console.log("📢 받은 calendarId:", modifyCalendarData);
      this.newModifyCalendarData = modifyCalendarData;
      console.log('부모 컴포넌트의 에미터 id:', this.newModifyCalendarData);

      // 📌 Detail 모달 닫고 Edit 모달 열기
      this.modalOpen = false;  // Detail 닫기
      this.$nextTick(() => {
        this.editModalOpen = true; // Edit 열기
      });
    });

    this.emitter.on('createModalOpen', () => {
      console.log('📢 받은 createModalOpen 이벤트');
      this.modalOpen = false;
      this.editModalOpen = false;

      this.$nextTick(() => {
        this.createModalOpen = true; // ✅ 강제로 true 설정
        this.$forceUpdate(); // ✅ 강제로 UI 업데이트
        console.log('부모에서 createModalOpen 값:', this.createModalOpen);
      });

    });
  },




  methods: {

    // 📌 일정 클릭 시 상세 모달 오픈
    async openEventDetailModal(day) {
      console.log("📅 클릭한 날짜:", day);

      // 시작시간: 해당 날짜의 00:00:00
      const startTime = `${day.id}T00:00:00`;

      // 종료시간: 해당 날짜의 23:59:59
      const endTime = `${day.id}T23:59:59`;

      console.log('day.dates', day.attributes);

      // 선택된 이벤트 저장
      this.selectedEvent = {
        createAt: day.id,
        startTime: startTime,
        endTime: endTime
      };

      console.log('createAt:', this.selectedEvent.createAt);
      console.log('startTime:', this.selectedEvent.startTime);
      console.log('endTime:', this.selectedEvent.endTime);

      try {

        const response = await this.$axios.get(`/admin/calendar/detail?startTime=${this.selectedEvent.startTime}`);
        console.log('between data', response.data);
        // 📌 API 호출 (startTime과 endTime을 파라미터로 전달)
        // this.fetchDetailStartTimeBetween(startTime, endTime);

        this.dayOfEventsData = response.data;
        console.log('dayOfEventsData', this.dayOfEventsData);

        this.modalOpen = true;
      } catch (error) {
        console.log('openEventDetailModal error', error);
      }
    },

    async fetchCalendarDataAdmin() {

      try {
        const response = await this.$axios.get('/admin/calendar');

        if (!Array.isArray(response.data)) {
          console.error("❌ API 응답 데이터가 배열이 아닙니다:", response.data);
          return;
        }

        console.log('fetchCalendarDataAdmin.response.data', response.data);

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
              placement: 'bottom'
            },
          }));
        console.log('response calendar data', this.attributes);

      } catch (error) {
        console.log('admin call calendar fetch error', error);
      }
    },

  }
}

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

label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
}
</style>
