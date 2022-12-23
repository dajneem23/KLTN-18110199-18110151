<template lang="">
  <div class="profile-card">
    <div class="profile-image" v-if="isImg">
      <img class="profile-image__border" src="" />
      <img class="profile-image__img" />
    </div>
    <div class="profile-info" v-if="!isDes && !isContent">
      <span></span>
      <h3></h3>
      <p></p>
    </div>
    <div class="profile-info" v-if="isDes">
      <p></p>
    </div>
    <div class="profile-info" v-if="isContent">
      <span></span>
      <h3></h3>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <span></span>
      <h3></h3>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <span></span>
      <h3></h3>
      <p></p>
      <p></p>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isContent: Boolean,
    isDes: Boolean,
    isImg: Boolean,
  },
};
</script>
<style lang="scss" scoped>
.profile-card .profile-image__img {
  width: 10%;
  padding-top: 10%;
  border-radius: 50%;
  background-color: #ddd;
}
.profile-info {
  height: 100%;
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
  width: 100%;
  background-color: #ddd;
  height: 16px;
  line-height: 140%;
}
</style>
