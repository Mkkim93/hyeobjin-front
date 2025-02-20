<template>

    <div class="custom-modal-overlay">
        <div class="custom-modal">

            <h3>📅 일정 목록</h3>
            <ul v-if="dayOfEventsData.length > 0" class="event-list">
                <li v-for="event in dayOfEventsData" :key="event.calendarId" @click="selectEvent(event)"
                    :class="{ active: selectedEvent && selectedEvent.calendarId === event.calendarId }">
                    📌 {{ event.title }} ({{ formatDate(event.startTime) }} ~ {{ formatDate(event.endTime) }})
                </li>
            </ul>
            <p v-else class="no-events-message">📢 등록된 일정이 없습니다.</p>

            <div v-if="selectedEvent">
                <h3>📋 상세 일정</h3>
                <p>📅 작성일: {{ formatDate(selectedEvent.createAt) }}</p>
                <p>✏️ 작성자: {{ selectedEvent.writer }}</p>

                <label for="title">📆 일정 제목:</label>
                <input id="title" v-model="selectedEvent.title" class="form-control mb-2" type="text" readonly>

                <label for="description">📝 일정 설명:</label>
                <textarea id="description" v-model="selectedEvent.description" class="form-control mb-2" readonly></textarea>

                <label for="formattedStartTime">⏰ 시작 날짜:</label>
                <input id="formattedStartTime" v-model="formattedStartTime" class="form-control mb-2" type="datetime-local" readonly>

                <label for="formattedEndTime">⏰ 종료 날짜:</label>
                <input id="formattedEndTime" v-model="formattedEndTime" class="form-control mb-2" type="datetime-local" readonly>

                <label for="calendarYN">✔️ 공개 여부:</label>
                <input id="calendarYN" v-model="selectedEvent.calendarYN" class="form-control mb-2" type="text" readonly>

                <label for="location">🚩 시공 장소</label>
                <input id="location" v-model="selectedEvent.location" class="form-control mb-2" type="text" readonly>
            </div>
            <div class="modal-buttons">
                <button class="btn btn-secondary" @click="addEvent">추가</button>
                <button class="btn btn-primary" @click="modifyEvent(selectedEvent)" :disabled="!selectedEvent">수정</button>
                <button class="btn btn-secondary" @click="deleteEvent(selectedEvent.calendarId)">삭제</button>
                <button class="btn btn-danger" @click="closeModal">닫기</button>
            </div>
        </div>
    </div>
</template>

<script>
import { toRaw } from 'vue';
import dayjs from 'dayjs';
export default {
    name: 'CalendarDetail',
    props: {
        modalOpen: Boolean,
        dayOfEventsData: {
            type: Array,
            required: true,
            default: () => []
        }
    },

    data() {
        return {
            selectedEvent: null,
            createModalOpen: false,
            modifyCalendarObject: {},
        };
    },

    computed: {
        formattedStartTime() {
            return this.selectedEvent?.startTime
                ? dayjs(this.selectedEvent.startTime).format('YYYY-MM-DDTHH:mm')
                : '';
        },
        formattedEndTime() {
            return this.selectedEvent?.endTime
                ? dayjs(this.selectedEvent.endTime).format('YYYY-MM-DDTHH:mm')
                : '';
        }
    },

    methods: {
        selectEvent(event) {
            this.selectedEvent = { ...event };
        },

        closeModal() {
            this.$emit('close');
        },

        formatDate(date) {
            return dayjs(date).format('YYYY-MM-DD');
        },

        addEvent() {
            this.emitter.emit('createModalOpen');
        },

        modifyEvent(modifyDataObject) {
            this.modifyCalendarObject = toRaw(modifyDataObject);
            this.emitter.emit('modifyCalendarObject', this.modifyCalendarObject);
        },

        async deleteEvent(deletedId) {
            const isConfirmed = confirm('일정을 삭제 하시겠습니까?');

            if (isConfirmed) {

                try {
                    const response = await this.$axios.delete(`/admin/calendar?calendarId=${deletedId}`);
                    alert(response.data);
                    this.$router.go(0);
                
                } catch (error) {
                    console.error('deleteEvent error: ', error);
                }
            }
        },
    }
};
</script>

<style scoped>
.event-list {
    list-style: none;
    padding: 0;
}

.event-list li {
    padding: 8px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
}

.event-list li:hover {
    background-color: #f0f0f0;
}

.event-list li.active {
    background-color: #007bff;
    color: white;
}

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
</style>
