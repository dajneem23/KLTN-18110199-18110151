<template>
  <div class="footer-wrapper">
    <div class="content">
      <div class="join">
        <router-link to="/join">
          <img class="img-join" src="../../assets/Icon/logo.png" alt="" />
          <button class="button-join">JOIN THE COMMUNITY</button>
        </router-link>
      </div>
      <div>
        <h3>THE BASICS</h3>
        <ul>
          <li>
            <router-link to="/introduce">
              <span class="footer-category-item"> Giới thiệu về Vrum </span>
            </router-link>
          </li>
          <li>
            <router-link to="">Contact Us</router-link>
          </li>
          <li>
            <router-link to="">Support Forums</router-link>
          </li>
          <li>
            <router-link to="">API</router-link>
          </li>
          <li>
            <router-link to="">System Status</router-link>
          </li>
        </ul>
      </div>
      <div>
        <h3>GET INVOLVED</h3>
        <ul>
          <li>Contribution Bible</li>
          <li>Add New Movie</li>
          <li>Add New TV Show</li>
        </ul>
      </div>
    </div>
    <div class="copy-right">© Copyright by 18110151-18110190. All rights reserved.</div>
  </div>
</template>
<script src="./footer"></script>
<style lang="scss" src="./footer.scss"></style>
