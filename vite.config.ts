import { sveltekit } from "@sveltejs/kit/vite";
import { resolve } from "path";
import type { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [sveltekit()],
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      "@lib": resolve("./src/lib"),
      "@components": resolve("./src/components"),
    },
  },
};

export default config;
