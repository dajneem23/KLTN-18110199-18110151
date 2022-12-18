import axios from "axios";
module.exports = {
	toolbar: {
		items: [
			"exportPDF",
			"exportWord",
			"|",
			"findAndReplace",
			"selectAll",
			"|",
			"heading",
			"|",
			"bold",
			"italic",
			"strikethrough",
			"underline",
			"code",
			"subscript",
			"superscript",
			"removeFormat",
			"|",
			"bulletedList",
			"numberedList",
			"todoList",
			"|",
			"outdent",
			"indent",
			"|",
			"undo",
			"redo",
			"-",
			"fontSize",
			"fontFamily",
			"fontColor",
			"fontBackgroundColor",
			"highlight",
			"|",
			"alignment",
			"|",
			"link",
			"insertImage",
			"blockQuote",
			"insertTable",
			"mediaEmbed",
			"codeBlock",
			"htmlEmbed",
			"|",
			"specialCharacters",
			"horizontalLine",
			"pageBreak",
			"|",
			"textPartLanguage",
			"|",
			"sourceEditing",
		],
		shouldNotGroupWhenFull: true,
	},
	image: {
		styles: ["alignLeft", "alignCenter", "alignRight"],
		resizeOptions: [
			{
				name: "imageResize:original",
				value: null,
				icon: "original",
			},
			{
				name: "imageResize:50",
				value: "50",
				icon: "medium",
			},
			{
				name: "imageResize:75",
				value: "75",
				icon: "large",
			},
		],
		toolbar: [
			"imageStyle:alignLeft",
			"imageStyle:alignCenter",
			"imageStyle:alignRight",
			"|",
			"imageTextAlternative",
			"|",
			"imageResize:50",
			"imageResize:75",
			"imageResize:original",
			"|",
			"linkImage",
		],
	},
	table: {
		contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
	},
	heading: {
		options: [
			{ model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
			{ model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
			{ model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
			{ model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
			{ model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
		],
	},
	list: {
		properties: {
			styles: true,
			startIndex: true,
			reversed: true,
		},
	},
	fontFamily: {
		options: [
			"default",
			"Arial, Helvetica, sans-serif",
			"Courier New, Courier, monospace",
			"Georgia, serif",
			"Lucida Sans Unicode, Lucida Grande, sans-serif",
			"Tahoma, Geneva, sans-serif",
			"Times New Roman, Times, serif",
			"Trebuchet MS, Helvetica, sans-serif",
			"Verdana, Geneva, sans-serif",
		],
		supportAllValues: true,
	},
	fontSize: {
		options: [10, 12, 14, "default", 18, 20, 22],
		supportAllValues: true,
	},
	mention: {
		feeds: [
			{
				marker: "@",
				feed: [
					"@apple",
					"@bears",
					"@brownie",
					"@cake",
					"@cake",
					"@candy",
					"@canes",
					"@chocolate",
					"@cookie",
					"@cotton",
					"@cream",
					"@cupcake",
					"@danish",
					"@donut",
					"@dragée",
					"@fruitcake",
					"@gingerbread",
					"@gummi",
					"@ice",
					"@jelly-o",
					"@liquorice",
					"@macaroon",
					"@marzipan",
					"@oat",
					"@pie",
					"@plum",
					"@pudding",
					"@sesame",
					"@snaps",
					"@soufflé",
					"@sugar",
					"@sweet",
					"@topping",
					"@wafer",
				],
				minimumCharacters: 1,
			},
		],
	},
	link: {
		decorators: {
			addTargetToExternalLinks: true,
			defaultProtocol: "https://",
			toggleDownloadable: {
				mode: "manual",
				label: "Downloadable",
				attributes: {
					download: "file",
				},
			},
		},
	},
	htmlEmbed: {
		showPreviews: true,
	},
	sanitizeHtml: (inputHtml) => {
		const outputHtml = sanitizeHtml(inputHtml);
		return {
			html: outputHtml,
			hasChanged: true,
		};
	},
	removePlugins: [
		// These two are commercial, but you can try them out without registering to a trial.
		// 'ExportPdf',
		// 'ExportWord',
		"CKBox",
		"CKFinder",
		"EasyImage",
		// This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
		// https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
		// Storing images as Base64 is usually a very bad idea.
		// Replace it on production website with other solutions:
		// https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
		"Base64UploadAdapter",
		"RealTimeCollaborativeComments",
		"RealTimeCollaborativeTrackChanges",
		"RealTimeCollaborativeRevisionHistory",
		"PresenceList",
		"Comments",
		"TrackChanges",
		"TrackChangesData",
		"RevisionHistory",
		"Pagination",
		"WProofreader",
		// Careful, with the Mathtype plugin CKEditor will not load when loading this sample
		// from a local file system (file://) - load this site via HTTP server if you enable MathType
		"MathType",
	],
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: "en",
	extraPlugins: [uploadPlugin],
};
function uploadAdapter(loader, editor) {
	return {
		upload: () => {
			return new Promise((resolve, reject) => {
				console.log("upload");
				loader.file.then((file) => {
					const data = new FormData();

					data.append("file", file);
					axios
						.post(process.env.BACKEND_URL + "/api/v1/upload")
						.then((res) => {
							editor.model.change((writer) => {
								writer.setSelection(editor.model.document.getRoot(), "end");
							});
							console.log("%c Upload Success", "color:green", res);
							const [data] = res;
							resolve({
								default: data.url,
							});
						})
						.catch((err) => {
							console.log("%c Upload Error", "color:red", err);
							reject(err);
						});
				});
			});
		},
	};
}
function uploadPlugin(editor) {
	editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
		return uploadAdapter(loader, editor);
	};
}
