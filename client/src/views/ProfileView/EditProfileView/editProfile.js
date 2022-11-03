import ImageUploader from '../../../components/UploadImage/index.vue';
export default {
  components: {
    ImageUploader,
  },
  data() {
    return {
      imageFileBanner: null,
      imageFileAvt: null,
      input: null,
      isImageUploading: false,
    };
  },
  methods: {
    showImageBannerPreview(event) {
      this.input = event.target;
      if (this.input.files && this.input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imageFileBanner = e.target.result;
        };
        reader.readAsDataURL(this.input.files[0]);
      }
    },
    showImageAvtPreview(event) {
      this.input = event.target;
      if (this.input.files && this.input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imageFileAvt = e.target.result;
        };
        reader.readAsDataURL(this.input.files[0]);
      }
    },
    uploadImage() {
      this.isImageUploading = true;
      setTimeout(() => {
        console.log(this.imageFile);
        this.isImageUploading = false;
        this.clearImage();
        alert('Image uploaded sucessfully!');
      }, 3000);
    },
    clearImageBanner() {
      this.imageFileBanner = null;
      this.input = null;
    },
    clearImageAvt() {
      this.imageFileAvt = null;
      this.input = null;
    },
    showModel() {
      const model = document.getElementById('model-edit-email');
      model.style.visibility = 'visible';
    },
    hiddenModel() {
      const model = document.getElementById('model-edit-email');
      model.style.visibility = 'hidden';
    },
  },
};
