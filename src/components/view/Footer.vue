<template>
  
    <footer class="footer">
      <p>(주)협진시스템창호 &nbsp;ㅣ&nbsp;
        주소 : 대전 중구 대둔산로 119-36 [지번] 대전 중구 안영동 239-2 &nbsp;ㅣ&nbsp; 
          T. 010 - 4951 - 4944 &nbsp;ㅣ&nbsp; 
          F. 042 - 583 - 3131 <br>사업자등록번호 : 5643-110-238421 <br>
          <small>&copy; Copyright Hyeobjin Changho All rights reserved.</small>

          <a><router-link to="/login" tag="p"> 관리자 로그인</router-link></a> <!-- 임시 adim login link -->
      </p>
    </footer>

</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {

        }
    },
}
</script>

<style scoped>
.footer {
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}
</style>