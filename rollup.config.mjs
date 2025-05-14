import typescript from "rollup-plugin-typescript2";
// import { terser } from "rollup-plugin-terser";
import terser from "@rollup/plugin-terser";
export default {
  input: "src/main.ts",
  output: {
    file: "dist/code.gs",
    format: "iife", // один глобальний файл
    name: "global", // глобальна область видимості
    intro: "var global = this;",
  },
  external: ["tslib"],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
    // , terser()
  ],
};
