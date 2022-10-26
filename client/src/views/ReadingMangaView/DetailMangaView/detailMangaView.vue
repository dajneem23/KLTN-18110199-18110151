<template>
  <div class="detailmanga-wrapper bgc-white">
    <!-- <div class="bgc-black" v-if="!manga?.chapters">
      <div class="screen-reading">
        <carousel perPage="2">
        <div class="img-manga_item">
          <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg" alt="" />
        </div>
        <div class="img-manga_item">
          <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg" alt="" />
        </div>
        <div class="img-manga_item">
          <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg" alt="" />
        </div>
        <div class="img-manga_item">
          <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg" alt="" />
        </div>
        <div class="img-manga_item">
          <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg" alt="" />
        </div>
        <div class="img-manga_item">
          <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg" alt="" />
        </div>
      </div>
      </carousel>
    </div> -->
    <div class="manga-info">
      <div class="manga-box-1">
        <img class="manga-img" :src="manga.images[0]" alt="" />
      </div>
      <div class="manga-box-2">
        <div class="manga-title">{{ manga.name }}</div>
        <div class="manga-info-des">
          <div>
            <div class="text-dark-gray manga-des-item">{{ manga.views }} lượt xem</div>
            <button class="btn-like bgc-blue" @click="likeManga(manga.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-white">
                <path
                  d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                />
              </svg>
              <span class="cl-white"> Like </span>
            </button>
          </div>
          <div>
            <div class="text-dark-gray manga-des-item">
              <!-- {{ mangaDETAIL_ITEM.category.title[lang] }}: -->
              <span class="text-black">Phim hài</span>
            </div>
          </div>
          <div>
            <div class="text-dark-gray manga-des-item">
              <!-- {{ mangaDETAIL_ITEM.nation.title[lang] }}: -->
              <span class="text-black">Việt Nam</span>
            </div>
          </div>
          <div>
            <div class="text-dark-gray manga-des-item">
              <!-- {{ mangaDETAIL_ITEM.year.title[lang] }}: -->
              <span class="text-black"> 2022 </span>
            </div>
          </div>
        </div>

        <div>
          {{ manga.description }}
        </div>
      </div>
    </div>
    <div class="manga-chapter">
      <div v-for="item in manga.chapters">
        <router-link :to="{ name: 'detailchapter', params: { id: item.id, chapterData: item } }">
          <button @click="goToChapter(item.id)">{{ item.index }}</button>
        </router-link>
      </div>
    </div>
    <div class="manga-cmt">
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
      <div class="news-cmt-box">
        <div v-for="comment in manga.comments">
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
<script src="./detailMangaView"></script>
<style lang="scss" src="./detailMangaView.scss" scoped></style>
