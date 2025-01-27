<template class="sb-nav-fixed">
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <a class="navbar-brand ps-3" href="/admin">Admin</a>
        <!-- Sidebar Toggle-->
        <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
                class="fas fa-bars"></i></button>
        <!-- Navbar Search-->
        <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div class="input-group">
                <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..."
                    aria-describedby="btnNavbarSearch" />
                <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
            </div>
        </form>
        <!-- Navbar-->
        <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#!">내정보</a></li>
                    <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li><a class="dropdown-item" href="#!">로그아웃</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">관리자 홈</div>

                        <router-link to="/admin">
                            <a class="nav-link">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Admin Home
                            </a>
                        </router-link>

                        <div class="sb-sidenav-menu-heading">카테고리</div>
                        
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                            제품
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>

                        <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <router-link to="/admin/item" tag="a">
                                    <a class="nav-link">제품 목록</a>
                                </router-link>
                                
                                <router-link to="/admin/add" tag="a">
                                    <a class="nav-link">제품 등록</a>
                                </router-link>
                                    
                                <router-link to="/admin/delete" tag="a">
                                    <a class="nav-link">제품 삭제</a>
                                </router-link>
                            </nav>
                        </div>

                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseLayoutss" aria-expanded="false" aria-controls="collapseLayoutss">
                            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                            제조사
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>

                        <div class="collapse" id="collapseLayoutss" aria-labelledby="headingTwo"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <router-link to="/admin/manu" tag="a">
                                    <a class="nav-link">전체 제조사 관리</a>
                                </router-link>
                            </nav>
                        </div>

                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages"
                            aria-expanded="false" aria-controls="collapsePages">
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                            관리자
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>

                        <div class="collapse" id="collapsePages" aria-labelledby="headingThree"
                            data-bs-parent="#sidenavAccordion">
                        
                            <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            
                                <!-- 새로운 관리자 등록 -->
                                <router-link to="/admin/register">
                                    <li class="nav-link collapsed" data-bs-toggle="collapse"
                                        data-bs-target="#pagesCollapseAuth" aria-expanded="false"
                                        aria-controls="pagesCollapseAuth">
                                        관리자 등록
                                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                    </li>
                                </router-link>

                                <!-- 관리자 리스트 조회 -->
                                <router-link to="/admin/user">
                                    <li class="nav-link collapsed" data-bs-toggle="collapse"
                                        data-bs-target="#pagesCollapseError" aria-expanded="false"
                                        aria-controls="pagesCollapseError">
                                        관리자 조회
                                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                    </li>
                                </router-link>
                            </nav>
                        </div>

                        <div class="sb-sidenav-menu-heading">고객지원</div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseNewMenu1" aria-expanded="false" aria-controls="collapseNewMenu1">
                            <div class="sb-nav-link-icon"><i class="fas fa-cogs"></i></div>
                            A/S 관리
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapseNewMenu1" aria-labelledby="headingThree"
                            data-bs-parent="#collapseNewMenu1">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="option1.html">전체 A/S 관리</a>
                                <a class="nav-link" href="option1.html">새 요청</a>
                                <a class="nav-link" href="option2.html">처리중</a>
                                <a class="nav-link" href="option3.html">처리 완료</a>
                            </nav>
                        </div>

                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseNewMenu2" aria-expanded="false" aria-controls="collapseNewMenu2">
                            <div class="sb-nav-link-icon"><i class="fas fa-cogs"></i></div>
                            견적 요청
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapseNewMenu2" aria-labelledby="headingFour"
                            data-bs-parent="#collapseNewMenu2">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="option1.html">견적 요청</a>
                            </nav>
                        </div>

                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseNewMenu3" aria-expanded="false" aria-controls="collapseNewMenu3">
                            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                            공지사항
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>

                        <div class="collapse" id="collapseNewMenu3" aria-labelledby="headingFive"
                            data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <router-link to="/admin/notice" tag="a">
                                    <a class="nav-link">공지사항 관리</a>
                                </router-link>
                            </nav>
                        </div>





                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="small">Logged in as:</div>
                    Start Bootstrap
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">협진시스템 관리자 페이지</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">현황</li>
                    </ol>
                    <div class="row">
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-primary text-white mb-4">
                                <div class="card-body">Primary Card</div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-warning text-white mb-4">
                                <div class="card-body">Warning Card</div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-success text-white mb-4">
                                <div class="card-body">Success Card</div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
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
                                    A/S 요청
                                </div>
                                <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
                            </div>
                        </div>
                    </div>
                   
                    <!-- <div class="router-content"> -->
                        <router-view></router-view>
                    <!-- </div> -->

                </div>
            </main>
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; Your Website 2023</div>
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
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';


export default {
    name: 'Admin',

    components: {
        
    },

    data() {
        return {

        };
    },

    created() {
        this.handleAccessValidation();
        this.toggleOption();
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

        async toggleOption() {
            const sidebarToggle = document.body.querySelector('#sidebarToggle');
            if (sidebarToggle) {
                sidebarToggle.addEventListener('click', () => {
                    document.body.classList.toggle('sb-sidenav-toggled');
                    localStorage.setItem(
                        'sb|sidebar-toggle',
                        document.body.classList.contains('sb-sidenav-toggled')
                    );
                });
            }
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

/* 드롭다운 메뉴 기본 스타일 */
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
}

/* 드롭다운 메뉴 활성화 시 */
.dropdown-menu.show {
    display: block;
}

/* 드롭다운 항목 스타일 */
.dropdown-item {
    display: block;
    width: 100%;
    padding: 0.25rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    text-decoration: none;
}

.dropdown-item:hover {
    color: #fff;
    background-color: #0d6efd;
    text-decoration: none;
}
</style>
