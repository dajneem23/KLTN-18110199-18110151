<template>
  <div class="profile-wrapper">
    <div class="row">
      <div class="box-profile col-md-4">
        <div class="box-info--user bgc-white flex flex-row justify-content-between">
          <div class="user-avt d-flex justify-content-center" v-if="isMe">
            <vue-dropzone
              ref="customdropzone"
              id="customdropzone"
              :include-styling="false"
              v-on:vdropzone-thumbnail="thumbnail"
              :options="dropzoneOptions"
              @vdropzone-file-added="vfileAdded"
              @vdropzone-success="vsuccess"
              @vdropzone-removed-file="vremovedFile"
            >
            </vue-dropzone>
            <div
              class="cancel-update-user-check pointer-event d-flex justify-content-center position-absolute ml-2"
              @click="updateProfile"
              style="top: 160px"
              v-if="isChangeAvatar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                <path
                  d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
            </div>
          </div>
          <div class="user-avt d-flex justify-content-center" v-if="!isMe">
            <img :src="User.avatar[0]?.url" />
          </div>
          <div class="flex flex-column justify-content-center">
            <div class="box-edit" v-if="isMe">
              <div class="user-name text-center text-dark" v-show="!isEditName">{{ userInfo?.username }}</div>
              <div class="user-name text-center box-edit-name" v-show="isEditName">
                <input type="text" v-model="newName" />
              </div>
              <button>
                <img src="../../assets/Icon/icons8-pencil-30.png" alt="" v-if="!isEditName" @click="editName" />
                <div v-if="isEditName" class="box-cancel">
                  <div class="cancel-update-user" @click="closeEdit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path
                        d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                      />
                    </svg>
                  </div>
                  <div class="cancel-update-user-check" @click="updateProfile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path
                        d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                      />
                    </svg>
                  </div>
                  <!-- <img src="../../assets/Icon/icons8-save-30.png" alt="" @click="updateProfile" /> -->
                </div>
              </button>
            </div>
            <div v-if="!isMe">
              <div class="user-name text-center text-dark">{{ User?.username }}</div>
            </div>
            <div>
              <div class="user-email text-dark-gray text-center" v-if="isMe">{{ userInfo?.email }}</div>
              <div class="user-email text-dark-gray text-center" v-if="!isMe">{{ User?.email }}</div>
              <div class="box-info--footer">
                <div class="box-footer-item text-dark-gray">
                  <div>FOLLOWING</div>
                  <span v-if="isMe">{{ userInfo?.following?.length || 0 }}</span>
                  <span v-if="!isMe">{{ User?.following?.length || 0 }}</span>
                </div>
                <div class="box-footer-item text-dark-gray">
                  <div>SPIDERS</div>
                  <span>{{ items?.length }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- <router-link to="/profile/edit">
          <button class="btn-defaultt bgc-blue_3 cl-white">Chỉnh sửa</button>
        </router-link> -->
        </div>
      </div>
      <div class="img-banner--user col-md-8">
        <img src="../../assets/profile_banner.webp" alt="" />
      </div>
    </div>
    <div class="user-news">
      <div class="menu-bar">
        <button
          class="menu-bar--item bgc-white"
          :class="{ 'active-btn': isStoriesTab }"
          id="myNews"
          @click="changeStories"
        >
          Bài viết của tôi
        </button>
        <button
          class="menu_bar-item bgc-white"
          :class="{ 'active-btn': !isStoriesTab }"
          id="myWish"
          @click="changeArticles"
        >
          Bài thảo luận của tôi
        </button>
      </div>
      <div id="" class="news">
        <!-- <div v-for="(item, key) of items" class="my-item"> -->
        <table id="customers">
          <tr>
            <th></th>
            <th>Nội dung</th>
            <th>Lượt thích</th>
            <th>Lượt bình luận</th>
            <th>Thao tác</th>
          </tr>
          <tr v-for="(item, key) of items">
            <td><img :src="item.images[0]?.url" alt="" /></td>
            <td class="table-content">{{ item.name }}</td>
            <td>{{ item.reacts?.length || 0 }}</td>
            <td>{{ item.commtents?.length || 0 }}</td>
            <td class="">
              <div v-if="!isStoriesTab" class="table-action">
                <router-link :to="{ name: 'editNews', params: { id: item.slug, item } }">
                  <button v-if="isMe">
                    <img src="../../assets/Icon/icons8-pencil-30.png" alt="" />
                  </button>
                </router-link>
                <router-link :to="{ name: 'detailnews', params: { id: item.slug, item } }">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                      <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                      <path
                        d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"
                      />
                    </svg>
                  </button>
                </router-link>
              </div>
              <div v-if="isStoriesTab" class="table-action">
                <button @click="editStories(item.slug)">
                  <img src="../../assets/Icon/icons8-pencil-30.png" alt="" v-if="isMe" />
                </button>
                <router-link :to="{ name: '', params: { id: item.slug, item } }">
                  <!-- <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                      <path
                        d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"
                      />
                    </svg>
                  </button> -->
                </router-link>
              </div>
            </td>
          </tr>
        </table>
        <!-- </div> -->
      </div>
      <div class="paganition-box">
        <b-pagination v-model="page" :total-rows="total_count" :per-page="per_page" class="mt-4" @change="onChangePage">
          <template #first-text><span class="text-info">First</span></template>
          <template #prev-text><span class="text-info">Prev</span></template>
          <template #next-text><span class="text-info">Next</span></template>
          <template #last-text><span class="text-info">Last</span></template>
          <template #ellipsis-text>
            <img width="50" height="50" src="../../assets/Icon/Ellipsis-1s-200px.svg" alt="" srcset="" />
          </template>
          <template #page="{ page, active }">
            <b v-if="active">{{ page }}</b>
            <i v-else>{{ page }}</i>
          </template>
        </b-pagination>
      </div>
    </div>
    <div class="toastify-wrapper">
      <Toastify isSuccess content="Cập nhật thành công" v-if="isSuccess" />
      <Toastify isWarnning content="Cập nhật thất bại" v-if="isWarnning" />
    </div>
    <div class="model-add-story" id="model-add-story">
      <div class="backround-popup" @click="hiddenModel"></div>
      <div class="box-add-story">
        <CreateStory :hiddenModel="hiddenModel" :storyProps="storyProps" isEditing />
      </div>
    </div>
  </div>
</template>
<script src="./profileview.js"></script>
<style lang="scss" src="./profileview.scss" scoped></style>
<style>
#customdropzone {
  /* background-color: orange; */
  font-family: 'Arial', sans-serif;
  letter-spacing: 0.2px;
  color: #777;
  transition: background-color 0.2s linear;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-image: url('https://www.gravatar.com/avatar/default?s=120&d=mp');
  background-color: #6fb3ff;
  opacity: 0.9;
}

#customdropzone .dz-preview {
  width: 160px;
  display: inline-block;
}
#customdropzone .dz-preview .dz-image {
  width: 120px;
  height: 120px;
  margin-left: 0px;
  margin-bottom: 0px;
}
#customdropzone .dz-preview {
  padding: 0;
}
#customdropzone .dz-preview .dz-image > div {
  width: inherit;
  height: inherit;
  border-radius: 50%;
  background-size: contain;
}
#customdropzone .dz-preview .dz-image > img {
  width: 100%;
}

#customdropzone .dz-preview .dz-details {
  color: white;
  transition: opacity 0.2s linear;
  text-align: center;
}
#customdropzone .dz-success-mark,
.dz-processing,
.dz-error-mark,
.dz-remove {
  display: none;
}

#customdropzone:hover .dz-remove {
  display: block;
  position: relative;
  top: -50px;
  left: 50px;
}
#customdropzone:hover .dz-image {
  opacity: 0.8;
  background-color: #6fb3ff;
  border-radius: 50%;
  background-image: none;
}
</style>
