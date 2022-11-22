<template>
  <div class="detailFilm-wrapper">
    <div class="screen-watching bgc-black">
      <div id="container">
        <video id="player" playsinline controls data-poster="/path/to/poster.jpg">
          <source src="../../../assets/video/dasaitulucdau.mp4" type="video/mp4" />

          <!-- Captions are optional -->
          <track kind="captions" label="English captions" src="/path/to/captions.vtt" srclang="en" default />
        </video>
      </div>
    </div>
    <div class="film-info">
      <div class="film-box-1">
        <!-- <img class="film-img" :src="film?.image" alt="" /> -->
        <img class="film-img" src="https://animehay.club/upload/poster/2691.jpg" alt="" />
        <div class="film-info-des row">
          <table>
            <tr>
              <td class="col-md-4">Thể loại</td>
              <td class="col-md-8">Anime Hành động Giả tưởng Trò chơi Siêu năng lực</td>
            </tr>
            <tr>
              <td class="col-md-4">Năm phát hành</td>
              <td class="col-md-8">2022</td>
            </tr>
            <tr>
              <td class="col-md-4">Thời lượng</td>
              <td class="col-md-8">112 phút</td>
            </tr>
            <tr>
              <td class="col-md-4">Đánh giá</td>
              <td class="col-md-8">9.8</td>
            </tr>
            <tr>
              <div class="col-md-4">
                <button class="btn-like bgc-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-white">
                    <path
                      d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                    />
                  </svg>
                  <span class="cl-white"> Like </span>
                </button>
              </div>
            </tr>
          </table>
        </div>
      </div>
      <div class="film-box-2">
        <!-- <div class="film-title">{{ film.name }}</div> -->
        <div class="film-title">Doraemon Movie 39: Nobita no Getsumen Tansaki</div>
        <div>
          Bộ phim xoay quanh cuộc hành trình phiêu lưu thám hiểm Mặt Trăng của Doraemon, Nobita và những người bạn khi
          Nobita quyết định dùng bảo bối để tạo nên một Vương quốc loài thỏ trên cung trăng. Cùng với Luka – học sinh
          mới của lớp học, nhóm bạn đã lên Mặt Trăng để tận mắt nhìn thấy vương quốc do chính mình tạo ra. Tại đây,
          Nobita và Doraemon đã gặp gỡ những đứa trẻ có năng lực bí ẩn “ESPALS” và họ trở thành những người bạn tốt của
          nhau. Tuy vậy, tất cả đều không hề mảy may nhận ra nguy hiểm rình rập từ một chiến hạm trước mặt. Vì giúp đỡ
          Doraemon nên ESPALS và Luka đều đã bị bắt. Chiến hạm bí ẩn đó là của ai? Nguy hiểm nào sẽ rình rập nhóm bạn?
          Họ sẽ phải làm gì để thoát ra khỏi hiểm nguy tại một nơi xa xôi với Trái Đất như vậy?
        </div>
        <!-- <div>
          {{ film.description }}
        </div> -->
      </div>
    </div>
    <div class="film-cmt">
      <div class="write-cmt-box">
        <textarea
          class="input-cmt"
          type="text"
          placeholder="Hãy chia sẻ cảm nghĩ về bài viết"
          value=""
          v-model="cmt"
        ></textarea>
        <button class="btn-send-cmt bgc-blue_3 cl-white" @click="sendCmt">Gửi</button>
      </div>
      <div class="cmt-box">
        <div v-for="comment in film.comments">
          <Comment></Comment>
          <div v-if="comment?.reply">
            <div class="cmt-rep">
              <div v-for="reply in comment.reply">
                <Comment></Comment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./filmdetail"></script>
<style lang="scss" src="./filmdetail.scss" scoped></style>
