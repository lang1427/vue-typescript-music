import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      views: fileURLToPath(new URL("./src/views", import.meta.url)),
      components: fileURLToPath(new URL("./src/components", import.meta.url)),
      assets: fileURLToPath(new URL("./src/assets", import.meta.url)),
      utils: fileURLToPath(new URL("./src/utils", import.meta.url)),
      store: fileURLToPath(new URL("./src/store", import.meta.url)),
      router: fileURLToPath(new URL("./src/router", import.meta.url)),
    },
  },
  plugins: [vue()],
});
