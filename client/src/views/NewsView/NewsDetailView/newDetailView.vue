<template>
  <div class="news-detail-wrapper bgc-white">
    <transition name="fade">
      <div class="sticky-box" id="sticky-box" v-show="scY">
        <div
          id="triangle-up"
          class="triangle"
          :class="{
            'up-vote': up_votes?.includes(userInfo?._id),
          }"
          @click="upVote(slug)"
        ></div>
        <span id="voteCount">{{ (up_votes.length || 0) - (down_votes.length || 0) }}</span>
        <div
          id="triangle-down"
          class="triangle-down"
          :class="{
            'down-vote': down_votes?.includes(userInfo?._id),
          }"
          @click="downVote(slug)"
        ></div>

        <div class="avt-user">
          <img :src="author.avatar[0]?.url || 'https://www.gravatar.com/avatar/default?s=200&d=mp'" alt="" />
        </div>
        <div class="follow-user">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            v-if="isIncludeUser"
            @click="followUser(author)"
          >
            <path
              d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
            />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" v-if="!isIncludeUser">
            <path
              d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
            />
          </svg>
        </div>
        <div class="add-wish-list" @click="addWishList(slug)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            :class="{
              'fill-red': reacts?.includes(userInfo?._id),
              'fill-gray': !reacts?.includes(userInfo?._id),
            }"
          >
            <path
              d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
            />
          </svg>
        </div>
        <div class="go-to-cmt" @click="goToCmtBox">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-gray">
            <path
              d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"
            />
          </svg>
          <span>{{ comments?.length || 0 }}</span>
        </div>
        <button class="button-to-top" id="sticky-box" @click="toTop">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fill-blue_2">
            <path
              d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"
            />
          </svg>
        </button>
      </div>
    </transition>
    <div class="news-content__box">
      <div class="news-category text-dark-gray" v-for="category in categories">{{ category.slug }}</div>
      <div class="news-name">
        <Loader v-if="isLoading" />
        <h1 v-if="!isLoading">{{ name }}</h1>
      </div>
      <div class="news-short-des text-dark-gray">
        <Loader v-if="isLoading" isDes />
        <div v-if="!isLoading">
          {{ description }}
        </div>
      </div>
      <div class="news-auth">
        <img :src="author.avatar[0]?.url || 'https://www.gravatar.com/avatar/default?s=200&d=mp'" alt="" />
        <Loader v-if="isLoading" />
        <div v-if="!isLoading">
          <div class="news-auth_name">{{ author?.username }}</div>
          <div class="news-date">{{ moment(createdAt || created_at).fromNow() }}</div>
        </div>
      </div>
      <div class="news-content">
        <!-- {{ content }} -->
      </div>
      <Loader v-if="isLoading" isContent />
      <div contenteditable="false" v-html="content" class="news-content" v-if="!isLoading"></div>
    </div>
    <div class="manga-cmt" id="cmt" v-if="!isLoading">
      <div class="write-cmt-box">
        <textarea
          class="input-cmt"
          type="text"
          placeholder="Hãy chia sẻ cảm nghĩ về bài viết"
          value=""
          v-model="cmt.content"
        ></textarea>
        <button class="btn-send-cmt bgc-blue_3 cl-white" @click="sendCmt">Gửi</button>
      </div>
      <div class="news-cmt-box">
        <div v-for="comment in comments">
          <Comment :data="comment" :sourceId="id" flag="detail_articles"></Comment>
          <div v-if="comment?.replies">
            <div class="cmt-rep">
              <div v-for="reply in comment.replies">
                <Comment :data="reply"></Comment>
                <div v-if="reply?.reply_2">
                  <div class="cmt-rep">
                    <div v-for="reply_2 in reply.reply_2">
                      <Comment></Comment>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="news-relate">
      <!-- <div class="relate-title">Bài viết có thể liên quan</div> -->
      <div class="relate-list">
        <!-- <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews>
        <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews>
        <CardNews style_x="card-news-y" :data="LIST_FILM.newFilm[0]"></CardNews> -->
      </div>
    </div>
  </div>
</template>
<script src="./newDetailView.js"></script>
<style lang="scss" src="./newDetailView.scss" scoped></style>
