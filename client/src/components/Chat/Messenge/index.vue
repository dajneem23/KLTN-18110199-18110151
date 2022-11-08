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
      <div
        class="chat-bubble"
        :class="{
          'chat-bubble--right': mySms,
          'chat-bubble--left': friendSms,
        }"
      >
        {{ sms }}
      </div>
    </div>
  </div>
</template>
<script src="./messenge.js"></script>
<style lang="scss" src="../../../views/ChatView/chatview.scss"></style>
