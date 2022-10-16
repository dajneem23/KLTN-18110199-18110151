<template>
  <div :class="style_x" class="card">
    <router-link :to="{ name: 'detailnews', params: { newsId: data.id, manaData: data } }">
      <div class="card-img">
        <img src="../../assets/Icon/anime-bg-3.jpg" alt="" />
      </div>
    </router-link>
    <div class="card-body">
      <div class="card-body__category">
        <div class="body__category">Khoa học</div>
        <div class="body__tym" @click="addWishList(2)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-gray">
            <path
              d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
            />
          </svg>
        </div>
      </div>
      <div class="card-body__title">
        <router-link :to="{ name: 'detailnews', params: { newsId: data.id, manaData: data } }">
          <div class="body-title__name" :class="font_title">Tại sao đàn ông thích Anal Sex?</div>
          <div class="body-title__des">
            Trong lịch sử cổ đại, tác động ngoại lực vào hậu môn của nô lệ nữ bất tuân từng là một hình phạt vô cùng dã
            man....
          </div>
        </router-link>
      </div>

      <div class="card-body__content">
        <div class="body-content__imgAuth">
          <img src="../../assets/Icon/avt-cattoon.png" />
          <span>Long-Tani</span>
        </div>
        <div class="body-content__views">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"
            />
          </svg>
          705
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M144 208C126.3 208 112 222.2 112 239.1C112 257.7 126.3 272 144 272s31.1-14.25 31.1-32S161.8 208 144 208zM256 207.1c-17.75 0-31.1 14.25-31.1 32s14.25 31.1 31.1 31.1s31.1-14.25 31.1-31.1S273.8 207.1 256 207.1zM368 208c-17.75 0-31.1 14.25-31.1 32s14.25 32 31.1 32c17.75 0 31.99-14.25 31.99-32C400 222.2 385.8 208 368 208zM256 31.1c-141.4 0-255.1 93.12-255.1 208c0 47.62 19.91 91.25 52.91 126.3c-14.87 39.5-45.87 72.88-46.37 73.25c-6.624 7-8.373 17.25-4.624 26C5.818 474.2 14.38 480 24 480c61.49 0 109.1-25.75 139.1-46.25c28.87 9 60.16 14.25 92.9 14.25c141.4 0 255.1-93.13 255.1-207.1S397.4 31.1 256 31.1zM256 400c-26.75 0-53.12-4.125-78.36-12.12l-22.75-7.125L135.4 394.5c-14.25 10.12-33.87 21.38-57.49 29c7.374-12.12 14.37-25.75 19.87-40.25l10.62-28l-20.62-21.87C69.81 314.1 48.06 282.2 48.06 240c0-88.25 93.24-160 207.1-160s207.1 71.75 207.1 160S370.8 400 256 400z"
            />
          </svg>
          1,5k
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./cardNews.js"></script>
<style lang="scss" src="./cardNews.scss" scoped></style>
