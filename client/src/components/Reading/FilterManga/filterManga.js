import DropDown from '../../Dropdown/index.vue';
import { FILTERMANGA_ITEM } from '../../../constants/filterManga';
export default {
  name: 'FilterManga',
  components: {
    DropDown,
  },
  methods: {
    getFilter() {
      console.log(FILTERMANGA_ITEM.filterFilm);
    },
    ungetFilter() {
      console.log('Bo loc');
    },
  },
  data() {
    return {
      FILTERMANGA_ITEM,
    };
  },
};
