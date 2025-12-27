import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': '/src' // 确保在 HBuilderX 中也能正确解析路径，虽然 HBuilderX 默认根目录就是 src
    }
  }
});