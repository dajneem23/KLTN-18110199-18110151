<template>
  <div class="wrapper-createNews">
    <h1 class="title-create" v-if="!isEdit">Tạo bài viết</h1>
    <h1 class="title-create" v-if="isEdit">Chỉnh sửa bài viết</h1>
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
          <DropZone @upload-success="onDropZoneUploadSuccess" :file="initImage"></DropZone>
        </div>
        <div class="cl-black cate-title">Chủ đề:</div>
        <div class="list-optione">
          <span v-for="(item, key) of categoriesOfArticles" class="label-category" @click="removeCategory(item.id)">{{
            item.name
          }}</span>
        </div>
        <div class="title-cate" @click="showCombobox">Chọn chủ đề</div>
        <div class="custom-selected">
          <div class="combox-cate" v-if="isShow">
            <div v-for="(item, key) of listCategories" class="category-items" @click="addCategory(item)">
              <div>{{ item.name }}</div>
            </div>
          </div>
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
        <div class="btn-box-edit">
          <button @click="deleteNews()" class="btn-filter btn-deleted" v-if="isEdit">Xóa</button>
          <button @click="submitText(editorData)" class="btn-filter" v-if="!isEdit">Lưu</button>
          <button @click="editNews(editorData)" class="btn-filter" v-if="isEdit">Lưu</button>
        </div>
      </div>
    </div>
    <div class="toastify-wrapper">
      <Toastify isSuccess content="Tạo thành công" v-if="isSuccess" />
      <Toastify isWarnning content="Tạo thất bại" v-if="isWarnning" />
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
