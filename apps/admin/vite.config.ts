import { cloudflare } from "@cloudflare/vite-plugin";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";

const DEV_SERVER_PORT = 3000 as const;

const config = defineConfig((configEnv) => ({
  server: {
    port: DEV_SERVER_PORT,
  },
  plugins: [
    devtools(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    viteReact(),
    analyzer({ enabled: configEnv.mode === "analyze" }),
  ],
}));

export default config;
