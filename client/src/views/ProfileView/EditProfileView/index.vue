<template>
  <div>
    <div class="edit-profile-wrapper">
      <div class="edit-box">
        <!-- <div class="edit-img-cover">
          <div class="uploader-wrapper">
            <div class="np-image-upload-picker" v-if="imageFileBanner == null || imageFileBanner.length == 0">
              <input type="file" @change="showImageBannerPreview($event)" accept="image/*" id="upload-banner" hidden />
              <label for="upload-banner" class="label-upload-img">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z"
                  />
                </svg>
                Chọn ảnh
              </label>
            </div>
            <div class="np-image-preview" v-if="imageFileBanner != null && imageFileBanner.length != 0">
              <img class="np-preview" :src="imageFileBanner" />
            </div>
            <div
              v-if="imageFileBanner != null && imageFileBanner.length != 0 && !isImageUploading"
              class="box-button-uploadimg"
            >
              <button @click="clearImageBanner" class="np-upload-btn np-upload-btn-cancel">Hủy</button>
            </div>
          </div>
        </div> -->
        <div class="edit-user-info-top">
          <div class="edit-user-avt">
            <div class="uploader-wrapper">
              <div class="np-image-upload-picker" v-if="imageFileAvt == null || imageFileAvt.length == 0">
                <input type="file" @change="showImageAvtPreview($event)" accept="image/*" id="upload-avt" hidden />
                <label for="upload-avt" class="label-upload-img">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z"
                    />
                  </svg>
                  Chọn ảnh</label
                >
              </div>
              <div class="np-image-preview" v-if="imageFileAvt != null && imageFileAvt.length != 0">
                <img class="np-preview" :src="imageFileAvt" />
              </div>
              <div
                v-if="imageFileAvt != null && imageFileAvt.length != 0 && !isImageUploading"
                class="box-button-uploadimg"
              >
                <button @click="clearImageAvt" class="np-upload-btn np-upload-btn-cancel-avt">Hủy</button>
              </div>
            </div>
          </div>
          <div class="edit-user-story">
            <textarea name="" id="" cols="30" rows="15" placeholder="Tiểu sử của bạn....."></textarea>
          </div>
        </div>
        <div class="edit-user-info-bottom">
          <div class="edit-user-name">
            <h3>Tên hiển thị</h3>
            <input type="text" value="Tran Hoang Long" class="input-edit-uname" />
          </div>
          <div class="edit-user-name" @click="showModel">
            <h3>Email</h3>
            <input type="text" value="longhoang@gmail.com" class="input-edit-uname" disabled />
          </div>
          <div class="edit-user-name">
            <h3>Số điện thoại</h3>
            <input type="text" value="094001917" class="input-edit-uname" />
          </div>
          <div class="edit-user-name">
            <h3>Địa chỉ</h3>
            <input type="text" value="1D, Lô tư, Bình Hưng Hòa A, Bình Tân" class="input-edit-uname" />
          </div>
        </div>
        <div class="edit-button">
          <button class="button-cancel">Hủy</button>
          <button class="button-save">Lưu</button>
        </div>
      </div>
    </div>
    <div class="model-edit-mail" id="model-edit-email">
      <div class="box-edit-email">
        <div class="edit-user-name">
          <h3>Email mới</h3>
          <input type="text" value="Tran Hoang Long" class="input-edit-uname" />
        </div>
        <div class="edit-user-name">
          <h3>Mật khẩu xác nhận</h3>
          <input type="text" value="" class="input-edit-uname" placeholder="************" />
        </div>
      </div>
      <div class="box-button">
        <button class="btn" @click="hiddenModel">Hủy</button>
        <button class="btn-defaultt">Xác nhận</button>
      </div>
    </div>
  </div>
</template>
<script src="./editProfile.js"></script>
<style lang="scss" src="./editProfile.scss" scoped></style>
