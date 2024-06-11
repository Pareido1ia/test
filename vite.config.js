import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'ReUiLibrary',
      fileName: (format) => `re-ui-library.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'vuex'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
});
