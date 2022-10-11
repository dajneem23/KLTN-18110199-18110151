<template>
  <div class="news-wrapper">
    <div class="img-banner"></div>
    <div class="content-banner">
      <div class="popular-news">
        <h3>Phổ biến nhất</h3>
        <div class="news-popular">
          <CardNews style_x="card-news-x"></CardNews>
          <CardNews style_x="card-news-x"></CardNews>
          <CardNews style_x="card-news-x"></CardNews>
          <CardNews style_x="card-news-x"></CardNews>
        </div>
      </div>
      <div class="hot-news">
        <h3>Nổi bật nhất</h3>
        <div class="news-hot">
          <CardNews style_x="card-news-y"></CardNews>
          <CardNews style_x="card-news-y"></CardNews>
          <CardNews style_x="card-news-y"></CardNews>
          <CardNews style_x="card-news-y"></CardNews>
        </div>
      </div>
      <div class="main-news">
        <div class="main-news-button">
          <SwitchButton contentL="Mới nhất" contentR="Phổ biến nhất"></SwitchButton>
        </div>
        <div class="news-box">
          <CardNews style_x="card-news-x" font_title="f20"></CardNews>
          <CardNews style_x="card-news-x" font_title="f20"></CardNews>
          <CardNews style_x="card-news-x" font_title="f20"></CardNews>
          <CardNews style_x="card-news-x" font_title="f20"></CardNews>
          <CardNews style_x="card-news-x" font_title="f20"></CardNews>
          <CardNews style_x="card-news-x" font_title="f20"></CardNews>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./newsView.js"></script>
<style lang="scss" src="./newsView.scss" scoped></style>
