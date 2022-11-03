import DropzoneFileUpload from '../../template/Inputs/DropzoneFileUpload';
export default {
  name: 'CkEditor',
  components: {
    DropzoneFileUpload,
  },
  data() {
    return {
      story: {
        content: '',
        images: [],
      },
    };
  },
};
