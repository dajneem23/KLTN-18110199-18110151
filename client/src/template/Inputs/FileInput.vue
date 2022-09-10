<template>
	<div class="custom-file">
		<input
			type="file"
			class="custom-file-input"
			id="customFileLang"
			lang="jp"
			v-bind="$attrs"
			v-on="listeners"
			placeholder="VCL"
			:accept="acceptFormat"
		/>
		<div class="custom-file-label" for="customFileLang">
			{{ label }}
		</div>
	</div>
</template>
<script>
export default {
	name: 'file-input',
	inheritAttrs: false,
	props: {
		initialLabel: {
			type: String,
			default: 'ファイルを選択',
		},
		acceptFormat: {
			type: String,
			default: '*',
		},
	},
	data() {
		return {
			files: [],
		};
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				change: this.fileChange,
			};
		},
		label() {
			let fileNames = [];
			for (let file of this.files) {
				fileNames.push(file.name);
			}
			return fileNames.length ? fileNames.join(', ') : this.initialLabel;
		},
	},
	methods: {
		fileChange(evt) {
			this.files = evt.target.files;
			this.$emit('change', this.files);
		},
	},
};
</script>
<style>
.custom-file-label::after {
	content: '検索';
	cursor: pointer !important;
}
</style>
