<template>
  <div class="listManga-wrapper">
    <div class="list-new-box">
      <h3>Truyện mới cập nhật</h3>
      <div class="list-new">
        <div class="list-new-item" v-for="item in LIST_MANGA.newManga">
          <CardManga :data="item"></CardManga>
        </div>
      </div>
    </div>
    <div class="list-new-box">
      <h3>Truyện hot</h3>
      <div class="list-new">
        <div class="list-new-item" v-for="item in LIST_MANGA.hotManga">
          <CardManga :data="item"></CardManga>
        </div>
      </div>
    </div>
    <div class="list-all-box">
      <h3>Tất cả</h3>
      <div class="list-all">
        <div v-for="item in pageOfItems">
          <CardManga :data="item"></CardManga>
        </div>
      </div>
      <div class="paganition-box">
        <jw-pagination :items="manga" @changePage="onChangePage" :pageSize="2" class="paganite"></jw-pagination>
      </div>
    </div>
  </div>
</template>
<script src="./listManga"></script>
<style lang="scss" src="./listManga.scss" scoped></style>
