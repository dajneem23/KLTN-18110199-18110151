<template lang="">
  <div>
    <ErrorPage
      nameError="404 - PAGE NOT FOUND"
      desError="The page you are looking for might have been removed had its name changed or is temporarily unavailable."
    />
  </div>
</template>
<script>
import ErrorPage from '../../components/ErrorPage/ErrorPage.vue';
export default {
  components: {
    ErrorPage,
  },
};
</script>
<style lang=""></style>
