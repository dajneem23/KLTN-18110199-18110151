<template>
  <div
    class="profile-card"
    :class="{
      'manga-card': isManga,
    }"
  >
    <div class="profile-image">
      <img class="profile-image__border" src="" />
      <img class="profile-image__img" />
    </div>
    <div class="profile-info">
      <span></span>
      <h3></h3>
      <p></p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isManga: Boolean,
  },
};
</script>
<style scoped>
.manga-card {
  height: 395px;
}
.profile-card .profile-image__img {
  width: 10%;
  padding-top: 10%;
  border-radius: 50%;
  background-color: #ddd;
}
.profile-info span {
  min-width: 100px;
  height: 16px;
  display: inline-block;
  background-color: #ddd;
}
.profile-info h3 {
  content: ' ';
  width: 250px;
  height: 24px;
  background-color: #ddd;
  margin: 10px 0;
}
.profile-info p {
  width: 80%;
  background-color: #ddd;
  height: 16px;
  line-height: 140%;
}
</style>
