import { FILTER_ITEM } from '../../constants/filterFilm';
export default {
  name: 'DropdownCus',
  props: {
    data: Object,
  },
  data() {
    return {
      lang: 'vi',
      FILTER_ITEM,
    };
  },
  methods: {
    setValue(label, value) {
      if (label === 'Thể loại') {
        FILTER_ITEM.filterFilm.category = value;
      }
      if (label === 'Quốc gia') {
        FILTER_ITEM.filterFilm.country = value;
      }
      if (label === 'Năm phát hành') {
        FILTER_ITEM.filterFilm.year = value;
      }
    },
  },
};
