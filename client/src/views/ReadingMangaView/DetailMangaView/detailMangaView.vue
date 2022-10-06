<template>
  <div class="detailmanga-wrapper">
    <div class="screen-reading bgc-black">
      <carousel perPage="2">
        <slide>
          <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg" alt="" />
        </slide>
        <slide>
          <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg" alt="" />
        </slide>
        <slide>
          <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg" alt="" />
        </slide>
        <slide>
          <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg" alt="" />
        </slide>
        <slide>
          <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg" alt="" />
        </slide>
        <slide>
          <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg" alt="" />
        </slide>
      </carousel>
    </div>
    <div class="manga-info">
      <div class="manga-box-1">
        <img
          class="manga-img"
          src="https://www.themoviedb.org/t/p/w220_and_h330_face/bxp5IUY05jLGeZ5bW85W2NF6Rgi.jpg"
          alt=""
        />
      </div>
      <div class="manga-box-2">
        <div class="manga-title">Anh khoa có cùng đồng bọn đi thanh toán băng đảng xã hội đen</div>
        <div class="manga-info-des">
          <div>
            <div class="text-dark-gray manga-des-item">
              <!-- {{ mangaDETAIL_ITEM.category.title[lang] }}: -->
              <span class="text-black">Phim hài</span>
            </div>
            <div class="text-dark-gray manga-des-item">
              <!-- {{ mangaDETAIL_ITEM.directors.title[lang] }}: -->
              <span class="text-black">Rambo</span>
            </div>
          </div>
          <div>
            <div class="text-dark-gray manga-des-item">
              <!-- {{ mangaDETAIL_ITEM.nation.title[lang] }}: -->
              <span class="text-black">Việt Nam</span>
            </div>
            <div class="text-dark-gray manga-des-item">
              <!-- {{ mangaDETAIL_ITEM.time.title[lang] }}: -->
              <span class="text-black"> 1 giờ 45 phút </span>
            </div>
          </div>
          <div>
            <div class="text-dark-gray manga-des-item">
              <!-- {{ mangaDETAIL_ITEM.year.title[lang] }}: -->
              <span class="text-black"> 2022 </span>
            </div>
            <div class="text-dark-gray manga-des-item">
              <!-- {{ mangaDETAIL_ITEM.rating.title[lang] }}: -->
              <span class="text-black"> 95% </span>
            </div>
          </div>
          <div>
            <div class="text-dark-gray manga-des-item">72N lượt xem</div>
            <button class="btn btn-like bgc-blue">
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem reprehenderit deleniti neque optio. Nobis
          nulla dolores aliquam cupiditate voluptatibus reprehenderit, praesentium ut rerum quo vel, facere nihil
          mollitia temporibus! Placeat? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem reprehenderit
          deleniti neque optio. Nobis nulla dolores aliquam cupiditate voluptatibus reprehenderit, praesentium ut rerum
          quo vel, facere nihil mollitia temporibus! Placeat? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Dolorem reprehenderit deleniti neque optio. Nobis nulla dolores aliquam cupiditate voluptatibus reprehenderit,
          praesentium ut rerum quo vel, facere nihil mollitia temporibus! Placeat? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Dolorem reprehenderit deleniti neque optio. Nobis nulla dolores aliquam
          cupiditate voluptatibus reprehenderit, praesentium ut rerum quo vel, facere nihil mollitia temporibus!
          Placeat? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem reprehenderit deleniti neque optio.
          Nobis nulla dolores aliquam cupiditate voluptatibus reprehenderit, praesentium ut rerum quo vel, facere nihil
          mollitia temporibus! Placeat?
        </div>
      </div>
    </div>
    <div class="manga-chapter">
      <button onclick="console.log('chapter 1')">1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <button>8</button>
    </div>
    <div class="manga-cmt">
      <div class="write-cmt-box">
        <textarea class="input-cmt" type="text" placeholder="Hãy chia sẻ cảm nghĩ về bài viết" value=""></textarea>
        <button class="btn-send-cmt bgc-blue_3 cl-white">Gửi</button>
      </div>
      <div class="cmt-box">
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
      </div>
    </div>
  </div>
</template>
<script src="./detailMangaView"></script>
<style lang="scss" src="./detailMangaView.scss" scoped></style>
