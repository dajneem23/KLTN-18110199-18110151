import axios from 'axios';
import SwitchButton from '../../components/SwitchButton/index.vue';
import CardNews from '../../components/CardNews/index.vue';
import { LIST_FILM } from '../../constants/listfilm';

import { StoriesService } from '@/services';
export default {
  components: {
    SwitchButton,
    CardNews,
  },
  async mounted() {
    const [
      { items = [], total_count } = {
        items: [],
      },
      error,
    ] = await StoriesService.get();
    this.data = items;
  },
  data() {
    return {
      LIST_FILM,
      data: [],
    };
  },
};
