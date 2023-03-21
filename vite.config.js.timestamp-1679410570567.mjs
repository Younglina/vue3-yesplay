// vite.config.js
import { defineConfig } from "file:///E:/myproject/vue3-yesplay/node_modules/.pnpm/vite@4.1.4_sass@1.58.3/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/myproject/vue3-yesplay/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.1.4+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { join, resolve } from "path";
import Components from "file:///E:/myproject/vue3-yesplay/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/vite.mjs";
import { createSvgIconsPlugin } from "file:///E:/myproject/vue3-yesplay/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.1.4/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\myproject\\vue3-yesplay";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({}),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(__vite_injected_original_dirname, "src/assets/svg")],
      // 指定symbolId格式
      symbolId: "icon-[name]"
    })
  ],
  resolve: {
    alias: {
      "@": join(__vite_injected_original_dirname, "/src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/mixin.scss";`
      }
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "https://netease-cloud-music-api-pi-virid.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      "/mock": {
        target: "https://www.fastmock.site/mock/6b16c722604e6f9b79e16f7ec3a768d4/vue3vite",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxteXByb2plY3RcXFxcdnVlMy15ZXNwbGF5XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxteXByb2plY3RcXFxcdnVlMy15ZXNwbGF5XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9teXByb2plY3QvdnVlMy15ZXNwbGF5L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgam9pbiwgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG4vLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjV2dWUzXHU3Njg0YXBpXHVGRjFCXHU0RTBEXHU3NTI4aW1wb3J0XHU3RUM0XHU0RUY2XHU3NkY0XHU2M0E1XHU0RjdGXHU3NTI4XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuLy8gc3ZnXHU3RUM0XHU0RUY2XG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIENvbXBvbmVudHMoe30pLFxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcbiAgICAgICBpY29uRGlyczogW3Jlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cy9zdmcnKV0sXG4gICAgICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcbiAgICAgICBzeW1ib2xJZDogJ2ljb24tW25hbWVdJyxcbiAgICB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogam9pbihfX2Rpcm5hbWUsICcvc3JjJylcbiAgICB9XG4gIH0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9taXhpbi5zY3NzXCI7YCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwczovL25ldGVhc2UtY2xvdWQtbXVzaWMtYXBpLXBpLXZpcmlkLnZlcmNlbC5hcHAnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXG4gICAgICB9LFxuICAgICAgJy9tb2NrJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwczovL3d3dy5mYXN0bW9jay5zaXRlL21vY2svNmIxNmM3MjI2MDRlNmY5Yjc5ZTE2ZjdlYzNhNzY4ZDQvdnVlM3ZpdGUnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9tb2NrLywgJycpLFxuICAgICAgfVxuICAgIH1cbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1RLFNBQVMsb0JBQW9CO0FBQ2hTLE9BQU8sU0FBUztBQUNoQixTQUFTLE1BQU0sZUFBZTtBQUU5QixPQUFPLGdCQUFnQjtBQUV2QixTQUFTLDRCQUE0QjtBQU5yQyxJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixXQUFXLENBQUMsQ0FBQztBQUFBLElBQ2IscUJBQXFCO0FBQUE7QUFBQSxNQUVsQixVQUFVLENBQUMsUUFBUSxrQ0FBVyxnQkFBZ0IsQ0FBQztBQUFBO0FBQUEsTUFFL0MsVUFBVTtBQUFBLElBQ2IsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxrQ0FBVyxNQUFNO0FBQUEsSUFDN0I7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDOUM7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxXQUFXLEVBQUU7QUFBQSxNQUMvQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
