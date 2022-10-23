import CardManga from '../../CardManga/index.vue';
import { LIST_MANGA } from '../../../constants/listmanga';
export default {
  components: {
    CardManga,
  },
  props: {
    manga: Object,
  },
  data() {
    return {
      LIST_MANGA,
      pageOfItems: [],
    };
  },
  mounted() {
    console.log(this.manga);
  },
  methods: {
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
  },
};
