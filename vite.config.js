import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { join, resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({}),
    createSvgIconsPlugin({
       // 指定需要缓存的图标文件夹
       iconDirs: [resolve(__dirname, 'src/assets/svg')],
       // 指定symbolId格式
       symbolId: 'icon-[name]',
    })
  ],
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/mixin.scss";`,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://netease-cloud-music-api-pi-virid.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/mock': {
        target: 'https://www.fastmock.site/mock/6b16c722604e6f9b79e16f7ec3a768d4/vue3vite',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, ''),
      }
    }
  },
})
