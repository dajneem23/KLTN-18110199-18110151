<template>
  <div class="news-wrapper bgc-white">
    <div class="img-banner"></div>
    <div class="content-banner">
      <div class="popular-news">
        <h3>Phổ biến nhất</h3>
        <div class="news-popular">
          <!-- <CardNews style_x="card-news-x" :data="LIST_FILM.newFilm[0]"></CardNews>
          <CardNews style_x="card-news-x" :data="LIST_FILM.newFilm[0]"></CardNews>
          <CardNews style_x="card-news-x" :data="LIST_FILM.newFilm[0]"></CardNews>
          <CardNews style_x="card-news-x" :data="LIST_FILM.newFilm[0]"></CardNews> -->
        </div>
      </div>
      <div class="hot-news">
        <h3>Nổi bật nhất</h3>
        <div class="news-hot">
          <!-- <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews>
          <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews>
          <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews>
          <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews> -->
        </div>
      </div>
      <div class="main-news">
        <div class="main-news-button">
          <SwitchButton
            contentL="Dành cho bạn"
            contentR="Đánh giá cao nhất"
            buttonRef="buttonRef"
            btnRefL="onTvRef"
            btnRefR="onTTRef"
          ></SwitchButton>
        </div>
        <div class="news-box">
          <div v-for="item in pageOfItems">
            <CardNews style_x="card-news-z" font_title="f20" :news="item"></CardNews>
          </div>
        </div>
        <div class="paganition-box">
          <jw-pagination
            :items="data"
            @changePage="onChangePage"
            :pageSize="5"
            class="paganite"
          ></jw-pagination>
        </div>
        <!-- <div>{{data}}</div> -->
      </div>
    </div>
  </div>
</template>
<script src="./newsView.js"></script>
<style lang="scss" src="./newsView.scss" scoped></style>
