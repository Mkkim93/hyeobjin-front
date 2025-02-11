<template>
  <div class="calendar-container">
    <div class="col-12">
      <VCalendar :attributes="attributes" expanded @dayclick="openEventDetailModal"></VCalendar>
    </div>
  </div>

  <!-- 📌 일정 추가 모달 -->
  <!-- <div v-if="modalOpen" class="custom-modal-overlay"> -->
  <!-- <CreateCalendar :modalOpen="modalOpen" /> -->
  <!-- </div> -->

  <CalendarDetail v-if="modalOpen" :event="dayOfEventsData" :modalOpen="modalOpen" @close="modalOpen = false" />

</template>

<script>
import CalendarDetail from './CalendarDetail.vue';
// import CreateCalendar from './CreateCalendar.vue';

export default {
  name: 'CalendarManageMent',


  data() {
    return {
      modalOpen: false, // 일정 추가 모달 상태
      showEventDetailModal: false, // 일정 상세 모달 상태

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

    };
  },

  async created() {
    await this.fetchCalendarDataAdmin();
  },

  components: {
    CalendarDetail,
    // CreateCalendar,
  },



  methods: {

    // 📌 일정 클릭 시 상세 모달 오픈

    async openEventDetailModal(day) {
      console.log("📅 클릭한 날짜:", day);

      // 시작시간: 해당 날짜의 00:00:00
      const startTime = `${day.id}T00:00:00`;

      // 종료시간: 해당 날짜의 23:59:59
      const endTime = `${day.id}T23:59:59`;

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

        const response = await this.$axios.get(`/admin/calendar/detail?startTime=${this.selectedEvent.startTime}&endTime=${this.selectedEvent.endTime}`);
        console.log('response data', response.data);
        // 📌 API 호출 (startTime과 endTime을 파라미터로 전달)
        // this.fetchDetailStartTimeBetween(startTime, endTime);
        
        this.dayOfEventsData = response.data;
        console.log('dayOfEventsData', this.dayOfEventsData);

        this.modalOpen = true;
      } catch (error) {
        console.log('openEventDetailModal error', error);
      }
    },

    // openEventDetailModal(day) {
    //   console.log("📅 클릭한 날짜:", day);

    //   const eventData = toRaw(this.attributes.find(event => event.dates.start === day.id) || {});

    //   if (eventData.title) {

    //     this.selectedEvent = {
    //       createAt: day.id,
    //       title: eventData.title,
    //       description: eventData.popover?.label || '',
    //       startTime: eventData.dates.start,
    //       endTime: eventData.dates.end || eventData.dates.start,
    //       calendarYN: eventData.calendarYN || 'N'
    //     }
    //   } else {
    //     this.createAt = day.id;
    //     this.modalOpen = true;

    //   }
    // },

    async fetchDetailStartTimeBetween() {


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
