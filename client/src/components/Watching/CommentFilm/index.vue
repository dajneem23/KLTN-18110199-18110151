<template>
  <div class="user-cmt">
    <div class="cmt-header">
      <div class="cmt-avt">
        <img :src="author?.avatar[0]?.url || 'https://www.gravatar.com/avatar/default?s=200&d=mp'" alt="" />
      </div>
      <div class="cmt-info">
        <span class="cmt-user-name">{{ author?.username || 'Unknown' }}</span>
        <!-- <span class="cmt-time text-gray">{{ created_at }}</span> -->
      </div>
    </div>
    <div class="cmt-content">{{ content }}</div>
    <div class="cmt-footer">
      <div class="vote_cmt">
        <div :id="id" class="triangle" :class="{ 'up-vote': isVoteUp }" @click="upvote(id)"></div>
        <div
          :id="id"
          class="triangle-down"
          :class="{ 'down-vote': isVoteDown }"
          @click="downvote(id)"
        ></div>
      </div>
      <!-- <span class="cl-black"> 0 </span> -->

      <button class="btn-like-cmt" @click="repCmt">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-gray">
          <path
            d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"
          />
        </svg>
        Trả lời
      </button>
    </div>
    <div class="news-write-cmt hidden-cmt" :id="flag + id">
      <textarea
        class="input-cmt"
        type="text"
        placeholder="Hãy chia sẻ cảm nghĩ về bài viết"
        v-model="cmt.content"
      ></textarea>
      <button class="btn-send-cmt bgc-blue_3 cl-white" @click="sendRepCmt">Gửi</button>
    </div>
    <div class="cmt-rep"></div>
  </div>
</template>
<script src="./commentfilm.js"></script>
<style lang="scss" scoped src="./commentfilm.scss"></style>
