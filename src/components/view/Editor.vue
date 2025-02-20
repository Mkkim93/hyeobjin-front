<template>
  <Editor 
  api-key="dtslik7peegxfoe2nfelfju22zcwocbjvjvygbnhzlbzaqlg" 
  v-model="editorContent" 
  :init="editorConfig" />
</template>

<script>
import { ref, defineComponent, watch } from "vue";
import Editor from "@tinymce/tinymce-vue";
import axios from 'axios';

export default defineComponent({
  components: { Editor },
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    const editorContent = ref(props.modelValue || "");
    const editorInstance = ref(null);

    watch(
      () => props.modelValue,
      (newValue) => {
        if (typeof newValue === "string") {
          editorContent.value = newValue;
        }
      }
    );

    const updateContent = (content) => {
      editorContent.value = content;
      emit("update:modelValue", content);
    };

    const imageUploadHandler = (blobInfo) => {
      console.log("Initiate an image upload request");

      const formData = new FormData();
      formData.append("image", blobInfo.blob(), blobInfo.filename());

      return axios.post("http://localhost:8080/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          if (!response.data || !response.data.url) {
            console.error("The server did not return a valid URL");
            throw new Error("Image upload failed: URL not returned from server");
          }

          console.log("image upload success: ", response.data.url);
          return response.data.url;
        })
        .catch((error) => {
          console.error("image upload error: ", error);
          throw new Error("image upload faild: server error");
        });
    };

    const editorConfig = {
      height: 500,
      menubar: true,
      plugins: "advlist autolink lists link image charmap preview anchor",
      toolbar:
        "undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | help | image",

      images_upload_handler: imageUploadHandler,

      relative_urls: false,
      remove_script_host: false,
      convert_urls: true,

      extended_valid_elements: "img[src|alt|title|width|height|style]",

      setup: (editor) => {
        editorInstance.value = editor;

        editor.on("change", () => {
          const content = editor.getContent();
          updateContent(content);
        });

        editor.on("input", () => {
          const content = editor.getContent();
          updateContent(content);
        });
      },
    };

    return { editorContent, editorConfig };
  },
});
</script>
