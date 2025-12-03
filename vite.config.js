import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// Source - https://stackoverflow.com/a
// Posted by alvescleiton
// Retrieved 2025-11-20, License - CC BY-SA 4.0

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
