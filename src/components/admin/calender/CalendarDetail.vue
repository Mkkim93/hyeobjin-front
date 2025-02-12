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
                <h3>📋 일정 상세</h3>
                <p>📅 작성일: {{ formatDate(selectedEvent.createAt) }}</p>
                <p>✏️ 작성자: {{ selectedEvent.writer }}</p>

                <!-- <label>No</label>
                <input v-model="selectedEvent.calendarId" class="form-control mb-2" readonly> -->

                <label>📆 일정 제목:</label>
                <input v-model="selectedEvent.title" class="form-control mb-2" type="text" readonly>

                <label>📝 일정 설명:</label>
                <textarea v-model="selectedEvent.description" class="form-control mb-2" readonly></textarea>

                <label>⏰ 시작 날짜:</label>
                <input v-model="formattedStartTime" class="form-control mb-2" type="datetime-local" readonly>

                <label>⏰ 종료 날짜:</label>
                <input v-model="formattedEndTime" class="form-control mb-2" type="datetime-local" readonly>

                <label>✔️ 공개 여부:</label>
                <input v-model="selectedEvent.calendarYN" class="form-control mb-2" type="text" readonly>

                <label>🚩 시공 장소</label>
                <input v-model="selectedEvent.location" class="form-control mb-2" type="text" readonly>
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
            default: () => [] // ✅ 기본값을 빈 배열로 설정하여 undefined 방지
        }
    },

    data() {
        return {
            selectedEvent: null, // 선택된 일정 저장
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
        // 📌 특정 일정 클릭 시 상세 보기 업데이트
        selectEvent(event) {
            console.log('event', event);
            this.selectedEvent = { ...event }; // 선택한 일정 상세 표시
            console.log('this.selectedEvent', this.selectedEvent);
        },

        // 📌 모달 닫기 (부모에게 이벤트 전달)
        closeModal() {
            this.$emit('close'); // 부모 컴포넌트에서 `modalOpen = false` 처리
        },

        // 📌 날짜 포맷 변환 (YYYY-MM-DD HH:mm)
        formatDate(date) {
            return dayjs(date).format('YYYY-MM-DD');
        },

        addEvent() {
            console.log('📢 addEvent 버튼 클릭됨');
            this.emitter.emit('createModalOpen'); // ✅ 값을 넘기지 않고 이벤트만 보냄
        },

        modifyEvent(modifyDataObject) {
            console.log('modifyDataObject!!', modifyDataObject);
            this.modifyCalendarObject = toRaw(modifyDataObject);

            console.log('this.modifyCalendarObject', this.modifyCalendarObject);
            this.emitter.emit('modifyCalendarObject', this.modifyCalendarObject);
        },

        async deleteEvent(deletedId) {
            console.log('deleted event 실행', deletedId);

            const isConfirmed = confirm('일정을 삭제 하시겠습니까?');

            if (isConfirmed) {
                try {
                    const response = await this.$axios.delete(`/admin/calendar?calendarId=${deletedId}`);

                    alert(response.data);
                    this.$router.go(0);
                } catch (error) {
                    console.log('일정 삭제 실패');
                }
            }
        },
    }
};
</script>

<style scoped>
/* ✅ 일정 목록 스타일 */
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

/* ✅ 모달 스타일 */
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
</style>
