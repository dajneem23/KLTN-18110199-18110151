import axios from 'axios';
import SwitchButton from '../../components/SwitchButton/index.vue';
import CardNews from '../../components/CardNews/index.vue';
import { NewsServices, CategoriesServices } from '@/services';
import basePagination from '@/template/BasePagination.vue';
import Loader from '../../components/Loader/index.vue';
import Skeleton from '../../components/Loader/skeleton.vue';
const customStyles = {};
export default {
  components: {
    SwitchButton,
    CardNews,
    basePagination,
    Loader,
    Skeleton,
  },
  data() {
    return {
      customStyles,
      items: [],
      categories: [],
      filterCategory: [],
      new_items: [],
      hot_items: [],
      pageOfItems: 1,
      page: 1,
      per_page: 5,
      total_count: 0,
      total_count_new: 0,
      isTab: true,
      isLoading: true,
    };
  },
  async mounted() {
    const [newItem, error_1] = await NewsServices.getHot({
      page: this.page,
    });
    const [topItem, error_2] = await NewsServices.getTop({
      page: this.page,
    });
    this.new_items = newItem.items.slice(0, 4);
    this.hot_items = topItem.items.slice(0, 4);
    this.isLoading = false;
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
    // console.log(this.items);
    this.total_count = total_count;

    const [categoriesItem, error_3] = await CategoriesServices.get();
    this.categories = categoriesItem.items;
    console.log(this.categories);
  },
  methods: {
    async onChangePage(page) {
      this.page = page;
      if (this.isTab) {
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
      } else {
        const [
          { items = [], total_count } = {
            items: [],
          },
          error,
        ] = await NewsServices.getFollowing({
          page: this.page,
          per_page: this.per_page,
        });
        this.items = items;
        this.total_count = total_count;
      }
    },
    async onChangePageFollow(page) {},
    async filterArticlesByCategory(id) {
      // let cat_item = document.getElementById('cat-item');
      if (!this.filterCategory.includes(id)) {
        this.filterCategory.push(id);
      } else {
        this.filterCategory = this.filterCategory.filter(function(item) {
          return item !== id
      })
      }
      const [
        { items = [], total_count } = {
          items: [],
        },
        error,
      ] = await NewsServices.get({
        categories: [...this.filterCategory],
      });
      this.items = items;
      this.total_count = total_count;
      console.log(this.items);
    },
    async handleChangeTabAll() {
      this.isTab = true;
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
    async handleChangeTabFollow() {
      this.isTab = false;
      const [
        { items = [], total_count } = {
          items: [],
        },
        error,
      ] = await NewsServices.getFollowing({
        page: this.page,
        per_page: this.per_page,
      });
      this.items = items;
      console.log(this.items);
      this.total_count = total_count;
    },
  },
};
