<template>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <a class="navbar-brand ps-3" href="/admin">Admin Home</a>
        <!-- Sidebar Toggle-->
        <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
                class="fas fa-bars"></i></button>
        <!-- Navbar Search-->
        <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div class="input-group">
                <input class="form-control" type="text" placeholder="제품번호를 입력해주세요" aria-label="Search for..."
                    aria-describedby="btnNavbarSearch" />
                <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i
                        class="fas fa-search"></i></button>
            </div>
        </form>
        <!-- Navbar-->
        <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#!">Settings</a></li>
                    <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li><a class="dropdown-item" href="#!">Logout</a></li>
                </ul>
            </li>
        </ul>
    </nav>


    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">사용자 정보</div>

                        <router-link :to="{ path: `/admin/${$route.params.id}/user` }" class="nav-link">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            관리자 설정
                        </router-link>

                        <div class="sb-sidenav-menu-heading">카테고리</div>
                        
                        <router-link :to="{ path: `/admin/${$route.params.id}/item` }" class="nav-link">
                            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                            제품관리
                        </router-link>

                        <!-- <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">

                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="layout-static.html">제품 등록</a>
                                <a class="nav-link" href="layout-sidenav-light.html">제품 수정</a>
                                <a class="nav-link" href="layout-sidenav-light.html">제품 삭제</a>
                            </nav>
                        </div> -->

                        <router-link :to="`/admin/${$route.params.id}/notice`" class="nav-link">
                            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                            공지관리
                        </router-link>

                        <div class="collapse" id="collapsePages" aria-labelledby="headingTwo"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#pagesCollapseAuth" aria-expanded="false"
                                    aria-controls="pagesCollapseAuth">
                                    Authentication
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordionPages">
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <a class="nav-link" href="login.html">Login</a>
                                        <a class="nav-link" href="register.html">Register</a>
                                        <a class="nav-link" href="password.html">Forgot Password</a>
                                    </nav>
                                </div>
                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#pagesCollapseError" aria-expanded="false"
                                    aria-controls="pagesCollapseError">
                                    Error
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordionPages">
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <a class="nav-link" href="401.html">401 Page</a>
                                        <a class="nav-link" href="404.html">404 Page</a>
                                        <a class="nav-link" href="500.html">500 Page</a>
                                    </nav>
                                </div>
                            </nav>
                        </div>
                        <div class="sb-sidenav-menu-heading">고객지원</div>
                        <a class="nav-link" href="#">
                            <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                            견적요청
                        </a>
                        <a class="nav-link" href="#">
                            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                            A/S문의
                        </a>
                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="small">Logged in as: 관리자명</div>

                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">

            <div class="container-fluid px-4">
                <h1 class="mt-4">관리자 페이지</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item active">최근 이벤트</li>
                </ol>
                <div class="row">

                    <!-- 현재 시간 넣어주고 -->
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-primary text-white mb-4">
                            <div class="card-body">Primary Card</div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link" href="#">View Details</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>

                    <!--  -->
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-warning text-white mb-4">
                            <div class="card-body">Warning Card</div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link" href="#">View Details</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>

                    <!--  -->
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-success text-white mb-4">
                            <div class="card-body">Success Card</div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link" href="#">View Details</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>

                    <!--  -->
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-danger text-white mb-4">
                            <div class="card-body">Danger Card</div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link" href="#">View Details</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6">
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-chart-area me-1"></i>
                                최근 견적 요청
                            </div>
                            <div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-chart-bar me-1"></i>
                                A/S 문의 요청
                            </div>
                            <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
                        </div>
                    </div>
                </div>

                <div class="admim-router-content">
                    <router-view></router-view>
                </div>


            </div>


            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; (주)협진창호시스템</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../assets/styles/admin.css';
export default {
    name: 'Admin',

    components: {
        
    },

    data() {
        return {};
    },

    created() {
        this.handleAccessValidation();
    },

    mounted() {

        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            // Uncomment Below to persist sidebar toggle between refreshes
            // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            //     document.body.classList.toggle('sb-sidenav-toggled');
            // }
            sidebarToggle.addEventListener('click', event => {
                event.preventDefault();
                document.body.classList.toggle('sb-sidenav-toggled');
                localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            });

        }
    },

    methods: {
        async handleAccessValidation() {
            const accessToken = localStorage.getItem("access");

            // Access token이 없거나 만료된 경우 새로 발급받기
            if (!accessToken || this.isAccessTokenExpired(accessToken)) {
                const newAccessToken = await this.refreshAccessToken();
                if (!newAccessToken) {
                    console.log("Unable to refresh token. Redirecting to login.");
                    this.$router.push("/login");
                    return;
                }
            }

            // 유효한 토큰으로 API 요청
            const tokenToUse = localStorage.getItem("access");
            await this.sendApiRequest(tokenToUse);
        },

        isAccessTokenExpired(token) {
            if (!token) return true;

            try {
                // Base64 디코딩
                const base64Url = token.split('.')[1]; // JWT의 payload 부분을 가지고 온다
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const payload = JSON.parse(atob(base64));

                // 발급 시간과 만료 시간을 출력
                const issuedAt = dayjs.unix(payload.iat).format('YYYY-MM-DD HH:mm:ss'); // 발급 시간
                const expirationTime = dayjs.unix(payload.exp).format('YYYY-MM-DD HH:mm:ss'); // 만료 시간

                console.log(`발급 시간 (iat): ${issuedAt}`);
                console.log(`만료 시간 (exp): ${expirationTime}`);

                // 현재 시간과 만료 시간 비교
                const currentTime = dayjs().unix(); // 현재 시간 (초 단위 UNIX 타임스탬프)
                return payload.exp < currentTime;
            } catch (error) {
                console.error("isAccessTokenExpired error:", error);
                return true;
            }
        },

        async refreshAccessToken() {
            localStorage.removeItem("access");
            try {

                const response = await this.$axios.post("/auth");
                const newAccessToken = response.headers["access"];

                localStorage.setItem("access", newAccessToken);

                console.log("New access token set:", newAccessToken);
                return newAccessToken;
            } catch (error) {
                console.error("Failed to refresh access token:", error);
                return null;
            }
        },

        async sendApiRequest(accessToken) {
            try {
                const response = await this.$axios.get("/admin", {
                    headers: {
                        Authorization: `${accessToken}`,
                    },
                });
                console.log("Admin page access granted", response.data);
            } catch (error) {
                console.error("Failed to access admin API:", error);
                this.$router.push("/login");
            }
        },
    },
};
</script>

<style scoped>
body {
    width: 100%;

}

ul {
    padding-left: 0;
}

ul li {
    margin-bottom: 10px;
}

.admin-router-content {
    /* 적절한 크기와 레이아웃을 설정하여 내용이 보이도록 */
    width: 100%;
    /* 가로 크기 100% */
    height: calc(100vh - 60px);
    /* 화면 높이에 맞게 조정 (상단 navbar 등의 높이를 제외) */
    padding: 20px;
    /* 내부 여백 */
    overflow: auto;
    /* 내용이 많으면 스크롤 가능하도록 설정 */
    background-color: #f8f9fa;
    /* 부드러운 배경색 */
}

.router-view {
    /* router-view 요소 자체에 대한 스타일 추가 */
    display: block;
    /* 기본적으로 block으로 설정하여 영역 차지 */
    height: 100%;
    background-color: white;
    /* 배경색을 흰색으로 설정 */
    border-radius: 8px;
    /* 모서리를 둥글게 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* 부드러운 그림자 추가 */
}
</style>
