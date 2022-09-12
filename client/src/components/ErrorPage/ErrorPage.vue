<template lang="">
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1>Oops!</h1>
      </div>
      <h2>{{ nameError }}</h2>
      <p>{{ desError }}</p>
      <a href="/">Go To Homepage</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    nameError: String,
    desError: String,
  },
};
</script>
<style lang="scss" src="./_errorPage.scss" scoped></style>
