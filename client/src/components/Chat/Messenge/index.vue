<template lang="">
  <div class="row no-gutters">
    <img
      v-if="friendSms"
      class="profile-image"
      src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg"
      alt=""
    />
    <div
      class="col-md-3"
      :class="{
        'offset-md-9': mySms,
      }"
    >
      <!-- <button v-if="mySms">Hello</button> -->
      <div
        class="chat-bubble"
        :class="{
          'chat-bubble--right': mySms,
          'chat-bubble--left': friendSms,
        }"
      >
        😌😌
      </div>
    </div>
    <div v-if="friendSms" class="btn-utility-mess">
      <div class="utility-item">
        <img src="../../../assets/Icon/reply.png" alt="" />
      </div>
      <div class="utility-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM208.4 208c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zm128 32c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script src="./messenge.js"></script>
<style lang="scss" src="../../../views/ChatView/chatview.scss"></style>
