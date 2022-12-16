<template>
  <div class="chat-wrapper">
    <div class="box-chatting">
      <div class="row no-gutters">
        <div class="col-md-3 border-right">
          <div class="search-box-chat">
            <div class="input-wrapper">
              <input placeholder="Search here" type="text" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
                />
              </svg>
            </div>
          </div>
          <div class="type-message">
            <div class="type-item" @click="changeTypeAll">Đoạn chat</div>
            <div class="type-item" @click="changeTypeWait">Tin nhắn chờ</div>
          </div>
          <hr />
          <div class="list-sms">
            <div class="friend-drawer friend-drawer--onhover" v-for="chat of listChat" @click="getChat(chat.id)" :id="chat.id">
              <img
                class="profile-image"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                alt=""
              />
              <div class="text">
                <div class="list-name-chat">
                  <h3 v-if="chat.type === 'group'" v-for="user of chat.users">{{ user.username }},</h3>
                </div>
                <h3 v-if="chat.type === 'private'">{{ chat.users[1].username }}</h3>
                <p class="text-muted">{{ chat.id }}</p>
              </div>
              <span class="time text-muted small">13:21</span>
            </div>
            <hr />
          </div>
        </div>
        <div class="welcom-chat col-md-9" v-if="!isChangeMessage">
          <div>Chào mừng bạn đến với V-chat</div>
        </div>
        <BoxChatting :dataChat.sync="idChat" v-if="isChangeMessage" />
      </div>
    </div>
  </div>
</template>
<script src="./chatview.js"></script>
<style lang="scss" src="./chatview.scss" scoped></style>
