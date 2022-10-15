<template>
  <form id="app-cover">
    <div id="select-box">
      <input type="checkbox" id="options-view-button" />
      <div id="select-button" class="brd">
        <div id="selected-value">
          <span>{{ data.label[lang] }}</span>
        </div>
        <div id="chevrons">
          <i class="fas fa-chevron-up"></i>
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
      <div id="options">
        <div class="option" v-for="item in data.listData">
          <input
            class="s-c top"
            type="radio"
            name="platform"
            :value="item.value"
            v-on:click="setValue(data.label['vi'], item.value, type)"
          />
          <input
            class="s-c bottom"
            type="radio"
            name="platform"
            :value="item.value"
            v-on:click="setValue(data.label['vi'], item.value,type)"
          />
          <span class="label">{{ item[lang] }}</span>
          <span class="opt-val">{{ item[lang] }}</span>
        </div>

        <div id="option-bg"></div>
      </div>
    </div>
  </form>
</template>
<script src="./dropdown"></script>
<style lang="scss" src="./dropdown.scss"></style>
