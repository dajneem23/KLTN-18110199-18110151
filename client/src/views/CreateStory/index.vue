<template>
  <div class="create-wrapper">
    <div class="box-create">
      <!-- <h1>Tạo bài viết</h1> -->
      <div class="user-info">
        <!-- <img :src="userInfo.avatar[0].url" alt="" /> -->
        <span>{{ userInfo?.username }}</span>
      </div>
      <div class="box-title">
        <textarea placeholder="Hãy viết gì đó......" v-model="story.content" @input="changeSubmit"></textarea>
      </div>
      <div class="box-images">
        <DropzoneFileUpload @upload-success="onDropZoneUploadSuccess" :files="initImage"></DropzoneFileUpload>
      </div>
      <div class="button-box" v-if="!isEditing">
        <button @click="hiddenmodel" class="btn-cancel">Hủy</button>
        <button @click="createStory" class="btn-filter" id="btn-upload">Đăng</button>
      </div>
      <div class="button-box" v-if="isEditing">
        <button @click="hiddenmodel" class="btn-cancel">Hủy</button>
        <button @click="createStory" class="btn-filter bgc-red" id="btn-upload">Xóa</button>
        <button @click="editStory" class="btn-filter" id="btn-upload">Sửa</button>
      </div>
    </div>
    <div class="toastify-wrapper">
      <Toastify isSuccess content="Tạo thành công" v-if="isSuccess" />
      <Toastify isWarnning content="Tạo thất bại" v-if="isWarnning" />
    </div>
  </div>
</template>
<script src="./createstory.js"></script>
<style lang="scss" src="./createstory.scss" scoped></style>
