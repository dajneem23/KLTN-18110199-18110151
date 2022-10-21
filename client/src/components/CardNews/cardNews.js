export default {
  props: {
    style_x: String,
    font_title: String,
    news: Object,
  },
  watch: {
    data(newData) {
      if (newData)
        Object.keys(newData).map((key) => {
          if (key == '_v') return;
          this[key] = newData[key];
        });
      // console.log(this);
    },
  },
  created() {
    if (this.news)
      Object.keys(this.news).map((key) => {
        // console.log(key);
        if (key == '_v') return;
        this[key] = this.news[key];
      });
  },
  methods: {
    addWishList(string) {
      console.log(string);
    },
  },
};
