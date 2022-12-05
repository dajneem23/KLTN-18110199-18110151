<template>
  <div class="detailmanga-wrapper bgc-white">
    <div class="manga-info">
      <div class="manga-box-1">
        <img
          class="manga-img"
          :src="// manga.images[0]
          'https://s199.imacdn.com/tt24/2021/10/30/47ff33182df2f70c_8daec582137d9d4f_26698163558364829674.jpg'"
          alt=""
        />
      </div>
      <div class="manga-box-2">
        <div class="manga-title">{{ name }}</div>
        <div class="film-info-des row">
          <table>
            <tr>
              <td class="col-md-4">Thể loại</td>
              <td class="col-md-8">{{ categories.join(' ') }}</td>
            </tr>
            <tr>
              <td class="col-md-4">Năm phát hành</td>
              <td class="col-md-8">{{ createdAt }}</td>
            </tr>
            <tr>
              <td class="col-md-4">Thời lượng</td>
              <td class="col-md-8">112 phút</td>
            </tr>
            <tr>
              <td class="col-md-4">Luot xem</td>
              <td class="col-md-8">{{ views }}</td>
            </tr>
            <tr>
              <div class="col-md-4">
                <button class="btn-like bgc-blue" @click="likeManga(slug)">
                  <svg
                    id="heart-Like"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    :class="{
                      'fill-red': reacts.includes(userInfo?._id),
                      'fill-white': !reacts.includes(userInfo?._id),
                    }"
                  >
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

        <div>
          {{ description }}
        </div>
      </div>
    </div>
    <div class="manga-chapter">
      <div v-for="(item, index) in chapters">
        <router-link :to="{ name: 'detailchapter', params: { id: item.slug, chapterData: item } }">
          <button @click="goToChapter(item.slug)">{{ index + 1 }}</button>
        </router-link>
      </div>
    </div>
    <div class="manga-cmt bgc-white">
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
      <div class="mangas-cmt-box">
        <div v-for="comment in comments">
          <Comment :data="comment" :sourceId="id" flag="detail_manga"></Comment>
          <div v-if="comment?.replies">
            <div class="cmt-rep">
              <div v-for="reply in comment.replies">
                <Comment :data="reply"></Comment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./detailMangaView"></script>
<style lang="scss" src="./detailMangaView.scss" scoped></style>
