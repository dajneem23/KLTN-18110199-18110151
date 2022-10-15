import DropDown from '../../Dropdown/index.vue';
import { FILTER_ITEM } from '../../../constants/filterFilm';
export default {
  name: 'FilterFilm',
  components: {
    DropDown,
  },
  methods: {
    getFilter() {
      console.log(FILTER_ITEM.filterFilm);
    },
    ungetFilter() {
      console.log('Bo loc');
    },
  },
  data() {
    return {
      FILTER_ITEM,
    };
  },
};
