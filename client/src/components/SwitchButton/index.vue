<template>
  <div class="form-box">
    <div class="button-boxx">
      <div id="btn" class="button" ref="btnRef"></div>
      <button type="button" class="toggle-btnn" @click="onClick1">
        <span class="active-btn" ref="btnRefL">
          {{ contentL }}
        </span>
      </button>
      <button type="button" class="toggle-btnn" @click="onClick2">
        <span ref="btnRefR">{{ contentR }}</span>
      </button>
    </div>
  </div>
</template>
<script src="./switchButton.js"></script>
<style lang="scss" src="./switchButton.scss" scoped></style>
