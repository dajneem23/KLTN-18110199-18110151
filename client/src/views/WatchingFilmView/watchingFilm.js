import FilterFilm from '../../components/Watching/FilterFilm/index.vue';
import CardFilm from '../../components/CardFilm/index.vue';
import {FilmServices} from '@/services'
export default {
  components: {
    FilterFilm,
    CardFilm
  },
  data() {
    return {
      items: [],
      pageOfItems: 1,
      page: 1,
      per_page: 12,
      total_count: 0,
      searchString: '',
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
      ] = await MangaServices.search({
        q: searchString,
      });
      this.items = items;
      this.total_count = total_count;
      console.log(this.items);
    },
  },
};
