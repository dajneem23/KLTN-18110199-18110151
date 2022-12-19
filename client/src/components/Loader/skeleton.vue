<template>
  <div
    class="profile-card"
    :class="{
      'manga-card': isManga,
    }"
  >
    <div class="profile-images">
      <img
        class="profile-image__border"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVAAAACWCAMAAAC/8CD2AAAAA1BMVEXNzc2ljC/HAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF8GxXYAARizDlgAAAAASUVORK5CYII="
      />
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
<style scoped lang="scss">
.manga-card {
  width: 100% !important;
  max-width: 230px;
  height: 395px !important;
  display: flex;
  flex-direction: column !important;
  justify-content: space-between !important ;
  .profile-images {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 90px;
    // width: 100%;
  }
  .profile-image__border {
    width: 230px !important;
    height: 220px;
  }
  .profile-info {
    height: 100%;
    margin-top: 150px;
  }
}
.profile-card {
  min-height: 170px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.profile-images {
  width: 100%;
  display: flex;
  align-items: center;
  height: 0px;
}
.profile-card .profile-image__img {
  width: 100%;
  /* padding-top: 10%; */
  border-radius: 50%;
  background-color: #ddd;
}
.profile-card .profile-image__border {
  width: 300px;
  height: 150px;
  /* padding-top: 10%; */
  /* border-radius: 50%; */
  background-color: #ddd;
}
.profile-info {
  width: 100%;
  margin-left: 20px;
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
