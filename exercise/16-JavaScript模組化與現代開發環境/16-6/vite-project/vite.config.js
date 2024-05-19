/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: './', // 確保相對路徑正確
  root: 'src',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'), // 需要製作新的頁面的時候就新增頁面的name，然後指向 src/[name].html，build 的時候就會產生相對應的檔案了
        about: resolve(__dirname, 'src/about.html'), // about.html is the entry point
      },
      output: {
        dir: resolve(__dirname, 'dist'), // __dirname  :  當前模組的絕對路徑，是nodejs的環境變數
      },
    },
  },
  // 其他設定...
  plugins: [eslint()],
});
