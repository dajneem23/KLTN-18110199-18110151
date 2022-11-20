<template>
  <div>
    <div class="homePage">
      <div class="wrapper-home-left">
        <button class="btn-add--story" @click="showModel" v-if="isAuthenticated">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
            />
          </svg>
          <span>Thêm bài viết</span>
        </button>
      </div>
      <div class="wrapper-home-center">
        <div class="item-home" v-for="(post, index) in posts" :key="index">
          <Story :data="post"></Story>
        </div>
        <infinite-loading @infinite="getPosts"></infinite-loading>
      </div>
      <div class="wrapper-home-right">
        <h3>Bạn bè</h3>
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
