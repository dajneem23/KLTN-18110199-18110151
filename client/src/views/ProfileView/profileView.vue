<template>
  <div class="profile-wrapper">
    <div class="img-banner--user">
      <img src="../../assets/Icon/perspectives_rebrand_banner.png" alt="" />
    </div>
    <div class="box-profile">
      <div class="box-info--user bgc-white flex flex-row justify-content-between">
        <div class="user-avt">
          <vue-dropzone
            ref="customdropzone"
            id="customdropzone"
            :include-styling="false"
            v-on:vdropzone-thumbnail="thumbnail"
            :options="dropzoneOptions"
            @vdropzone-file-added="vfileAdded"
            @vdropzone-success="vsuccess"
            @vdropzone-removed-file="vremovedFile"
          >
          </vue-dropzone>
        </div>
        <div class="flex flex-column justify-content-center">
          <div class="user-name text-center">{{ userInfo?.username }}</div>
          <div class="user-email text-dark-gray text-center">{{ userInfo?.email }}</div>
          <div class="box-info--footer">
            <div class="box-footer-item text-dark-gray">
              <div>FOLLOWING</div>
              <span>{{ userInfo?.following?.length || 0 }}</span>
            </div>
            <div class="box-footer-item text-dark-gray">
              <div>SPIDERS</div>
              <span>0</span>
            </div>
          </div>
        </div>

        <!-- <router-link to="/profile/edit">
          <button class="btn-defaultt bgc-blue_3 cl-white">Chỉnh sửa</button>
        </router-link> -->
      </div>
      <!-- <div class="user-news">
        <div class="menu-bar">
          <button class="menu-bar--item bgc-white" id="myNews" @click="openCity('myNewsList', 'myNews')">
            Bài viết của tôi
          </button>
          <button class="menu_bar-item bgc-white" id="myWish" @click="openCity('myWishList', 'myWish')">
            Bài viết yêu thích
          </button>
        </div>
        <div id="myNewsList" class="news">
          <p>Đây là box bài viết của tôi đã đăng</p>
        </div>

        <div id="myWishList" class="news" style="display: none">
          <p>Đây là box bài viết mà tôi đã yêu thích</p>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script src="./profileview.js"></script>
<style lang="scss" src="./profileview.scss" scoped></style>
<style>
#customdropzone {
  /* background-color: orange; */
  font-family: 'Arial', sans-serif;
  letter-spacing: 0.2px;
  color: #777;
  transition: background-color 0.2s linear;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-image: url('https://www.gravatar.com/avatar/default?s=120&d=mp');
  background-color: #6fb3ff;
  opacity: 0.9;
}

#customdropzone .dz-preview {
  width: 160px;
  display: inline-block;
}
#customdropzone .dz-preview .dz-image {
  width: 120px;
  height: 120px;
  margin-left: 0px;
  margin-bottom: 0px;
}
#customdropzone .dz-preview {
  padding: 0;
}
#customdropzone .dz-preview .dz-image > div {
  width: inherit;
  height: inherit;
  border-radius: 50%;
  background-size: contain;
}
#customdropzone .dz-preview .dz-image > img {
  width: 100%;
}

#customdropzone .dz-preview .dz-details {
  color: white;
  transition: opacity 0.2s linear;
  text-align: center;
}
#customdropzone .dz-success-mark,
.dz-processing,
.dz-error-mark,
.dz-remove {
  display: none;
}

#customdropzone:hover .dz-remove {
  display: block;
  position: relative;
  top: -50px;
  left: 50px;
}
#customdropzone:hover .dz-image {
  opacity: 0.8;
  background-color: #6fb3ff;
  border-radius: 50%;
  background-image: none;
}
</style>
