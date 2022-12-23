<template>
  <div class="uploader-wrapper">
    <div class="np-image-upload-picker" v-if="imageFile == null || imageFile.length == 0">
      <input type="file" @change="showImagePreview($event)" accept="image/*" />
    </div>
    <div class="np-image-preview" v-if="imageFile != null && imageFile.length != 0">
      <img class="np-preview" :src="imageFile" />
    </div>
    <div v-if="imageFile != null && imageFile.length != 0 && !isImageUploading" class="box-button-uploadimg">
      <button @click="clearImage" class="np-upload-btn np-upload-btn-cancel">Hủy</button>
    </div>
  </div>
</template>
<script src="./uploadImage.js"></script>
<style lang="scss" src="./uploadImage.scss" scoped></style>
