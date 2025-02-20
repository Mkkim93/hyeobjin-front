<template>

    <div class="custom-modal-overlay">
        <div class="custom-modal">
            <h3>일정 등록</h3>
            <form @submit.prevent="postEvent">

                <label for="newTitle">일정 제목:</label>
                <input id="newTitle" v-model="newTitle" class="form-control mb-2" type="text" placeholder="제목 입력">

                <label for="newDescription">일정 설명:</label>
                <textarea id="newDescription" v-model="newDescription" class="form-control mb-2" placeholder="설명 입력"></textarea>

                <label for="newStartTime">시작 날짜:</label>
                <input id="newStartTime" v-model="newStartTime" class="form-control mb-2" type="date" placeholder="시작 날짜 입력">

                <label for="newEndTime">종료 날짜:</label>
                <input id="newEndTime" v-model="newEndTime" class="form-control mb-2" type="date" placeholder="종료 날짜 입력">

                <div>
                    <input class="form-control mb-3" v-model="postcode" placeholder="우편번호">
                    <input class="form-control mb-2" v-model="address" placeholder="주소">
                </div>

                <div class="form-check form-switch mb-4">
                    <input class="form-check-input" type="checkbox" v-model="newHolidays" id="newHolidays">
                    <label class="form-check-label" for="newHolidays">휴무일 여부</label>
                </div>

                <label for="newLocation">상세 주소</label>
                <input id="newLocation" class="form-control mb-2" v-model="newLocation" type="text" placeholder="상세 주소 입력" />
                <button class="btn btn-dark" type="button" @click="openPostcodePopup">주소 검색</button><br>

                <label>
                    <input type="radio" name="newCalendarYN" value="Y" v-model="newCalendarYN" />
                    공개
                </label>

                <label>
                    <input type="radio" name="newCalendarYN" value="N" v-model="newCalendarYN" />
                    비공개
                </label>
                <br>
            <br>
                <button type="submit" class="btn btn-success">등록</button>
                <button class="btn btn-danger" @click="closeModal">닫기</button>
            </form>

        </div>
    </div>

</template>

<script>
import dayjs from 'dayjs';
export default {
    name: 'CreateCalendar',
    props: { createModalOpen: Boolean },

    data() {
        return {
            createAt: '',
            newTitle: '',
            newDescription: '',
            newStartTime: '',
            newEndTime: '',
            postcode: '',
            address: '',
            newLocation: '',
            newCalendarYN: '',
            newHolidays: '',
        }
    },

    watch: {
        createModalOpen(newVal) {
            console.log('📌 CreateCalendar component rendering value:', newVal);
        },
    },

    methods: {
        closeModal() {
            this.$emit('close');
        },

        async postEvent() {
            try {
                const newEvent = {
                    key: this.formatDate(new Date()),
                    highlight: 'blue',
                    startTime: this.formatDate(this.newStartTime),
                    endTime: this.formatDate(this.newEndTime),
                    title: this.newTitle,
                    description: this.newDescription,
                    calendarYN: this.newCalendarYN,
                    location: this.address.concat(this.newLocation),
                    holidays: this.newHolidays,
                };

                await this.$axios.post('/admin/calendar', newEvent, {
                    headers: { 'Content-Type': 'application/json' },
                })

                alert('일정이 추가되었습니다.');

                this.closeModal();
                this.$router.go('/admin/calendar');

            } catch (error) {
                console.error('postEvent error: ', error);
            }

        },

        openPostcodePopup() {
            new daum.Postcode({
                oncomplete: (data) => {
                    this.postcode = data.zonecode;
                    this.address = data.address; 
                }
            }).open();
        },

        formatDate(date) {
            return dayjs(date).format('YYYY-MM-DDTHH:mm');
        }
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