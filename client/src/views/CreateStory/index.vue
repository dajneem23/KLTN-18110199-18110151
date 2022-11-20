<template>
  <div class="create-wrapper">
    <div class="box-create">
      <!-- <h1>Tạo bài viết</h1> -->
      <div class="user-info">
        <img :src="userInfo.picture" alt="" />
        <span>{{ userInfo.name }}</span>
      </div>
      <div class="box-title">
        <textarea placeholder="Hãy viết gì đó......" v-model="story.content"></textarea>
      </div>
      <div class="box-images">
        <DropzoneFileUpload multiple class="upload-file"></DropzoneFileUpload>
      </div>
      <div class="button-box">
        <button @click="hiddenmodel" class="btn-cancel">Hủy</button>
        <button @click="createStory()" class="btn-filter">Đăng</button>
      </div>
    </div>
  </div>
</template>
<script src="./createstory.js"></script>
<style lang="scss" src="./createstory.scss" scoped></style>
