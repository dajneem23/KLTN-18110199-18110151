import SwitchButton from '../../components/SwitchButton/index.vue';
import CardNews from '../../components/CardNews/index.vue';
import { LIST_FILM } from '../../constants/listfilm';
export default {
  components: {
    SwitchButton,
    CardNews,
  },
  data() {
    return {
      LIST_FILM
    }
  }
};
