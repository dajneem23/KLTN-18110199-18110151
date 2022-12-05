import moment from 'moment';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Card',
  computed: {
    ...mapState(['urlStrapiServe']),
  },
  props: {
    item: Object,
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
    // this.item.image.url = 'https://zinc-union-365709-strapi-63see6q63q-uc.a.run.app/' + this.item.image.url;
    console.log(this.urlStrapiServe);
  },
  created() {
    if (this.item)
      Object.keys(this.item).map((key) => {
        if (key == '_v') return;
        this[key] = this.item[key];
      });
  },
  methods: {
    moment,
  },
};
