<template>
  <div class="user-cmt">
    <div class="cmt-header">
      <div class="cmt-avt">
        <img src="../../../assets/Icon/avt-cattoon.png" alt="" />
      </div>
      <div class="cmt-info">
        <span class="cmt-user-name">Trần Hoàng Long</span>
        <span class="cmt-time text-gray">13 tháng 8</span>
      </div>
    </div>
    <div class="cmt-content">Tuyệt vời. Quá hay quá bổ ích</div>
    <div class="cmt-footer">
      <button class="btn btn-like-cmt" @click="likeCmt">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-red">
          <path
            d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
          />
        </svg>
        <span class="cl-black"> 0 </span>
      </button>
      <button class="btn btn-like-cmt" @click="repCmt">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-gray">
          <path
            d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"
          />
        </svg>
        <span class="cl-black"> Trả lời</span>
      </button>
    </div>
    <div class="news-write-cmt hidden-cmt" id="cmtRep-write">
      <textarea class="input-cmt" type="text" placeholder="Hãy chia sẻ cảm nghĩ về bài viết" v-model="cmt"></textarea>
      <button class="btn-send-cmt bgc-blue_3 cl-white" @click="sendCmt">Send</button>
    </div>
    <div class="cmt-rep"></div>
  </div>
</template>
<script src="./commentfilm.js"></script>
<style lang="scss" scoped src="./commentfilm.scss"></style>
