<template>
  <div class="profile-wrapper">
    <div class="img-banner--user">
      <img src="../../assets/Icon/perspectives_rebrand_banner.png" alt="" />
    </div>
    <div class="box-profile">
      <div class="box-info--user bgc-white">
        <div class="user-avt">
          <img :src="userInfo?.avatar" alt="" />
        </div>
        <div class="user-name">{{ userInfo?.username }}</div>
        <div class="user-email text-dark-gray">{{ userInfo?.email }}</div>
        <router-link to="/profile/edit">
          <button class="btn-defaultt bgc-blue_3 cl-white">Chỉnh sửa</button>
        </router-link>
        <div class="box-info--footer">
          <div class="box-footer-item text-dark-gray">
            <div>FOLLOWERS</div>
            <span>0</span>
          </div>
          <div class="box-footer-item text-dark-gray">
            <div>FOLLOWING</div>
            <span>0</span>
          </div>
          <div class="box-footer-item text-dark-gray">
            <div>SPIDERS</div>
            <span>0</span>
          </div>
        </div>
      </div>
      <div class="user-news">
        <div class="menu-bar">
          <button class="menu-bar--item" id="myNews" @click="openCity('myNewsList', 'myNews')">Bài viết của tôi</button>
          <button class="menu_bar-item" id="myWish" @click="openCity('myWishList', 'myWish')">
            Bài viết yêu thích
          </button>
        </div>
        <div id="myNewsList" class="news">
          <p>Đây là box bài viết của tôi đã đăng</p>
        </div>

        <div id="myWishList" class="news" style="display: none">
          <p>Đây là box bài viết mà tôi đã yêu thích</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./profileview.js"></script>
<style lang="scss" src="./profileview.scss" scoped></style>
