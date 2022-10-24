<template>
  <div class="wrapper-reading bgc-white">
    <FilterManga></FilterManga>
    <div class="listManga-wrapper">
      <div class="list-new-box">
        <h3>Truyện mới cập nhật</h3>
        <div class="list-new">
          <div v-for="(item, key) of items" class="list-new-item">
            <CardManga :data="item"></CardManga>
          </div>
        </div>
      </div>
      <div class="list-new-box">
        <h3>Truyện hot</h3>
        <div class="list-new">
          <div v-for="(item, key) of items" class="list-new-item">
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
            <template #first-text><span class="text-success">First</span></template>
            <template #prev-text><span class="text-danger">Prev</span></template>
            <template #next-text><span class="text-warning">Next</span></template>
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
