<template>
    <div class="custom-modal">
        <h3>일정 등록</h3>
        <p>선택한 날짜: {{ createAt }}</p>

        <label>일정 제목:</label>
        <input v-model="newTitle" class="form-control mb-2" type="text" placeholder="제목 입력">

        <label>일정 설명:</label>
        <textarea v-model="newDescription" class="form-control mb-2" placeholder="설명 입력"></textarea>

        <label>시작 날짜:</label>
        <input v-model="newStartTime" class="form-control mb-2" type="date" placeholder="시작 날짜 입력">
        <label>종료 날짜:</label>
        <input v-model="newEndTime" class="form-control mb-2" type="date" placeholder="종료 날짜 입력">

        <div>
            <input class="form-control mb-3" v-model="postcode" placeholder="우편번호">
            <input class="form-control mb-2" v-model="address" placeholder="주소">

        </div>

        <label>상세 주소</label>
        <input class="form-control mb-2" v-model="newLocation" type="text" placeholder="상세 주소 입력" />
        <button class="btn btn-dark" @click="openPostcodePopup">주소 검색</button><br>


        <label>
            <input type="radio" name="newCalendarYN" value="Y" v-model="newCalendarYN" />
            공개
        </label>

        <label>
            <input type="radio" name="newCalendarYN" value="N" v-model="newCalendarYN" />
            비공개
        </label>

    </div>
</template>

<script>
export default {
    name: 'CreateCalendar',
    data() {
        return {
            modalOpen: false, // 일정 추가 모달 상태
        }
    },

    setup() {
        console.log('CreateCaendar 컴포넌트 호출');
    },

    methods: {
        // 📌 모달 닫기
        closeModal() {
            this.modalOpen = false;
            this.showEventDetailModal = false;
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
                    location: this.address.concat(this.newLocation),
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

            } catch (error) {
                console.log('일정 추가 실패', error);
            }

            this.$router.go(0);
            this.closeModal(); // 모달 닫기
        },

        openPostcodePopup() {
            new daum.Postcode({
                oncomplete: (data) => {
                    this.postcode = data.zonecode;  // 우편번호 입력
                    this.address = data.address;  // 기본 주소 입력
                }
            }).open();
        },

    },

    props: {
        modalOpen: Boolean,
    },
}
</script>

<style></style>