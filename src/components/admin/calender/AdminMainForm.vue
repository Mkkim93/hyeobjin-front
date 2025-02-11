<template>
    <!-- 송장 & 결제 방법 -->
    
    <!-- 카드 정보 섹션 -->

    <div class="col-12">
        <VCalendar :attributes="attributes" expanded @dayclick="openModal">
        </VCalendar>
    </div>


    <div v-if="modalOpen" class="custom-modal-overlay">
        <div class="custom-modal">
            <h3>일정 추가</h3>
            <p>선택한 날짜: {{ this.createAt }}</p>

            <label>일정 제목:</label>
            <input v-model="newTitle" class="form-control mb-2" type="text" placeholder="제목 입력">

            <label>일정 설명:</label>
            <textarea v-model="newDescription" class="form-control mb-2" placeholder="설명 입력"></textarea>

            <label>시작 날짜:</label>
            <input v-model="newStartTime" class="form-control mb-2" type="date" placeholder="시작 날짜 입력">

            <label>종료 날짜:</label>
            <input v-model="newEndTime" class="form-control mb-2" type="date" placeholder="종료 날짜 입력">

            <label for="newCalendarYN">
                <input type="radio" id="newCalendarYN" name="newCalendarYN" value="Y" v-model="newCalendarYN" />
                공개
            </label>

            <label for="newCalendarYN">
                <input type="radio" id="newCalendarYN" name="newCalendarYN" value="N" v-model="newCalendarYN" />
                비공개
            </label>

            
        </div>
    </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import 'v-calendar/style.css';
import axios from '@/plugins/axios.js';
export default {
    name: 'AdminMainForm',
    data() {
        return {
            transactions: [],
            customers: [],


            attributes: [],
            modalOpen: false,

            newCreateAt: new Date().toISOString().split('T')[0], // 기본값: 오늘 날짜
            newStartTime: new Date().toISOString().split('T')[0], // 기본값: 오늘 날짜
            newEndTime: new Date().toISOString().split('T')[0], // 기본값: 오늘 날짜
            newTitle: '',
            newCalendarYN: '',
            newDescription: '',
            newLocation: '',
            newScheduleStatus: '',
        }
    },
    setup() {
        // ✅ attributes를 ref로 관리하여 반응성을 높임
        const attributes = ref([]);
        const modalOpen = ref(false);

        // ✅ 일정 추가를 위한 상태 변수들 (초기값: 오늘 날짜)
        const newCreateAt = ref(new Date().toISOString().split('T')[0]);
        const newStartTime = ref(new Date().toISOString().split('T')[0]);
        const newEndTime = ref(new Date().toISOString().split('T')[0]);
        const newTitle = ref('');
        const newCalendarYN = ref('');
        const newDescription = ref('');
        const newLocation = ref('');
        const newScheduleStatus = ref('');
        
        onMounted(() => {
            fetchCalendarAdminData();
        });
        // ✅ 캘린더 데이터 가져오기
        const fetchCalendarAdminData = async () => {
            try {
                const response = await axios.get('/admin/calendar');

                console.log("📢 서버 응답 데이터:", response.data);

                if (!Array.isArray(response.data)) {
                    console.error("❌ API 응답 데이터가 배열이 아닙니다:", response.data);
                    return;
                }

                attributes.value = response.data.map(event => ({
                    key: event.calendarId,
                    
                    highlight: {
                        start: { style: { backgroundColor: 'red', color: 'white' } }, // 시작 부분 스타일
                        base: { style: { backgroundColor: 'pink', color: 'white' } }, // 중간 부분 스타일
                        end: { style: { backgroundColor: 'red', color: 'white' } } // 끝 부분 스타일
                    },
                    dates: { start: new Date(event.startTime), end: new Date(event.endTime) }, // ✅ 날짜 범위 적용
                    popover: { title: event.title },
                }));

                console.log("✅ 변환된 attributes:", attributes.value);
            } catch (error) {
                console.log('❌ fetchCalendarAdminData axios error:', error);
            }
        };


        const getDateRange = (start, end) => {
            let dates = [];
            let currentDate = new Date(start);

            while (currentDate <= new Date(end)) {
                dates.push(new Date(currentDate)); // 날짜 추가
                currentDate.setDate(currentDate.getDate() + 1); // 하루 증가
            }

            return dates;
        };

        // ✅ 날짜 클릭 시 모달 열기
        const openModal = (day) => {
            console.log("📅 날짜 클릭됨!!:", day);
            newCreateAt.value = day.id;
            newStartTime.value = day.id;
            newEndTime.value = day.id;
            modalOpen.value = true;
            nextTick();
        };

        // ✅ 일정 추가 로직
        const addEvent = async () => {
            if (!newTitle.value.trim()) {
                alert("일정 제목을 입력하세요.");
                return;
            }

            const formatDateTime = (date) => {
                return date + "T00:00:00"; // 날짜에 'T00:00:00' 추가 (LocalDateTime 형식 맞춤)
            };

            const customData = {
                title: newTitle.value,
                startTime: formatDateTime(newStartTime.value),
                endTime: formatDateTime(newEndTime.value),
                createAt: formatDateTime(newCreateAt.value),
                description: newDescription.value,
                calendarYN: newCalendarYN.value,
            };

            try {
                const response = await axios.post('/admin/calendar', customData, {

                    headers: {
                        'Content-Type': 'application/json'
                    },

                });

                // if (!response.ok) throw new Error('Failed to add event');

                console.log("✅ 일정 추가 성공", customData);
                console.log('response', response);
                alert('일정이 추가되었습니다.');
                window.location.href = '/admin';

                // ✅ 새 일정 추가 시 attributes 배열에 반영
                attributes.value.push({
                    key: Math.random(), // 임시 키 값
                    dot: { style: { backgroundColor: 'blue' } },
                    dates: [new Date(customData.startTime)],
                    popover: { title: customData.title }
                });

                modalOpen.value = false;
            } catch (error) {
                console.log('❌ 일정 추가 실패', error);
            }
        };

        // ✅ 모달 닫기
        const closeModal = () => {
            modalOpen.value = false;
            newTitle.value = '';
            newDescription.value = '';
            newStartTime.value = new Date().toISOString().split('T')[0];
            newEndTime.value = new Date().toISOString().split('T')[0];
            newCalendarYN.value = '';
        };

        return {
            attributes,
            modalOpen,
            newCreateAt,
            newStartTime,
            newEndTime,
            newTitle,
            newCalendarYN,
            newDescription,
            newLocation,
            newScheduleStatus,
            openModal,
            addEvent,
            closeModal
        };
    }
};
</script>
<style scoped>
.credit-card {
    background: url("https://source.unsplash.com/600x300/?credit-card") center/cover no-repeat;
    height: 140px;
    border-radius: 10px;
    color: white;
    padding: 20px;
}

.info-card {
    height: 140px;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
}

.card-header {
    font-size: 16px;
}

.list-unstyled li {
    display: flex;
    justify-content: space-between;
}

.transaction-list span {
    display: inline-block;
    width: 33%;
}

:deep(.vc-header) {
    color: #fff;
    height: 160px;
}

/* 2) 또 다른 예시: 달력 내부 셀 스타일 */
:deep(.vc-day) {
    cursor: pointer;
    padding: 1px;
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
    width: 50%;
    /* 달력 컨테이너가 부모 크기에 맞게 조정됨 */
}

/* 모달 오버레이: 화면 전체를 덮으며 중앙 정렬 */
.custom-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    /* 전체 뷰포트 너비 */
    height: 100vh;
    /* 전체 뷰포트 높이 */
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    /* 다른 요소보다 위에 표시 */
}

/* 모달 창: 너무 크지 않도록 최대 너비를 지정 */
.custom-modal {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    /* 고정 너비 (필요에 따라 조정) */
    max-width: 90%;
    /* 뷰포트에 따라 유동적으로 조절 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    text-align: center;
}
</style>