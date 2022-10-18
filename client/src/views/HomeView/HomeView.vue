<template>
  <div class="">
    <div class="wrapper-home">
      <!-- <transition name="fade">
        <button class="button-to-top" id="sticky-box" @click="toTop">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fill-blue_2">
            <path
              d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"
            />
          </svg>
        </button>
      </transition> -->
      <div class="item-home" v-for="(post, index) in posts" :key="index">
        <News :data="post"></News>
      </div>
      <infinite-loading @infinite="getPosts"></infinite-loading>
    </div>
  </div>
</template>

<script src="./homview"></script>
<style scoped lang="scss" src="./homeview.scss"></style>
