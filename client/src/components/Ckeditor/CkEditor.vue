<template>
  <div>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    <button @click="submitText(editorData)">submit</button>
  </div>
</template>
<script src="./ckeditor.js"></script>
<style lang="scss" src="./ckeditor.scss" scoped></style>
