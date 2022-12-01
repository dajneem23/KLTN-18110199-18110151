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
    // this.item.image.url = 'https://zinc-union-365709-strapi-63see6q63q-uc.a.run.app/' + this.item.image.url;
    console.log(this.urlStrapiServe);
  },
  methods: {
    moment,
  },
};
