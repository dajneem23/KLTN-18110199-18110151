<template lang="">
  <div>
    <div class="tooltip">
      {{ title }}
      <span class="tooltiptext">Long</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
  },
};
</script>
<style lang="scss" src="./Tooltip.scss" scoped></style>
