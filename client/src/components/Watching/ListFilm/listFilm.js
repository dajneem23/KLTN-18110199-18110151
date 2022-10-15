import Card from '../../CardFilm/index.vue';
import { LIST_FILM } from '../../../constants/listfilm';

const customStyles = {};
export default {
  components: {
    Card,
  },
  data() {
    return {
      LIST_FILM,
      pageOfItems: [],
      customStyles,
    };
  },
  methods: {
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
  },
};
