export default {
  data() {
    return {
      filmData: [],
    };
  },
  props: ['id', 'data'],
  mounted() {
    this.filmData = this.$route.params.filmData;
    console.log(this.$route);
    console.log('mounted');

  },
};
