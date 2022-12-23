import FilterManga from '../../components/Reading/FilterManga/index.vue';
import CardManga from '../../components/CardManga/index.vue';
import Loader from '../../components/Loader/index.vue';
import Skeleton from '../../components/Loader/skeleton.vue';
import { MangaServices } from '@/services';
import basePagination from '@/template/BasePagination.vue';
export default {
  components: {
    FilterManga,
    basePagination,
    CardManga,
    Loader,
    Skeleton,
  },
  data() {
    return {
      items: [],
      new_items: [],
      hot_items: [],
      pageOfItems: 1,
      page: 1,
      per_page: 15,
      total_count: 0,
      searchString: '',
      isLoading: true,
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
    // console.log(this.items);
    this.isLoading = false;
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
    async searchManga(searchString) {
      const box_list = document.getElementsByClassName('list-new-box');
      setTimeout(function () {
        for (const element of box_list) {
          element.style.display = 'none';
        }
      }, 520);

      console.log(box_list);
      const [
        { items = [], total_count } = {
          items: [],
        },
        error,
      ] = await MangaServices.search({
        q: searchString,
      });
      this.items = items;
      this.total_count = total_count;
      console.log(this.items);
    },
  },
};
