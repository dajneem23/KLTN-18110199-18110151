<template>
  <div class="col-md-9">
    <div class="settings-tray">
      <div class="friend-drawer no-gutters friend-drawer">
        <img
          class="profile-image"
          src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
          alt=""
        />
        <div class="text">
          <div class="chat-name">
            <h3 v-for="user of users">{{ user.username }},</h3>
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
      <infinite-loading direction="top" @infinite="infiniteHandler"></infinite-loading>

      <div v-for="(post, index) in posts" :key="index">
        <Messenge friendSms :sms="post.content" v-if="post.author.id === userInfo.id" />
        <Messenge mySms :sms="post.content" v-if="post.author.id !== userInfo.id" />
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
            <div class="box-emoji" id="box-emoji">
              😀 😃 😄 😁 😆 😅 😂 🤣 🥲 🥹 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 😏
              😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😮‍💨 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🫣 🤗 🫡 🤔 🫢 🤭 🤫 🤥
              😶 😶‍🌫️ 😐 😑 😬 🫠 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵‍💫 🫥 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻
              💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾
            </div>
            <img src="https://img.icons8.com/emoji/48/null/grinning-face-emoji.png" @click="showEmojiBox" />
          </div>
          <input type="text" placeholder="Type your message here..." v-model="sms.content" />
          <button class="btn-send-sms" @click="sendSms">
            <img
              src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/null/external-send-user-interface-kmg-design-flat-kmg-design.png"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./boxchatting.js"></script>
<style lang="scss" src="../../../views/ChatView/chatview.scss"></style>
