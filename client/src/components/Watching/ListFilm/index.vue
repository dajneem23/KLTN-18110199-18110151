<template>
  <div class="wrapper-list">
    <div class="list-new-box">
      <h3>Phim mới cập nhật</h3>
      <div class="list-new">
        <div class="list-new-item" v-for="item in LIST_FILM.newFilm">
          <Card :data="item"></Card>
        </div>
      </div>
    </div>
    <div class="list-new-box">
      <h3>Phim hot</h3>
      <div class="list-new">
        <div class="list-new-item" v-for="item in LIST_FILM.hotFilm">
          <Card :data="item"></Card>
        </div>
      </div>
    </div>
    <div class="list-all-box">
      <h3>Tất cả</h3>
      <div class="list-all">
        <div v-for="item in pageOfItems">
          <Card :data="item"></Card>
        </div>
      </div>
      <div class="paganition-box">
        <jw-pagination
          :items="LIST_FILM.allFilm"
          @changePage="onChangePage"
          :pageSize="6"
          class="paganite"
        ></jw-pagination>
      </div>
    </div>
  </div>
</template>
<script src="./listFilm"></script>
<style lang="scss" src="./listFilm.scss" scoped></style>
