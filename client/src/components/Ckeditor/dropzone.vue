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

<style scoped>
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
<style>
.vue-dropzone > .dz-preview .dz-remove {
  border: none;
}
.vue-dropzone > .dz-preview .dz-details {
  background-color: rgb(76 175 255 / 80%);
}
</style>
