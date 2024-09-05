import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
      "@enteties": path.resolve(__dirname, "./src/enteties"),
      "@components": path.resolve(__dirname, "./src/shared/components"),
      "@assets": path.resolve(__dirname, "./src/app/assets"),
      "@utils": path.resolve(__dirname, "./src/app/utils"),
    },
  },
});
