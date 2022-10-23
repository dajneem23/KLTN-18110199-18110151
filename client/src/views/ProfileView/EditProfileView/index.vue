<template>
  <div class="edit-profile-wrapper">
    <div class="edit-box">
      <div class="edit-img-cover">
        <ImageUploader />
      </div>
      <div class="edit-user-info-top">
        <div class="edit-user-avt"></div>
        <div class="edit-user-story"></div>
      </div>
      <div class="edit-user-info-bottom">
        <div class="edit-box-user-left">LEFT</div>
        <div class="edit-box-user-right">RIGHT</div>
      </div>
      <div class="edit-button">
        <button class="button-cancel">Hủy</button>
        <button class="button-save">Lưu</button>
      </div>
    </div>
  </div>
</template>
<script src="./editProfile.js"></script>
<style lang="scss" src="./editProfile.scss" scoped></style>
