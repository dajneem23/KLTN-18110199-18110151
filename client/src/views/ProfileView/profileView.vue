<template>
  <div class="profile-wrapper">
    <div class="img-banner--user">
      <img src="../../assets/Icon/perspectives_rebrand_banner.png" alt="" />
    </div>
    <div class="box-profile">
      <div class="box-info--user bgc-white flex flex-row justify-content-between">
        <div class="user-avt">
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
        </div>
        <div class="flex flex-column justify-content-center">
          <div class="box-edit">
            <div class="user-name text-center text-dark" v-if="!isEditName">{{ userInfo?.username }}</div>
            <div class="user-name text-center box-edit-name" v-if="isEditName">
              <input type="text" v-model="newName" />
            </div>
            <button>
              <img src="../../assets/Icon/icons8-pencil-30.png" alt="" v-if="!isEditName" @click="editName" />
              <img src="../../assets/Icon/icons8-save-30.png" alt="" v-if="isEditName" @click="updateProfile" />
            </button>
          </div>
          <div class="user-email text-dark-gray text-center">{{ userInfo?.email }}</div>
          <div class="box-info--footer">
            <div class="box-footer-item text-dark-gray">
              <div>FOLLOWING</div>
              <span>{{ userInfo?.following?.length || 0 }}</span>
            </div>
            <div class="box-footer-item text-dark-gray">
              <div>SPIDERS</div>
              <span>0</span>
            </div>
          </div>
        </div>

        <!-- <router-link to="/profile/edit">
          <button class="btn-defaultt bgc-blue_3 cl-white">Chỉnh sửa</button>
        </router-link> -->
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
            <th>Nội dung</th>
            <th>Lượt thích</th>
            <th>Lượt bình luận</th>
            <th>Thao tác</th>
          </tr>
          <tr v-for="(item, key) of items">
            <td class="table-content">{{ item.name }}</td>
            <td>{{ item.reacts?.length || 0 }}</td>
            <td>{{ item.commtents?.length || 0 }}</td>
            <td>
              <router-link :to="{ name: 'editNews', params: { id: item.slug, item } }">
                <button v-if="!isStoriesTab">
                  <img src="../../assets/Icon/icons8-pencil-30.png" alt="" />
                </button>
              </router-link>
              <button @click="editStories(item.slug)" v-if="isStoriesTab">
                <img src="../../assets/Icon/icons8-pencil-30.png" alt="" />
              </button>
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
