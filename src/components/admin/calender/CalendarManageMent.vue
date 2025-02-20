<template>
  <div class="calendar-container">
    <div class="w-100 mx-auto">
      <VCalendar :attributes="attributes" expanded @dayclick="openEventDetailModal" />
    </div>
  </div>

  <CalendarCreate v-if="createModalOpen" :key="createModalOpen" :createModalOpen="createModalOpen"
    @close="createModalOpen = false" />

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
      newModifyCalendarData: null,

      modalOpen: false,
      createModalOpen: false,
      editModalOpen: false,
      
      attributes: [],
      dayOfEventsData: [],
      
      selectedEvent: { createAt: '' },
    };
  },

  async created() { await this.fetchCalendarDataAdmin(); },

  mounted() {

    this.emitter.on('modifyCalendarObject', (modifyCalendarData) => {

      this.newModifyCalendarData = modifyCalendarData;
      this.modalOpen = false;

      this.$nextTick(() => {
        this.editModalOpen = true;
      });
    });

    this.emitter.on('createModalOpen', () => {
      this.modalOpen = false;
      this.editModalOpen = false;

      this.$nextTick(() => {
        this.createModalOpen = true;
        this.$forceUpdate();
      });
    });
  },

  components: {
    CalendarDetail,
    CalendarCreate,
    CalendarEdit,
  },

  methods: {

    async openEventDetailModal(day) {
      const startTime = `${day.id}T00:00:00`;
      const endTime = `${day.id}T23:59:59`;

      this.selectedEvent = {
        createAt: day.id,
        startTime: startTime,
        endTime: endTime
      };

      try {

        const response = await this.$axios.get(`/admin/calendar/detail?startTime=${this.selectedEvent.startTime}`);

        this.dayOfEventsData = response.data;
        this.modalOpen = true;

      } catch (error) {
        console.error('openEventDetailModal error: ', error);
      }
    },

    async fetchCalendarDataAdmin() {
      try {
        const response = await this.$axios.get('/admin/calendar');

        if (!Array.isArray(response.data)) {
          return;
        }

        const newAttributes = response.data
          .filter(event => event.startTime && event.endTime)
          .map(event => ({
            key: event.calendarId,

            highlight: [{
              color: event.holidays ? 'red' : 'blue',
              fillMode: 'solid'
            }],

            dot: {
              color: event.holidays ? 'red' : 'blue',
              class: 'highlight-dot'
            },

            dates: {
              start: event.startTime || event.createAt,
              end: event.endTime || event.startTime || event.createAt,
            },

            popover: {
              label: event.title || "제목 없음",
              visibility: 'hover',
              placement: 'bottom'
            }
          }));

        const mergedAttributes = [...this.attributes, ...newAttributes];
        this.attributes = Array.from(new Set(mergedAttributes.map(attr => JSON.stringify(attr)))).map(attr => JSON.parse(attr));

      } catch (error) {
        console.error('fetchCalendarDataAdmin error: ', error);
      } 
    }
  }
}

</script>

<style scoped>
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

.custom-modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
}

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

:deep(.vc-day) {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 30px;
}

:deep(.calendar-wrapper) {
  width: 100%;
  max-width: 100%;
  margin: 10 auto;
}

:deep(.vc-container) {
  width: 100%;
}

.bi {
  width: 80%;
}

label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
}

:deep(.vc-container .vc-weekday-1, .vc-container .vc-weekday-7) {
  color: red;
}
</style>
