<template lang="">
  <div>
    <div class="news bgc-white">
      <div class="news-header">
        <div class="news-header-top">
          <div class="avt-news">
            <img src="../../assets/Icon/avt-cattoon.png" alt="" />
          </div>
          <div class="news-info">
            <span class="news-user-name">{{ author.username }}</span>
            <span class="news-time text-dark-gray">{{ moment(createdAt).fromNow() }}</span>
          </div>
        </div>
        <div class="news-header-bottom">
          <div class="news-caption">
            {{ content }}
          </div>
        </div>
      </div>
      <div class="news-body" @click="showModel(slug)">
        <carousel :perPage="1">
          <slide v-for="img in images" class="slide">
            <img :src="img.url" alt="" />
          </slide>
        </carousel>
      </div>
      <div class="news-footer">
        <div class="news-footer-top">
          <div class="news-like">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-blue couter-like">
              <path
                d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 25.3-19.5 46-44.3 47.9c7.7 8.5 12.3 19.8 12.3 32.1c0 23.4-16.8 42.9-38.9 47.1c4.4 7.2 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
              />
            </svg> -->
            <span class="text-dark--gray">{{ reacts.length }} {{ HOME_ITEM.like.title[lang] }}</span>
          </div>
          <div class="news-cmt">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z"
              />
            </svg> -->
            <span class="text-dark--gray">{{ comments.length || 0 }} {{ HOME_ITEM.comment.title[lang] }}</span>
          </div>
        </div>
        <div class="news-footer-body">
          <button
            :class="{
              'fill-blue text-blue': reacts.includes(userInfo?._id),
            }"
            class="btn-dev btn-transparent like-news"
            @click="likePost(slug)"
          >
            <!-- /*Truyền vào id post*/ -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class=""
              :id="id"
              v-if="!reacts.includes(userInfo?._id)"
            >
              <path
                d="M96 191.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V223.1C128 206.3 113.7 191.1 96 191.1zM512 227c0-36.89-30.05-66.92-66.97-66.92h-99.86C354.7 135.1 360 113.5 360 100.8c0-33.8-26.2-68.78-70.06-68.78c-46.61 0-59.36 32.44-69.61 58.5c-31.66 80.5-60.33 66.39-60.33 93.47c0 12.84 10.36 23.99 24.02 23.99c5.256 0 10.55-1.721 14.97-5.26c76.76-61.37 57.97-122.7 90.95-122.7c16.08 0 22.06 12.75 22.06 20.79c0 7.404-7.594 39.55-25.55 71.59c-2.046 3.646-3.066 7.686-3.066 11.72c0 13.92 11.43 23.1 24 23.1h137.6C455.5 208.1 464 216.6 464 227c0 9.809-7.766 18.03-17.67 18.71c-12.66 .8593-22.36 11.4-22.36 23.94c0 15.47 11.39 15.95 11.39 28.91c0 25.37-35.03 12.34-35.03 42.15c0 11.22 6.392 13.03 6.392 22.25c0 22.66-29.77 13.76-29.77 40.64c0 4.515 1.11 5.961 1.11 9.456c0 10.45-8.516 18.95-18.97 18.95h-52.53c-25.62 0-51.02-8.466-71.5-23.81l-36.66-27.51c-4.315-3.245-9.37-4.811-14.38-4.811c-13.85 0-24.03 11.38-24.03 24.04c0 7.287 3.312 14.42 9.596 19.13l36.67 27.52C235 468.1 270.6 480 306.6 480h52.53c35.33 0 64.36-27.49 66.8-62.2c17.77-12.23 28.83-32.51 28.83-54.83c0-3.046-.2187-6.107-.6406-9.122c17.84-12.15 29.28-32.58 29.28-55.28c0-5.311-.6406-10.54-1.875-15.64C499.9 270.1 512 250.2 512 227z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="fill-blue couter-like"
              v-if="reacts.includes(userInfo?._id)"
            >
              <path
                d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 25.3-19.5 46-44.3 47.9c7.7 8.5 12.3 19.8 12.3 32.1c0 23.4-16.8 42.9-38.9 47.1c4.4 7.2 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
              />
            </svg>
            <span :id="id + 'title'"> {{ HOME_ITEM.likeBtn.title[lang] }} </span>
          </button>
          <button class="btn-dev btn-transparent like-news" @click="showCmtBox(id + 'cmt')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z"
              />
            </svg>
            <span> {{ HOME_ITEM.comment.title[lang] }} </span>
          </button>
        </div>
        <div class="news-footer-bottom disable" :id="id + 'cmt'">
          <div class="news-write-cmt" id="cmt-write" v-if="isAuthenticated">
            <textarea
              class="input-cmt"
              type="text"
              placeholder="Hãy chia sẻ cảm nghĩ về bài viết"
              value=""
              v-model="cmt.content"
            ></textarea>
            <button class="btn-send-cmt bgc-blue_3 cl-white" @click="sendCmt">{{ HOME_ITEM.send.title[lang] }}</button>
          </div>
          <div class="news-cmt-box">
            <div v-for="comment of comments">
              <Comment :data="comment" :sourceId="id" flag="card_stories"></Comment>
              <div v-if="comment?.replies">
                <div class="cmt-rep">
                  <div v-for="reply of comment.replies">
                    <Comment :data="reply" :sourceId="id"></Comment>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="model-detail-story" id="model-detail-story" v-if="isShowDetail">
      <div class="backround-popup" @click="hiddenModel"></div>
      <div class="box-detail-story">
        <DetailStory
          :Slug_story="slug"
          :isShowDetail="isShowDetail"
          :hiddenModel="hiddenModel"
          :functionComment="sendCmt"
        />
      </div>
    </div>
  </div>
</template>
<script src="./news"></script>
<style lang="scss" src="./index.scss" scoped></style>
