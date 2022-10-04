import CardManga from '../../CardManga/index.vue';
import { LIST_MANGA } from '../../../constants/listmanga';
export default {
  components: {
    CardManga,
  },
  data() {
    return {
      LIST_MANGA,
      pageOfItems: [],
    };
  },
  methods: {
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
  },
};
