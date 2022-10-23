<template>
  <router-link :to="{ name: 'detailmanga', params: { mangaId: data.id, manaData: data } }">
    <div class="card-manga">
      <div class="card-left">
        <img :src="data.img" alt="" />
      </div>
      <div class="card-right">
        <div class="card-title-manga">{{ data.name }}</div>
        <div class="card-info text-dark-gray">
          <div class="card-numchap">
            <span>
              {{ data?.chapters?.length }}
            </span>
            tập
          </div>
          <div class="card-auth"><span>Tác giả: </span> {{ data.auth }}</div>
          <div class="card-view">{{ data.views }} lượt xem</div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script src="./cardManga"></script>
<style lang="scss" src="./cardManga.scss" scoped></style>
