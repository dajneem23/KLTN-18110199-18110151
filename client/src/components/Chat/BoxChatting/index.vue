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
          <h3>Robo Cop</h3>
          <p class="text-muted">Layin' down the law since like before Christ...</p>
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
        <Messenge friendSms sms="Hello motherfucker" />
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
          <input type="text" placeholder="Type your message here..." v-model="sms" />
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
