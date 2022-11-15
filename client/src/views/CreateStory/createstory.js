import DropzoneFileUpload from '../../template/Inputs/DropzoneFileUpload';
export default {
  name: 'CkEditor',
  components: {
    DropzoneFileUpload,
  },
  props: {
    hiddenModel:{
      type:Function
  },
  },
  data() {
    return {
      story: {
        content: '',
        images: [],
      },
    };
  },
  methods: {
    hiddenmodel() {
      if(this.hiddenModel){
        this.hiddenModel();
       }
    }
  },
};
