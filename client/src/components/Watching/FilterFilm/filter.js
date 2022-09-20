import DropDown from '../../Dropdown/index.vue';
import { FILTER_ITEM } from '../../../constants/filter';
export default {
  name: 'FilterFilm',
  components: {
    DropDown,
  },
  methods: {
    getFilter() {
      console.log(FILTER_ITEM.filterFilm);
    },
  },
  data() {
    return {
      FILTER_ITEM,
    };
  },
};
