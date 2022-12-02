<template>
  <router-link :to="{ name: 'detailmanga', params: { id: slug, manga: data } }">
    <div class="card-manga">
      <div class="card-left">
        <img :src="data?.images[0]?.url" alt="" />
        <div class="card-numchap">
          <span>{{ data?.chapters?.length }}</span>
        </div>
      </div>
      <div class="card-right">
        <div class="card-title-manga">{{ name }}</div>
        <div class="card-manga-info text-dark-gray"></div>
      </div>
    </div>
  </router-link>
</template>
<script src="./cardManga"></script>
<style lang="scss" src="./cardManga.scss" scoped></style>
