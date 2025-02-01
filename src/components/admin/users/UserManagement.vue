<template>
  <p>관리자 메인 페이지 입니다.</p>
  <UserList />
</template>

<script>
import UserList from './UserList.vue';

export default {
    name: 'UserManagement',
    data() {
      return {
        step: Number,
      }
    },

    setup() {
        // 컴포넌트가 마운트되었을 때 콘솔 로그 출력
        console.log("UserManagement 컴포넌트가 랜더링 되었습니다.");
    },

    components: {
      UserList,
  }
}


</script>

<style>
</style>