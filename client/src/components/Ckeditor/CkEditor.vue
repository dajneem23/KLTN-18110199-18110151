<template>
  <div class="box-create">
    <h1>Tạo bài viết</h1>
    <div class="box-title">
      <span class="name-title">Tiêu đề:</span>
      <input type="text" placeholder="Tiêu đề bài viết....." />
    </div>
    <div class="box-title">
      <span class="name-title">Mô tả:</span>
      <input type="text" placeholder="Mô tả bài viết....." />
    </div>
    <div class="box-images">
      <span>Hình ảnh: </span>
      <DropzoneFileUpload multiple class="upload-file"></DropzoneFileUpload>
    </div>
    <div class="box-content">
      <span>Nội dung :</span>
      <div id="editor" class="ckeditor-cus"></div>
    </div>
    <button @click="submitText(editorData)" class="btn-filter">Lưu</button>
  </div>
</template>
<!-- <script src="../"></script> -->

<script type="module" src="./ckeditor.js"></script>
<style lang="scss" src="./ckeditor.scss" scoped></style>
