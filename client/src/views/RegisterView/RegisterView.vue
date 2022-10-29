<template>
  <div class="wrapper wrapper_1" @submit.prevent="register">
    <form class="form-login bgc-white">
      <h3>{{ REGISTER_ITEM.headerTitle.title[lang] }}</h3>
      <div class="error-title" v-bind:class="{ 'show-error': REGISTER_ITEM.name.error }">
        {{ REGISTER_ITEM.name.error }}
      </div>
      <div class="input-box bgc-white" v-bind:class="{ 'input-error': REGISTER_ITEM.name.error }">
        <div class="input-icon fill-gray">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
            />
          </svg>
        </div>
        <input
          type="text"
          :placeholder="REGISTER_ITEM.name.title[lang]"
          class="form-input"
          v-model="account.name"
          @blur="fullnameValidate()"
        />
      </div>
      <div class="error-title" v-bind:class="{ 'show-error': REGISTER_ITEM.email.error }">
        {{ REGISTER_ITEM.email.error }}
      </div>
      <div class="input-box bgc-white" v-bind:class="{ 'input-error': REGISTER_ITEM.email.error }">
        <div class="input-icon fill-gray">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
            />
          </svg>
        </div>
        <input
          type="text"
          :placeholder="REGISTER_ITEM.email.title[lang]"
          class="form-input"
          v-model="account.email"
          @blur="usernameValidate()"
        />
      </div>
      <div class="error-title" v-bind:class="{ 'show-error': REGISTER_ITEM.passWorld.error }">
        {{ REGISTER_ITEM.passWorld.error }}
      </div>
      <div class="input-box bgc-white" v-bind:class="{ 'input-error': REGISTER_ITEM.passWorld.error }">
        <div class="input-icon fill-gray">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
            />
          </svg>
        </div>
        <input
          type="password"
          :placeholder="REGISTER_ITEM.passWorld.title[lang]"
          class="form-input"
          v-model="account.passworld"
          @blur="passwordValiate()"
        />
      </div>
      <div class="error-title" v-bind:class="{ 'show-error': REGISTER_ITEM.passWorldConfirm.error }">
        {{ REGISTER_ITEM.passWorldConfirm.error }}
      </div>
      <div class="input-box bgc-white" v-bind:class="{ 'input-error': REGISTER_ITEM.passWorldConfirm.error }">
        <div class="input-icon fill-gray">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
            />
          </svg>
        </div>
        <input
          type="password"
          :placeholder="REGISTER_ITEM.passWorldConfirm.title[lang]"
          class="form-input"
          v-model="account.passWorldConfirm"
          @blur="passWorldConfirmValidate()"
        />
      </div>
      <div class="form-button">
        <button class="btn-primary bgc-blue cl-white" type="submit">
          {{ REGISTER_ITEM.registerButton.title[lang] }}
        </button>
        <button class="btn-google">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg>
          <span> {{ REGISTER_ITEM.googleButton.title[lang] }} </span>
        </button>
      </div>
      <div class="form-more">
        <div></div>
        <router-link to="/login/">
          <span>{{ REGISTER_ITEM.loginAccount.title[lang] }} </span>
        </router-link>
      </div>
    </form>
  </div>
</template>
<script src="./registerview"></script>
<style lang="scss" src="../LoginView/loginView.scss" scoped></style>
