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
        <h2>Mới nhất</h2>
        <div class="news-popular">
          <!-- <div> -->
          <Skeleton v-if="isLoading" />
          <Skeleton v-if="isLoading" />
          <Skeleton v-if="isLoading" />
          <Skeleton v-if="isLoading" />
          <!-- </div> -->
          <div v-for="(item, key) of new_items" v-if="!isLoading">
            <CardNews :key="item.id" style_x="card-news-x" :news="item"></CardNews>
          </div>
        </div>
      </div>
      <div class="hot-news">
        <h2>Nổi bật nhất</h2>
        <div class="news-hot">
          <Skeleton v-if="isLoading" isManga />
          <Skeleton v-if="isLoading" isManga />
          <Skeleton v-if="isLoading" isManga />
          <Skeleton v-if="isLoading" isManga />
          <div v-for="(item, key) of hot_items" v-if="!isLoading">
            <CardNews :key="item.id" style_x="card-news-y" :news="item"></CardNews>
          </div>
        </div>
      </div>
      <div class="main-news">
        <div class="main-news-button">
          <SwitchButton
            contentL="Tất cả"
            contentR="Dành cho bạn"
            buttonRef="buttonRef"
            btnRefL="onTvRef"
            btnRefR="onTTRef"
            :function1="handleChangeTabAll"
            :function2="handleChangeTabFollow"
          ></SwitchButton>
          <!-- <h2>Tất cả</h2> -->
        </div>
        <div class="news-box">
          <div class="list-news-all">
            <Skeleton v-if="isLoading" />
            <Skeleton v-if="isLoading" />
            <Skeleton v-if="isLoading" />
            <Skeleton v-if="isLoading" />
            <Skeleton v-if="isLoading" />
            <div v-for="(item, key) of items" class="news-item" v-if="!isLoading">
              <CardNews :key="item.id" style_x="card-news-z" font_title="f20" :news="item"></CardNews>
            </div>
          </div>
          <div class="list-category">
            <h2>Chủ đề</h2>
            <div class="list-categories">
              <span
                class="categories-item"
                :class="{ 'actice-category': filterCategory.includes(category.id) }"
                :id="category.id"
                @click="filterArticlesByCategory(category.id)"
                id="cat-item"
                v-for="(category, key) of categories"
              >
                {{ category.name }}
              </span>
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
    </div>
  </div>
</template>
<script src="./newsView.js"></script>
<style lang="scss" src="./newsView.scss" scoped></style>
