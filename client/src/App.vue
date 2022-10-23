<template>
  <div id="app" class="app">
    <router-view name="header"></router-view>
    <main>
      <fade-transition origin="center" mode="out-in" :duration="100">
        <router-view />
      </fade-transition>
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';
export default {
  components: {
    FadeTransition,
  },
};
</script>
<style lang="scss">
.app {
  max-width: 1912px;
  background-color: #f2f2f2;
}
</style>
