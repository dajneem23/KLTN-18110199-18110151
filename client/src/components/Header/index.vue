<template>
  <div class="navbar">
    <div class="header-nav">
      <div class="header-nav_logo">
        <router-link to="/">
          <img src="../../assets/Icon/logo.png" alt="" class="header-logo" @click="onHomeBtnClick" />
        </router-link>
      </div>
      <div class="header-nav_left">
        <div class="category">
          <router-link :to="HEADER_ITEM.home.path">
            <div class="category-item active" :ref="HEADER_ITEM.home.ref" @click="onHomeBtnClick">
              <div class="category-item_icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                  />
                </svg>
              </div>
              <div class="title_tooltip">
                {{ HEADER_ITEM.home.title[lang] }}
              </div>
            </div>
            <!-- {{ HEADER_ITEM.home.title[lang] }} -->
          </router-link>
          <router-link :to="HEADER_ITEM.manga.path">
            <div class="category-item" :ref="HEADER_ITEM.manga.ref" @click="onMangaBtnClick">
              <div class="category-item_icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M272 480V72c-16-16-64-40-128-40S21.3 53.3 0 64V480c21.3-10.7 92.8-32 144-32s128 32 128 32zm32 0s76.8-32 128-32s122.7 21.3 144 32V64c-21.3-10.7-80-32-144-32s-112 24-128 40V480z"
                  />
                </svg>
              </div>
              <div class="title_tooltip">
                {{ HEADER_ITEM.manga.title[lang] }}
              </div>
            </div>
            <!-- {{
            HEADER_ITEM.manga.title[lang]
          }} -->
          </router-link>
          <router-link :to="HEADER_ITEM.movie.path">
            <div class="category-item" :ref="HEADER_ITEM.movie.ref" @click="onMovieBtnClick">
              <div class="category-item_icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"
                  />
                </svg>
              </div>
              <div class="title_tooltip">
                {{ HEADER_ITEM.movie.title[lang] }}
              </div>
            </div>
            <!-- {{
            HEADER_ITEM.movie.title[lang]
          }} -->
          </router-link>
          <router-link :to="HEADER_ITEM.chat.path">
            <div class="category-item" :ref="HEADER_ITEM.chat.ref" @click="onChatBtnClick">
              <div class="category-item_icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path
                    d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"
                  />
                </svg>
              </div>
              <div class="title_tooltip">
                {{ HEADER_ITEM.chat.title[lang] }}
              </div>
            </div>
            <!-- {{
            HEADER_ITEM.chat.title[lang]
          }} -->
          </router-link>
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
