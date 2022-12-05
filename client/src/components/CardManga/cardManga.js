import { mapActions, mapState } from 'vuex';
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      reacts: [],
    };
  },
  computed: {
    ...mapState(['urlStrapiServe']),
  },
  watch: {
    data(newData) {
      if (newData)
        Object.keys(newData).map((key) => {
          if (key == '_v') return;
          this[key] = newData[key];
        });
    },
  },
  mounted() {
    // this.data.images[0].url = this.urlStrapiServe + this.data.images[0].url;
  },
  created() {
    if (this.data)
      Object.keys(this.data).map((key) => {
        if (key == '_v') return;
        this[key] = this.data[key];
      });
  },
};
