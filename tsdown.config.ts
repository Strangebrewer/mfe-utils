import { defineConfig } from "tsdown";
import { injectCssPlugin } from '@bosh-code/tsdown-plugin-inject-css';

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  outDir: "dist",
  deps: {
    skipNodeModulesBundle: true,
  },
  plugins: [
    injectCssPlugin(),
  ],
  css: {
    splitting: true,
    inject: true,
  }
});
