<template>
  <div>
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      @vdropzone-file-added="vfileAdded"
      @vdropzone-success="vsuccess"
    ></vue-dropzone>
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
        url: 'https://zinc-union-365709-63see6q63q-uc.a.run.app/api/v1/upload/',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        withCredentials: true,
        addRemoveLinks: true,
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
