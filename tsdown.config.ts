import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  outDir: "dist",
  deps: {
    skipNodeModulesBundle: true,
  },
  unbundle: true,
  css: {
    inject: true
  }
});
