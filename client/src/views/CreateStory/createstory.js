// import DropzoneFileUpload from '../../template/Inputs/DropzoneFileUpload';
import DropzoneFileUpload from './dropzone_story.vue';
import Toastify from '../../components/ToastifyCustom/index.vue';
import { mapState } from 'vuex';
import { store } from '../../store/vuex';
import { UploadServices, StoriesService } from '@/services';
export default {
  name: 'CkEditor',
  components: {
    DropzoneFileUpload,
    Toastify,
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
        title: '',
        name: '',
        content: '',
        images: [],
      },
      isSuccess: false,
      isWarnning: false,
    };
  },
  mounted() {},
  methods: {
    hiddenmodel() {
      if (this.hiddenModel) {
        this.hiddenModel();
      }
    },
    async createStory() {
      this.story.title = this.story.content;
      this.story.name = this.story.content;
      const [result, error] = await StoriesService.create({
        ...this.story,
      });
      if (result) {
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
          this.hiddenmodel();
        }, 2000);
      } else {
        setTimeout(() => {
          this.isWarnning = true;
        }, 2000);
      }
    },
    changeSubmit() {
      let btnUpload = document.getElementById('btn-upload');
      console.log(this.story.content);
      if (this.story.content === '') {
        btnUpload.style.cursor = 'not-allowed';
      } else {
        btnUpload.style.cursor = 'pointer';
      }
    },
    onDropZoneUploadSuccess(files) {
      console.log('onDropZoneUploadSuccess', files);
      this.story.images = files;
      console.log(this.story.images);
      // const reader = new FileReader();
      // reader.readAsBinaryString(file);

      // reader.onload = function (event) {
      //   // handle reader success

      //   resolve();
      // };
      // files.forEach((file) => {
      //   const data = new FormData();

      //   data.append('file', file);
      //   UploadServices.upload(data)
      //     .then((res) => {
      //       editor.model.change((writer) => {
      //         writer.setSelection(editor.model.document.getRoot(), 'end');
      //       });
      //       console.log('%c Upload Success', 'color:green', res);
      //       const [data] = res;
      //     })
      //     .catch((err) => {
      //       console.log('%c Upload Error', 'color:red', err);
      //     });
      // });
    },
  },
};
