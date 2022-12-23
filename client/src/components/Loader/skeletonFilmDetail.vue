<template lang="">
  <div class="profile-card">
    <div class="profile-image" v-if="isImg"></div>
    <div v-if="!isImg">
      <div class="profile-info" v-if="!isDes && !isContent">
        <span></span>
        <h3></h3>
        <p></p>
        <h3></h3>
        <p></p>
        <p></p>
      </div>
      <div class="profile-info" v-if="isDes">
        <h3></h3>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
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
.profile-image {
  // margin-top: 20px;
  width: 180px;
  height: 260px;
  border-radius: 5px;
  background-color: var(--gray);
}
.profile-info {
  width: 100%;
  height: 100%;
}
.profile-info span {
  width: 100%;
  // max-width: 996px;
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
