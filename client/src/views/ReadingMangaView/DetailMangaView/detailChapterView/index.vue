<template>
  <div class="detailmanga-wrapper detail-chapter bgc-white">
    <div class="bgc-black">
      <div class="screen-reading">
        <div class="loading-sreen-reading" v-if="isLoading"></div>
        <div class="img-manga_item" v-for="image of images" v-if="!isLoading">
          <img
            :src="
              image?.url ||
              'https://s199.imacdn.com/tt24/2022/12/15/697b6ba2005fc74f_958be4739260b749_586897167109379969674.jpg'
            "
            alt=""
          />
        </div>
      </div>
      <div class="manga-info-detail">
        <h1>{{ name }}</h1>
      </div>
      <div class="manga-cmt bgc-white">
        <div class="write-cmt-box">
          <textarea
            class="input-cmt"
            type="text"
            placeholder="Hãy chia sẻ cảm nghĩ về bài viết"
            v-model="cmt.content"
          ></textarea>
          <button class="btn-send-cmt bgc-blue_3 cl-white" @click="sendCmt">Gửi</button>
        </div>
        <div class="mangas-cmt-box" v-if="isAuthenticated">
          <div v-for="comment in comments">
            <Comment :data="comment" :sourceId="id" flag="detail_chapter_manga"></Comment>
            <div v-if="comment?.replies">
              <div class="cmt-rep">
                <div v-for="reply in comment.replies">
                  <Comment :data="reply" isReply></Comment>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isAuthenticated">Hãy đăng nhập để đọc được bình luận</div>
      </div>
    </div>
  </div>
</template>
<script src="./detailchapterview.js"></script>
<style lang="scss" src="../detailMangaView.scss" scoped></style>
