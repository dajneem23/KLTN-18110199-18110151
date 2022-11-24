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
  mounted() {
    this.item.image.url = this.urlStrapiServe + this.item.image.url;
    console.log(this.item.image.url);
  },
  methods: {
    moment,
  },
};
