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
    const { id } = this.$route.params;
    if (!id) return this.$router.push('/not-found');
    const [result, error] = await NewsServices.getById(id);
    if (result) {
      this.news = result;
    }
    console.log(this.news);
    if (error) {
      this.$router.push('/not-found');
    }
  },
};
