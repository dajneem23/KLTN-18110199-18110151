import FilterManga from '../../components/Reading/FilterManga/index.vue';
import ListManga from '../../components/Reading/ListManga/index.vue';
import { MangaServices } from '@/services';
export default {
  components: {
    FilterManga,
    ListManga,
  },
  data() {
    return {
      manga: Object,
    };
  },
  async mounted() {
    const [
      { items = [], total_count = 0 } = {
        items: [],
        total_count: 0,
      },
      error,
    ] = await MangaServices.get({
      params: { page: this.page, per_page: this.per_page },
    });
    this.manga = items;
    // console.log(this.manga, total_count);
  },
};
