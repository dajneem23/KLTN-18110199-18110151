<template>
  <div class="footer-wrapper">
    <div class="content">
      <div class="join">
        <router-link to="/join">
          <img class="img-join" src="../../assets/Icon/logo.png" alt="" />
        </router-link>
      </div>
      <div>
        <h3 class="cl-white">THE BASICS</h3>
        <ul>
          <li>
            <router-link to="/introduce">
              <span class="footer-category-item cl-white"> Giới thiệu về Vrum </span>
            </router-link>
          </li>
          <li>
            <router-link to="">
              <span class="cl-white"> Contact Us </span>
            </router-link>
          </li>
          <!-- <li>
            <router-link to="">Support Forums</router-link>
          </li>
          <li>
            <router-link to="">API</router-link>
          </li>
          <li>
            <router-link to="">System Status</router-link>
          </li> -->
        </ul>
      </div>
      <!-- <div>
        <h3>GET INVOLVED</h3>
        <ul>
          <li>Contribution Bible</li>
          <li>Add New Movie</li>
          <li>Add New TV Show</li>
        </ul>
      </div> -->
    </div>
    <div class="copy-right">© Copyright by 18110151-18110199. All rights reserved.</div>
  </div>
</template>
<script src="./footer"></script>
<style lang="scss" src="./footer.scss"></style>
