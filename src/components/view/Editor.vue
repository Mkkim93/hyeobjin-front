<template>
  <Editor api-key="dtslik7peegxfoe2nfelfju22zcwocbjvjvygbnhzlbzaqlg" v-model="editorContent" :init="editorConfig" />
</template>

<script>
import { ref, defineComponent, watch } from "vue";
import Editor from "@tinymce/tinymce-vue";
import axios from 'axios';

export default defineComponent({
  components: { Editor },
  props: {
    modelValue: String, // 부모에서 넘어오는 데이터
  },
  setup(props, { emit }) {
    const editorContent = ref(props.modelValue || ""); // 반응형 데이터 설정
    const editorInstance = ref(null); // ✅ TinyMCE Editor 인스턴스 저장

    // 부모에서 넘어온 값이 변경될 경우 반영
    watch(
      () => props.modelValue,
      (newValue) => {
        if (typeof newValue === "string") {
          editorContent.value = newValue;
        }
      }
    );

    // TinyMCE에서 `String` 값만 부모로 전달
    const updateContent = (content) => {
      console.log("📌 TinyMCE 변경 감지:", content); // ✅ 콘솔 출력 확인
      editorContent.value = content;
      emit("update:modelValue", content); // 부모 컴포넌트로 데이터 전달
    };

    // ✅ 이미지 업로드 핸들러 (S3 업로드 API 호출)
    const imageUploadHandler = (blobInfo) => {
      console.log("📌 이미지 업로드 요청 시작");

      const formData = new FormData();
      formData.append("image", blobInfo.blob(), blobInfo.filename());

      return axios.post("http://localhost:8080/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          console.log("✅ 서버 응답:", response);

          if (!response.data || !response.data.url) {
            console.error("❌ 서버에서 유효한 URL을 반환하지 않았습니다.");
            throw new Error("이미지 업로드 실패: 서버에서 URL이 반환되지 않음");
          }

          console.log("✅ 이미지 업로드 성공:", response.data.url);
          return response.data.url; // ✅ 반드시 Promise에서 URL을 반환해야 TinyMCE가 정상 처리
        })
        .catch((error) => {
          console.error("❌ 이미지 업로드 중 오류 발생:", error);
          throw new Error("이미지 업로드 실패: 서버 오류 발생");
        });
    };



    // ✅ TinyMCE 설정에서 `setup`을 사용하여 직접 이벤트 핸들링
    const editorConfig = {
      height: 500,
      menubar: true,
      plugins: "advlist autolink lists link image charmap preview anchor",
      toolbar:
        "undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | help | image",

      images_upload_handler: imageUploadHandler, // ✅ Promise 방식 적용

      relative_urls: false,
      remove_script_host: false,
      convert_urls: true,

      extended_valid_elements: "img[src|alt|title|width|height|style]",

      setup: (editor) => {
        editorInstance.value = editor; // ✅ 에디터 인스턴스 저장

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
