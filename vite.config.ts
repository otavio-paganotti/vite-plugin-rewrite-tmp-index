import { defineConfig } from 'vite';
import path from 'path';

export default () => {
  return defineConfig({
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'vite-plugin-rewrite-tmp-index',
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
  })
}