import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/webpackConfigDefaults/index.ts"],
  format: ["esm"],
  dts: true,
  outDir: "dist",
  deps: {
    skipNodeModulesBundle: true,
  },
});
