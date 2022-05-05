import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import relay from "vite-plugin-relay";

export default defineConfig({
  build: {
    polyfillModulePreload: true,
  },
  plugins: [reactRefresh(), relay],
});
