import DropzoneFileUpload from '../../template/Inputs/DropzoneFileUpload';
import { mapState } from 'vuex';
import { store } from '../../store/vuex';
export default {
  name: 'CkEditor',
  components: {
    DropzoneFileUpload,
  },
  props: {
    hiddenModel: {
      type: Function,
    },
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated']),
  },
  data() {
    return {
      story: {
        content: '',
        images: [],
      },
    };
  },
  methods: {
    hiddenmodel() {
      if (this.hiddenModel) {
        this.hiddenModel();
      }
    },
    createStory() {
      console.log(this.story);
    },
  },
};
