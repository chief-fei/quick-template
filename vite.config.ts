/*
 * @Author: 酋长(chief)
 * @Date: 2025-04-08 14:18:55
 * @LastEditTime: 2025-04-11 10:44:35
 * @LastEditors: 酋长(chief)
 * @Description:
 * @FilePath: /quick-template/vite.config.ts
 */
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/extension.ts'),
      formats: ['cjs'],
      fileName: 'extension',
    },
    rollupOptions: {
      external: [
        'vscode',
        'child_process',
        'util',
        'path',
        'fs',
        'glob',
        'crypto',
        'stream',
        'buffer',
        'http',
        'https',
        'url',
        'zlib',
        'node-plop',
      ],
      output: {
        format: 'cjs',
        exports: 'named',
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    sourcemap: true,
    outDir: 'out',
    minify: false, // 开发环境禁用压缩以加快构建速度
    target: 'node18',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@libs': resolve(__dirname, 'src/libs'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
  plugins: [],
});
