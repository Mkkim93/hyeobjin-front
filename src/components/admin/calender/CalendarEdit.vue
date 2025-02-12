<template>
    <div class="custom-modal-overlay">
        <div class="custom-modal">

            <h3>📋 일정 수정</h3>
            <form @submit.prevent="editCalendarData">
                <label>No</label>
                <input v-model="newModifyCalendarData.calendarId" class="form-control mb-2" readonly>

                <label>일정 제목:</label>
                <input v-model="newModifyCalendarData.title" class="form-control mb-2" type="text">

                <label>일정 내용용:</label>
                <textarea v-model="newModifyCalendarData.description" class="form-control mb-2"></textarea>

                <label>시작 날짜:</label>
                <input v-model="newModifyCalendarData.startTime" class="form-control mb-2" type="datetime-local">

                <label>종료 날짜:</label>
                <input v-model="newModifyCalendarData.endTime" class="form-control mb-2" type="datetime-local">

                <label>시공 장소</label>
                <input v-model="newModifyCalendarData.location" class="form-control mb-2" type="text">

                <label>공개 여부:</label>
                <input type="radio" v-model="newModifyCalendarData.calendarYN" class="form-control mb-2">
                
                <button type="submit" class="btn btn-primary">수정</button>
                <button class="btn btn-danger" @click="closeModal">닫기</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CalendarEdit',
    data() {
        return {
            selectedEvent: [],
        }
    },

    props: {
        editModalOpen: Boolean,
        newModifyCalendarData: Object,
    },

    methods: {
        formatDate(date) {
            return dayjs(date).format('YYYY-MM-DD');
        },

        closeModal() {
            this.$emit('close'); // 부모 컴포넌트에서 `modalOpen = false` 처리
        },

       async editCalendarData() {

            const updateCalendarDTO = {
                calendarId: this.newModifyCalendarData.calendarId,
                title: this.newModifyCalendarData.title,
                description: this.newModifyCalendarData.description,
                startTime: this.newModifyCalendarData.startTime,
                endTime: this.newModifyCalendarData.endTime,
                location: this.newModifyCalendarData.location,
                calendarYN: this.newModifyCalendarData.calendarYN,
                scheduleStatus: this.newModifyCalendarData.scheduleStatus,
            }

            try {
                await this.$axios.post('/admin/calendar/update', updateCalendarDTO);

                alert('일정이 수정 되었습니다.');
                this.$router.go(0);

            } catch (error) {
                console.log('editCalendarData', error);
            }

        },
    },

    computed: {

    },
}
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