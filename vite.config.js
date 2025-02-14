import { createRequire } from 'node:module';
const require = createRequire( import.meta.url );
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' ) } )
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },


  server: {
    port: 3000, // 프론트엔드 포트 설정
    host: '0.0.0.0',
    open: true, // 브라우저 자동 열기
    strictPort: true,
    allowedHosts: ['.ngrok-free.app', 'localhost'],
  },
});
