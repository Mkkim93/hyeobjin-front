<template>
	<div class="main-container">
		<div class="editor-container editor-container_classic-editor editor-container_include-style" ref="editorContainerElement">
			<div class="editor-container__editor">
				<div ref="editorElement">
					<ckeditor 
					v-if="editor && config" 
					:modelValue="content" 
					:editor="editor" 
					:config="config" 
					@update:modelValue="updateContent"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref, onMounted, watch, defineProps, defineEmits, } from 'vue';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';

// Props와 Emit 정의
const props = defineProps({
	
  modelValue: String // 부모에서 받은 v-model 값
});
const emit = defineEmits(['update:modelValue']);

// CKEditor의 내부 데이터 상태 (초기값은 부모 값)
const content = ref(props.modelValue);

// CKEditor의 값이 변경될 때 부모 컴포넌트로 업데이트
const updateContent = (newValue) => {
  content.value = newValue;
  emit('update:modelValue', newValue); // 부모로 데이터 전파
};

// 부모 값이 변경될 때 내부 상태도 동기화 (반응형 유지)
watch(() => props.modelValue, (newValue) => {
  content.value = newValue;
});

import {
	ClassicEditor,
	Alignment,
	AutoImage,
	AutoLink,
	Autosave,
	BlockQuote,
	Bold,
	CloudServices,
	CKFinderUploadAdapter,
	Essentials,
	GeneralHtmlSupport,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	Paragraph,
	// SimpleUploadAdapter,
	Style
} from 'ckeditor5';

import translations from 'ckeditor5/translations/ko.js';

import 'ckeditor5/ckeditor5.css';

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDAxODIzOTksImp0aSI6ImVhMzhhODRjLTk5MjYtNDMwNi05N2E2LWQwYjcxMDFkZjQ1NSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImVmNTY1ZWVkIn0.BMXzNXwp6dLl_zWABd-Z3FEmuZioDJrKiU00l4LiXBN-uv8dFZzN0Hrzyq_vBQeEZmwojfOg17Cc0GZEoLkhug';

const isLayoutReady = ref(false);

const editor = ClassicEditor;

const config = computed(() => {
	if (!isLayoutReady.value) {
		return null;
	}

	return {
		toolbar: {
			items: ['style', '|', 'bold', 'italic', '|', 'link', 'insertImage', 'blockQuote', '|', 'alignment', '|', 'outdent', 'indent'],
			shouldNotGroupWhenFull: false
		},
		plugins: [
			Alignment,
			AutoImage,
			AutoLink,
			Autosave,
			BlockQuote,
			Bold,
			CloudServices,
			CKFinderUploadAdapter,
			Essentials,
			GeneralHtmlSupport,
			ImageBlock,
			ImageCaption,
			ImageInline,
			ImageInsert,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			Indent,
			IndentBlock,
			Italic,
			Link,
			Paragraph,
			// SimpleUploadAdapter,
			Style
		],
		htmlSupport: {
			allow: [
				{
					name: /^.*$/,
					styles: true,
					attributes: true,
					classes: true
				}
			]
		},
		image: {
			toolbar: [
				'toggleImageCaption',
				'imageTextAlternative',
				'|',
				'imageStyle:inline',
				'imageStyle:wrapText',
				'imageStyle:breakText',
				'|',
				'resizeImage'
			]
		},
		initialData:
			'<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou\'ve successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor\'s\n\t\tconfiguration to match your application\'s style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don\'t hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n\t<li>📝 <a href="https://portal.ckeditor.com/checkout?plan=free">Trial sign up</a>,</li>\n\t<li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n\t<li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n\t<li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n\t<li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser\'s\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n',
		language: 'ko',
		ckfinder: {
			uploadUrl: 'http://localhost:8080/image/upload',
			withCredentials: true,
			
		},
		licenseKey: LICENSE_KEY,
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
			decorators: {
				toggleDownloadable: {
					mode: 'manual',
					label: 'Downloadable',
					attributes: {
						download: 'file'
					}
				}
			}
		},
		placeholder: 'Type or paste your content here!',
		style: {
			definitions: [
				{
					name: 'Article category',
					element: 'h3',
					classes: ['category']
				},
				{
					name: 'Title',
					element: 'h2',
					classes: ['document-title']
				},
				{
					name: 'Subtitle',
					element: 'h3',
					classes: ['document-subtitle']
				},
				{
					name: 'Info box',
					element: 'p',
					classes: ['info-box']
				},
				{
					name: 'Side quote',
					element: 'blockquote',
					classes: ['side-quote']
				},
				{
					name: 'Marker',
					element: 'span',
					classes: ['marker']
				},
				{
					name: 'Spoiler',
					element: 'span',
					classes: ['spoiler']
				},
				{
					name: 'Code (dark)',
					element: 'pre',
					classes: ['fancy-code', 'fancy-code-dark']
				},
				{
					name: 'Code (bright)',
					element: 'pre',
					classes: ['fancy-code', 'fancy-code-bright']
				}
			]
		},
		translations: [translations]
	};
});



function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => uploadAdapter(loader);
}

onMounted(() => {
	console.log("CKEditor가 마운트되었습니다!");
	isLayoutReady.value = true;
});
</script>
