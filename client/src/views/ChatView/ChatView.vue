<template lang="">
  <div class="chat-wrapper">
    <div class="box-chatting">
      <div class="row no-gutters">
        <div class="col-md-3 border-right">
          <!-- <div class="settings-tray">
            <img
              class="profile-image"
              src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg"
              alt="Profile img"
            />
            <span class="settings-tray--right">
              <i class="material-icons">cached</i>
              <i class="material-icons">message</i>
              <i class="material-icons">menu</i>
            </span>
          </div> -->
          <div class="search-box">
            <div class="input-wrapper">
              <input placeholder="Search here" type="text" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
                />
              </svg>
            </div>
          </div>
          <div class="list-sms">
            <div class="friend-drawer friend-drawer--onhover">
              <img
                class="profile-image"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                alt=""
              />
              <div class="text">
                <h3>Robo Cop</h3>
                <p class="text-muted">Hey, you're arrested!</p>
              </div>
              <span class="time text-muted small">13:21</span>
            </div>
            <hr />
            <div class="friend-drawer friend-drawer--onhover">
              <img
                class="profile-image"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg"
                alt=""
              />
              <div class="text">
                <h3>Optimus</h3>
                <p class="text-muted">Wanna grab a beer?</p>
              </div>
              <span class="time text-muted small">00:32</span>
            </div>
            <hr />
            <div class="friend-drawer friend-drawer--onhover">
              <img
                class="profile-image"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png"
                alt=""
              />
              <div class="text">
                <h3>Skynet</h3>
                <p class="text-muted">Seen that canned piece of s?</p>
              </div>
              <span class="time text-muted small">13:21</span>
            </div>
            <hr />
            <div class="friend-drawer friend-drawer--onhover">
              <img
                class="profile-image"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/termy.jpg"
                alt=""
              />
              <div class="text">
                <h3>Termy</h3>
                <p class="text-muted">Im studying spanish...</p>
              </div>
              <span class="time text-muted small">13:21</span>
            </div>
            <hr />
            <div class="friend-drawer friend-drawer--onhover">
              <img
                class="profile-image"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rick.jpg"
                alt=""
              />
              <div class="text">
                <h3>Richard</h3>
                <p class="text-muted">I'm not sure...</p>
              </div>
              <span class="time text-muted small">13:21</span>
            </div>
            <hr />
            <div class="friend-drawer friend-drawer--onhover">
              <img
                class="profile-image"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rachel.jpeg"
                alt=""
              />
              <div class="text">
                <h3>XXXXX</h3>
                <p class="text-muted">Hi, wanna see something?</p>
              </div>
              <span class="time text-muted small">13:21</span>
            </div>
          </div>
        </div>
        <BoxChatting />
      </div>
    </div>
  </div>
</template>
<script src="./chatview.js"></script>
<style lang="scss" src="./chatview.scss" scoped></style>
