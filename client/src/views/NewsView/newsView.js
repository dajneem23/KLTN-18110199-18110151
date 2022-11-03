import axios from 'axios';
import SwitchButton from '../../components/SwitchButton/index.vue';
import CardNews from '../../components/CardNews/index.vue';
import { NewsServices } from '@/services';
import basePagination from '@/template/BasePagination.vue';
const customStyles = {};
export default {
  components: {
    SwitchButton,
    CardNews,
    basePagination,
  },
  data() {
    return {
      customStyles,
      items: [],
      new_items: [],
      hot_items: [],
      pageOfItems: 1,
      page: 1,
      per_page: 5,
      total_count: 0,
    };
  },
  async mounted() {
    const [
      { items = [], total_count } = {
        items: [],
      },
      error,
    ] = await NewsServices.get({
      page: this.page,
      per_page: this.per_page,
    });
    this.items = items;
    this.new_items = items.slice(0, 4);
    this.hot_items = items.slice(1, 5);
    this.total_count = total_count;
    console.log(this.items);
  },
  methods: {
    async onChangePage(page) {
      this.page = page;
      const [
        { items = [], total_count } = {
          items: [],
        },
        error,
      ] = await NewsServices.get({
        page: this.page,
        per_page: this.per_page,
      });
      this.items = items;
      this.total_count = total_count;
    },
  },
};
