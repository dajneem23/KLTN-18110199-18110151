<template>
  <router-link :to="{ name: 'detailmanga', params: { id: slug, manga: data } }">
    <div class="card-manga">
      <div class="card-left">
        <img
          :src="
            // data?.images[0]?.url ||
            'https://s199.imacdn.com/tt24/2021/10/30/47ff33182df2f70c_8daec582137d9d4f_26698163558364829674.jpg'
          "
          alt=""
        />
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
