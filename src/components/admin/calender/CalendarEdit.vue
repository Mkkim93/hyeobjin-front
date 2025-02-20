<template>
    <div class="custom-modal-overlay">
        <div class="custom-modal">

            <h3>📋 일정 수정</h3>
            <form @submit.prevent="editCalendarData">
                <label for="calendarId">No</label>
                <input id="calendarId" v-model="newModifyCalendarData.calendarId" class="form-control mb-2" readonly>

                <label for="title">일정 제목:</label>
                <input id="title" v-model="newModifyCalendarData.title" class="form-control mb-2" type="text">


                <label for="description">일정 내용:</label>
                <textarea id="description" v-model="newModifyCalendarData.description"
                    class="form-control mb-2"></textarea>

                <label for="startTime">시작 날짜:</label>
                <input id="startTime" v-model="newModifyCalendarData.startTime" class="form-control mb-2"
                    type="datetime-local">

                <label for="endTime">종료 날짜:</label>
                <input id="endTime" v-model="newModifyCalendarData.endTime" class="form-control mb-2"
                    type="datetime-local">

                <label for="location">시공 장소</label>
                <input id="location" v-model="newModifyCalendarData.location" class="form-control mb-2" type="text">

                <label for="calenderY">
                    <input id="calenderY" type="radio" v-model="newModifyCalendarData.calendarYN" value="Y">
                    공개</label>
                <label for="calendarN">
                    <input id="calendarN" type="radio" v-model="newModifyCalendarData.calendarYN" value="N">
                    비공개</label>
                <br>
                <br>
                <button type="submit" class="btn btn-primary">수정</button>
                <button class="btn btn-danger" @click="closeModal">닫기</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {

    name: 'CalendarEdit',
    props: {
        editModalOpen: Boolean,
        newModifyCalendarData: Object,
    },

    data() {
        return {
            selectedEvent: [],
        }
    },

    methods: {
        formatDate(date) {
            return dayjs(date).format('YYYY-MM-DD');
        },

        closeModal() {
            this.$emit('close');
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
                console.error('editCalendarData error: ', error);
            }
        },
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