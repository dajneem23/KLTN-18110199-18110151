// import DropzoneFileUpload from '../../template/Inputs/DropzoneFileUpload';
import DropzoneFileUpload from './dropzone_story.vue';
import { mapState } from 'vuex';
import { store } from '../../store/vuex';
import { UploadServices, StoriesService } from '@/services';
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
        title: '',
        name: '',
        content: '',
        images: [],
      },
    };
  },
  mounted() {
    // this.changeSubmit();
  },
  methods: {
    hiddenmodel() {
      if (this.hiddenModel) {
        this.hiddenModel();
      }
    },
    async createStory() {
      this.story.title = this.story.content;
      this.story.name = this.story.content;
      console.log({ ...this.story });
      const [result, error] = await StoriesService.create({
        ...this.story,
      });
      console.log(result, error);
      alert('Tạo bài viết thành công');
      this.hiddenmodel();
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
