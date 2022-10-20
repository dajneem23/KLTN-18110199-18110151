<template>
  <div>
    <div>
      <span>Title</span>
      <input type="text" />
    </div>
    <div>
      <span>IMG</span>
      <!-- <UploadFile multiple></UploadFile> -->
      <DropzoneFileUpload multiple></DropzoneFileUpload>
    </div>
    <div id="editor"></div>
    <button @click="submitText(editorData)">submit</button>
  </div>
</template>
<!-- <script src="../"></script> -->

<script type="module" src="./ckeditor.js"></script>
<style lang="scss" src="./ckeditor.scss" scoped></style>
