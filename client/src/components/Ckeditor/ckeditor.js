import { onMounted, ref } from 'vue';
import DropzoneFileUpload from '../../template/Inputs/DropzoneFileUpload';
import BaseInput from '../../template/Inputs/BaseInput.vue';
import DropZone from './dropzone.vue';
import Toastify from '../../components/ToastifyCustom/index.vue';
import { NewsServices, UploadServices, CategoriesServices } from '@/services';

export default {
  name: 'CkEditor',
  components: {
    DropzoneFileUpload,
    BaseInput,
    DropZone,
    Toastify,
  },
  props: {
    newsProps: Object,
    isEdit: Boolean,
  },
  data() {
    return {
      isSuccess: false,
      isWarnning: false,
      value: [],
      editor: null,
      editorData: '',
      listCategories: [],
      categoriesOfArticles: [],
      initImage: null,
      news: {
        name: '',
        content: '',
        description: '',
        images: [],
        categories: [],
      },
      isShow: false,
    };
  },
  watch: {
    editor() {
      if (this.editor) {
        this.editor?.model.document.on('change:data', () => this.handleChange.call(this, { editor: this.editor }));
      }
    },
    newsProps: {
      handler(val) {
        if (this.isEdit) {
          this.news.name = this.newsProps.name;
          this.news.content = this.newsProps.content;
          this.editorData = this.newsProps.content;
          this.news.description = this.newsProps.description;
          this.news.images = this.newsProps.images;
          this.initImage = this.newsProps.images[0] ? this.newsProps.images[0] : null;
          this.news.categories = this.newsProps.categories;
          this.categoriesOfArticles = this.newsProps.categories;
          // this.editorData = this.newsProps.content;
        }
      },
      deep: true,
    },
    editorData(current, pre) {
      if (this.editor && !pre && current) this.editor.setData(this.editorData);
    },
  },
  async created() {
    const [
      { items = [], total_count } = {
        items: [],
      },
      error,
    ] = await CategoriesServices.get();
    this.listCategories = items;
  },
  mounted() {},
  methods: {
    async submitText() {
      this.news.content = this.editorData;
      this.news.categories = [...this.categoriesOfArticles];
      const result = await NewsServices.create({
        ...this.news,
      });
      if (result) {
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
      }
      console.log(this.news);
      // console.log(result);
      this.news.name = '';
      this.news.content = '';
      this.news.description = '';
      this.news.images = [];
      this.news.categories = [];
      this.categoriesOfArticles = [];
      this.editorData = '';
    },
    editNews() {
      this.news.content = this.editorData;
      this.news.categories = [...this.categoriesOfArticles];
      console.log(this.news);
    },
    showCombobox() {
      this.isShow = !this.isShow;
    },
    changeFunc() {
      var selectBox = document.getElementById('selectBox');
      var selectedValue = selectBox.options[selectBox.selectedIndex].value;
      alert(selectedValue);
    },
    addCategory(item) {
      if (!this.categoriesOfArticles.includes(item)) {
        this.categoriesOfArticles.push(item);
      }
      console.log(this.categoriesOfArticles);
      // console.log(item);
    },
    removeCategory(id) {
      this.categoriesOfArticles = this.categoriesOfArticles.filter(function (item) {
        return item.id !== id;
      });
      console.log(this.categoriesOfArticles);
      console.log(id);
    },
    initEditor({
      // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
      toolbar = {
        items: [
          'exportPDF',
          'exportWord',
          '|',
          'findAndReplace',
          'selectAll',
          '|',
          'heading',
          '|',
          'bold',
          'italic',
          'strikethrough',
          'underline',
          'code',
          'subscript',
          'superscript',
          'removeFormat',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          '|',
          'outdent',
          'indent',
          '|',
          'undo',
          'redo',
          '-',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          'highlight',
          '|',
          'alignment',
          '|',
          'link',
          'insertImage',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'codeBlock',
          'htmlEmbed',
          '|',
          'specialCharacters',
          'horizontalLine',
          'pageBreak',
          '|',
          'textPartLanguage',
          '|',
          'sourceEditing',
        ],
        shouldNotGroupWhenFull: true,
      },
      // Changing the language of the interface requires loading the language file using the <script> tag.
      // language: 'es',
      list = {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },
      // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
      heading = {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
          { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
          { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
        ],
      },
      // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
      placeholder = 'Nội dung bài viết......',
      // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
      fontFamily = {
        options: [
          'default',
          'Arial, Helvetica, sans-serif',
          'Courier New, Courier, monospace',
          'Georgia, serif',
          'Lucida Sans Unicode, Lucida Grande, sans-serif',
          'Tahoma, Geneva, sans-serif',
          'Times New Roman, Times, serif',
          'Trebuchet MS, Helvetica, sans-serif',
          'Verdana, Geneva, sans-serif',
        ],
        supportAllValues: true,
      },
      // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
      fontSize = {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true,
      },
      // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
      // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
      htmlSupport = {
        allow: [
          {
            name: /.*/,
            attributes: true,
            classes: true,
            styles: true,
          },
        ],
      },
      // Be careful with enabling previews
      // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
      htmlEmbed = {
        showPreviews: true,
      },
      // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
      link = {
        decorators: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file',
            },
          },
        },
      },
      // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
      mention = {
        feeds: [
          {
            marker: '@',
            feed: [
              '@apple',
              '@bears',
              '@brownie',
              '@cake',
              '@cake',
              '@candy',
              '@canes',
              '@chocolate',
              '@cookie',
              '@cotton',
              '@cream',
              '@cupcake',
              '@danish',
              '@donut',
              '@dragée',
              '@fruitcake',
              '@gingerbread',
              '@gummi',
              '@ice',
              '@jelly-o',
              '@liquorice',
              '@macaroon',
              '@marzipan',
              '@oat',
              '@pie',
              '@plum',
              '@pudding',
              '@sesame',
              '@snaps',
              '@soufflé',
              '@sugar',
              '@sweet',
              '@topping',
              '@wafer',
            ],
            minimumCharacters: 1,
          },
        ],
      },
      // The "super-build" contains more premium features that require additional configuration, disable them below.
      // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
      removePlugins = [
        // These two are commercial, but you can try them out without registering to a trial.
        // 'ExportPdf',
        // 'ExportWord',
        'CKBox',
        'CKFinder',
        'EasyImage',
        // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
        // Storing images as Base64 is usually a very bad idea.
        // Replace it on production website with other solutions:
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
        'Base64UploadAdapter',
        'RealTimeCollaborativeComments',
        'RealTimeCollaborativeTrackChanges',
        'RealTimeCollaborativeRevisionHistory',
        'PresenceList',
        'Comments',
        'TrackChanges',
        'TrackChangesData',
        'RevisionHistory',
        'Pagination',
        'WProofreader',
        // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
        // from a local file system (file://) - load this site via HTTP server if you enable MathType
        'MathType',
      ],

      extraPlugins = [uploadPlugin],
      data = this.editorData,
    } = {}) {
      CKEDITOR.ClassicEditor.create(document.getElementById('editor'), {
        toolbar,
        list,
        heading,
        placeholder,
        fontFamily,
        fontSize,
        htmlSupport,
        htmlEmbed,
        link,
        mention,
        removePlugins,
        extraPlugins,
        data,
      })
        .then((_editor) => {
          this.editor = _editor;
          console.log('Editor was initialized', this.editorData, this.editor);
          // this.editor.setData(this.editorData || '');
        })
        .catch((err) => {
          console.error('%c CKEditor failed to load. ', 'color: red; font-weight: bold;', { err });
        });
    },
    handleChange({ editor }) {
      this.editorData = editor.getData();
      console.log({ data: this.editorData });
      console.log('%c Editor Change', 'color:green', { editor });
    },

    handleReady(editor) {
      console.log('%c Editor is ready to use!', 'color:green', { editor });
    },

    handleBlur(editor) {
      console.log('Editor Blur.', { editor });
    },

    handleFocus(editor) {
      console.log('Editor Focus.', { editor });
    },

    handleError(editor) {
      console.log('%c Editor Error!', 'color:red', { editor });
    },
    onDropZoneUploadSuccess(file) {
      console.log('onDropZoneUploadSuccess', file);
      this.news.images = [file._id];
      // this.news.images.push(file._id);
      // const reader = new FileReader();
      // reader.readAsBinaryString(file);

      // reader.onload = function (event) {
      //   // handle reader success

      //   resolve();
      // };
      // files.forEach((file) => {
      //   const data = new FormData();

      //   data.append('file', file);
      //   UploadServices.upload(data)
      //     .then((res) => {
      //       editor.model.change((writer) => {
      //         writer.setSelection(editor.model.document.getRoot(), 'end');
      //       });
      //       console.log('%c Upload Success', 'color:green', res);
      //       const [data] = res;
      //     })
      //     .catch((err) => {
      //       console.log('%c Upload Error', 'color:red', err);
      //     });
      // });
    },
  },
  mounted() {
    this.initEditor();
  },
};

function uploadAdapter(loader, editor) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        console.log('upload');
        loader.file.then((file) => {
          const data = new FormData();

          data.append('file', file);
          UploadServices.upload(data)
            .then((res) => {
              editor.model.change((writer) => {
                writer.setSelection(editor.model.document.getRoot(), 'end');
              });
              console.log('%c Upload Success', 'color:green', res);
              const [data] = res;
              resolve({
                default: data.url,
              });
            })
            .catch((err) => {
              console.log('%c Upload Error', 'color:red', err);
              reject(err);
            });
        });
      });
    },
  };
}
function uploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return uploadAdapter(loader, editor);
  };
}
