<template>
  <div class="news-wrapper bgc-white">
    <div class="img-banner"></div>
    <div class="button-create_news">
      <router-link to="/create-news">
        <button>Đăng bài viết</button>
      </router-link>
    </div>
    <div class="content-banner">
      <div class="popular-news">
        <h3>Phổ biến nhất</h3>
        <div class="news-popular">
          <div v-for="(item, key) of news_items">
            <CardNews :key="item.id" style_x="card-news-x" :news="item"></CardNews>
          </div>
          <!-- <CardNews style_x="card-news-x" :data="LIST_FILM.newFilm[0]"></CardNews>
          <CardNews style_x="card-news-x" :data="LIST_FILM.newFilm[0]"></CardNews>
          <CardNews style_x="card-news-x" :data="LIST_FILM.newFilm[0]"></CardNews>
          <CardNews style_x="card-news-x" :data="LIST_FILM.newFilm[0]"></CardNews> -->
        </div>
      </div>
      <div class="hot-news">
        <h3>Nổi bật nhất</h3>
        <div class="news-hot">
          <div v-for="(item, key) of hot_items">
            <CardNews :key="item.id" style_x="card-news-y" :news="item"></CardNews>
          </div>
          <!-- <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews>
          <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews>
          <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews>
          <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews> -->
        </div>
      </div>
      <div class="main-news">
        <div class="main-news-button">
          <!-- <SwitchButton
            contentL="Dành cho bạn"
            contentR="Đánh giá cao nhất"
            buttonRef="buttonRef"
            btnRefL="onTvRef"
            btnRefR="onTTRef"
          ></SwitchButton> -->
          <h2>Tất cả</h2>
        </div>
        <div class="news-box">
          <div v-for="(item, key) of items">
            <CardNews :key="item.id" style_x="card-news-z" font_title="f20" :news="item"></CardNews>
          </div>
        </div>
        <div class="paganition-box">
          <b-pagination
            v-model="page"
            :total-rows="total_count"
            :per-page="per_page"
            class="mt-4"
            @change="onChangePage"
          >
            <template #first-text><span class="text-info">First</span></template>
            <template #prev-text><span class="text-info">Prev</span></template>
            <template #next-text><span class="text-info">Next</span></template>
            <template #last-text><span class="text-info">Last</span></template>
            <template #ellipsis-text>
              <img width="50" height="50" src="../../assets/Icon/Ellipsis-1s-200px.svg" alt="" srcset="" />
            </template>
            <template #page="{ page, active }">
              <b v-if="active">{{ page }}</b>
              <i v-else>{{ page }}</i>
            </template>
          </b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./newsView.js"></script>
<style lang="scss" src="./newsView.scss" scoped></style>
