import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      // مرتب سازی import ها
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // unused variables
      "@typescript-eslint/no-unused-vars": "warn",

      // console.log warning
      "no-console": "warn",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
