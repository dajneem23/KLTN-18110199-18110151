<template>
  <div>
    <div class="homePage">
      <div class="wrapper-home-left" v-if="!isAuthenicated">
        <div class="tab-story">
          <div class="tab-item" :class="{ isActive: isTabHomeData }" @click="handleChageTabHomeData">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
              />
            </svg>
            <span> For you </span>
          </div>
          <div class="tab-item" :class="{ isActive: !isTabHomeData }" @click="handleChageTabFollowData">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path
                d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"
              />
            </svg>
            <span> Following </span>
          </div>
        </div>
        <h3>Đang theo dõi</h3>
        <div class="list-user">
          <div class="user-item">
            <img src="../../assets/Icon/avt-cattoon.png" alt="" />
            <div class="user-item--info">
              <div class="info-name">Tran Hoang Long</div>
              <div class="info-state">
                <div class="state-active">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                  </svg>
                  <div>Đang hoạt động</div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-item">
            <img src="../../assets/Icon/avt-cattoon.png" alt="" />
            <div class="user-item--info">
              <div class="info-name">Tran Hoang Long</div>
              <div class="info-state">
                <div class="state-active">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                  </svg>
                  <div>Đang hoạt động</div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-item">
            <img src="../../assets/Icon/avt-cattoon.png" alt="" />
            <div class="user-item--info">
              <div class="info-name">Tran Hoang Long</div>
              <div class="info-state">
                <div class="state-active">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                  </svg>
                  <div>Đang hoạt động</div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-item">
            <img src="../../assets/Icon/avt-cattoon.png" alt="" />
            <div class="user-item--info">
              <div class="info-name">Tran Hoang Long</div>
              <div class="info-state">
                <div class="state-active">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                  </svg>
                  <div>Đang hoạt động</div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-item">
            <img src="../../assets/Icon/avt-cattoon.png" alt="" />
            <div class="user-item--info">
              <div class="info-name">Tran Hoang Long</div>
              <div class="info-state">
                <div class="state-active">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                  </svg>
                  <div>Đang hoạt động</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3>Noi bat</h3>
        <div class="list-user">
          <div class="user-item">
            <img src="../../assets/Icon/avt-cattoon.png" alt="" />
            <div class="user-item--info">
              <div class="info-name">Tran Hoang Long</div>
              <div class="info-state">
                <div class="state-active">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                  </svg>
                  <div>Đang hoạt động</div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-item">
            <img src="../../assets/Icon/avt-cattoon.png" alt="" />
            <div class="user-item--info">
              <div class="info-name">Tran Hoang Long</div>
              <div class="info-state">
                <div class="state-active">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                  </svg>
                  <div>Đang hoạt động</div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-item">
            <img src="../../assets/Icon/avt-cattoon.png" alt="" />
            <div class="user-item--info">
              <div class="info-name">Tran Hoang Long</div>
              <div class="info-state">
                <div class="state-active">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                  </svg>
                  <div>Đang hoạt động</div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-item">
            <img src="../../assets/Icon/avt-cattoon.png" alt="" />
            <div class="user-item--info">
              <div class="info-name">Tran Hoang Long</div>
              <div class="info-state">
                <div class="state-active">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                  </svg>
                  <div>Đang hoạt động</div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-item">
            <img src="../../assets/Icon/avt-cattoon.png" alt="" />
            <div class="user-item--info">
              <div class="info-name">Tran Hoang Long</div>
              <div class="info-state">
                <div class="state-active">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                  </svg>
                  <div>Đang hoạt động</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-home-center">
        <div class="item-home" v-for="(post, index) in posts" :key="index" v-if="isTabHomeData">
          <Story :data="post"></Story>
        </div>
        <div class="item-home" v-for="(post, index) in posts" :key="index" v-if="!isTabHomeData">
          <h1>Hahahahahha</h1>
          <Story :data="post"></Story>
        </div>
        <infinite-loading @infinite="getPosts"></infinite-loading>
      </div>
      <div class="wrapper-home-right">
        <button class="btn-add--story" @click="showModel" v-if="isAuthenticated">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
            />
          </svg>
          <span>Thêm bài viết</span>
        </button>
      </div>
    </div>
    <div class="model-add-story" id="model-add-story">
      <div class="backround-popup" @click="hiddenModel"></div>
      <div class="box-add-story">
        <CreateStory :hiddenModel="hiddenModel" />
      </div>
    </div>
  </div>
</template>

<script src="./homview"></script>
<style scoped lang="scss" src="./homeview.scss"></style>
