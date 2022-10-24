<template>
  <div class="detailmanga-wrapper bgc-white">
    <div class="bgc-black">
      <div class="screen-reading">
        <!-- <carousel perPage="2"> -->
        <div class="img-manga_item" v-for="(item, key) in chapter.images">
          <img :src="item" alt="" />
        </div>
      </div>
      <!-- </carousel> -->
      <div class="button-change-chapter">
        <button @click="goToPrev(chapter.index - 1)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
            />
          </svg>
          Chapter trước
        </button>
        <button @click="goToNext(chapter.index + 1)">
          Chapter sau
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="manga-info">
      <h1>{{ chapter.name }}</h1>
      <!-- <div class="manga-box-1">
        <img
          class="manga-img"
          src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg"
          alt=""
        />
      </div> -->
      <!-- <div class="manga-box-2">
        <div class="manga-title">{{ manga.name }}</div>
        <div class="manga-info-des">
          <div>
            <div class="text-dark-gray manga-des-item">
              <span class="text-black">Phim hài</span>
            </div>
            <div class="text-dark-gray manga-des-item">
              <span class="text-black">Rambo</span>
            </div>
          </div>
          <div>
            <div class="text-dark-gray manga-des-item">
              <span class="text-black">Việt Nam</span>
            </div>
            <div class="text-dark-gray manga-des-item">
              <span class="text-black"> 1 giờ 45 phút </span>
            </div>
          </div>
          <div>
            <div class="text-dark-gray manga-des-item">
              <span class="text-black"> 2022 </span>
            </div>
            <div class="text-dark-gray manga-des-item">
              <span class="text-black"> 95% </span>
            </div>
          </div>
          <div>
            <div class="text-dark-gray manga-des-item">{{ manga.views }} lượt xem</div>
            <button class="btn btn-like bgc-blue" @click="likeManga">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-white">
                <path
                  d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                />
              </svg>
              <span class="cl-white"> Like </span>
            </button>
          </div>
        </div>

        <div>
          {{ manga.description }}
        </div>
      </div> -->
    </div>
    <div class="manga-chapter">
      <!-- <div v-for="item in manga.chapters.sort(({ index: a }, { index: b }) => a - b)">
        <router-link to="">
          <button @click="goToChapter(item.id)">{{ item.index }}</button>
        </router-link>
      </div> -->
    </div>
    <div class="manga-cmt">
      <div class="write-cmt-box">
        <textarea class="input-cmt" type="text" placeholder="Hãy chia sẻ cảm nghĩ về bài viết" value=""></textarea>
        <button class="btn-send-cmt bgc-blue_3 cl-white">Gửi</button>
      </div>
      <!-- <div class="cmt-box">
        <Commentfilm></Commentfilm>
        <div class="cmt-rep">
          <Commentfilm></Commentfilm>
          <div class="cmt-rep">
            <Commentfilm></Commentfilm>
          </div>
          <Commentfilm></Commentfilm>
          <div class="cmt-rep">
            <Commentfilm></Commentfilm>
          </div>
        </div>
        <Commentfilm></Commentfilm>
      </div> -->
    </div>
  </div>
</template>
<script src="./detailchapterview.js"></script>
<style lang="scss" src="../detailMangaView.scss" scoped></style>
