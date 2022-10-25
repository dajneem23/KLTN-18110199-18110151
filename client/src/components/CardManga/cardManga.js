export default {
  props: {
    data: Object,
  },
  mounted() {
    console.log(this.data.chapter);
  },
};
