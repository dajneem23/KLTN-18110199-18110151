import axios from 'axios';
import SwitchButton from '../../components/SwitchButton/index.vue';
import CardNews from '../../components/CardNews/index.vue';
import { NewsServices } from '@/services';

const customStyles = {};
export default {
  components: {
    SwitchButton,
    CardNews,
  },
  data() {
    return {
      pageOfItems: [],
      customStyles,
      data: Object,
    };
  },
  async mounted() {
    const [
      { items = [], total_count } = {
        items: [],
      },
      error,
    ] = await NewsServices.get();
    this.data = items;
    console.log(this.data);
  },
  methods: {
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
  },
};
