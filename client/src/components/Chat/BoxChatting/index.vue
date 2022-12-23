<template>
  <div class="col-md-9">
    <div class="settings-tray">
      <div class="friend-drawer no-gutters friend-drawer">
        <img
          class="profile-image"
          :src="users[0].avatar[0]?.url || 'https://www.gravatar.com/avatar/default?s=200&d=mp'"
          alt=""
          v-if="users[1]?.id === userInfo._id"
        />
        <img
          class="profile-image"
          :src="users[1].avatar[0]?.url || 'https://www.gravatar.com/avatar/default?s=200&d=mp'"
          alt=""
          v-if="users[1]?.id !== userInfo._id"
        />
        <div class="text">
          <div class="chat-name">
            <h3 v-if="users[1]?.id === userInfo._id">{{ users[0].username }}</h3>
            <h3 v-if="users[1]?.id !== userInfo._id">{{ users[1].username }}</h3>
            <!-- <h3>{{ users[1].username }}</h3> -->
          </div>
          <p class="text-muted e">
            <!-- <span> </span> -->
          </p>
        </div>
        <!-- <span class="settings-tray--right">
                <i class="material-icons">cached</i>
                <i class="material-icons">message</i>
                <i class="material-icons">menu</i>
              </span> -->
      </div>
    </div>
    <div class="chat-panel" id="chat-panel">
      <infinite-loading direction="top" @infinite="infiniteHandler"> </infinite-loading>

      <div v-for="(post, index) in posts" :key="index">
        <Messenge friendSms :sms="post" v-if="post.author.id !== userInfo._id" />
        <Messenge mySms :sms="post" v-if="post.author.id === userInfo._id" />
      </div>
      <!-- <Messenge mySms sms="fuck you" />
      <Messenge friendSms sms="Hello motherfucker" />
      <Messenge friendSms sms="Hello motherfucker" />
      <Messenge friendSms sms="Hello motherfucker" />
      <Messenge friendSms sms="Hello motherfucker" />

      <div class="row no-gutters">
        <div class="col-md-3 offset-md-9">
          <div class="chat-bubble chat-bubble--right">Hello dude!</div>
        </div>
      </div>
      <div class="row no-gutters">
        <img
          class="profile-image"
          src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg"
          alt=""
        />
        <div class="col-md-3">
          <div class="chat-bubble chat-bubble--left">Hello dude!</div>
        </div>
      </div>
      <div class="row no-gutters">
        <img
          class="profile-image"
          src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg"
          alt=""
        />
        <div class="col-md-3">
          <div class="chat-bubble chat-bubble--left">Hello dude!</div>
        </div>
      </div>
      <div class="row no-gutters">
        <img
          class="profile-image"
          src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg"
          alt=""
        />
        <div class="col-md-3">
          <div class="chat-bubble chat-bubble--left">Hello dude!</div>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-md-3 offset-md-9">
          <div class="chat-bubble chat-bubble--right">Hello dude!</div>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-md-3 offset-md-9">
          <div class="chat-bubble chat-bubble--right">Hello dude!</div>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-md-3 offset-md-9">
          <div class="chat-bubble chat-bubble--right">Hello dude!</div>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-md-3 offset-md-9">
          <div class="chat-bubble chat-bubble--right">Hello dude!</div>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-md-3 offset-md-9">
          <div class="chat-bubble chat-bubble--right">Hello dude!</div>
        </div>
      </div> -->
    </div>
    <!-- <div class="reply-mess" id="reply-mess">
      <div>Dang tra loi: Hhahaha</div>
      <div @click="hiddenReply">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
          />
        </svg>
      </div>
    </div> -->
    <div class="">
      <div class="box-send">
        <div class="chat-box-tray">
          <div>
            <div
              v-if="isShowEmojiBox"
              class="box-emoji d-flex flex-grow-1 flex-wrap ml-5"
              id="box-emoji"
              @mouseleave="isShowEmojiBox = false"
            >
              <div v-for="(emoji, index) in emojis" :key="index" class="emoji pl-2" @click="addEmoji(emoji)">
                {{ emoji }}
              </div>
            </div>
            <img src="https://img.icons8.com/emoji/48/null/grinning-face-emoji.png" @click="showEmojiBox" />
          </div>
          <input type="text" placeholder="Type your message here..." v-model="sms.content" />
          <button class="btn-send-sms" @click="sendSms">
            <img
              v-if="!isSending"
              src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/null/external-send-user-interface-kmg-design-flat-kmg-design.png"
            />

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              style="display: block; shape-rendering: auto"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#e15b64"
                stroke-width="10"
                r="35"
                stroke-dasharray="164.93361431346415 56.97787143782138"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="1s"
                  values="0 50 50;360 50 50"
                  keyTimes="0;1"
                ></animateTransform>
              </circle>
              <!-- [ldio] generated by https://loading.io/ -->
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./boxchatting.js"></script>
<style lang="scss" src="../../../views/ChatView/chatview.scss"></style>
