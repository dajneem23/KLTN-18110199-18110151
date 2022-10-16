import { onMounted, ref } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'CkEditor',
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Hellor.</p>',
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  methods: {
    submitText(data) {
      console.log(data);
    },
  },
};
