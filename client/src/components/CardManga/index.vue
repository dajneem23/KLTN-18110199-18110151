<template>
  <div class="card">
    <div class="card-left">
      <img :src="data.img" alt="" />
    </div>
    <div class="card-right">
      <div class="card-title">{{data.title}}</div>
      <div class="card-info">
        <div class="card-numchap">
          <span>
            {{data.numChapter}} 
          </span>
          tập
          </div>
        <div class="card-auth"><span>Tác giả: </span> {{data.auth}}</div>
        <div class="card-view">{{data.views}} lượt xem</div>
      </div>
    </div>
  </div>
</template>
<script src="./cardManga"></script>
<style lang="scss" src="./cardManga.scss" scoped></style>
