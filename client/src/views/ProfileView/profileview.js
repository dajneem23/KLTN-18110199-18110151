import { mapState } from 'vuex';
import { store } from '../../store/vuex';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
export default {
  components: {
    vueDropzone: vue2Dropzone,
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
  },
  data() {
    return {
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
  mounted() {
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
    openCity(cityName, idButton) {
      var i;
      var x = document.getElementsByClassName('news');
      for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
      }
      document.getElementById(cityName).style.display = 'block';
      document.getElementById(idButton).classList.add('active-btn');
      if (idButton === 'myNews') {
        document.getElementById('myWish').classList.remove('active-btn');
      } else {
        document.getElementById('myNews').classList.remove('active-btn');
      }
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
