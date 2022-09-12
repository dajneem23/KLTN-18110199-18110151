<template>
  <div class="navbar">
    <div class="header-nav">
      <div class="header-nav_left">
        <router-link to="/">
          <img src="../../assets/Icon/logo.png" alt="" class="header-logo" />
        </router-link>
        <div class="category">
          <router-link tag="div" class="category-item" :to="HEADER_ITEM.home.path">{{
            HEADER_ITEM.home.title[lang]
          }}</router-link>
          <router-link tag="div" class="category-item" :to="HEADER_ITEM.manga.path">{{
            HEADER_ITEM.manga.title[lang]
          }}</router-link>
          <router-link tag="div" class="category-item" :to="HEADER_ITEM.movie.path">{{
            HEADER_ITEM.movie.title[lang]
          }}</router-link>
          <router-link tag="div" class="category-item" :to="HEADER_ITEM.chat.path">{{
            HEADER_ITEM.chat.title[lang]
          }}</router-link>
        </div>
      </div>
      <div class="header-nav_right">
        <router-link to="/about">
          <button type="button" class="btn-none">Về Vrum</button>
        </router-link>
        <router-link :to="HEADER_ITEM.register.path">
          <button type="button" class="btn-none">{{ HEADER_ITEM.register.title[lang] }}</button>
        </router-link>
        <router-link :to="HEADER_ITEM.login.path">
          <button type="button" class="btn-defaultt">{{ HEADER_ITEM.login.title[lang] }}</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script src="./header"></script>

<style src="./header.scss" lang="scss" scoped></style>
