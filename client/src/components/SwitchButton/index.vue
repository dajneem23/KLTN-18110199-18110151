<template>
  <div class="form-box">
    <div class="button-boxx">
      <div ref="{buttonRef}" id="btn" class="button"></div>
      <button type="button" class="toggle-btnn">
        <span ref="{btnRefL}" class="active-btn"> {{ contentL }} </span>
      </button>
      <button type="button" class="toggle-btnn">
        <span ref="{btnRefR}">{{ contentR }}</span>
      </button>
    </div>
  </div>
</template>
<script src="./switchButton.js"></script>
<style lang="scss" src="./switchButton.scss" scoped></style>
