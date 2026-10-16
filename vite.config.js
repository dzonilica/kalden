import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    // The Sunray site in the parent folder keeps 5173; running both at once is
    // the normal case while this one is being built.
    port: 5174,
  },
});
