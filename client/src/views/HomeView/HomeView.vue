<template>
  <div class="">
    <div class="wrapper-home">
      <div class="item-home" v-for="(post, index) in posts" :key="index">
        <News ></News>
      </div>
      <infinite-loading @infinite="getPosts"></infinite-loading>
    </div>
  </div>
</template>

<script src="./homview"></script>
<style scoped lang="scss" src="./homeview.scss"></style>
