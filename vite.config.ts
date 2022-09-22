import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8881,//端口号
    proxy: {
      '/api': {
        target: "https://www.thenewstep.cn/v1/eleme",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 把路径变成空字符
      }
    }
  }
})