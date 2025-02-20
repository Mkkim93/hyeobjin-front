<template>
    <ForbiddenPage v-if="errorStatus === 403"/>
    <NotFoundPage v-if="errorStatus === 404"/>
    <ServerErrorPage v-if="errorStatus === 500"/>
    <UnauthorizedPage v-if="errorStatus === 401"/>
  </template>
  
  <script>
  import ForbiddenPage from './ForbiddenPage.vue';
  import NotFoundPage from './NotFoundPage.vue';
  import ServerErrorPage from './ServerErrorPage.vue';
  import UnauthorizedPage from './UnauthorizedPage.vue';
  import { mapState } from 'vuex';
  
  export default {
    components: {
      ForbiddenPage,
      NotFoundPage,
      ServerErrorPage,
      UnauthorizedPage,
    },
  
    computed: {
      ...mapState(['errorStatus']) 
    }
  }
  </script>
  