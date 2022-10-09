import { FILTER_ITEM } from '../../constants/filterFilm';
import { FILTERMANGA_ITEM } from '../../constants/filterManga';
export default {
  name: 'DropdownCus',
  props: {
    data: Object,
    type: String,
  },
  data() {
    return {
      lang: 'vi',
      FILTER_ITEM,
    };
  },
  methods: {
    setValue(label, value, type) {
      if (type === 'film') {
        if (label === 'Thể loại') {
          FILTER_ITEM.filterFilm.category = value;
        }
        if (label === 'Quốc gia') {
          FILTER_ITEM.filterFilm.country = value;
        }
        if (label === 'Năm phát hành') {
          FILTER_ITEM.filterFilm.year = value;
        }
      }
      if (type === 'manga') {
        if (label === 'Thể loại') {
          FILTERMANGA_ITEM.filterManga.category = value;
        }
        if (label === 'Quốc gia') {
          FILTERMANGA_ITEM.filterManga.country = value;
        }
        if (label === 'Năm phát hành') {
          FILTERMANGA_ITEM.filterManga.year = value;
        }
        if (label === 'Nhà xuất bản') {
          FILTERMANGA_ITEM.filterManga.publishing = value;
        }
      }
    },
  },
};
