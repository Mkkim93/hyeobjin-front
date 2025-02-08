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
    <!-- Contact section-->
    <section class="bg-light py-5">
        <div class="container px-5 my-5 px-5">
            <div class="text-center mb-5">
                <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-envelope"></i>
                </div>
                <h2 class="fw-bolder">Get in touch</h2>
                <p class="lead mb-0">We'd love to hear from you</p>
            </div>
            <div class="row gx-5 justify-content-center">
                <div class="col-lg-6">
                    <!-- * * * * * * * * * * * * * * *-->
                    <!-- * * SB Forms Contact Form * *-->
                    <!-- * * * * * * * * * * * * * * *-->
                    <!-- This form is pre-integrated with SB Forms.-->
                    <!-- To make this form functional, sign up at-->
                    <!-- https://startbootstrap.com/solution/contact-forms-->
                    <!-- to get an API token!-->
                    <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                        <!-- Name input-->
                        <div class="form-floating mb-3">
                            <input class="form-control" id="name" type="text" placeholder="Enter your name..."
                                data-sb-validations="required" />
                            <label for="name">Full name</label>
                            <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                        </div>
                        <!-- Email address input-->
                        <div class="form-floating mb-3">
                            <input class="form-control" id="email" type="email" placeholder="name@example.com"
                                data-sb-validations="required,email" />
                            <label for="email">Email address</label>
                            <div class="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                            <div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                        </div>
                        <!-- Phone number input-->
                        <div class="form-floating mb-3">
                            <input class="form-control" id="phone" type="tel" placeholder="(123) 456-7890"
                                data-sb-validations="required" />
                            <label for="phone">Phone number</label>
                            <div class="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.
                            </div>
                        </div>
                        <!-- Message input-->
                        <div class="form-floating mb-3">
                            <textarea class="form-control" id="message" type="text"
                                placeholder="Enter your message here..." style="height: 10rem"
                                data-sb-validations="required"></textarea>
                            <label for="message">Message</label>
                            <div class="invalid-feedback" data-sb-feedback="message:required">A message is required.
                            </div>
                        </div>
                        <!-- Submit success message-->
                        <!---->
                        <!-- This is what your users will see when the form-->
                        <!-- has successfully submitted-->
                        <div class="d-none" id="submitSuccessMessage">
                            <div class="text-center mb-3">
                                <div class="fw-bolder">Form submission successful!</div>
                                To activate this form, sign up at
                                <br />
                                <a
                                    href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                            </div>
                        </div>
                        <!-- Submit error message-->
                        <!---->
                        <!-- This is what your users will see when there is-->
                        <!-- an error submitting the form-->
                        <div class="d-none" id="submitErrorMessage">
                            <div class="text-center text-danger mb-3">Error sending message!</div>
                        </div>
                        <!-- Submit Button-->
                        <div class="d-grid"><button class="btn btn-primary btn-lg disabled" id="submitButton"
                                type="submit">Submit</button></div>
                    </form>
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