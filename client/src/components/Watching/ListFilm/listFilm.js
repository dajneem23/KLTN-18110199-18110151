import Card from '../../Card/index.vue';
import { LIST_FILM } from '../../../constants/listfilm';

const customStyles = {

};
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
  mounted() {
    var style = document.querySelector('.active');
    console.log(style);
  },
};
