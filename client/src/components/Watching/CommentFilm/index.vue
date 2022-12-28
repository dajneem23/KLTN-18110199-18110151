<template>
  <div class="user-cmt" :id="id">
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
    <div class="box-content-cmt">
      <div class="cmt-content text-dark" v-if="!isEdit">{{ content }}</div>
      <div class="cmt-content text-dark" v-if="isEdit">
        <input type="text" v-model="newCmt" />
        <div class="edit-action">
          <div class="cancel-update-user" @click="closeEditCmt">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path
                d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
              />
            </svg>
          </div>
          <div class="cancel-update-user-check" @click="updateCmt(id)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="cmt-footer">
      <!-- <span class="cl-black"> 0 </span> -->
      <button class="btn-like-cmt" @click="repCmt" style="gap: 0.5rem; color: #000" v-if="!isReply">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-gray">
          <path
            d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z"
          />
        </svg>
        <span> Trả lời </span>
      </button>
      <button class="btn-like-cmt" @click="editCmt" style="gap: 0.5rem; color: #000" v-if="isMe">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-gray">
          <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
          />
        </svg>
        <span> Chỉnh sửa </span>
      </button>
      <button class="btn-like-cmt" @click="deleteCmt(id)" style="gap: 0.5rem; color: #000" v-if="isMe">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fill-gray">
          <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
          />
        </svg>
        <span> Xóa</span>
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
