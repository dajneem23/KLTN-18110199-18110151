import FilterFilm from '../../components/Watching/FilterFilm/index.vue';
import CardFilm from '../../components/CardFilm/index.vue';
import Loader from '../../components/Loader/index.vue';
import Skeleton from '../../components/Loader/skeleton.vue'
import { FilmServices } from '@/services';
export default {
  components: {
    FilterFilm,
    CardFilm,
    Loader,
    Skeleton
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
      isLoading:true,
    };
  },
  async mounted() {
    const [
      { items = [], total_count } = {
        items: [],
      },
      error,
    ] = await FilmServices.get({
      page: this.page,
      per_page: this.per_page,
    });
    this.items = items;
    this.new_items = items.slice(1, 6);
    this.hot_items = items.slice(0, 5);
    this.total_count = total_count;
    console.log(this.items);
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
      ] = await FilmServices.get({
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
      ] = await FilmServices.search({
        q: searchString,
      });
      this.items = items;
      this.total_count = total_count;
      console.log(this.items);
    },
  },
};
