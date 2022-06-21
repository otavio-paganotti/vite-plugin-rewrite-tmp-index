import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default () => {
  return defineConfig({
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'vite-plugin-rewrite-tmp-index',
        formats: ['cjs', 'es'],
        fileName: 'index'
      },
      rollupOptions: {
        output: {
          exports: 'named',
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [dts()],
  })
}