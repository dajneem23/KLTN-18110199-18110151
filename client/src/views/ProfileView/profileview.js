import { mapState } from 'vuex';
import Toastify from '../../components/ToastifyCustom/index.vue';
import CreateStory from '../../views/CreateStory/index.vue';
import { store } from '../../store/vuex';
import vue2Dropzone from 'vue2-dropzone';
import { UserService, NewsServices, StoriesService } from '@/services';
import basePagination from '@/template/BasePagination.vue';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
export default {
  components: {
    vueDropzone: vue2Dropzone,
    Toastify,
    basePagination,
    CreateStory,
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated']),
  },
  watch: {
    useInfo: function (val) {
      const dropzone = this.$refs.customdropzone;
      console.log({
        val,
        dropzone,
      });
      dropzone.$el.style.backgroundImage = `url(${val.avatar[0].url})`;
    },
    async items() {
      this.$emit('update:items', this.items);
      if (this.isStoriesTab) {
        const [
          { items = [], total_count } = {
            items: [],
          },
          error,
        ] = await StoriesService.getMyStories();
        this.items = items;
        // console.log(items);
        this.total_count = total_count;
        // console.log(result, 'result');
      }
    },
  },
  data() {
    return {
      storyProps: {},
      isStoriesTab: true,
      isSuccess: false,
      isWarnning: false,
      isEditName: false,
      items: [],
      myStories: [],
      // total_countArticles: 0,
      pageOfItems: 1,
      page: 1,
      per_page: 10,
      total_count: 0,
      newName: '',
      user: {
        username: '',
        avatar: '',
      },
      dropzoneOptions: {
        url: `${process.env.VUE_APP_BASE_URL}/${process.env.VUE_APP_BASE_API_PREFIX}/${process.env.VUE_APP_BASE_API_VERSION}/upload/`,
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        withCredentials: true,
        addRemoveLinks: true,
        dictCancelUpload: '',
        acceptedFiles: 'image/*',
        multiple: false,
        previewTemplate: this.uploadTemplate(),
        dictRemoveFile:
          '<i class="fa-solid fa-trash " data-dz-remove style="color:red;cursor:pointer;font-size: 1.5rem;"> </i>',
      },
      newAvatar: null,
    };
  },
  async mounted() {
    const [
      { items = [], total_count } = {
        items: [],
      },
      error,
    ] = await StoriesService.getMyStories();
    this.items = items;
    console.log(items);
    this.total_count = total_count;

    const dropzone = this.$refs.customdropzone;
    console.log({
      dropzone,
      user: this.userInfo,
    });
    if (this.userInfo) {
      dropzone.$el.style.backgroundImage = `url(${this.userInfo.avatar[0].url})`;
    }
  },
  methods: {
    async onChangePage(page) {
      this.page = page;
      if (!this.isStoriesTab) {
        const [
          { items = [], total_count } = {
            items: [],
          },
          error,
        ] = await NewsServices.getMyArticles({
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
        ] = await StoriesService.getMyStories({
          page: this.page,
          per_page: this.per_page,
        });
        this.items = items;
        this.total_count = total_count;
      }
    },

    editName() {
      this.isEditName = true;
    },
    hiddenEditName() {
      this.isEditName = false;
    },
    showModel() {
      const model = document.getElementById('model-add-story');
      model.style.visibility = 'visible';
    },
    hiddenModel() {
      const model = document.getElementById('model-add-story');
      model.style.visibility = 'hidden';
    },
    closeEdit() {
      this.isEditName = false;
      this.$refs.myVueDropzone.removeAllFiles();
    },
    async updateProfile() {
      this.user.username = this.newName;
      this.user.avatar = this.newAvatar;
      const [result, error] = await UserService.updateProfile({
        ...this.user,
      });
      if (result) {
        this.isSuccess = true;
        console.log(this.user);
        setTimeout(() => {
          this.isSuccess = false;
          this.hiddenEditName();
        }, 2000);
        this.userInfo.username = this.newName;
      }
    },
    // async openCity(cityName, idButton) {
    //   var i;
    //   var x = document.getElementsByClassName('news');
    //   for (i = 0; i < x.length; i++) {
    //     x[i].style.display = 'none';
    //   }
    //   document.getElementById(cityName).style.display = 'block';
    //   document.getElementById(idButton).classList.add('active-btn');
    //   if (idButton === 'myNews') {

    //   } else {
    //     this.isStoriesTab = false;
    //     const [
    //       { items = [], total_count } = {
    //         items: [],
    //       },
    //       error,
    //     ] = await NewsServices.getMyArticles({
    //       page: this.page,
    //       per_page: this.per_page,
    //     });
    //     this.items = items;
    //     this.total_count = total_count;
    //   }
    // },
    async changeStories() {
      this.pageOfItems = 1;
      this.page = 1;
      this.per_page = 10;
      this.total_count = 0;
      this.isStoriesTab = true;
      const [
        { items = [], total_count } = {
          items: [],
        },
        error,
      ] = await StoriesService.getMyStories({
        page: this.page,
        per_page: this.per_page,
      });
      this.items = items;
      this.total_count = total_count;
    },
    async changeArticles() {
      this.pageOfItems = 1;
      this.page = 1;
      this.per_page = 10;
      this.total_count = 0;
      this.isStoriesTab = false;
      const [
        { items = [], total_count } = {
          items: [],
        },
        error,
      ] = await NewsServices.getMyArticles({
        page: this.page,
        per_page: this.per_page,
      });
      this.items = items;
      this.total_count = total_count;
    },
    async editStories(id) {
      const [result, error] = await StoriesService.getById(id);
      console.log(result);
      this.storyProps = result;
      this.showModel();
    },
    uploadTemplate() {
      // return `<img :src="userInfo?.avatar[0]?.url" alt="" />`;
      return `<div class="dz-preview dz-file-preview">
      <div class="dz-image">
          <div data-dz-thumbnail-bg>
      </div>
  </div>`;
    },
    thumbnail: function (file, dataUrl) {
      var j, len, ref, thumbnailElement;
      if (file.previewElement) {
        file.previewElement.classList.remove('dz-file-preview');
        ref = file.previewElement.querySelectorAll('[data-dz-thumbnail-bg]');
        for (j = 0, len = ref.length; j < len; j++) {
          thumbnailElement = ref[j];
          thumbnailElement.alt = file.name;
          thumbnailElement.style.backgroundImage = 'url("' + dataUrl + '")';
          this.$refs.customdropzone.$el.style.backgroundImage = `none`;
        }
        return setTimeout(
          (function (_this) {
            return function () {
              return file.previewElement.classList.add('dz-image-preview');
            };
          })(this),
          1,
        );
      }
    },
    vfileAdded(file) {
      this.fileAdded = true;
      console.log('vfileAdded', {
        file,
      });
      // window.toastr.info('', 'Event : vdropzone-file-added')
    },
    vremovedFile(file) {
      this.fileAdded = false;
      console.log('vremovedFile', {
        file,
      });
      // window.toastr.info('', 'Event : vdropzone-removed-file')
      this.$refs.customdropzone.$el.style.backgroundImage = `url(${this.userInfo.avatar[0].url})`;
    },
    vsuccess(file, response) {
      this.success = true;
      console.log('vsuccess', {
        file,
        response,
      });
      file.uploadUrl = response.url;
      file._id = response._id;
      this.newAvatar = response._id;
      // window.toastr.success('', 'Event : vdropzone-success')
    },
  },
};
