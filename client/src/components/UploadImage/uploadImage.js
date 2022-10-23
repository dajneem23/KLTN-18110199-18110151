export default {
  name: 'ImageUploader',
  data() {
    return {
      imageFile: null,
      input: null,
      isImageUploading: false,
    };
  },
  methods: {
    showImagePreview(event) {
      this.input = event.target;
      if (this.input.files && this.input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imageFile = e.target.result;
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
    clearImage() {
      this.imageFile = null;
      this.input = null;
    },
  },
};
