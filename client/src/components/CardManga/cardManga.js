import { mapActions, mapState } from 'vuex';
export default {
  props: {
    data: Object,
  },
  computed: {
    ...mapState(['urlStrapiServe']),
  },
  mounted() {
    this.data.images[0].url = this.urlStrapiServe + this.data.images[0].url;
    console.log(this.data.images[0].url);
  },
};
