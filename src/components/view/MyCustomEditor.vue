<template>
    <div class="main-container">
      <div class="editor-container">
        <ckeditor v-model="content" :editor="editor" :config="config" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch, computed } from "vue";
  import * as CKEditor from '@ckeditor/ckeditor5-vue';
  import ClassicEditor from "@/utils/ckeditor.js"; // ✅ 무료 버전 CKEditor 사용
  
  export default {
    name: "MyCustomEditor",
    components: {
      ckeditor: CKEditor.component, // ✅ Vue3에서는 `.component` 사용
    },
    props: {
      modelValue: String,
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
      const content = ref(props.modelValue);
  
      const updateContent = (newValue) => {
        content.value = newValue;
        emit("update:modelValue", newValue);
      };
  
      watch(
        () => props.modelValue,
        (newValue) => {
          content.value = newValue;
        }
      );
  
      return {
        content,
        editor: ClassicEditor, // ✅ 무료 CKEditor 사용
        config: computed(() => ({
          toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "undo", "redo"],
        })),
        updateContent,
      };
    },
  };
  </script>
  
  <style scoped>
  .main-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    overflow: hidden;
  }
  .editor-container {
    width: 100%;
    max-width: 100%;
  }
  .ck-editor__editable {
    width: 100% !important;
    max-width: 100%;
    min-height: 300px;
    max-height: 600px;
  }
  </style>
  