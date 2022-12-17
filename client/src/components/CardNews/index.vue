<template>
  <div :class="style_x" class="card-news">
    <router-link :to="{ name: 'detailnews', params: { id: slug, news: news } }">
      <div class="card-img-news">
        <img :src="images[0]?.url" alt="" />
      </div>
    </router-link>
    <div class="card-body-news">
      <div class="card-body__category">
        <!-- <div class="body__category">{{ tags }}</div> -->
        <div class="body__tym">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            :class="{
              'fill-red': reacts.includes(userInfo?._id),
              'fill-gray': !reacts.includes(userInfo?._id),
            }"
          >
            <path
              d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
            />
          </svg>
        </div>
      </div>
      <div class="card-body__title">
        <router-link :to="{ name: 'detailnews', params: { id, news } }">
          <div class="body-title__name" :class="font_title">{{ name }}</div>
          <div class="body-title__des">
            {{ description }}
          </div>
        </router-link>
      </div>
      <div class="card-body__content">
        <div class="body-content__imgAuth">
          <img :src="author[0]?.avatar[0]?.url || 'https://www.gravatar.com/avatar/default?s=200&d=mp'" alt="" />
          <span>{{ author[0]?.username }}</span>
        </div>
        <div class="body-content__views">
          <div @click="upVote(id)" class="vote-icon">
            <svg
              _ngcontent-serverApp-c42=""
              width="17"
              height="15"
              viewBox="0 0 17 15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                _ngcontent-serverApp-c42=""
                d="M8.64062 0.820313L17 14.1797L0.320312 14.1797L8.64062 0.820313Z"
                class="cls-1"
                :style="(up_votes?.length || 0) - (down_votes?.length || 0) >= 0 ? 'fill:green' : 'fill:red'"
              ></path>
            </svg>
            {{ (up_votes?.length || 0) - (down_votes?.length || 0) }}
          </div>
          <img src="../../assets/Icon/comment.svg" alt="" class="" />
          {{ comments?.length || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./cardNews.js"></script>
<style lang="scss" src="./cardNews.scss" scoped></style>
