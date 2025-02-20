<template>
  <footer class="py-5 bg-dark custom-footer">
    <div class="container px-5">
      <p class="m-0 text-center text-white">Copyright &copy;
        (주)협진시스템창호 &nbsp;ㅣ&nbsp;
        주소 : 대전 중구 대둔산로 119-36 [지번] 대전 중구 안영동 239-2 &nbsp;ㅣ&nbsp;
        T. 010 - 4951 - 4944
        F. 042 - 583 - 3131 <br>사업자등록번호 : 5643-110-238421 <br>
        &copy; Copyright Hyeobjin Changho All rights reserved.
      </p>
    </div>
    <div class="admin-wrapper">
      <a href="/admin" class="admin-location">' '</a>
    </div>
  </footer>
</template>

<script>
export default { name: 'Footer' }
</script>

<style scoped>
footer.custom-footer {
  margin-bottom: 0;
  height: 150px;
  width: 100%;
  background-color: #333;
}

.admin-wrapper {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}

.admin-location {
  color: black;
  font-weight: bold;
  text-decoration: none;
}
</style>