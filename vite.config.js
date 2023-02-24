import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src",
  server: {
    middleware: {
      // Set the MIME type for JavaScript modules to "text/javascript"
      headers: {
        "Content-Type": "text/javascript",
      },
    },
  },
});
