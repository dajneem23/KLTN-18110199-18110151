import FilterManga from '../../components/Reading/FilterManga/index.vue';
import CardManga from '../../components/CardManga/index.vue';
import { MangaServices } from '@/services';
import basePagination from '@/template/BasePagination.vue';
export default {
  components: {
    FilterManga,
    basePagination,
    CardManga,
  },
  data() {
    return {
      items: [],
      pageOfItems: 1,
      page: 1,
      per_page: 12,
      total_count: 0,
    };
  },
  async mounted() {
    const [
      { items = [], total_count } = {
        items: [],
      },
      error,
    ] = await MangaServices.get({
      page: this.page,
      per_page: this.per_page,
    });
    this.items = items;
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
      ] = await MangaServices.get({
        page: this.page,
        per_page: this.per_page,
      });
      this.items = items;
      this.total_count = total_count;
    },
  },
};
