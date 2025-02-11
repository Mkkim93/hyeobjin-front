<template>
    <!-- Features section-->
    <section class="py-5 border-bottom" id="features">
        <div class="container px-5 my-5">
            <div class="row gx-5">
                <div class="col-lg-4 mb-5 mb-lg-0">
                    <div class="feature bg-white bg-gradient text-white rounded-3 mb-3">
                        <img src="@/assets/images/KCC_CI.png" class="bi bi-collection">
                    </div>
                    <h2 class="h4 fw-bolder">KCC</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                        sentence and probably just keep going until we run out of words.</p>
                    <a class="text-decoration-none" href="#!">
                        바로가기
                        <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
                <div class="col-lg-4 mb-5 mb-lg-0">
                    <div class="feature bg-white bg-gradient text-white rounded-3 mb-3">
                        <img src="@/assets/images/hu.png" class="bi bi-building">
                    </div>
                    <h2 class="h4 fw-bolder">휴그린</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                        sentence and probably just keep going until we run out of words.</p>
                    <a class="text-decoration-none" href="#!">
                        바로가기
                        <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
                <div class="col-lg-4">
                    <div class="feature bg-white bg-gradient text-white rounded-3 mb-3">
                        <img src="@/assets/images/Yerim.png" class="bi bi-toggles2">
                    </div>
                    <h2 class="h4 fw-bolder">예림</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                        sentence and probably just keep going until we run out of words.</p>
                    <a class="text-decoration-none" href="#!">
                        바로가기
                        <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>
    <!-- Pricing section-->
    <section class="bg-light py-5 border-bottom">
        <div class="container px-5 my-6">
            <div class="text-center mb-5">
                <h2 class="fw-bolder mb-5">일정</h2>
                <p class="lead mb-0"> </p>
                
                <div class="calendar-wrapper">
                    <VCalendar expanded :attributes="attributes"></VCalendar>
                </div>

            </div>

            <div class="row gx-5 justify-content-center">
            </div>
        </div>
    </section>
    <!-- Testimonials section-->
    <section class="py-5 border-bottom">
        <div class="container px-5 my-5 px-5">
            <div class="text-center mb-5">
                <h2 class="fw-bolder">고객 문의</h2>
                <p class="lead mb-0">남겨주신 문의에 대해 성실하게 답변 드리겠습니다.</p>
            </div>
            <div class="row gx-5 justify-content-center">
                <div class="col-lg-6">
                    <!-- Testimonial 1-->
                    <div class="card mb-4">
                        <div class="card-body p-4">
                            <div class="d-flex">
                                <div class="flex-shrink-0"><i class="bi bi-chat-right-quote-fill text-primary fs-1"></i>
                                </div>
                                <div class="ms-4">
                                    <h2 class="h4 fw-bolder">A/S 및 1:1 문의</h2>
                                    <p class="mb-1">A/S 접수 및 1:1 문의입니다.
                                    </p>
                                    <a class="text-decoration-none" href="#!">
                                        바로가기
                                        <i class="bi bi-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Testimonial 2-->
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="d-flex">
                                <div class="flex-shrink-0"><i class="bi bi-chat-right-quote-fill text-primary fs-1"></i>
                                </div>
                                <div class="ms-4">
                                    <h2 class="h4 fw-bolder">기타 문의</h2>
                                    <p class="mb-1">궁금하신 내용을 작성해주시면 빠르게 답변 드리겠습니다.</p>
                                    <a class="text-decoration-none" href="#!">
                                        바로가기
                                        <i class="bi bi-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import 'v-calendar/style.css';
export default {
    name: 'Main',

    data() {
        return {
            attributes: [],
        }
    },

    setup() {
    },

    created() {
        this.fetchCalendarData();
    },

    methods: {
        async fetchCalendarData() {
            try {
                const response = await this.$axios.get('/calendar');

                if (!Array.isArray(response.data)) {
                    console.error("❌ API 응답 데이터가 배열이 아닙니다:", response.data);
                    return;
                }

                this.attributes = response.data.map(event => ({
                    key: event.calenderId,
                    highlight: 'red',

                    dates: {
                        start: event.findStartTime,
                        end: event.findEndTime,
                    },
                    popover: {
                        title: event.findTitle,
                    },
                }));
                console.log('response calendar data', this.attributes);

            } catch (error) {
                console.log('fetch vc data error', error);
            }
        }
    }
};
</script>

<style scoped>
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
</style>