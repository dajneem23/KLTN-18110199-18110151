<template>
  <div class="wrapper-createNews">
    <h1 class="title-create">Tạo bài viết</h1>
    <div class="box-create">
      <div class="box-left">
        <div class="box-title">
          <div class="name-title cl-black">Tiêu đề</div>
          <textarea
            type="text"
            placeholder="Tiêu đề bài viết....."
            v-model="news.name"
            rows="1"
            cols="50"
            id="input-title_articles"
          ></textarea>
        </div>
        <div class="box-images">
          <div class="cl-black">Hình ảnh</div>
          <!-- <DropzoneFileUpload
            @change="onDropZoneChange"
            multiple
            class="upload-file"
            :url="`https://zinc-union-365709-63see6q63q-uc.a.run.app/api/v1/upload/`"
          ></DropzoneFileUpload> -->
          <DropZone @upload-success="onDropZoneUploadSuccess"></DropZone>
        </div>
      </div>
      <div class="box-right">
        <div class="box-title">
          <div class="name-title cl-black">Mô tả</div>
          <textarea type="text" placeholder="Mô tả bài viết....." v-model="news.description"></textarea>
        </div>
        <div class="box-content">
          <div class="cl-black">Nội dung :</div>
          <div id="editor" class="ckeditor-cus"></div>
        </div>
        <button @click="submitText(editorData)" class="btn-filter">Lưu</button>
      </div>
    </div>
  </div>
</template>

<script type="module" src="./ckeditor.js"></script>
<style lang="scss">
.ck-editor__editable_inline {
  min-height: 200px;
}
</style>
<style lang="scss" src="./ckeditor.scss" scoped></style>
