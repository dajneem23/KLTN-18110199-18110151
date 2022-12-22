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
        <DropzoneFileUpload @upload-success="onDropZoneUploadSuccess" :files="initImages"></DropzoneFileUpload>
      </div>
      <div class="button-box" v-if="!isEditing">
        <button @click="hiddenmodel" class="btn-cancel">Hủy</button>
        <button @click="createStory" class="btn-filter" id="btn-upload">Đăng</button>
      </div>
      <div class="button-box" v-if="isEditing">
        <button @click="hiddenmodel" class="btn-cancel">Hủy</button>
        <button v-b-modal.confirm-edit-modal class="btn-filter" id="btn-upload">Sửa</button>
        <button v-b-modal.confirm-delete-modal class="btn-filter bgc-red" id="btn-upload">Xóa</button>
      </div>
    </div>
    <div class="toastify-wrapper">
      <Toastify isSuccess content="Tạo thành công" v-if="isSuccess" />
      <Toastify isWarnning content="Tạo thất bại" v-if="isWarnning" />
    </div>
    <b-modal id="confirm-edit-modal" hide-footer centered title="Xác nhận chỉnh sửa" class="flex">
      <div class="d-flex justify-content-center" style="gap: 2rem">
        <b-button variant="outline-primary" @click="editStory">OK</b-button>
        <b-button variant="danger">Cancel</b-button>
      </div>
    </b-modal>
    <b-modal id="confirm-delete-modal" hide-footer centered title="Xác nhận xóa" class="flex">
      <div class="d-flex justify-content-center" style="gap: 2rem">
        <b-button variant="outline-primary" @click="deleteStory">OK</b-button>
        <b-button variant="danger">Cancel</b-button>
      </div>
    </b-modal>
  </div>
</template>
<script src="./createstory.js"></script>
<style lang="scss" src="./createstory.scss" scoped></style>
