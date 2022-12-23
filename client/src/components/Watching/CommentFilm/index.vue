<template>
  <div class="user-cmt">
    <div class="cmt-header">
      <div class="vote_cmt">
        <div
          :id="id"
          class="triangle"
          :class="{ 'up-vote': up_votes?.includes(userInfo._id) }"
          v-if="!isVoteUp"
          @click="upvote(id)"
        ></div>
        <div :id="id" class="triangle up-vote" @click="upvote(id)" v-if="isVoteUp"></div>
        {{ (up_votes?.length || 0) - (down_votes?.length || 0) }}
        <!-- {{ vote }} -->
        <div
          :id="id"
          class="triangle-down"
          :class="{ 'down-vote': down_votes?.includes(userInfo._id) }"
          v-if="!isVoteDown"
          @click="downvote(id)"
        ></div>
        <div :id="id" class="triangle-down down-vote" @click="downvote(id)" v-if="isVoteDown"></div>
      </div>
      <div class="cmt-avt">
        <img :src="author.avatar[0]?.url || 'https://www.gravatar.com/avatar/default?s=200&d=mp'" alt="" />
      </div>
      <div class="cmt-info">
        <span class="cmt-user-name text-dark font-weight-bold">{{ author?.username || 'Unknown' }}</span>
        <!-- <span class="cmt-time text-gray">{{ created_at }}</span> -->
      </div>
    </div>
    <div class="cmt-content text-dark">{{ content }}</div>
    <div class="cmt-footer" v-if="!isReply">
      <!-- <span class="cl-black"> 0 </span> -->
      <button class="btn-like-cmt" @click="repCmt" style="gap: 0.5rem; color: #000">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-gray">
          <path
            d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z"
          />
        </svg>
        <span> Trả lời </span>
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
