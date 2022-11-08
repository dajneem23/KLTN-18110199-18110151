<template>
  <div class="wrapper-reading bgc-white">
    <!-- <FilterManga></FilterManga> -->
    <div class="search-box">
      <input type="text" placeholder="Tìm kiếm...." v-model="searchString" />
      <button @click="searchManga(searchString)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
          />
        </svg>
      </button>
    </div>
    <div class="listManga-wrapper">
      <div class="list-new-box">
        <h3>Truyện mới cập nhật</h3>
        <div class="list-new">
          <div v-for="(item, key) of new_items" class="list-new-item">
            <CardManga :data="item"></CardManga>
          </div>
        </div>
      </div>
      <div class="list-new-box">
        <h3>Truyện hot</h3>
        <div class="list-new">
          <div v-for="(item, key) of hot_items" class="list-new-item">
            <CardManga :data="item"></CardManga>
          </div>
        </div>
      </div>
      <div class="list-all-box">
        <h3>Tất cả</h3>
        <div class="list-all">
          <div v-for="(item, key) of items">
            <CardManga :data="item"></CardManga>
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
<script src="./readingMangaView"></script>
<style lang="scss" src="./readingMangaView.scss" scoped></style>
