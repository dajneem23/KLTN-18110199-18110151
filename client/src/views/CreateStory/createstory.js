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
    storyProps: Object,
    isEditing: Boolean,
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
      initImages: [],
      isSuccess: false,
      isWarnning: false,
    };
  },
  watch: {
    storyProps: {
      handler(val) {
        if (this.isEditing) {
          this.story.title = this.storyProps.title;
          this.story.name = this.storyProps.name;
          this.story.content = this.storyProps.content;
          this.story.images = this.storyProps.images;
          this.initImages = this.storyProps?.images ? this.storyProps?.images : [];
          console.log('changes', this.initImages);
        }
      },
      deep: true,
    },
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
      if (!this.story.title || !this.story.name || !this.story.content) {
        this.isWarnning = true;
        setTimeout(() => {
          this.isWarnning = false;
        }, 2000);
      } else {
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
          this.isWarnning = true;
          setTimeout(() => {
            this.isWarnning = false;
          }, 2000);
        }
      }
    },
    async editStory() {
      if (!this.story.title || this.story.name || this.story.content) {
        this.isWarnning = true;
        setTimeout(() => {
          this.isWarnning = false;
          this.$bvModal.hide('confirm-edit-modal');
        }, 2000);
      } else {
        console.log(this.storyProps);
        const [result, error] = await StoriesService.update(this.storyProps.id, {
          title: this.story.content,
          name: this.story.content,
          content: this.story.content,
          images: this.story.images,
        });
        console.log([result, error], {
          ...this.story,
        });
        if (result) {
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
            this.$bvModal.hide('confirm-edit-modal');
          }, 2000);
        }
        if (error) {
          this.isWarnning = true;
          setTimeout(() => {
            this.isWarnning = false;
            this.$bvModal.hide('confirm-edit-modal');
          }, 2000);
        }
      }
    },
    async deleteStory() {
      const [result, error] = await StoriesService.delete(this.storyProps.id);
      console.log([result, error]);
      if (result) {
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = true;
          this.$bvModal.hide('confirm-delete-modal');
          this.$router.push('/profile');
        }, 2000);
      } else {
        this.isWarnning = true;

        setTimeout(() => {
          this.isWarnning = false;
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
