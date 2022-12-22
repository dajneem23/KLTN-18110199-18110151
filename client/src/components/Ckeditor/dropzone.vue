<template>
  <div>
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      @vdropzone-file-added="vfileAdded"
      @vdropzone-success="vsuccess"
    >
    </vue-dropzone>
  </div>
</template>

<script>
// import vueDropzone from '../../../src/';
// import vueDropzone from '../../../dist/vue2Dropzone.js';
// require('../../../dist/vue2Dropzone.min.css')
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
export default {
  name: 'app',
  components: {
    vueDropzone: vue2Dropzone,
  },
  data: function () {
    return {
      dropzoneOptions: {
        url: `${process.env.VUE_APP_BASE_URL}/${process.env.VUE_APP_BASE_API_PREFIX}/${process.env.VUE_APP_BASE_API_VERSION}/upload/`,
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        withCredentials: true,
        addRemoveLinks: true,
        acceptedFiles: 'image/*',
        multiple: false,
        dictRemoveFile:
          '<i class="fa-solid fa-trash " data-dz-remove style="color:red;cursor:pointer;font-size: 1.5rem;"> </i>',
      },
    };
  },
  props: {
    file: {
      type: Object,
      default: null,
    },
  },
  watch: {
    file: function (newVal, oldVal) {
      if (newVal) {
        console.log('manuallyAddFile', { url: newVal });
        const file = { size: newVal.size || 100, name: newVal.name };
        this.$refs.myVueDropzone.manuallyAddFile(file, newVal.url);
      }
    },
  },
  mounted() {},
  methods: {
    vfileAdded(file) {
      this.fileAdded = true;
      console.log('vfileAdded', {
        file,
      });
      // window.toastr.info('', 'Event : vdropzone-file-added')
    },
    vsuccess(file, response) {
      this.success = true;
      console.log('vsuccess', {
        file,
        response,
      });
      file.uploadUrl = response.url;
      file._id = response._id;
      this.$emit('upload-success', file);
      // window.toastr.success('', 'Event : vdropzone-success')
    },
  },
};
</script>

<style scoped lang="scss">
.active {
  color: #78cb5b;
}

.inactive {
  color: #fff000;
}

.fa.fa-circle:before {
  content: '\25C9';
  /*color: #000;*/
}

th {
  text-align: center;
}

td:nth-child(1) {
  text-align: center;
}

td:nth-child(3) {
  text-align: center;
}

td:nth-child(2) {
  padding-left: 40px;
}

.event-active {
  font-weight: bold;
  color: #78cb5b;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}
</style>
<style scoped>
.vue-dropzone > .dz-preview .dz-remove {
  border: none;
}
.vue-dropzone > .dz-preview .dz-details {
  background-color: rgb(76 175 255 / 80%);
}
.vue-dropzone > .dz-preview .dz-image {
  border-radius: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.vue-dropzone > .dz-preview .dz-image {
  width: 100%;
  /* background-color: aqua; */
  padding: 0px;
  display: flex;
  justify-content: center;
}
.vue-dropzone > .dz-preview .dz-image img {
  width: 400px;
  height: 200px;
  background-size: contain;
}
.vue-dropzone {
  padding: 0px;
  border-radius: 5px;
}
.dropzone .dz-message {
  margin: 0px;
}
</style>
