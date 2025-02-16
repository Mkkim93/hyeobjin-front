<template>
  <div id="layoutError">
    <div id="layoutError_content">
      <main>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="text-center mt-4">
                <h1 class="display-1">500</h1>
                <p class="lead">Internal Server Error</p>
                <p>서버로 부터 오류가 발생 하였습니다.</p>
                <small>관리자에게 문의 해주세요</small>
                <router-link to="/">
                  <br>
                  <i class="fas fa-arrow-left me-2 my-5"></i>
                  메인 페이지로 돌아가기
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div id="layoutError_footer">
      <footer class="py-4 bg-light mt-auto">
        <div class="container-fluid px-4">
          <div class="d-flex align-items-center justify-content-between small">
            <div class="text-muted">Copyright &copy; (주)협진시스템창호</div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServerErrorPage",
};
</script>

<style scoped>
#layoutError {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#layoutError_content {
  flex: 1;
}

.text-center {
  text-align: center;
}

footer {
  margin-top: auto;
}
</style>
