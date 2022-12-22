import Ckedtor from '../../components/Ckeditor/CkEditor.vue';
import { NewsServices } from '@/services';
export default {
  components: {
    Ckedtor,
  },
  data() {
    return {
      news: {},
    };
  },
  async mounted() {
    const [result, error] = await NewsServices.getById('nui-ba-den');
    if (result) {
      this.news = result;
    }
    console.log(this.news)
  },
};
