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
        <h2>Phổ biến nhất</h2>
        <div class="news-popular">
          <div v-for="(item, key) of new_items">
            <CardNews :key="item.id" style_x="card-news-x" :news="item"></CardNews>
          </div>
        </div>
      </div>
      <div class="hot-news">
        <h2>Nổi bật nhất</h2>
        <div class="news-hot">
          <div v-for="(item, key) of hot_items">
            <CardNews :key="item.id" style_x="card-news-y" :news="item"></CardNews>
          </div>
        </div>
      </div>
      <div class="main-news">
        <div class="main-news-button">
          <SwitchButton
            contentL="Tat ca"
            contentR="Đánh giá cao nhất"
            buttonRef="buttonRef"
            btnRefL="onTvRef"
            btnRefR="onTTRef"
            :function1="handleChangeTabAll"
            :function2="handleChangeTabFollow"
          ></SwitchButton>
          <!-- <h2>Tất cả</h2> -->
        </div>
        <div v-if="isTab">
          <div class="news-box">
            <div class="list-news-all">
              <div v-for="(item, key) of items" class="news-item">
                <CardNews :key="item.id" style_x="card-news-z" font_title="f20" :news="item"></CardNews>
              </div>
            </div>
            <div class="list-category">
              <h2>Chu de</h2>
              <div class="list-categories">
                <span class="categories-item" @click="filterArticlesByCategory" id="cat-item">Quan điểm - Tranh luận</span>
                <span class="categories-item">Hai huoc</span>
                <span class="categories-item">Quan diem</span>
                <span class="categories-item">Quan diem</span>
                <span class="categories-item">Quan diem</span>
              </div>
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
        <div v-if="!isTab">
          <h1>ahahahahhaah</h1>
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
              @change="onChangePageFollow"
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
  </div>
</template>
<script src="./newsView.js"></script>
<style lang="scss" src="./newsView.scss" scoped></style>
